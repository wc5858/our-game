export type Monster = {
    name: string
    hpRate: number
    attackRate: number
    attackSpeed: number
    moneyAward: number
    gemAward: number
    xpAward: number
}

export const monsters = {
    '001': {
        name: '很强的怪物',
        hpRate: 100,
        attackRate: 0.15,
        attackSpeed: 0.8,
        moneyAward: 100,
        gemAward: 20,
        xpAward: 0.1
    }
}