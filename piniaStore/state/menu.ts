import { ShopItemI, CategoryItemI, FoodItemI, AsideCategoryItemI, initFoodItem, PositionInfoI, CategoryListMapI, FoodListMapI } from "@/interface/index";

export interface MenDefaultI {
    categoryList: CategoryItemI[];
    categoryListMap: CategoryListMapI,
    // asideCategoryList: AsideCategoryItemI[]
    selectedCategoryID: number;
    categoryIDMain: string;
    categoryIDAside: string;
    topBarInfo: string;
    startShopInfoAnimationFlag: boolean;
    shopInfoFlag: boolean;
    menuPackPriceExpalinFlag: boolean
    cartDetailFlag: boolean;
    foodDetailFalg: boolean;
    foodInfo: FoodItemI;
    cartImgPositionInfo: PositionInfoI;
    cartImgAnimationFlag: boolean;
    searchFoodFlag: boolean;
    overReserveFoodList: FoodItemI[],
    overReserveFoodListMap: FoodListMapI,
    cartCategoryListMap: CategoryListMapI
    // [key: string]: any
}
export interface StateMenuI extends MenDefaultI {
    cartCategoryList: CategoryItemI[];
}
export const menDefault: MenDefaultI = {
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

};

const state: StateMenuI = {
    ...menDefault,
    cartCategoryList: [],
};
export default state;
