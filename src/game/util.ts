import { store } from "../store"
import { sendMessage } from '../store/board/actions'

export const getRandomItem = function (items: object) {
    const data = Object.entries(items)
    return data[Math.floor(Math.random() * data.length)][1]
}

export const getDrift = function () {
    return Math.random() * 0.4 + 0.8
}

export const sendSimpleMessage = function(text: string) {
    store.dispatch(sendMessage({
        text: text
    }))
}