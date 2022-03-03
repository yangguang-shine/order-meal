import fetch from '../../../utils/fetch'
import getShopMinusList from '../../../utils/getShopMinusList'
import { timeStampTranslate } from '../../../utils/index.js';
import getOrderTypeTitle from '../../../utils/getOrderTypeTitle.js';

const getOrderList = async ({ state, getters, commit }, payload) => {
    let orderList: any = await fetch('user/order/orderList', {
        status: state.orderTabIndex
    });
    orderList = orderList.map((orderItem: any) => ({
        ...orderItem,
        minusList: getShopMinusList(orderItem.minus || ''),
        orderTimeDetail: timeStampTranslate(orderItem.orderTime),
        orderTypeTitle: getOrderTypeTitle(orderItem.orderStatus, orderItem.businessType)
    }));
    state.allOrderList[state.orderTabIndex] = orderList
    return orderList
}
const getShopInfo = async ({ state, getters, commit }, payload) => {
    const shopInfo: any = await fetch('user/shop/find', payload);
    shopInfo.minusList = getShopMinusList(shopInfo.minus || "");
    return shopInfo
}

const getOrderDetail = async ({ state, getters, commit }, payload) => {
    const orderDetail: any = await fetch('user/order/orderDetail', payload);
    (orderDetail.foodList || []).forEach(foodItem => {
        foodItem.foodItemAmount = (
            foodItem.price * foodItem.orderCount
        ).toFixed(2);
    });
    orderDetail.orderTypeTitle = getOrderTypeTitle(
        orderDetail.orderStatus,
        orderDetail.businessType
    );
    orderDetail.orderTimeDetail = timeStampTranslate(
        orderDetail.orderTime
    );
    orderDetail.address = JSON.parse(orderDetail.address);
    console.log(orderDetail)
    commit('setOrderDetail', orderDetail)
    return orderDetail
}

const cancelOrder = async ({ state, getters, commit }, payload) => {
    const orderDetail: any = await fetch('user/order/cancel', payload);
}


export default {
    getOrderList,
    getShopInfo,
    getOrderDetail,
    cancelOrder
}