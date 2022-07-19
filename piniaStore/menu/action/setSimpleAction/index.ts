import { CategoryItemI, FoodItemI, FoodListMapI, CategoryListMapI, initFoodItem, PositionInfoI, ShopItemI, OriginShopItemI } from "@/interface/index";

import { menuDefault, MenuDefaultI } from "../../state";
import menuState from "../../state";
import getBusinessTypeInfo from "@/utils/getBusinessTypeInfo";
import fetch from "@/utils/fetch";
import { shopImgPath } from "@/config/index";
function setShopInfo(shopInfo: ShopItemI): void {
    console.log(menuState.shopInfo.shopID);
    console.log(shopInfo.shopID);
    // 防止不同店铺进行多次初始化
    if (menuState.shopInfo.shopID !== shopInfo.shopID) {
        clearCart();
    }
    menuState.shopInfo = shopInfo;
}

function setBusinessType(type: number): void {
    menuState.businessType = type;
}
function setSelectedCategoryID(selectedCategoryID: number) {
    menuState.selectedCategoryID = selectedCategoryID;
}

function setCategoryIDMain(categoryIDMain: string) {
    menuState.categoryIDMain = categoryIDMain;
}

function setCategoryIDAside(categoryIDAside: string) {
    menuState.categoryIDAside = categoryIDAside;
}
function setCategoryList(categoryList: CategoryItemI[]) {
    menuState.categoryList = categoryList;
}

function setCategoryListMap(categoryListMap: CategoryListMapI) {
    menuState.categoryListMap = categoryListMap;
}

function setFoodInfo(foodInfo: FoodItemI = initFoodItem) {
    menuState.foodInfo = foodInfo;
}

function setTopBarInfo(topBarInfo: string) {
    menuState.topBarInfo = topBarInfo;
}

function setCartImgPositionInfo(positionInfo: PositionInfoI) {
    menuState.cartImgPositionInfo = positionInfo;
}

function setCartCategoryList(cartCategoryList: CategoryItemI[]) {
    menuState.cartCategoryList = cartCategoryList;
}

function setCartCategoryListMap(cartCategoryListMap: CategoryListMapI) {
    menuState.cartCategoryListMap = cartCategoryListMap;
}

function setOverReserveFoodList(overReserveFoodList: FoodItemI[]) {
    menuState.overReserveFoodList = overReserveFoodList;
}

function setOverReserveFoodListMap(overReserveFoodListMap: FoodListMapI) {
    menuState.overReserveFoodListMap = overReserveFoodListMap;
}

function clearCart() {
    menuState.cartCategoryList.forEach((categoryTtem) => {
        categoryTtem.foodList.forEach((foodItem: FoodItemI) => {
            foodItem.orderCount = 0;
            foodItem.foodItemAmount = 0;
            foodItem.orderSpecifaList = [];
            foodItem.specificationSlectedIndexList = foodItem.specificationList.map(() => 0);
        });
    });
    // 清空数组
    menuState.cartCategoryList = [];
    menuState.cartCategoryListMap = {};
    // uni.removeStorageSync(`storageFoodList_${menuState.shopInfo.shopID}`)
}

function setShopInfoMode(mode: "vertical" | "horizontal") {
    menuState.shopInfo.mode = mode;
}

function setMenuDefault() {
    Object.keys(menuDefault).forEach((key) => {
        menuState[key] = menuDefault[key];
    });
}

function setScrollToViewCategory(categoryID: number) {
    menuState.categoryIDMain = `main${categoryID}`;
}
function setFoodSpecificationInfo(foodInfo: FoodItemI) {
    menuState.foodSpecificationInfo = foodInfo;
}



export interface SetSimpleActionI {
    setShopInfo: (shopInfo: ShopItemI) => void;
    setBusinessType: (type: number) => void;
    setSelectedCategoryID: (selectedCategoryID: number) => void;
    setCategoryIDMain: (categoryIDMain: string) => void;
    setCategoryIDAside: (categoryIDAside: string) => void;
    setCategoryList: (categoryList: CategoryItemI[]) => void;
    setCategoryListMap: (categoryListMap: CategoryListMapI) => void;
    setFoodInfo: (foodInfo: FoodItemI) => void;
    setTopBarInfo: (topBarInfo: string) => void;
    setCartImgPositionInfo: (positionInfo: PositionInfoI) => void;
    setCartCategoryList: (cartCategoryList: CategoryItemI[]) => void;
    setCartCategoryListMap: (cartCategoryListMap: CategoryListMapI) => void;
    setOverReserveFoodList: (overReserveFoodList: FoodItemI[]) => void;
    setOverReserveFoodListMap: (overReserveFoodListMap: FoodListMapI) => void;
    clearCart: () => void;
    setShopInfoMode: (mode: "vertical" | "horizontal") => void;
    setMenuDefault: () => void;
    setScrollToViewCategory: (categoryID: number) => void;
    setFoodSpecificationInfo: (foodInfo: FoodItemI) => void;
}
const setSimpleAction: SetSimpleActionI = {
    setShopInfo,
    setBusinessType,
    setSelectedCategoryID,
    setCategoryIDMain,
    setCategoryIDAside,
    setCategoryList,
    setCategoryListMap,
    setFoodInfo,
    setTopBarInfo,
    setCartImgPositionInfo,
    setCartCategoryList,
    setCartCategoryListMap,
    setOverReserveFoodList,
    setOverReserveFoodListMap,
    clearCart,
    setShopInfoMode,
    setMenuDefault,
    setScrollToViewCategory,
    setFoodSpecificationInfo,
};
export default setSimpleAction;
