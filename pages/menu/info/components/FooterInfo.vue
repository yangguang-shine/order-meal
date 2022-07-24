<template>
    <view class="footer-cart-container" id="footer-cart-container" :style="{ position: startShopInfoAnimationFlag || shopInfoFlag ? 'absolute' : 'fixed' }">
        <view class="footer-cart flex-row flex-j-between flex-a-center">
            <view :animation="cartImgAnimationData" class="cart-img-box" id="cart-img-box">
                <CartImg @click="clickCartImg"></CartImg>
                <!-- <image class="cart-img" @click="clickCartImg" src="/static/img/cart-icon.png" mode="scaleToFill"></image> -->
                <view v-if="cartPriceInfo.allCartFoodCount" class="cart-all-count" :style="{ background: $mainColor }">{{ cartPriceInfo.allCartFoodCount }}</view>
            </view>
            <view class="flex-item cart-all-amount flex-col flex-j-center">
                <div class="price-info flex-row flex-a-end">
                    <span class="pay-price">¥{{ cartPriceInfo.allPriceAfterDiscount }}</span
                    ><span v-if="cartPriceInfo.minusPrice" class="origin-price">¥{{ cartPriceInfo.allOriginPrice }}</span>
                </div>
                <div v-if="businessType === 2" class="deliver-price">
                    {{ shopInfo.deliverPrice > 0 ? `配送费¥${shopInfo.deliverPrice}` : "免配送费" }}
                </div>
            </view>
            <view v-if="confirmButtonInfo.hasOrderRequiredFlag" class="confirm-order flex-center" :style="{ 'background-color': shopInfo.mainColor }" @click="toComfirmOrder">{{ confirmButtonInfo.text }}</view>
            <view v-else-if="confirmButtonInfo.text" class="confirm-order flex-col flex-ja-center" :style="{ 'background-color': shopInfo.mainColor }" @click="toComfirmOrder">
                <div class="button-text-top">{{ confirmButtonInfo.text }}</div>
                <div class="button-text-bottom">{{ confirmButtonInfo.requireText }}</div>
            </view>
            <view v-else class="confirm-order flex-center" :style="{ 'background-color': shopInfo.mainColor }" @click="toComfirmOrder">
                {{ confirmButtonInfo.requireText }}
            </view>
            <!-- <view class="com-button confirm-order" :style="{ 'background-color': +cartPriceInfo.allPriceAfterDiscount > 0 ? shopInfo.mainColor : '' }" @click="toComfirmOrder">去下单</view> -->
        </view>
    </view>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, watch, ref, computed, toRefs } from "vue";
import CartImg from "./CartImg.vue";
import { RefI } from "@/interface/vueInterface";
import { selectQuery, showToast, toFixedToNumber } from "@/utils/";
import router from "@/utils/router";
import { countAddTransitionTime } from "../infoConfig";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { storeToRefs } from "pinia";
import {  MenuGetterG } from "@/piniaStore/menu/getter";
import { MenuStateG } from "@/piniaStore/menu/state";

