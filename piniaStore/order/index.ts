import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import orderState , { OrderStateI } from './state'
import orderAction, { OrderActionI} from './actions'
// interface AddressStoreI {
//     orderState: OrderStateI,
// }
export type OrderStoreI = {
    orderState: OrderStateI
} & OrderActionI

export const useOrderStore = defineStore("order", () => {
    return { orderState, ...orderAction }
});
