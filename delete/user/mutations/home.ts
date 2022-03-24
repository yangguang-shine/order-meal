


const setTopAddressWidthFlag = (state: any, topAddressWidthFlag: boolean): void => {
    state.topAddressWidthFlag = topAddressWidthFlag
}
const setTabListFixedFlag = (state: any, tabListFixedFlag: boolean): void => {
    state.tabListFixedFlag = tabListFixedFlag
}

const setRecommandShopList = (state: any, recommandShopList: any): void => {
    state.recommandShopList = recommandShopList
}

const changeTabItem = (state: any, tabItem: any) => {
    state.selectedTabItem = tabItem
}
const saveShopInfo = (state: any, shopInfo: any) => {
    state.shopInfo = shopInfo
}
const saveBusinessType = (state: any, type: any) => {
    state.businessType = type
}



export default {
    setTopAddressWidthFlag,
    setTabListFixedFlag,
    setRecommandShopList,
    changeTabItem,
    saveShopInfo,
    saveBusinessType
}