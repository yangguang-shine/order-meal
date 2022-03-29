import fetch from "@/utils/fetch";
import { timeStampTranslate, toFixedToNumber } from "@/utils/index";
import getOrderTypeTitle from "@/utils/getOrderTypeTitle";
import { shopImgPath, foodImgPath } from "@/config/index";
import { ActionI, ActionContextI, OriginOrderItemI, OrderItemI, OriginShopItemI, ShopItemI, OriginOrderDetail, OrderDetailI, OrderKeyI } from "@/interface/index";

async function getOrderList({ state, getter, commit }: ActionContextI, payload: any) {
    let data: {
        orderKeyList: OrderKeyI[];
        shopInfoList: OriginShopItemI[];
    } = await fetch("user/order/orderList", {
        status: state.orderTabIndex,
    });
    const shopListMap: {
        [index: number]: ShopItemI;
    } = {};
    data.shopInfoList.forEach((item: OriginShopItemI): void => {
        shopListMap[item.shopID] = {
            ...item,
            minusList: JSON.parse(item.minus),
            fullImgPath: `${shopImgPath}/${item.imgUrl}`,
        };
    });
    const orderList: OrderItemI[] = data.orderKeyList.map((item) => ({
        ...item,
        shopInfo: shopListMap[item.shopID],
        orderTimeDetail: timeStampTranslate(item.orderTime),
        orderTypeTitle: getOrderTypeTitle(item.orderStatus, item.businessType),
    }));
    state.allOrderList[state.orderTabIndex] = orderList;
    return orderList;
}
async function getShopInfo({ state, getter, commit }: ActionContextI, payload: any): Promise<ShopItemI> {
    const originShopInfo: OriginShopItemI = await fetch("user/shop/find", payload);
    const shopInfo: ShopItemI = {
        ...originShopInfo,
        minusList: JSON.parse(originShopInfo.minus),
        fullImgPath: `${shopImgPath}/${originShopInfo.imgUrl}`,
    };
    return shopInfo;
}

async function getOrderDetail({ state, getter, commit }: ActionContextI, payload: any) {
    const originOrderDetail: OriginOrderDetail = await fetch("user/order/orderDetail", payload);
    const orderDetail: OrderDetailI = {
        ...originOrderDetail,
        orderTypeTitle: getOrderTypeTitle(originOrderDetail.orderStatus, originOrderDetail.businessType),
        orderTimeDetail: timeStampTranslate(originOrderDetail.orderTime),
        address: JSON.parse(originOrderDetail.address),
        foodList: originOrderDetail.foodList.map((foodItem) => ({
            ...foodItem,
            foodItemAmount: toFixedToNumber(foodItem.price * foodItem.orderCount),
            fullImgPath: `${foodImgPath}/${foodItem.imgUrl}`,
        })),
    };
    console.log(orderDetail);
    commit("setOrderDetail", orderDetail);
    return orderDetail;
}

async function cancelOrder({ state, getter, commit }: ActionContextI, payload: any) {
    await fetch("user/order/cancel", payload);
}

export default {
    getOrderList,
    getShopInfo,
    getOrderDetail,
    cancelOrder,
} as ActionI;
