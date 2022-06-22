import { GetterI, StateI, CartCategoryInfoI, FoodItemI, GetterStateI, minusItemI } from "@/interface/index";
import { toFixedToNumber } from "@/utils/";

export interface MenuGetterI {
    minusPromotionsObject: MinusPromotionsObjectI;
    cartPriceInfo: CartPriceInfoI;
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
 * @params allOriginPrice - 所有商品无优惠前总金额(包含打包费、不包含配送费)
 * @params allPriceAfterDiscount - 购物车优惠后总金额
 * 
 * @params orderOriginAmount - 订单原价格（包含打包费和配送费）
 * @params minusPrice - 购物车优惠金额
 * @params minusIndex - 满减信息索引
 * @params noReachFirst - 是否达到首次满减门槛
 * @params allPackPrice - 总打包费用
 * @params allCartFoodCount - 总下单数量
 */
export interface CartPriceInfoI {
    allFoodPrice: number,
    allOriginPrice: number;
    allPriceAfterDiscount: number;
    allPackPrice: number;
    allCartFoodCount: number
    orderOriginAmount: number
    payPrice: number
    
    minusPrice: number;
    minusIndex: number | null;
    noReachFirst: boolean;
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
            contentList: ["再买", `${Number((state.shopInfo.minusList[0].reach - getters.cartPriceInfo.allOriginPrice).toFixed(2))}元`, ",可减", `${state.shopInfo.minusList[0].reduce}元`],
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
            contentList: ["已减", `${state.shopInfo.minusList[getters.cartPriceInfo.minusIndex - 1].reduce}元`, `,再买`, `${Number((state.shopInfo.minusList[getters.cartPriceInfo.minusIndex].reach - getters.cartPriceInfo.allOriginPrice).toFixed(2))}元`, `可减`, `${state.shopInfo.minusList[getters.cartPriceInfo.minusIndex].reduce}`],
        };
    }
}
let count = 0
function cartPriceInfo(state: StateI, getters: GetterStateI): CartPriceInfoI {
    let allCartFoodCount: number = 0
    let allPackPrice: number = 0;
    let allFoodPrice: number = 0
    state.cartCategoryList.forEach(categoryItem => {
        categoryItem.foodList.forEach((foodItem) => {
            allFoodPrice +=  foodItem.price * foodItem.orderCount
            allCartFoodCount +=  foodItem.orderCount
            if (state.businessType === 2 || state.businessType === 3) {
                allPackPrice += foodItem.packPrice * foodItem.orderCount
            }
        })
    });
    let allOriginPrice: number = allFoodPrice + allPackPrice
    let minusPrice: number = 0;
    let minusIndex: number | null = null;
    let noReachFirst: boolean = true;

    const minusItem: minusItemI | undefined = (state.shopInfo.minusList || []).find((item, index) => {
        if (index === state.shopInfo.minusList.length - 1) {
            if (allOriginPrice >= item.reach) {
                minusIndex = index + 1;
                return true;
            } else {
                return false;
            }
        } else {
            if (allOriginPrice >= item.reach && allOriginPrice < state.shopInfo.minusList[index + 1].reach) {
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
    const allPriceAfterDiscount: number = allOriginPrice - minusPrice
    let orderOriginAmount = allOriginPrice
    let payPrice = allPriceAfterDiscount
    if (state.businessType === 2) {
        orderOriginAmount = allOriginPrice + state.shopInfo.deliverPrice
        payPrice = orderOriginAmount - minusPrice
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
        allCartFoodCount: toFixedToNumber(allCartFoodCount)
    };
}

function asideCategoryList(state: StateI, getters: GetterStateI): AsideCategoryItemI[] {
    const asideCategoryList = state.categoryList.map((categotyItem) => {
        // const stateCartCartgoryItem = state.cartCategoryList.find((cartFoodItem) => cartFoodItem.categoryID === categotyItem.categoryID);
        console.log('>>>>')
        console.log(categotyItem)
        console.log(state.cartCategoryListMap)
        const stateCartCartgoryItem = state.cartCategoryListMap[`${categotyItem.categoryID}`]
        if (stateCartCartgoryItem) {
            const categoryOrderCount = stateCartCartgoryItem.foodList.reduce((all: number, item): number => {
                all += item.orderCount;
                return all;
            }, 0);
            return {
                categoryName: categotyItem.categoryName,
                categoryID: categotyItem.categoryID,
                categoryOrderCount,
                categoryIDMain: `main${categotyItem.categoryID}`,
                categoryIDAside: `aside${categotyItem.categoryID}`,
            };
        } else {
            return {
                categoryName: categotyItem.categoryName,
                categoryID: categotyItem.categoryID,
                categoryOrderCount: 0,
                categoryIDMain: `main${categotyItem.categoryID}`,
                categoryIDAside: `aside${categotyItem.categoryID}`,
            };
        }
    });
    return asideCategoryList;
}

export default {
    minusPromotionsObject,
    cartPriceInfo,
    asideCategoryList,
} as GetterI;
