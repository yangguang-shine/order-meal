


import address from './address'
import home from './home'
import menu from './menu'
import confirm from './confirm'
import order from './order'
import center from './center'
import shop from './shop'
import { MutationI } from '@/interface/vuex'



export default {
    ...address,
    ...home,
    ...menu,
    ...confirm,
    ...order,
    ...center,
    ...shop
} as MutationI