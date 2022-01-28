<template>
    <div class="joke-container">
        <div class="joke-item" v-for="(jokeItem, index) in jokeList" :key="index">
            <div class="joke-content">
                {{jokeItem.content}}
            </div>
        </div>
    </div>
</template>

<script>
const pagesize = 20
const sort = 'desc'
export default {
    data() {
        return {
            jokeList: [],
            page: 1,
            time: `${(+new Date())}`.slice(3)
        }
    },
    async onPullDownRefresh() {
        this.page = 1
        this.time = `${(+new Date())}`.slice(3)
        await this.getJokeList()
        uni.stopPullDownRefresh()
    },
    async onReachBottom() {
        await this.getMoreJokeList()
    },
    onLoad() {
        this.getJokeList()
    },
    methods: {
        async getJokeList() {
            const res = await this.$fetch.post('/api/entertainment/jokeList', { 
                sort,
                page: this.page, 
                pagesize, sort, 
                time: this.time 
            })
            if (!res.data.length) {
                this.$showModal({
                    content: '暂无笑话'
                })
            }
            const jokeList = res.data || []
            // jokeList.forEach((item) => {
            //     item.contentList = item.content.split('\r\n')
            // })
            this.jokeList = jokeList
        },
        async getMoreJokeList() {
            this.page = this.page + 1
            const res = await this.$fetch.post('/api/entertainment/jokeList', { 
                sort,
                page: this.page, 
                pagesize, sort, 
                time: this.time 
             })
            if (!res.data.length) {
                this.$showModal({
                    content: '暂无笑话'
                })
            }
            const jokeList = res.data || []
            // jokeList.forEach((item) => {
            //     item.contentList = item.content.split('\r\n')
            // })
            this.jokeList.push(...jokeList)
        },
    }
}
</script>

<style lang="scss">
    .joke-container {
        min-height: 100%;
        background: #f5f5f5;
        padding: 0 20rpx;
        .joke-item {
            padding: 30rpx 20rpx;
        }
        .joke-content {
            text-indent: 2em;
        }
    }
</style>