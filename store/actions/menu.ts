import fetch from '@/utils/fetch'
import { foodImgPath} from '@/config/index'
import { ActionI,ActionsContextI, OriginCategoryInfoI, CategoryInfoI, FoodItemI, OriginFoodItemI } from "@/interface/index";

async function getMenuList ({ commit, state }: ActionsContextI) {
    const data: OriginCategoryInfoI[] = await fetch("user/order/menuList", {
        shopID: state.shopInfo.shopID
    });
    const categoryList: CategoryInfoI[] = (data|| []).map((item: OriginCategoryInfoI): CategoryInfoI => ({
        ...item,
        categoryTabID: "id" + item.categoryID,
        foodList: (item.foodList || []).map((foodItem) :FoodItemI =>({
            ...foodItem,
            fullImgPath: `${foodImgPath}/${foodItem.imgUrl}`,
            foodItemAmount: 0
        }))
    }));
    if (categoryList.length) {
        commit('setCategoryTabId', categoryList[0].categoryTabID)
        commit('setScrollIntoCategoryTabID', null)
    }
    commit('setFoodCategoryList', categoryList)
}

async function  getOrderKeyFoodList ({ commit ,state}: ActionsContextI, option: any)  {
        const data: FoodItemI[] = await fetch("user/order/foodList", {
            ...option,
            shopID: state.shopInfo.shopID,
        });
        const orderCategoryList = data.reduce((list: OriginCategoryInfoI[], item: FoodItemI) => {
            if (!list.length) {
                list.push({
                    categoryID: item.categoryID,
                    categoryName: item.categoryName,
                    foodList: [item]
                });
            } else {
                const find = list.find(
                    ListItem => ListItem.categoryID === item.categoryID
                );
                if (find) {
                    find.foodList.push(item);
                } else {
                    list.push({
                        categoryID: item.categoryID,
                        categoryName: item.categoryName,
                        foodList: [item]
                    });
                }
            }
            return list;
        }, []);

        commit('setCartCategoryList', orderCategoryList)
        return orderCategoryList
}


export default {
    getMenuList,
    getOrderKeyFoodList,
} as ActionI