<template>
    <view class="cart-detail-component" @click.stop="closeCartDetail" :style="{ bottom: minusPromotionsObject.show ? footerInfoAndMinusPromotionsHeightRPX + 'rpx' : '' }">
        <view :animation="overlayAnimationData" class="cart-detail-overlay"></view>
        <view :animation="mainAnimationData" class="cart-detail-box" @click.stop>
            <view class="cart-select-box flex-row flex-j-between flex-a-center">
                <view class="select-title-box flex-row flex-a-center">
                    <div class="select-title">已选商品</div>
                    <!-- <div v-if="cartPriceInfo.allPackPrice" class=" flex-row flex-ja-center" @click="setMenuPackPriceExpalinFlag(true)">
                            <div>(包装费</div>
                            <div :style="{ color: shopInfo.mainColor }">¥{{ cartPriceInfo.allPackPrice }}</div>
                            <div class="pack-price-tips flex-row flex-ja-center">?</div>
                            <div>)</div>
                        </div> -->
                    <!-- <div class="pack-price-text">({{ allPackPriceText }}</div>
                        <div v-if="allPackPriceText" @click="setMenuPackPriceExpalinFlag(true)">)</div> -->
                </view>
                <view class="flex-row flex-a-center" @click="cartClearCart">
                    <image class="delete-all-icon" src="/static/img/shop-delete.svg"></image>
                    <text class="clear-cart-title">清空</text>
                </view>
            </view>
            <scroll-view scroll-y class="cart-detail-list-box">
                <view class="cart-food-list">
                    <view class="food-category-item" v-for="foodCategoryItem in cartCategoryList" :key="foodCategoryItem.categoryID">
                        <FoodItem v-for="cartFoodItem in foodCategoryItem.foodList" :key="cartFoodItem.foodID" :foodItem="cartFoodItem" mode="small" type="cart" class="cart-food-item"></FoodItem>
                    </view>
                </view>
                <div v-if="cartPriceInfo.allPackPrice" class="all-pack-price-split"></div>
                <div v-if="cartPriceInfo.allPackPrice" class="all-pack-price flex-row flex-a-center" @click="setMenuPackPriceExpalinFlag(true)">
                    <div>包装费</div>
                    <div :style="{ color: shopInfo.mainColor }">¥{{ cartPriceInfo.allPackPrice }}</div>
                    <div class="pack-price-tips flex-row flex-ja-center">?</div>
                </div>
            </scroll-view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { delaySync, showModal } from "@/utils/index";
import FoodAddMinusItem from "./item/FoodAddMinusItem.vue";
import FoodItem from "./item/FoodItem.vue";
import { getCurrentInstance, computed, onMounted, ref, toRefs, watch } from "vue";
import { footerInfoAndMinusPromotionsHeightRPX, cartDetailTransitionTime } from "../infoConfig";
import { mapState, mapGetter, mapMutation } from "@/utils/mapVuex";
import { ComputedGetterI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { CategoryItemI } from "@/interface/menu";
import { CartPriceInfoI, MinusPromotionsObjectI } from "@/store/getters/menu";
import { ComputedI, RefI } from "@/interface/vueInterface";
import useOverlayAnimation from "@/utils/useOverlayAnimation";
import { ShopItemI } from "@/interface/home";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { storeToRefs } from "pinia";

interface MenuStateF {
    cartCategoryList: ComputedStateI<CategoryItemI[]>;
    categoryList: ComputedStateI<CategoryItemI[]>;
    businessType: ComputedStateI<number>;
    shopInfo: ComputedStateI<ShopItemI>;
    showCartClickCartImgFlag: ComputedStateI<boolean>;
}
interface MenuGetterF {
    minusPromotionsObject: ComputedGetterI<MinusPromotionsObjectI>;
    cartPriceInfo: ComputedGetterI<CartPriceInfoI>;
}
// menu store
const menuStore: MenuStoreI = useMenuStore();
// menu state
const { cartCategoryList, categoryList, businessType, shopInfo, showCartClickCartImgFlag }: MenuStateF = toRefs(menuStore.menuState);
// menu getter
const { minusPromotionsObject, cartPriceInfo }: MenuGetterF = storeToRefs(menuStore);
// menu action
const { setCartDetailFlag, clearCart, setMenuPackPriceExpalinFlag, setShowCartClickCartImgFlag } = menuStore;
// animation
const { overlayAnimationData, mainAnimationData, toStartAnimation, toEndAnimation } = useOverlayAnimation({
    duration: cartDetailTransitionTime,
});
onMounted(() => {
    toStartAnimation();
});

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
    .food-category-item:last-child .cart-food-item:last-child {
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
