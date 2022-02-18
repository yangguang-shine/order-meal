const state = {
	// user
    shopInfo: null,
    cartFoodList: [],
    orderListUpdate: [true, true, true, true],
    defaultAddress: {},
    businessType: '',
    // #ifdef MP-WEIXIN
    channel: 10,
    // #endif
    // #ifdef H5
    channel: 20,
    // #endif
	// manage
    selectShopItem: null,

}
export default state