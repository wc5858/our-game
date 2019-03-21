import { Round } from "./types"
import { monsters } from '../data/monsters'
import * as util from './util'
import BattleRound from './BattleRound'

// 单例模式
export default class RoundSingleton {
    private static instance: RoundSingleton;
    round: Round | null
    private constructor() {
        this.round = null
    }
    public static getInstance() {
        if (!RoundSingleton.instance) {
            RoundSingleton.instance = new RoundSingleton();
        }

        return RoundSingleton.instance;
    }
    private endGame() {
        util.sendSimpleMessage('游戏结束')
    }
    private goRound() {
        this.round = new BattleRound(util.getRandomItem(monsters), this.goRound, this.endGame)
        this.round.init()
    }
    init() {
        this.goRound()
    }
    doSth() {
        if (this.round) {
            this.round.onOperation('001')
        }
    }
}

