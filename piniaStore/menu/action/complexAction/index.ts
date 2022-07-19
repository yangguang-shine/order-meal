import cartChange, { CartChangeI } from "./cartChange";
import getCollectFoodList, { GetCollectFoodListI } from "./getCollectFoodList";
import initCart, { InitCartI } from "./initCart";
export interface ComplexActionI {
    getCollectFoodList: GetCollectFoodListI;
    initCart: InitCartI;
    cartChange: CartChangeI;
}

const complexAction: ComplexActionI = {
    getCollectFoodList,
    initCart,
    cartChange,
};
export default complexAction
