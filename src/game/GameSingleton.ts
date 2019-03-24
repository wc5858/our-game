import races from "../data/races";
import careers from "../data/careers";
import { store } from "../store";
import { initCharacter } from "../store/character/actions";
import { sendSimpleMessage, getRandomItem, emphasize, renderEquipment } from "./util";
import { CooldownComputer } from "./CooldownComputer";
import { POTION_COOLDOWN } from "../data/consts";
import { potionReflection } from "./reflections";
import { Round } from "./types";
import monsters from '../data/monsters';
import BattleRound from './BattleRound';
import EquipmentFactory from "./EquipmentFactory";
import { addEquipment } from "../store/bag/actions";

export default class GameSingleton {
    private static instance: GameSingleton
    private equipmentFactory: EquipmentFactory = new EquipmentFactory()
    private round: Round | null = null
    private coolDownMap = new Map<string, CooldownComputer>()
    private constructor() {
        // GameSingleton
    }
    private isDead = false
    private inBattle = false
    public static getInstance() {
        if (!GameSingleton.instance) {
            GameSingleton.instance = new GameSingleton();
        }

        return GameSingleton.instance;
    }
    init(options: {
        raceID: string
        careerID: string
    }) {
        let race = races[options.raceID]
        let career = careers[options.careerID]
        let character = store.getState().character

        const userName = getRandomItem(['沉睡的朱老板', '可爱的朱老板', '萌萌哒的三狗子'])

        store.dispatch(initCharacter({
            name: userName,
            avatar: race.avatar,
            career: career.name,
            race: race.name,
            careerID: options.careerID,
            raceID: options.raceID,
            attackGrow: character.attackGrow + race.attackGrow + career.attackGrow,
            hpGrow: character.hpGrow + race.hpGrow + career.hpGrow,
            mpGrow: character.mpGrow + race.mpGrow + career.mpGrow
        }))

        sendSimpleMessage(`${emphasize(userName)}，欢迎来到这个魔幻的游戏`)
        sendSimpleMessage(`你选择了${emphasize(career.name)}作为职业`)
        sendSimpleMessage(`点击下方面板可以释放技能或者使用药水，当然也可以用键盘进行操作`)
        sendSimpleMessage(`点击上方PLAY按钮进入战斗，右上角菜单请自行探索`)
        sendSimpleMessage(`GOOD LUCK，HAVE FUN！`)

        // this.roundRunner.init()
    }
    private endBattle() {
        this.inBattle = false
        sendSimpleMessage(`战斗结束`)
        if (Math.random() < 0.8) {
            let eq = this.equipmentFactory.getEquipment()
            sendSimpleMessage(`获得装备${renderEquipment(eq)}`)
            store.dispatch(addEquipment(eq))
        }
        sendSimpleMessage(`稍事休整后请点击上方PLAY按钮进入下一轮战斗`)
    }
    private endGame = () => {
        this.isDead = true
        this.inBattle = false
        sendSimpleMessage(emphasize('你屎了'))
        sendSimpleMessage(`游戏结束，少侠请按F5重新来过吧`)
    }
    private battle = (monsterNum: number) => {
        // 这里要递归两次以上只能用箭头函数，否则this就拿不到了，更进一步的原因不清楚
        if (monsterNum > 0) {
            this.round = new BattleRound(getRandomItem(monsters), () => this.battle(--monsterNum), this.endGame)
            this.round.init()
        } else {
            this.endBattle()
        }
    }
    play() {
        if (this.isDead) {
            sendSimpleMessage(emphasize(`你已经是屎人一个了！F5重新来过吧！`))
            return
        }
        if (this.inBattle) {
            sendSimpleMessage(emphasize(`你已经在战斗中了！`))
            return
        }
        this.inBattle = true
        // 每次战斗遭遇1-5次怪物
        let monsterNum = Math.round(Math.random() * 5)
        this.battle(monsterNum)
    }
    usePotion(key: string, cbHook?: Function) {
        if (this.isDead) {
            sendSimpleMessage(emphasize(`你已经是屎人一个了！木的放技能了`))
            return
        }
        // 检查key是否合法
        if (!potionReflection.hasOwnProperty(key)) {
            console.error('invalid potion key：' + key)
            return
        }
        let cdComputer = this.coolDownMap.get(key)
        // 获取映射
        const pr = potionReflection[key]
        const character = store.getState().character
        const cur = character[pr.cur]
        const max = character[pr.max]
        const num = character[pr.num]
        function cancel() {
            // 直接执行回调取消动画（倒计时器不存在或者倒计时状态为冷却完毕）
            if (cbHook && (!cdComputer || cdComputer && cdComputer.getStatusDirectly())) {
                cbHook()
            }
        }
        if (num == 0) {
            sendSimpleMessage(`${pr.name}瓶已用完，请到商店补充！`)
            cancel()
            return
        }
        if (cur == max) {
            sendSimpleMessage(`${pr.name}量已满，不要浪费哟`)
            cancel()
            return
        }
        if (!cdComputer) {
            cdComputer = new CooldownComputer(POTION_COOLDOWN, () => {
                if (cbHook) {
                    cbHook()
                }
                sendSimpleMessage(`${pr.name}瓶已经冷却完毕！`)
            })
            this.coolDownMap.set(key, cdComputer)
        }
        if (cdComputer.getStatus()) {
            const val = cur + 0.6 * max
            store.dispatch(pr.action1({
                value: Math.min(val, max)
            }))
            store.dispatch(pr.action2({
                value: num - 1
            }))
            sendSimpleMessage(emphasize(`回复了60%的${pr.name}量`, 'green'))
        } else {
            sendSimpleMessage(`${pr.name}瓶冷却中！`)
        }
    }
    // useItem(type: string) {
    //     const character = store.getState().character
    //     switch (type) {
    //         case HP_POTION:
    //         case MP_POTION:
    //             this.usePotion(type)
    //             break;
    //         default:
    //             break;
    //     }
    // }
}