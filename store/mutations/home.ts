import { MutationI, StateI } from "@/interface/index";

import { ShopItemI, TabItemI } from "@/interface/index";

function setTopAddressWidthFlag(state: StateI, topAddressWidthFlag: boolean): void {
    state.topAddressWidthFlag = topAddressWidthFlag;
}
function setTabListFixedFlag(state: StateI, tabListFixedFlag: boolean): void {
    state.tabListFixedFlag = tabListFixedFlag;
}

function setRecommandShopList(state: StateI, recommandShopList: ShopItemI[]): void {
    state.recommandShopList = recommandShopList;
}

function changeTabItem(state: StateI, tabItem: TabItemI): void {
    state.selectedTabItem = tabItem;
}
function saveShopInfo(state: StateI, shopInfo: ShopItemI): void {
    state.shopInfo = shopInfo;
    // commit("setFoodCategoryList", categoryList);

}
function saveBusinessType(state: StateI, type: number): void {
    state.businessType = type;
}

export default {
    setTopAddressWidthFlag,
    setTabListFixedFlag,
    setRecommandShopList,
    changeTabItem,
    saveShopInfo,
    saveBusinessType,
} as MutationI;
