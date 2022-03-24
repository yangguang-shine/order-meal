export interface ITabItem {
    title: string,
    type: string,
}
export interface HomeStateI {
    topAddressWidthFlag: boolean,
    tabListFixedFlag: boolean,
    recommandShopList: [],
    tabList: ITabItem[],
    selectedTabItem: ITabItem,
    shopInfo: any,
    businessType: number,
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

const state: HomeStateI = {
    topAddressWidthFlag: false,
    tabListFixedFlag: false,
    recommandShopList: [],
    tabList,
    selectedTabItem: tabList[0],
    shopInfo: {},
    businessType: 2,
}
export default state