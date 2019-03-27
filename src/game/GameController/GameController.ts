import Command from "./Command";
import NoCommand from "./NoCommand";

export default class GameController {
    protected slots:Command[]
    constructor () {
        this.slots = new Array(10).fill(new NoCommand())
    }
}