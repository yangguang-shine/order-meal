import { MutationI, StateI } from "@/interface/index";

import { ShopItemI, TabItemI } from "@/interface/index";
import { navigationBarHeightPX, tabBarHeightPX } from "@/utils/";
import { StateOrderI } from "../state/order";

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
}
function setSearchShopFlag(state: StateI, searchShopFlag: boolean): void {
    state.searchShopFlag = searchShopFlag;
}

function saveBusinessType(state: StateI, type: number): void {
    state.businessType = type;
}
function setTabListTop(state: StateI, tabListTop: number): void {
    
    state.tabListTop = tabListTop + navigationBarHeightPX;
}




export default {
    setTopAddressWidthFlag,
    setTabListFixedFlag,
    setRecommandShopList,
    changeTabItem,
    saveShopInfo,
    setSearchShopFlag,
    saveBusinessType,
    setTabListTop
};
