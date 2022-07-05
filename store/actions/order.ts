import fetch from "@/utils/fetch";
import { timeStampTranslate, toFixedToNumber } from "@/utils/index";
import getOrderTypeTitle from "@/utils/getOrderTypeTitle";
import { shopImgPath, foodImgPath } from "@/config/index";
import { ActionI, ActionContextI, OrderItemI, OriginShopItemI, ShopItemI, OriginFoodItemI, FoodItemI, OrderDetailI, OrderKeyI } from "@/interface/index";
import getBusinessTypeInfo from "@/utils/getBusinessTypeInfo";
import getOrderBusinessTitle from "@/utils/getOrderBusinessTitle";

async function getOrderList({ state, commit }: ActionContextI, payload: any) {
    let data: {
        orderKeyList: OrderKeyI[];
        shopInfoList: OriginShopItemI[];
    } = await fetch("order/orderList", {
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
            ...getBusinessTypeInfo(item.businessTypes),
        };
    });
    const orderList: OrderItemI[] = data.orderKeyList.map(
        (item): OrderItemI => ({
            ...item,
            shopInfo: shopListMap[item.shopID],
            orderTimeDetail: timeStampTranslate(item.orderTime),
            orderTypeTitle: getOrderTypeTitle(item.orderStatus, item.businessType),
            orderBusinessTitle: getOrderBusinessTitle(item.businessType)
        })
    );
    state.allOrderList[state.orderTabIndex] = orderList;
    return orderList;
}

async function getOrderDetail({ state, commit }: ActionContextI, payload: { orderKey: string }): Promise<OrderDetailI> {
    const originOrderDetail: {
        orderInfo: OrderKeyI;
        foodList: OriginFoodItemI[];
    } = await fetch("order/orderDetail", payload);
    const { orderInfo, foodList } = originOrderDetail;
    const orderDetail: OrderDetailI = {
        ...orderInfo,
        orderTypeTitle: getOrderTypeTitle(orderInfo.orderStatus, orderInfo.businessType),
        orderTimeDetail: timeStampTranslate(orderInfo.orderTime),
        deliverAddress: JSON.parse(orderInfo.address),
        foodList: foodList.map(
            (foodItem): FoodItemI => ({
                ...foodItem,
                foodItemAmount: toFixedToNumber(foodItem.price * foodItem.orderCount),
                fullImgPath: `${foodImgPath}/${foodItem.imgUrl}`,
                showReserveCountFlag: foodItem.reserveCount < 10
            })
        ),
    };
    commit("setOrderDetail", orderDetail);
    return orderDetail;
}

async function getOrderDetailShopInfo({ state, commit }: ActionContextI, payload: { shopID: number }): Promise<ShopItemI> {
    const originShopInfo: OriginShopItemI = await fetch("shop/find", payload);
    const orderDetailShopInfo: ShopItemI = {
        ...originShopInfo,
        minusList: JSON.parse(originShopInfo.minus),
        fullImgPath: `${shopImgPath}/${originShopInfo.imgUrl}`,
        ...getBusinessTypeInfo(originShopInfo.businessTypes),
    };
    commit("setOrderDetailShopInfo", orderDetailShopInfo);
    return orderDetailShopInfo;
}


async function cancelOrder({ state, commit }: ActionContextI, payload: { orderKey: string }) {
    await fetch("order/cancel", payload);
}
export default {
    getOrderList,
    getOrderDetail,
    getOrderDetailShopInfo,
    cancelOrder,
} as ActionI;
