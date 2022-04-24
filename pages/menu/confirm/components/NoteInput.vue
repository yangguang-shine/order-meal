<template>
    <view class="note-input-container" @click.stop="hideNoteInput" @touchmove.stop.prevent>
        <view :animation="overlayAnimationData" class="note-input-overlay"></view>
        <view :animation="mainAnimationData" class="note-input-box" @click.stop>
            <view class="cancel-confirm flex-row flex-a-center flex-j-between">
                <view class="cancel-button" @click="hideNoteInput">取消</view>
                <view class="confirm-button" @click="confirmNoteInput">完成</view>
            </view>
            <view class="textarea-box">
                <textarea class="textarea" v-model="noteInput" id="" placeholder="特殊请输入备注" :maxlength="maxlength"></textarea>
                <view class="letter-limit">{{ noteInputLength }}/{{ maxlength }}</view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { mapState, mapMutation } from "@/utils/mapVuex";
import { computed, ref } from "vue";
import { ComputedStateI, ComputedMutationI } from "@/interface/vuex";
import { ComputedI, RefI } from "@/interface/vueInterface";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { noteInputTransionTime } from "../comfirmConfig";
import { delaySync } from "@/utils/";
import useOverlayAnimation from "@/utils/useOverlayAnimation";

interface StateF {
    noteText: ComputedStateI<string>;
}
interface MutationF {
    setNoteInputFlag: ComputedMutationI<boolean>;
    setNoteText: ComputedMutationI<string>;
}
const { noteText }: StateF = mapState();
const { setNoteInputFlag, setNoteText }: MutationF = mapMutation();
const noteInput: RefI<string> = ref(noteText.value);
const maxlength: number = 20;
const noteInputLength: ComputedI<number> = computed(() => noteInput.value.length);

const { overlayAnimationData, mainAnimationData, toStartAnimation, toEndAnimation } = useOverlayAnimation({
    duration: noteInputTransionTime,
    timingFunction: "ease-in-out",
});

onLoad(() => {
    toStartAnimation();
});
async function hideNoteInput() {
    toEndAnimation();
    await delaySync(noteInputTransionTime);
    setNoteInputFlag(false);
}
async function confirmNoteInput() {
    setNoteText(noteInput.value);
    toEndAnimation();
    await delaySync(noteInputTransionTime);
    setNoteInputFlag(false);
}
</script>

<style lang="scss" scoped>
.scroll {
    height: 400rpx;
    overflow-y: auto;
}
.note-input-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    color: #333;
    .note-input-overlay {
        position: absolute;
        top: 0%;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
    }
    .note-input-box {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        padding: 0 32rpx 300rpx;
        background-color: #fff;
        transition: all ease-in-out 0.3s;
        transform: translateY(100%);
    }
    // .note-input-box-show {
    //     transform: translateY(0%);
    // }
    .cancel-confirm {
        line-height: 100rpx;
    }
    .cancel-button {
        font-size: 32rpx;
        color: #333;
    }
    .confirm-button {
        font-size: 32rpx;
        color: #999;
    }
    .textarea-box {
        color: #999;
        position: relative;
    }
    .letter-limit {
        position: absolute;
        right: 24rpx;
        bottom: 24rpx;
        font-size: 24rpx;
        line-height: 28rpx;
        color: #999;
    }
    .textarea {
        background-color: #eee;
        width: 686rpx;
        height: 176rpx;
        box-sizing: border-box;
        padding: 24rpx;
        font-size: 24rpx;
        color: #333;
        background-color: #fafafa;
        border: 2rpx solid #d3d3d3;
        border-radius: 8rpx;
    }
    .textarea-placeholder {
        color: #999;
    }
}
</style>
