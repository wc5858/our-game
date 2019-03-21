import RoundSingleton from "./RoundSingleton";

let gameCore = RoundSingleton.getInstance()

export default {
    init() {
        gameCore.init()
    },
    doSth() {
        gameCore.doSth()
    }
}