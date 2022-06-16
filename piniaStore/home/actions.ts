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
    const recommandShopList: ShopItemI[] = (data || []).map(
        (item: OriginShopItemI): ShopItemI => ({
            ...item,
            minusList: JSON.parse(item.minus),
            fullImgPath: `${shopImgPath}/${item.imgUrl}`,
            ...getBusinessTypeInfo(item.businessTypes),
        })
    );
    // recommandShopList.push(...recommandShopList.concat(recommandShopList).concat(recommandShopList).concat(recommandShopList).concat(recommandShopList));
    // recommandShopList.push(...recommandShopList.concat(recommandShopList).concat(recommandShopList).concat(recommandShopList).concat(recommandShopList))
    homeState.recommandShopList = recommandShopList
    return recommandShopList || [];
}

// async function getShopList({ type = "", businessType = 2 }: ShopListParamsI = {}) {
//     let data: OriginShopItemI[] = await fetch("shop/list", {
//         type,
//         businessType,
//         latitude: addressState.defaultAddress.latitude,
//         longitude: addressState.defaultAddress.longitude,
//     });
//     const shopList: ShopItemI[] = (data || []).map(
//         (item: OriginShopItemI): ShopItemI => ({
//             ...item,
//             minusList: JSON.parse(item.minus),
//             fullImgPath: `${shopImgPath}/${item.imgUrl}`,
//             ...getBusinessTypeInfo(item.businessTypes),
//         })
//     );
//     // recommandShopList.push(...recommandShopList.concat(recommandShopList).concat(recommandShopList).concat(recommandShopList).concat(recommandShopList));
//     // recommandShopList.push(...recommandShopList.concat(recommandShopList).concat(recommandShopList).concat(recommandShopList).concat(recommandShopList))
//     commit("setShopList", shopList);
//     shopState.shopList = shopList
//     return shopList || [];
// }
async function getShopInfo(payload: { shopID: number}): Promise<ShopItemI> {
    const originShopInfo: OriginShopItemI = await fetch("shop/find", payload);
    const shopInfo: ShopItemI = {
        ...originShopInfo,
        minusList: JSON.parse(originShopInfo.minus),
        fullImgPath: `${shopImgPath}/${originShopInfo.imgUrl}`,
        ...getBusinessTypeInfo(originShopInfo.businessTypes),
    };
    homeState.shopInfo = shopInfo
    return shopInfo;
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
function setShopInfo( shopInfo: ShopItemI): void {
    homeState.shopInfo = shopInfo;
}
function setSearchShopFlag( searchShopFlag: boolean): void {
    homeState.searchShopFlag = searchShopFlag;
}

function setBusinessType( type: number): void {
    homeState.businessType = type;
}
function setTabListTop( tabListTop: number): void {
    homeState.tabListTop = tabListTop;
}

export interface HomeActionI {
    getRecommandShopList: (payload: ShopListParamsI) => Promise<ShopItemI[]>;
    getShopInfo: (payload: { shopID: number}) => Promise<ShopItemI>;
    setTopAddressWidthFlag: (topAddressWidthFlag: boolean) => void;
    setTabListFixedFlag: (tabListFixedFlag: boolean) => void;
    setRecommandShopList: (recommandShopList: ShopItemI[]) => void;
    changeTabItem: (tabItem: TabItemI) => void;
    setShopInfo: (shopInfo: ShopItemI) => void;
    setSearchShopFlag: (searchShopFlag: boolean) => void;
    setBusinessType: (type: number) => void;
    setTabListTop: (tabListTop: number) => void;
}
export default {
    getRecommandShopList,
    getShopInfo,
    setTopAddressWidthFlag,
    setTabListFixedFlag,
    setRecommandShopList,
    changeTabItem,
    setShopInfo,
    setSearchShopFlag,
    setBusinessType,
    setTabListTop,
} as HomeActionI;
