import fetch from '@/utils/fetch'
import getShopMinusList from '../../../utils/getShopMinusList'
const submitOrder = async ({state, getters, commit}, payload) => {
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
}