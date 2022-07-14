import fetch from "@/utils/fetch";
import { defaultFoodImg, foodImgPath, shopImgPath } from "@/config/index";
import { OriginCategoryItemI, CategoryItemI, FoodItemI, OriginFoodItemI, FoodListMapI, CategoryListMapI, StateI, initFoodItem, PositionInfoI, ShopItemI, CollectFoodListMapI, CollectFoodKeyObjI, OriginShopItemI } from "@/interface/index";

import { toFixedToNumber } from "@/utils/index";
import { menuDefault, MenuDefaultI } from "./state";
import menuState from "./state";
import getBusinessTypeInfo from "@/utils/getBusinessTypeInfo";
import { getCollectFoodList } from "./handle";

function setShopInfo(shopInfo: ShopItemI): void {
    menuState.shopInfo = shopInfo;
}

function setBusinessType(type: number): void {
    menuState.businessType = type;
}
function setSelectedCategoryID(selectedCategoryID: number) {
    menuState.selectedCategoryID = selectedCategoryID;
}

function setCategoryIDMain(categoryIDMain: string) {
    menuState.categoryIDMain = categoryIDMain;
}

function setCategoryIDAside(categoryIDAside: string) {
    menuState.categoryIDAside = categoryIDAside;
}
function setCategoryList(categoryList: CategoryItemI[]) {
    menuState.categoryList = categoryList;
}

function setCategoryListMap(categoryListMap: CategoryListMapI) {
    menuState.categoryListMap = categoryListMap;
}

function setFoodInfo(foodInfo: FoodItemI = initFoodItem) {
    menuState.foodInfo = foodInfo;
}
function setFoodDetailFlag(foodDetailFalg: boolean) {
    menuState.foodDetailFalg = foodDetailFalg;
}
function setTopBarInfo(topBarInfo: string) {
    menuState.topBarInfo = topBarInfo;
}
function setStartShopInfoAnimationFlag(startShopInfoAnimationFlag: boolean) {
    menuState.startShopInfoAnimationFlag = startShopInfoAnimationFlag;
}

function setShopInfoFlag(shopInfoFlag: boolean) {
    menuState.shopInfoFlag = shopInfoFlag;
}
function setCartImgAnimationFlag(cartImgAnimationFlag: boolean) {
    menuState.cartImgAnimationFlag = cartImgAnimationFlag;
}
function setSearchFoodFlag(searchFoodFlag: boolean) {
    menuState.searchFoodFlag = searchFoodFlag;
}

function setCartImgPositionInfo(positionInfo: PositionInfoI) {
    menuState.cartImgPositionInfo = positionInfo;
}
function toogleCartDetailFlag() {
    if (menuState.collectFoodFlag) {
        menuState.showCollectClickCartImgFlag = true;
        return;
    }
    if (menuState.cartDetailFlag) {
        menuState.showCartClickCartImgFlag = true;
        return;
    }
    if (menuState.cartCategoryList.length > 0) {
        menuState.cartDetailFlag = !menuState.cartDetailFlag;
    } else {
        menuState.cartDetailFlag = false;
    }
}
function setCartDetailFlag(cartDetailFlag: boolean) {
    menuState.cartDetailFlag = cartDetailFlag;
}
function setCollectFoodFlag(collectFoodFlag: boolean) {
    getCollectFoodList();
    menuState.collectFoodFlag = collectFoodFlag;
}

function setCartCategoryList(cartCategoryList: CategoryItemI[]) {
    menuState.cartCategoryList = cartCategoryList;
}

function setCartCategoryListMap(cartCategoryListMap: CategoryListMapI) {
    menuState.cartCategoryListMap = cartCategoryListMap;
}

function setOverReserveFoodList(overReserveFoodList: FoodItemI[]) {
    menuState.overReserveFoodList = overReserveFoodList;
}

function setOverReserveFoodListMap(overReserveFoodListMap: FoodListMapI) {
    menuState.overReserveFoodListMap = overReserveFoodListMap;
}

function clearCart() {
    menuState.cartCategoryList.forEach((categoryTtem) => {
        categoryTtem.foodList.forEach((foodItem) => {
            foodItem.orderCount = 0;
        });
    });
    // 清空数组
    menuState.cartCategoryList = [];
    menuState.cartCategoryListMap = {};
    // uni.removeStorageSync(`storageFoodList_${menuState.shopInfo.shopID}`)
}

