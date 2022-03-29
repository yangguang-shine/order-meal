import fetch from '@/utils/fetch'
import { ActionI, ActionContextI } from "@/interface/index";

async function submitOrder ({state, getter, commit}: ActionContextI, payload: any) {
    await fetch('user/order/submit', {
        foodList: getter.orderFoodList,
        shopID: state.shopInfo.shopID,
        orderAmount: getter.payPrice,
        businessType: state.businessType,
        minusPrice: getter.minusPrice,
        originOrderAmount: getter.originOrderAmount,
        noteText: state.noteText,
        takeOutTime: state.takeOutTime,
        address: JSON.stringify(state.defaultAddress),
        ...payload
    })
}
export default {
    submitOrder
}as ActionI