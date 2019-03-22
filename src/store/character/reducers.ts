import {
  CharacterState,
  CharacterActionTypes,
  INIT_CHARACTER,
  UPDATE_HP,
  UPDATE_MP,
  SET_AWARD
} from './types'

const initialState: CharacterState = {
  name: '',
  avatar: '',
  career: '',
  race: '',
  careerID: '',
  raceID: '',
  hp: 100,
  mp: 100,
  curHp: 100,
  curMp: 100,
  equipments: [],
  attackPower: 10,
  attackSpeed: 1,
  critRate: 0,
  attackGrow: 1,
  hpGrow: 10,
  mpGrow: 10,
  exp: 0,
  level: 1,
  money: 0,
  gem: 0
}

export function characterReducer(
  state = initialState,
  action: CharacterActionTypes
): CharacterState {
  switch (action.type) {
    case INIT_CHARACTER:
      return Object.assign({}, state, action.payload)
    case SET_AWARD:
      return Object.assign({}, state, action.payload)
    case UPDATE_HP:
      return Object.assign({}, state, {
        curHp: action.value
      })
    case UPDATE_MP:
      return Object.assign({}, state, {
        curMp: action.value
      })
    default:
      return state
  }
}