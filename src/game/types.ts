export type Monster = {
    name: string
    hpRate: number
    attackRate: number
    attackSpeed: number
    moneyAward: number
    gemAward: number
    xpAward: number
}

export type Race = {
    name: string
    avatar: string
    attackGrow: number
    hpGrow: number
    mpGrow: number
}

export type Career = {
    name: string
    avatar: string
    attackGrow: number
    hpGrow: number
    mpGrow: number
    skillTree: object
}

export type Skill = {
    id: string
    name: string
    dsc: string
    avatar: string
    cost: number
    baseDamageRate: number
    damageUpPerLevel: number
    maxLevel: number
    gemNeeds: Array<number>
    animation: string
    cooldown: number
}

export const HP_POTION = 'HP_POTION'
export const MP_POTION = 'MP_POTION'
export const RARE_A = '稀有'
export const RARE_S = '史诗'
export const RARE_SS = '传说'
export const WEAPON = 'weapon'

export const parts = ['head', 'neck', 'shoulder', 'body', 'belt', 'bracers', WEAPON, 'shield', 'hands', 'foot', 'ring', 'rune']
export const weaponTypes = ['sword', 'knife']

export const rarity = [RARE_A, RARE_S, RARE_SS]
export const rarityColor: {
    [key: string]: string
} = {
    [RARE_A]: 'blue',
    [RARE_S]: 'purple',
    [RARE_SS]: 'orange',
}

export const POTION_PRICE = 100