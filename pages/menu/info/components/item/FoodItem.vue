<template>
    <view class="food-item-container flex-item flex-row" :class="'food-item-container-' + mode" @click="clickFoodItem(foodItem)">
        <image :id="`${type}-${foodItem.foodID}`" class="food-img flex-shrink" :src="foodItem.currentImg" mode="scaleToFill"></image>
        <view class="food-info-box flex-item flex-col flex-j-between">
            <view class="food-name-description">
                <view class="food-name line1">{{ foodItem.foodName }}</view>
                <view class="food-description line1">{{ foodItem.description }}</view>
            </view>
            <view class="food-price-button flex-row flex-j-between flex-a-center">
                <view class="food-price" :style="{'color': $mainColor}">¥{{ foodItem.price }}</view>
                <FoodAddMinusItem v-if="foodItem.reserveCount > 0" :foodItem="foodItem" :type="type"></FoodAddMinusItem>
                <ReserveNotEnough v-else></ReserveNotEnough>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { watch, reactive, ref, getCurrentInstance, onMounted, toRefs } from "vue";
import FoodAddMinusItem from "./FoodAddMinusItem.vue";
import ReserveNotEnough from "./ReserveNotEnough.vue";
import { FoodItemI } from "@/interface/index";
import { RefI } from "@/interface/vueInterface";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { MenuStateG } from "@/piniaStore/menu/state";

interface PropsI {
    foodItem: FoodItemI; 
    mode?: string; // large | midden | small
    type?: string,
}
interface EmitI {
  (e: 'clickFoodItem', id: number): void
}
const props: PropsI = withDefaults(defineProps<PropsI>(), {
    foodItem: {},
    mode: "midden",
    type: 'vertical',
});
const emit = defineEmits<EmitI>()
interface CartChangeParamI {
    foodItem: FoodItemI;
    count: number;
}
const currentInstance = getCurrentInstance()
const showInfoFlag: RefI<boolean> = ref(false);

// store
const menuStore: MenuStoreI = useMenuStore();
// state
const { shopInfo,   }: MenuStateG = toRefs(menuStore.menuState)
// action
const { setFoodItemVerticalImgMap, setFoodItemCartDetailImgMap, setFoodItemCollectFoodImgMap, setFoodItemSearchFoodImgMap } = menuStore
onMounted(async () => {
    if (props.type === 'vertical') {
        setFoodItemVerticalImgMap(props.foodItem.foodID, currentInstance)
    } else if (props.type === 'cart-detail') {
        setFoodItemCartDetailImgMap(props.foodItem.foodID, currentInstance)
    } else if (props.type === 'collect-food') {
        setFoodItemCollectFoodImgMap(props.foodItem.foodID, currentInstance)
    } else if (props.type === 'search-food') {
        setFoodItemSearchFoodImgMap(props.foodItem.foodID, currentInstance)
    } 
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
        border-radius: 8rpx;
    }
    .food-info-box {
        padding-left: 20rpx;
        width: 340rpx;
        // overflow: hidden;
    }
    .food-name-description {
        width: 100%;
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
        // color: $color-red;
        font-size: 36rpx;
        line-height: 40rpx;
        font-weight: bold;
        // color: #ff4b33;
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
        // color: #ff4b33;

        // font-weight: bold;
    }
}
</style>
