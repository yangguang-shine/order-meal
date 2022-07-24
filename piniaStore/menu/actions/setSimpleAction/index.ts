import { CategoryItemI, FoodItemI, FoodListMapI, CategoryListMapI, initFoodItem, PositionInfoI, ShopItemI, OriginShopItemI } from "@/interface/index";

import { menuDefault, MenuDefaultI } from "../../state";
import menuState from "../../state";
import getBusinessTypeInfo from "@/utils/getBusinessTypeInfo";
import fetch from "@/utils/fetch";
import { shopImgPath } from "@/config/index";
export function setShopInfo(shopInfo: ShopItemI): void {
    console.log(menuState.shopInfo.shopID);
    console.log(shopInfo.shopID);
    // 防止不同店铺进行多次初始化
    if (menuState.shopInfo.shopID !== shopInfo.shopID) {
        clearCart();
    }
    menuState.shopInfo = shopInfo;
}

export function setBusinessType(type: number): void {
    menuState.businessType = type;
}
export function setSelectedCategoryID(selectedCategoryID: number) {
    menuState.selectedCategoryID = selectedCategoryID;
}

export function setCategoryIDMain(categoryIDMain: string) {
    menuState.categoryIDMain = categoryIDMain;
}

export function setCategoryIDAside(categoryIDAside: string) {
    menuState.categoryIDAside = categoryIDAside;
}
export function setCategoryList(categoryList: CategoryItemI[]) {
    menuState.categoryList = categoryList;
}

export function setCategoryListMap(categoryListMap: CategoryListMapI) {
    menuState.categoryListMap = categoryListMap;
}

export function setFoodInfo(foodInfo: FoodItemI = initFoodItem) {
    menuState.foodInfo = foodInfo;
}

export function setTopBarInfo(topBarInfo: string) {
    menuState.topBarInfo = topBarInfo;
}

export function setCartCategoryList(cartCategoryList: CategoryItemI[]) {
    menuState.cartCategoryList = cartCategoryList;
}

export function setCartCategoryListMap(cartCategoryListMap: CategoryListMapI) {
    menuState.cartCategoryListMap = cartCategoryListMap;
}

export function setOverReserveFoodList(overReserveFoodList: FoodItemI[]) {
    menuState.overReserveFoodList = overReserveFoodList;
}

export function setOverReserveFoodListMap(overReserveFoodListMap: FoodListMapI) {
    menuState.overReserveFoodListMap = overReserveFoodListMap;
}

export function clearCart() {
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

export function setShopInfoMode(mode: "vertical" | "horizontal") {
    menuState.shopInfo.mode = mode;
}

export function setMenuDefault() {
    Object.keys(menuDefault).forEach((key) => {
        menuState[key] = menuDefault[key];
    });
}

export function setScrollToViewCategory(categoryID: number) {
    menuState.categoryIDMain = `main${categoryID}`;
}
export function setFoodSpecificationInfo(foodInfo: FoodItemI) {
    menuState.foodSpecificationInfo = foodInfo;
}
export function setFooterInfoCurrentInstance(footerInfoCurrentInstance: any) {
    menuState.footerInfoCurrentInstance = footerInfoCurrentInstance;
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
    setCartCategoryList: (cartCategoryList: CategoryItemI[]) => void;
    setCartCategoryListMap: (cartCategoryListMap: CategoryListMapI) => void;
    setOverReserveFoodList: (overReserveFoodList: FoodItemI[]) => void;
    setOverReserveFoodListMap: (overReserveFoodListMap: FoodListMapI) => void;
    clearCart: () => void;
    setShopInfoMode: (mode: "vertical" | "horizontal") => void;
    setMenuDefault: () => void;
    setScrollToViewCategory: (categoryID: number) => void;
    setFoodSpecificationInfo: (foodInfo: FoodItemI) => void;
    setFooterInfoCurrentInstance: (footerInfoCurrentInstance: any) => void
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
    setCartCategoryList,
    setCartCategoryListMap,
    setOverReserveFoodList,
    setOverReserveFoodListMap,
    clearCart,
    setShopInfoMode,
    setMenuDefault,
    setScrollToViewCategory,
    setFoodSpecificationInfo,
    setFooterInfoCurrentInstance
};
export default setSimpleAction;
