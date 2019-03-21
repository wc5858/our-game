import {
  CharacterState,
  CharacterActionTypes,
  INIT_CHARACTER,
  UPDATE_HP
} from './types'

const initialState: CharacterState = {
  name: '',
  avatar: '',
  careerID: '',
  hp: 100,
  mp: 100,
  curHp: 100,
  curMp: 100,
  equipments: [],
  attackPower: 10,
  attackSpeed: 1,
  defensivePower: 10,
  critRate: 0,
  exp: 0,
  level: 1,
  money: 0
}

export function characterReducer(
  state = initialState,
  action: CharacterActionTypes
): CharacterState {
  switch (action.type) {
    case INIT_CHARACTER:
      return Object.assign({},state,{
        name: action.name,
        careerID: action.careerID
      })
    case UPDATE_HP:
      return Object.assign({},state,{
        curHp: action.value
      })
    default:
      return state
  }
}