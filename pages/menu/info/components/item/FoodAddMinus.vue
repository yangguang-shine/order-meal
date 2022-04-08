<template>
    <view class="food-add-minus-container flex-row flex-ja-center">
        <!-- <MyTransition name="food-count-minus" :flag="!!foodItem.orderCount" :time="500" v-slot="slotProps">
            <view class="food-count-minus" :class="slotProps.addClass" @click.stop="minusCount()">
                <view class="add-click-area"></view>
                <view class="reduce-icon-css" :style="{ 'background-color': shopInfo.mainColor }"></view>
            </view>
        </MyTransition> -->
        <view :animation="minusAnimationData" class="food-count-minus" :style="{ color: shopInfo.mainColor }" :class="showInfoFlag ? 'show-food-count-minus' : ''" @click.stop="minusCount()">
            <view class="add-click-area"></view>
            <view class="reduce-icon-css" :style="{ 'background-color': shopInfo.mainColor }"></view>
        </view>
        <view v-if="foodItem.orderCount" :class="showInfoFlag ? 'show-food-order-count' : ''" :animation="countAnimationData" class="food-order-count">{{ foodItem.orderCount }}</view>

        <!-- <MyTransition name="food-order-count" :flag="!!foodItem.orderCount" :time="foodAddMinusTransitionTime" v-slot="slotProps">
            <view class="food-order-count" :class="slotProps.addClass">{{ foodItem.orderCount || "" }}</view>
        </MyTransition> -->
        <view class="food-count-add" :id="'add' + foodItem.foodID" :style="{ 'background-color': shopInfo.mainColor }" @click.stop="addCount($event)">
            <view class="add-click-area"></view>
        </view>
        <!-- <view v-for="item in list" :key="item.random" class="food-count-add food-count-add-copy" :style="{ 'background-color': shopInfo.mainColor, top: item.style.top + 'px', right: item.style.right + 'px' }"></view> -->
        <view v-for="item in list" :key="item.random" class="food-count-add-animation-x" :animation="animationXData">
            <view class="food-count-add-animation-y" :animation="animationYData">
                <view ref="foodCountAddRef" :id="'add' + foodItem.foodID"  class="food-count-add food-count-add-copy" :style="{ 'background-color': shopInfo.mainColor }"></view>
            </view>
        </view>
        <!-- <view ref="foodCountAddRef" :id="'add' + foodItem.foodID" :animation="addAnimationData" class="food-count-add food-count-add-copy" :style="{ 'background-color': shopInfo.mainColor }"></view> -->
    </view>
</template>

<script lang="ts" setup>
import { delaySync, getoffsetRight, selectQuery } from "@/utils/index";
import { watch, reactive, ref, getCurrentInstance, onMounted } from "vue";
import { mapMutation, mapState } from "@/utils/mapVuex";
import MyTransition from "@/components/MyTransition.vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";

import { CategoryItemI, ComputedMutationI, ComputedStateI, FoodItemI, PositionInfoI, ShopItemI } from "@/interface/index";
import { RefI } from "@/interface/vueInterface";
import { cartImgWidthHeightPX, countAddTransitionTime, foodAddMinusTransitionTime } from "../../infoConfig";
const currentInstance = getCurrentInstance();
interface PropsI {
    foodItem: FoodItemI;
    delay?: number
}
interface CartChangeParamI {
    foodItem: FoodItemI;
    count: number;
}
const list: RandomStyleI[] = reactive([]);
const OriginFoodItem = props.foodItem;
const showInfoFlag: RefI<boolean> = ref(false);
const showAddTransitionflag: RefI<boolean> = ref(false);

const foodCountAddRef: RefI<any> = ref(null);
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
const animationXData = ref(null);
const animationYData = ref(null);

