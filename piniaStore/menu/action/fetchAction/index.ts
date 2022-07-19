import getMenuList, { GetMenuListI } from "./getMenuList";
import getOrderKeyFoodList, { GetOrderKeyFoodListI } from "./getOrderKeyFoodList";
import simpleFetchAction, { SimpleFetchActionI } from "./simpleFetchAction";

export interface FetchActionI extends SimpleFetchActionI {
    getMenuList: GetMenuListI;
    getOrderKeyFoodList: GetOrderKeyFoodListI;
}
const fetchAction: FetchActionI = {
    ...simpleFetchAction,
    getMenuList,
    getOrderKeyFoodList,
};
export default fetchAction;
