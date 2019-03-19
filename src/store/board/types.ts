export interface Message {
    text : string
}

export interface BoardState {
    messages: Message[]
}

export const SEND_MESSAGE = 'SEND_MESSAGE'
export const DAMAGE_HP = 'DAMAGE_HP'
export const DAMAGE_MP = 'DAMAGE_MP'
export const RECOVER_HP = 'RECOVER_HP'
export const RECOVER_MP = 'RECOVER_MP'
export const INIT_CHARACTER = 'INIT_CHARACTER'

export interface SendMessageAction {
  type: typeof SEND_MESSAGE
  payload: Message
}

export interface InitCharacterAction {
  type: typeof INIT_CHARACTER
  payload: Message
}


export type BoardActionTypes = SendMessageAction | InitCharacterAction