import { ADD_EQUIPMENT, Equipment, EQUIP_EQUIPMENT, BagState, INIT_BAG } from './types'

// TypeScript infers that this function is returning BoardActionTypes
export function addEquipment(equipment: Equipment) {
    return {
        type: ADD_EQUIPMENT,
        payload: equipment
    }
}

export function updateEquipment(type:string, equipments: Equipment[]) {
    return {
        type: EQUIP_EQUIPMENT,
        eqType: type,
        payload: equipments
    }
}

export function initBag(bag: BagState) {
    return {
        type: INIT_BAG,
        payload: bag
    }
}