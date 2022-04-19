import { MutationI, FoodItemI,StateI , CategoryItemI, initFoodItem, PositionInfoI} from "@/interface/index";
import { timeStampTranslate, toFixedToNumber } from "@/utils/index";
import { menDefault, MenDefaultI } from "../state/menu";
function setSelectedCategoryID (state: StateI, selectedCategoryID: number) {
    state.selectedCategoryID = selectedCategoryID;
};


function setCategoryIDMain (state: StateI, categoryIDMain: string) {
    state.categoryIDMain = categoryIDMain;
};

function setCategoryIDAside (state: StateI, categoryIDAside: string) {
    state.categoryIDAside = categoryIDAside;
};
function setFoodCategoryList (state: StateI, categoryList: CategoryItemI[]) {
    state.categoryList = categoryList;
};
function setFoodInfo (state: StateI, foodInfo: FoodItemI = initFoodItem) {
    state.foodInfo = foodInfo;
};
function setFoodDetailFlag (state: StateI, foodDetailFalg: boolean) {
    state.foodDetailFalg = foodDetailFalg;
};
function setTopBarInfo (state: StateI, topBarInfo: string) {
    state.topBarInfo = topBarInfo;
};
function setStartShopInfoAnimationFlag (state: StateI, startShopInfoAnimationFlag: boolean) {
    state.startShopInfoAnimationFlag = startShopInfoAnimationFlag;
};

function setShopInfoFlag (state: StateI, shopInfoFlag: boolean) {
    state.shopInfoFlag = shopInfoFlag;
};
function setCartImgAnimationFlag (state: StateI, cartImgAnimationFlag: boolean) {
    state.cartImgAnimationFlag = cartImgAnimationFlag;
};
function setSearchFoodFlag (state: StateI, searchFoodFlag: boolean) {
    state.searchFoodFlag = searchFoodFlag;
};

function setCartImgPositionInfo (state: StateI, positionInfo: PositionInfoI) {
    state.cartImgPositionInfo = positionInfo;
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
            categoryIDMain: `main${foodItem.categoryID}`,
            categoryIDAside: `aside${foodItem.categoryID}`,
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


function setShopInfoMode (state: StateI, mode: 'vertical' | 'horizontal') {
    state.shopInfo.mode = mode;
};
function handleMenuUnload (state: StateI) {
    Object.keys(menDefault).forEach((key) => {
        state[key] = menDefault[key]
    })



    // cartCategoryList: [],
    // categoryList: [],
    // // asideCategoryList: [],
    // selectedCategoryID: 0,
    // categoryIDMain: "",
    // categoryIDAside: '',
    // topBarInfo: "点餐",
    // startShopInfoAnimationFlag: false,
    // shopInfoFlag: false,
    // cartDetailFlag: false,
    // foodDetailFalg: false,
    // foodInfo:initFoodItem,
    // cartImgPositionInfo: {
    //     left:  0,
    //     top : 0
    // },
    // cartImgAnimationFlag: false,
    // searchFoodFlag: false
};


export default {
    setSelectedCategoryID,
    setCategoryIDMain,
    setCategoryIDAside,
    setFoodCategoryList,
    setFoodInfo,
    setFoodDetailFlag,
    setTopBarInfo,
    setStartShopInfoAnimationFlag,
    setShopInfoFlag,
    setCartImgAnimationFlag,
    setSearchFoodFlag,
    setCartImgPositionInfo,
    toogleCartDetailFlag,
    setCartDetailFlag,
    setCartCategoryList,
    clearCart,
    cartChange,
    initCart,
    setShopInfoMode,
    handleMenuUnload
} as MutationI;
