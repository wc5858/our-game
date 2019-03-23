export interface Message {
    text: string
}

export interface BoardState {
    messages: Message[]
}

export const SEND_MESSAGE = 'SEND_MESSAGE'

export interface SendMessageAction {
    type: typeof SEND_MESSAGE
    payload: Message
}

export type BoardActionTypes = SendMessageAction