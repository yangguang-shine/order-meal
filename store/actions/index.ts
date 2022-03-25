

import { ActionI} from '@/interface/index'
import address from './address'
import home from './home'
import menu from './menu'

import confirm from './confirm'
import order from './order'

const actions: ActionI = {
    ...address,
    ...home,
    ...menu,
    ...confirm,
    ...order,
}

export default actions