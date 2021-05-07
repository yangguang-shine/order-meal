<template>
    <div class="note-input-container" :class="{'note-input-container-show': showComponents }" @click.stop="hideNoteInput" @touchmove.stop.prevent>
        <div class="note-input-box" :class="{'note-input-box-show': showComponents}" @click.stop>
            <div class="cancel-confirm flex-row flex-a-center flex-j-between">
                <div class="cancel-button" @click="hideNoteInput">取消</div>
                <div class="confirm-button" @click="confirmNoteInput">完成</div>
            </div>
            <div class="textarea-box">
                <textarea class="textarea" v-model="noteInput" id="" placeholder="特殊请输入备注" maxlength="10"></textarea>
                <div class="letter-limit">{{noteInputLength}}/10</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        noteText: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            showComponents: false,
            noteInput: ''
        }
    },
    computed: {
        noteInputLength() {
            return this.noteInput.length
        }
    },
    async mounted() {
        this.noteInput = this.noteText
        await this.$delaySync(0)
        this.showComponents = true
    },
    methods: {
        async hideNoteInput() {
            this.showComponents = false
            await this.$delaySync(300)
            this.$emit('hideNoteInput')
        },
        async confirmNoteInput() {
            this.showComponents = false
            await this.$delaySync(300)
            this.$emit('confirmNoteInput', this.noteInput)
        },
    }
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