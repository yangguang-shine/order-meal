<template>
    <view class="menu-container">
        <TopBar></TopBar>
        <view class="menu-order-box flex-col" :class="topBarInfo === '点餐' ? 'show-menu-order-box' : 'hide-menu-order-box'">
            <view class="menu-list-box flex-item flex-row ">
                <CategoryAsideBar></CategoryAsideBar>
                <FoodCategoryList></FoodCategoryList>
            </view>
            <CartDetail  v-if="cartDetailFlag"></CartDetail>
            <MinusPromotions v-if="minusPromotionsObject.show"></MinusPromotions>
            <FooterInfo></FooterInfo>
            <FoodDetail v-if="foodDetailFalg"></FoodDetail>
        </view>
        <ShopInfo v-if="shopInfoFlag"></ShopInfo>
        <!-- <common-loading v-if="showLoadingFlag"></common-loading> -->
    </view>
</template>

<script lang='ts' setup>
import { get1rpx2px } from "@/utils/index";
import CategoryAsideBar from "./components/CategoryAsideBar.vue";
import FoodCategoryList from "./components/FoodCategoryList.vue";
import MinusPromotions from "./components/MinusPromotions.vue";
import MinusPromotionsBlock from "./components/MinusPromotionsBlock.vue";
import FooterInfo from "./components/FooterInfo.vue";
import FooterCartBlock from "./components/FooterCartBlock.vue";
import CartDetail from "./components/CartDetail.vue";
import FoodDetail from "./components/FoodDetail.vue";
import TopBar from "./components/TopBar.vue";
import ShopInfo from "./components/ShopInfo.vue";
import { delaySync } from "@/utils/index.js";

import {
    mapState,
    mapMutations,
    mapActions,
    mapGetters
} from "../../../../utils/mapVuex";
import { defineComponent, getCurrentInstance, computed } from "vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";


const remand = {
    businessType: "",
    shopInfo: {},
    addCountState: true,
    minusCountState: true
};
const { $showLoading, $hideLoading, $showModal } = getCurrentInstance().proxy;
const {
    shopInfo,
    businessType,
    cartCategoryList,
    categoryList,
    orderCategoryList,
    categoryTabId,
    scrollIntoCategoryTabID,
    topBarInfo,
    shopInfoFlag,
    cartDetailFlag,
    foodDetailFalg,
    foodItem
} = mapState("user", [
    "shopInfo",
    "businessType",
    "cartCategoryList",
    "categoryList",
    "orderCategoryList",
    "categoryTabId",
    "scrollIntoCategoryTabID",
    "topBarInfo",
    "shopInfoFlag",
    "cartDetailFlag",
    "foodDetailFalg",
    "foodItem"
]);
const {
    minusPromotionsObject,
    cartPriceInfo,
    allCartFoodCount,
    asideCategoryList
} = mapGetters("user", [
    "minusPromotionsObject",
    "cartPriceInfo",
    "allCartFoodCount",
    "asideCategoryList"
]);

const {
    setCategoryTabId,
    setScrollIntoCategoryTabID,
    setFoodCategoryList,
    setFoodInfo,
    setFoodDetailFlag,
    setTopBarInfo,
    initCart
} = mapMutations("user", [
    "setCategoryTabId",
    "setScrollIntoCategoryTabID",
    "setFoodCategoryList",
    "setFoodInfo",
    "setFoodDetailFlag",
    "setTopBarInfo",
    "initCart"
]);

const { getMenuList, getOrderKeyFoodList } = mapActions("user", [
    "getMenuList",
    "getOrderKeyFoodList"
]);

let orderKey = "";
onLoad(async option => {
    try {
        orderKey = option.orderKey;
        $showLoading();
        await init();
    } catch (e) {
        console.log(e);
    } finally {
        $hideLoading();
    }
});
async function init() {
    await getMenuList();
    // 重来一单，orderAgain 和 orderKey 缺一不可
    if (orderKey) {
        await getOrderKeyFoodList({
            orderKey
        });
        if (orderCategoryList.value.length) {
            uni.setStorageSync(
                `storageFoodList_${shopInfo.value.shopID}`,
                orderCategoryList.value
            );
        }
    } else {
        
    }
    initCart()
    getStorageCart();
}
// function initCart() {

