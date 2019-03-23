export interface UIState {
    showBoards: boolean
    showCareer: boolean
    showCharacter: boolean
    showShop: boolean
    showLearnSkill: boolean
}

export const START_GAME = 'START_GAME'
export const SHOW_CHARACTER = 'SHOW_CHARACTER'
export const SHOW_SHOP = 'SHOW_SHOP'
export const SHOW_LEARN_SKILL = 'SHOW_LEARN_SKILL'

export interface StartGameAction {
    type: typeof START_GAME
}

export interface ShowCharacterAction {
    type: typeof SHOW_CHARACTER
}

export interface ShowShopAction {
    type: typeof SHOW_SHOP
}

export interface ShowLearnSkillAction {
    type: typeof SHOW_LEARN_SKILL
}

export type UIActionTypes = StartGameAction | ShowCharacterAction | ShowShopAction | ShowLearnSkillAction