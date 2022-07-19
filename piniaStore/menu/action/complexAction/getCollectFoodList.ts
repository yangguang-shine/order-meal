import { CollectFoodListMapI, CollectFoodKeyObjI, FoodItemI, CollectFoodListItemI } from "@/interface/menu";
import menuState from "../../state";
export type GetCollectFoodListI = () => void
export const getCollectFoodList: GetCollectFoodListI = function() {
    // 计算一次之后缓存，不在计算
    if (menuState.collectFoodList.length) {
        return;
    } 
    const categoryList = menuState.categoryList;
    const collectFoodListKeys: CollectFoodKeyObjI[] = [
        {
            key: "0~5",
            title: "5元以下",
        },
        {
            key: "5~10",
            title: "5元~10元",
        },
        {
            key: "10~20",
            title: "10元~20元",
        },
        {
            key: "20<",
            title: "20元以上",
        },
    ];
    // const collectFoodListMap: CollectFoodListMapI = {
    //     "0~5": [],
    //     "5~10": [],
    //     "10~20": [],
    //     "20<": [],
    // };
    // collectFoodListMap 初始值
    const collectFoodListMap: CollectFoodListMapI = getCollectFoodListMapDefault(collectFoodListKeys);
    categoryList.forEach((categoryItem) => {
        categoryItem.foodList.forEach((foodItem) => {
            getCollectFoodItemToMap(collectFoodListMap, foodItem);
        });
    });
    // 菜品价格排序后的总列表
    const collectFoodList: CollectFoodListItemI[] = getSortCollectFoodList(collectFoodListMap, collectFoodListKeys);
    // 凑单弹框使用使用
    menuState.collectFoodListMap = collectFoodListMap;
    menuState.collectFoodList = collectFoodList;
    menuState.collectFoodListKeys = collectFoodListKeys;

}
function getCollectFoodListMapDefault(collectFoodListKeys: CollectFoodKeyObjI[]): CollectFoodListMapI {
    const collectFoodListMap: CollectFoodListMapI = {};
    collectFoodListKeys.forEach((item) => {
        collectFoodListMap[`${item.key}`] = [];
    });
    return collectFoodListMap;
}

function getCollectFoodItemToMap(collectFoodListMap: CollectFoodListMapI, foodItem: FoodItemI): void {
    if (foodItem.price < 5) {
        collectFoodListMap[`0~5`].push(foodItem);
    } else if (5 <= foodItem.price && foodItem.price < 10) {
        collectFoodListMap[`5~10`].push(foodItem);
    } else if (10 <= foodItem.price && foodItem.price <= 20) {
        collectFoodListMap[`10~20`].push(foodItem);
    } else if (20 < foodItem.price) {
        collectFoodListMap[`20<`].push(foodItem);
    }
}
function getSortCollectFoodList(collectFoodListMap: CollectFoodListMapI,collectFoodListKeys: CollectFoodKeyObjI[] ): CollectFoodListItemI[] {
    const collectFoodList: CollectFoodListItemI[] = [];

    collectFoodListKeys.forEach((keyItem) => {
        collectFoodListMap[`${keyItem.key}`].sort((a, b) => a.price - b.price);
        collectFoodList.push({
            ...keyItem,
            foodList: collectFoodListMap[`${keyItem.key}`],
        });
    })
    return collectFoodList;
}
export default getCollectFoodList

