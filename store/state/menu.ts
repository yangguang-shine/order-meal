import { ShopItemI, CategoryItemI, FoodItemI, AsideCategoryItemI, initFoodItem, PositionInfoI } from "@/interface/index";

export interface MenDefaultI {
    categoryList: CategoryItemI[];
    // asideCategoryList: AsideCategoryItemI[]
    selectedCategoryID: number;
    categoryIDMain: string;
    categoryIDAside: string;
    topBarInfo: string;
    startShopInfoAnimationFlag: boolean;
    shopInfoFlag: boolean;
    cartDetailFlag: boolean;
    foodDetailFalg: boolean;
    foodInfo: FoodItemI;
    cartImgPositionInfo: PositionInfoI;
    cartImgAnimationFlag: boolean;
    searchFoodFlag: boolean;
    [key: string]: any
}
export interface StateMenuI extends MenDefaultI {
    cartCategoryList: CategoryItemI[];
}
export const menDefault: MenDefaultI = {
    categoryList: [],
    selectedCategoryID: 0,
    categoryIDMain: "",
    categoryIDAside: "",
    topBarInfo: "点餐",
    startShopInfoAnimationFlag: false,
    shopInfoFlag: false,
    cartDetailFlag: false,
    foodDetailFalg: false,
    foodInfo: initFoodItem,
    cartImgPositionInfo: {
        left: 0,
        top: 0,
    },
    cartImgAnimationFlag: false,
    searchFoodFlag: false,
};

const state: StateMenuI = {
    ...menDefault,
    cartCategoryList: [],

};
export default state;
