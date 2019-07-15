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
}
export default mutations