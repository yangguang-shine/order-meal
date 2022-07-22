import cartChange, { CartChangeI } from "./cartChange";
import getCollectFoodList, { GetCollectFoodListI } from "./getCollectFoodList";
import initCart, { InitCartI } from "./initCart";
import handleFoodCategoryListScroll, { HandleFoodCategoryListScrollI } from "./handleFoodCategoryListScroll";
export interface ComplexActionI {
    getCollectFoodList: GetCollectFoodListI;
    initCart: InitCartI;
    cartChange: CartChangeI;
    handleFoodCategoryListScroll: HandleFoodCategoryListScrollI
}

const complexAction: ComplexActionI = {
    getCollectFoodList,
    initCart,
    cartChange,
    handleFoodCategoryListScroll,
};
export default complexAction
