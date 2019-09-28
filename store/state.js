const state = {
    shopInfo: {},
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
}
export default state