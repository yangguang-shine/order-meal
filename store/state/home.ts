import { TabItemI, ShopItemI, initShopItem } from "@/interface/index";
export interface StateHomeI {
    topAddressWidthFlag: boolean;
    tabListFixedFlag: boolean;
    recommandShopList: ShopItemI[];
    tabList: TabItemI[];
    selectedTabItem: TabItemI;
    shopInfo: ShopItemI;
    searchShopFlag: boolean,
    businessType: number;
    tabListTop: number
}
export const tabList: TabItemI[] = [
    {
        title: "综合排序",
        type: "comprehensive",
    },
    {
        title: "销量最高",
        type: "sale",
    },
    {
        title: "距离最近",
        type: "distance",
    },
];


const state: StateHomeI = {
    topAddressWidthFlag: false,
    tabListFixedFlag: false,
    recommandShopList: [],
    tabList,
    selectedTabItem: tabList[0],
    shopInfo: initShopItem,
    searchShopFlag: false,
    businessType: 2,
    tabListTop: 0
};

// minusList1: []
export default state;
