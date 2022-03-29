import { OriginShopItemI } from "./home";

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

export interface OriginCategoryItemI {
    categoryID: number;
    categoryName: string;
    foodList: OriginFoodItemI[];
}
export interface FoodItemI extends OriginFoodItemI {
    fullImgPath: string;
    foodItemAmount: number;
}

export interface CategoryItemI extends OriginCategoryItemI {
    categoryTabID: string;
    foodList: FoodItemI[];
}
// export interface CartCategoryInfoI extends OriginCategoryItemI {
//     foodList: FoodItemI[];
// }
export interface AsideCategoryItemI {
    categoryName: string;
    categoryID: number;
    categoryOrderCount: number;
    categoryTabID: string;
}
