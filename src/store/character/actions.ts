import { UPDATE_CHARACTER, CharacterState } from './types'

export function updateCharacter(data: CharacterState) {
    return {
        type: UPDATE_CHARACTER,
        payload: data
    }
}