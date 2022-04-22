import fetch from "@/utils/fetch";
import { toFixedToNumber } from "@/utils/index";
import { foodImgPath } from "@/config/index";
import { ActionI, ActionContextI, OriginCategoryItemI, CategoryItemI, FoodItemI, OriginFoodItemI } from "@/interface/index";

async function getMenuList({ commit, state }: ActionContextI) {
    // 初始化会出现页面返回再次进入数据混乱问题
    commit("setFoodCategoryList", []);
    const data: OriginCategoryItemI[] = await fetch("shop/menu", {
        shopID: state.shopInfo.shopID,
    });
    const categoryList: CategoryItemI[] = (data || []).map(
        (item: OriginCategoryItemI): CategoryItemI => ({
            ...item,
            categoryIDMain: `main${item.categoryID}`,
            categoryIDAside: `aside${item.categoryID}`,
            foodList: (item.foodList || []).map(
                (foodItem): FoodItemI => ({
                    ...foodItem,
                    fullImgPath: `${foodImgPath}/${foodItem.imgUrl}`,
                    foodItemAmount: 0,
            // reserveCount: Math.random() > 0.5 ? 0 : Math.random() > 0.5 ? 12 : 1,
                })
            ),
        })
    );
    if (categoryList.length) {
        commit("setSelectedCategoryID", categoryList[0].categoryID);
        commit("setCategoryIDMain", "");
        commit("setCategoryIDAside", "");
    }
    commit("setFoodCategoryList", categoryList);
}

async function getOrderKeyFoodList({ commit, state }: ActionContextI, option: any = { orderKey: "" }) {
    const data: OriginFoodItemI[] = await fetch("order/foodList", {
        ...option,
    });
    const cartCategoryList: CategoryItemI[] = data.reduce((list: CategoryItemI[], item: OriginFoodItemI) => {
        if (!list.length) {
            list.push({
                categoryID: item.categoryID,
                categoryIDMain: `main${item.categoryID}`,
                categoryIDAside: `aside${item.categoryID}`,
                categoryName: item.categoryName,
                foodList: [
                    {
                        ...item,
                        fullImgPath: `${foodImgPath}/${item.imgUrl}`,
                        foodItemAmount: toFixedToNumber(item.price * item.orderCount),
                    },
                ],
            });
        } else {
            const find = list.find((ListItem) => ListItem.categoryID === item.categoryID);
            if (find) {
                find.foodList.push({
                    ...item,
                    fullImgPath: `${foodImgPath}/${item.imgUrl}`,
                    foodItemAmount: toFixedToNumber(item.price * item.orderCount),
                });
            } else {
                list.push({
                    categoryID: item.categoryID,
                    categoryName: item.categoryName,
                    categoryIDMain: `main${item.categoryID}`,
                    categoryIDAside: `aside${item.categoryID}`,
                    foodList: [
                        {
                            ...item,
                            fullImgPath: `${foodImgPath}/${item.imgUrl}`,
                            foodItemAmount: toFixedToNumber(item.price * item.orderCount),
                        },
                    ],
                });
            }
        }
        return list;
    }, []);

    commit("setCartCategoryList", cartCategoryList);
    return cartCategoryList;
}

export default {
    getMenuList,
    getOrderKeyFoodList,
} as ActionI;
