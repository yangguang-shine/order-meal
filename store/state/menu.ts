
import { ShopItemI, CategoryItemI, FoodItemI, AsideCategoryItemI, initFoodItem, PositionInfoI } from "@/interface/index";

export interface StateMenuI {
    cartCategoryList: CategoryItemI[];
    categoryList: CategoryItemI[];
    // asideCategoryList: AsideCategoryItemI[]
    categoryTabID: string;
    scrollIntoCategoryTabID: string;
    topBarInfo: string;
    startShopInfoAnimationFlag: boolean,
    shopInfoFlag: boolean;
    cartDetailFlag: boolean;
    foodDetailFalg: boolean;
    foodInfo: FoodItemI;
    cartImgPositionInfo: PositionInfoI,
    cartImgAnimationFlag: boolean,
    searchFlag: boolean

}

const state: StateMenuI = {
    cartCategoryList: [],
    categoryList: [],
    // asideCategoryList: [],
    categoryTabID: "",
    scrollIntoCategoryTabID: "",
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
    searchFlag: false
};
export default state;