interface StateF {
    cartCategoryList: ComputedStateI<CategoryItemI[]>;
    cartDetailFlag: ComputedStateI<boolean>;
    shopInfo: ComputedStateI<ShopItemI>;
    cartImgPositionInfo: ComputedStateI<PositionInfoI>;
}
interface MutationF {
    cartChange: ComputedMutationI<CartChangeParamI>;
    setCartDetailFlag: ComputedMutationI<boolean>;
}
interface RandomStyleI {
    random: number;
    style: {
        top: number;
        right: number;
    };
}
const { cartChange, setCartDetailFlag }: MutationF = mapMutation(["cartChange", "setCartDetailFlag"]);
const { cartCategoryList, cartDetailFlag, shopInfo, cartImgPositionInfo }: StateF = mapState(["cartCategoryList", "cartDetailFlag", "shopInfo", "cartImgPositionInfo"]);
const props: PropsI = withDefaults(defineProps<PropsI>(), {
    foodItem: {},
    delay: 0
});
const addPositionInfo: RefI<PositionInfoI> = ref({
    left: 0,
    top: 0,
});
let offsetRight = 0;
onMounted(async () => {
    if (props.foodItem.orderCount > 0) {
        // 组件初次挂载不使用动画
        showInfoFlag.value = true;
    }
    // 获取曲线起始位置
    await delaySync(props.delay)
    addPositionInfo.value = await getPositionInfo();
    offsetRight = addPositionInfo.value.left - cartImgPositionInfo.value.left;
});
watch(
    () => props.foodItem.orderCount,
    (newValue: number, oldValue: number) => {
        if (newValue === 1 && oldValue === 0) {
            countAnimation.opacity(1).step();
            countAnimationData.value = countAnimation.export();
            minusAnimation.right("100rpx").rotate(-180).step();
            minusAnimationData.value = minusAnimation.export();
        } else if (newValue === 0 && oldValue === 1) {
            countAnimation.opacity(0).step();
            countAnimationData.value = countAnimation.export();
            minusAnimation.right(0).rotate(0).step();
            minusAnimationData.value = minusAnimation.export();
        }
    }
);
async function getPositionInfo(): Promise<PositionInfoI> {
    const res = await selectQuery(`#add${props.foodItem.foodID}`, currentInstance);
    return {
        left: res.left,
        top: res.top,
    };
}
function addCount(e: any) {
    if (offsetRight) {
        list.push({
            random: Math.random(),
            style: {
                top: 0,
                right: 0,
            },
        });
        startAddTransition(list[list.length - 1]);
    }
    if (e.touches && e.touches.length) {
        const positionInfo = e.touches[0];
        const { pageX, pageY } = positionInfo;
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
    // console.log(count);
    // if (count === 0) {
    //     console.log("fffffff");
    //     canAddFlag = false;
    //     await delaySync(foodAddMinusTransitionTime);
    //     canAddFlag = true;
    // }
}
interface OffsetInfoI {
    offsetTop: number;
    offsetRight: number;
}
async function startAddTransition(item: RandomStyleI) {
    const offsetTop = cartImgPositionInfo.value.top - addPositionInfo.value.top;

    const offsetInfo: OffsetInfoI = {
        offsetTop,
        offsetRight,
    };
    startAnimationX(offsetInfo)
    startAnimationY(offsetInfo)
    await delaySync(countAddTransitionTime)
    deleteItem(item)
    // const addAnimation = uni.createAnimation({
    //     duration: 5000,
    //     timingFunction: "cubic-bezier(0,1.42,0,1.44)",
    // });

    // addAnimation.translateX(-offsetRight).translateY(offsetTop).step();
    // addAnimationData.value = addAnimation.export();
    //  = addAnimation.˝
}
function deleteItem(item: RandomStyleI) {
    console.log('>>>>')
    console.log(list)
    console.log(item)
    const findIndex = list.findIndex((item1) => item1 === item)
    list.splice(findIndex, 1)
    console.log('findIndex')
    console.log(findIndex)
}
function startAnimationX(offsetInfo: OffsetInfoI) {
    const animationX = uni.createAnimation({
        duration: countAddTransitionTime,
        timingFunction: "linear",
    });
    animationX.translateX(-(offsetInfo.offsetRight - cartImgWidthHeightPX / 2)).step()
    animationXData.value = animationX.export();

}
function startAnimationY(offsetInfo: OffsetInfoI) {
    const animationY = uni.createAnimation({
        duration: countAddTransitionTime,
        timingFunction: "cubic-bezier(.72,-0.01,.66,.48)",
    });
    // animationY.translateY(offsetInfo.offsetTop).step({
    //     duration: 200,
    // })
    animationY.translateY(offsetInfo.offsetTop).opacity(.2).step()
    animationYData.value = animationY.export();
}

// function startUp(item: RandomStyleI, offsetInfo: OffsetInfoI) {
//     return new Promise((resolve, reject) => {
//         const leftSpeed = 10;
//         let topSpeed = 10;
//         const timer = setInterval(() => {
//             item.style.right = item.style.right + leftSpeed;
//             item.style.top = item.style.top - topSpeed;
//             topSpeed = topSpeed - 2;
//             console.log(item.style.top);
//             if (item.style.top > offsetInfo.offsetTop || item.style.right > offsetInfo.offsetRight) {
//                 clearInterval(timer);
//                 console.log(list);
//                 resolve(true);
//             }
//         }, 16);
//     });
// }
// function startDowm(item: RandomStyleI, count: number = 1): void {
//     const leftSpeed = 4;
//     const topSpeed = 1;
//     let right = 0;
//     let top = 0;
//     right = item.style.right + 2;
//     top = topSpeed * count;
//     item.style.right = right;
//     item.style.top = item.style.top - topSpeed * count;
//     return startDowm(item, count + 1);
// }
// addCount(foodItem) {
//     if (!this.addCountState) return;
//     this.addCountState = false;
//     foodItem.orderCount += 1;
//     this.cartCountChange(foodItem);
//     this.addCountState = true;
//     if (!this.cartCategoryList.length) this.showCartDetail = false;
// },
// minusCount(foodItem) {
//     if (!this.minusCountState) return;
//     this.minusCountState = false;
//     foodItem.orderCount -= 1;
//     this.cartCountChange(foodItem);
//     this.minusCountState = true;
//     if (!this.cartCategoryList.length) this.showCartDetail = false;
// },
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
        z-index: 5;

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
        z-index: 10;
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
        transform: rotate(0);
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
