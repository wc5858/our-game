import { store } from "../store"
import { sendMessage } from '../store/board/actions'
import { Monster, monsters } from '../data/monsters'
import * as util from '../util'

function sendSimpleMessage(text: string) {
    store.dispatch(sendMessage({
        text: text
    }))
}

interface Round {
    init: Function
    onOperation: Function
    callEnd: Function
}

class BattleRound implements Round {
    monsterName: string
    monsterHp: number
    monsterAttack: number
    monsterAttackTime: number
    callEnd: Function
    attack: number
    isEnd: boolean
    constructor(monster: Monster, endBattleCallback: Function) {
        const character = store.getState().character
        this.attack = character.attackPower
        this.monsterName = monster.name
        // 随机怪物攻击力、血量
        this.monsterAttack = Math.floor(monster.attackRate * character.hp * util.getDrift())
        this.monsterHp = Math.floor(monster.hpRate * character.attackPower * util.getDrift())
        this.monsterAttackTime = 1000 / monster.attackSpeed
        this.callEnd = endBattleCallback
        this.isEnd = false
    }
    init() {
        sendSimpleMessage(`遭遇了怪物：${this.monsterName}`)
        sendSimpleMessage(`血量：${this.monsterHp}`)
        sendSimpleMessage(`攻击：${this.monsterAttack}`)
        this.initAutoAttack()
    }
    endRound(damage: number) {
        if (!this.isEnd) {
            store.dispatch(sendMessage({
                text: `对怪物造成了${damage}伤害，boss被击败了`
            }))
            this.callEnd()
            this.isEnd = true
        }
    }
    initAutoAttack() {
        let helper = () => {
            this.monsterHp -= this.attack
            if (this.monsterHp > 0) {
                store.dispatch(sendMessage({
                    text: `（自动攻击）对怪物造成了${this.attack}伤害，怪物剩余血量${this.monsterHp}`
                }))
                setTimeout(helper, this.monsterAttackTime)
            } else {
                this.endRound(this.attack)
            }
        }
        setTimeout(helper, this.monsterAttackTime)
    }
    onOperation(skillID: string) {
        this.monsterHp -= 50
        if (this.monsterHp > 0) {
            store.dispatch(sendMessage({
                text: `施放技能对怪物造成了${50}伤害，怪物剩余血量${this.monsterHp}`
            }))
        } else {
            this.endRound(50)
        }
    }
}

let round: Round

function goRound() {
    round = new BattleRound(util.getRandomItem(monsters), goRound)
    round.init()
}

export default {
    init() {
        goRound()
    },
    doSth() {
        round.onOperation('001')
    }
}