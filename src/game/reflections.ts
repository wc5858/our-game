import { updateHp, updateMp } from "../store/character/actions";
import { HP_POTION, MP_POTION } from "./types";

export const potionReflection: {
    [key: string]: {
        max: string
        cur: string
        name: string
        action: Function
    }
} = {
    [HP_POTION]: {
        max: 'hp',
        cur: 'curHp',
        name: '血',
        action: updateHp
    },
    [MP_POTION]: {
        max: 'mp',
        cur: 'curMp',
        name: '蓝',
        action: updateMp
    }
}