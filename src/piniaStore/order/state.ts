import { ref, reactive } from "vue";

import { initShopItem, ShopItemI } from "@/interface/home"
import { initOrderDetail, OrderDetailI, OrderItemI } from "@/interface/order"
import { RefI } from "@/interface/vueInterface";


export interface OrderStateI {
    allOrderList: OrderItemI[][], 
    orderTabIndex: number, 
    orderErrorListFlag: boolean[],
    orderDetail: OrderDetailI,
    orderDetailShopInfo: ShopItemI,
}
export type OrderStateG = {
    [T in keyof OrderStateI]: RefI<OrderStateI[T]>
}

const orderState: OrderStateI = reactive({
    allOrderList: [[], [], [], []], 
    orderTabIndex: 0, 
    orderErrorListFlag: [false, false, false,false],
    orderDetail: initOrderDetail,
    orderDetailShopInfo: initShopItem,
})


export default orderState

