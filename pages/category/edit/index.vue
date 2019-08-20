<template>
    <div class="category-name-box">
        <div class="flex-row flex-a-center">
            <div class="categpry-title">名称：</div>
            <input class="categpry-info" type="text" v-model="categoryName">
        </div>
        <div v-if="categoryID" class="flex-row flex-j-around">
            <div class="category-button" :style="{'background': $mainColor}" @click="changeCategory">修改</div>
            <div class="category-button button-delete"  @click="deleteCategory">删除</div>
        </div>
        <div v-else class="flex-row flex-j-center">
            <div class="category-button" :style="{'background': $mainColor}" @click="addCategory">增加</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categoryName: '',
            categoryID: '',
            shopID: ''
        }
    },
    onLoad(params) {
        console.log(params)
        this.categoryName = params.categoryName || `菜品分类${Math.random().toString(36).slice(2, 4)}`
        this.categoryID = params.categoryID || ''
        this.shopID = params.shopID || ''
    },
    methods: {
        async changeCategory() {
            try {
                await this.$fetch.post('/api/category/edit', { categoryName: this.categoryName, categoryID: this.categoryID, shopID: this.shopID })
                this.$myrouter.back()
            } catch (e) {
                console.log(e)
            }
        },
        async deleteCategory() {
            try {
                await this.$fetch.post('/api/category/delete', { categoryID: this.categoryID, shopID: this.shopID })
                this.$myrouter.back()
            } catch (e) {
                console.log(e)
            }
        },
        async addCategory() {
            try {
                await this.$fetch.post('/api/category/add', { categoryName: this.categoryName, shopID: this.shopID })
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
    padding: 30rpx;
    font-size: 30;
    line-height: 1;
    .categpry-title, .categpry-info  {
        height: 50rpx;
        line-height: 50rpx;
    }
    .category-button {
        margin-top: 50rpx;
        height: 80rpx;
        width: 300rpx;
        color: #fff;
        line-height: 80rpx;
        text-align: center;
        border-radius: 40rpx
    }
    .button-delete {
        background-color: #999;
    }
}
</style>

