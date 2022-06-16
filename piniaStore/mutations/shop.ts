import { MutationI, StateI } from "@/interface/index";

import { ShopItemI, TabItemI } from "@/interface/index";


function setShopList(state: StateI, shopList: ShopItemI[]): void {
    console.log(shopList)
    state.shopList = shopList;
}

function setRouterBusinessType(state: StateI, routerBusinessType: number): void {
    state.routerBusinessType = routerBusinessType;
}
function setSearchShopListFlag(state: StateI, searchShopListFlag: boolean): void {
    state.searchShopListFlag = searchShopListFlag;
}

export default {
    setShopList,
    setRouterBusinessType,
    setSearchShopListFlag
} as MutationI;
