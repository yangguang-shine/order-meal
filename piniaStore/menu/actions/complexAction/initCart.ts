
import menuState from "../../state";
import cartChange from "./cartChange";




export type InitCartI = () => void
function initCart() {
    const cartCategoryListOrigin = menuState.cartCategoryList;
    menuState.cartCategoryList = [];
    menuState.cartCategoryListMap = {};
    cartCategoryListOrigin.forEach((cartCategoryItem) => {
        const stateCategoryItem = menuState.categoryListMap[`${cartCategoryItem.categoryID}`];
        if (stateCategoryItem) {
            cartCategoryItem.foodList.forEach((cartFoodItem) => {
                const stateFoodItem = stateCategoryItem.foodListMap[`${cartFoodItem.foodID}`];
                if (stateFoodItem) {
                    if (cartFoodItem.orderCount > stateFoodItem.reserveCount) {
                        // 超出库存
                        const stateOverResetveFoodItem = menuState.overReserveFoodListMap[`${cartFoodItem.foodID}`];
                        if (!stateOverResetveFoodItem) {
                            menuState.overReserveFoodListMap[`${cartFoodItem.foodID}`] = cartFoodItem;
                            menuState.overReserveFoodList.push(cartFoodItem);
                        }
                    } else if (cartFoodItem.orderCount > 0) {
                        const length = cartFoodItem.orderSpecifaList.length;
                        if (length) {
                            for (let i = 0; i < length; i++) {
                                // 防止后台口味删减修改时本地有缓存
                                const orderSpecificationItem = cartFoodItem.orderSpecifaList[i];
                                const indexList = orderSpecificationItem.key.split("");
                                if (indexList.length !== stateFoodItem.specificationList.length) {
                                    continue;
                                }
                                try {
                                    const falg = indexList.every((item, index) => {
                                        return stateFoodItem.specificationList[index].categoryList[Number(item)];
                                    });
                                    if (falg) {
                                        // 匹配得上
                                        cartChange({
                                            foodItem: stateFoodItem,
                                            count: orderSpecificationItem.orderCount,
                                            type: "add",
                                            specificationString: orderSpecificationItem.key,
                                        });
                                    } else {
                                        continue;
                                    }
                                } catch (e) {
                                    console.log(e);
                                    continue;
                                }
                            }
                        } else {
                            cartChange({
                                foodItem: stateFoodItem,
                                count: cartFoodItem.orderCount,
                                type: "add",
                            });
                        }
                    }
                }
            });
        }
    });
    console.log(menuState.cartCategoryList);
}






export default initCart;
