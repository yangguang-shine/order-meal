// const allCartFoodCount: getterI = (state, getters) => {
//     return state.cartCategoryList.reduce((all, item) => {
//         const itemFoodAll = item.foodList.reduce((all, item) => {
//             all += item.orderCount;
//             return all;
//         }, 0);
//         all += itemFoodAll;
//         return all;
//     }, 0);
// }
import { getterI } from "@/interface/index";

const originOrderAmount: getterI = (state, getters) => {
    return state.cartCategoryList
        .reduce((amount: number, item) => {
            const categoryItemSum = item.foodList.reduce((all: number, foodItem) => {
                const price = foodItem.price * foodItem.orderCount;
                all += price;
                return all;
            }, 0);
            amount += categoryItemSum;
            return amount;
        }, 0)
        .toFixed(2);
};
const minusPrice: getterI = (state, getters) => {
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
};

const payPrice: getterI = (state, getters) => {
    return (getters.originOrderAmount - getters.minusPrice).toFixed(2);
};

const orderFoodList: getterI = (state, getters) => {
    const orderFoodList = state.cartCategoryList.reduce((list: any[], item) => {
        return [...list, ...item.foodList];
    }, []);
    return orderFoodList;
};

export default {
    originOrderAmount,
    minusPrice,
    payPrice,
    orderFoodList,
};
