
interface IActions {
    [key: string]: (state: any, payload: any) => any
}
import address from './address'
import shop from './shop'

const mutations: IActions = {
    ...address,
    ...shop,
}

export default mutations