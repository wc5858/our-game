import { START_GAME, SHOW_CHARACTER, CLOSE_CHARACTER } from './types'

// TypeScript infers that this function is returning BoardActionTypes
export function startGame() {
    return {
        type: START_GAME
    }
}

export function showCharacter() {
    return {
        type: SHOW_CHARACTER
    }
}

export function closeCharacter() {
    return {
        type: CLOSE_CHARACTER
    }
}