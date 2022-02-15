<template>
    <div class="news-container">
        <div class="flex-row flex-ja-center header-fix" :style="{'background-color': $mainColor}">
            <div class="input-box flex-row flex-ja-center">
                <input class="input-value" type="text" @confirm="getCuisineList" v-model="cuisineName">
                <image class="search-icon" src="/static/img/search-icon.svg" @click="getCuisineList"></image>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cuisineName: '',
            cuisineList: [],
            pageNum: 0
        }
    },
    methods: {
        async getCuisineList() {
            await this.$fetch('/api/entertainment/cuisineList', { cuisineName: this.cuisineName, pageNum: this.pageNum})
        }
    },
    onReachBottom() {
        
    }
}
</script>

<style lang="scss">
.news-container {
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
}

</style>