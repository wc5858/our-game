import { Equipment, Attributes } from "../store/bag/types";
import { parts, weaponTypes, WEAPON, rarity, RARE_S, RARE_SS } from "./types";
import { getRandom } from "./util";
import icons from '../data/icons'
import { store } from "../store";

export default class EquipmentFactory {
    private idCounter: number = 1
    private getAttributes(rare: string) {
        let attributes: Attributes[] = []
        attributes.push({
            type: 'attackPower',
            dsc: '攻击力+',
            value: Math.ceil(Math.random() * 5) + 5
        })
        if(rare == RARE_S || rare == RARE_SS) {
            attributes.push({
                type: 'mp',
                dsc: '法力值+',
                value: Math.ceil(Math.random() * 10) + 10
            })
        }
        if(rare == RARE_SS) {
            attributes.push({
                type: 'hp',
                dsc: '生命值+',
                value: Math.ceil(Math.random() * 10) + 10
            })
        }
        return attributes
    }
    public getEquipment() {
        const part = getRandom(parts)
        const rare = getRandom(rarity)
        const character = store.getState().character
        const subType = part == WEAPON ? getRandom(weaponTypes) : ''
        let e: Equipment = {
            id: this.idCounter,
            name: `${part}${this.idCounter}`,
            part: part,
            subType: subType,
            avatar: getRandom(icons[subType || part]),
            attributes: this.getAttributes(rare),
            level: character.level,
            rarity: rare,
            enhancedLevel: 0,
            equiped: 0
        }
        return e
    }
}