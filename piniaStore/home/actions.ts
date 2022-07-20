// import { MutationI, StateI } from "@/interface/index";

import fetch from "@/utils/fetch";
import { shopImgPath } from "@/config/index";
import { OriginShopItemI, ShopItemI, TabItemI } from "@/interface/index";
import getBusinessTypeInfo from "@/utils/getBusinessTypeInfo";
import addressState from "../address/state";
import homeState from "./state";
import shopState from "../shop/state";
export interface ShopListParamsI {
    type?: TabItemI["type"];
    businessType?: number;
}
export async function getRecommandShopList({ type = "comprehensive", businessType = 2 }: ShopListParamsI = {}) {
    let data: OriginShopItemI[] = await fetch("shop/list", {
        businessType,
        type,
        latitude: addressState.defaultAddress.latitude,
        longitude: addressState.defaultAddress.longitude,
    });
    console.log(type)
    if (type === 'sale') {
        (data || []).reverse()
    } else if (type === 'distance') {
        (data || []).sort((a, b) => {
            console.log(a.shopName > b.shopName)
            return a.shopName > b.shopName ? 1 : -1
        } )
    }
    data.push(...data);
    const recommandShopList: ShopItemI[] = (data || []).map(
        (item: OriginShopItemI): ShopItemI => ({
            ...item,
            minusList: JSON.parse(item.minus),
            fullImgPath: `${shopImgPath}/${item.imgUrl}`,
            ...getBusinessTypeInfo(item.businessTypes),
        })
    );
    homeState.recommandShopList = recommandShopList;
    return recommandShopList || [];
}
export function setTopAddressWidthFlag(topAddressWidthFlag: boolean): void {
    homeState.topAddressWidthFlag = topAddressWidthFlag;
}
export function setTabListFixedFlag(tabListFixedFlag: boolean): void {
    homeState.tabListFixedFlag = tabListFixedFlag;
}
export function setRecommandShopList(recommandShopList: ShopItemI[]): void {
    homeState.recommandShopList = recommandShopList;
}
export function changeTabItem(tabItem: TabItemI): void {
    homeState.selectedTabItem = tabItem;
}
export function setSearchShopFlag(searchShopFlag: boolean): void {
    homeState.searchShopFlag = searchShopFlag;
}
export function setTabListTop(tabListTop: number): void {
    homeState.tabListTop = tabListTop;
}
export function setTopAddressSearchPX(topAddressSearchPX: number) {
    console.log('topAddressSearchPX')
    console.log(topAddressSearchPX)
    homeState.topAddressSearchPX = topAddressSearchPX;
}

export interface HomeActionI {
    getRecommandShopList: (payload: ShopListParamsI) => Promise<ShopItemI[]>;
    setTopAddressWidthFlag: (topAddressWidthFlag: boolean) => void;
    setTabListFixedFlag: (tabListFixedFlag: boolean) => void;
    setRecommandShopList: (recommandShopList: ShopItemI[]) => void;
    changeTabItem: (tabItem: TabItemI) => void;
    setSearchShopFlag: (searchShopFlag: boolean) => void;
    setTabListTop: (tabListTop: number) => void;
    setTopAddressSearchPX
    : (topAddressSearchPX: number) => void;
}
const homeAction: HomeActionI = {
    getRecommandShopList,
    setTopAddressWidthFlag,
    setTabListFixedFlag,
    setRecommandShopList,
    changeTabItem,
    setSearchShopFlag,
    setTabListTop,
    setTopAddressSearchPX,
};
export default homeAction;
