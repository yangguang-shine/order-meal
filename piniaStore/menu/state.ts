import { ref, reactive } from "vue";

import { ShopItemI, CategoryItemI, FoodItemI, AsideCategoryItemI, initFoodItem, PositionInfoI, CategoryListMapI, FoodListMapI, initShopItem } from "@/interface/index";

export interface MenuDefaultI {
    categoryList: CategoryItemI[];
    categoryListMap: CategoryListMapI;
    // asideCategoryList: AsideCategoryItemI[]
    selectedCategoryID: number;
    categoryIDMain: string;
    categoryIDAside: string;
    topBarInfo: string;
    startShopInfoAnimationFlag: boolean;
    shopInfoFlag: boolean;
    menuPackPriceExpalinFlag: boolean;
    cartDetailFlag: boolean;
    foodDetailFalg: boolean;
    foodInfo: FoodItemI;
    cartImgPositionInfo: PositionInfoI;
    cartImgAnimationFlag: boolean;
    searchFoodFlag: boolean;
    overReserveFoodList: FoodItemI[];
    overReserveFoodListMap: FoodListMapI;
    cartCategoryListMap: CategoryListMapI;
    shopInfo: ShopItemI;
    businessType: number;
}
export interface MenuStateI extends MenuDefaultI {
    cartCategoryList: CategoryItemI[];
}
export const menuDefault: MenuDefaultI = {
    categoryList: [],
    categoryListMap: {},
    selectedCategoryID: 0,
    categoryIDMain: "",
    categoryIDAside: "",
    topBarInfo: "点餐",
    startShopInfoAnimationFlag: false,
    shopInfoFlag: false,
    menuPackPriceExpalinFlag: false,
    cartDetailFlag: false,
    foodDetailFalg: false,
    foodInfo: initFoodItem,
    cartImgPositionInfo: {
        left: 0,
        top: 0,
    },
    cartImgAnimationFlag: false,
    searchFoodFlag: false,
    overReserveFoodList: [],
    overReserveFoodListMap: {},
    cartCategoryListMap: {},
    shopInfo: initShopItem,
    businessType: 2,
};

const menuState: MenuStateI = reactive({
    ...menuDefault,
    cartCategoryList: [],
});

export default menuState;
