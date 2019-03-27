import { CharacterState } from "../../store/character/types";
import { initialState as initialCharacter } from "../../store/character/reducers";
import { store } from "../../store";
import { updateCharacter } from "../../store/character/actions";
import races from "../../data/races";
import careers from "../../data/careers";
import { getRandomItem } from "../../util";
import { USER_NAMES } from "../../data/consts";
import { warn } from "../util";
import { updateEquipment } from "../../store/bag/actions";
import Equipment from "../EquipmentCreator/Equipment";

export default class Player {
    character: CharacterState
    constructor() {
        // 代理模式
        // 这里character添加了一个代理
        // 代理对象监听character的改动，自动派发action更新redux的state
        // player对象自身对character的改动也会被监听
        // 可以在这个代理内增加对character的访问控制，比如将某些属性设置为只读等等
        // 比如说这边对设置的属性做了检查
        this.character = new Proxy(initialCharacter, {
            set: (target, key:string, value, receiver) => {
                if(!initialCharacter.hasOwnProperty(key)) {
                    console.warn('向character添加非法属性是无效的')
                    return false
                }
                target[key] = value
                store.dispatch(updateCharacter(target))
                return true
            }
        })
    }
    init(options: {
        raceID: string
        careerID: string
    }) {
        // 初始化0级人物
        let race = races[options.raceID]
        let career = careers[options.careerID]
        const userName = getRandomItem(USER_NAMES)
        this.assignCharacter(Object.assign(initialCharacter,{
            name: userName,
            avatar: race.avatar,
            career: career.name,
            race: race.name,
            careerID: options.careerID,
            raceID: options.raceID,
            attackGrow: initialCharacter.attackGrow + race.attackGrow + career.attackGrow,
            hpGrow: initialCharacter.hpGrow + race.hpGrow + career.hpGrow,
            mpGrow: initialCharacter.mpGrow + race.mpGrow + career.mpGrow
        }))
    }
    assignCharacter(data: {
        [idex: string]: any
    }) {
        for (let key in data) {
            // 对签名做检查后才写入属性（避免触发上面的warn，即做了双重检查）
            if (data.hasOwnProperty(key) && this.character.hasOwnProperty(key)) {
                // 浅拷贝
                this.character[key] = data[key]
            }
        }
    }
    private changeEquipment(type: string, character: CharacterState, val: number) {
        if (type == 'hp') {
            const percent = character.curHp / character.hp
            character.hp += val
            character.curHp = character.hp * percent
        } else if (type == 'mp') {
            const percent = character.curMp / character.mp
            character.mp += val
            character.curMp = character.mp * percent
        } else {
            character[type] += val
        }
    }
    wear(type: string, equiped: number, id: number) {
        const data = store.getState().bag[type]
        let takenOff
        let takenOn
        for (let i of data) {
            if (i.equiped != 0) {
                i.equiped = 0
                takenOff = i
            }
            if (i.id == id) {
                takenOn = i
                i.equiped = equiped
            }
        }
        if (takenOff) {
            for (let i of takenOff.attributes) {
                this.changeEquipment(i.type, this.character, -i.value)
            }
        }
        if (takenOn) {
            for (let i of takenOn.attributes) {
                this.changeEquipment(i.type, this.character, i.value)
            }
        }
        store.dispatch(updateEquipment(type, data))
    }
    enhance(eq: Equipment) {
        let character = this.character
        const need = 100 * (eq.enhancedLevel + 1)
        if (character.gem < need) {
            warn('宝石不足！')
            return
        }
        character.gem -= need
        if (Math.random() < 0.5) {
            const data = store.getState().bag[eq.part]
            for (let i of data) {
                if (i.id == eq.id) {
                    i.enhancedLevel++
                    for (let j of eq.attributes) {
                        const val = Math.ceil(j.value * 0.1)
                        j.value += val
                        this.changeEquipment(j.type, character, val)
                    }
                    break
                }
            }
            store.dispatch(updateEquipment(eq.part, data))
            warn('强化成功！')
        } else {
            warn('强化失败！继续努力吧')
        }
    }
}