<template>
    <div class="category-list-container">
        <div v-for="(categoryItem, index) in categoryList" :key="index" class="category-item flex-row flex-j-between flex-a-center" @click="toFoodList(categoryItem)">
            <div class="category-name line1" :style="{'color': $mainColor2}">{{categoryItem.categoryName}}</div>
            <div class="flex-row flex-a-center">
	<!-- 			<view class="to-see-detail" @click.stop="toFoodList(categoryItem)">
					去查看
				</view> -->
                <image class="edit-img" src='/static/img/shop-edit.svg' @click.stop="editCategory(categoryItem)"></image>
                <image class="delete-img" src='/static/img/shop-delete.svg' @click.stop="deleteCategory(categoryItem.categoryID)"></image>
            </div>
        </div>
		<bottom-button title="增加分类" @clickButton="addCategory"></bottom-button>
    </div>
</template>

<script>
	import BottomButton from '@/components/BottomButton.vue';
export default {
    data() {
        return {
            categoryList: [],
        }
    },
	components: {
		'bottom-button': BottomButton
	},
    onLoad(options) {
		if  (!this.selectShopItem.shopID) {
			this.$showModal({
				content: '缺少shopID'
			})
		}
    },
    async onShow() {
        this.init()
    },
    methods: {
        async init() {
            try {
                this.$showLoading()
                const categoryList = await this.$fetch('manage/category/list', { shopID: this.selectShopItem.shopID })
                this.categoryList = categoryList || [] 
                this.$hideLoading()
                if (this.categoryList.length === 0) {
                    this.$showToast({
                        title: '暂无菜品分类列表'
                    })
                }
            } catch(e) {
                console.log(e)
                this.$hideLoading()
                this.$showModal({
                    content: '菜品分类获取失败'
                })
            }
        },
        toFoodList(categoryItem) {
            this.$myrouter.navigateTo({
                name: 'manage/food/list',
                query: {
                    categoryID: categoryItem.categoryID,
                    categoryName: categoryItem.categoryName,
                }
            })
        },
        editCategory(categoryItem) {
            this.$myrouter.navigateTo({
                name: 'manage/category/edit',
                query: {
                    categoryID: categoryItem.categoryID,
                    categoryName: categoryItem.categoryName,
                }
            })
        },
        async deleteCategory(categoryID) {
            try {
                try {
                    await this.$showModal({
                        content: '删除菜品分类将一并删除菜品信息',
                        showCancel: true,
                        confirmText: '确认删除'
                    })
                } catch (e) {
                    return
                }
                this.$showLoading({
                    title: '删除中'
                })
                await this.$fetch('manage/category/remove', { shopID: this.selectShopItem.shopID, categoryID })
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
            this.$myrouter.navigateTo({
                name: 'manage/category/edit',
            })
        },
    }
}
</script>
<style lang="scss">
	page {
		background-color: $color-bg-f5;
	}
</style>
<style scoped lang="scss">

.category-list-container {
    padding: 20rpx 20rpx 100rpx;
    font-size: 34rpx;
    .category-item {
		height: 50rpx;
        padding: 20rpx 30rpx 20rpx 40rpx;
		line-height: 50rpx;
		border-radius: 45rpx;
		background-color: #fff;
		margin-bottom: 26rpx;
    }
	.category-name {
		max-width: 400rpx;
	}
	.to-see-detail, .to-open {
		font-size: 24rpx;
		color: #7f7f7f;
		margin-right: 20rpx;
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
        margin-right: 10rpx;
    }

}
</style>

