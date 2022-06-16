import {  ShopItemI } from "@/interface/index";
import { ref, reactive } from "vue";
 
export interface ShopStateI {
    shopList: ShopItemI[];
    routerBusinessType: number,
    searchShopListFlag: boolean
}

const shopState: ShopStateI = reactive({
    shopList: [],
    routerBusinessType: 0,
    searchShopListFlag: false
});

export default shopState;




