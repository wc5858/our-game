import { Message, SEND_MESSAGE } from './types'

// TypeScript infers that this function is returning BoardActionTypes
export function sendMessage(newMessage: Message) {
  return {
    type: SEND_MESSAGE,
    payload: newMessage
  }
}