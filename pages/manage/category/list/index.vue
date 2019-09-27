<template>
    <div class="category-list-container">
        <div v-for="(categoryItem, index) in categoryList" :key="index" class="category-item flex-row flex-j-between flex-a-center" @click="toFoodList(categoryItem)">
            <div>{{categoryItem.categoryName}}</div>
            <div class="flex-row flex-a-center">
                <image class="edit-img" src='/static/img/shop-edit.svg' @click.stop="editCategory(categoryItem)"></image>
                <image class="delete-img" src='/static/img/shop-delete.svg' @click.stop="deleteCategory(categoryItem.categoryID)"></image>
            </div>
        </div>
        <div class="add" @click="addCategory" :style="{'color': $mainColor}">增加</div>
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
        this.init()

    },
    methods: {
        async init() {
            try {
                this.$showLoading()
                const res = await this.$fetch.get('/api/category/list', { shopID: this.shopID })
                this.categoryList = res.data || [] 
                this.$hideLoading()
            } catch(e) {
                console.log(e)
                this.$hideLoading()
                this.$showModal({
                    content: '菜品分类获取失败'
                })
            }
        },
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
        async deleteCategory(categoryID) {
            try {
                try {
                    await this.$showModal({
                        content: '删除菜品分类将一并删除菜品信息',
                        showCancell: true,
                        confirmText: '确认删除'
                    })
                } catch (e) {
                    return
                }
                this.$showLoading({
                    title: '删除中'
                })
                const res = await this.$fetch.post('/api/category/delete', { shopID: this.shopID, categoryID })
                this.$hideLoading()
                this.$showModal({
                    content: '删除成功'
                })
            } catch (e) {
                this.$hideLoading()
                this.$showModal({
                    content: '删除失败'
                })
                return 
            }
            try {
                this.$showLoading()
                await this.init()
                this.$hideLoading()
            } catch (e) {
                console.log(e)
                this.$hideLoading()
                this.$showModal({
                    content: '菜品分类获取失败'
                })
            }
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
    padding: 30rpx 30rpx 70rpx;
    font-size: 34rpx;
    .category-item {
        padding: 30rpx;
    }
    .delete-img, .edit-img {
        height: 30rpx;
        width: 30rpx
    }
    .delete-img {
        padding: 10rpx;
    }
    .edit-img {
        padding: 10rpx;
        margin-right: 40rpx;
    }
    .add {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        font-weight: bold;
        background-color: #fff;
    }
}
</style>

