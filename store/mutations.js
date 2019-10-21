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
            key: `storageFoodList_${state.shopInfo.shopID}`,
            data: state.cartFoodList
        })
    }
}
mutations['initCart'] = function (state, { foodCategoryList = [], storageFoodList = [] } = {}) {
    storageFoodList.forEach((storageFoodItem) => {
        const foodCategoryFind = foodCategoryList.find(foodCategoryItem => foodCategoryItem.categoryID === storageFoodItem.categoryID)
        if (foodCategoryFind) {
            foodCategoryFind.foodList.forEach((foodItem) => {
                storageFoodItem.foodList.forEach((item) => {
                    if (item.foodID === foodItem.foodID) {
                        foodItem.orderCount = item.orderCount
                        this.commit('cartCountChange', { categoryID: foodCategoryFind.categoryID, foodItem, fromCart: false })
                    }
                })
            })
        }
    })
}
mutations['saveShopInfo'] = (state, shopInfo = {}) => {
    let minusList = []
    const minusSplit = shopInfo.minus.split(',')
    if (minusSplit[0] === '') {
        minusList = []
    } else {                
        minusList = minusSplit.map((item) => {
            const splitMinus = item.split('-')
            return {
                reach: Number(splitMinus[0]),
                reduce: Number(splitMinus[1]),
            }
        })
    }
    shopInfo.minusList = minusList
    state.cartFoodList = []
    state.shopInfo = shopInfo
}

mutations['clearCart'] = (state, shopInfo = {}) => {
    state.cartFoodList.forEach((categoryTtem) => {
        categoryTtem.foodList.forEach((foodItem) => {
            foodItem.orderCount = 0
        })
    })
    state.cartFoodList = []
    uni.removeStorageSync(`storageFoodList_${state.shopInfo.shopID}`)
}

mutations['changeAllOrderListUpdate'] = (state, status = [true, true, true, true]) => {
    state.orderListUpdate = status
}

mutations['changeOrderListUpdate'] = (state,{ index, status = true } = {}) => {
    state.orderListUpdate[index] = status
}

mutations['saveDefaultAddress'] = (state, address = {}) => {
    state.defaultAddress = address
}
mutations['saveBusinessType'] = (state, businessType) => {
    state.businessType = Number(businessType)
}

export default mutations