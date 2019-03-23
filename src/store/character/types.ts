export interface CharacterInitData {
    name: string
    avatar: string
    career: string
    race: string
    careerID: string
    raceID: string
    attackGrow: number
    hpGrow: number
    mpGrow: number
}

export interface AwardData {
    exp: number
    money: number
    gem: number
}

export interface LevelUpData {
    level: number
    curHp: number
    curMp: number
    attackPower: number
    hp: number
    mp: number
}

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

export const UPDATE_HP = 'UPDATE_HP'
export const UPDATE_MP = 'UPDATE_MP'
export const LEVEL_UP = 'LEVEL_UP'
export const INIT_CHARACTER = 'INIT_CHARACTER'
export const SET_AWARD = 'SET_AWARD'
export const SET_HP_POTION = 'SET_HP_POTION'
export const SET_MP_POTION = 'SET_MP_POTION'

export interface InitCharacterAction {
    type: typeof INIT_CHARACTER
    payload: CharacterInitData
}
export interface SetAwardAction {
    type: typeof SET_AWARD
    payload: AwardData
}
export interface UpdateHpAction {
    type: typeof UPDATE_HP
    value: number
}

export interface UpdateMpAction {
    type: typeof UPDATE_MP
    value: number
}

export interface SetMpPotionAction {
    type: typeof SET_MP_POTION
    value: number
}

export interface SetHpPotionAction {
    type: typeof SET_HP_POTION
    value: number
}

export interface LevelUpAction {
    type: typeof LEVEL_UP
    payload: LevelUpData
}

export type CharacterActionTypes = InitCharacterAction | UpdateHpAction |
    SetAwardAction | UpdateMpAction | LevelUpAction | SetHpPotionAction | SetMpPotionAction