import Command from "./Command";
import Skill from "./Skill";

export default class SkillCommand implements Command {
    private skill: Skill
    constructor(skill: Skill) {
        this.skill = skill
    }
    exute() {
        return
    }
}