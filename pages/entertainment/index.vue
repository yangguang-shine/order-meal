<template>
    <div class="news-container"></div>
</template>

<script>
export default {
    data() {
        return {
            newsList: []
        }
    },
    onLoad() {
        this.init()
    },
    methods: {
        async init() {
            const res = await this.$fetch.get('/api/entertainment/newsList', {  })
            console.log(res)
        }
    }
}
</script>

<style>

</style>