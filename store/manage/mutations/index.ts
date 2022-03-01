
interface Mutations {
    [key: string]: (state: any, payload: any) => any
}
import address from './address'
import home from './shop'

const mutations: Mutations = {
    ...address,
    ...home,
}

export default mutations