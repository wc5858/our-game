import RoundSingleton from "./RoundSingleton";
import races from "../data/races";
import careers from "../data/careers";
import { store } from "../store";
import { initCharacter } from "../store/character/actions";

let roundRunner = RoundSingleton.getInstance()

// 这个算不算（或者能不能）改成适配器？
export default {
    init(options: {
        raceID: string
        careerID: string
    }) {
        let race = races[options.raceID]
        let career = careers[options.careerID]
        
        let character = store.getState().character

        store.dispatch(initCharacter({
            name: '沉睡的朱老板',
            avatar: race.avatar,
            career: career.name,
            race: career.name,
            careerID: options.careerID,
            raceID: options.raceID,
            attackGrow: character.attackGrow + race.attackGrow + career.attackGrow,
            hpGrow: character.hpGrow + race.hpGrow + career.hpGrow,
            mpGrow: character.mpGrow + race.mpGrow + career.mpGrow
        }))

        roundRunner.init()
    },
    doSth() {
        roundRunner.doSth()
    }
}