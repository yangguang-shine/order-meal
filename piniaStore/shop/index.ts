import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import shopAction, {  ShopActionI} from './actions'
import shopState, { ShopStateI }  from "./state";
// import shopState from "./state";
// interface ShopoStoreI {
//     homeState: HomeStateI,
// }
export type ShopoStoreI = {
    shopState: ShopStateI
} & ShopActionI

export const useShopStore = defineStore("address", () => {
    return { shopState, ...shopAction } as ShopoStoreI ;
});
