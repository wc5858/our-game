import { boardReducer } from './board/reducers'
import { createStore, combineReducers } from 'redux'

const rootReducer = combineReducers({
  board: boardReducer
})

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore() {

  const store = createStore(
    rootReducer
  )

  return store
}