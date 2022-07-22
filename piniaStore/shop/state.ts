import {  ShopItemI } from "@/interface/index";
import { RefI } from "@/interface/vueInterface";
import { ref, reactive } from "vue";
 
export interface ShopStateI {
    shopList: ShopItemI[];
    routerBusinessType: number,
    searchShopListFlag: boolean
}
export type ShopStateG = {
    [T in keyof ShopStateI]: RefI<ShopStateI[T]>
}
const shopState: ShopStateI = reactive({
    shopList: [],
    routerBusinessType: 0,
    searchShopListFlag: false
});

export default shopState;




