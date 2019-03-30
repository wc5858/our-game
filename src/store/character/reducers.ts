import {
    CharacterState,
    CharacterActionTypes,
    UPDATE_CHARACTER,
} from './types'

export const initialState: CharacterState = {
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
    gem: 0,
    hpPotionNum: 10,
    mpPotionNum: 10
}

export function characterReducer(
    state = initialState,
    action: CharacterActionTypes
): CharacterState {
    switch (action.type) {
        case UPDATE_CHARACTER:
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}