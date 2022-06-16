import fetch from '@/utils/fetch'
import { ActionI, ActionContextI, GetterStateI } from "@/interface/index";

async function submitOrder ({state, getters, commit}: ActionContextI, payload: any = {}) {
    await fetch('order/submit', {
        foodList: getters.orderFoodList,
        shopID: state.shopInfo.shopID,
        payPrice: getters.cartPriceInfo.payPrice,
        businessType: state.businessType,
        minusPrice: getters.cartPriceInfo.minusPrice,
        allPackPrice: getters.cartPriceInfo.allPackPrice || 0,
        deliverPrice: state.shopInfo.deliverPrice || 0,
        orderOriginAmount: getters.cartPriceInfo.orderOriginAmount,
        noteText: state.noteText,
        takeOutTime: state.takeOutTime,
        address: JSON.stringify(state.defaultAddress),
        ...payload
    })
}
export default {
    submitOrder
}as ActionI