// }
// function getOrderFoodList(orderKey) {
//     try {
//         const data = await $fetch("user/order/foodList", {
//             orderKey,
//             shopID: shopInfo.shopID
//         });
//         const orderCategoryFoodList = data.reduce((list, item) => {
//             if (!list.length) {
//                 list.push({
//                     categoryID: item.categoryID,
//                     categoryName: item.categoryName,
//                     foodList: [item]
//                 });
//             } else {
//                 const find = list.find(
//                     ListItem => ListItem.categoryID === item.categoryID
//                 );
//                 if (find) {
//                     find.foodList.push(item);
//                 } else {
//                     list.push({
//                         categoryID: item.categoryID,
//                         categoryName: item.categoryName,
//                         foodList: [item]
//                     });
//                 }
//             }
//             return list;
//         }, []);
//         return orderCategoryFoodList;
//     } catch (e) {
//         console.log(e);
//         return [];
//     }
// }
function getStorageCart() {}
function toShowFoodDetail(foodItem) {
    setFoodInfo(foodItem);
    setFoodDetailFlag(true);
}
function toCloseFoodDetail() {
    setFoodInfo({});
    setFoodDetailFlag(false);
}
// function toChangeTopBar(title) {
//     if (topBarInfo === title) return;
//     if (title === '商家') {
//         setShopInfoFlag(true)
//     }
//     setTopBarInfo(title);
// }
// export default {
//     methods: {
//         // async changeTopBar(title) {
//         //     if (topBarInfo === title) return;
//         //     topBarInfo = title;
//         //     if (topBarInfo === "点餐") {
//         //         $refs.shopInfo.showComponents = false;
//         //         // 多100 是为了购物车absolute转化成fixed能流畅 200 生硬
//         //         await delaySync(300);
//         //         showShopInfo = false;
//         //     } else if (topBarInfo === "商家") {
//         //         showShopInfo = true;
//         //     }
//         // },

//         // foodScrollHandle(e) {
//         //     debounce(() => {
//         //         handleScroll(e);
//         //     }, 30);
//         // },
//         // async handleScroll(e) {
//         //     asideCategoryList;
//         //     for (let i = 0; i < asideCategoryList.length; i++) {
//         //         const categoryItem = asideCategoryList[i];
//         //         const res = await selectQuery(
//         //             `#${categoryItem.categoryTabID}id`
//         //         );
//         //         console.log(`#${categoryItem.categoryTabID}id`);
//         //         console.log(res);
//         //         if (
//         //             topBarHeightPX <= res.top ||
//         //             res.bottom > topBarHeightPX
//         //         ) {
//         //             selectCategoryTabId = categoryItem.categoryTabID;
//         //             scrollIntoCategoryTabID = null;

//         //             break;
//         //         }
//         //     }
//         // },
//         // selectQuery(id) {
//         //     return new Promise((resolve, reject) => {
//         //         uni.createSelectorQuery()
//         //             .select(id)
//         //             .boundingClientRect(res => {
//         //                 resolve(res);
//         //             })
//         //             .exec();
//         //     });
//         // },

