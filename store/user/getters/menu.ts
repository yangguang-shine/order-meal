const minusPromotionsObject = (state, getters) => {
    console.log('>>>>>>')
    console.log(state)
    if ((state.shopInfo.minusList || []).length === 0 || state.cartFoodList.length === 0) {
        return {
            show: false,
            contentList: []
        };
    }
    if (getters.cartPriceInfo.noReachFirst) {
        return {
            show: true,
            contentList: [
                "再买",
                `${Number(
                    (
                        state.shopInfo.minusList[0].reach -
                        getters.cartPriceInfo.cartAllOriginPrice
                    ).toFixed(2)
                )}元`,
                ",可减",
                `${state.shopInfo.minusList[0].reduce}元`
            ]
        };
    }

    if (!getters.cartPriceInfo.minusIndex) {
        return {
            show: false,
            contentList: []
        };
    }

    if (state.shopInfo.minusList.length === getters.cartPriceInfo.minusIndex) {
        return {
            show: true,
            contentList: [
                "已减",
                `${state.shopInfo.minusList[getters.cartPriceInfo.minusIndex - 1].reduce}`
            ]
        };
    } else {
        return {
            show: true,
            contentList: [
                "已减",
                `${state.shopInfo.minusList[getters.cartPriceInfo.minusIndex - 1].reduce}元`,
                `,再买`,
                `${Number(
                    (
                        state.shopInfo.minusList[getters.cartPriceInfo.minusIndex].reach -
                        getters.cartPriceInfo.cartAllOriginPrice
                    ).toFixed(2)
                )}元`,
                `可减`,
                `${state.shopInfo.minusList[getters.cartPriceInfo.minusIndex].reduce}`
            ]
        };
    }
}
const cartPriceInfo = (state, getters) => {
    const cartAllOriginPrice = state.cartFoodList.reduce((amount, item) => {
        const categoryItemSum = item.foodList.reduce((all, foodItem) => {
            const price = foodItem.price * foodItem.orderCount;
            all += price;
            return all;
        }, 0);
        amount += categoryItemSum;
        return amount;
    }, 0).toFixed(2);
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
            if (
                Number(cartAllOriginPrice) >= Number(item.reach) &&
                Number(cartAllOriginPrice) <
                Number(state.shopInfo.minusList[index + 1].reach)
            ) {
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
    const cartAlldiscountPrice = (cartAllOriginPrice - discountPrice).toFixed(
        2
    );
    return {
        cartAllOriginPrice: +cartAllOriginPrice,
        cartAlldiscountPrice: +cartAlldiscountPrice,
        discountPrice: +discountPrice,
        minusIndex,
        noReachFirst
    };
}
const allCartFoodCount = (state, getters) => {
    return state.cartFoodList.reduce((all, item) => {
        const itemFoodAll = item.foodList.reduce((all, item) => {
            all += item.orderCount;
            return all;
        }, 0);
        all += itemFoodAll;
        return all;
    }, 0);
}
const asideCategoryList = (state, getters) => {
    const asideCategoryList = state.foodCategoryList.map(foodCategoryItem => {
        const cartFind = state.cartFoodList.find(
            cartFoodItem =>
                cartFoodItem.categoryID === foodCategoryItem.categoryID
        );
        if (cartFind) {
            const orderCount = cartFind.foodList.reduce((all, item) => {
                all += item.orderCount;
                return all;
            }, 0);
            return {
                categoryName: foodCategoryItem.categoryName,
                categoryID: foodCategoryItem.categoryID,
                orderCount,
                scrollTabID: foodCategoryItem.scrollTabID
            };
        } else {
            return {
                categoryName: foodCategoryItem.categoryName,
                categoryID: foodCategoryItem.categoryID,
                orderCount: 0,
                scrollTabID: foodCategoryItem.scrollTabID
            };
        }
    });
    return asideCategoryList;
}
export default {
    minusPromotionsObject,
    cartPriceInfo,
    allCartFoodCount,
    asideCategoryList
}