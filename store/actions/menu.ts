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
            categoryTabID: "id" + item.categoryID,
            foodList: (item.foodList || []).map(
                (foodItem): FoodItemI => ({
                    ...foodItem,
                    fullImgPath: `${foodImgPath}/${foodItem.imgUrl}`,
                    foodItemAmount: 0,
                })
            ),
        })
    );
    if (categoryList.length) {
        commit("setCategoryTabId", categoryList[0].categoryTabID);
        commit("setScrollIntoCategoryTabID", '');
    }
    commit("setFoodCategoryList", categoryList);
}

async function getOrderKeyFoodList({ commit, state }: ActionContextI, option: any = {orderKey: ''}) {
    const data: OriginFoodItemI[] = await fetch("order/foodList", {
        ...option,
    });
    const cartCategoryList: CategoryItemI[] = data.reduce((list: CategoryItemI[], item: OriginFoodItemI) => {
        if (!list.length) {
            list.push({
                categoryID: item.categoryID,
                categoryTabID: "id" + item.categoryID,
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
                    categoryTabID: "id" + item.categoryID,
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
