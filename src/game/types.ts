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