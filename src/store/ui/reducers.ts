import {
    UIState,
    UIActionTypes,
    START_GAME
} from './types'

const initialState: UIState = {
    showStart: true,
    showSkill: false,
    showCareer: false
}

export function uiReducer(
    state = initialState,
    action: UIActionTypes
): UIState {
    switch (action.type) {
        case START_GAME:
            return Object.assign({}, state, {
                showStart: false,
                showSkill: true,
                showCareer: true
            })
        default:
            return state
    }
}