
interface IActions {
    [key: string]: (state: any, payload: any) => any
}
import address from './address'
import home from './home'

const mutations: IActions = {
    ...address,
    ...home,
}

export default mutations