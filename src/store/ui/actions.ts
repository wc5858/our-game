import { START_GAME, INIT_GAME } from './types'

// TypeScript infers that this function is returning BoardActionTypes
export function startGame() {
  return {
    type: START_GAME
  }
}

export function initGame() {
  return {
    type: INIT_GAME
  }
}