<template>
    <div class="other-info-container">
        <div class="other-info-item flex-row flex-a-center flex-j-between">
            <div class="left-title">支付方式</div>
            <div class="right-title">在线支付</div>
        </div>
        <div class="other-info-item flex-row flex-a-center flex-j-between" @click="showNoteInput">
            <div class="left-title">备注</div>
            <div v-if="noteText" class="right-title note-text line1">{{noteText}}</div>
            <div v-else class="right-title note-tip">特殊要求请输入备注</div>
            <image class="arrow-right-icon" src="/static/img/user-confirm/arrow-right.png" mode=""></image>
        </div>
        <div class="other-info-item other-info-invoice flex-row flex-a-center flex-j-between">
            <div class="left-title">发票</div>
            <div class="right-title invoice-info">暂不支持开发票</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { mapState, mapMutation } from "../../../../../utils/mapVuex";
const { noteText } = mapState(["noteText"]);
const {setNoteInputFlag } = mapMutation(['setNoteInputFlag'])
function showNoteInput() {
    setNoteInputFlag(true)
}
</script>

<style lang="scss" scoped>
.other-info-container {
    padding: 0 20rpx;
    background-color: #fff;
    font-size: 28rpx;
    margin-top: 20rpx;
    border-radius: 12rpx;
    .other-info-item {
        position: relative;
        height: 88rpx;
        border-bottom: 1rpx solid #e4e4e4;
        padding-right: 34rpx;
    }
    .other-info-invoice {
        padding-right: 0;
    }
    .arrow-right-icon {
        position: absolute;
        top: 50%;
        right: 6rpx;
        width: 12rpx;
        height: 22rpx;
        transform: translateY(-50%);
    }
    .other-info-item:last-child {
        border-bottom: none;
    }
    .note-tip {
        color: #999;
    }
    .note-text {
        max-width: 400rpx;
    }
    .invoice-info {
        color: #ccc;
    }
}
</style>