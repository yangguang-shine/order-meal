
import { ShopInfoI, CategoryInfoI, OrderCategoryInfoI, FoodItemI } from "@/interface/index";

export interface MenuStateI {
    cartCategoryList: OrderCategoryInfoI[];
    categoryList: CategoryInfoI[];
    categoryTabId: string;
    scrollIntoCategoryTabID: "";
    topBarInfo: string;
    shopInfoFlag: boolean;
    cartDetailFlag: boolean;
    foodDetailFalg: boolean;
    foodInfo: FoodItemI;

}

const state: MenuStateI = {
    cartCategoryList: [],
    categoryList: [],
    categoryTabId: "null",
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
