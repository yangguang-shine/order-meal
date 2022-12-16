import fetch from "@/utils/fetch";
import { defaultFoodImg, foodImgPath, shopImgPath } from "@/config/index";
import { OriginCategoryItemI, CategoryItemI, FoodItemI, OriginFoodItemI, FoodListMapI, CategoryListMapI, StateI, initFoodItem, PositionInfoI, ShopItemI, CollectFoodListMapI, CollectFoodKeyObjI, OriginShopItemI, OriginOrderFoodItemI } from "@/interface/index";

import { toFixedToNumber } from "@/utils/index";
import menuState from "../../state";

export type GetOrderKeyFoodListI = (option?: { orderKey: string }) => Promise<CategoryItemI[]>
const getOrderKeyFoodList: GetOrderKeyFoodListI = async function (option: { orderKey: string } = { orderKey: "" }) {
    const originFoodList: OriginOrderFoodItemI[] = await fetch("order/foodList", {
        ...option,
    });
    const cartCategoryListMap: CategoryListMapI = {};
    const overReserveFoodList: FoodItemI[] = [];
    const overReserveFoodListMap: FoodListMapI = {};
    originFoodList.forEach((originFoodItem: OriginOrderFoodItemI): void => {
        const specificationList = JSON.parse(originFoodItem.specification || "[]");
        const orderSpecifaList = JSON.parse(originFoodItem.orderSpecifaListJSON || "[]");
        const foodItem: FoodItemI = {
            ...originFoodItem,
            currentImg: defaultFoodImg,
            fullImgPath: `${foodImgPath}/${menuState.shopInfo.shopID}/${originFoodItem.imgUrl}`,
            defaultImg: defaultFoodImg,
            foodItemAmount: toFixedToNumber(originFoodItem.price * originFoodItem.orderCount),
            showReserveCountFlag: originFoodItem.reserveCount < 10,
            specificationList,
            orderSpecifaList,
            specificationSlectedIndexList: specificationList.map(() => 0),
        };
        const stateCategoryItem: CategoryItemI = menuState.categoryListMap[`${foodItem.categoryID}`];
        if (stateCategoryItem) {
            const stateFoodItem: FoodItemI = stateCategoryItem.foodListMap[`${foodItem.foodID}`];
            if (stateFoodItem) {
                if (foodItem.orderCount > stateFoodItem.reserveCount) {
                    // 超出库存
                    overReserveFoodList.push(foodItem);
                    overReserveFoodListMap[`${foodItem.foodID}`] = foodItem;
                } else if (foodItem.orderCount > 0) {
                    let findCartCategoryItem = cartCategoryListMap[`${foodItem.categoryID}`];
                    if (findCartCategoryItem) {
                        // 购物车CategoryListMap 包含该 categoryID map
                        findCartCategoryItem.foodList.push(foodItem);
                        findCartCategoryItem.foodListMap[`${foodItem.foodID}`] = foodItem;
                    } else {
                        // 购物车CategoryListMap 不包含该 categoryID map
                        const categoryItem: CategoryItemI = {
                            categoryID: foodItem.categoryID,
                            categoryIDMain: `main${foodItem.categoryID}`,
                            categoryIDAside: `aside${foodItem.categoryID}`,
                            categoryName: foodItem.categoryName,
                            foodList: [foodItem],
                            foodListMap: {
                                [foodItem.foodID]: foodItem,
                            },
                            required: menuState.categoryListMap[`${foodItem.categoryID}`].required,
                        };
                        cartCategoryListMap[`${foodItem.categoryID}`] = categoryItem;
                    }
                }
            }
        }
    });

    const cartCategoryList = Object.keys(cartCategoryListMap)
        .sort((a, b) => {
            return Number(a) - Number(b);
        })
        .map((categoryID: string): CategoryItemI => {
            cartCategoryListMap[categoryID].foodList.sort((a, b) => a.foodID - b.foodID);
            return cartCategoryListMap[categoryID];
        });
    console.log("cartCategoryList");
    console.log(cartCategoryList);
    menuState.cartCategoryList = cartCategoryList;
    menuState.overReserveFoodList = overReserveFoodList;
    menuState.overReserveFoodListMap = overReserveFoodListMap;
    return cartCategoryList;
}

export default getOrderKeyFoodList;
