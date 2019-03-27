import Attribute from "./Attribute";
import Equipment from "./Equipment";

class ConcreteEquipment implements Equipment {
    id: number = 0
    name: string = ''
    part: string = ''
    subType: string = ''
    avatar: string = ''
    attributes: Attribute[] = []
    level: number = 0
    rarity: string = ''
    enhancedLevel: number = 0
    equiped: number = 0
}

export default ConcreteEquipment