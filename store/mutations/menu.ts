import { MutationI, FoodItemI,StateI } from "@/interface/index";
function setCategoryTabId (state: StateI, payload: any) {
    state.categoryTabId = payload;
};
function setScrollIntoCategoryTabID (state: StateI, payload: any) {
    state.scrollIntoCategoryTabID = payload;
};
function setFoodCategoryList (state: StateI, payload: any) {
    state.categoryList = payload;
};
function setFoodInfo (state: StateI, payload: any) {
    state.foodInfo = payload;
};
function setFoodDetailFlag (state: StateI, payload: any) {
    state.foodDetailFalg = payload;
};
function setTopBarInfo (state: StateI, payload: any) {
    state.topBarInfo = payload;
};
function setShopInfoFlag (state: StateI, payload: any) {
    state.shopInfoFlag = payload;
};
function toogleCartDetailFlag (state: StateI, payload: any) {
    state.cartDetailFlag = !state.cartDetailFlag;
};
function setCartDetailFlag (state: StateI, payload: any) {
    state.cartDetailFlag = payload;
};
function setCartCategoryList (state: StateI, payload: any) {
    state.cartCategoryList = payload;
};

function clearCart (state: StateI, payload: any) {
    state.cartCategoryList.forEach((categoryTtem) => {
        categoryTtem.foodList.forEach((foodItem) => {
            foodItem.orderCount = 0;
        });
    });
    // 清空数组
    state.cartCategoryList = [];
    // uni.removeStorageSync(`storageFoodList_${state.shopInfo.shopID}`)
};

function cartChange (state: StateI, { foodItem, count = 0 }: {
    foodItem: FoodItemI,
    count: number
}) {
    foodItem.orderCount = count || 0;
    const findCategory = state.cartCategoryList.find((item) => item.categoryID === foodItem.categoryID);
    if (findCategory) {
        const findFood = findCategory.foodList.find((item) => item.foodID === foodItem.foodID);
        if (!findFood) {
            findCategory.foodList.push(foodItem);
        }
    } else {
        state.cartCategoryList.push({
            categoryID: foodItem.categoryID,
            categoryName: foodItem.categoryName,
            foodList: [foodItem],
        });
    }
    state.cartCategoryList.forEach((item) => {
        item.foodList = item.foodList.filter((foodItem) => {
            if (foodItem.orderCount > 0) {
                foodItem.foodItemAmount = Number((foodItem.price * foodItem.orderCount).toFixed(2));
                return true;
            } else {
                return false;
            }
        });
    });
    state.cartCategoryList = state.cartCategoryList.filter((item) => item.foodList.length > 0);
};

function initCart (state: StateI, payload: any) {
    const cartCategoryListOrigin = state.cartCategoryList;
    state.cartCategoryList = [];
    cartCategoryListOrigin.forEach((cartFoodItem) => {
        const foodCategoryFind = state.categoryList.find((foodCategoryItem) => foodCategoryItem.categoryID === cartFoodItem.categoryID);
        if (foodCategoryFind) {
            foodCategoryFind.foodList.forEach((foodItem) => {
                cartFoodItem.foodList.forEach((item) => {
                    if (item.foodID === foodItem.foodID) {
                        cartChange(state, { foodItem, count: item.orderCount });
                    }
                });
            });
        }
    });
};

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
    setCartCategoryList,
    clearCart,
    cartChange,
    initCart,
} as MutationI;
