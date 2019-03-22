import { Skill } from "../game/types";

const data: {
    [key: string]: Skill
} = {
    '001': {
        name: '摸你狗头',
        dsc: '以非常暴力的方式击打头部，造成巨额伤害',
        baseDamageRate: 2.5,
        damageUpPerLevel: 0.2,
        maxLevel: 5,
        gemNeeds: [100, 300, 1000, 3000, 10000],
        animation: '',
        cooldown: 10000
    }
}

export default data