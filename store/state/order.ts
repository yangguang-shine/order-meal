import { initShopItem, ShopItemI } from "@/interface/home"
import { initOrderDetail, OrderDetailI, OrderItemI } from "@/interface/order"


export interface OrderStateI {
    allOrderList: OrderItemI[][], 
    orderTabIndex: number, 
    orderErrorListFlag: boolean[],
    orderDetail: OrderDetailI,
    orderDetailShopInfo: ShopItemI,
}

const state: OrderStateI = {
    allOrderList: [[], [], [], []], 
    orderTabIndex: 0, 
    orderErrorListFlag: [false, false, false,false],
    orderDetail: initOrderDetail,
    orderDetailShopInfo: initShopItem,
}
export default state