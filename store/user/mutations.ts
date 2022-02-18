

import router from '../../utils/router'


interface Mutations {
    [key: string]: (state: any, payload: any) => any
}
const mutations: Mutations = {}

mutations['setTopAddressWidthFlag'] = (state: any, topAddressWidthFlag: boolean): void => {
    state.topAddressWidthFlag = topAddressWidthFlag
}
mutations['setTabListFixedFlag'] = (state: any, tabListFixedFlag: boolean): void => {
    state.tabListFixedFlag = tabListFixedFlag
}
mutations['setAddressList'] = (state: any, addressList: []): void => {
    state.addressList = addressList
}
mutations['setDefaultAddress'] = (state: any, defaultAddress: any): void => {

    state.defaultAddress = defaultAddress
}

mutations['setRecommandShopList'] = (state: any, recommandShopList: any): void => {
    state.recommandShopList = recommandShopList
}

mutations['toSelectAddress'] = (): void => {
    router.navigateTo({
        name: "user/address/list",
        query: {
            fromPage: "userHome"
        }
    });
}
export default mutations