import AttributesFactory from "./AttributesFactory";
import Attribute from "./Attribute";
import Attr from "./Attr";

class BasicAttributesFactory implements AttributesFactory {
    createRareAttribute(): Attribute {
        return new Attr('attackPower','攻击力+', Math.ceil(Math.random() * 5) + 5)
    }
    createEpicAttribute(): Attribute {
        return new Attr('mp','法力值+', Math.ceil(Math.random() * 10) + 10)
    }
    createLegendAttribute(): Attribute {
        return new Attr('hp','生命值+', Math.ceil(Math.random() * 10) + 10)
    }
}

export default BasicAttributesFactory