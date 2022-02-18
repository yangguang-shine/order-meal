interface Istate {
    topAddressWidthFlag: boolean,
    tabListFixedFlag: boolean,
    addressList: any[],
    defaultAddress: any
    recommandShopList: any[],

}
const state: Istate = {
    topAddressWidthFlag: false,
    tabListFixedFlag: false,
    addressList: [],
    defaultAddress: {},
    recommandShopList: []
    // addressList,
    // namespace: true,
    // user
    // defaultAddress: {},
    // businessType: '',
    // // #ifdef MP-WEIXIN
    // channel: 10,
    // // #endif
    // // #ifdef H5
    // // #endif
	// // manage
    // selectShopItem: null,


}
export default state