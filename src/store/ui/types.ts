export interface UIState {
    showSkill: boolean
    showCareer: boolean
}

export const START_GAME = 'START_GAME'
export const INIT_GAME = 'INIT_GAME'

export interface StartGameAction {
    type: typeof START_GAME
}

export interface InitGameAction {
    type: typeof INIT_GAME
}

export type UIActionTypes = StartGameAction | InitGameAction