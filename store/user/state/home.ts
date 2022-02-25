interface ITabItem {
    title: string,
    type: string
}
const tabList: ITabItem[] = [
    {
        title: '综合排序',
        type: 'comprehensive'
    },
    {
        title: '销量最高',
        type: 'sale'
    },
    {
        title: '距离最近',
        type: 'distance'
    }
]

const state = {
    topAddressWidthFlag: false,
    tabListFixedFlag: false,
    recommandShopList: [],
    tabList,
    selectedTabItem: tabList[0],
    shopInfo: {},
    businessType: 2,
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