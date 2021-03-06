import { store } from "../store"
import { sendMessage } from '../store/board/actions'
import Equipment from './EquipmentCreator/Equipment'
import { rarity, rarityColor } from "./types";

export const getRandom = function (data: Array<any>) {
    return data[Math.floor(Math.random() * data.length)]
}

export const getRandomItem = function (items: object) {
    return getRandom(Object.entries(items))[1]
}

export const getDrift = function (val: number) {
    return Math.ceil((Math.random() * 0.4 + 0.8) * val)
}

export const sendSimpleMessage = function (text: string) {
    store.dispatch(sendMessage({
        text: text
    }))
}

export const emphasize = function (str: string, color?: string) {
    return `<span style="color:${color || 'red'}">${str}</span>`
}

export const renderEquipment = function (eq: Equipment) {
    return `<img src=${eq.avatar} class="icon-eq icon-eq-${rarityColor[eq.rarity]}"/>${emphasize(eq.name, rarityColor[eq.rarity])}`
}

export const warn = function (msg: string) {
    alert(msg)
}