import { MutationI, FoodItemI, StateI, CategoryItemI, initFoodItem, PositionInfoI, CategoryListMapI, FoodListMapI } from "@/interface/index";
import { timeStampTranslate, toFixedToNumber } from "@/utils/index";
import { menDefault, MenuDefaultI } from "../state/menu";
function setSelectedCategoryID(state: StateI, selectedCategoryID: number) {
    state.selectedCategoryID = selectedCategoryID;
}

function setCategoryIDMain(state: StateI, categoryIDMain: string) {
    state.categoryIDMain = categoryIDMain;
}

function setCategoryIDAside(state: StateI, categoryIDAside: string) {
    state.categoryIDAside = categoryIDAside;
}
function setCategoryList(state: StateI, categoryList: CategoryItemI[]) {
    state.categoryList = categoryList;
}

function setCategoryListMap(state: StateI, categoryListMap: CategoryListMapI) {
    state.categoryListMap = categoryListMap;
}

function setFoodInfo(state: StateI, foodInfo: FoodItemI = initFoodItem) {
    state.foodInfo = foodInfo;
}
function setFoodDetailFlag(state: StateI, foodDetailFalg: boolean) {
    state.foodDetailFalg = foodDetailFalg;
}
function setTopBarInfo(state: StateI, topBarInfo: string) {
    state.topBarInfo = topBarInfo;
}
function setStartShopInfoAnimationFlag(state: StateI, startShopInfoAnimationFlag: boolean) {
    state.startShopInfoAnimationFlag = startShopInfoAnimationFlag;
}

function setShopInfoFlag(state: StateI, shopInfoFlag: boolean) {
    state.shopInfoFlag = shopInfoFlag;
}
function setCartImgAnimationFlag(state: StateI, cartImgAnimationFlag: boolean) {
    state.cartImgAnimationFlag = cartImgAnimationFlag;
}
function setSearchFoodFlag(state: StateI, searchFoodFlag: boolean) {
    state.searchFoodFlag = searchFoodFlag;
}

function setCartImgPositionInfo(state: StateI, positionInfo: PositionInfoI) {
    state.cartImgPositionInfo = positionInfo;
}
function toogleCartDetailFlag(state: StateI) {
    state.cartDetailFlag = !state.cartDetailFlag;
}
function setCartDetailFlag(state: StateI, cartDetailFlag: boolean) {
    state.cartDetailFlag = cartDetailFlag;
}
function setCartCategoryList(state: StateI, cartCategoryList: CategoryItemI[]) {
    state.cartCategoryList = cartCategoryList;
}

function setCartCategoryListMap(state: StateI, cartCategoryListMap: CategoryListMapI) {
    state.cartCategoryListMap = cartCategoryListMap;
}

function setOverReserveFoodList(state: StateI, overReserveFoodList: FoodItemI[]) {
    state.overReserveFoodList = overReserveFoodList;
}

function setOverReserveFoodListMap(state: StateI, overReserveFoodListMap: FoodListMapI) {
    state.overReserveFoodListMap = overReserveFoodListMap;
}

