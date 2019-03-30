import { store } from "../store";
import { sendSimpleMessage, getRandomItem, emphasize, renderEquipment, warn } from "./util";
import { CooldownComputer } from "./CooldownComputer";
import { POTION_COOLDOWN } from "../data/consts";
import { potionReflection } from "./reflections";
import { POTION_PRICE } from '../data/consts';
import monsters from '../data/monsters';
import BattleRound from './Round/BattleRound';
import { addEquipment, initBag } from "../store/bag/actions";
import Equipment from '../game/EquipmentCreator/Equipment';
import { startGame } from "../store/ui/actions";
import EquipmentCreator from "./EquipmentCreator/EquipmentCreator";
import Player from "./Player/Player";
import Round from "./Round/Round";
import GameController from "./GameController/GameController";

export default class GameSingleton {
    private static instance: GameSingleton
    private equipmentCreator: EquipmentCreator
    private player: Player
    private skillController: GameController
    private round: Round | null = null
    private coolDownMap = new Map<string, CooldownComputer>()

    private isDead = false
    private inBattle = false

    private constructor() {
        // GameSingleton单例模式
        this.equipmentCreator = new EquipmentCreator()
        this.player = new Player()
        this.skillController = new GameController()
        for (let i = 0; i < 8; i++) {
            this.skillController.setSkill(i, `00${i + 1}`)
        }
    }
    public static getInstance() {
        if (!GameSingleton.instance) {
            GameSingleton.instance = new GameSingleton();
        }
        return GameSingleton.instance;
    }

    ifDead() {
        return this.isDead
    }
    ifInBattle() {
        return this.inBattle
    }
    getPlayer() {
        return this.player
    }
    getCDMap() {
        return this.coolDownMap
    }
    getRound() {
        return this.round
    }

    save() {
        let character = this.player.character
        let bag = store.getState().bag
        localStorage.setItem('save', JSON.stringify({
            character,
            bag
        }))
        warn('保存成功！')
    }
    init(options: {
        raceID: string
        careerID: string
    }) {
        this.player.init(options)
        sendSimpleMessage(`${emphasize(this.player.character.name)}，欢迎来到这个魔幻的游戏`)
        sendSimpleMessage(`你选择了${emphasize(this.player.character.career)}作为职业`)
        sendSimpleMessage(`点击下方面板可以释放技能或者使用药水，当然也可以用键盘进行操作`)
        sendSimpleMessage(`点击上方PLAY按钮进入战斗，右上角菜单请自行探索`)
        sendSimpleMessage(`GOOD LUCK，HAVE FUN！`)
    }
    initFromSave(save: any) {
        store.dispatch(startGame())
        this.player.assignCharacter(save.character)
        store.dispatch(initBag(save.bag))
        sendSimpleMessage(`自动读档，您可以继续游戏了！`)
    }
    private endBattle() {
        this.inBattle = false
        sendSimpleMessage(`战斗结束`)
        if (Math.random() < 0.8) {
            let eq = this.equipmentCreator.getEquipment()
            sendSimpleMessage(`获得装备${renderEquipment(eq)}`)
            store.dispatch(addEquipment(eq))
        }
        sendSimpleMessage(`稍事休整后请点击上方PLAY按钮进入下一轮战斗`)
    }
    private endGame = () => {
        this.isDead = true
        this.inBattle = false
        localStorage.removeItem('save')
        sendSimpleMessage(emphasize('你屎了，存档已删除'))
        sendSimpleMessage(`游戏结束，少侠请按F5重新来过吧`)
    }
    private battle = (monsterNum: number) => {
        // 这里要递归两次以上只能用箭头函数，否则this就拿不到了，更进一步的原因不清楚
        if (monsterNum > 0) {
            this.round = new BattleRound(getRandomItem(monsters), () => this.battle(--monsterNum), this.endGame, this.player)
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
        let monsterNum = Math.ceil(Math.random() * 5)
        this.battle(monsterNum)
    }
    buyItem(type: string, num: number) {
        if (this.player.character.money < num * POTION_PRICE) {
            warn('金钱不足！')
            return
        }
        this.player.character[type] += num
        this.player.character.money -= num * POTION_PRICE
    }
    enhance(eq: Equipment) {
        this.player.enhance(eq)
    }
    wear(type: string, equiped: number, id: number) {
        this.player.wear(type, equiped, id)
    }
    useSkill(key: number, cbHook?: Function) {
        this.skillController.exuteSkill(key, cbHook)
    }
    usePotion(key: string, cbHook?: Function) {
        if (this.isDead) {
            sendSimpleMessage(emphasize(`你已经是屎人一个了！无法使用药品了`))
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
        const character = this.player.character
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
            character[pr.cur] = Math.min(cur + 0.6 * max, max)
            character[pr.num]--
            sendSimpleMessage(emphasize(`回复了60%的${pr.name}量`, 'green'))
        } else {
            sendSimpleMessage(`${pr.name}瓶冷却中！`)
        }
    }
}