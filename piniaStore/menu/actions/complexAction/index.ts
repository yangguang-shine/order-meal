import cartChange, { CartChangeI } from "./cartChange";
import getCollectFoodList, { GetCollectFoodListI } from "./getCollectFoodList";
import initCart, { InitCartI } from "./initCart";
import handleFoodCategoryListScroll, { HandleFoodCategoryListScrollI } from "./handleFoodCategoryListScroll";
import menuState from "../../state";

export type setFoodItemVerticalImgMapI = (foodID: number, currentInstance: any) => void
export type setFoodItemHorizontalImgMapI = (foodID: number, currentInstance: any) => void
export type setFoodItemCartDetailImgMapI = (foodID: number, currentInstance: any) => void
export type setFoodItemCartSpecificaImgMapI = (foodID: number, key: string, currentInstance: any)=> void
export type setFoodItemCollectFoodImgMapI = (foodID: number, currentInstance: any)=> void
export type setFoodItemSearchFoodImgMapI = (foodID: number, currentInstance: any)=> void


setFoodItemCollectFoodImgMap
export function setFoodItemVerticalImgMap(foodID: number, currentInstance: any) {
    menuState.foodItemVerticalImgMap[`${foodID}`] = currentInstance
}
export function setFoodItemHorizontalImgMap(foodID: number, currentInstance: any) {
    menuState.foodItemHorizontalImgMap[`${foodID}`] = currentInstance
}
export function setFoodItemCartDetailImgMap(foodID: number, currentInstance: any) {
    menuState.foodItemCartDetailImgMap[`${foodID}`] = currentInstance
}
export function setFoodItemCartSpecificaImgMap(foodID: number, key: string, currentInstance: any) {
    menuState.foodItemCartSpecificaImgMap[`${foodID}-${key}`] = currentInstance
}
export function setFoodItemCollectFoodImgMap(foodID: number, currentInstance: any) {
    menuState.foodItemCollectFoodImgMap[`${foodID}`] = currentInstance
}

export function setFoodItemSearchFoodImgMap(foodID: number, currentInstance: any) {
    menuState.foodItemSearchFoodImgMap[`${foodID}`] = currentInstance
}







export interface ComplexActionI {
    getCollectFoodList: GetCollectFoodListI;
    initCart: InitCartI;
    cartChange: CartChangeI;
    handleFoodCategoryListScroll: HandleFoodCategoryListScrollI,
    setFoodItemVerticalImgMap: setFoodItemVerticalImgMapI
    setFoodItemHorizontalImgMap: setFoodItemHorizontalImgMapI
    setFoodItemCartDetailImgMap: setFoodItemCartDetailImgMapI
    setFoodItemCartSpecificaImgMap: setFoodItemCartSpecificaImgMapI
    setFoodItemCollectFoodImgMap: setFoodItemCollectFoodImgMapI
    setFoodItemSearchFoodImgMap: setFoodItemSearchFoodImgMapI
}
const complexAction: ComplexActionI = {
    getCollectFoodList,
    initCart,
    cartChange,
    handleFoodCategoryListScroll,
    setFoodItemVerticalImgMap,
    setFoodItemHorizontalImgMap,
    setFoodItemCartDetailImgMap,
    setFoodItemCartSpecificaImgMap,
    setFoodItemCollectFoodImgMap,
    setFoodItemSearchFoodImgMap
};
export default complexAction
