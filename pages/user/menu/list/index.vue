<template>
    <div class="menu-container flex-col">
        <!-- <div class="menu-header"></div> -->
        <div class="order-main flex-item flex-row" :style="{ 'padding-bottom': minusPromotionsTitle ? '50rpx' : '' }">
            <scroll-view scroll-y class="category-aside-box">
                <div class="aside-category-item" v-for="(asideCategoryItem, index) in asideCategoryList" :key="index" :style="{
						'background-color': selectCategoryTabId === asideCategoryItem.scrollTabID ? '#fff' : '',
						color: selectCategoryTabId === asideCategoryItem.scrollTabID ? $mainColor : ''
					}" @click="changeSelectCategoryTab(asideCategoryItem.scrollTabID)">
                    {{ asideCategoryItem.categoryName }}
                    <div v-if="asideCategoryItem.orderCount" class="category-order-count" :style="{ background: $mainColor }">{{ asideCategoryItem.orderCount }}</div>
                </div>
            </scroll-view>
            <scroll-view scroll-y scroll-with-animation :scroll-into-view="scrollIntoCategoryID" class="food-main-box flex-item">
                <div class="food-category-list-item" :data-food-category-item="JSON.stringify(foodCategoryItem)" v-for="(foodCategoryItem, index) in foodCategoryList" :key="index">
                    <div :id="foodCategoryItem.scrollTabID" class="food-category-name">{{ foodCategoryItem.categoryName }}</div>
                    <div class="food-item flex-item flex-row" v-for="(foodItem, foodIndex) in foodCategoryItem.foodList" :key="foodIndex">
                        <image class="food-img  flex-shrink" :src="host + foodItem.imgUrl" mode="scaleToFill"></image>
                        <div class="food-info-box flex-item flex-col flex-j-between">
                            <div class="food-name-description">
                                <div class="food-name">{{ foodItem.foodName }}</div>
                                <div class="food-description">{{ foodItem.description }}</div>
                            </div>
                            <div class="food-price-button flex-row flex-j-between flex-a-center">
                                <div class="food-price">¥{{ foodItem.price }}</div>
                                <div v-if="foodItem.orderCount < 1" class="food-count-add" :style="{ 'background-color': $mainColor }" @click="addCount(foodCategoryItem.categoryID, foodItem)"></div>
                                <div v-else class="flex-row flex-a-center">
                                    <div class="food-count-minus" :style="{ color: $mainColor }" @click="minusCount(foodCategoryItem.categoryID, foodItem)">
                                        <div class="reduce-icon-css" :style="{ 'background-color': $mainColor }"></div>
                                    </div>
                                    <div class="food-order-count">{{ foodItem.orderCount }}</div>
                                    <div class="food-count-add" :style="{ 'background-color': $mainColor }" @click="addCount(foodCategoryItem.categoryID, foodItem)"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </scroll-view>
        </div>
        <div v-if="minusPromotionsTitle" class="promotion-title center">{{ minusPromotionsTitle }}</div>
        <div class="footer-cart flex-row flex-j-between flex-a-center">
            <div class="cart-img-box">
                <image class="cart-img" @click="changeShowCartDetail" src="/static/img/cart-icon.png" mode="scaleToFill"></image>
                <div v-if="allCartFoodCount" class="cart-all-count" :style="{ background: $mainColor }">{{ allCartFoodCount }}</div>
            </div>
            <div class="flex-item cart-all-amount">
                <span v-if="cartFoodList.length" class="cart-all-discount-price">{{ cartPriceInfo.cartAlldiscountPrice }}</span>
                <span v-if="cartPriceInfo.discountPrice" class="cart-all-origin-price">{{ cartPriceInfo.cartAllOriginPrice }}</span>
            </div>
            <div class="com-button confirm-order" :style="{ 'background-color': cartFoodListMainColor }" @click="toComfirmOrder">去下单</div>
        </div>
        <div v-if="showCartDetail" class="cart-detail-mask" @click.stop="showCartDetail = false">
            <div class="cart-detail-box" :style="{ 'padding-bottom': minusPromotionsTitle ? '60rpx' : '' }" @touchmove.stop>
                <div class="cart-select-box flex-row flex-j-between flex-a-center" @click.stop>
                    <div class="select-goods-title">已选商品</div>
                    <image class="delete-all-icon" src="/static/img/shop-delete.svg" @click="cartClearCart"></image>
                </div>
                <scroll-view scroll-y class="cart-detail-list-box" @click.stop>
                    <div class="food-category-item" v-for="(foodCategoryItem, index) in cartFoodList" :key="index">
                        <div class="cart-food-item flex-row" v-for="(cartFoodItem, cartFoodIndex) in foodCategoryItem.foodList" :key="cartFoodIndex">
                            <image v-if="cartFoodItem.orderCount" class="cart-food-img flex-shrink" :src="cartFoodItem.imgUrl ? host + cartFoodItem.imgUrl : '/static/img/default-img.svg'" mode="scaleToFill"></image>
                            <div v-if="cartFoodItem.orderCount" class="cart-food-info-box flex-item flex-col flex-j-between">
                                <div class="cart-food-name-description">
                                    <div class="cart-food-name">{{ cartFoodItem.foodName }}</div>
                                    <div class="cart-food-description">{{ cartFoodItem.description }}</div>
                                </div>
                                <div class="cart-food-price-button flex-row flex-j-between flex-a-center">
                                    <div class="cart-food-price">¥{{ cartFoodItem.price }}</div>
                                    <div class="flex-row flex-a-center">
                                        <view class="food-item-amount">总价: {{ cartFoodItem.foodItemAmount }}</view>
                                        <div v-if="cartFoodItem.orderCount < 1" class="food-count-add" :style="{ 'background-color': $mainColor }" @click="addCount(foodCategoryItem.categoryID, cartFoodItem)"></div>
                                        <div v-else class="flex-row flex-a-center">
                                            <div class="food-count-minus" :style="{ color: $mainColor }" @click="minusCount(foodCategoryItem.categoryID, cartFoodItem)">
                                                <div class="reduce-icon-css" :style="{ 'background-color': $mainColor }"></div>
                                            </div>
                                            <div class="food-order-count">{{ cartFoodItem.orderCount }}</div>
                                            <div class="food-count-add" :style="{ 'background-color': $mainColor }" @click="addCount(foodCategoryItem.categoryID, cartFoodItem)"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </scroll-view>
                <view class="cart-amount-box flex-row flex-a-center flex-j-between">
                    <view class="cart-origin-price">总计: {{ cartPriceInfo.cartAllOriginPrice }}</view>
                    <view v-if="cartPriceInfo.discountPrice" class="">已满减: {{ cartPriceInfo.discountPrice }}</view>
                    <view class="cart-food-all-amount-title">应付: {{ cartPriceInfo.cartAlldiscountPrice }}</view>
                    <!-- 	<view class="cart-food-all-amount">
						{{ cartPriceInfo.cartAllOriginPrice }} {{ cartPriceInfo.cartAlldiscountPrice }}
					</view> -->
                </view>
            </div>
        </div>
    </div>