function clearCart(state: StateI, payload: any) {
    state.cartCategoryList.forEach((categoryTtem) => {
        categoryTtem.foodList.forEach((foodItem) => {
            foodItem.orderCount = 0;
        });
    });
    // 清空数组
    state.cartCategoryList = [];
    state.cartCategoryListMap = {}
    // uni.removeStorageSync(`storageFoodList_${state.shopInfo.shopID}`)
}
// 菜品变动核心，只有此时cartCategoryListMap才会进行正确的变化
function cartChange(state: StateI, { foodItem, count = 0 }: { foodItem: FoodItemI; count: number }) {
    foodItem.orderCount = count;
    foodItem.foodItemAmount = toFixedToNumber(foodItem.price * foodItem.orderCount);
    const stateCartCategoryItem = state.cartCategoryListMap[`${foodItem.categoryID}`];
    if (stateCartCategoryItem) {
        const stateCartFoodItem = stateCartCategoryItem.foodListMap[`${foodItem.foodID}`];
        if (stateCartFoodItem) {
            if (count === 0) {
                delete stateCartCategoryItem.foodListMap[`${foodItem.foodID}`];
            }
        } else {
            stateCartCategoryItem.foodListMap[`${foodItem.foodID}`] = foodItem;
        }
    } else {
        const cartCategoryItem: CategoryItemI = {
            categoryID: foodItem.categoryID,
            categoryIDMain: `main${foodItem.categoryID}`,
            categoryIDAside: `aside${foodItem.categoryID}`,
            categoryName: foodItem.categoryName,
            foodList: [foodItem],
            foodListMap: {
                [foodItem.foodID]: foodItem,
            },
        };
        state.cartCategoryListMap[`${foodItem.categoryID}`] = cartCategoryItem;
    }

    const cartCategoryList: CategoryItemI[] = [];
    Object.keys(state.cartCategoryListMap)
        .sort((a, b) => {
            return Number(a) - Number(b);
        })
        .forEach((categoryID: string): void => {
            const categoryItem: CategoryItemI = state.cartCategoryListMap[categoryID];
            const keys = Object.keys(categoryItem.foodListMap).sort((a, b) => Number(a) - Number(b));
            const foodList = keys.map((item) => {
                return categoryItem.foodListMap[item];
            });
            categoryItem.foodList = foodList;
            if (foodList.length > 0) {
                cartCategoryList.push(categoryItem);
            }
            // return state.cartCategoryListMap[categoryID]
        });
    console.log(cartCategoryList);
    state.cartCategoryList = cartCategoryList;
}

function initCart(state: StateI, payload: any) {
    const cartCategoryListOrigin = state.cartCategoryList;
    state.cartCategoryList = [];
    state.cartCategoryListMap = {}
    cartCategoryListOrigin.forEach((cartCategoryItem) => {
        const stateCategoryItem = state.categoryListMap[`${cartCategoryItem.categoryID}`];
        if (stateCategoryItem) {
            cartCategoryItem.foodList.forEach((cartFoodItem) => {
                const stateFoodItem = stateCategoryItem.foodListMap[`${cartFoodItem.foodID}`];
                if (stateFoodItem) {
                    if (cartFoodItem.orderCount > stateFoodItem.reserveCount) {
                        // 超出库存
                        const stateOverResetveFoodItem = state.overReserveFoodListMap[`${cartFoodItem.foodID}`]
                        if (!stateOverResetveFoodItem) {
                            state.overReserveFoodListMap[`${cartFoodItem.foodID}`] = cartFoodItem;
                            state.overReserveFoodList.push(cartFoodItem);
                        }
                    } else if (cartFoodItem.orderCount > 0) {
                        cartChange(state, {
                            foodItem: stateFoodItem,
                            count: cartFoodItem.orderCount,
                        });
                    }
                }
            });
        }
    });
}

function setShopInfoMode(state: StateI, mode: "vertical" | "horizontal") {
    state.shopInfo.mode = mode;
}
function setMenuPackPriceExpalinFlag(state: StateI, menuPackPriceExpalinFlag: boolean) {
    state.menuPackPriceExpalinFlag = menuPackPriceExpalinFlag;
}

function handleMenuUnload(state: StateI) {
    Object.keys(menDefault).forEach((key) => {
        state[key] = menDefault[key];
    });

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
}

export default {
    setSelectedCategoryID,
    setCategoryIDMain,
    setCategoryIDAside,
    setCategoryList,
    setCategoryListMap,
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
    setCartCategoryListMap,
    setOverReserveFoodList,
    setOverReserveFoodListMap,
    clearCart,
    cartChange,
    initCart,
    setShopInfoMode,
    setMenuPackPriceExpalinFlag,
    handleMenuUnload,
} as MutationI;
