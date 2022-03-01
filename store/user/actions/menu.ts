import fetch from '../../../utils/fetch'
import getShopMinusList from '../../../utils/getShopMinusList'
const getMenuList = async ({ commit, state }) => {
    const foodCategoryList: any = await fetch("user/order/menuList", {
        shopID: state.shopInfo.shopID
    });
    foodCategoryList.forEach((item, index) => {
        item.scrollTabID = "id" + item.categoryID;
    });
    if (foodCategoryList.length) {
        commit('setCategoryTabId', foodCategoryList[0].scrollTabID)
        commit('setScrollIntoCategoryID', null)
    }
    commit('setFoodCategoryList', foodCategoryList)
}

const getOrderKeyFoodList = async ({ commit ,state}, option: any) => {
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
        commit('setOrderCategoryList', orderCategoryList)
}


export default {
    getMenuList,
    getOrderKeyFoodList
}