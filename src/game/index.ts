import { store } from "../store"
import { sendMessage } from '../store/board/actions'

// const battle = [{
//     message: '遭遇了战斗'
// }]

let bossHp = 1000
let attack = 50
let timer
function helper () {
    bossHp-=attack
    if(bossHp>0) {
        sendMessage({
            text: `对怪物造成了${attack}伤害，怪物剩余血量${bossHp}`
        })
        setTimeout(helper,1000)
    } else {
        sendMessage({
            text: `对怪物造成了${attack}伤害，怪物剩余血量${bossHp}`
        })
    }
}

interface Round {
    init:Function
    onOperation:Function
    end:Function
}

class BattleRound implements Round{
    monsterHp:number
    end: Function
    constructor(monsterHp:number,endBattle: Function){
        this.monsterHp = monsterHp
        this.end = endBattle
    }
    init(){
        store.dispatch(sendMessage({
            text: `战斗开始`
        }))
    }
    onOperation(skillID: string){
        this.monsterHp -= 50
        if(this.monsterHp > 0) {
            store.dispatch(sendMessage({
                text: `对怪物造成了${50}伤害，怪物剩余血量${this.monsterHp}`
            }))
        }  else {
            this.end()
        }
    }
}

let round:Round

function goRound(){
    round = new BattleRound(180,goRound)
}

export default {
    init(){
        goRound()
    },
    doSth(){
        round.onOperation('001')
    }
}