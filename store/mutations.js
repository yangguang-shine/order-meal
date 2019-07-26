const mutations = {
}
mutations['cartCountChange'] = (state, { categoryName = '', foodItem = {} } = {}) => {
    const findCategory = state.cartFoodList.find(item => item.categoryName === categoryName)
    if (findCategory) {
        const findFood = findCategory.foodList.find(item => item.foodName === foodItem.foodName)
        if (!findFood) {
            findCategory.foodList.push(foodItem)
        }
    } else {
        state.cartFoodList.push({
            categoryName,
            foodList: [foodItem]
        }) 
    }
    state.cartFoodList.forEach((item) => {
        item.foodList = item.foodList.filter(foodItem => foodItem.orderCount > 0)
    })
    state.cartFoodList = state.cartFoodList.filter(item => item.foodList.length > 0)
}
export default mutations