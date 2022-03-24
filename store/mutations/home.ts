import { MutationI } from "@/interface/index";

const setTopAddressWidthFlag: MutationI = (state: any, topAddressWidthFlag: boolean): void => {
    state.topAddressWidthFlag = topAddressWidthFlag;
};
const setTabListFixedFlag: MutationI = (state: any, tabListFixedFlag: boolean): void => {
    state.tabListFixedFlag = tabListFixedFlag;
};

const setRecommandShopList: MutationI = (state: any, recommandShopList: any): void => {
    state.recommandShopList = recommandShopList;
};

const changeTabItem: MutationI = (state: any, tabItem: any) => {
    state.selectedTabItem = tabItem;
};
const saveShopInfo: MutationI = (state: any, shopInfo: any) => {
    state.shopInfo = shopInfo;
};
const saveBusinessType: MutationI = (state: any, type: any) => {
    state.businessType = type;
};

export default {
    setTopAddressWidthFlag,
    setTabListFixedFlag,
    setRecommandShopList,
    changeTabItem,
    saveShopInfo,
    saveBusinessType,
};
