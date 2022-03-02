

const setCategoryTabId = (state: any, payload: any) => {
    state.categoryTabId = payload
}
const setScrollIntoCategoryTabID = (state: any, payload: any) => {
    state.scrollIntoCategoryTabID = payload
}
const setFoodCategoryList = (state: any, payload: any) => {
    state.foodCategoryList = payload
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
const toogleCartDetailFlag = (state: any, payload: any) => {
    state.cartDetailFlag = !state.cartDetailFlag
}
const setCartDetailFlag = (state: any, payload: any) => {
    state.cartDetailFlag = payload
}


const clearCart = (state: any, payload: any) => {
    state.cartFoodList.forEach((categoryTtem) => {
        categoryTtem.foodList.forEach((foodItem) => {
            foodItem.orderCount = 0
        })
    })
    // 清空数组
    state.cartFoodList.length = 0
    // uni.removeStorageSync(`storageFoodList_${state.shopInfo.shopID}`)
}
const cartChange = (state: any, { foodItem, count = 0 }) => {
    foodItem.orderCount = count || 0
    const findCategory = state.cartFoodList.find(item => item.categoryID === foodItem.categoryID)
    if (findCategory) {
        const findFood = findCategory.foodList.find(item => item.foodName === foodItem.foodName)
        if (!findFood) {
            findCategory.foodList.push(foodItem)
        }
    } else {
        state.cartFoodList.push({
            categoryID: foodItem.categoryID,
            foodList: [foodItem]
        })
    }
    state.cartFoodList.forEach((item) => {
        item.foodList = item.foodList.filter(foodItem => {
            if (foodItem.orderCount > 0) {
                foodItem.foodItemAmount = Number((foodItem.price * foodItem.orderCount).toFixed(2))
                return true
            } else {
                return false
            }
        })
    })
    state.cartFoodList = state.cartFoodList.filter(item => item.foodList.length > 0)
}








export default {
    setCategoryTabId,
    setScrollIntoCategoryTabID,
    setFoodCategoryList,
    setFoodInfo,
    setFoodDetailFlag,
    setTopBarInfo,
    toogleCartDetailFlag,
    setCartDetailFlag,
    clearCart,
    cartChange
}