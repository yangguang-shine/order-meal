<template>
    <div class="joke-container"></div>
</template>

<script>
export default {
    data() {
        return {
            jokeList: []
        }
    },
    onLoad() {
        this.init()
    },
    methods: {
        async init() {
            const res = await this.$fetch.get('/api/entertainment/jokeList', {  })
            console.log(res)
        }
    }
}
</script>

<style>

</style>