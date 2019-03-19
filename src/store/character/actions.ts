import { CharacterInitData, INIT_CHARACTER } from './types'

// TypeScript infers that this function is returning BoardActionTypes
export function initCharacter(data: CharacterInitData) {
  return {
    type: INIT_CHARACTER,
    name: data.name,
    careerID: data.careerID
  }
}