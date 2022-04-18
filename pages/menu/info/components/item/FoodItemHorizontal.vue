<template>
    <view class="food-item-horizontal-container flex-col" @click.stop="clickFoodItem(foodItem)">
        <img :src="foodItem.fullImgPath" alt="" class="food-img" />
        <view class="food-name line2">
            {{ foodItem.foodName }}<span class="food-unit">/{{ foodItem.unit }}</span>
        </view>
        <view class="food-price-add flex-row flex-a-center flex-j-between" @click.stop="addCount($event)" :style="{ color: shopInfo.mainColor }">
            <view class="food-price">¥{{ foodItem.price }}</view>
            <view class="food-add" :id="'add' + foodItem.foodID" :style="{ 'background-color': shopInfo.mainColor }"></view>
            <view v-for="addItem in addList" :key="addItem.random" class="food-add-x" :animation="addItem.animationXData">
                <view class="food-add-y" :animation="addItem.animationYData">
                    <view class="food-add food-add-copy" :style="{ 'background-color': shopInfo.mainColor }"></view>
                </view>
            </view>
        </view>
        <view v-if="foodItem.orderCount" class="food-order-count flex-row flex-ja-center" :style="{ 'background-color': shopInfo.mainColor }">{{ foodItem.orderCount }}</view>
    </view>
</template>

<script lang="ts" setup>
import { delaySync, selectQuery } from "@/utils/index";
import { watch, reactive, ref, getCurrentInstance, onMounted } from "vue";
import { mapMutation, mapState } from "@/utils/mapVuex";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import FoodAddMinusItem from "./FoodAddMinusItem.vue";
import { AddressItemI, CategoryItemI, ComputedMutationI, ComputedStateI, FoodItemI, PositionInfoI, ShopItemI } from "@/interface/index";
import { RefI } from "@/interface/vueInterface";
import { cartImgWidthHeightPX, countAddTransitionTime, foodAddMinusTransitionTime, foodAddWidthHeightPX } from "../../infoConfig";
import { MinusPromotionsObjectI } from "@/store/getters/menu";
import { AddItemI } from "./interface";

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

interface StateF {
    shopInfo: ComputedStateI<ShopItemI>;
    cartImgPositionInfo: ComputedStateI<PositionInfoI>;
}
interface MutationF {
    cartChange: ComputedMutationI<CartChangeParamI>;
    setCartImgAnimationFlag: ComputedMutationI<boolean>;
}
const { cartChange, setCartImgAnimationFlag }: MutationF = mapMutation(["cartChange", "setCartImgAnimationFlag"]);
const { shopInfo, cartImgPositionInfo }: StateF = mapState(["shopInfo", "cartImgPositionInfo"]);

onMounted(async () => {
    // if (props.foodItem.orderCount > 0) {
    //     // 组件初次挂载不使用动画
    //     showInfoFlag.value = true;
    // }
    // 获取曲线起始位置
});
const addList: AddItemI[] = reactive([]);

async function addCount() {
    const addPositionInfo: PositionInfoI = await getPositionInfo();
    const offsetLeft: number = addPositionInfo.left - cartImgPositionInfo.value.left;
    const offsetTop: number = cartImgPositionInfo.value.top - addPositionInfo.top;
    if (offsetLeft) {
        const addItem = {
            random: Math.random(),
            animationXData: null,
            animationYData: null,
            offsetInfo: {
                offsetLeft,
                offsetTop,
            },
        };
        addList.push(addItem);
        startAddTransition(addItem);
    }
    const count = props.foodItem.orderCount + 1;
    cartChange({
        foodItem: props.foodItem,
        count,
    });
}
async function getPositionInfo(): Promise<PositionInfoI> {
    const res = await selectQuery(`#add${props.foodItem.foodID}`, currentInstance);
    return {
        left: res.left,
        top: res.top,
    };
}
async function startAddTransition(addItem: AddItemI) {
    startAnimationX(addItem);
    startAnimationY(addItem);
    setCartImgAnimationFlag(true);
    await delaySync(countAddTransitionTime);
    setCartImgAnimationFlag(false);
    deleteItem(addItem);
}
async function startAnimationX(addItem: AddItemI): Promise<void> {
    const animationX = uni.createAnimation({});
    animationX.translateX(-(addItem.offsetInfo.offsetLeft - (cartImgWidthHeightPX - foodAddWidthHeightPX) / 2) / 10).step({
        duration: countAddTransitionTime / 4,
        timingFunction: "linear",
    });
    animationX.translateX(-(addItem.offsetInfo.offsetLeft - (cartImgWidthHeightPX - foodAddWidthHeightPX) / 2)).step({
        duration: (countAddTransitionTime * 3) / 4,
        timingFunction: "linear",
    });
    addItem.animationXData = animationX.export();
}
async function startAnimationY(addItem: AddItemI): Promise<void> {
    const animationY = uni.createAnimation({});
    animationY.translateY(-addItem.offsetInfo.offsetTop / 10).step({
        duration: countAddTransitionTime / 3,
        timingFunction: "ease-out",
    });
    animationY.translateY(addItem.offsetInfo.offsetTop + (cartImgWidthHeightPX - foodAddWidthHeightPX) / 2).step({
        duration: (countAddTransitionTime * 2) / 3,
        timingFunction: "ease-in",
    });
    addItem.animationYData = animationY.export();
}
function deleteItem(addItem: AddItemI) {
    const findIndex = addList.findIndex((item) => item.random === addItem.random);
    addList.splice(findIndex, 1);
}

function clickFoodItem(foodItem: FoodItemI) {
    emit("clickFoodItem", foodItem);
}
</script>

<style lang="scss" scoped>
.food-item-horizontal-container {
    position: relative;
    margin: 20rpx 10rpx 0 0;
    width: 230rpx;
    padding-bottom: 10rpx;
    background-color: #fff;
    border-radius: 12rpx;
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
        position: relative;
        padding: 10rpx 20rpx;
        font-size: 34rpx;
    }
    // .food-add-box {
    //     position: relative;
    //     width: 40rpx;
    //     height: 40rpx;
    // }
    .food-add {
        position: relative;
        // right: 270px;
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        // z-index: 10;
        // text-align: center;
        // line-height: 40rpx;
        // color: #fff;
    }
    .food-add-x {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 20rpx;
        width: 40rpx;
        height: 40rpx;
        z-index: 999;
    }
    .food-add-y {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }

    .food-add::after {
        content: "";
        position: absolute;
        width: 24rpx;
        height: 4rpx;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 2rpx;
    }

    .food-add::before {
        content: "";
        position: absolute;
        width: 4rpx;
        height: 24rpx;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 2rpx;
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
        padding: 0 8rpx;
        box-sizing: border-box;
    }
}
</style>