// specificationList: specificationItemI[];
// orderSpecifaList: {
//     [index: string]: {
//         specifa: [{
//             index: number,
//             value: string
//         }],
//         orderCount: number
//     }
// }[]
// orderSpecifaListMap: {
//     [index: string]: {
//         specifa: [{
//             index: number,
//             value: string
//         }],
//         orderCount: number
//     }
// },
// specificationSlectedIndexList: number[]
// 菜品变动核心，只有此时cartCategoryListMap才会进行正确的变化
interface CartChangeParamsI {
    foodItem: FoodItemI;
    count: number;
    type: "add" | "minus";
    specificationString?: string
}
function cartChange({ foodItem, count = 0, type = "add", specificationString = '' }: CartChangeParamsI) {
    // 存在规格时
    if (specificationString) {
        const findIndex = foodItem.orderSpecifaList.findIndex((item) => item.key === specificationString);
        if (findIndex > -1) {
            foodItem.orderSpecifaList[findIndex].orderCount = foodItem.orderSpecifaList[findIndex].orderCount + count;
            if (foodItem.orderSpecifaList[findIndex].orderCount <= 0) {
                foodItem.orderSpecifaList.splice(findIndex, 1);
                // 同种商品去掉一种规格种类时重置规格默认
                const length = foodItem.orderSpecifaList.length;
                if (length) {
                    foodItem.specificationSlectedIndexList = foodItem.orderSpecifaList[length - 1].specifa.map((item) => item.index);
                }
            }
        } else {
            if (type === "add") {
                foodItem.orderSpecifaList.push({
                    key: specificationString,
                    orderCount: count,
                    specifa: foodItem.specificationSlectedIndexList.map((item, index) => {
                        return {
                            index: item,
                            specificationDetail: foodItem.specificationList[index].categoryList[item].specificationDetail,
                            specificationPrice: foodItem.specificationList[index].categoryList[item].specificationPrice,
                        };
                    }),
                });
            } else {
                throw "type error " + type;
            }
        }
    }
    foodItem.orderCount = foodItem.orderCount + count;
    foodItem.orderSpecifaList;
    foodItem.foodItemAmount = toFixedToNumber(foodItem.price * foodItem.orderCount);
    const stateCartCategoryItem = menuState.cartCategoryListMap[`${foodItem.categoryID}`];
    if (stateCartCategoryItem) {
        const stateCartFoodItem = stateCartCategoryItem.foodListMap[`${foodItem.foodID}`];
        if (stateCartFoodItem) {
            if (foodItem.orderCount === 0) {
                delete stateCartCategoryItem.foodListMap[`${foodItem.foodID}`];
            }
        } else {
            stateCartCategoryItem.foodListMap[`${foodItem.foodID}`] = foodItem;
        }
    } else {
        const cartCategoryItem: CategoryItemI = {
            categoryID: foodItem.categoryID,
            categoryIDMain: `main${foodItem.categoryID}`,
            categoryIDAside: `aside${foodItem.categoryID}`,
            categoryName: foodItem.categoryName,
            foodList: [foodItem],
            foodListMap: {
                [foodItem.foodID]: foodItem,
            },
            required: menuState.categoryListMap[`${foodItem.categoryID}`].required,
        };
        menuState.cartCategoryListMap[`${foodItem.categoryID}`] = cartCategoryItem;
    }

    const cartCategoryList: CategoryItemI[] = [];
    Object.keys(menuState.cartCategoryListMap)
        .sort((a, b) => {
            return Number(a) - Number(b);
        })
        .forEach((categoryID: string): void => {
            const categoryItem: CategoryItemI = menuState.cartCategoryListMap[categoryID];
            const keys = Object.keys(categoryItem.foodListMap).sort((a, b) => Number(a) - Number(b));
            const foodList = keys.map((item) => {
                return categoryItem.foodListMap[item];
            });
            categoryItem.foodList = foodList;
            if (foodList.length > 0) {
                cartCategoryList.push(categoryItem);
            }
            // return menuState.cartCategoryListMap[categoryID]
        });
    menuState.cartCategoryList = cartCategoryList;
}

function initCart() {
    const cartCategoryListOrigin = menuState.cartCategoryList;
    menuState.cartCategoryList = [];
    menuState.cartCategoryListMap = {};
    cartCategoryListOrigin.forEach((cartCategoryItem) => {
        const stateCategoryItem = menuState.categoryListMap[`${cartCategoryItem.categoryID}`];
        if (stateCategoryItem) {
            cartCategoryItem.foodList.forEach((cartFoodItem) => {
                const stateFoodItem = stateCategoryItem.foodListMap[`${cartFoodItem.foodID}`];
                if (stateFoodItem) {
                    if (cartFoodItem.orderCount > stateFoodItem.reserveCount) {
                        // 超出库存
                        const stateOverResetveFoodItem = menuState.overReserveFoodListMap[`${cartFoodItem.foodID}`];
                        if (!stateOverResetveFoodItem) {
                            menuState.overReserveFoodListMap[`${cartFoodItem.foodID}`] = cartFoodItem;
                            menuState.overReserveFoodList.push(cartFoodItem);
                        }
                    } else if (cartFoodItem.orderCount > 0) {
                        cartChange({
                            foodItem: stateFoodItem,
                            count: cartFoodItem.orderCount,
                            type: "add",
                        });
                    }
                }
            });
        }
    });
}

