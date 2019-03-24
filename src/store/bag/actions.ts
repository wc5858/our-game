import { ADD_EQUIPMENT, Equipment, EQUIP_EQUIPMENT } from './types'

// TypeScript infers that this function is returning BoardActionTypes
export function addEquipment(equipment: Equipment) {
    return {
        type: ADD_EQUIPMENT,
        payload: equipment
    }
}

export function equipEquipment(type:string, equipments: Equipment[]) {
    return {
        type: EQUIP_EQUIPMENT,
        eqType: type,
        payload: equipments
    }
}