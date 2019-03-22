import RoundSingleton from "./RoundSingleton";
import races from "../data/races";
import careers from "../data/careers";
import { store } from "../store";
import { initCharacter, updateHp } from "../store/character/actions";
import { HP_POTION,MP_POTION } from "./types";
import { sendSimpleMessage } from "./util";

let roundRunner = RoundSingleton.getInstance()

// 这个算不算（或者能不能）改成适配器？
export default {
    init(options: {
        raceID: string
        careerID: string
    }) {
        let race = races[options.raceID]
        let career = careers[options.careerID]
        let character = store.getState().character

        store.dispatch(initCharacter({
            name: '沉睡的朱老板',
            avatar: race.avatar,
            career: career.name,
            race: race.name,
            careerID: options.careerID,
            raceID: options.raceID,
            attackGrow: character.attackGrow + race.attackGrow + career.attackGrow,
            hpGrow: character.hpGrow + race.hpGrow + career.hpGrow,
            mpGrow: character.mpGrow + race.mpGrow + career.mpGrow
        }))

        roundRunner.init()
    },
    doSth() {
        roundRunner.doSth()
    },
    usePotion(type: string) {
        const character = store.getState().character
        switch (type) {
            case HP_POTION:
                const newHp = character.curHp + 0.6 * character.hp
                store.dispatch(updateHp({
                    value: newHp > character.hp ? character.hp : newHp
                }))
                sendSimpleMessage(`回复了60%的血量`)
                break;
            case MP_POTION:
                const newMp = character.curMp + 0.6 * character.mp
                store.dispatch(updateHp({
                    value: newMp > character.mp ? character.mp : newMp
                }))
                sendSimpleMessage(`回复了60%的蓝量`)
                break;
            default:
                break;
        }
    }
}