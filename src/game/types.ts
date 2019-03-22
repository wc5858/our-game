export interface Round {
    init: Function
    onOperation: Function
    callEndBattle: Function
    callEndGame: Function
    isEnd: boolean
}

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