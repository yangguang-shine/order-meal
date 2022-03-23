import fetch from '../../../utils/fetch'
import getShopMinusList from '../../../utils/getShopMinusList'
import { timeStampTranslate } from '../../../utils/index.js';
import getOrderTypeTitle from '../../../utils/getOrderTypeTitle.js';
import { shopImgPath, foodImgPath } from '@/config/index'

const getOrderList = async ({ state, getters, commit }, payload) => {
    let orderList: any = await fetch('user/order/orderList', {
        status: state.orderTabIndex
    });
    orderList = orderList.map((orderItem: any) => ({
        ...orderItem,
        minusList: JSON.parse(orderItem.minus),
        fullImgPath: `${shopImgPath}/${orderItem.imgUrl}`,
        orderTimeDetail: timeStampTranslate(orderItem.orderTime),
        orderTypeTitle: getOrderTypeTitle(orderItem.orderStatus, orderItem.businessType)
    }));
    state.allOrderList[state.orderTabIndex] = orderList
    return orderList
}
const getShopInfo = async ({ state, getters, commit }, payload) => {
    const shopInfo: any = await fetch('user/shop/find', payload);
    shopInfo.minusList = JSON.parse(shopInfo.minus);
    shopInfo.fullImgPath = `${shopImgPath}/${shopInfo.imgUrl}`

    return shopInfo
}

const getOrderDetail = async ({ state, getters, commit }, payload) => {
    const orderDetail: any = await fetch('user/order/orderDetail', payload);
    (orderDetail.foodList || []).forEach(foodItem => {
        foodItem.foodItemAmount = (
            foodItem.price * foodItem.orderCount
        ).toFixed(2);
        foodItem.fullImgPath = `${foodImgPath}/${foodItem.imgUrl}`
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