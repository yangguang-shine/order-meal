import fetch from '@/utils/fetch'
import { ActionI, ActionContextI, GetterStateI } from "@/interface/index";

async function submitOrder ({state, getters, commit}: ActionContextI, payload: any) {
    await fetch('user/order/submit', {
        foodList: getters.orderFoodList,
        shopID: state.shopInfo.shopID,
        orderAmount: getters.payPrice,
        businessType: state.businessType,
        minusPrice: getters.minusPrice,
        originOrderAmount: getters.originOrderAmount,
        noteText: state.noteText,
        takeOutTime: state.takeOutTime,
        address: JSON.stringify(state.defaultAddress),
        ...payload
    })
}
export default {
    submitOrder
}as ActionI