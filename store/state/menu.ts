
import { ShopItemI, CategoryItemI, FoodItemI, AsideCategoryItemI } from "@/interface/index";

export interface StateMenuI {
    cartCategoryList: CategoryItemI[];
    categoryList: CategoryItemI[];
    // asideCategoryList: AsideCategoryItemI[]
    categoryTabID: string;
    scrollIntoCategoryTabID: string;
    topBarInfo: string;
    shopInfoFlag: boolean;
    cartDetailFlag: boolean;
    foodDetailFalg: boolean;
    foodInfo: FoodItemI;

}

const state: StateMenuI = {
    cartCategoryList: [],
    categoryList: [],
    // asideCategoryList: [],
    categoryTabID: "null",
    scrollIntoCategoryTabID: "",
    topBarInfo: "点餐",
    shopInfoFlag: false,
    cartDetailFlag: false,
    foodDetailFalg: false,
    foodInfo: {
        categoryID: 0,
        categoryName: 'string',
        description: '',
        foodID: 0,
        foodName: '',
        imgUrl: '',
        manageID: '',
        orderCount: 0,
        price: 0,
        shopID: 0,
        unit: '',
        fullImgPath: '',
        foodItemAmount: 0
    },
};
export default state;
