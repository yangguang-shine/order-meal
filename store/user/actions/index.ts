
interface IActions {
    [key: string]: (state: any, payload: any) => any
}
import address from './address'
import home from './home'
import menu from './menu'

import confirm from './confirm'
import order from './order'

const mutations: IActions = {
    ...address,
    ...home,
    ...menu,
    ...confirm,
    ...order,
}

export default mutations