import { boardReducer } from './board/reducers'
import { characterReducer } from './character/reducers'
import { uiReducer } from './ui/reducers'
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
    board: boardReducer,
    character: characterReducer,
    ui: uiReducer
})

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(
    rootReducer,
    composeWithDevTools()
)