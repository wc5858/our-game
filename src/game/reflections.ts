import { updateHp, updateMp, setHpPotion, setMpPotion } from "../store/character/actions";
import { HP_POTION, MP_POTION } from "./types";

export const potionReflection: {
    [key: string]: {
        max: string
        cur: string
        name: string
        num: string
        action1: Function
        action2: Function
    }
} = {
    [HP_POTION]: {
        max: 'hp',
        cur: 'curHp',
        name: '血',
        num: 'hpPotionNum',
        action1: updateHp,
        action2: setHpPotion
    },
    [MP_POTION]: {
        max: 'mp',
        cur: 'curMp',
        name: '蓝',
        num: 'mpPotionNum',
        action1: updateMp,
        action2: setMpPotion
    }
}