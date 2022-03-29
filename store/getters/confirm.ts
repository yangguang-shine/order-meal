import { GetterI, StateI, FoodItemI, GetterStateI } from "@/interface/index";
/**
 * @params originOrderAmount - 订单原始金额
 * @params minusPrice - 订单满减金额
 * @params payPrice - 订单实际支付金额
 * @params orderFoodList - 订单菜品列表
 */
export interface GetterStateConfirmI {
    originOrderAmount: number;
    minusPrice: number;
    payPrice: number;
    orderFoodList: FoodItemI[];
}
function originOrderAmount(state: StateI, getters: GetterStateI): number {
    return Number(
        state.cartCategoryList
            .reduce((amount: number, item) => {
                const categoryItemSum = item.foodList.reduce((all: number, foodItem) => {
                    const price = foodItem.price * foodItem.orderCount;
                    all += price;
                    return all;
                }, 0);
                amount += categoryItemSum;
                return amount;
            }, 0)
            .toFixed(2)
    );
}
function minusPrice(state: StateI, getters: GetterStateI): number {
    if (!state.shopInfo.minusList.length) {
        return 0;
    } else {
        const length = state.shopInfo.minusList.length;
        const findMinusItem = state.shopInfo.minusList.find((item, index: number, arr: any[]) => {
            if (index === length - 1) {
                if (Number(item.reduce) <= Number(getters.originOrderAmount)) {
                    return true;
                }
                return false;
            } else {
                if (Number(item.reach) <= Number(getters.originOrderAmount) && Number(getters.originOrderAmount) < Number(arr[index + 1].reach)) {
                    return true;
                }
                return false;
            }
        });
        if (findMinusItem) {
            return +findMinusItem.reduce;
        } else return 0;
    }
}

function payPrice(state: StateI, getters: GetterStateI): number {
    return Number((getters.originOrderAmount - getters.minusPrice).toFixed(2));
}

function orderFoodList(state: StateI, getters: GetterStateI): FoodItemI[] {
    const orderFoodList = state.cartCategoryList.reduce((list: any[], item) => {
        return [...list, ...item.foodList];
    }, []);
    return orderFoodList;
}

export default {
    originOrderAmount,
    minusPrice,
    payPrice,
    orderFoodList,
} as GetterI;
