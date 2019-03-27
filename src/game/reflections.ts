import { HP_POTION, MP_POTION } from "./types";

export const potionReflection: {
    [key: string]: {
        max: string
        cur: string
        name: string
        num: string
    }
} = {
    [HP_POTION]: {
        max: 'hp',
        cur: 'curHp',
        name: '血',
        num: 'hpPotionNum'
    },
    [MP_POTION]: {
        max: 'mp',
        cur: 'curMp',
        name: '蓝',
        num: 'mpPotionNum'
    }
}