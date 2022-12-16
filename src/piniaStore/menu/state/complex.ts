import { CategoryItemI, CategoryListMapI, CollectFoodKeyObjI, CollectFoodListItemI, CollectFoodListMapI, FoodItemI, FoodItemTypeImgMapI, FoodListMapI, initFoodItem, PositionInfoI } from "@/interface/menu";

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
    foodItemVerticalImgMap: FoodItemTypeImgMapI
    foodItemHorizontalImgMap: FoodItemTypeImgMapI
    foodItemCartDetailImgMap: FoodItemTypeImgMapI
    foodItemCartSpecificaImgMap: FoodItemTypeImgMapI
    foodItemCollectFoodImgMap: FoodItemTypeImgMapI,
    foodItemSearchFoodImgMap: FoodItemTypeImgMapI
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
    foodItemVerticalImgMap: {},
    foodItemHorizontalImgMap: {},
    foodItemCartDetailImgMap: {},
    foodItemCartSpecificaImgMap: {},
    foodItemCollectFoodImgMap: {},
    foodItemSearchFoodImgMap: {}
}

const complex: ComplexI = complexDefault

export default complex
