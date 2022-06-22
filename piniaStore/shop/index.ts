import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import shopAction, {  ShopActionI} from './actions'
import shopState, { ShopStateI }  from "./state";
// import shopState from "./state";
// interface ShopStoreI {
//     homeState: HomeStateI,
// }
export type ShopStoreI = {
    shopState: ShopStateI
} & ShopActionI

export const useShopStore = defineStore("shop", () => {
    return { shopState, ...shopAction } as ShopStoreI ;
});
