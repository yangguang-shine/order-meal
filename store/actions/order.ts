import fetch from "@/utils/fetch";
import { timeStampTranslate } from "@/utils/index";
import getOrderTypeTitle from "@/utils/getOrderTypeTitle";
import { shopImgPath, foodImgPath } from "@/config/index";
import { ActionI, ActionsContextI, OriginOrderItemI, OrderItemI, OriginShopInfoI, ShopInfoI, OriginOrderDetail, OrderDetailI } from "@/interface/index";

async function getOrderList({ state, getters, commit }: ActionsContextI, payload: any) {
    let data: OriginOrderItemI[] = await fetch("user/order/orderList", {
        status: state.orderTabIndex,
    });
    const orderList: OrderItemI[] = data.map(
        (orderItem: OriginOrderItemI): OrderItemI => ({
            ...orderItem,
            minusList: JSON.parse(orderItem.minus),
            fullImgPath: `${shopImgPath}/${orderItem.imgUrl}`,
            orderTimeDetail: timeStampTranslate(orderItem.orderTime),
            orderTypeTitle: getOrderTypeTitle(orderItem.orderStatus, orderItem.businessType),
        })
    );
    state.allOrderList[state.orderTabIndex] = orderList;
    return orderList;
}
async function getShopInfo({ state, getters, commit }: ActionsContextI, payload: any): Promise<ShopInfoI> {
    const originShopInfo: OriginShopInfoI = await fetch("user/shop/find", payload);
    const shopInfo: ShopInfoI = {
        ...originShopInfo,
        minusList: JSON.parse(originShopInfo.minus),
        fullImgPath: `${shopImgPath}/${originShopInfo.imgUrl}`,
    };
    return shopInfo;
}

async function getOrderDetail({ state, getters, commit }: ActionsContextI, payload: any) {
    const originOrderDetail: OriginOrderDetail = await fetch("user/order/orderDetail", payload);
    const orderDetail: OrderDetailI = {
        ...originOrderDetail,
        orderTypeTitle: getOrderTypeTitle(originOrderDetail.orderStatus, originOrderDetail.businessType),
        orderTimeDetail: timeStampTranslate(originOrderDetail.orderTime),
        address: JSON.parse(originOrderDetail.address),
        foodList: originOrderDetail.foodList.map((foodItem) => ({
            ...foodItem,
            foodItemAmount: Number((foodItem.price * foodItem.orderCount).toFixed(2)),
            fullImgPath: `${foodImgPath}/${foodItem.imgUrl}`,
        })),
    };
    console.log(orderDetail);
    commit("setOrderDetail", orderDetail);
    return orderDetail;
}

async function cancelOrder({ state, getters, commit }: ActionsContextI, payload: any) {
    await fetch("user/order/cancel", payload);
}

export default {
    getOrderList,
    getShopInfo,
    getOrderDetail,
    cancelOrder,
} as ActionI;
