<template>
    <div class="category-name-box">
        <div>
            <span>名称：</span>
            <input type="text" v-model="categoryName">
        </div>
        <div class="submit" @click="submit">
            提交
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categoryName: ''
        }
    },
    methods: {
        async submit() {
            try {
                if (!this.categoryName) {
                    console.log(111)
                    return
                }
                await this.$fetch.post('/api/category/add', { categoryName: this.categoryName } )
                this.$myrouter.back()
            } catch(e) {
                console.log(e)
            }
           
        }
    }
}
</script>
<style scoped lang="scss">
.category-name-box {
    .submit {
        margin-top: 20rpx;
        text-align: center;
    }
}
</style>

