
interface Mutations {
    [key: string]: (state: any, payload: any) => any
}
import address from './address'
import home from './home'
import menu from './menu'
import confirm from './confirm'
import order from './order'

const mutations: Mutations = {
    ...address,
    ...home,
    ...menu,
    ...confirm,
    ...order,
}

export default mutations