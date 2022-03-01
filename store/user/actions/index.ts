
interface IActions {
    [key: string]: (state: any, payload: any) => any
}
import address from './address'
import home from './home'
import menu from './menu'

const mutations: IActions = {
    ...address,
    ...home,
    ...menu,
}

export default mutations