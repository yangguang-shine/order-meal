<template>
    <view class="footer-cart-container" :style="{ position: startShopInfoAnimationFlag || shopInfoFlag ? 'absolute' : 'fixed' }">
        <view class="footer-cart flex-row flex-j-between flex-a-center">
            <view :animation="cartImgAnimationData" class="cart-img-box" id="cart-img-box">
                <image class="cart-img" @click="clickCartImg" src="/static/img/cart-icon.png" mode="scaleToFill"></image>
                <view v-if="allCartFoodCount" class="cart-all-count" :style="{ background: shopInfo.mainColor }">{{ allCartFoodCount }}</view>
            </view>
            <view class="flex-item cart-all-amount">
                <text class="amount-unit">¥</text>
                <text class="discounted-price">{{ cartPriceInfo.cartAlldiscountedPrice }}</text>
                <text v-if="cartPriceInfo.discountPrice" class="origin-price">¥{{ cartPriceInfo.cartAllOriginPrice }}</text>
            </view>
            <view class="com-button confirm-order" :style="{ 'background-color': +cartPriceInfo.cartAlldiscountedPrice > 0 ? shopInfo.mainColor : '' }" @click="toComfirmOrder"></view>
            <!-- <view class="com-button confirm-order" :style="{ 'background-color': +cartPriceInfo.cartAlldiscountedPrice > 0 ? shopInfo.mainColor : '' }" @click="toComfirmOrder">去下单</view> -->
        </view>
    </view>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, watch, ref } from "vue";
import { mapGetter, mapMutation, mapState } from "@/utils/mapVuex";
import { ComputedGetterI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { CategoryItemI, FoodItemI, PositionInfoI } from "@/interface/menu";
import { MinusPromotionsObjectI, AsideCategoryItemI, CartPriceInfoI } from "@/store/getters/menu";
import { RefI } from "@/interface/vueInterface";
import { ShopItemI } from "@/interface/home";
import { selectQuery } from "@/utils/";
import router from "@/utils/router";
import { countAddTransitionTime } from "../infoConfig";
const currentInstance = getCurrentInstance();

interface StateF {
    startShopInfoAnimationFlag: ComputedStateI<boolean>;
    shopInfoFlag: ComputedStateI<boolean>;
    shopInfo: ComputedStateI<ShopItemI>;
    cartCategoryList: ComputedStateI<CategoryItemI[]>;
    cartImgPositionInfo: ComputedStateI<PositionInfoI>;
    cartImgAnimationFlag: ComputedStateI<boolean>;
}
interface GetterF {
    cartPriceInfo: ComputedGetterI<CartPriceInfoI>;
    allCartFoodCount: ComputedGetterI<number>;
}
interface MutationF {
    toogleCartDetailFlag: ComputedMutationI;
    setCartImgPositionInfo: ComputedMutationI<PositionInfoI>;
}

const { startShopInfoAnimationFlag, shopInfoFlag, shopInfo, cartCategoryList, cartImgPositionInfo, cartImgAnimationFlag }: StateF = mapState(["startShopInfoAnimationFlag", "shopInfoFlag", "shopInfo", "cartCategoryList", "cartImgPositionInfo", "cartImgAnimationFlag"]);

const { cartPriceInfo, allCartFoodCount }: GetterF = mapGetter(["cartPriceInfo", "allCartFoodCount"]);

const { toogleCartDetailFlag, setCartImgPositionInfo }: MutationF = mapMutation(["toogleCartDetailFlag", "setCartImgPositionInfo"]);
const cartImgAnimationData = ref(null);
onMounted(async () => {
    const positionInfo = await getCartImgPositionInfo();
    setCartImgPositionInfo(positionInfo);
});
async function getCartImgPositionInfo(): Promise<PositionInfoI> {
    const res = await selectQuery("#cart-img-box", currentInstance);
    return {
        left: res.left,
        top: res.top,
    };
}
watch(cartImgAnimationFlag, (newValue: boolean, oldValue: boolean) => {
    if (newValue) {
        console.log("cartImgAnimationFlag");
        startCartImgAnimation();
    }
});

function startCartImgAnimation() {
    const cartImgAnimation = uni.createAnimation({
        duration: countAddTransitionTime,
        timingFunction: "linear",
    });
    cartImgAnimation.scale(0.85).step({
        duration: countAddTransitionTime * 0.4,
    });
    cartImgAnimation.scale(1.1).step({
        duration: countAddTransitionTime * 0.2,
    });
    cartImgAnimation.scale(0.9).step({
        duration: countAddTransitionTime * 0.2,
    });
    cartImgAnimation.scale(1).step({
        duration: countAddTransitionTime * 0.2,
    });
    cartImgAnimationData.value = cartImgAnimation.export();
}
function toComfirmOrder() {
    router.navigateTo({
        name: "menu/confirm",
    });
}
function clickCartImg() {
    if (cartCategoryList.value.length > 0) {
        toogleCartDetailFlag();
    }
}
</script>

<style lang="scss">
.footer-cart-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 140rpx;
    background-color: #fff;
    color: #fff;
    z-index: 600;

    .footer-cart {
        width: 100%;
        height: 100rpx;
        background-color: #3b3b3c;
        // border-radius: 50rpx;
        color: #fff;
        // padding-bottom: 30rpx;
    }
    .cart-all-amount {
        padding-left: 160rpx;
    }
    .amount-unit {
        font-size: 32rpx;
        line-height: 36rpx;
        padding-right: 6rpx;
    }
    .discounted-price {
        font-size: 48rpx;
        line-height: 56rpx;
    }
    .origin-price {
        margin-left: 10rpx;
        font-size: 24rpx;
        line-height: 28rpx;
        color: #999;
        text-decoration: line-through;
    }
    .cart-img-box {
        position: absolute;
        bottom: 50rpx;
        left: 20rpx;
        height: 120rpx;
        width: 120rpx;
        // z-index: 600;
    }
    .cart-img {
        height: 120rpx;
        width: 120rpx;
    }

    .cart-all-count {
        position: absolute;
        right: -20rpx;
        top: 10rpx;
        height: 32rpx;
        width: 32rpx;
        font-size: 22rpx;
        line-height: 32rpx;
        border-radius: 50%;
        text-align: center;
    }
    .confirm-order {
        margin-right: 10rpx;
        width: 250rpx;
        background-color: #666;
    }
}
</style>
