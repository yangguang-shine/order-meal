<template>
    <div class="news-container">
        <scroll-view scroll-x class="news-tab-list">
            <div class="tab-list-box flex-row">
                <div class="tab-item flex-shrink" v-for="(tabItem, index) in tabList" :key="index" @click="toSelectTabItem(tabItem)" :style="{'color': tabItem.type === selectTabItem.type ? '#333' : '', 'font-weight': tabItem.type === selectTabItem.type ? 'bold' : ''}">
                    {{tabItem.title}}
                </div>
                <div class="bottom-string" :style="{'background-color': $mainColor, 'left': ((selectTabItem.index * 2 + 1 ) * 100 / 10 / 2) + '%' }"></div>
            </div>
        </scroll-view>
        <div class="news-list-box">
            <div class="news-item" v-for="(newsItem, index) in newsList" :key="index" @click="toNewsDetail(newsItem)">
                <div class="new-title line2">{{newsItem.title}}</div>
                <div class="item-img-list flex-row flex-j-between">
                    <image class="item-img" :src="newsItem.thumbnail_pic_s" mode="scaleToFill"></image>
                    <image class="item-img" :src="newsItem.thumbnail_pic_s02" mode="scaleToFill"></image>
                    <image class="item-img" :src="newsItem.thumbnail_pic_s03" mode="scaleToFill"></image>
                </div>
                <div class="news-info flex-row flex-j-between">
                    <div>{{newsItem.author_name}}</div>
                    <div>{{newsItem.date}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabList: [
                {
                    title: '头条',
                    type: 'top',
                    index: 0
                },
                {
                    title: '社会',
                    type: 'shehui',
                    index: 1
                },
                {
                    title: '国内',
                    type: 'guonei',
                    index: 2
                },
                {
                    title: '国际',
                    type: 'guoji',
                    index: 3
                },
                {
                    title: '娱乐',
                    type: 'yule',
                    index: 4
                },
                {
                    title: '体育',
                    type: 'tiyu',
                    index: 5
                },
                {
                    title: '军事',
                    type: 'junshi',
                    index: 6
                },
                {
                    title: '科技',
                    type: 'keji',
                    index: 7
                },
                {
                    title: '财经',
                    type: 'caijing',
                    index: 8
                },
                {
                    title: '时尚',
                    type: 'shishang',
                    index: 9
                },
            ],
            newsList: [],
            selectTabItem: {}
        }
    },
    onLoad() {
        this.selectTabItem = this.tabList[0]
        this.getNewsList()
    },
    async onPullDownRefresh() {
        await this.getNewsList()
        uni.stopPullDownRefresh()
    },
    async onPullDownRefresh() {
        await this.getNewsList()
        uni.stopPullDownRefresh()
    },
    // async onReachBottom() {
    //     await this.getMoreNewsList()
    //     uni.stopPullDownRefresh()
    // },
    methods: {
        async getMoreNewsList() {
            try {
                this.$showLoading()
                const res = await this.$fetch.post('/api/entertainment/newsList', {
                    type: this.selectTabItem.type
                })
                if (!res.data.length) {
                    this.$showModal({
                        content: '暂无新闻'
                    })
                }
                this.newsList.push(...res.data)
                this.$hideLoading()
            } catch (e) {
                this.$hideLoading()
                console.log(e)
            }
        },
        async getNewsList() {
            try {
                this.$showLoading()
                const res = await this.$fetch.post('/api/entertainment/newsList', {
                    type: this.selectTabItem.type
                })
                this.newsList = res.data
                this.$hideLoading()
            } catch (e) {
                this.$hideLoading()
                console.log(e)
            }
        },
        toNewsDetail(newsItem) {
            window.open(newsItem.url)
        },
        toSelectTabItem(tabItem) {
            if (tabItem.type === this.selectTabItem.type) return;
            this.selectTabItem = tabItem
            this.getNewsList()
        }
    }
}
</script>

<style lang="scss">
.news-container {
    min-height: 100%;
    // padding: 0 30rpx;
    background-color: #f5f5f5;
    .news-tab-list {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 80rpx;
        // box-sizing: border-box;
        border-bottom: 2rpx solid #eee;
        background-color: #fff;
        z-index: 99;
    }
    .tab-list-box {
        position: relative;
        width: 1100rpx;
    }
    .tab-item {
        width: 110rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        color: #666;
    }
    .bottom-string {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 6rpx;
        width: 40rpx;
        border-radius: 3rpx;
        transition: all 300ms ease-in-out;
        transform: translateX(-50%)
    }
    .news-list-box {
        padding: 100rpx 20rpx 0; 
    }
    .news-item {
        padding: 20rpx 30rpx;
        background-color: #fff;
        border-radius: 16rpx;
        margin-bottom: 30rpx;
    }
    .new-title {
        font-size: 34rpx;
        font-weight: bold;
        margin-bottom: 20rpx;
    }
    .item-img-list {
        margin-bottom: 20rpx;
    }
    .item-img {
        height: 180rpx;
        width: 180rpx;
    }
    .news-info {
        font-size: 26rpx;
        color: #999;
    }
}
</style>