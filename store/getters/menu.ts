import { GetterI, StateI, CartCategoryInfoI, FoodItemI, GetterStateI, minusItemI } from "@/interface/index";
import { toFixedToNumber } from "@/utils/";

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
 * @params cartAllPriceAfterDiscount - 购物车优惠后总金额
 * @params minusPrice - 购物车优惠金额
 * @params minusIndex - 满减信息索引
 * @params noReachFirst - 是否达到首次满减门槛
 * @params allPackPrice - 总打包费用
 * @params allCartFoodCount - 总下单数量
 */
export interface CartPriceInfoI {
    cartAllOriginPrice: number;
    cartAllPriceAfterDiscount: number;
    minusPrice: number;
    minusIndex: number | null;
    noReachFirst: boolean;
    allPackPrice: number;
    allCartFoodCount: number
}
/**
 * @interface AsideCategoryItemI
 * @params categoryName - 分类名称
 * @params categoryID - 分类ID
 * @params categoryOrderCount - 分类总下单数
 * @params categoryIDMain - 分类垂直滑动时需要的id
 * @params categoryIDAside - 分类水平时需要的id
 */
export interface AsideCategoryItemI {
    categoryName: string;
    categoryID: number;
    categoryOrderCount: number;
    categoryIDMain: string;
    categoryIDAside: string;
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
    let cartAllOriginPrice: number = 0
    let allCartFoodCount: number = 0
    let allPackPrice: number = 0;
    state.cartCategoryList.forEach(categoryItem => {
        categoryItem.foodList.forEach((foodItem) => {
            cartAllOriginPrice +=  foodItem.price * foodItem.orderCount
            allCartFoodCount +=  foodItem.orderCount
            if (state.businessType === 2 || state.businessType === 3) {
                allPackPrice += foodItem.packPrice * foodItem.orderCount
            }
        })
    });
    let minusPrice: number = 0;
    let minusIndex: number | null = null;
    let noReachFirst: boolean = true;
    const minusItem: minusItemI | undefined = (state.shopInfo.minusList || []).find((item, index) => {
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
    if (minusItem) {
        minusPrice = minusItem.reduce;
        noReachFirst = false;
    }
    const cartAllPriceAfterDiscount: number = cartAllOriginPrice - minusPrice - allPackPrice
    return {
        cartAllOriginPrice: toFixedToNumber(cartAllOriginPrice),
        cartAllPriceAfterDiscount: toFixedToNumber(cartAllPriceAfterDiscount),
        minusPrice: toFixedToNumber(minusPrice),
        minusIndex,
        noReachFirst,
        allPackPrice: toFixedToNumber(allPackPrice),
        allCartFoodCount: toFixedToNumber(allCartFoodCount)
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
                categoryIDMain: `main${foodCategoryItem.categoryID}`,
                categoryIDAside: `aside${foodCategoryItem.categoryID}`,
                // selectedCategoryID: foodCategoryItem.selectedCategoryID,
            };
        } else {
            return {
                categoryName: foodCategoryItem.categoryName,
                categoryID: foodCategoryItem.categoryID,
                categoryOrderCount: 0,
                categoryIDMain: `main${foodCategoryItem.categoryID}`,
                categoryIDAside: `aside${foodCategoryItem.categoryID}`,
                // selectedCategoryID: foodCategoryItem.selectedCategoryID,
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
