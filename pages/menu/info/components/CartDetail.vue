<template>
    <view class="cart-detail-component" @click.stop="closeCartDetail" :style="{ bottom: minusPromotionsObject.show ? footerAndMinusPX + 'px' : '' }">
        <view :animation="overlayAnimationData" class="cart-detail-overlay"></view>
        <view :animation="mainAnimationData" class="cart-detail-box" @click.stop>
            <view class="cart-select-box flex-row flex-j-between flex-a-center">
                <view class="select-title-box flex-row flex-a-center">
                    <div class="select-title">已选商品</div>
                    <div v-if="cartPriceInfo.allPackPrice" class="flex-row flex-ja-center" @click="setMenuPackPriceExpalinFlag(true)">
                        <div>(包装费</div>
                        <div :style="{ color: $mainColor }">¥{{ cartPriceInfo.allPackPrice }}</div>
                        <div class="pack-price-tips flex-row flex-ja-center">?</div>
                        <div>)</div>
                    </div>
                    <!-- <div class="pack-price-text">({{ allPackPriceText }}</div>
                        <div v-if="allPackPriceText" @click="setMenuPackPriceExpalinFlag(true)"></div> -->
                </view>
                <view class="flex-row flex-a-center" @click="cartClearCart">
                    <image class="delete-all-icon" src="/static/img/shop-delete.svg"></image>
                    <text class="clear-cart-title">清空</text>
                </view>
            </view>
            <scroll-view scroll-y class="cart-detail-list-box" id="cart-detail-list-box" @scroll="foodScrollHandle">
                <view class="cart-food-list">
                    <view class="food-category-item" v-for="foodCategoryItem in cartCategoryList" :key="foodCategoryItem.categoryID">
                        <div class="cart-food-item-box" v-for="cartFoodItem in foodCategoryItem.foodList" :key="cartFoodItem.foodID">
                            <FoodItem v-if="!cartFoodItem.orderSpecifaList.length" :foodItem="cartFoodItem" mode="small" type="cartDetail" class="cart-food-item" idPre="cart-food-img"></FoodItem>
                            <div v-else v-for="(orderSpecifaItem, index) in cartFoodItem.orderSpecifaList" :key="index">
                                <FoodItemCartSpecification class="cart-food-item" :foodItem="cartFoodItem" :idPre="`cart-food-img-${orderSpecifaItem.key}`" :orderSpecifaItem="orderSpecifaItem" mode="small" type="cartDetail"></FoodItemCartSpecification>
                            </div>
                        </div>
                    </view>
                </view>
                <!-- <div v-if="cartPriceInfo.allPackPrice" class="all-pack-price-split"></div>
                <div v-if="cartPriceInfo.allPackPrice" class="all-pack-price flex-row flex-a-center" @click="setMenuPackPriceExpalinFlag(true)">
                    <div>包装费</div>
                    <div :style="{ color: $mainColor }">¥{{ cartPriceInfo.allPackPrice }}</div>
                    <div class="pack-price-tips flex-row flex-ja-center">?</div>
                </div> -->
            </scroll-view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { delaySync, ResSelectQueryI, selectQuery, showModal } from "@/utils/index";
import FoodAddMinusItem from "./item/FoodAddMinusItem.vue";
import FoodItem from "./item/FoodItem.vue";
import FoodItemCartSpecification from "./item/FoodItemCartSpecification.vue";

import { getCurrentInstance, computed, onMounted, ref, toRefs, watch } from "vue";
import { cartDetailTransitionTime } from "../infoConfig";
import { CategoryItemI, FoodItemI } from "@/interface/menu";
import useOverlayAnimation from "@/utils/useOverlayAnimation";
import { MenuGetterG, MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { storeToRefs } from "pinia";
import { debounce } from "@/utils/tool";
import { MenuStateG } from "@/piniaStore/menu/state";
// menu store
const menuStore: MenuStoreI = useMenuStore();
// menu state
const { cartCategoryList, categoryList, businessType, shopInfo, showCartClickCartImgFlag }: MenuStateG = toRefs(menuStore.menuState);
// menu getter
const { minusPromotionsObject, cartPriceInfo, footerAndMinusPX }: MenuGetterG = storeToRefs(menuStore);
// menu action
const { setCartDetailFlag, clearCart, setMenuPackPriceExpalinFlag, setShowCartClickCartImgFlag } = menuStore;
// animation
const { overlayAnimationData, mainAnimationData, toStartAnimation, toEndAnimation } = useOverlayAnimation({
    duration: cartDetailTransitionTime,
});
let collectFoodListBoxPositionInfo: ResSelectQueryI;
onMounted(async () => {
    toStartAnimation();
    // 获取动画前需要加载的图片
    getCartDetailListBoxPositionInfo();
    foodScrollHandle();
    // 动画完成后才能获取位置准确信息
    await delaySync(500);
    getCartDetailListBoxPositionInfo();
});
async function getCartDetailListBoxPositionInfo() {
    collectFoodListBoxPositionInfo = await selectQuery("#cart-detail-list-box");
}

const cartFoodList = computed(() => {
    const cartFoodItem: any = [];
    cartCategoryList.value.forEach((cartCategoryItem) => {
        cartCategoryItem.foodList.forEach((foodItem) => {
            if (foodItem.orderSpecifaList.length) {
                foodItem.orderSpecifaList.forEach((orderSpecifaItem) => {
                    cartFoodItem.push(foodItem);
                });
            } else {
                cartFoodItem.push(foodItem);
            }
        });
    });
    return cartFoodItem;
});

const foodScrollHandle = debounce(handleScroll, 70);
async function handleScroll(e: any) {
    const { top, bottom } = collectFoodListBoxPositionInfo;
    for (let i = 0; i < cartFoodList.value.length; i++) {
        const foodItem: FoodItemI = cartFoodList.value[i];
        let endLoopFlag: boolean =false
        if (foodItem.orderSpecifaList.length) {
            for (let j = 0; j < foodItem.orderSpecifaList.length; j++) {
                const orderSpecifaItem = foodItem.orderSpecifaList[j];
                const idPre = `cart-food-img-${orderSpecifaItem.key}`;
                const foodImgPositoninfo = await selectQuery(`#${idPre}-${foodItem.foodID}`);

                if ((top <= foodImgPositoninfo.top && foodImgPositoninfo.top <= bottom) || (top <= foodImgPositoninfo.bottom && foodImgPositoninfo.bottom < bottom)) {
                    foodItem.currentImg = foodItem.fullImgPath;
                }
                if (foodImgPositoninfo.top > bottom) {
                    endLoopFlag = true
                    break;
                }
            }
        } else {
            const idPre = "cart-food-img";
            const foodImgPositoninfo = await selectQuery(`#${idPre}-${foodItem.foodID}`);
            if ((top <= foodImgPositoninfo.top && foodImgPositoninfo.top <= bottom) || (top <= foodImgPositoninfo.bottom && foodImgPositoninfo.bottom < bottom)) {
                foodItem.currentImg = foodItem.fullImgPath;
            }
            if (foodImgPositoninfo.top > bottom) {
                break;
            }
        }
        if (endLoopFlag) {
                break;
        }
    }

    // for (let i = 0; i < cartCategoryList.value.length; i++) {
    //     const cartCategoryItem = cartCategoryList.value[i];
    //     const { top, bottom } = collectFoodListBoxPositionInfo;
    //     let foodImgPositoninfo: ResSelectQueryI;
    //     for (let j = 0; j < cartCategoryItem.foodList.length; j++) {
    //         const foodItem = cartCategoryItem.foodList[j];
    //         if (foodItem.orderSpecifaList.length) {
    //             for (let k = 0; k < foodItem.orderSpecifaList.length; k++) {
    //                 const orderSpecifaItem = foodItem.orderSpecifaList[k];
    //                 const idPre = `cart-food-img-${orderSpecifaItem.key}`;
    //                 foodImgPositoninfo = await selectQuery(`#${idPre}-${foodItem.foodID}`);
    //             }
    //         } else {
    //             const idPre = "cart-food-img";
    //             foodImgPositoninfo = await selectQuery(`#${idPre}-${foodItem.foodID}`);
    //         }
    //         console.log("foodImgPositoninfo");
    //         console.log(foodImgPositoninfo);
    //         if ((top <= foodImgPositoninfo.top && foodImgPositoninfo.top <= bottom) || (top <= foodImgPositoninfo.bottom && foodImgPositoninfo.bottom < bottom)) {
    //             foodItem.currentImg = foodItem.fullImgPath;
    //         }
    //     }
    //     // if (menuState.topBarPX <= categoryItemPositionInfo.top + 1 || categoryItemPositionInfo.bottom - 1 > menuState.topBarPX) {
    //     //     setSelectedCategoryID(categoryItem.categoryID);
    //     //     setCategoryIDMain("");
    //     //     setCategoryIDAside(categoryItem.categoryIDAside);
    //     //     await handleLazyImg(i);
    //     //     break;
    //     // }
    // }
    // const currentCollectFoodList = cartCategoryList.value[collectTabIndex.value].foodList;
    // const { top, bottom } = collectFoodListBoxPositionInfo;
    // for (let i = 0; i < currentCollectFoodList.length; i++) {
    //     const foodItem = currentCollectFoodList[i];
    //     const imgPositionInfo = await selectQuery(`#${idPre}-${foodItem.foodID}`);
    //     if ((top <= imgPositionInfo.top && imgPositionInfo.top <= bottom) || (top <= imgPositionInfo.bottom && imgPositionInfo.bottom < bottom)) {
    //         foodItem.currentImg = foodItem.fullImgPath;
    //     }
    //     if (imgPositionInfo.top > bottom) {
    //         break;
    //     }
    // }
}

watch(
    () => showCartClickCartImgFlag.value,
    async (newValue: boolean, oldValue: boolean) => {
        if (newValue === true && oldValue === false) {
            await closeCartDetail();
            setShowCartClickCartImgFlag(false);
        }
    }
);

async function closeCartDetail() {
    toEndAnimation();
    await delaySync(cartDetailTransitionTime);
    setCartDetailFlag(false);
}
async function cartClearCart() {
    await showModal({
        content: "确认清空购物车吗？",
        showCancelFlag: true,
    });
    clearCart();
    setCartDetailFlag(false);
}
</script>

<style lang="scss" scoped>
.cart-detail-component {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 140rpx;
    width: 100%;
    font-size: 28rpx;
    -webkit-overflow-scrolling: touch;
    z-index: 600;

    .cart-detail-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        // transition: all ease-in-out 0.3s;
        opacity: 0;
    }
    .cart-detail-box {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        // max-height: 800rpx;
        box-sizing: border-box;
        // padding: 0 0 10rpx;
        background-color: #fff;
        overflow-y: auto;
        border-radius: 30rpx 30rpx 0 0;
        transform: translateY(100%);
    }

    .cart-detail-box-show {
        transform: translateY(0%);
    }

    .cart-select-box {
        padding: 20rpx 40rpx;
        font-size: 26rpx;
        color: #666;
    }
    .select-title-box {
        color: #999;
    }
    .select-title {
        color: #666;
        margin-left: 4rpx;
    }

    // .pack-price-text {
    //     color: #ccc;
    // }

    .clear-cart-title {
        color: #999;
    }

    .delete-all-icon {
        padding: 10rpx;
        height: 30rpx;
        width: 30rpx;
    }

    .cart-detail-list-box {
        max-height: 680rpx;
        // padding-bottom: 20rpx;
        overflow-y: auto;
        ::-webkit-scrollbar {
            display: none;
            width: 0 !important;
            height: 0 !important;
            -webkit-appearance: none;
            background: transparent;
        }
    }
    .cart-detail-list-box::-webkit-scrollbar {
        display: none;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        background: transparent;
    }
    .food-category-ite:last-child {
    }
    .cart-food-item {
        // padding: 10rpx 30rpx;
        margin: 0 20rpx;
        border-bottom: 1rpx solid #eee;
    }
    .food-category-item:last-child .cart-food-item-box:last-child .cart-food-item:last-child {
        // margin-bottom: 20rpx;
        border-bottom: none;
        margin-bottom: 30rpx;
    }
    .all-pack-price-split {
        width: 100%;
        height: 16rpx;
        background-color: #f5f5f5;
    }
    .all-pack-price {
        padding: 20rpx 0 20rpx 30rpx;
        color: #333;
    }
    .pack-price-tips {
        border: 1px solid;
        margin: 0 8rpx;
        font-size: 20rpx;
        height: 24rpx;
        width: 24rpx;
        border-radius: 50%;
    }
    .bottom-block-20rpx {
        height: 100%;
        height: 20rpx;
    }
    // .cart-food-img {
    //     padding: 4rpx 0 8rpx 0;
    //     height: 120rpx;
    //     width: 120rpx;
    // }
    // .cart-food-price-button {
    //     font-size: 26rpx;
    // }
    // .cart-food-name {
    //     font-weight: bold;
    //     max-width: 400rpx;
    //     font-size: 28rpx;
    //     line-height: 38rpx;
    // }
    // .cart-food-description {
    //     // margin-top: 10rpx;
    //     font-size: 22rpx;
    //     color: #999;
    // }
    // .cart-food-price {
    //     font-size: 30rpx;
    //     line-height: 34rpx;
    //     font-weight: bold;
    //     color: $color-red;
    // }

    // .cart-food-info-box {
    //     padding-left: 20rpx;
    // }
}
.cart-img-transparent {
    position: fixed;
    width: 120rpx;
    height: 120rpx;
    bottom: 50rpx;
    left: 20rpx;
    background-color: transparent;
    z-index: 850;
    // width: ;
}
</style>
