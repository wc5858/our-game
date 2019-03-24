import { BagState, ADD_EQUIPMENT, BagActionTypes, EQUIP_EQUIPMENT } from "./types";

const initialState: BagState = {
    head: [],
    neck: [],
    shoulder: [],
    body: [],
    belt: [],
    bracers: [],
    weapon: [],
    shield: [],
    hands: [],
    foot: [],
    ring: [],
    rune: []
}

export function bagReducer(
    state = initialState,
    action: BagActionTypes
): BagState {
    switch (action.type) {
        case ADD_EQUIPMENT:
            const newState = Object.assign({}, state)
            newState[action.payload.part].push(action.payload)
            return newState
        case EQUIP_EQUIPMENT:
            return Object.assign({}, state, {
                [action.eqType]: action.payload
            })
        default:
            return state
    }
}