import { MutationI, StateI } from "@/interface/index";

import { ShopItemI, TabItemI } from "@/interface/index";


function setShopList(state: StateI, shopList: ShopItemI[]): void {
    console.log(shopList)
    state.shopList = shopList;
}

function saveRouterBusinessType(state: StateI, routerBusinessType: number): void {
    state.routerBusinessType = routerBusinessType;
}
function setSearchShopListFlag(state: StateI, searchShopListFlag: boolean): void {
    state.searchShopListFlag = searchShopListFlag;
}

export default {
    setShopList,
    saveRouterBusinessType,
    setSearchShopListFlag
} as MutationI;
