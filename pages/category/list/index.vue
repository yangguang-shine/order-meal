<template>
    <div class="category-list-container">
        <div v-for="(categoryItem, index) in categoryList" :key="index" class="category-item flex-row flex-j-between" @click="toFoodList(categoryItem)">
            <div>{{categoryItem.categoryName}}</div>
            <div @click.stop="editCategory(categoryItem)">×</div>
        </div>
        <div class="add" @click="addCategory">增加</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categoryList: [],
            shopID: ''
        }
    },
    onLoad(options) {
        this.shopID = options.shopID
    },
    async onShow() {
        try {
            const res = await this.$fetch.get('/api/category/list', { shopID: this.shopID })
            this.categoryList = res.data || [] 
        } catch(e) {
            console.log(e)
        }
    },
    methods: {
        toFoodList(categoryItem) {
            this.$myrouter.push({
                name: 'food/list',
                query: {
                    categoryID: categoryItem.categoryID,
                    categoryName: categoryItem.categoryName,
                    shopID: this.shopID
                }
            })
        },
        editCategory(categoryItem) {
            this.$myrouter.push({
                name: 'category/edit',
                query: {
                    categoryID: categoryItem.categoryID,
                    categoryName: categoryItem.categoryName,
                    shopID: this.shopID
                }
            })
        },
        addCategory() {
            this.$myrouter.push({
                name: 'category/edit',
                query: {
                    shopID: this.shopID
                }
            })
        },
    }
}
</script>
<style scoped lang="scss">
.category-list-container {
    padding: 30rpx;
    .category-item {
        margin-bottom: 20rpx;
    }
    .add {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
    }
}
</style>

