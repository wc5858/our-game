import Attribute from "./Attribute";
import Equipment from "./Equipment";
import ConcreteEquipment from "./ConcreteEquipment";
import { rarity, RARE_S, RARE_SS } from "../types";
import { getRandom } from "../util";
import { store } from "../../store";
import AttributesFactory from "./AttributesFactory";
import BasicAttributesFactory from "./BasicAttributesFactory";

abstract class EquipmentBuilder {
    private attrFactory: AttributesFactory
    protected equipment: Equipment
    protected part: string = ''
    protected rare: string = ''
    protected id: number = 0

    constructor() {
        this.equipment = new ConcreteEquipment()
        this.attrFactory = new BasicAttributesFactory()
    }

    protected setId(id: number) {
        this.id = id
        this.equipment.id = id
    }
    protected setPart(part: string) {
        this.part = part
        this.equipment.part = part
    }
    protected setName() {
        this.equipment.name = `${this.part}${this.id}`
    }
    protected setRarity() {
        this.rare = getRandom(rarity)
        this.equipment.rarity = this.rare
    }
    protected setLevel() {
        const character = store.getState().character
        this.equipment.level = character.level
    }
    protected setAttributes() {
        let attributes: Attribute[] = []
        attributes.push(this.attrFactory.createRareAttribute())
        if(this.rare == RARE_S || this.rare == RARE_SS) {
            attributes.push(this.attrFactory.createEpicAttribute())
        }
        if(this.rare == RARE_SS) {
            attributes.push(this.attrFactory.createLegendAttribute())
        }
        this.equipment.attributes = attributes
    }
    // 模板方法模式的抽象方法
    abstract setSubInfo(): void
    public readonly getEquipment = (id: number, part: string) => {
        // 模板方法
        // 由于ts不支持final关键字，这里用只读的lambda表达式作为替代
        this.setId(id)
        this.setPart(part)
        this.setName()
        this.setAttributes()
        this.setRarity()
        this.setLevel()
        this.setSubInfo()
        // 返回了一个深拷贝的原型
        return Object.assign({}, this.equipment)
    }
}

export default EquipmentBuilder