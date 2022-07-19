import { CategoryItemI, CategoryListMapI, CollectFoodKeyObjI, CollectFoodListItemI, CollectFoodListMapI, FoodItemI, FoodListMapI, initFoodItem, PositionInfoI } from "@/interface/menu";

export interface ComplexI {
    categoryList: CategoryItemI[];
    categoryListMap: CategoryListMapI;
    foodInfo: FoodItemI;
    foodSpecificationInfo: FoodItemI;
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
    overReserveFoodList: [],
    overReserveFoodListMap: {},
    cartCategoryListMap: {},
    collectFoodListMap: {},
    collectFoodList: [],
    collectFoodListKeys: [],
}

const complex: ComplexI = complexDefault

export default complex
