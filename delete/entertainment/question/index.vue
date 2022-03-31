<template>
    <div class="question-container">
        <div class="flex-row flex-ja-center header-fix" :style="{'background-color': $mainColor}">
            <div class="input-box flex-row flex-ja-center">
                <input class="input-value" type="text" @confirm="getAnswer" v-model="question" placeholder="请输入问题">
                <image class="search-icon" src="/static/img/search-icon.svg" @click="getAnswer"></image>
            </div>
        </div>
        <div class="answer-box">
            <div class="answer-title">
                {{answer.type}}
            </div>
            <div class="answer-content-item" v-for="(contentItem, index) in answer.contentList" :key="index">{{contentItem}}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            question: '',
            answer: {
                type: '',
                content: '',
                contentList: [],
            }
        }
    },
    // type: '标准回复',
    //  content:
    //   '北京今天7℃~20℃ 晴 0-3级 <5.4m/s\r\n建议着薄外套、开衫牛仔衫裤等服装。年老体弱者应适当添加衣物，宜着夹克衫、薄毛衣等。',
    methods: {
        async getAnswer() {
            try {
                if (!this.question) {
                    this.$showModal({
                        content: '请输入问题'
                    })
                    return
                }
                this.$showLoading()
                const answer = await this.$fetch('api/entertainment/getAnswer', { question: this.question })
                this.$hideLoading()
                if (!answer.content) {
                    this.$showModal({
                        content: '未找到答案'
                    })
                    return
                }
                answer.contentList = answer.content.split('\r\n')
                this.answer = answer
            } catch (e) {
                console.log(e)
                this.$hideLoading()
            }
        }
    },
    onReachBottom() {
        
    }
}
</script>

<style lang="scss">
.question-container {
    .header-fix {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 120rpx;
    }
    .input-box {
        position: relative;
        height: 80rpx;
        padding: 0 70rpx 0 30rpx;;
        border-radius: 40rpx;
        box-sizing: border-box;
        // border: 1px solid
        background-color: #fff;
        width: 80%;
    }
    .input-value {
        width: 100%;
        height: 100%;
        line-height: 80rpx;
    }
    .search-icon {
        position: absolute;
        padding: 10rpx 20rpx;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 40rpx;
        width: 40rpx;
    }
    .answer-box {
        padding: 130rpx 30rpx;
    }
    .answer-title {
        font-size: 36rpx;
        font-weight: bold;
        margin-bottom: 20rpx;
    }
    .answer-content-item {
        margin-bottom: 10rpx;
        font-size: 32rpx;
        text-indent: 2em;
    }
}

</style>