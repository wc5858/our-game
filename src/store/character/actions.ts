import * as types from './types'

export function initCharacter(data: types.CharacterInitData) {
  return {
    type: types.INIT_CHARACTER,
    payload: data
  }
}

export function setAward(data: types.AwardData) {
  return {
    type: types.SET_AWARD,
    payload: data
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

export function updateMp(data: {
  value: number
}) {
  return {
    type: types.UPDATE_MP,
    value: data.value
  }
}

export function levelUp(data: types.LevelUpData) {
  return {
    type: types.LEVEL_UP,
    payload: data
  }
}