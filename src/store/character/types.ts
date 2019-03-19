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
    equipments: string[]
    attackPower: number
    defensivePower: number
    critRate: number
    exp: number
    level: number
}

export const DAMAGE_HP = 'DAMAGE_HP'
export const DAMAGE_MP = 'DAMAGE_MP'
export const RECOVER_HP = 'RECOVER_HP'
export const RECOVER_MP = 'RECOVER_MP'
export const INIT_CHARACTER = 'INIT_CHARACTER'

export interface InitCharacterAction {
    type: typeof INIT_CHARACTER
    name: string
    careerID: string
}


export type CharacterActionTypes = InitCharacterAction