import { ADD_EQUIPMENT, Equipment } from './types'

// TypeScript infers that this function is returning BoardActionTypes
export function addEquipment(equipment: Equipment) {
    return {
        type: ADD_EQUIPMENT,
        payload: equipment
    }
}