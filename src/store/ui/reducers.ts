import {
    UIState,
    UIActionTypes,
    START_GAME
} from './types'

const initialState: UIState = {
    showSkill: false,
    showCareer: true
}

export function uiReducer(
    state = initialState,
    action: UIActionTypes
): UIState {
    switch (action.type) {
        case START_GAME:
            return Object.assign({}, state, {
                showSkill: true,
                showCareer: false
            })
        default:
            return state
    }
}