import { AddressItemI, initAddressItem } from "./address";
import { initShopItem } from "./home";
import { OriginShopItemI, ShopItemI, minusItemI, OriginFoodItemI, FoodItemI } from "./index";
import { initFoodItem } from "./menu";
initAddressItem
export interface OrderKeyI {
    address: string;
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
    takeOutTime: string;
}
export const initOrderKey: OrderKeyI = {
    address: '',
    businessType: 0,
    id: 0,
    minusPrice: 0,
    noteText: '',
    orderAmount: 0,
    orderKey: 0,
    orderStatus: 0,
    orderTime: 0,
    originOrderAmount: 0,
    reservePhone: '',
    selfTakeTime: '',
    shopID: 0,
    takeOutTime: '',
}

// export type OriginOrderItemI = OriginShopItemI & OrderKeyI;

export interface OrderItemI extends OrderKeyI {
    shopInfo: ShopItemI,
    orderTimeDetail: string;
    orderTypeTitle: string;
}

export interface OrderDetailI extends OrderKeyI {
    foodList: FoodItemI[];
    orderTimeDetail: string;
    orderTypeTitle: string;
    deliverAddress: AddressItemI
}

export const initOrderDetail: OrderDetailI = {
    ...initOrderKey,
    foodList: [],
    orderTimeDetail: '',
    orderTypeTitle: '',
    deliverAddress: initAddressItem
}
