import {
    UIState,
    UIActionTypes,
    START_GAME,
    SHOW_CHARACTER
} from './types'

const initialState: UIState = {
    showBoards: false,
    showCareer: true,
    showCharacter: false,
    showShop: false,
    showLearnSkill: false,
}

export function uiReducer(
    state = initialState,
    action: UIActionTypes
): UIState {
    switch (action.type) {
        case START_GAME:
            return Object.assign({}, state, {
                showBoards: true,
                showCareer: false
            })
        case SHOW_CHARACTER:
            return Object.assign({}, state, {
                showCharacter: true
            })
        default:
            return state
    }
}