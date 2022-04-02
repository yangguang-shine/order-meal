

import { ActionI} from '@/interface/index'
import address from './address'
import home from './home'
import menu from './menu'

import confirm from './confirm'
import order from './order'
import center from './center'

const action: ActionI = {
    ...address,
    ...home,
    ...menu,
    ...confirm,
    ...order,
    ...center,
}

export default action