import avatar2 from '../assets/avatar2.jpg'
import avatar3 from '../assets/avatar3.png'
import avatar4 from '../assets/avatar4.png'
import avatar5 from '../assets/avatar5.png'
import { Career } from '../game/types';
const data: {
    [key: string]: Career
} = {
    '001': {
        name: '程序员',
        avatar: avatar2,
        skillTree: {

        },
        attackGrow: 3,
        hpGrow: 5,
        mpGrow: 10,
    },
    '002': {
        name: '段子手',
        avatar: avatar3,
        skillTree: {

        },
        attackGrow: 2,
        hpGrow: 20,
        mpGrow: 20,
    },
    '003': {
        name: '微商',
        avatar: avatar4,
        skillTree: {

        },
        attackGrow: 1,
        hpGrow: 30,
        mpGrow: 10,
    },
    '004': {
        name: '微博大V',
        avatar: avatar5,
        skillTree: {

        },
        attackGrow: 2,
        hpGrow: 10,
        mpGrow: 30,
    }
}
export default data