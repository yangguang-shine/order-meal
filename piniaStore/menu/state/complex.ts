import { CategoryItemI, CategoryListMapI, CollectFoodKeyObjI, CollectFoodListItemI, CollectFoodListMapI, FoodItemI, FoodListMapI, initFoodItem, PositionInfoI } from "@/interface/menu";

export interface ComplexI {
    categoryList: CategoryItemI[];
    categoryListMap: CategoryListMapI;
    foodInfo: FoodItemI;
    foodSpecificationInfo: FoodItemI;
    cartImgPositionInfo: PositionInfoI;
    overReserveFoodList: FoodItemI[];
    overReserveFoodListMap: FoodListMapI;
    cartCategoryListMap: CategoryListMapI;
    collectFoodListMap: CollectFoodListMapI;
    collectFoodList: CollectFoodListItemI[];
    collectFoodListKeys: CollectFoodKeyObjI[];
}



const complexDefault: ComplexI = {
    categoryList: [],
    categoryListMap: {},
    foodInfo: initFoodItem,
    foodSpecificationInfo: initFoodItem,
    cartImgPositionInfo: {
        left: 0,
        top: 0,
    },
    overReserveFoodList: [],
    overReserveFoodListMap: {},
    cartCategoryListMap: {},
    collectFoodListMap: {},
    collectFoodList: [],
    collectFoodListKeys: [],
}

const complex: ComplexI = complexDefault

export default complex
