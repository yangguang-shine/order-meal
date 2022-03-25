import { MutationI, StateI } from "@/interface/index";

import { ShopInfoI, TabItemI } from '@/interface/index'

function setTopAddressWidthFlag(state: StateI, topAddressWidthFlag: boolean): void {
    state.topAddressWidthFlag = topAddressWidthFlag;
};
function setTabListFixedFlag(state: StateI, tabListFixedFlag: boolean): void {
    state.tabListFixedFlag = tabListFixedFlag;
};

function setRecommandShopList(state: StateI, recommandShopList: ShopInfoI[]): void {
    state.recommandShopList = recommandShopList;
};

function changeTabItem(state: StateI, tabItem: TabItemI) {
    state.selectedTabItem = tabItem;
};
function saveShopInfo(state: StateI, shopInfo: ShopInfoI) {
    state.shopInfo = shopInfo;
};
function saveBusinessType(state: StateI, type: number) {
    state.businessType = type;
};

export default {
    setTopAddressWidthFlag,
    setTabListFixedFlag,
    setRecommandShopList,
    changeTabItem,
    saveShopInfo,
    saveBusinessType,
} as MutationI;
