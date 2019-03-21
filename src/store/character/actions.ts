import * as types from './types'

export function initCharacter(data: types.CharacterInitData) {
  return {
    type: types.INIT_CHARACTER,
    name: data.name,
    careerID: data.careerID
  }
}

export function updateHp(data: {
  value: number
}) {
  return {
    type: types.UPDATE_HP,
    value: data.value
  }
}