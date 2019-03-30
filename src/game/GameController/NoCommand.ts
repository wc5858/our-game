import Command from "./Command";

export default class NoCommand implements Command {
    exute() {
        console.log('nothing happened')
        return
    }
}