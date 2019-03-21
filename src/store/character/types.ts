export interface CharacterInitData {
    name: string
    careerID: string
    raceID: string
    attackGrow: number
    hpGrow: number
    mpGrow: number
}

export interface CharacterState {
    name: string
    avatar: string
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
}

export const UPDATE_HP = 'UPDATE_HP'
export const UPDATE_MP = 'UPDATE_MP'
export const RECOVER_HP = 'RECOVER_HP'
export const RECOVER_MP = 'RECOVER_MP'
export const INIT_CHARACTER = 'INIT_CHARACTER'

export interface InitCharacterAction {
    type: typeof INIT_CHARACTER
    payload: CharacterInitData
}
export interface UpdateHpAction {
    type: typeof UPDATE_HP
    value: string
}


export type CharacterActionTypes = InitCharacterAction | UpdateHpAction