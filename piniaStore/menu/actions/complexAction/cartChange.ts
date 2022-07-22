import { OriginCategoryItemI, CategoryItemI, FoodItemI, OriginFoodItemI, FoodListMapI, CategoryListMapI, StateI, initFoodItem, PositionInfoI, ShopItemI, CollectFoodListMapI, CollectFoodKeyObjI, OriginShopItemI, OriginOrderFoodItemI } from "@/interface/index";

import { toFixedToNumber } from "@/utils/index";
import menuState from "../../state";



// 菜品变动核心，只有此时cartCategoryListMap才会进行正确的变化
interface CartChangeParamsI {
    foodItem: FoodItemI;
    count: number;
    type: "add" | "minus";
    specificationString?: string;
}
export type CartChangeI = ({ foodItem, count, type, specificationString }: CartChangeParamsI) => void
const cartChange: CartChangeI = function ({ foodItem, count = 0, type = "add", specificationString = "" }: CartChangeParamsI) {
    // 存在规格时
    if (specificationString) {
        const findIndex = foodItem.orderSpecifaList.findIndex((item) => item.key === specificationString);
        if (findIndex > -1) {
            const orderSpecifaItem = foodItem.orderSpecifaList[findIndex];
            orderSpecifaItem.orderCount +=  count;
            orderSpecifaItem.allCountPrice = toFixedToNumber(orderSpecifaItem.currentPrice * orderSpecifaItem.orderCount);
            // foodItem.orderSpecifaList[findIndex].allCountPrice = toFixedToNumber(foodItem.price * foodItem.orderSpecifaList[findIndex].orderCount);
            if (foodItem.orderSpecifaList[findIndex].orderCount <= 0) {
                foodItem.orderSpecifaList.splice(findIndex, 1);
                // 同种商品去掉一种规格种类时重置规格默认
                const length = foodItem.orderSpecifaList.length;
                if (length) {
                    foodItem.specificationSlectedIndexList = foodItem.orderSpecifaList[length - 1].specifa.map((item) => item.index);
                }
            }
        } else {
            if (type === "add") {
                const specificationIndexList = specificationString.split("").map((item) => Number(item));
                const specifa = specificationIndexList.map((item, index) => {
                    return {
                        index: Number(item),
                        content: foodItem.specificationList[index].categoryList[item].content,
                        price: foodItem.specificationList[index].categoryList[item].price,
                    };
                });
                const addPrice = specifa.reduce((sum, item, index) => {
                    sum += item.price
                    return sum
                }, 0);
                const price = foodItem.price
                const currentPrice = price + addPrice;
                const allCountPrice = currentPrice * count
                const orderSpecifaItem = {
                    key: specificationString,
                    orderCount: count,
                    specifa,
                    addPrice: toFixedToNumber(addPrice),
                    price: toFixedToNumber(price),
                    currentPrice: toFixedToNumber(currentPrice),
                    allCountPrice: toFixedToNumber(allCountPrice),
                };
                foodItem.orderSpecifaList.push(orderSpecifaItem);
            } else {
                throw "type error " + type;
            }
        }
    }
    foodItem.orderCount = foodItem.orderCount + count;
    foodItem.foodItemAmount = toFixedToNumber(foodItem.price * foodItem.orderCount);
    const stateCartCategoryItem = menuState.cartCategoryListMap[`${foodItem.categoryID}`];
    if (stateCartCategoryItem) {
        const stateCartFoodItem = stateCartCategoryItem.foodListMap[`${foodItem.foodID}`];
        if (stateCartFoodItem) {
            if (foodItem.orderCount <= 0) {
                // 删除 foodListMap 中一项也需要删除数组 foodList 相同的一项，因为两个同步存在，为了减少复杂度，因此 foodList 最终通过 foodListMap 遍历获取
                delete stateCartCategoryItem.foodListMap[`${foodItem.foodID}`];
            }
        } else {
            stateCartCategoryItem.foodListMap[`${foodItem.foodID}`] = foodItem;
        }
    } else {
        const cartCategoryItem: CategoryItemI = {
            categoryID: foodItem.categoryID,
            categoryIDMain: `main${foodItem.categoryID}`,
            categoryIDAside: `aside${foodItem.categoryID}`,
            categoryName: foodItem.categoryName,
            foodList: [], // 通过后面 foodListMap 进行获取
            foodListMap: {
                [foodItem.foodID]: foodItem,
            },
            required: menuState.categoryListMap[`${foodItem.categoryID}`].required,
        };
        menuState.cartCategoryListMap[`${foodItem.categoryID}`] = cartCategoryItem;
    }

    const cartCategoryList: CategoryItemI[] = [];
    Object.keys(menuState.cartCategoryListMap)
        .sort((a, b) => {
            return Number(a) - Number(b);
        })
        .forEach((categoryID: string): void => {
            const categoryItem: CategoryItemI = menuState.cartCategoryListMap[categoryID];
            const keys = Object.keys(categoryItem.foodListMap).sort((a, b) => Number(a) - Number(b));
            const foodList = keys.map((item) => {
                return categoryItem.foodListMap[item];
            });
            categoryItem.foodList = foodList; // 获取最终的foodList
            if (foodList.length > 0) {
                // 过滤foodList为空的
                cartCategoryList.push(categoryItem);
            } else {
                delete menuState.cartCategoryListMap[categoryID];
            }
        });
    menuState.cartCategoryList = cartCategoryList;
}

export default cartChange;
