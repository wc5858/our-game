export interface Attributes {
    type: string
    dsc: string
    value: number
}

export interface Equipment {
    id: number
    name: string
    part: string
    subType: string
    avatar: string
    attributes: Attributes[]
    level: number
    rarity: number
    enhancedLevel: number
    equiped: number
}

export interface BagState {
    [key: string]: Equipment[]
    head: Equipment[]
    neck: Equipment[]
    shoulder: Equipment[]
    body: Equipment[]
    belt: Equipment[]
    bracers: Equipment[]
    weapon: Equipment[]
    shield: Equipment[]
    hands: Equipment[]
    foot: Equipment[]
    ring: Equipment[]
    rune: Equipment[]
}

export const ADD_EQUIPMENT = 'ADD_EQUIPMENT'
export const EQUIP_EQUIPMENT = 'EQUIP_EQUIPMENT'

export interface AddEquipment {
    type: typeof ADD_EQUIPMENT
    payload: Equipment
}

export interface EquipEquipment {
    type: typeof EQUIP_EQUIPMENT
    eqType: string
    payload: Equipment[]
}
export type BagActionTypes = AddEquipment | EquipEquipment