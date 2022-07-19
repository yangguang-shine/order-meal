import { ref, reactive } from "vue";

import { ShopItemI, CategoryItemI, FoodItemI, AsideCategoryItemI, initFoodItem, PositionInfoI, CategoryListMapI, FoodListMapI, initShopItem, CollectFoodListMapI, CollectFoodKeyObjI, CollectFoodListItemI } from "@/interface/index";
import simple, { SimpleI } from "./simple";
import complex, { ComplexI } from "./complex";
import flag, { FlagI } from "./flag";
import heightPX, { HeightPXI } from "./heightPX";

export type MenuDefaultI = SimpleI & ComplexI & FlagI

export interface MenuStateI extends MenuDefaultI, HeightPXI {
    shopInfo: ShopItemI;
    cartCategoryList: CategoryItemI[];
}
export const menuDefault: MenuDefaultI = {
    ...simple,
    ...complex,
    ...flag,
    // 下面为什么没有报错
    // ...heightPX,
 
};

const menuState: MenuStateI = reactive({
    ...menuDefault,
    ...heightPX,
    shopInfo: initShopItem,
    cartCategoryList: [],
} as MenuStateI);

export default menuState;
