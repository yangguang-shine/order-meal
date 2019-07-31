<template>
    <div class="category-name-box">
        <div>
            <span>名称：</span>
            <input type="text" v-model="categoryName">
        </div>
        <div class="button-box flex-row">
            <div class="flex-item" @click="changeCategory">修改</div>
            <div class="flex-item" @click="deleteCategory">删除</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categoryName: '',
            categoryID: '',
        }
    },
    onLoad(params) {
        console.log(1111)
        console.log(params)
        this.categoryName = params.categoryName
        this.categoryID = params.categoryID
    },
    methods: {
        async changeCategory() {
            try {
                await this.$fetch.post('/api/category/edit', { categoryName: this.categoryName, categoryID: this.categoryID })
                this.$myrouter.back()
            } catch (e) {
                console.log(e)
            }
        },
        async deleteCategory() {
            try {
                await this.$fetch.post('/api/category/delete', { categoryID: this.categoryID })
                this.$myrouter.back()
            } catch (e) {
                console.log(e)
            }
        },
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

