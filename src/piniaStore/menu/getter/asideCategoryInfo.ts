import { RefI } from "@/interface/vueInterface";
import { toFixedToNumber } from "@/utils/";
import { computed } from "vue";
import menuState from "../state";

export interface AsideCategoryInfoI {
    asideCategoryList: AsideCategoryItemI[];
    asideCategoryItemOrderCountMap: AsideCategoryItemOrderCountMapI;
}
interface AsideCategoryItemOrderCountMapI {
    [index: string]: number;
}
/**
 * @interface AsideCategoryItemI
 * @params categoryName - 分类名称
 * @params categoryID - 分类ID
 * @params categoryOrderCount - 分类总下单数
 * @params categoryIDMain - 分类垂直滑动时需要的id
 * @params categoryIDAside - 分类水平时需要的id
 */
export interface AsideCategoryItemI {
    categoryName: string;
    categoryID: number;
    categoryOrderCount: number;
    categoryIDMain: string;
    categoryIDAside: string;
}




const asideCategoryInfo: RefI<AsideCategoryInfoI> = computed(() => {
    const asideCategoryItemOrderCountMap: AsideCategoryItemOrderCountMapI= {};
    const asideCategoryList = menuState.categoryList.map((categotyItem) => {
        // const stateCartCartgoryItem = menuState.cartCategoryList.find((cartFoodItem) => cartFoodItem.categoryID === categotyItem.categoryID);
        const stateCartCartgoryItem = menuState.cartCategoryListMap[`${categotyItem.categoryID}`];
        const categoryOrderCount = stateCartCartgoryItem ? stateCartCartgoryItem.foodList.reduce((all: number, item): number => {
            all += item.orderCount;
            return all;
        }, 0) : 0;
        asideCategoryItemOrderCountMap[`${categotyItem.categoryID}`] = categoryOrderCount
        return {
            categoryName: categotyItem.categoryName,
            categoryID: categotyItem.categoryID,
            categoryOrderCount,
            categoryIDMain: `main${categotyItem.categoryID}`,
            categoryIDAside: `aside${categotyItem.categoryID}`,
        };
    });
    return {
        asideCategoryList,
        asideCategoryItemOrderCountMap
    };
});

export default asideCategoryInfo;
