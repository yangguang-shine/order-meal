import { GetterI, StateI } from "@/interface/index";

const minusPromotionsObject: GetterI = (state, getters) => {
    if ((state.shopInfo.minusList || []).length === 0 || state.cartCategoryList.length === 0) {
        return {
            show: false,
            contentList: [],
        };
    }
    if (getters.cartPriceInfo.noReachFirst) {
        return {
            show: true,
            contentList: ["再买", `${Number((state.shopInfo.minusList[0].reach - getters.cartPriceInfo.cartAllOriginPrice).toFixed(2))}元`, ",可减", `${state.shopInfo.minusList[0].reduce}元`],
        };
    }

    if (!getters.cartPriceInfo.minusIndex) {
        return {
            show: false,
            contentList: [],
        };
    }

    if (state.shopInfo.minusList.length === getters.cartPriceInfo.minusIndex) {
        return {
            show: true,
            contentList: ["已减", `${state.shopInfo.minusList[getters.cartPriceInfo.minusIndex - 1].reduce}`],
        };
    } else {
        return {
            show: true,
            contentList: [
                "已减",
                `${state.shopInfo.minusList[getters.cartPriceInfo.minusIndex - 1].reduce}元`,
                `,再买`,
                `${Number((state.shopInfo.minusList[getters.cartPriceInfo.minusIndex].reach - getters.cartPriceInfo.cartAllOriginPrice).toFixed(2))}元`,
                `可减`,
                `${state.shopInfo.minusList[getters.cartPriceInfo.minusIndex].reduce}`,
            ],
        };
    }
};
const cartPriceInfo: GetterI = (state, getters) => {
    const cartAllOriginPrice = state.cartCategoryList
        .reduce((amount: number, item) => {
            const categoryItemSum = item.foodList.reduce((all, foodItem) => {
                const price = foodItem.price * foodItem.orderCount;
                all += price;
                return all;
            }, 0);
            amount += categoryItemSum;
            return amount;
        }, 0)
        .toFixed(2);
    let discountPrice = 0;
    let minusIndex = null;
    let noReachFirst = true;
    const discountItem = (state.shopInfo.minusList || []).find((item, index) => {
        if (index === state.shopInfo.minusList.length - 1) {
            if (Number(cartAllOriginPrice) >= Number(item.reach)) {
                minusIndex = index + 1;
                return true;
            } else {
                return false;
            }
        } else {
            if (Number(cartAllOriginPrice) >= Number(item.reach) && Number(cartAllOriginPrice) < Number(state.shopInfo.minusList[index + 1].reach)) {
                minusIndex = index + 1;
                return true;
            } else {
                return false;
            }
        }
    });
    if (discountItem) {
        discountPrice = discountItem.reduce;
        noReachFirst = false;
    }
    const cartAlldiscountPrice = (cartAllOriginPrice - discountPrice).toFixed(2);
    return {
        cartAllOriginPrice: +cartAllOriginPrice,
        cartAlldiscountPrice: +cartAlldiscountPrice,
        discountPrice: +discountPrice,
        minusIndex,
        noReachFirst,
    };
};
const allCartFoodCount: GetterI = (state, getters) => {
    return state.cartCategoryList.reduce((all: number, item) => {
        const itemFoodAll = item.foodList.reduce((all, item) => {
            all += item.orderCount;
            return all;
        }, 0);
        all += itemFoodAll;
        return all;
    }, 0);
};
const asideCategoryList: GetterI = (state, getters) => {
    const asideCategoryList = state.categoryList.map((foodCategoryItem) => {
        const cartFind = state.cartCategoryList.find((cartFoodItem) => cartFoodItem.categoryID === foodCategoryItem.categoryID);
        if (cartFind) {
            const orderCount = cartFind.foodList.reduce((all: number, item) => {
                all += item.orderCount;
                return all;
            }, 0);
            return {
                categoryName: foodCategoryItem.categoryName,
                categoryID: foodCategoryItem.categoryID,
                orderCount,
                categoryTabID: foodCategoryItem.categoryTabID,
            };
        } else {
            return {
                categoryName: foodCategoryItem.categoryName,
                categoryID: foodCategoryItem.categoryID,
                orderCount: 0,
                categoryTabID: foodCategoryItem.categoryTabID,
            };
        }
    });
    return asideCategoryList;
};
// const cartCategoryList = (state) => {
//     const cartCategoryList = []
//     state.categoryList.forEach((foodCategoryItem) => {
//         foodCategoryItem.foodList.forEach((foodItem) => {

//         })
//     })
//     const findCategory = state.cartCategoryList.find(item => item.categoryID === foodItem.categoryID)
//     if (findCategory) {
//         const findFood = findCategory.foodList.find(item => item.foodName === foodItem.foodName)
//         if (!findFood) {
//             findCategory.foodList.push(foodItem)
//         }
//     } else {
//         state.cartCategoryList.push({
//             categoryID: foodItem.categoryID,
//             foodList: [foodItem]
//         })
//     }
//     state.cartCategoryList.forEach((item) => {
//         item.foodList = item.foodList.filter(foodItem => {
//             if (foodItem.orderCount > 0) {
//                 foodItem.foodItemAmount = Number((foodItem.price * foodItem.orderCount).toFixed(2))
//                 return true
//             } else {
//                 return false
//             }
//         })
//     })
// }
export default {
    minusPromotionsObject,
    cartPriceInfo,
    allCartFoodCount,
    asideCategoryList,
};
