import { START_GAME } from './types'

// TypeScript infers that this function is returning BoardActionTypes
export function startGame() {
  return {
    type: START_GAME
  }
}