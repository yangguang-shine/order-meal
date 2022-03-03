<template>
    <div class="note-input-container note-input-container-show" @click.stop="hideNoteInput" @touchmove.stop.prevent>
        <div class="note-input-box note-input-box-show" @click.stop>
            <div class="cancel-confirm flex-row flex-a-center flex-j-between">
                <div class="cancel-button" @click="hideNoteInput">取消</div>
                <div class="confirm-button" @click="confirmNoteInput">完成</div>
            </div>
            <div class="textarea-box">
                <textarea class="textarea" v-model="noteInput" id="" placeholder="特殊请输入备注" :maxlength="maxlength"></textarea>
                <div class="letter-limit">{{noteInputLength}}/{{maxlength}}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { mapState, mapMutations } from '../../../../../utils/mapVuex'
import { computed ,ref} from 'vue'
const {noteText} = mapState('user', ['noteText'])
const {setNoteInputFlag, setNoteText } = mapMutations('user', ['setNoteInputFlag', "setNoteText"])
const noteInput = ref(noteText.value)
const maxlength = 20
const noteInputLength = computed(() => noteInput.value.length)
function hideNoteInput() {
    setNoteInputFlag(false)
}
function confirmNoteInput() {
    setNoteText(noteInput.value)
    setNoteInputFlag(false)
}
</script>

<style lang="scss" scoped>

.scroll {
    height: 400rpx;
    overflow-y: auto
}
.note-input-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0);
    z-index: 100;
    color: #333;
    transition: all ease-in-out 0.3s;
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
    .note-input-box-show {
        transform: translateY(0%);
    }
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
.note-input-container-show {
    background-color: rgba(0, 0, 0, 0.4);
}
</style>