//         async cartClearCart() {
//             await $showModal({
//                 content: "确认清空购物车吗？",
//                 showCancel: true
//             });
//             clearCart();
//             closeCartDetail();
//         },
//         async init() {
//             console.log("cartCategoryList");
//             console.log(JSON.stringify(cartCategoryList));
//             console.log(cartCategoryList);
//             const { orderAgain, orderKey } = $root.$mp.query;
//             const categoryList = await $fetch("user/order/menuList", {
//                 shopID: shopInfo.shopID
//             });
//             categoryList.forEach((item, index) => {
//                 item.categoryTabID = "id" + item.categoryID;
//             });
//             if (categoryList.length) {
//                 selectCategoryTabId = categoryList[0].categoryTabID;
//                 scrollIntoCategoryTabID = null;
//             }
//             // 重来一单，orderAgain 和 orderKey 缺一不可
//             if (orderAgain && orderKey) {
//                 const orderCategoryFoodList = await getOrderFoodList(
//                     orderKey
//                 );
//                 if (orderCategoryFoodList.length) {
//                     uni.setStorageSync(
//                         `storageFoodList_${shopInfo.shopID}`,
//                         orderCategoryFoodList
//                     );
//                 }
//             }
//             categoryList = categoryList;
//             getStorageCart();
//         },
//         initCart({ categoryList = [], storageFoodList = [] } = {}) {
//             cartCategoryList = [];
//             storageFoodList.forEach(storageFoodItem => {
//                 const foodCategoryFind = categoryList.find(
//                     foodCategoryItem =>
//                         foodCategoryItem.categoryID ===
//                         storageFoodItem.categoryID
//                 );
//                 if (foodCategoryFind) {
//                     foodCategoryFind.foodList.forEach(foodItem => {
//                         storageFoodItem.foodList.forEach(item => {
//                             if (item.foodID === foodItem.foodID) {
//                                 foodItem.orderCount = item.orderCount;
//                                 cartCountChange(foodItem);
//                             }
//                         });
//                     });
//                 }
//             });
//         },
//         cartCountChange(foodItem = {}) {
//             // 购物车数量增加减少使用的是引用改变，其他关联也相应改变
//             const findCategory = cartCategoryList.find(
//                 item => item.categoryID === foodItem.categoryID
//             );
//             if (findCategory) {
//                 const findFood = findCategory.foodList.find(
//                     item => item.foodID === foodItem.foodID
//                 );
//                 if (!findFood) {
//                     findCategory.foodList.push(foodItem);
//                 }
//             } else {
//                 cartCategoryList.push({
//                     categoryID: foodItem.categoryID,
//                     foodList: [foodItem]
//                 });
//             }
//             cartCategoryList.forEach(item => {
//                 item.foodList = item.foodList.filter(foodItem => {
//                     if (foodItem.orderCount > 0) {
//                         foodItem.foodItemAmount = Number(
//                             (foodItem.price * foodItem.orderCount).toFixed(2)
//                         );
//                         return true;
//                     } else {
//                         foodItem.foodItemAmount = 0;
//                         return false;
//                     }
//                 });
//             });
//             cartCategoryList = cartCategoryList.filter(
//                 item => item.foodList.length > 0
//             );
//             uni.setStorageSync(
//                 `storageFoodList_${shopInfo.shopID}`,
//                 cartCategoryList
//             );
//         },
//         clearCart() {
//             cartCategoryList.forEach(categoryTtem => {
//                 categoryTtem.foodList.forEach(foodItem => {
//                     foodItem.orderCount = 0;
//                 });
//             });
//             cartCategoryList = [];
//             uni.removeStorageSync(`storageFoodList_${shopInfo.shopID}`);
//         },
//         async getOrderFoodList(orderKey) {
//             try {
//                 const data = await $fetch("user/order/foodList", {
//                     orderKey,
//                     shopID: shopInfo.shopID
//                 });
//                 const orderCategoryFoodList = data.reduce((list, item) => {
//                     if (!list.length) {
//                         list.push({
//                             categoryID: item.categoryID,
//                             categoryName: item.categoryName,
//                             foodList: [item]
//                         });
//                     } else {
//                         const find = list.find(
//                             ListItem => ListItem.categoryID === item.categoryID
//                         );
//                         if (find) {
//                             find.foodList.push(item);
//                         } else {
//                             list.push({
//                                 categoryID: item.categoryID,
//                                 categoryName: item.categoryName,
//                                 foodList: [item]
//                             });
//                         }
//                     }
//                     return list;
//                 }, []);
//                 return orderCategoryFoodList;
//             } catch (e) {
//                 console.log(e);
//                 return [];
//             }
//         },
//         getStorageCart() {
//             const storageFoodList =
//                 uni.getStorageSync(`storageFoodList_${shopInfo.shopID}`) ||
//                 [];
//             if (!storageFoodList.length) return;
//             initCart({
//                 categoryList: categoryList,
//                 storageFoodList
//             });
//         },
//         async toogleCartDetail() {
//             if (!cartCategoryList.length) {
//                 showCartDetail = false;
//                 return;
//             }
//             if (showCartDetail) {
//                 await $refs.foodCardDetail.closeCartDetail();
//                 showCartDetail = false;
//             } else {
//                 showCartDetail = true;
//             }
//         },
//         closeCartDetail() {
//             showCartDetail = false;
//         },
//         changeSelectCategoryTab(categoryTabID) {
//             selectCategoryTabId = categoryTabID;
//             scrollIntoCategoryTabID = categoryTabID;
//         },
//         addCount(foodItem) {
//             if (!addCountState) return;
//             addCountState = false;
//             foodItem.orderCount += 1;
//             cartCountChange(foodItem);
//             addCountState = true;
//             if (!cartCategoryList.length) showCartDetail = false;
//         },
//         minusCount(foodItem) {
//             if (!minusCountState) return;
//             minusCountState = false;
//             foodItem.orderCount -= 1;
//             cartCountChange(foodItem);
//             minusCountState = true;
//             if (!cartCategoryList.length) showCartDetail = false;
//         },
//         async toComfirmOrder() {
//             $myrouter.navigateTo({
//                 name: "user/menu/confirm"
//             });
//         }
//     }
// };
</script>

<style lang="scss">
page {
    height: 100vh;
}
.menu-container {
    font-size: 28rpx;
    width: 750rpx;
    height: 100vh;
    color: #333;
    position: relative;
    .menu-list-box {
        height: 0rpx;
    }
    .menu-order-box {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        padding-top: 80rpx;
        padding-bottom: 140rpx;
        box-sizing: border-box;
        transition: all ease-in-out 0.3s;
    }
    .show-menu-order-box {
        left: 0;
    }
    .hide-menu-order-box {
        left: -750rpx;
    }
    //    .shop-info-box  {
    //         position: absolute;
    //         top: 0;
    //         width: 100%;
    //         height: 100%;
    //         padding-top: 80rpx;
    //         box-sizing: border-box;
    //         transition: all ease-in-out .3s;
    // }

    // flex：1 和 height共存 ，取最大值
}
</style>
