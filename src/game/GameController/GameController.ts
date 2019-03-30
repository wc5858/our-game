import Command from "./Command";
import NoCommand from "./NoCommand";
import { Skill } from "../types";
import Player from "../Player/Player";
import SkillCommand from "./SkillCommand";
import skills from "../../data/skills";

export default class GameController {
    protected slots: Command[]
    constructor() {
        this.slots = new Array(8).fill(new NoCommand())
    }
    setSkill(slot: number, id: string) {
        this.slots[slot] = new SkillCommand(skills[id])
    }
    exuteSkill(slot: number, cbHook?: Function) {
        console.log(cbHook)
        this.slots[slot].exute(cbHook)
    }
}