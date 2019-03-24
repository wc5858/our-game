import avatar1 from '../assets/avatar1.jpg'
import avatar6 from '../assets/avatar6.png'
import avatar3 from '../assets/avatar3.jpg'
import avatar4 from '../assets/avatar4.jpg'
import { Race } from '../game/types';
const data: {
    [key: string]: Race
} = {
    '001': {
        name: '熊猫人',
        avatar: avatar1,
        attackGrow: 2,
        hpGrow: 5,
        mpGrow: 15,
    },
    '002': {
        name: '巫妖',
        avatar: avatar3,
        attackGrow: 3,
        hpGrow: 5,
        mpGrow: 5,
    },
    '003': {
        name: '鶸',
        avatar: avatar4,
        attackGrow: 1,
        hpGrow: 1,
        mpGrow: 1,
    },
    '004': {
        name: '鸽子',
        avatar: avatar6,
        attackGrow: 2,
        hpGrow: 2,
        mpGrow: 20,
    }
}
export default data