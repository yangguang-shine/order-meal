<template>
    <view class="food-list-container flex-col">
        <!-- <image class="logo" src="/static/logo.png"></image> -->
        <div v-for="(foodItem, index) in foodList" :key="index" class="food-item flex-row " @click="toEdit(foodItem.foodID)">
            <image class="food-img" mode="scaleToFill" :src="foodItem.imgUrl ? host + foodItem.imgUrl : '/static/img/default-img.svg'"></image>
            <div class="food-info flex-item flex-col flex-j-between">
                <div class="food-name-info flex-row flex-a-end">
                    <view class="line1 food-name">
                        {{ foodItem.foodName }}哈哈哈哈
                    </view>
                    <view v-if="foodItem.unit" class="food-unit">/{{ foodItem.unit }}</view>
                </div>
                <div class="food-description line1">{{ foodItem.description }}</div>
                <div class="food-price">{{ foodItem.price }}/元</div>
            </div>
            <image class="delete-food" src="/static/img/shop-delete.svg" @click.stop="deleteFood(foodItem.foodID)"></image>
        </div>
        <!-- 	<div class="food-add" :style="{ color: $mainColor }" @click.stop="toAddFood">添加</div> -->
        <bottom-button title="增加信息" @clickButton="toAddFood"></bottom-button>
    </view>
</template>
<script>
import { host } from '@/config/host';
import BottomButton from '@/components/BottomButton.vue';
export default {
    data() {
        return {
            foodList: [],
            categoryID: '',
            categoryName: '',
            shopID: '',
            host
        };
    },
    components: {
        'bottom-button': BottomButton
    },
    onLoad(options) {
        console.log(this);
        this.categoryID = options.categoryID;
        this.categoryName = options.categoryName;
    },
    onShow() {
        this.init();
    },
    methods: {
        async init() {
            try {
                this.$showLoading();
                const res = await this.$fetch.get('/manage/food/list', { categoryID: this.categoryID, shopID: this.selectShopItem.shopID });
                this.foodList = res.data || [];
				this.$hideLoading();
				console.log(111)
                if (this.foodList.length === 0) {
                    this.$showToast({
                        title: '暂无菜品列表'
                    })
                }
            } catch (e) {
                this.$hideLoading();
                this.$showModal({
                    content: '菜品列表获取失败'
                });
                console.log(e);
            }
        },
        toEdit(foodID) {
            this.$myrouter.navigateTo({
                name: 'manage/food/edit',
                query: {
                    foodID: foodID,
                }
            });
        },
        async deleteFood(foodID) {
            try {
                await this.$showModal({
                    content: '删除该菜品信息',
                    showCancel: true,
                    confirmText: '确认删除'
                });
            } catch (e) {
                console.log(e);
                return;
            }
            try {
                this.$showLoading();
                const res = await this.$fetch.post('/manage/food/remove', { foodID, shopID: this.selectShopItem.shopID });
                this.$hideLoading();
                this.$showModal({
                    content: '删除成功'
                });
            } catch (e) {
                this.$hideLoading();
                this.$showModal({
                    content: '删除失败'
                });
                console.log(e);
                return;
            }
            try {
                this.$showLoading()
                await this.init()
                this.$hideLoading();
            } catch (e) {
                this.$hideLoading();
                this.$showModal({
                    content: '列表获取失败'
                });
                console.log(e);
            }
        },
        toAddFood() {
            this.$myrouter.navigateTo({
                name: 'manage/food/edit',
                query: {
                    categoryID: this.categoryID,
                    categoryName: this.categoryName,
                }
            });
        }
    }
};
</script>

<style lang="scss">
page {
    background-color: $color-bg-f5;
}
</style>
<style lang="scss" scoped>
.food-list-container {
    line-height: 1.1;
    min-height: 100%;
    font-size: 30rpx;
    padding: 20rpx;
    padding-bottom: 100rpx;
    box-sizing: border-box;
    .food-item {
        position: relative;
        margin-bottom: 30rpx;
        background-color: #fff;
        border-radius: 20rpx;
        padding: 20rpx;
    }
    .delete-food {
        position: absolute;
        top: 50%;
        right: 0;
        width: 30rpx;
        height: 30rpx;
        padding: 30rpx;
        transform: translateY(-50%);
    }
    .food-img {
        height: 150rpx;
        width: 150rpx;
        margin-right: 20rpx;
        border-radius: 10rpx;
    }
    .food-info {
        height: 150rpx;
    }
    .food-name {
        font-size: 32rpx;
        color: #333;
        font-weight: bold;
        max-width: 360rpx;
    }
    .food-unit {
        font-size: 24rpx;
        color: #999;
    }
    .food-description {
        font-size: 24rpx;
        color: #999;
        max-width: 450rpx;
    }
    .food-price {
        color: #666;
    }
    .food-delete {
        position: absolute;
        right: 10rpx;
        top: 10rpx;
        font-size: 40rpx;
    }
    .food-add {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 80rpx;
        width: 100%;
        text-align: center;
        line-height: 80rpx;
        font-weight: bold;
        background-color: #fff;
    }
}
</style>
