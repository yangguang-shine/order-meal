<template>
    <div class="category-name-box">
        <div>
            <span>名称：</span>
            <input type="text" v-model="categoryName">
        </div>
        <div v-if="categoryID" class="flex-row flex-j-around">
            <div class="category-button" @click="changeCategory">修改</div>
            <div class="category-button" @click="deleteCategory">删除</div>
        </div>
        <div v-else class="flex-row flex-j-center">
            <div class="category-button" @click="addCategory">增加</div>
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
        console.log(params)
        this.categoryName = params.categoryName || ''
        this.categoryID = params.categoryID || ''
        console.log(typeof this.categoryID)
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
        async addCategory() {
            try {
                await this.$fetch.post('/api/category/add', { categoryName: this.categoryName })
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
    .category-button {
        margin-top: 30rpx;
        height: 80rpx;
        width: 200rpx;
        border: 1px solid #eee;
        line-height: 80rpx;
        text-align: center;
    }
}
</style>

