import { minusItemI, ComputedGetterI } from "@/interface/index";
import { toFixedToNumber } from "@/utils/";
import { computed } from "vue";
import menuState from "../state";
/**
 * @interface CartPriceInfoI
 * @params allOriginPrice - 所有商品无优惠前总金额(包含打包费、不包含配送费)
 * @params allPriceAfterDiscount - 购物车优惠后总金额 (含打包费， 不含配送费)
 * @params orderOriginAmount - 订单原价格（包含打包费和配送费）
 * @params minusPrice - 购物车优惠金额
 * @params minusIndex - 满减信息索引
 * @params noReachFirst - 是否达到首次满减门槛
 * @params allPackPrice - 总打包费用
 * @params allCartFoodCount - 总下单数量
 */
export interface CartPriceInfoI {
    allFoodPrice: number;
    allOriginPrice: number;
    allPriceAfterDiscount: number;
    allPackPrice: number;
    allCartFoodCount: number;
    orderOriginAmount: number;
    payPrice: number;

    minusPrice: number;
    minusIndex: number | null;
    noReachFirst: boolean;
}


const cartPriceInfo: ComputedGetterI<CartPriceInfoI> = computed((): CartPriceInfoI => {
    let allCartFoodCount: number = 0;
    let allPackPrice: number = 0;
    let allFoodPrice: number = 0;
    menuState.cartCategoryList.forEach((categoryItem) => {
        categoryItem.foodList.forEach((foodItem) => {
            if (foodItem.orderSpecifaList.length) {
                allFoodPrice = foodItem.orderSpecifaList.reduce((allFoodPrice, item, index) => {
                    return allFoodPrice + item.allCountPrice
                }, allFoodPrice)
            } else {
                 allFoodPrice += foodItem.price * foodItem.orderCount;
            }
            allCartFoodCount += foodItem.orderCount;
            if (menuState.businessType === 2 || menuState.businessType === 3) {
                allPackPrice += foodItem.packPrice * foodItem.orderCount;
            }
        });
    });
    let allOriginPrice: number = allFoodPrice + allPackPrice;
    let minusPrice: number = 0;
    let minusIndex: number | null = null;
    let noReachFirst: boolean = true;

    const minusItem: minusItemI | undefined = (menuState.shopInfo.minusList || []).find((item, index) => {
        if (index === menuState.shopInfo.minusList.length - 1) {
            if (allOriginPrice >= item.reach) {
                minusIndex = index + 1;
                return true;
            } else {
                return false;
            }
        } else {
            if (allOriginPrice >= item.reach && allOriginPrice < menuState.shopInfo.minusList[index + 1].reach) {
                minusIndex = index + 1;
                return true;
            } else {
                return false;
            }
        }
    });
    if (minusItem) {
        minusPrice = minusItem.reduce;
        noReachFirst = false;
    }
    const allPriceAfterDiscount: number = allOriginPrice - minusPrice;
    let orderOriginAmount = allOriginPrice;
    let payPrice = allPriceAfterDiscount;
    if (menuState.businessType === 2) {
        orderOriginAmount = allOriginPrice + menuState.shopInfo.deliverPrice;
        payPrice = orderOriginAmount - minusPrice;
    }
    return {
        allOriginPrice: toFixedToNumber(allOriginPrice),
        allFoodPrice: toFixedToNumber(allCartFoodCount),
        allPriceAfterDiscount: toFixedToNumber(allPriceAfterDiscount),
        allPackPrice: toFixedToNumber(allPackPrice),
        orderOriginAmount: toFixedToNumber(orderOriginAmount),
        payPrice: toFixedToNumber(payPrice),
        minusPrice: toFixedToNumber(minusPrice),
        minusIndex,
        noReachFirst,
        allCartFoodCount: toFixedToNumber(allCartFoodCount),
    };
});



export default cartPriceInfo;
