import Attribute from "./Attribute";

class Attr implements Attribute {
    type: string
    dsc: string
    value: number
    constructor(type: string, dsc: string, value: number) {
        this.type = type
        this.dsc = dsc
        this.value = value
    }
}

export default Attr