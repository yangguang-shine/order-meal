<template>
    <view class="footer-cart-container" :style="{ position: startShopInfoAnimationFlag || shopInfoFlag ? 'absolute' : 'fixed' }">
        <view class="footer-cart flex-row flex-j-between flex-a-center">
            <view :animation="cartImgAnimationData" class="cart-img-box" id="cart-img-box">
                <image class="cart-img" @click="clickCartImg" src="/static/img/cart-icon.png" mode="scaleToFill"></image>
                <view v-if="cartPriceInfo.allCartFoodCount" class="cart-all-count" :style="{ background: shopInfo.mainColor }">{{ cartPriceInfo.allCartFoodCount }}</view>
            </view>
            <view class="flex-item cart-all-amount flex-col flex-j-center">
                <div class="price-info flex-row flex-a-end">
                    <span class="pay-price">¥{{ cartPriceInfo.cartAllPayPrice }}</span
                    ><span v-if="cartPriceInfo.discountPrice" class="origin-price">¥{{ cartPriceInfo.cartAllOriginPrice }}</span>
                </div>
                <div v-if="businessType === 2" class="deliver-price">
                    {{ shopInfo.deliverPrice > 0 ? `配送费¥${shopInfo.deliverPrice}` : "免配送费" }}
                </div>
            </view>
            <view class="com-button confirm-order" :style="{ 'background-color': confirmButtonInfo.mainColorFlag ? shopInfo.mainColor : '' }" @click="toComfirmOrder">{{ confirmButtonInfo.text }}</view>
            <!-- <view class="com-button confirm-order" :style="{ 'background-color': +cartPriceInfo.cartAllPayPrice > 0 ? shopInfo.mainColor : '' }" @click="toComfirmOrder">去下单</view> -->
        </view>
    </view>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, watch, ref, computed } from "vue";
import { mapGetter, mapMutation, mapState } from "@/utils/mapVuex";
import { ComputedGetterI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { CategoryItemI, FoodItemI, PositionInfoI } from "@/interface/menu";
import { MinusPromotionsObjectI, AsideCategoryItemI, CartPriceInfoI } from "@/store/getters/menu";
import { ComputedI, RefI } from "@/interface/vueInterface";
import { ShopItemI } from "@/interface/home";
import { selectQuery, toFixedToNumber } from "@/utils/";
import router from "@/utils/router";
import { countAddTransitionTime } from "../infoConfig";
const currentInstance = getCurrentInstance();

interface StateF {
    startShopInfoAnimationFlag: ComputedStateI<boolean>;
    shopInfoFlag: ComputedStateI<boolean>;
    businessType: ComputedStateI<number>;
    shopInfo: ComputedStateI<ShopItemI>;
    cartCategoryList: ComputedStateI<CategoryItemI[]>;
    cartImgPositionInfo: ComputedStateI<PositionInfoI>;
    cartImgAnimationFlag: ComputedStateI<boolean>;
}
interface GetterF {
    cartPriceInfo: ComputedGetterI<CartPriceInfoI>;
}
interface MutationF {
    toogleCartDetailFlag: ComputedMutationI;
    setCartImgPositionInfo: ComputedMutationI<PositionInfoI>;
}

const { startShopInfoAnimationFlag, shopInfoFlag, businessType, shopInfo, cartCategoryList, cartImgPositionInfo, cartImgAnimationFlag }: StateF = mapState(["startShopInfoAnimationFlag", "shopInfoFlag", "businessType", "shopInfo", "cartCategoryList", "cartImgPositionInfo", "cartImgAnimationFlag"]);

const { cartPriceInfo }: GetterF = mapGetter(["cartPriceInfo"]);

const { toogleCartDetailFlag, setCartImgPositionInfo }: MutationF = mapMutation(["toogleCartDetailFlag", "setCartImgPositionInfo"]);
const cartImgAnimationData = ref(null);

interface ConfirmButtonInfoI {
    text: string;
    mainColorFlag: boolean;
}
const confirmButtonInfo: ComputedI<ConfirmButtonInfoI> = computed((): ConfirmButtonInfoI => {
    let text: string = "";
    let mainColorFlag: boolean = false;
    const startDeliverPrice = shopInfo.value.startDeliverPrice;
    if (startDeliverPrice === 0 && cartPriceInfo.value.cartAllOriginPrice === 0) {
        text = "请选购商品";
        // mainColorFlag = true;
    } else if (cartPriceInfo.value.cartAllOriginPrice === 0) {
        text = `¥${startDeliverPrice}起${businessType.value === 2 ? "送" : "做"}`;
    } else if (cartPriceInfo.value.cartAllOriginPrice > startDeliverPrice) {
        text = "去结算";
        mainColorFlag = true;
    } else {
        text = `差¥${toFixedToNumber(startDeliverPrice - cartPriceInfo.value.cartAllOriginPrice)}起${businessType.value === 2 ? "送" : "做"}`;
    }
    if (businessType.value === 1) {
    } else if (businessType.value === 2) {
        businessType;
    } else if (businessType.value === 3) {
    }
    return {
        text,
        mainColorFlag,
    };
});
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
    if (confirmButtonInfo.value.mainColorFlag) {
        console.log(1111);
        router.navigateTo({
            name: "menu/confirm",
        });
    }
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
    z-index: 800;

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
    .pay-price {
        padding: 0;
        margin: 0;
        font-size: 36rpx;
        line-height: 40rpx;
        height: 40rpx;
    }
    .origin-price {
        margin-left: 10rpx;
        font-size: 28rpx;
        line-height: 30rpx;
        color: #999;
        text-decoration: line-through;
    }
    .deliver-price {
        margin-top: 4rpx;
        font-size: 24rpx;
        color: #ccc;
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
        font-size: 32rpx;

        width: 250rpx;
        background-color: #888;
    }
}
</style>
