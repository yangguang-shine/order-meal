
import { ShopItemI, CategoryItemI, FoodItemI, AsideCategoryItemI, initFoodItem, PositionInfoI } from "@/interface/index";

export interface StateMenuI {
    cartCategoryList: CategoryItemI[];
    categoryList: CategoryItemI[];
    // asideCategoryList: AsideCategoryItemI[]
    selectedCategoryID: number;
    categoryIDMain: string;
    categoryIDAside: string
    topBarInfo: string;
    startShopInfoAnimationFlag: boolean,
    shopInfoFlag: boolean;
    cartDetailFlag: boolean;
    foodDetailFalg: boolean;
    foodInfo: FoodItemI;
    cartImgPositionInfo: PositionInfoI,
    cartImgAnimationFlag: boolean,
    searchFoodFlag: boolean

}

const state: StateMenuI = {
    cartCategoryList: [],
    categoryList: [],
    // asideCategoryList: [],
    selectedCategoryID: "",
    categoryIDMain: "",
    categoryIDAside: '',
    topBarInfo: "点餐",
    startShopInfoAnimationFlag: false,
    shopInfoFlag: false,
    cartDetailFlag: false,
    foodDetailFalg: false,
    foodInfo:initFoodItem,
    cartImgPositionInfo: {
        left:  0,
        top : 0
    },
    cartImgAnimationFlag: false,
    searchFoodFlag: false
};
export default state;
