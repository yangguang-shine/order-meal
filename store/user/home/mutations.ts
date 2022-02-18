

import router from '../../../utils/router'


interface Mutations {
    [key: string]: (state: any, payload: any) => any
}
const mutations: Mutations = {}
mutations['setDefaultAddress'] = (state: any, address: any): void => {
    state.defaultAddress = address
}
mutations['changeTabItem'] = (state, tabItem) => {
    state.selectedTabItem = tabItem
}
export default mutations