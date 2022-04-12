import { GetterI, StateI, CartCategoryInfoI, FoodItemI, GetterStateI } from "@/interface/index";


export interface GetterStateMenuI {
    minusPromotionsObject: MinusPromotionsObjectI;
    cartPriceInfo: CartPriceInfoI;
    allCartFoodCount: number;
    asideCategoryList: AsideCategoryItemI[];
}
/**
 * @interface MinusPromotionsObjectI
 * @params show - 营销信息是否展示
 * @params contentList - 营销满减信息文案展示列表
 */
export interface MinusPromotionsObjectI {
    show: boolean;
    contentList: string[];
}
/**
 * @interface CartPriceInfoI
 * @params cartAllOriginPrice - 购物车无优惠前总金额
 * @params cartAlldiscountedPrice - 购物车优惠后总金额
 * @params discountPrice - 购物车优惠金额
 * @params minusIndex - 满减信息索引
 * @params noReachFirst - 是否达到首次满减门槛
 */
export interface CartPriceInfoI {
    cartAllOriginPrice: number;
    cartAlldiscountedPrice: number;
    discountPrice: number;
    minusIndex: number | null;
    noReachFirst: boolean;
}
/**
 * @interface AsideCategoryItemI
 * @params categoryName - 分类名称
 * @params categoryID - 分类ID
 * @params categoryOrderCount - 分类总下单数
 * @params categoryTabID - 分类滑动时需要的tabID
 */
export interface AsideCategoryItemI {
    categoryName: string;
    categoryID: number;
    categoryOrderCount: number;
    categoryTabID: string;
}


function minusPromotionsObject(state: StateI, getters: GetterStateI): MinusPromotionsObjectI {
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
            contentList: ["已减", `${state.shopInfo.minusList[getters.cartPriceInfo.minusIndex - 1].reduce}元`, `,再买`, `${Number((state.shopInfo.minusList[getters.cartPriceInfo.minusIndex].reach - getters.cartPriceInfo.cartAllOriginPrice).toFixed(2))}元`, `可减`, `${state.shopInfo.minusList[getters.cartPriceInfo.minusIndex].reduce}`],
        };
    }
}
function cartPriceInfo(state: StateI, getters: GetterStateI): CartPriceInfoI {
    const cartAllOriginPrice = Number(
        state.cartCategoryList
            .reduce((amount: number, item) => {
                const categoryItemSum = item.foodList.reduce((all, foodItem) => {
                    const price = foodItem.price * foodItem.orderCount;
                    all += price;
                    return all;
                }, 0);
                amount += categoryItemSum;
                return amount;
            }, 0)
            .toFixed(2)
    );
    let discountPrice = 0;
    let minusIndex = null;
    let noReachFirst = true;
    const discountItem = (state.shopInfo.minusList || []).find((item, index) => {
        if (index === state.shopInfo.minusList.length - 1) {
            if (cartAllOriginPrice >= item.reach) {
                minusIndex = index + 1;
                return true;
            } else {
                return false;
            }
        } else {
            if (cartAllOriginPrice >= item.reach && cartAllOriginPrice < state.shopInfo.minusList[index + 1].reach) {
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
    const cartAlldiscountedPrice = Number((cartAllOriginPrice - discountPrice).toFixed(2));
    return {
        cartAllOriginPrice: cartAllOriginPrice,
        cartAlldiscountedPrice: cartAlldiscountedPrice,
        discountPrice: discountPrice,
        minusIndex,
        noReachFirst,
    };
}
function allCartFoodCount(state: StateI, getters: GetterStateI): number {
    return state.cartCategoryList.reduce((all: number, item) => {
        const itemFoodAll = item.foodList.reduce((all: number, item) => {
            all += item.orderCount;
            return all;
        }, 0);
        all += itemFoodAll;
        return all;
    }, 0);
}
function asideCategoryList(state: StateI, getters: GetterStateI): AsideCategoryItemI[] {
    const asideCategoryList = state.categoryList.map((foodCategoryItem) => {
        const cartFind = state.cartCategoryList.find((cartFoodItem) => cartFoodItem.categoryID === foodCategoryItem.categoryID);
        if (cartFind) {
            const categoryOrderCount = cartFind.foodList.reduce((all: number, item) => {
                all += item.orderCount;
                return all;
            }, 0);
            return {
                categoryName: foodCategoryItem.categoryName,
                categoryID: foodCategoryItem.categoryID,
                categoryOrderCount,
                categoryTabID: foodCategoryItem.categoryTabID,
            };
        } else {
            return {
                categoryName: foodCategoryItem.categoryName,
                categoryID: foodCategoryItem.categoryID,
                categoryOrderCount: 0,
                categoryTabID: foodCategoryItem.categoryTabID,
            };
        }
    });
    return asideCategoryList;
}

export default {
    minusPromotionsObject,
    cartPriceInfo,
    allCartFoodCount,
    asideCategoryList,
} as GetterI;