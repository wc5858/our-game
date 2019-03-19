export interface UIState {
    showStart: boolean
    showSkill: boolean
}

export const START_GAME = 'START_GAME'

export interface StartGameAction {
    type: typeof START_GAME
}


export type UIActionTypes = StartGameAction