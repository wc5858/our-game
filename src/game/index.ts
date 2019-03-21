import { store } from "../store"
import { sendMessage } from '../store/board/actions'
import { Monster, monsters } from '../data/monsters'
import * as util from '../util'
import { updateHp } from "../store/character/actions";

function sendSimpleMessage(text: string) {
    store.dispatch(sendMessage({
        text: text
    }))
}

interface Round {
    init: Function
    onOperation: Function
    callEndBattle: Function
    callEndGame: Function
    isEnd: boolean
}

class BattleRound implements Round {
    monsterName: string
    monsterHp: number
    monsterAttack: number
    monsterAttackTime: number
    callEndBattle: Function
    callEndGame: Function
    attack: number
    attackTime: number
    isEnd: boolean
    constructor(monster: Monster, endBattleCallback: Function, endGameCallback: Function) {
        const character = store.getState().character
        this.attack = character.attackPower
        this.attackTime = 1000 / character.attackSpeed
        this.monsterName = monster.name
        // 随机怪物攻击力、血量
        this.monsterAttack = Math.round(monster.attackRate * character.hp * util.getDrift())
        this.monsterHp = Math.floor(monster.hpRate * character.attackPower * util.getDrift())
        this.monsterAttackTime = 1000 / monster.attackSpeed
        this.callEndBattle = endBattleCallback
        this.callEndGame = endGameCallback
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
            this.callEndBattle()
            this.isEnd = true
        }
    }
    endGame() {
        if (!this.isEnd) {
            store.dispatch(updateHp({
                value: 0
            }))
            sendSimpleMessage('你屎了')
            this.callEndGame()
            this.isEnd = true
        }
    }
    initAutoAttack() {
        let helper1 = () => {
            if (!this.isEnd) {
                let hp = store.getState().character.curHp
                hp -= this.monsterAttack
                store.dispatch(updateHp({
                    value: hp
                }))
                if (hp > 0) {
                    sendSimpleMessage(`（自动攻击）怪物对你造成了${this.monsterAttack}伤害`)
                    setTimeout(helper1, this.monsterAttackTime)
                } else {
                    this.endGame()
                }
            }
        }
        let helper2 = () => {
            if (!this.isEnd) {
                this.monsterHp -= this.attack
                if (this.monsterHp > 0) {
                    store.dispatch(sendMessage({
                        text: `（自动攻击）对怪物造成了${this.attack}伤害，怪物剩余血量${this.monsterHp}`
                    }))
                    setTimeout(helper2, this.attackTime)
                } else {
                    this.endRound(this.attack)
                }
            }
        }
        setTimeout(helper1, this.monsterAttackTime)
        setTimeout(helper2, this.attackTime)
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

function endGame() {
    sendSimpleMessage('游戏结束')
}

function goRound() {
    round = new BattleRound(util.getRandomItem(monsters), goRound, endGame)
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