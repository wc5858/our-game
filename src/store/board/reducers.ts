import {
    BoardState,
    BoardActionTypes,
    SEND_MESSAGE
  } from './types'
  
  const initialState: BoardState = {
    messages: []
  }
  
  export function boardReducer(
    state = initialState,
    action: BoardActionTypes
  ): BoardState {
    switch (action.type) {
      case SEND_MESSAGE:
        return {
          messages: [...state.messages, action.payload]
        }
      default:
        return state
    }
  }