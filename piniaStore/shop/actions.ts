// import { MutationI, StateI } from "@/interface/index";

import { ShopItemI, TabItemI, OriginShopItemI } from "@/interface/index";
import shopState from "./state";

import fetch from "@/utils/fetch";
import { shopImgPath } from "@/config/index";
import getBusinessTypeInfo from "@/utils/getBusinessTypeInfo";
import addressState from "../address/state";

async function getShopList(payload: { businessType: number; type: TabItemI["type"] }) {
    let data: OriginShopItemI[] = await fetch("shop/list", {
        ...payload,
        latitude: addressState.defaultAddress.latitude,
        longitude: addressState.defaultAddress.longitude,
    });
    data.push(...data)
    const shopList: ShopItemI[] = (data || []).map(
        (item: OriginShopItemI): ShopItemI => ({
            ...item,
            minusList: JSON.parse(item.minus),
            fullImgPath: `${shopImgPath}/${item.imgUrl}`,
            ...getBusinessTypeInfo(item.businessTypes),
        })
    );
    shopState.shopList = shopList;
    // return shopList || [];
}
function setShopList(shopList: ShopItemI[]): void {
    shopState.shopList = shopList;
}
function setRouterBusinessType(routerBusinessType: number): void {
    shopState.routerBusinessType = routerBusinessType;
}
function setSearchShopListFlag(searchShopListFlag: boolean): void {
    shopState.searchShopListFlag = searchShopListFlag;
}

export interface ShopActionI {
    getShopList: (payload: { businessType: number; type: TabItemI["type"] }) => void,
    setShopList: (shopList: ShopItemI[]) => void ,
    setRouterBusinessType: (routerBusinessType: number) => void 
    setSearchShopListFlag: (searchShopListFlag: boolean) => void
}
const shopAction: ShopActionI = {
    getShopList,
    setShopList,
    setRouterBusinessType, 
    setSearchShopListFlag,
}
export default shopAction