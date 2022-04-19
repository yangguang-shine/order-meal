<template>
    <view class="food-item-container flex-item flex-row" :class="'food-item-container-' + mode" @click="clickFoodItem(foodItem)">
        <image class="food-img flex-shrink" :src="foodItem.fullImgPath" mode="scaleToFill"></image>
        <view class="food-info-box flex-item flex-col flex-j-between">
            <view class="food-name-description">
                <view class="food-name">{{ foodItem.foodName }}</view>
                <view class="food-description">{{ foodItem.description }}</view>
            </view>
            <view class="food-price-button flex-row flex-j-between flex-a-center">
                <view class="food-price">¥{{ foodItem.price }}</view>
                <FoodAddMinusItem v-if="foodItem.reserveCount" :foodItem="foodItem"></FoodAddMinusItem>
                <ReserveNotEnough v-else></ReserveNotEnough>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { delaySync, selectQuery } from "@/utils/index";
import { watch, reactive, ref, getCurrentInstance, onMounted } from "vue";
import { mapMutation, mapState } from "@/utils/mapVuex";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import FoodAddMinusItem from "./FoodAddMinusItem.vue";
import ReserveNotEnough from "./ReserveNotEnough.vue";
import { CategoryItemI, ComputedMutationI, ComputedStateI, FoodItemI, PositionInfoI, ShopItemI } from "@/interface/index";
import { RefI } from "@/interface/vueInterface";
import { cartImgWidthHeightPX, countAddTransitionTime, foodAddMinusTransitionTime } from "../../infoConfig";

interface PropsI {
    foodItem: FoodItemI;
    mode?: string; // large | midden | small
}
interface EmitI {
  (e: 'clickFoodItem', id: number): void
}
const props: PropsI = withDefaults(defineProps<PropsI>(), {
    foodItem: {},
    mode: "midden",
});
const emit = defineEmits<EmitI>()
interface CartChangeParamI {
    foodItem: FoodItemI;
    count: number;
}
const showInfoFlag: RefI<boolean> = ref(false);

interface StateF {
    cartCategoryList: ComputedStateI<CategoryItemI[]>;
    cartDetailFlag: ComputedStateI<boolean>;
    shopInfo: ComputedStateI<ShopItemI>;
    cartImgPositionInfo: ComputedStateI<PositionInfoI>;
}
interface MutationF {
    cartChange: ComputedMutationI<CartChangeParamI>;
    setCartDetailFlag: ComputedMutationI<boolean>;
    setCartImgAnimationFlag: ComputedMutationI<boolean>;
}
interface RandomStyleI {
    random: number;
    style: {
        top: number;
        right: number;
    };
}
const { cartChange, setCartDetailFlag, setCartImgAnimationFlag }: MutationF = mapMutation(["cartChange", "setCartDetailFlag", "setCartImgAnimationFlag"]);
const { cartCategoryList, cartDetailFlag, shopInfo, cartImgPositionInfo }: StateF = mapState(["cartCategoryList", "cartDetailFlag", "shopInfo", "cartImgPositionInfo"]);

onMounted(async () => {
    if (props.foodItem.orderCount > 0) {
        // 组件初次挂载不使用动画
        showInfoFlag.value = true;
    }
    // 获取曲线起始位置
});
function clickFoodItem(foodItem: FoodItemI) {
    emit('clickFoodItem', foodItem)
}
</script>

<style lang="scss" scoped>
.food-item-container, .food-item-container-midden {
    // margin: 20rpx 20rpx 0;
    padding: 20rpx;
    background-color: #fff;
    border-radius: 16rpx;
    .food-img {
        // padding: 6rpx 0;
        height: 150rpx;
        width: 150rpx;
    }
    .food-info-box {
        padding-left: 20rpx;
    }
    .food-name {
        font-weight: bold;
        font-size: 32rpx;
        line-height: 36rpx;
        // line-height: 44rpx;
        color: #333;
    }
    .food-description {
        font-size: 22rpx;
        line-height: 26rpx;

        // line-height: 30rpx;
        color: #666;
        margin-top: 10rpx;
    }
    .food-price {
        // line-height: 42rpx;
        color: $color-red;
        font-size: 36rpx;
        line-height: 40rpx;
        font-weight: bold;
    }
}
.food-item-container-small {
    // margin: 20rpx 20rpx 0;
    border-radius: 12rpx;
    .food-img {
        // padding: 6rpx 0;
        height: 120rpx;
        width: 120rpx;
    }
    .food-info-box {
        padding-left: 20rpx;
    }
    .food-name {
        // font-weight: bold;
        font-size: 30rpx;
        line-height: 34rpx;

        // line-height: 44rpx;
        // color: #333;
    }
    .food-description {
        font-size: 20rpx;
        line-height: 24rpx;

        // line-height: 30rpx;
        // color: #666;
        margin-top: 6rpx;
    }
    .food-price {
        // line-height: 42rpx;
        // color: $color-red;
        font-size: 34rpx;
        line-height: 38rpx;

        // font-weight: bold;
    }
}
</style>
