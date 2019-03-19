import {
  CharacterState,
  CharacterActionTypes,
  INIT_CHARACTER
} from './types'

const initialState: CharacterState = {
  name: '',
  avatar: '',
  careerID: '',
  hp: 100,
  mp: 100,
  equipments: [],
  attackPower: 10,
  defensivePower: 10,
  critRate: 0,
  exp: 0,
  level: 1
}

export function characterReducer(
  state = initialState,
  action: CharacterActionTypes
): CharacterState {
  switch (action.type) {
    case INIT_CHARACTER:
      return Object.assign({},state,initialState,{
        name: action.name,
        careerID: action.careerID
      })
    default:
      return state
  }
}