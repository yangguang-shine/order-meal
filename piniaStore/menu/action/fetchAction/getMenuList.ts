import fetch from "@/utils/fetch";
import { defaultFoodImg, foodImgPath } from "@/config/index";
import { OriginCategoryItemI, CategoryItemI, FoodItemI, OriginFoodItemI, FoodListMapI, CategoryListMapI, StateI, initFoodItem, PositionInfoI, ShopItemI, CollectFoodListMapI, CollectFoodKeyObjI, OriginShopItemI, OriginOrderFoodItemI } from "@/interface/index";

import menuState from "../../state";

export type GetMenuListI = () => Promise<void>;

const getMenuList: GetMenuListI = async function () {
    // 初始化会出现页面返回再次进入数据混乱问题
    menuState.categoryList = [];
    const resMenu: {
        categoryList: OriginCategoryItemI[];
        foodList: OriginFoodItemI[];
    } = await fetch("shop/menu", {
        shopID: menuState.shopInfo.shopID,
    });
    // 菜品分类map
    const categoryListMap: CategoryListMapI = {};
    const originCategoryMap: {
        [index: string]: OriginCategoryItemI;
    } = {};
    resMenu.categoryList.forEach((originCategoryItem) => {
        originCategoryMap[`${originCategoryItem.categoryID}`] = originCategoryItem;
    });
    const categoryList = (resMenu.foodList || []).reduce((list: CategoryItemI[], item) => {
        const specificationList = JSON.parse(item.specification || "[]");
        const foodItem: FoodItemI = {
            ...item,
            currentImg: defaultFoodImg,
            fullImgPath: `${foodImgPath}/${menuState.shopInfo.shopID}/${item.imgUrl}`,
            defaultImg: defaultFoodImg,
            foodItemAmount: 0,
            showReserveCountFlag: item.reserveCount < 10,
            orderCount: 0,
            specificationList,
            orderSpecifaList: [],
            specificationSlectedIndexList: specificationList.map(() => {
                return 0;
            }),
        };
        if (!list.length) {
            const categoryItem: CategoryItemI = {
                categoryID: foodItem.categoryID,
                categoryName: foodItem.categoryName,
                required: originCategoryMap[`${foodItem.categoryID}`].required,
                categoryIDMain: `main${foodItem.categoryID}`,
                categoryIDAside: `aside${foodItem.categoryID}`,
                foodList: [foodItem],
                foodListMap: {
                    [`${foodItem.foodID}`]: foodItem,
                },
            };
            list.push(categoryItem);
            categoryListMap[`${foodItem.categoryID}`] = categoryItem;
        } else {
            const findCategoryItem = categoryListMap[`${foodItem.categoryID}`];
            if (findCategoryItem) {
                findCategoryItem.foodList.push(foodItem);
                findCategoryItem.foodListMap[`${foodItem.foodID}`] = foodItem;
            } else {
                const categoryItem: CategoryItemI = {
                    categoryID: foodItem.categoryID,
                    categoryName: foodItem.categoryName,
                    required: originCategoryMap[`${foodItem.categoryID}`].required,
                    categoryIDMain: `main${foodItem.categoryID}`,
                    categoryIDAside: `aside${foodItem.categoryID}`,
                    foodList: [foodItem],
                    foodListMap: {
                        [`${foodItem.foodID}`]: foodItem,
                    },
                };
                list.push(categoryItem);
                categoryListMap[`${foodItem.categoryID}`] = categoryItem;
            }
        }
        return list;
    }, []);
    // 菜品分类排序
    categoryList.sort((a, b) => a.categoryID - b.categoryID);
    // 菜品排序以及获取必点项
    const requiredCategoryIDList: number[] = [];
    categoryList.forEach((categoryItem) => {
        if (categoryItem.required) {
            requiredCategoryIDList.push(categoryItem.categoryID);
        }
        categoryItem.foodList.sort((a, b) => a.foodID - b.foodID);
    });
    if (categoryList.length) {
        menuState.selectedCategoryID = categoryList[0].categoryID;
        menuState.categoryIDMain = "";
        menuState.categoryIDAside = "";
    }
    menuState.categoryList = categoryList;
    menuState.categoryListMap = categoryListMap;
    menuState.requiredCategoryIDList = requiredCategoryIDList;
};

export default getMenuList;
