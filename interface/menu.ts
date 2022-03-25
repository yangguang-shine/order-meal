import { OriginShopInfoI } from "./home";

export interface OriginFoodItemI {
    categoryID: number;
    categoryName: string;
    description: string;
    foodID: number;
    foodName: string;
    imgUrl: string;
    manageID: string;
    orderCount: number;
    price: number;
    shopID: number;
    unit: string;
}
export interface FoodItemI extends OriginFoodItemI {
   fullImgPath: string,
   foodItemAmount: number
}

export interface OriginCategoryInfoI {
    categoryID: number,
    categoryName: string,
    foodList: OriginFoodItemI[]
}
export interface OrderCategoryInfoI extends OriginCategoryInfoI {
    foodList: FoodItemI[]
}


export interface CategoryInfoI extends OriginCategoryInfoI {
    categoryTabID: string,
    foodList: FoodItemI[]
}