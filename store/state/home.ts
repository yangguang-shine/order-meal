import { TabItemI, ShopInfoI } from "@/interface/index";
export interface HomeStateI {
    topAddressWidthFlag: boolean;
    tabListFixedFlag: boolean;
    recommandShopList: ShopInfoI[];
    tabList: TabItemI[];
    selectedTabItem: TabItemI;
    shopInfo: ShopInfoI;
    businessType: number;
}
const tabList: TabItemI[] = [
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

const state: HomeStateI = {
    topAddressWidthFlag: false,
    tabListFixedFlag: false,
    recommandShopList: [],
    tabList,
    selectedTabItem: tabList[0],
    shopInfo: {
        address: "",
        businessTypes: "[]",
        description: "",
        endTime: "18:00",
        imgUrl: "",
        latitude: "",
        location: "",
        longitude: "",
        mainColor: "",
        manageID: 0,
        minus: "[]",
        shopID: 0,
        shopName: "",
        startTime: "09:00",
        fullImgPath: "",
        minusList: [],
    },
    businessType: 2,
};

// minusList1: []
export default state;
