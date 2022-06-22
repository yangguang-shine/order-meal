
import fetch from "@/utils/fetch";
import { timeStampTranslate, toFixedToNumber } from "@/utils/index";
import getOrderTypeTitle from "@/utils/getOrderTypeTitle";
import { shopImgPath, foodImgPath } from "@/config/index";
import { ActionI, ActionContextI, OrderItemI, OriginShopItemI, ShopItemI, OriginFoodItemI, FoodItemI, OrderDetailI, OrderKeyI } from "@/interface/index";
import getBusinessTypeInfo from "@/utils/getBusinessTypeInfo";
import getOrderBusinessTitle from "@/utils/getOrderBusinessTitle";
import orderState from "./state";
async function getOrderList() {
    let data: {
        orderKeyList: OrderKeyI[];
        shopInfoList: OriginShopItemI[];
    } = await fetch("order/orderList", {
        status: orderState.orderTabIndex,
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
    orderState.allOrderList[orderState.orderTabIndex] = orderList;
    return orderList;
}

async function getOrderDetail(payload: { orderKey: string }): Promise<OrderDetailI> {
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
                showReserveCountFlag: foodItem.reserveCount < 9999
            })
        ),
    };
    orderState.orderDetail = orderDetail
    return orderDetail;
}

async function getOrderDetailShopInfo(payload: { shopID: number }): Promise<ShopItemI> {
    const originShopInfo: OriginShopItemI = await fetch("shop/find", payload);
    const orderDetailShopInfo: ShopItemI = {
        ...originShopInfo,
        minusList: JSON.parse(originShopInfo.minus),
        fullImgPath: `${shopImgPath}/${originShopInfo.imgUrl}`,
        ...getBusinessTypeInfo(originShopInfo.businessTypes),
    };
    orderState.orderDetailShopInfo = orderDetailShopInfo
    return orderDetailShopInfo;
}


async function cancelOrder(payload: { orderKey: string }) {
    await fetch("order/cancel", payload);
}
function setOrderTabIndex (orderTabIndex: number): void  {
    orderState.orderTabIndex = orderTabIndex;
};

function setOrderErrorListFlag (flag: boolean): void  {
    orderState.orderErrorListFlag[orderState.orderTabIndex] = flag;
};
function setOrderDetail (orderDetail: OrderDetailI): void  {
    orderState.orderDetail = orderDetail;
};
function setOrderDetailShopInfo (shopInfo: ShopItemI): void  {
    orderState.orderDetailShopInfo = shopInfo;
};

export interface OrderActionI {
    getOrderList:() => Promise<OrderItemI[]>,
    getOrderDetail:(payload: { orderKey: string }) =>  Promise<OrderDetailI>,
    getOrderDetailShopInfo:(payload: { shopID: number }) => Promise<ShopItemI>,
    cancelOrder : (payload: { orderKey: string }) => void,
    setOrderTabIndex:(orderTabIndex: number) => void,
    setOrderErrorListFlag:(flag: boolean)=> void,
    setOrderDetail:(orderDetail: OrderDetailI) => void,
    setOrderDetailShopInfo:(shopInfo: ShopItemI)=> void,
}
export default {
    getOrderList,
    getOrderDetail,
    getOrderDetailShopInfo,
    cancelOrder,
    setOrderTabIndex,
    setOrderErrorListFlag,
    setOrderDetail,
    setOrderDetailShopInfo,
} as OrderActionI;
