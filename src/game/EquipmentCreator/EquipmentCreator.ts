import Equipment from "./Equipment";
import WeaponEquipmentBuilder from "./WeaponEquipmentBuilder";
import ArmorEquipmentBuilder from "./ArmorEquipmentBuilder";
import { getRandom } from "../util";
import { parts, WEAPON } from "../types";

// 生成器模式生成装备
class EquipmentCreator {
    private weaponEquipmentBuilder: WeaponEquipmentBuilder
    private armorEquipmentBuilder: ArmorEquipmentBuilder
    private idCounter: number
    constructor(id?: number) {
        this.weaponEquipmentBuilder = new WeaponEquipmentBuilder()
        this.armorEquipmentBuilder = new ArmorEquipmentBuilder()
        this.idCounter = id || 1
    }

    public getEquipment(): Equipment {
        const part = getRandom(parts)
        return part == WEAPON ? this.weaponEquipmentBuilder.getEquipment(this.idCounter,part)
            : this.armorEquipmentBuilder.getEquipment(this.idCounter,part)
    }
}

export default EquipmentCreator