import { START_GAME, SHOW_CHARACTER, CLOSE_CHARACTER, SHOW_SHOP, CLOSE_SHOP } from './types'

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

export function showShop() {
    return {
        type: SHOW_SHOP
    }
}

export function closeShop() {
    return {
        type: CLOSE_SHOP
    }
}