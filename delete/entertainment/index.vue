<template>
    <div class="news-container">
        <div class="to-joke entertainment-item" @click="toJoke">笑话</div>
        <div class="to-news entertainment-item" @click="toNews">新闻</div>
        <div class="to-news entertainment-item" @click="toCuisine">菜品大全</div>
        <div class="to-news entertainment-item" @click="toQuestion">智能问答</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newsList: []
        }
    },
    onLoad() {
    },
    methods: {
        toJoke() {
            this.$myrouter.navigateTo({
                name: 'entertainment/joke'
            })
        },
        toNews() {
            this.$myrouter.navigateTo({
                name: 'entertainment/news'
            })
        },
        toCuisine() {
            this.$myrouter.navigateTo({
                name: 'entertainment/cuisine'
            })
        },
        toQuestion() {
            this.$myrouter.navigateTo({
                name: 'entertainment/question'
            })
        },
    }
}
</script>

<style>
.entertainment-item {
    padding: 50rpx;
    text-align: center;

}
</style>