import fetch from '@/utils/fetch'
import { foodImgPath} from '@/config/index'
import { ActionI } from "@/interface/index";

const getMenuList: ActionI = async ({ commit, state }) => {
    const categoryList: any = await fetch("user/order/menuList", {
        shopID: state.shopInfo.shopID
    });
    categoryList.forEach((item, index) => {
        item.categoryTabID = "id" + item.categoryID;
        item.foodList.forEach((foodItem)=>{
            foodItem.fullImgPath = `${foodImgPath}/${foodItem.imgUrl}`
        })
    });
    if (categoryList.length) {
        commit('setCategoryTabId', categoryList[0].categoryTabID)
        commit('setScrollIntoCategoryTabID', null)
    }
    commit('setFoodCategoryList', categoryList)
}

const getOrderKeyFoodList: ActionI = async ({ commit ,state}, option: any) => {
        const data: any = await fetch("user/order/foodList", {
            ...option,
            shopID: state.shopInfo.shopID,
        });
        const orderCategoryList = data.reduce((list, item) => {
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
    getOrderKeyFoodList
}