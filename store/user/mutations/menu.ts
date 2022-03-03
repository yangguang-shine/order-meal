

const setCategoryTabId = (state: any, payload: any) => {
    state.categoryTabId = payload
}
const setScrollIntoCategoryTabID = (state: any, payload: any) => {
    state.scrollIntoCategoryTabID = payload
}
const setFoodCategoryList = (state: any, payload: any) => {
    state.categoryList = payload
}
const setFoodInfo = (state: any, payload: any) => {
    state.foodInfo = payload
}
const setFoodDetailFlag = (state: any, payload: any) => {
    state.foodDetailFalg = payload
}
const setTopBarInfo = (state: any, payload: any) => {
    state.topBarInfo = payload
}
const setShopInfoFlag = (state: any, payload: any) => {
    state.shopInfoFlag = payload
}
const toogleCartDetailFlag = (state: any, payload: any) => {
    state.cartDetailFlag = !state.cartDetailFlag
}
const setCartDetailFlag = (state: any, payload: any) => {
    state.cartDetailFlag = payload
}



const clearCart = (state: any, payload: any) => {
    state.cartCategoryList.forEach((categoryTtem) => {
        categoryTtem.foodList.forEach((foodItem) => {
            foodItem.orderCount = 0
        })
    })
    // 清空数组
    state.cartCategoryList = []
    // uni.removeStorageSync(`storageFoodList_${state.shopInfo.shopID}`)
}

const cartChange = (state: any, { foodItem, count = 0 }) => {
    foodItem.orderCount = count || 0
    const findCategory = state.cartCategoryList.find(item => item.categoryID === foodItem.categoryID)
    if (findCategory) {
        const findFood = findCategory.foodList.find(item => item.foodName === foodItem.foodName)
        if (!findFood) {
            findCategory.foodList.push(foodItem)
        }
    } else {
        state.cartCategoryList.push({
            categoryID: foodItem.categoryID,
            foodList: [foodItem]
        })
    }
    state.cartCategoryList.forEach((item) => {
        item.foodList = item.foodList.filter(foodItem => {
            if (foodItem.orderCount > 0) {
                foodItem.foodItemAmount = Number((foodItem.price * foodItem.orderCount).toFixed(2))
                return true
            } else {
                return false
            }
        })
    })
    state.cartCategoryList = state.cartCategoryList.filter(item => item.foodList.length > 0)
}

const initCart = function (state: any, payload: any){
    const cartCategoryListOrigin = state.cartCategoryList
    state.cartCategoryList = []
    cartCategoryListOrigin.forEach(cartFoodItem => {
        const foodCategoryFind = state.categoryList.find(foodCategoryItem => foodCategoryItem.categoryID === cartFoodItem.categoryID);
        if (foodCategoryFind) {
            foodCategoryFind.foodList.forEach(foodItem => {
                cartFoodItem.foodList.forEach(item => {
                    if (item.foodID === foodItem.foodID) {
                        // foodItem.orderCount = item.orderCount;
                        cartChange(state, {foodItem, count: item.orderCount});
                    }
                });
            });
        }
    });
}






export default {
    setCategoryTabId,
    setScrollIntoCategoryTabID,
    setFoodCategoryList,
    setFoodInfo,
    setFoodDetailFlag,
    setTopBarInfo,
    setShopInfoFlag,
    toogleCartDetailFlag,
    setCartDetailFlag,
    clearCart,
    cartChange,
    initCart
}