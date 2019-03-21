export interface CharacterInitData {
    name: string
    careerID: string
}

export interface CharacterState {
    name: string
    avatar: string
    careerID: string
    hp: number
    mp: number
    curHp: number
    curMp: number
    equipments: string[]
    attackPower: number
    attackSpeed: number
    defensivePower: number
    critRate: number
    exp: number
    level: number
    money: number
}

export const UPDATE_HP = 'DAMAGE_HP'
export const UPDATE_MP = 'DAMAGE_MP'
export const RECOVER_HP = 'RECOVER_HP'
export const RECOVER_MP = 'RECOVER_MP'
export const INIT_CHARACTER = 'INIT_CHARACTER'

export interface InitCharacterAction {
    type: typeof INIT_CHARACTER
    name: string
    careerID: string
}
export interface UpdateHpAction {
    type: typeof UPDATE_HP
    value: string
}


export type CharacterActionTypes = InitCharacterAction | UpdateHpAction