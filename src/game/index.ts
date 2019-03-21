import RoundSingleton from "./RoundSingleton";

let roundRunner = RoundSingleton.getInstance()

export default {
    init() {
        roundRunner.init()
    },
    doSth() {
        roundRunner.doSth()
    }
}