
import getShopMinusList from '@/utils/getShopMinusList';
import { vuexStorage } from '@/utils/tool';


const mutations = {
}
// user
mutations['cartCountChange'] = function(state, { categoryID = '', foodItem = {}, fromStorageCart = false } = {}) {
	// 购物车数量增加减少使用的是引用改变，其他关联也相应改变
    const findCategory = state.cartCategoryList.find(item => item.categoryID === categoryID)
    if (findCategory) {
        const findFood = findCategory.foodList.find(item => item.foodName === foodItem.foodName)
        if (!findFood) {
            findCategory.foodList.push(foodItem)
        }
    } else {
        state.cartCategoryList.push({
            categoryID,
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
    if (!fromStorageCart) {
        uni.setStorage({
            key: `storageFoodList_${(vuexStorage(state, 'shopInfo') || {}).shopID}`,
            data: state.cartCategoryList
        })
    }
}
mutations['initCart'] = function (state, { categoryList = [], storageFoodList = [] } = {}) {
    storageFoodList.forEach((storageFoodItem) => {
        const foodCategoryFind = categoryList.find(foodCategoryItem => foodCategoryItem.categoryID === storageFoodItem.categoryID)
        if (foodCategoryFind) {
            foodCategoryFind.foodList.forEach((foodItem) => {
                storageFoodItem.foodList.forEach((item) => {
                    if (item.foodID === foodItem.foodID) {
                        foodItem.orderCount = item.orderCount
                        this.commit('cartCountChange', { categoryID: foodCategoryFind.categoryID, foodItem, fromStorageCart: true })
                    }
                })
            })
        }
    })
}

mutations['clearCart'] = (state, shopInfo = {}) => {
    state.cartCategoryList.forEach((categoryTtem) => {
        categoryTtem.foodList.forEach((foodItem) => {
            foodItem.orderCount = 0
        })
    })
    state.cartCategoryList = []
    uni.removeStorageSync(`storageFoodList_${(vuexStorage(state, 'shopInfo') || {}).shopID}`)
}

// mutations['saveDefaultAddress'] = (state, address = {}) => {
//     state.defaultAddress = address
// }

// mutations['saveShopInfo'] = (state, shopInfo = {}) => {
//     const minusList = getShopMinusList(shopInfo.minus)
//     shopInfo.minusList = minusList
//     state.cartCategoryList = []
//     state.shopInfo = shopInfo
// 	uni.setStorage({
// 		key: 'shopInfo',
// 		data: shopInfo
// 	})
// }

// mutations['saveBusinessType'] = (state, businessType) => {
//     state.businessType = Number(businessType)
// 	uni.setStorage({
// 		key: 'businessType',
// 		data: businessType
// 	})
// }

// mutations['savecartCategoryList'] = (state, cartCategoryList) => {
//     state.cartCategoryList = cartCategoryList
// 	uni.setStorage({
// 		key: 'cartCategoryList',
// 		data: cartCategoryList
// 	})
// }


// manage

// mutations['saveSelectShopItem'] = (state, selectShopItem) => {
//     state.selectShopItem = selectShopItem
// 	uni.setStorage({
// 		key: 'selectShopItem',
// 		data: selectShopItem
// 	})
// }
export default mutations