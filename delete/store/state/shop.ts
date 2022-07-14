import { TabItemI, ShopItemI, initShopItem } from "@/interface/index";
import { tabList } from "./home";
 
export interface ShopStateI {
    shopList: ShopItemI[];
    routerBusinessType: number,
    searchShopListFlag: boolean
}

const state: ShopStateI = {
    shopList: [],
    routerBusinessType: 0,
    searchShopListFlag: false
};

// minusList1: []
export default state;
