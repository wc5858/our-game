import Command from "./Command";
import { Skill } from "../types";
import { sendSimpleMessage, emphasize } from "../util";
import game from '../index'
import { CooldownComputer } from "../CooldownComputer";

export default class SkillCommand implements Command {
    private skill: Skill
    constructor(skill: Skill) {
        this.skill = skill
    }
    exute(cbHook?:Function) {
        if (game.ifDead()) {
            sendSimpleMessage(emphasize(`你已经是屎人一个了！无法释放技能了`))
            return
        }
        const character = game.getPlayer().character
        const key = `skill${this.skill.id}`
        const CDMap = game.getCDMap()
        let cdComputer = CDMap.get(key)
        function cancel() {
            // 直接执行回调取消动画（倒计时器不存在或者倒计时状态为冷却完毕）
            if (cbHook && (!cdComputer || cdComputer && cdComputer.getStatusDirectly())) {
                cbHook()
            }
        }
        if (!game.ifInBattle()) {
            cancel()
            sendSimpleMessage(emphasize(`非战斗中无法释放技能！`))
            return
        }
        if(character.curMp < this.skill.cost) {
            sendSimpleMessage(emphasize(`法力值不足！`))
            cancel()
            return
        }
        if (!cdComputer) {
            cdComputer = new CooldownComputer(this.skill.cooldown, () => {
                if (cbHook) {
                    cbHook()
                }
                sendSimpleMessage(`技能${emphasize(this.skill.name)}已经冷却完毕！`)
            })
            CDMap.set(key, cdComputer)
        }
        if (cdComputer.getStatus()) {
            const round = game.getRound()
            if(round) {
                sendSimpleMessage(`技能${emphasize(this.skill.name)}释放成功`)
                character.curMp -= this.skill.cost
                round.doAttack(this.skill.baseDamageRate * character.attackPower)
            } else {
                sendSimpleMessage(`不在战斗回合内`)
            }
        } else {
            sendSimpleMessage(`技能${emphasize(this.skill.name)}冷却中！`)
        }
        return
    }
}