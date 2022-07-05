import fetch from "@/utils/fetch";
import { toFixedToNumber } from "@/utils/index";
import { foodImgPath } from "@/config/index";
import { ActionI, ActionContextI, OriginCategoryItemI, CategoryItemI, FoodItemI, OriginFoodItemI, FoodListMapI, CategoryListMapI } from "@/interface/index";
// interface CategoryListMapI {
//     [index: number]: CategoryItemI
// }
// interface FoodListMapI {
//     [index: number]: FoodItemI

// }

async function getMenuList({ commit, state }: ActionContextI) {
    // 初始化会出现页面返回再次进入数据混乱问题
    commit("setCategoryList", []);
    const originCategoryItem: OriginCategoryItemI[] = await fetch("shop/menu", {
        shopID: state.shopInfo.shopID,
    });
    const categoryListMap: CategoryListMapI = {};
    const categoryList: CategoryItemI[] = [];
    (originCategoryItem || []).forEach((originCategoryItem: OriginCategoryItemI) => {
        const foodListMap: FoodListMapI = {}
        const categoryItem: CategoryItemI = {
            ...originCategoryItem,
            categoryIDMain: `main${originCategoryItem.categoryID}`,
            categoryIDAside: `aside${originCategoryItem.categoryID}`,
            foodList: (originCategoryItem.foodList || []).map(
                (originFoodItem): FoodItemI => {
                    const foodItem = {
                        ...originFoodItem,
                        fullImgPath: `${foodImgPath}/${originFoodItem.imgUrl}`,
                        foodItemAmount: 0,
                        showReserveCountFlag: originFoodItem.reserveCount < 10,
                    }
                    foodListMap[`${foodItem.foodID}`] = foodItem
                    return foodItem
                }
            ).sort((a, b) => a.foodID - b.foodID),
            foodListMap,
        };
        categoryListMap[`${categoryItem.categoryID}`] = categoryItem;
        categoryList.push(categoryItem)
    });
    categoryList.sort((a, b) => a.categoryID - b.categoryID)
    if (categoryList.length) {
        commit("setSelectedCategoryID", categoryList[0].categoryID);
        commit("setCategoryIDMain", "");
        commit("setCategoryIDAside", "");
    }
    commit("setCategoryList", categoryList);
    commit("setCategoryListMap", categoryListMap);
}

async function getOrderKeyFoodList({ commit, state }: ActionContextI, option: any = { orderKey: "" }) {
    const originFoodList: OriginFoodItemI[] = await fetch("order/foodList", {
        ...option,
    });
    const cartCategoryListMap: CategoryListMapI = {};
    const overReserveFoodList: FoodItemI[] = [];
    const overReserveFoodListMap: FoodListMapI = {};
    originFoodList.forEach((originFoodItem: OriginFoodItemI): void => {
        const foodItem: FoodItemI = {
            ...originFoodItem,
            fullImgPath: `${foodImgPath}/${originFoodItem.imgUrl}`,
            foodItemAmount: toFixedToNumber(originFoodItem.price * originFoodItem.orderCount),
            showReserveCountFlag: originFoodItem.reserveCount < 10,
        };
        const stateCategoryItem: CategoryItemI = state.categoryListMap[`${foodItem.categoryID}`];
        if (stateCategoryItem) {
            const stateFoodItem: FoodItemI = stateCategoryItem.foodListMap[`${foodItem.foodID}`];
            if (stateFoodItem) {
                if (foodItem.orderCount > stateFoodItem.reserveCount) { // 超出库存
                    overReserveFoodList.push(foodItem);
                    overReserveFoodListMap[`${foodItem.foodID}`] = foodItem
                } else if (foodItem.orderCount > 0) {
                    let findCartCategoryItem = cartCategoryListMap[`${foodItem.categoryID}`]
                    if (findCartCategoryItem) { // 购物车CategoryListMap 包含该 categoryID map
                        findCartCategoryItem.foodList.push(foodItem);
                        findCartCategoryItem.foodListMap[`${foodItem.foodID}`] = foodItem
                    } else { // 购物车CategoryListMap 不包含该 categoryID map
                        const categoryItem: CategoryItemI = {
                            categoryID: foodItem.categoryID,
                            categoryIDMain: `main${foodItem.categoryID}`,
                            categoryIDAside: `aside${foodItem.categoryID}`,
                            categoryName: foodItem.categoryName,
                            foodList: [foodItem],
                            foodListMap: {
                                [foodItem.foodID]: foodItem
                            }
                        }
                        cartCategoryListMap[`${foodItem.categoryID}`] = categoryItem
                    }
                }
            }
        }
    });


    const cartCategoryList = Object.keys(cartCategoryListMap).sort((a, b) => {
        return Number(a) - Number(b)
    }).map((categoryID: string): CategoryItemI => {
        cartCategoryListMap[categoryID].foodList.sort((a, b) => a.foodID - b.foodID)
        return cartCategoryListMap[categoryID]
    })
    commit("setCartCategoryList", cartCategoryList);
    // commit("setCartCategoryListMap", cartCategoryListMap);
    commit("setOverReserveFoodList", overReserveFoodList);
    commit("setOverReserveFoodListMap", overReserveFoodListMap);
    return cartCategoryList;
}

export default {
    getMenuList,
    getOrderKeyFoodList,
} as ActionI;