// store
const menuStore: MenuStoreI = useMenuStore();
// state
const { startShopInfoAnimationFlag, shopInfoFlag, businessType, shopInfo, cartCategoryList, cartImgAnimationFlag, requiredCategoryIDList, categoryListMap }: MenuStateG = toRefs(menuStore.menuState);
// getter
const { cartPriceInfo, asideCategoryInfo }: MenuGetterG = storeToRefs(menuStore);
// action
const { toogleCartDetailFlag, setScrollToViewCategory, setFooterPX, setCartImgPX } = menuStore;
const cartImgAnimationData = ref(null);
const hasOrderRequiredListFlag = computed(() => {
    let hasOrderRequiredFlag: boolean = true;
    for (let i = 0; i < requiredCategoryIDList.value.length; i++) {
        const categoryID = requiredCategoryIDList.value[i];
        const categoryitemOrderCount = asideCategoryInfo.value.asideCategoryItemOrderCountMap[`${categoryID}`];
        if (categoryitemOrderCount === 0) {
            hasOrderRequiredFlag = false;
            break;
        } else {
            continue;
        }
    }
});
interface ConfirmButtonInfoI {
    text: string;
    canOrderFlag: boolean;
    hasOrderRequiredFlag: boolean;
    requiredCategoryID: number;
    requireText: string;
}
const confirmButtonInfo: RefI<ConfirmButtonInfoI> = computed((): ConfirmButtonInfoI => {
    let hasOrderRequiredFlag: boolean = true;
    let requiredCategoryID: number = 0;
    for (let i = 0; i < requiredCategoryIDList.value.length; i++) {
        const categoryID = requiredCategoryIDList.value[i];
        const categoryitemOrderCount = asideCategoryInfo.value.asideCategoryItemOrderCountMap[`${categoryID}`];
        if (categoryitemOrderCount === 0) {
            hasOrderRequiredFlag = false;
            requiredCategoryID = categoryID;
            break;
        } else {
            continue;
        }
    }

    let text: string = "";
    let canOrderFlag: boolean = false;
    let requireText = "";
    const startDeliverPrice = shopInfo.value.startDeliverPrice;
    if (startDeliverPrice === 0 && cartPriceInfo.value.allOriginPrice === 0) {
        text = "请选购商品";
        if (!hasOrderRequiredFlag) {
            text = "";
        }
    } else if (cartPriceInfo.value.allOriginPrice === 0) {
        text = `¥${startDeliverPrice}起${businessType.value === 2 ? "送" : "做"}`;
        if (!hasOrderRequiredFlag) {
            requireText = "未点必选品";
        }
    } else if (cartPriceInfo.value.allOriginPrice >= startDeliverPrice) {
        text = "去结算";
        canOrderFlag = true;
        if (!hasOrderRequiredFlag) {
            text = "";
        }
    } else {
        text = `差¥${toFixedToNumber(startDeliverPrice - cartPriceInfo.value.allOriginPrice)}起${businessType.value === 2 ? "送" : "做"}`;
    }

    if (!hasOrderRequiredFlag) {
        requireText = "未点必选品";
        canOrderFlag = false;
    }
    return {
        text,
        canOrderFlag,
        hasOrderRequiredFlag,
        requiredCategoryID,
        requireText,
    };
});
onMounted(async () => {
    getFooterCartContainerHeight();
    getCartImgBoxHeight();
});
    const currentInstance = getCurrentInstance()

async function getFooterCartContainerHeight() {
    const res = await selectQuery("#footer-cart-container", currentInstance);
    setFooterPX(res.height);
}

async function getCartImgBoxHeight() {
    const res = await selectQuery("#cart-img-box", currentInstance);
    setCartImgPX(res.height);
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
    if (confirmButtonInfo.value.canOrderFlag) {
        router.navigateTo({
            name: "menu/confirm",
        });
    } else if (!confirmButtonInfo.value.hasOrderRequiredFlag) {
        const requiredCategoryID = confirmButtonInfo.value.requiredCategoryID;
        const requiredCategoryName = categoryListMap.value[`${requiredCategoryID}`].categoryName;
        console.log(categoryListMap.value);
        console.log(requiredCategoryName);
        showToast({
            title: `【${requiredCategoryName}】类别需要必选一项`,
            duration: 2000,
            mask: false,

        });
        setScrollToViewCategory(requiredCategoryID);
    } else {
        showToast({
            title: `起${businessType.value === 2 ? "送" : "做"}价格不足`,
            duration: 2000,
            mask: false,
        });
    }
}
function clickCartImg() {
    toogleCartDetailFlag();
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
        bottom: 25rpx;
        left: 20rpx;
        // transform: scale(0.95);

        // height: 120rpx;
        // width: 120rpx;
        // z-index: 600;
    }
    // .cart-img {
    //     height: 120rpx;
    //     width: 120rpx;
    // }

    .cart-all-count {
        position: absolute;
        right: 16rpx;
        top: 6rpx;
        height: 32rpx;
        min-width: 32rpx;
        padding: 0 6rpx;
        font-size: 22rpx;
        line-height: 32rpx;
        border-radius: 16rpx;
        box-sizing: border-box;
        text-align: center;
        // background-color: #fff;
        // background-color: #ff4b33;
    }
    .confirm-order {
        margin-right: 10rpx;
        font-size: 32rpx;

        width: 250rpx;
        background-color: #888;

        height: 80rpx;
        border-radius: 40rpx;
        color: #fff;
        .button-text-top {
            font-size: 22rpx;
        }
        .button-text-bottom {
            font-size: 24rpx;
        }
    }
}
</style>
