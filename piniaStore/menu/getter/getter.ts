import { GetterI, StateI, FoodItemI, GetterStateI, minusItemI, ComputedGetterI } from "@/interface/index";
import { toFixedToNumber } from "@/utils/";
import { computed } from "vue";
import homeState from "../home/state";
import menuState from "./state";
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
export interface AsideCategoryInfoI {
    asideCategoryList: AsideCategoryItemI[];
    asideCategoryItemOrderCountMap: AsideCategoryItemOrderCountMapI;
}
interface AsideCategoryItemOrderCountMapI {
    [index: string]: number;
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

const cartPriceInfo = computed((): CartPriceInfoI => {
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
const minusPromotionsObject: ComputedGetterI<MinusPromotionsObjectI> = computed((): MinusPromotionsObjectI => {
    if ((menuState.shopInfo.minusList || []).length === 0 || menuState.cartCategoryList.length === 0) {
        return {
            show: false,
            contentList: [],
        };
    }
    if (cartPriceInfo.value.noReachFirst) {
        return {
            show: true,
            contentList: ["再买", `${Number((menuState.shopInfo.minusList[0].reach - cartPriceInfo.value.allOriginPrice).toFixed(2))}元`, ",可减", `${menuState.shopInfo.minusList[0].reduce}元`],
        };
    }
    if (!cartPriceInfo.value.minusIndex) {
        return {
            show: false,
            contentList: [],
        };
    }
    if (menuState.shopInfo.minusList.length === cartPriceInfo.value.minusIndex) {
        return {
            show: true,
            contentList: ["已减", `${menuState.shopInfo.minusList[cartPriceInfo.value.minusIndex - 1].reduce}`],
        };
    } else {
        return {
            show: true,
            contentList: ["已减", `${menuState.shopInfo.minusList[cartPriceInfo.value.minusIndex - 1].reduce}元`, `,再买`, `${Number((menuState.shopInfo.minusList[cartPriceInfo.value.minusIndex].reach - cartPriceInfo.value.allOriginPrice).toFixed(2))}元`, `可减`, `${menuState.shopInfo.minusList[cartPriceInfo.value.minusIndex].reduce}`],
        };
    }
});

const asideCategoryInfo: ComputedGetterI<AsideCategoryInfoI> = computed(() => {
    const asideCategoryItemOrderCountMap: AsideCategoryItemOrderCountMapI= {};
    const asideCategoryList = menuState.categoryList.map((categotyItem) => {
        // const stateCartCartgoryItem = menuState.cartCategoryList.find((cartFoodItem) => cartFoodItem.categoryID === categotyItem.categoryID);
        const stateCartCartgoryItem = menuState.cartCategoryListMap[`${categotyItem.categoryID}`];
        const categoryOrderCount = stateCartCartgoryItem ? stateCartCartgoryItem.foodList.reduce((all: number, item): number => {
            all += item.orderCount;
            return all;
        }, 0) : 0;
        asideCategoryItemOrderCountMap[`${categotyItem.categoryID}`] = categoryOrderCount
        return {
            categoryName: categotyItem.categoryName,
            categoryID: categotyItem.categoryID,
            categoryOrderCount,
            categoryIDMain: `main${categotyItem.categoryID}`,
            categoryIDAside: `aside${categotyItem.categoryID}`,
        };
    });
    return {
        asideCategoryList,
        asideCategoryItemOrderCountMap
    };
});

const orderFoodList: ComputedGetterI<FoodItemI[]> = computed((): FoodItemI[] => {
    const orderFoodList = menuState.cartCategoryList.reduce((list: any[], item) => {
        return [...list, ...item.foodList];
    }, []);
    return orderFoodList;
});
const footerAndMinusPX: ComputedGetterI<number> = computed(() => {
    return menuState.footerPX + menuState.minusPX
})
export interface MenuGetterI {
    minusPromotionsObject: ComputedGetterI<MinusPromotionsObjectI>;
    cartPriceInfo: ComputedGetterI<CartPriceInfoI>;
    asideCategoryInfo: ComputedGetterI<AsideCategoryInfoI>;
    orderFoodList: ComputedGetterI<FoodItemI[]>;
    footerAndMinusPX: ComputedGetterI<number>
}
const menuGetter: MenuGetterI = {
    minusPromotionsObject,
    cartPriceInfo,
    asideCategoryInfo,
    orderFoodList,
    footerAndMinusPX
};

export default menuGetter;
