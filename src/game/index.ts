import RoundSingleton from "./RoundSingleton";
import races from "../data/races";
import careers from "../data/careers";
import { store } from "../store";
import { initCharacter} from "../store/character/actions";
import { sendSimpleMessage } from "./util";
import { CooldownComputer } from "./CooldownComputer";
import { POTION_COOLDOWN } from "../data/consts";
import { potionReflection } from "./reflections";

class Game {
    private roundRunner = RoundSingleton.getInstance()
    private coolDownMap = new Map<string, CooldownComputer>()
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

        this.roundRunner.init()
    }
    doSth() {
        this.roundRunner.doSth()
    }
    usePotion(key: string) {
        // 检查key是否合法
        if (!potionReflection.hasOwnProperty(key)) {
            console.error('invalid potion key：' + key)
            return
        }
        let cdComputer = this.coolDownMap.get(key)
        // 获取映射
        const pr = potionReflection[key]
        if (!cdComputer) {
            cdComputer = new CooldownComputer(POTION_COOLDOWN, () => {
                sendSimpleMessage(`${pr.name}瓶已经冷却完毕！`)
            })
            this.coolDownMap.set(key, cdComputer)
        }
        const character = store.getState().character
        if (cdComputer.getStatus()) {
            const cur = character[pr.cur]
            const max = character[pr.max]
            const val = cur + 0.6 * max
            store.dispatch(pr.action({
                value: Math.min(val, max)
            }))
            sendSimpleMessage(`回复了60%的${pr.name}量`)
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

export default new Game()