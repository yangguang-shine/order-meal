


const saveShopList = (state: any, shopList: any): void => {
    state.shopList = shopList
}
const saveShopInfo = (state: any, shopInfo: any): void => {
    state.shopInfo = shopInfo
}


export default {
    saveShopList,
    saveShopInfo
}