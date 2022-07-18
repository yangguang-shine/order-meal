// import { MutationI, StateI } from "@/interface/index";

import fetch from "@/utils/fetch";
import { shopImgPath } from "@/config/index";
import {  OriginShopItemI, ShopItemI, TabItemI } from "@/interface/index";
import getBusinessTypeInfo from "@/utils/getBusinessTypeInfo";
import addressState from "../address/state";
import homeState from "./state";
import shopState from "../shop/state";
export interface ShopListParamsI {
    type?: string;
    businessType?: number;
}
async function getRecommandShopList( { type = "", businessType = 2 }: ShopListParamsI = {}) {
    let data: OriginShopItemI[] = await fetch("shop/list", {
        businessType,
        type,
        latitude: addressState.defaultAddress.latitude,
        longitude: addressState.defaultAddress.longitude,
    });
    data.push(...data)
    const recommandShopList: ShopItemI[] = (data || []).map(
        (item: OriginShopItemI): ShopItemI => ({
            ...item,
            minusList: JSON.parse(item.minus),
            fullImgPath: `${shopImgPath}/${item.imgUrl}`,
            ...getBusinessTypeInfo(item.businessTypes),
        })
    );
    homeState.recommandShopList = recommandShopList
    return recommandShopList || [];
}

function setTopAddressWidthFlag(topAddressWidthFlag: boolean): void {
    homeState.topAddressWidthFlag = topAddressWidthFlag;
}
function setTabListFixedFlag(tabListFixedFlag: boolean): void {
    homeState.tabListFixedFlag = tabListFixedFlag;
}

function setRecommandShopList( recommandShopList: ShopItemI[]): void {
    homeState.recommandShopList = recommandShopList;
}

function changeTabItem( tabItem: TabItemI): void {
    homeState.selectedTabItem = tabItem;
}
function setSearchShopFlag( searchShopFlag: boolean): void {
    homeState.searchShopFlag = searchShopFlag;
}

function setTabListTop( tabListTop: number): void {
    homeState.tabListTop = tabListTop;
}

export interface HomeActionI {
    getRecommandShopList: (payload: ShopListParamsI) => Promise<ShopItemI[]>;
    setTopAddressWidthFlag: (topAddressWidthFlag: boolean) => void;
    setTabListFixedFlag: (tabListFixedFlag: boolean) => void;
    setRecommandShopList: (recommandShopList: ShopItemI[]) => void;
    changeTabItem: (tabItem: TabItemI) => void;
    setSearchShopFlag: (searchShopFlag: boolean) => void;
    setTabListTop: (tabListTop: number) => void;
}
const homeAction: HomeActionI = {
    getRecommandShopList,
    setTopAddressWidthFlag,
    setTabListFixedFlag,
    setRecommandShopList,
    changeTabItem,
    setSearchShopFlag,
    setTabListTop,
} 
export default homeAction