</template>

<script>
import { host } from '@/config/host';
let observer = null;
export default {
    data() {
        return {
            businessType: '',
            shopInfo: {},
            addCountState: true,
            minusCountState: true,
            selectCategoryTabId: '',
            scrollIntoCategoryID: '',
            showCartDetail: false,
            foodCategoryList: [],
            cartFoodList: [],
            host
        };
    },
    computed: {
        cartFoodListMainColor() {
            return this.cartFoodList.length ? this.$mainColor : '';
        },
        minusPromotionsTitle() {
            if (!(this.shopInfo.minusList || []).length) return '';
            if (this.cartPriceInfo.noReachFirst) {
                return `再买${Number((this.shopInfo.minusList[0].reach - this.cartPriceInfo.cartAllOriginPrice).toFixed(2))}元减${this.shopInfo.minusList[0].reduce}元`;
            }
            if (!this.cartPriceInfo.minusIndex) {
                return '';
            } else {
                if (this.shopInfo.minusList.length === this.cartPriceInfo.minusIndex) {
                    return `已减${this.shopInfo.minusList[this.cartPriceInfo.minusIndex - 1].reduce}`;
                } else {
                    return `已减${this.shopInfo.minusList[this.cartPriceInfo.minusIndex - 1].reduce}元,再买${Number(
                        (this.shopInfo.minusList[this.cartPriceInfo.minusIndex].reach - this.cartPriceInfo.cartAllOriginPrice).toFixed(2)
                    )}元减${this.shopInfo.minusList[this.cartPriceInfo.minusIndex].reduce}元`;
                }
            }
        },
        cartPriceInfo() {
            const cartAllOriginPrice = this.cartFoodList
                .reduce((amount, item) => {
                    const categoryItemSum = item.foodList.reduce((all, foodItem) => {
                        const price = foodItem.price * foodItem.orderCount;
                        all += price;
                        return all;
                    }, 0);
                    amount += categoryItemSum;
                    return amount;
                }, 0)
                .toFixed(2);
            let discountPrice = 0;
            let minusIndex = null;
            let noReachFirst = true;
            const discountItem = (this.shopInfo.minusList || []).find((item, index) => {
                if (index === this.shopInfo.minusList.length - 1) {
                    if (Number(cartAllOriginPrice) >= Number(item.reach)) {
                        minusIndex = index + 1;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (Number(cartAllOriginPrice) >= Number(item.reach) && Number(cartAllOriginPrice) < Number(this.shopInfo.minusList[index + 1].reach)) {
                        minusIndex = index + 1;
                        return true;
                    } else {
                        return false;
                    }
                }
            });
            if (discountItem) {
                discountPrice = discountItem.reduce;
                noReachFirst = false;
            }
            const cartAlldiscountPrice = (cartAllOriginPrice - discountPrice).toFixed(2);
            return {
                cartAllOriginPrice,
                cartAlldiscountPrice,
                discountPrice,
                minusIndex,
                noReachFirst
            };
        },
        allCartFoodCount() {
            return this.cartFoodList.reduce((all, item) => {
                const itemFoodAll = item.foodList.reduce((all, item) => {
                    all += item.orderCount;
                    return all;
                }, 0);
                all += itemFoodAll;
                return all;
            }, 0);
        },
        asideCategoryList() {
            const asideCategoryList = this.foodCategoryList.map(foodCategoryItem => {
                const cartFind = this.cartFoodList.find(cartFoodItem => cartFoodItem.categoryID === foodCategoryItem.categoryID);
                if (cartFind) {
                    const orderCount = cartFind.foodList.reduce((all, item) => {
                        all += item.orderCount;
                        return all;
                    }, 0);
                    return {
                        categoryName: foodCategoryItem.categoryName,
                        categoryID: foodCategoryItem.categoryID,
                        orderCount,
                        scrollTabID: foodCategoryItem.scrollTabID
                    };
                } else {
                    return {
                        categoryName: foodCategoryItem.categoryName,
                        categoryID: foodCategoryItem.categoryID,
                        orderCount: 0,
                        scrollTabID: foodCategoryItem.scrollTabID
                    };
                }
            });
            return asideCategoryList;
        }
    },
    onReady() {
        console.log(`123`);
        setTimeout(() => {
            this.creatObserve();
        }, 2000);
    },
    onUnload() {
        if (observer) {
            observer.disconnect();
        }
        Object.assign(this.$data, this.$options.data());
    },
    async onLoad(query) {
        console.log(`456`);

        this.shopInfo = uni.getStorageSync('shopInfo');
        this.businessType = uni.getStorageSync('businessType');
        this.init();
    },
    methods: {
        async cartClearCart() {
            await this.$showModal({
                content: '确认清空购物车吗？',
                showCancel: true
            });
            this.clearCart();
            this.showCartDetail = false;
        },
        creatObserve() {
            // #ifdef MP-WEIXIN
            observer = this.createIntersectionObserver({
                observeAll: true
            });
            // #endif
            // #ifdef H5
            observer = uni.createIntersectionObserver(this, {
                observeAll: true
            });
            // #endif

            observer.relativeTo('.food-main-box').observe('.food-category-list-item', res => {
                const foodCategoryItem = JSON.parse(res.dataset.foodCategoryItem);
                if (res.intersectionRatio === 0 && res.boundingClientRect.bottom <= res.relativeRect.top) {
                    this.selectCategoryTabId = foodCategoryItem.nextScrollTabID;
                    this.scrollIntoCategoryID = null;
                } else if (0 < res.intersectionRatio && res.intersectionRatio <= 1 && res.boundingClientRect.top <= res.relativeRect.top) {
                    this.selectCategoryTabId = foodCategoryItem.scrollTabID;
                    this.scrollIntoCategoryID = null;
                }
            });
        },
        async init() {
            try {
                this.$showLoading();
                const { orderAgain, orderKey } = this.$root.$mp.query;
                const res = await this.$fetch.get('/user/order/menuList', { shopID: this.shopInfo.shopID });
                const foodCategoryList = res.data || [];
                foodCategoryList.forEach((item, index) => {
                    item.scrollTabID = 'c' + item.categoryID;
                    if (index >= foodCategoryList.length - 1) {
                        item.nextScrollTabID = 'c' + item.categoryID;
                    } else {
                        item.nextScrollTabID = 'c' + foodCategoryList[index + 1].categoryID;
                    }
                });
                if (foodCategoryList.length) {
                    this.selectCategoryTabId = foodCategoryList[0].scrollTabID;
                    this.scrollIntoCategoryID = foodCategoryList[0].scrollTabID;
                }
                // 重来一单，orderAgain 和 orderKey 缺一不可
                if (orderAgain && orderKey) {
                    const orderCategoryFoodList = await this.getOrderFoodList(orderKey);
                    if (orderCategoryFoodList.length) {
                        uni.setStorageSync(`storageFoodList_${this.shopInfo.shopID}`, orderCategoryFoodList);
                    }
                }
                this.foodCategoryList = foodCategoryList;
                this.getStorageCart();
            } catch (e) {
                console.log(e);
            } finally {
                this.$hideLoading();
			}
        },
        initCart({ foodCategoryList = [], storageFoodList = [] } = {}) {
            storageFoodList.forEach(storageFoodItem => {
                const foodCategoryFind = foodCategoryList.find(foodCategoryItem => foodCategoryItem.categoryID === storageFoodItem.categoryID);
                if (foodCategoryFind) {
                    foodCategoryFind.foodList.forEach(foodItem => {
                        storageFoodItem.foodList.forEach(item => {
                            if (item.foodID === foodItem.foodID) {
                                foodItem.orderCount = item.orderCount;
                                this.cartCountChange({ categoryID: foodCategoryFind.categoryID, foodItem });
                            }
                        });
                    });
                }
            });
        },
        cartCountChange({ categoryID = '', foodItem = {} } = {}) {
            // 购物车数量增加减少使用的是引用改变，其他关联也相应改变
            const findCategory = this.cartFoodList.find(item => item.categoryID === categoryID);
            if (findCategory) {
                const findFood = findCategory.foodList.find(item => item.foodName === foodItem.foodName);
                if (!findFood) {
                    findCategory.foodList.push(foodItem);
                }
            } else {
                this.cartFoodList.push({
                    categoryID,
                    foodList: [foodItem]
                });
            }
            this.cartFoodList.forEach(item => {
                item.foodList = item.foodList.filter(foodItem => {
                    if (foodItem.orderCount > 0) {
                        foodItem.foodItemAmount = Number((foodItem.price * foodItem.orderCount).toFixed(2));
                        return true;
                    } else {
                        foodItem.foodItemAmount = 0;
                        return false;
                    }
                });
            });
            this.cartFoodList = this.cartFoodList.filter(item => item.foodList.length > 0);
            uni.setStorageSync(`storageFoodList_${this.shopInfo.shopID}`,this.cartFoodList);
        },
        clearCart() {
            this.cartFoodList.forEach(categoryTtem => {
                categoryTtem.foodList.forEach(foodItem => {
                    foodItem.orderCount = 0;
                });
            });
            this.cartFoodList = [];
            uni.removeStorageSync(`storageFoodList_${this.shopInfo.shopID}`);
        },
        async getOrderFoodList(orderKey) {
            try {
                const res = await this.$fetch.get('/user/order/foodList', { orderKey, shopID: this.shopInfo.shopID });
                const orderCategoryFoodList = res.data.reduce((list, item) => {
                    if (!list.length) {
                        list.push({
                            categoryID: item.categoryID,
                            categoryName: item.categoryName,
                            foodList: [item]
                        });
                    } else {
                        const find = list.find(ListItem => ListItem.categoryID === item.categoryID);
                        if (find) {
                            find.foodList.push(item);
                        } else {
                            list.push({
                                categoryID: item.categoryID,
                                categoryName: item.categoryName,
                                foodList: [item]
                            });
                        }
                    }
                    return list;
                }, []);
                return orderCategoryFoodList;
            } catch (e) {
                console.log(e);
                return [];
            }
        },
        getStorageCart() {
            const storageFoodList = uni.getStorageSync(`storageFoodList_${this.shopInfo.shopID}`) || [];
            if (!storageFoodList.length) return;
            this.initCart({ foodCategoryList: this.foodCategoryList, storageFoodList });
        },
        changeShowCartDetail() {
            if (!this.cartFoodList.length) {
                this.showCartDetail = false;
                return;
            }
            this.showCartDetail = !this.showCartDetail;
        },
        changeSelectCategoryTab(scrollTabID) {
            this.selectCategoryTabId = scrollTabID;
            this.scrollIntoCategoryID = scrollTabID;
        },
        addCount(categoryID, foodItem) {
            if (!this.addCountState) return;
            this.addCountState = false;
            foodItem.orderCount += 1;
            this.cartCountChange({ categoryID, foodItem });
            this.addCountState = true;
            if (!this.cartFoodList.length) this.showCartDetail = false;
        },
        minusCount(categoryID, foodItem) {
            if (!this.minusCountState) return;
            this.minusCountState = false;
            foodItem.orderCount -= 1;
            this.cartCountChange({ categoryID, foodItem });
            this.minusCountState = true;
            if (!this.cartFoodList.length) this.showCartDetail = false;
        },
        async toComfirmOrder() {
            // if (!this.cartFoodList.length) return;
            // const foodList = [];
            // this.cartFoodList.forEach((item) => {
            // 	foodList.navigateTo(...item.foodList)
            // })
            // console.log(foodList)
            // const res = await this.$fetch.post('/api/userOrder/submit', { foodList })
            console.log(111);
            this.$myrouter.navigateTo({
                name: 'user/menu/confirm'
            });
        }
    }
};
</script>

<style lang="scss">
page {
    height: 100%;
}
.menu-container {
    font-size: 28rpx;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    padding-bottom: 100rpx;
    color: #333;
    .order-main {
        height: 100%;
    }
    .food-count-minus {
        position: relative;
        width: 40rpx;
        height: 40rpx;
        border: 1px solid;
        border-radius: 50%;
        text-align: center;
        line-height: 40rpx;
        background-color: #fff;
        box-sizing: border-box;
    }
    .food-order-count {
        width: 60rpx;
        text-align: center;
    }
    .reduce-icon-css {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 4rpx;
        width: 24rpx;
        transform: translate(-50%, -50%);
        border-radius: 2rpx;
    }
    .food-count-add {
        position: relative;
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        // text-align: center;
        // line-height: 40rpx;
        // color: #fff;
    }
    .food-count-add::after {
        content: "";
        position: absolute;
        width: 24rpx;
        height: 4rpx;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 2rpx;
    }
    .food-count-add::before {
        content: "";
        position: absolute;
        width: 4rpx;
        height: 24rpx;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 2rpx;
    }
    .add-icon-css {
        position: relative;
    }
    .menu-header {
        background-color: red;
        height: 300rpx;
    }
    .category-aside-box {
        width: 160rpx;
        height: 100%;
        background-color: #f8f8f8;
        flex-shrink: 0;
        box-sizing: border-box;
        padding-bottom: 40rpx;
        .aside-category-item {
            position: relative;
            padding: 20rpx;
            // height: 80rpx;
            font-size: 26rpx;
            line-height: 32rpx;
            text-align: center;
            box-sizing: border-box;
            // border-left: 10rpx solid transparent;
        }
        .category-order-count {
            position: absolute;
            top: 3rpx;
            right: 3rpx;
            min-width: 30rpx;
            height: 30rpx;
            line-height: 30rpx;
            border-radius: 15rpx;
            font-size: 22rpx;
            color: #fff;
            text-align: center;
        }
    }
    .food-main-box {
        // background-color: blue;
        height: 100%;
        flex-shrink: 0;
        box-sizing: border-box;
        .food-category-list-item {
            padding: 0 20rpx 20rpx;
        }
        .food-category-name {
            font-size: 26rpx;
            color: #666;
            padding: 10rpx 0;
            // margin: 0 0 20rpx;
        }
        .food-item {
            padding: 10rpx 0;
        }
        .food-img {
            height: 170rpx;
            width: 170rpx;
        }
        .food-info-box {
            padding-left: 20rpx;
        }
        .food-name {
            font-weight: bold;
            font-size: 32rpx;
        }
        .food-description {
            font-size: 22rpx;
            color: #999;
            margin-top: 10rpx;
        }
        .food-price {
            font-weight: bold;
            font-size: 30rpx;
            color: red;
        }
    }
    .promotion-title {
        position: fixed;
        left: 0;
        bottom: 100rpx;
        width: 100%;
        height: 50rpx;
        background-color: rgb(247, 255, 142);
        z-index: 3;
        line-height: 50rpx;
        font-size: 24rpx;
    }
    .footer-cart {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100rpx;
        background-color: #434346;
        border-radius: 50rpx;
        color: #fff;
        z-index: 8;

        .cart-all-amount {
            padding-left: 200rpx;
        }
        .cart-all-discount-price {
            font-size: 36rpx;
        }
        .cart-all-origin-price {
            margin-left: 20rpx;
            font-size: 26rpx;
            color: #888;
            text-decoration: line-through;
        }
        .cart-img-box {
            position: fixed;
            bottom: 20rpx;
            left: 40rpx;
            height: 140rpx;
            width: 140rpx;
            z-index: 10;
        }
        .cart-img {
            height: 140rpx;
            width: 140rpx;
        }

        .cart-all-count {
            position: absolute;
            right: -20rpx;
            top: 10rpx;
            height: 40rpx;
            width: 40rpx;
            font-size: 22rpx;
            line-height: 40rpx;
            border-radius: 50%;
            text-align: center;
        }
        .confirm-order {
            margin-right: 10rpx;
            width: 250rpx;
            background-color: #666;
        }
    }

    .cart-detail-mask {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 100rpx;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        font-size: 28rpx;
        -webkit-overflow-scrolling: touch;
        z-index: 2;
        .cart-detail-box {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            max-height: 800rpx;
            box-sizing: border-box;
            padding: 0 30rpx 40rpx;
            background-color: #fff;
            overflow-y: auto;
        }
        .cart-select-box {
            font-size: 28rpx;
            color: #999;
        }
        .delete-all-icon {
            padding: 20rpx;
            height: 36rpx;
            width: 36rpx;
        }
        .cart-detail-list-box {
            max-height: 600rpx;
        }
        .cart-food-item {
            padding: 10rpx 0;
        }
        .cart-food-img {
            height: 130rpx;
            width: 130rpx;
        }
        .cart-food-price-button {
            font-size: 26rpx;
        }
        .cart-food-name {
            font-weight: bold;
            max-width: 400rpx;
            font-size: 26rpx;
        }
        .cart-food-description {
            margin-top: 10rpx;
            font-size: 22rpx;
            color: #999;
        }
        .cart-food-price {
            font-weight: bold;
            color: red;
        }
        .food-item-amount {
            min-width: 164rpx;
            margin-right: 20rpx;
            color: red;
            font-weight: bold;
        }
        .cart-food-info-box {
            padding-left: 20rpx;
        }
        .cart-amount-box {
            padding: 16rpx;
            font-size: 28rpx;
            font-weight: bold;
            color: red;
        }
    }
}
</style>
