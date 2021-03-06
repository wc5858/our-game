import { Monster } from "../game/types";

const data: {
    [key: string]: Monster
} = {
    '001': {
        name: '很强的怪物',
        hpRate: 2,
        attackRate: 0.15,
        attackSpeed: 0.8,
        moneyAward: 100,
        gemAward: 20,
        xpAward: 0.1
    }
}

export default data