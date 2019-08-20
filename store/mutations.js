const mutations = {
}
mutations['cartCountChange'] = function(state, { categoryID = '', foodItem = {}, fromCart = true } = {}) {
    const findCategory = state.cartFoodList.find(item => item.categoryID === categoryID)
    if (findCategory) {
        const findFood = findCategory.foodList.find(item => item.foodName === foodItem.foodName)
        if (!findFood) {
            findCategory.foodList.push(foodItem)
        }
    } else {
        state.cartFoodList.push({
            categoryID,
            foodList: [foodItem]
        }) 
    }
    state.cartFoodList.forEach((item) => {
        item.foodList = item.foodList.filter(foodItem => foodItem.orderCount > 0)
    })
    state.cartFoodList = state.cartFoodList.filter(item => item.foodList.length > 0)
    if (fromCart) {
        uni.setStorage({
            key: 'storageFoodList',
            data: state.cartFoodList
        })
    }
}
mutations['initCart'] = function (state, { foodCategoryList = [], storageFoodList = [] } = {}) {
    storageFoodList.forEach((storageFoodItem) => {
        const foodCatrgoryFind = foodCategoryList.find(foodCategoryItem => foodCategoryItem.categoryID === storageFoodItem.categoryID)
        if (foodCatrgoryFind) {
            foodCatrgoryFind.foodList.forEach((foodItem) => {
                storageFoodItem.foodList.forEach((item) => {
                    if (item.foodID === foodItem.foodID) {
                        foodItem.orderCount = item.orderCount
                        this.commit('cartCountChange', { categoryID: foodCatrgoryFind.categoryID, foodItem, fromCart: false })
                    }
                })
            })
        }
    })
}
mutations['saveOrderShopInfo'] = (state, shopInfo = {}) => {
    if (String(state.shopInfo.shopID) === String(shopInfo.shopID)) {
        return
    } else {
        wx.removeStorageSync('storageFoodList')
        state.cartFoodList = []
        state.shopInfo = shopInfo
    }
}
export default mutations