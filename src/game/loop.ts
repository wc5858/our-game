import { store } from "../store"
import { sendMessage } from '../store/board/actions'

export default function () {
    store.dispatch(sendMessage({
        text : 'Learn about actions'
    }))
}