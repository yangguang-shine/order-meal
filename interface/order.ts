import { AddressInfoI } from "./address";
import { OriginShopInfoI, ShopInfoI, minusItemI,OriginFoodItemI, FoodItemI } from "./index";

export interface OrderKeyI {
    id: number,
    minusPrice: number,
    noteText: string,
    orderAmount: string,
    orderKey: number,
    orderStatus: number,
    orderTime: number,
    originOrderAmount: string,
    reservePhone: string,
    selfTakeTime: string,
    shopID: number,
    startTime: string,
    takeOutTime: string,
    businessType: number,
    address: any,
}

export type OriginOrderItemI = OriginShopInfoI & OrderKeyI



export interface OrderItemI extends OriginOrderItemI {
    minusList: minusItemI[],
    fullImgPath: string,
    orderTimeDetail: string,
    orderTypeTitle: string
}

export interface OriginOrderDetail extends OrderKeyI {
    foodList: OriginFoodItemI[]
}

export interface OrderDetailI extends OrderKeyI{
    foodList: FoodItemI[],
    orderTimeDetail: string,
    orderTypeTitle: string,
    address: AddressInfoI[]
}
