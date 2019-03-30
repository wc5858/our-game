import Attribute from "./Attribute";

interface AttributesFactory {
    createRareAttribute(): Attribute
    createEpicAttribute(): Attribute
    createLegendAttribute(): Attribute
}

export default AttributesFactory