function setShopInfoMode(mode: "vertical" | "horizontal") {
    menuState.shopInfo.mode = mode;
}
function setMenuPackPriceExpalinFlag(menuPackPriceExpalinFlag: boolean) {
    menuState.menuPackPriceExpalinFlag = menuPackPriceExpalinFlag;
}

function setMenuDefault() {
    Object.keys(menuDefault).forEach((key) => {
        menuState[key] = menuDefault[key];
    });
}

async function getShopInfo(payload: { shopID: number }): Promise<ShopItemI> {
    const originShopInfo: OriginShopItemI = await fetch("shop/find", payload);
    const shopInfo: ShopItemI = {
        ...originShopInfo,
        minusList: JSON.parse(originShopInfo.minus),
        fullImgPath: `${shopImgPath}/${originShopInfo.imgUrl}`,
        ...getBusinessTypeInfo(originShopInfo.businessTypes),
    };
    menuState.shopInfo = shopInfo;
    return shopInfo;
}

async function getMenuList() {
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
            orderSpecifaListMap: {},
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
}

async function getOrderKeyFoodList(option: { orderKey: String } = { orderKey: "" }) {
    const originFoodList: OriginFoodItemI[] = await fetch("order/foodList", {
        ...option,
    });
    const cartCategoryListMap: CategoryListMapI = {};
    const overReserveFoodList: FoodItemI[] = [];
    const overReserveFoodListMap: FoodListMapI = {};
    originFoodList.forEach((originFoodItem: OriginFoodItemI): void => {
        const foodItem: FoodItemI = {
            ...originFoodItem,
            currentImg: defaultFoodImg,
            fullImgPath: `${foodImgPath}/${menuState.shopInfo.shopID}/${originFoodItem.imgUrl}`,
            defaultImg: defaultFoodImg,
            foodItemAmount: toFixedToNumber(originFoodItem.price * originFoodItem.orderCount),
            showReserveCountFlag: originFoodItem.reserveCount < 10,
        };
        const stateCategoryItem: CategoryItemI = menuState.categoryListMap[`${foodItem.categoryID}`];
        if (stateCategoryItem) {
            const stateFoodItem: FoodItemI = stateCategoryItem.foodListMap[`${foodItem.foodID}`];
            if (stateFoodItem) {
                if (foodItem.orderCount > stateFoodItem.reserveCount) {
                    // 超出库存
                    overReserveFoodList.push(foodItem);
                    overReserveFoodListMap[`${foodItem.foodID}`] = foodItem;
                } else if (foodItem.orderCount > 0) {
                    let findCartCategoryItem = cartCategoryListMap[`${foodItem.categoryID}`];
                    if (findCartCategoryItem) {
                        // 购物车CategoryListMap 包含该 categoryID map
                        findCartCategoryItem.foodList.push(foodItem);
                        findCartCategoryItem.foodListMap[`${foodItem.foodID}`] = foodItem;
                    } else {
                        // 购物车CategoryListMap 不包含该 categoryID map
                        const categoryItem: CategoryItemI = {
                            categoryID: foodItem.categoryID,
                            categoryIDMain: `main${foodItem.categoryID}`,
                            categoryIDAside: `aside${foodItem.categoryID}`,
                            categoryName: foodItem.categoryName,
                            foodList: [foodItem],
                            foodListMap: {
                                [foodItem.foodID]: foodItem,
                            },
                            required: menuState.categoryListMap[`${foodItem.categoryID}`].required,
                        };
                        cartCategoryListMap[`${foodItem.categoryID}`] = categoryItem;
                    }
                }
            }
        }
    });

    const cartCategoryList = Object.keys(cartCategoryListMap)
        .sort((a, b) => {
            return Number(a) - Number(b);
        })
        .map((categoryID: string): CategoryItemI => {
            cartCategoryListMap[categoryID].foodList.sort((a, b) => a.foodID - b.foodID);
            return cartCategoryListMap[categoryID];
        });
    menuState.cartCategoryList = cartCategoryList;
    menuState.overReserveFoodList = overReserveFoodList;
    menuState.overReserveFoodListMap = overReserveFoodListMap;
    return cartCategoryList;
}

