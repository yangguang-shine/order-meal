<template>
    <view class="food-add-minus-container flex-row flex-ja-center" @click.stop>
        <view :animation="minusAnimationData" class="food-count-minus" :style="{ color: shopInfo.mainColor }" :class="mountedTransitionFlag ? '' : 'show-food-count-minus'" @click.stop="minusCount()">
            <view class="reduce-icon-css" :style="{ 'background-color': shopInfo.mainColor }"></view>
        </view>
        <view v-if="foodItem.orderCount" :class="mountedTransitionFlag ? '' : 'show-food-order-count'" :animation="countAnimationData" class="food-order-count">{{ foodItem.orderCount }}</view>
        <view class="food-count-add" :id="type + foodItem.foodID" :style="{ 'background-color': shopInfo.mainColor }" @click.stop="addCount($event)">
            <ReserveRemain v-if="foodItem.showReserveCountFlag" :reserveRemain="foodItem.reserveCount"></ReserveRemain>
        </view>
        <view v-for="item in addList" :key="item.random" class="food-count-add-animation-x" :animation="item.animationXData">
            <view class="food-count-add-animation-y" :animation="item.animationYData">
                <view class="food-count-add food-count-add-copy" :style="{ 'background-color': shopInfo.mainColor }"></view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { delaySync, selectQuery } from "@/utils/index";
import { watch, reactive, ref, getCurrentInstance, onMounted , toRefs} from "vue";
import { mapMutation, mapState } from "@/utils/mapVuex";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";

import { CategoryItemI, ComputedMutationI, ComputedStateI, FoodItemI, PositionInfoI, ShopItemI } from "@/interface/index";
import { RefI } from "@/interface/vueInterface";
import { cartImgWidthHeightPX, countAddTransitionTime, foodAddMinusTransitionTime, foodAddWidthHeightPX } from "../../infoConfig";
import ReserveRemain from "./ReserveRemain.vue";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";

import { AddItemI } from "./interface";
interface PropsI {
    foodItem: FoodItemI;
    type?: string // cart search collect main modal
}
interface CartChangeParamI {
    foodItem: FoodItemI;
    count: number;
}


