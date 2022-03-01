

const setCategoryTabId = (state: any, payload: any) => {
    state.categoryTabId = payload
    console.log(state)
}
const setScrollIntoCategoryID = (state: any, payload: any) => {
    state.scrollIntoCategoryID = payload
}
const setFoodCategoryList = (state: any, payload: any) => {
    console.log('setFoodCategoryList')
    state.foodCategoryList = payload
}
const setFoodInfo= (state: any, payload: any) => {
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
    state.cartFoodList = []
    uni.removeStorageSync(`storageFoodList_${state.shopInfo.shopID}`)
}
const cartCountChange = (state: any, foodItem: any) => {

}






export default {
    setCategoryTabId,
    setScrollIntoCategoryID,
    setFoodCategoryList,
    setFoodInfo,
    setFoodDetailFlag,
    setTopBarInfo,
    toogleCartDetailFlag,
    setCartDetailFlag,
    clearCart
}