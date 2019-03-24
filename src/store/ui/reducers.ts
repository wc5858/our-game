import {
    UIState,
    UIActionTypes,
    START_GAME,
    SHOW_CHARACTER,
    CLOSE_CHARACTER,
    SHOW_SHOP,
    CLOSE_SHOP
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
        case CLOSE_CHARACTER:
            return Object.assign({}, state, {
                showCharacter: false
            })
        case SHOW_SHOP:
            return Object.assign({}, state, {
                showShop: true
            })
        case CLOSE_SHOP:
            return Object.assign({}, state, {
                showShop: false
            })
        default:
            return state
    }
}