interface MenuStateF {
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
// store
const menuStore: MenuStoreI = useMenuStore();
// state
const { cartCategoryList, cartDetailFlag, shopInfo, cartImgPositionInfo }: MenuStateF = toRefs(menuStore.menuState)
// action
const { cartChange, setCartDetailFlag, setCartImgAnimationFlag } = menuStore

const props: PropsI = withDefaults(defineProps<PropsI>(), {
    foodItem: {},
    type: 'main'

});
const addList: AddItemI[] = reactive([]);
const OriginFoodItem = props.foodItem;
const mountedTransitionFlag: RefI<boolean> = ref(true);
const showAddTransitionflag: RefI<boolean> = ref(false);

const countAnimation = uni.createAnimation({
    duration: foodAddMinusTransitionTime,
    timingFunction: "ease-in-out",
});
const minusAnimation = uni.createAnimation({
    duration: foodAddMinusTransitionTime,
    timingFunction: "ease-in-out",
});
const countAnimationData = ref(null);
const minusAnimationData = ref(null);


const addPositionInfo: RefI<PositionInfoI> = ref({
    left: 0,
    top: 0,
});
let offsetLeft = 0;
onMounted(async () => {
    if (props.foodItem.orderCount > 0) {
        // 组件初次挂载不使用动画
        mountedTransitionFlag.value = false;
    }
    // 获取曲线起始位置
});
watch(
    () => props.foodItem.orderCount,
    (newValue: number, oldValue: number) => {
        if (newValue >= 1 && oldValue === 0) {
            countAnimation.opacity(1).step();
            countAnimationData.value = countAnimation.export();
            minusAnimation.right("100rpx").rotate(-180).step();
            minusAnimationData.value = minusAnimation.export();
        } else if (newValue === 0) {
            countAnimation.opacity(0).step();
            countAnimationData.value = countAnimation.export();
            minusAnimation.right(0).rotate(0).step();
            minusAnimationData.value = minusAnimation.export();
        }
    }
);
async function getPositionInfo(): Promise<PositionInfoI> {
    const currentInstance = getCurrentInstance();
    const res = await selectQuery(`#${props.type}${props.foodItem.foodID}`, currentInstance);
    return {
        left: res.left,
        top: res.top,
    };
}
async function addCount(e: any) {
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

async function minusCount() {
    if (!props.foodItem.orderCount) return;
    const count = props.foodItem.orderCount - 1;
    cartChange({
        foodItem: props.foodItem,
        count,
    });
    if (cartCategoryList.value.length === 0 && cartDetailFlag.value) {
        setCartDetailFlag(false);
    }
}
function deleteItem(addItem: AddItemI) {
    const findIndex = addList.findIndex((item) => item.random === addItem.random);
    addList.splice(findIndex, 1);
}
interface OffsetInfoI {
    offsetTop: number;
    offsetLeft: number;
}
async function startAddTransition(addItem: AddItemI) {
    startAnimationX(addItem);
    startAnimationY(addItem);
    setCartImgAnimationFlag(true);
    await delaySync(countAddTransitionTime);
    setCartImgAnimationFlag(false);
    deleteItem(addItem);
}

function startAnimationX(addItem: AddItemI) {
    const animationX = uni.createAnimation({
        // duration: countAddTransitionTime,
        // timingFunction: "linear",
    });

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

function startAnimationY(addItem: AddItemI) {
    const animationY = uni.createAnimation({
        // duration: countAddTransitionTime,
        // timingFunction: "cubic-bezier(.72,-0.01,.66,.48)",
    });
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
</script>

<style lang="scss" scoped>
.food-add-minus-container {
    font-size: 26rpx;
    position: relative;
    min-width: 140rpx;
    height: 40rpx;
    .food-count-add-animation-x {
        position: absolute;
        right: 0;
        width: 40rpx;
        height: 40rpx;
        z-index: 999;
    }
    .food-count-add-animation-y {
        position: absolute;
        top: 0;
        width: 40rpx;
        height: 40rpx;
    }
    .food-count-add {
        position: absolute;
        // right: 270px;
        right: 0;
        top: 0;
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        // z-index: 10;
        // text-align: center;
        // line-height: 40rpx;
        // color: #fff;
    }
    .food-count-add-copy {
        //         top: 289.25px;
        // right: 165px;
    }

    .food-count-add::after {
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

    .food-count-add::before {
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

    .food-count-minus {
        position: absolute;
        top: 0;
        right: 0;
        width: 40rpx;
        height: 40rpx;
        border: 1px solid;
        border-radius: 50%;
        text-align: center;
        line-height: 40rpx;
        background-color: #fff;
        box-sizing: border-box;
        // transform: translateX(-100rpx);
    }
    .show-food-count-minus {
        right: 100rpx;
        transform: rotate(-180deg);
    }
    .food-count-minus-enter-from,
    .food-count-minus-leave-to {
        right: 0;
        transform: rotate(0);
        // transform: translateX(0) rotate(0);
    }
    .food-count-minus-enter-active,
    .food-count-minus-leave-active {
        transition: all ease-in-out 0.3s;
    }
    .food-count-minus-enter-to,
    .food-count-minus-leave-from {
        right: 100rpx;
        transform: rotate(-180deg);
        // transform: translateX(-100rpx) rotate(180deg);
    }

    // .food-count-minus-show {
    //     right: 100rpx;
    //     transform: rotate(-180deg);
    // }

    .food-order-count {
        font-size: 30rpx;
        line-height: 36rpx;
        color: #333;
        opacity: 0;
    }
    .show-food-order-count {
        opacity: 1;
    }
    .food-order-count-enter-from,
    .food-order-count-leave-to {
        opacity: 0;
    }
    .food-order-count-enter-active,
    .food-order-count-leave-active {
        // transition: all ease-in-out 3s;
        transition: all ease-in-out 1s;
    }

    .food-order-count-enter-to,
    .food-order-count-leave-from {
        opacity: 1;
    }

    .food-order-count-show {
        opacity: 1;
    }

    .reduce-icon-css {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 4rpx;
        width: 24rpx;
        transform: translate(-50%, -50%);
        border-radius: 2rpx;
    }
    .add-click-area {
        // position: absolute;
        // width: 60rpx;
        // height: 60rpx;
        // top: -10rpx;
        // left: -10rpx;
    }
}
</style>
