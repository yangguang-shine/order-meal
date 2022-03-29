import { MutationI, FoodItemI,StateI , CategoryItemI} from "@/interface/index";
import { timeStampTranslate, toFixedToNumber } from "@/utils/index";

function setCategoryTabId (state: StateI, categoryTabID: string) {
    state.categoryTabID = categoryTabID;
};
function setScrollIntoCategoryTabID (state: StateI, scrollIntoCategoryTabID: string) {
    state.scrollIntoCategoryTabID = scrollIntoCategoryTabID;
};
function setFoodCategoryList (state: StateI, categoryList: CategoryItemI[]) {
    state.categoryList = categoryList;
};
function setFoodInfo (state: StateI, foodInfo: FoodItemI) {
    state.foodInfo = foodInfo;
};
function setFoodDetailFlag (state: StateI, foodDetailFalg: boolean) {
    state.foodDetailFalg = foodDetailFalg;
};
function setTopBarInfo (state: StateI, topBarInfo: string) {
    state.topBarInfo = topBarInfo;
};
function setShopInfoFlag (state: StateI, shopInfoFlag: boolean) {
    state.shopInfoFlag = shopInfoFlag;
};
function toogleCartDetailFlag (state: StateI, ) {
    state.cartDetailFlag = !state.cartDetailFlag;
};
function setCartDetailFlag (state: StateI, cartDetailFlag: boolean) {
    state.cartDetailFlag = cartDetailFlag;
};
function setCartCategoryList (state: StateI, cartCategoryList: CategoryItemI[]) {
    state.cartCategoryList = cartCategoryList;
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
    foodItem.orderCount = count;
    const findCategory = state.cartCategoryList.find((item) => item.categoryID === foodItem.categoryID);
    if (findCategory) {
        const findFood = findCategory.foodList.find((item) => item.foodID === foodItem.foodID);
        if (!findFood) {
            findCategory.foodList.push(foodItem);
        }
    } else {
        state.cartCategoryList.push({
            categoryID: foodItem.categoryID,
            categoryTabID: `id${foodItem.categoryID}`,
            categoryName: foodItem.categoryName,
            foodList: [foodItem],
        });
    }
    state.cartCategoryList.forEach((item) => {
        item.foodList = item.foodList.filter((foodItem) => {
            if (foodItem.orderCount > 0) {
                foodItem.foodItemAmount = toFixedToNumber(foodItem.price * foodItem.orderCount);
                return true;
            } else {
                foodItem.foodItemAmount = 0
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
