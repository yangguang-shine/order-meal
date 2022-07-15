import { OriginShopItemI } from "./home";
export interface PositionInfoI {
    left: number;
    top: number;
}

// categoryID: 1287
// categoryName: "用餐需知注意事项"
// description: "声明：因在调配和尝试过程中，发现各产品中的无糖口味及口感不适合大众所需，特此将所有产品中的无糖规格全部下架。如特别需要此规格产品的顾客，请您在购买时备注，我们将根据您的口味调配。对此给您带来的不便深表歉意。"
// foodID: 11833
// foodName: "【无糖】影响口感"
// imgUrl: "570102435528871.jpg"
// packPrice: 0
// price: 0
// reserveCount: 97
// unit: ""
export interface OriginFoodItemI {
    categoryID: number;
    categoryName: string;
    description: string;
    foodID: number;
    foodName: string;
    imgUrl: string;
    orderCount: number;
    price: number;
    shopID: number;
    unit: string;
    reserveCount: number;
    packPrice: number;
    specification: string;
}

export interface OriginOrderFoodItemI extends OriginFoodItemI {
    orderSpecifaListJSON: string
}

export interface CategoryListMapI {
    // [index: number]: CategoryItemI
    [index: string]: CategoryItemI;
}
export interface FoodListMapI {
    [index: string]: FoodItemI;
}
export interface CollectFoodListMapI {
    [index: string]: FoodItemI[];
}
export interface CollectFoodKeyObjI {
    key: string;
    title: string;
}
export interface CollectFoodListItemI extends CollectFoodKeyObjI {
    foodList: FoodItemI[];
}

export interface OriginCategoryItemI {
    categoryID: number;
    categoryName: string;
    required: number;
}

// export interface OriginCategoryItemI1 {
//     categoryID: number;
//     categoryName: string;
//     foodList: OriginFoodItemI[];
// }
export interface specificationItemI {
    name: string;
    categoryList: {
        content: string;
        price: number;
    }[];
}
export interface OrderSpecifaItemI{
    specifa: {
        index: number,
        content: string,
        price: number
    }[],
    key: string,
    orderCount: number,
    price: number,
    currentPrice: number,
    addPrice: number
    allCountPrice: number
}
export interface FoodItemI extends OriginFoodItemI {
    currentImg: string;
    fullImgPath: string;
    defaultImg: string;
    foodItemAmount: number;
    showReserveCountFlag: boolean;
    orderCount: number;
    specificationList: specificationItemI[];
    orderSpecifaList: OrderSpecifaItemI[]
    specificationSlectedIndexList: number[]
    orderSpecifaListJSON?: string

}

export interface CategoryItemI extends OriginCategoryItemI {
    categoryIDMain: string;
    categoryIDAside: string;
    foodList: FoodItemI[];
    foodListMap: FoodListMapI
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
    orderCount: 0,
    price: 0,
    shopID: 0,
    unit: "",
    reserveCount: 0,
    packPrice: 0,
    currentImg: "",
    fullImgPath: "",
    defaultImg: "",
    foodItemAmount: 0,
    showReserveCountFlag: false,
    specificationList: [],
    orderSpecifaList: [],
    specification: '[]',
    specificationSlectedIndexList: []
};
