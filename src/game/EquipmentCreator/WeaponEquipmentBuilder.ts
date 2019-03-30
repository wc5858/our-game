import EquipmentBuilder from "./EquipmentBuilder";
import { getRandom } from "../util";
import { weaponTypes } from "../types";
import icons from '../../data/icons'

class WeaponEquipmentBuilder extends EquipmentBuilder {
    setSubInfo () {
        const subType = getRandom(weaponTypes)
        console.log(subType,icons[subType])
        this.equipment.subType = subType
        this.equipment.avatar = getRandom(icons[subType])
    }
}

export default WeaponEquipmentBuilder