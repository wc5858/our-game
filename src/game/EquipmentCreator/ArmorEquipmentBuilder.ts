import EquipmentBuilder from "./EquipmentBuilder";
import { getRandom } from "../util";
import icons from '../../data/icons'

class ArmorEquipmentBuilder extends EquipmentBuilder {
    setSubInfo () {
        this.equipment.subType = ''
        this.equipment.avatar = getRandom(icons[this.equipment.part])
    }
}

export default ArmorEquipmentBuilder