import { OriginShopItemI } from "./home";
export interface PositionInfoI {
    left: number,
    top: number
}
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
    reserveCount: number,
    packPrice: number
}

export interface OriginCategoryItemI {
    categoryID: number;
    categoryName: string;
    foodList: OriginFoodItemI[];
}
export interface FoodItemI extends OriginFoodItemI {
    fullImgPath: string;
    foodItemAmount: number;
    showReserveCountFlag: boolean
}

export interface CategoryItemI extends OriginCategoryItemI {
    categoryIDMain: string;
    categoryIDAside: string;
    foodList: FoodItemI[];
}
// export interface CartCategoryInfoI extends OriginCategoryItemI {
//     foodList: FoodItemI[];
// }
export interface AsideCategoryItemI {
    categoryName: string;
    categoryID: number;
    categoryOrderCount: number;
    selectedCategoryID: string;
}

export const initFoodItem: FoodItemI = {
    categoryID: 0,
    categoryName: "",
    description: "",
    foodID: 0,
    foodName: "",
    imgUrl: "",
    manageID: "",
    orderCount: 0,
    price: 0,
    shopID: 0,
    unit: "",
    reserveCount: 0,
    packPrice: 0,
    fullImgPath: "",
    foodItemAmount: 0,
    showReserveCountFlag: false
};
