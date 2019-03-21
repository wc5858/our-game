import RoundSingleton from "./RoundSingleton";
import races from "../data/races";
import careers from "../data/careers";

let roundRunner = RoundSingleton.getInstance()

// 这个算不算（或者能不能）改成适配器？
export default {
    init(options: {
        raceID: string
        careerID: string
    }) {
        let race = races[options.raceID]
        let career = careers[options.careerID]
        
        roundRunner.init()
    },
    doSth() {
        roundRunner.doSth()
    }
}