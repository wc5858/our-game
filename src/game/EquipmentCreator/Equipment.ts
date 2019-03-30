import Attribute from "./Attribute";

export default interface Equipment {
    id: number
    name: string
    part: string
    subType: string
    avatar: string
    attributes: Attribute[]
    level: number
    rarity: string
    enhancedLevel: number
    equiped: number
}