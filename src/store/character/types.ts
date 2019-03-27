export interface CharacterState {
    [key: string]: any
    name: string
    avatar: string
    career: string
    race: string
    careerID: string
    raceID: string
    hp: number
    mp: number
    curHp: number
    curMp: number
    equipments: string[]
    attackPower: number
    attackSpeed: number
    critRate: number
    attackGrow: number
    hpGrow: number
    mpGrow: number
    exp: number
    level: number
    money: number
    gem: number
    hpPotionNum: number
    mpPotionNum: number
}

export const UPDATE_CHARACTER = 'UPDATE_CHARACTER'

export interface UpdateCharacterAction {
    type: typeof UPDATE_CHARACTER
    payload: CharacterState
}

export type CharacterActionTypes = UpdateCharacterAction