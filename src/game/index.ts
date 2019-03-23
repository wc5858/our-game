import RoundSingleton from "./RoundSingleton";
import races from "../data/races";
import careers from "../data/careers";
import { store } from "../store";
import { initCharacter } from "../store/character/actions";
import { sendSimpleMessage, getRandomItem, emphasize } from "./util";
import { CooldownComputer } from "./CooldownComputer";
import { POTION_COOLDOWN } from "../data/consts";
import { potionReflection } from "./reflections";
import { func } from "prop-types";

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

        const userName = getRandomItem(['沉睡的朱老板', '暴躁的朱老板', '萌萌哒的三狗子'])

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

        sendSimpleMessage(`${emphasize(name)}，欢迎来到这个魔幻的游戏`)

        this.roundRunner.init()
    }
    doSth() {
        this.roundRunner.doSth()
    }
    usePotion(key: string, cbHook?: Function) {
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