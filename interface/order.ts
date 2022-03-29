import { AddressItemI } from "./address";
import { OriginShopItemI, ShopItemI, minusItemI, OriginFoodItemI, FoodItemI } from "./index";

export interface OrderKeyI {
    address: string | AddressItemI[];
    businessType: number;
    id: number;
    minusPrice: number;
    noteText: string;
    orderAmount: number;
    orderKey: number;
    orderStatus: number;
    orderTime: number;
    originOrderAmount: number;
    reservePhone: string;
    selfTakeTime: string;
    shopID: number;
    takeOutTime: "17:06";
}

export type OriginOrderItemI = OriginShopItemI & OrderKeyI;

export interface OrderItemI extends OrderKeyI {
    shopInfo: ShopItemI,
    orderTimeDetail: string;
    orderTypeTitle: string;
}

export interface OriginOrderDetail extends OrderKeyI {
    foodList: OriginFoodItemI[];
}

export interface OrderDetailI extends OrderKeyI {
    foodList: FoodItemI[];
    orderTimeDetail: string;
    orderTypeTitle: string;
    address: AddressItemI[];
}
