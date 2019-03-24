import { boardReducer } from './board/reducers'
import { characterReducer } from './character/reducers'
import { uiReducer } from './ui/reducers'
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { bagReducer } from './bag/reducers';

const rootReducer = combineReducers({
    board: boardReducer,
    character: characterReducer,
    ui: uiReducer,
    bag: bagReducer
})

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(
    rootReducer,
    composeWithDevTools()
)