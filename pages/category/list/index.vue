<template>
    <div class="category-list-container">
        <div v-for="(categoryItem, index) in categoryList" :key="index" class="category-item flex-row flex-j-between" @click="toFoodList(categoryItem.categoryID)">
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
            categoryList: []
        }
    },
    async onShow() {
        try {
            const res = await this.$fetch.get('/api/category/list')
            this.categoryList = res.data || [] 
        } catch(e) {
            console.log(e)
        }
    },
    methods: {
        toFoodList(categoryID) {
            this.$myrouter.push({
                name: 'food/list',
                query: {
                    categoryID
                }
            })
        },
        editCategory(categoryItem) {
            console.log(categoryItem)
            this.$myrouter.push({
                name: 'category/edit',
                query: {
                    categoryID: categoryItem.categoryID,
                    categoryName: categoryItem.categoryName,
                }
            })
        },
        addCategory() {
            console.log(11)
            this.$myrouter.push({
                name: 'category/add'
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

