import { TabItemI, ShopItemI, initShopItem } from "@/interface/index";
import { RefI } from "@/interface/vueInterface";
import { ref, reactive } from "vue";

export interface HomeStateI {
    topAddressWidthFlag: boolean;
    tabListFixedFlag: boolean;
    recommandShopList: ShopItemI[];
    tabList: TabItemI[];
    selectedTabItem: TabItemI;

    searchShopFlag: boolean,
    tabListTop: number
    topAddressSearchPX: number,
    fixedImgOpacityFlag: boolean
}
export type HomeStateG = {
    [T in keyof HomeStateI] : RefI<HomeStateI[T]>
}
// export interface HomeStateGetI  {
//     topAddressWidthFlag: RefI<boolean>,
//     tabListFixedFlag: RefI<boolean>,
//     recommandShopList: RefI<ShopItemI[]>,
//     tabList: RefI<TabItemI[]>,
//     selectedTabItem: RefI<TabItemI>,

//     searchShopFlag: RefI<boolean>,
//     tabListTop: RefI<number>,
//     topAddressSearchPX: RefI<number>,
//     fixedImgOpacityFlag: RefI<boolean>,

// }
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


const homeState: HomeStateI = reactive({
    topAddressWidthFlag: false,
    tabListFixedFlag: false,
    recommandShopList: [],
    tabList,
    selectedTabItem: tabList[0],
    // shopInfo: initShopItem,
    searchShopFlag: false,
    // businessType: 2,
    tabListTop: 0,
    topAddressSearchPX: 50,
    fixedImgOpacityFlag: false
});

export default homeState