function setShowCartClickCartImgFlag(showCartClickCartImgFlag: boolean) {
    menuState.showCartClickCartImgFlag = showCartClickCartImgFlag;
}

function setShowCollectClickCartImgFlag(showCollectClickCartImgFlag: boolean) {
    menuState.showCollectClickCartImgFlag = showCollectClickCartImgFlag;
}
function setScrollToViewCategory(categoryID: number) {
    menuState.categoryIDMain = `main${categoryID}`;
}
function setFoodSpecificationInfo(foodInfo: FoodItemI) {
    menuState.foodSpecificationInfo = foodInfo;
}
function setFoodSpecificationFlag(foodSpecificationFlag: boolean) {
    menuState.foodSpecificationFlag = foodSpecificationFlag;
}

export interface MenuActionI {
    setShopInfo: (shopInfo: ShopItemI) => void;
    setBusinessType: (type: number) => void;
    setSelectedCategoryID: (selectedCategoryID: number) => void;
    setCategoryIDMain: (categoryIDMain: string) => void;
    setCategoryIDAside: (categoryIDAside: string) => void;
    setCategoryList: (categoryList: CategoryItemI[]) => void;
    setCategoryListMap: (categoryListMap: CategoryListMapI) => void;
    setFoodInfo: (foodInfo: FoodItemI) => void;
    setFoodDetailFlag: (foodDetailFalg: boolean) => void;
    setTopBarInfo: (topBarInfo: string) => void;
    setStartShopInfoAnimationFlag: (startShopInfoAnimationFlag: boolean) => void;
    setShopInfoFlag: (shopInfoFlag: boolean) => void;
    setCartImgAnimationFlag: (cartImgAnimationFlag: boolean) => void;
    setSearchFoodFlag: (searchFoodFlag: boolean) => void;
    setCartImgPositionInfo: (positionInfo: PositionInfoI) => void;
    toogleCartDetailFlag: () => void;
    setCartDetailFlag: (cartDetailFlag: boolean) => void;
    setCollectFoodFlag: (collectFoodFlag: boolean) => void;
    setCartCategoryList: (cartCategoryList: CategoryItemI[]) => void;
    setCartCategoryListMap: (cartCategoryListMap: CategoryListMapI) => void;
    setOverReserveFoodList: (overReserveFoodList: FoodItemI[]) => void;
    setOverReserveFoodListMap: (overReserveFoodListMap: FoodListMapI) => void;
    clearCart: () => void;
    cartChange: (payload: CartChangeParamsI) => void;
    initCart: () => void;
    setShopInfoMode: (mode: "vertical" | "horizontal") => void;
    setMenuPackPriceExpalinFlag: (menuPackPriceExpalinFlag: boolean) => void;
    setMenuDefault: () => void;
    getShopInfo: (payload: { shopID: number }) => Promise<ShopItemI>;
    getMenuList: () => void;
    getOrderKeyFoodList: (option: { orderKey: String }) => void;
    setShowCartClickCartImgFlag: (showCartClickCartImgFlag: boolean) => void;
    setShowCollectClickCartImgFlag: (showCollectClickCartImgFlag: boolean) => void;
    setScrollToViewCategory: (categoryID: number) => void;
    setFoodSpecificationInfo: (foodInfo: FoodItemI) => void;
    setFoodSpecificationFlag: (foodSpecificationFlag: boolean) => void;
}
const meunAction: MenuActionI = {
    setShopInfo,
    setBusinessType,
    setSelectedCategoryID,
    setCategoryIDMain,
    setCategoryIDAside,
    setCategoryList,
    setCategoryListMap,
    setFoodInfo,
    setFoodDetailFlag,
    setTopBarInfo,
    setStartShopInfoAnimationFlag,
    setShopInfoFlag,
    setCartImgAnimationFlag,
    setSearchFoodFlag,
    setCartImgPositionInfo,
    toogleCartDetailFlag,
    setCartDetailFlag,
    setCollectFoodFlag,
    setCartCategoryList,
    setCartCategoryListMap,
    setOverReserveFoodList,
    setOverReserveFoodListMap,
    clearCart,
    cartChange,
    initCart,
    setShopInfoMode,
    setMenuPackPriceExpalinFlag,
    setMenuDefault,
    getShopInfo,
    getMenuList,
    getOrderKeyFoodList,
    setShowCartClickCartImgFlag,
    setShowCollectClickCartImgFlag,
    setScrollToViewCategory,
    setFoodSpecificationInfo,
    setFoodSpecificationFlag,
};
export default meunAction;
