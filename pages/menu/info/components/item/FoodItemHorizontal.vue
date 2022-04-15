<template>
    <view class="food-item-horizontal-container flex-col " @click="clickFoodItem(foodItem)">
        <img :src="foodItem.fullImgPath" alt="" class="food-img" />
        <div class="food-name line2">
            {{ foodItem.foodName }}<span class="food-unit">/{{ foodItem.unit }}</span>
        </div>
        <div class="food-price-add flex-row flex-a-center flex-j-between" :style="{ color: shopInfo.mainColor }">
            <div class="food-price">¥{{ foodItem.price }}</div>
            <div class="food-add">+</div>
        </div>
        <div class="food-order-count flex-row flex-ja-center" :style="{ 'background-color': shopInfo.mainColor }">{{ foodItem.orderCount }}</div>
    </view>
</template>

<script lang="ts" setup>
import { delaySync, selectQuery } from "@/utils/index";
import { watch, reactive, ref, getCurrentInstance, onMounted } from "vue";
import { mapMutation, mapState } from "@/utils/mapVuex";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import FoodAddMinusItem from "./FoodAddMinusItem.vue";
import { CategoryItemI, ComputedMutationI, ComputedStateI, FoodItemI, PositionInfoI, ShopItemI } from "@/interface/index";
import { RefI } from "@/interface/vueInterface";
import { cartImgWidthHeightPX, countAddTransitionTime, foodAddMinusTransitionTime } from "../../infoConfig";

// const emit = defineEmits(['change', 'update'])

// // 基于类型
// const emit = defineEmits<{
//   (e: 'change', id: number): void
//   (e: 'update', value: string): void
// }>()

const currentInstance = getCurrentInstance();
interface PropsI {
    foodItem: FoodItemI;
}
interface EmitI {
    (e: "clickFoodItem", id: number): void;
}
const props: PropsI = withDefaults(defineProps<PropsI>(), {
    foodItem: {},
});
const emit = defineEmits<EmitI>();
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
    emit("clickFoodItem", foodItem);
}
</script>

<style lang="scss" scoped>
.food-item-horizontal-container {
    position: relative;
    // height: 400rpx;
    margin: 20rpx 10rpx 0 0;
    width: 230rpx;
    background-color: #fff;
    border-top-left-radius: 12rpx;
    border-top-right-radius: 12rpx;
    .food-img {
        width: 230rpx;
        height: 230rpx;
    }
    .food-name {
        padding: 12rpx 20rpx 0;
        font-weight: bold;
        font-size: 34rpx;
        height: 80rpx;
    }
    .food-unit {
        font-weight: normal;
        font-size: 24rpx;
        color: #999;
    }
    .food-price-add {
        padding: 10rpx 20rpx;
    }
    .food-order-count {
        position: absolute;
        top: -2rpx;
        right: -2rpx;
        min-width: 30rpx;
        height: 30rpx;
        border-radius: 15rpx;
        color: #fff;
        font-size: 22rpx;
    }
}
</style>
