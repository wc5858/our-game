import * as util from '../util'
import { Monster } from '../types'
import Player from '../Player/Player';
import Round from './Round';

export default class BattleRound implements Round {
    monsterName: string
    monsterHp: number
    monsterAttack: number
    monsterAttackTime: number
    callEndBattle: any
    callEndGame: Function
    attack: number
    attackTime: number
    moneyAward: number
    gemAward: number
    xpAward: number
    isEnd: boolean
    player:Player
    constructor(monster: Monster, endBattleCallback: Function, endGameCallback: Function, player: Player) {
        this.attack = player.character.attackPower
        this.attackTime = 1000 / player.character.attackSpeed
        this.monsterName = monster.name
        // 随机怪物攻击力、血量
        this.monsterAttack = util.getDrift(monster.attackRate * player.character.hp)
        this.monsterHp = util.getDrift(monster.hpRate * player.character.attackPower)
        this.monsterAttackTime = 1000 / monster.attackSpeed
        this.moneyAward = util.getDrift(monster.moneyAward)
        this.gemAward = util.getDrift(monster.gemAward)
        this.xpAward = util.getDrift(monster.xpAward * 100) / 100
        this.callEndBattle = endBattleCallback
        this.callEndGame = endGameCallback
        this.isEnd = false
        this.player = player
    }
    init() {
        util.sendSimpleMessage(`遭遇了怪物：${this.monsterName}`)
        util.sendSimpleMessage(`血量：${this.monsterHp}`)
        util.sendSimpleMessage(`攻击：${this.monsterAttack}`)
        this.initAutoAttack()
    }
    endRound(damage: number) {
        if (!this.isEnd) {
            util.sendSimpleMessage(`对怪物造成了${damage}伤害，boss被击败了`)
            util.sendSimpleMessage(`获得${this.moneyAward}金币，获得${this.gemAward}宝石，增长了${this.xpAward * 100}%经验`)
            const character = this.player.character
            let levelUpNum = Math.floor(character.exp + this.xpAward)
            if (levelUpNum > 0) {
                util.sendSimpleMessage(`你升到了${character.level + levelUpNum}级！`)
                // 血蓝回满
                const newHp = character.attackPower + character.attackGrow * levelUpNum
                const newMp = character.attackPower + character.attackGrow * levelUpNum
                this.player.assignCharacter({
                    level: character.level + levelUpNum,
                    curHp: newHp,
                    curMp: newMp,
                    attackPower: character.attackPower + character.attackGrow * levelUpNum,
                    hp: newHp,
                    mp: newMp
                })
            }
            character.exp += this.xpAward - levelUpNum
            character.money += this.moneyAward
            character.gem += this.gemAward
            if (typeof this.callEndBattle == 'function') {
                this.callEndBattle()
            }
            this.isEnd = true
        }
    }
    endGame() {
        if (!this.isEnd) {
            this.player.character.curHp = 0
            this.callEndGame()
            this.isEnd = true
        }
    }
    initAutoAttack() {
        let helper1 = () => {
            if (!this.isEnd) {
                let hp = this.player.character.curHp - this.monsterAttack
                util.sendSimpleMessage(`（自动攻击）怪物对你造成了${this.monsterAttack}伤害`)
                if (hp > 0) {
                    this.player.character.curHp = hp
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
                    util.sendSimpleMessage(`（自动攻击）对怪物造成了${this.attack}伤害，怪物剩余血量${this.monsterHp}`)
                    setTimeout(helper2, this.attackTime)
                } else {
                    this.endRound(this.attack)
                }
            }
        }
        setTimeout(helper1, this.monsterAttackTime)
        setTimeout(helper2, this.attackTime)
    }
    doAttack(dmg: number) {
        this.monsterHp -= dmg
        if (this.monsterHp > 0) {
            util.sendSimpleMessage(`施放技能对怪物造成了${dmg}伤害，怪物剩余血量${this.monsterHp}`)
        } else {
            this.endRound(dmg)
        }
    }
}

