<template>
    <view class="menu-container flex-col">
		<top-bar :selectTopBarItem="selectTopBarItem" @changeTopBar="changeTopBar"></top-bar>
        <view class="menu-order flex-item flex-row" :style="{ 'padding-bottom': minusPromotionsTitleObject.show ? '50rpx' : '' }">
            <category-aside-bar  :asideCategoryList="asideCategoryList" :selectCategoryTabId="selectCategoryTabId" @changeSelectCategoryTab="changeSelectCategoryTab"></category-aside-bar>
            <food-category-list :foodCategoryList="foodCategoryList" :scrollIntoCategoryID="scrollIntoCategoryID" @foodScrollHandle="foodScrollHandle" @addCount="addCount" @minusCount="minusCount"></food-category-list>
            <minus-promotions-title :minusPromotionsTitleObject="minusPromotionsTitleObject"></minus-promotions-title>
            <footer-cart :cartPriceInfo="cartPriceInfo" :allCartFoodCount="allCartFoodCount" @toogleCartDetail="toogleCartDetail(true)" @toComfirmOrder="toComfirmOrder"></footer-cart>
			<food-cart-detail ref='foodCardDetail' v-if="showCartDetail" :minusPromotionsTitleObject="minusPromotionsTitleObject" :cartFoodList="cartFoodList" @toogleCartDetail="toogleCartDetail"  @cartClearCart="cartClearCart" @addCount="addCount" @minusCount="minusCount"></food-cart-detail>
        </view>
    </view>
</template>

<script>
import { host } from '@/config/host';
import { getSystemRpx } from '@/utils/index';
import categoryAsideBar from './components/categoryAsideBar.vue';
import foodCategoryList from './components/foodCategoryList.vue';
import minusPromotionsTitle from './components/minusPromotionsTitle.vue';
import footerCart from './components/footerCart.vue';
import foodCartDetail from './components/foodCartDetail.vue';
import topBar from './components/topBar.vue';
import { delaySync } from '@/utils/index.js'
let observer = null;
const topBarHeightRpx = 80; //

const debounce = (() => {
    let timer = null;
    return (fn, delay) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn();
        }, delay);
    };
})();

const throttle = (() => {
    let timer = null;
    return (fn, delay) => {
        if (!timer) {
            timer = setTimeout(() => {
                fn();
                timer = null;
            }, delay);
        }
    };
})();
export default {
    components: {
        categoryAsideBar,
        foodCategoryList,
        minusPromotionsTitle,
        footerCart,
        foodCartDetail,
        topBar
    },
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
            selectTopBarItem: '点餐',
            host,
            topBarHeightPX: 40
        };
    },
    computed: {
        // cartFoodListMainColor() {
        // 	return this.cartFoodList.length ? this.$mainColor : '';
        // },
        minusPromotionsTitleObject() {
            if ((this.shopInfo.minusList || []).length === 0 || this.cartFoodList.length === 0) {
                return {
                    show: false,
                    contentList: []
                };
            }
            if (this.cartPriceInfo.noReachFirst) {
                console.log(2);
                return {
                    show: true,
                    contentList: ['再买', `${Number((this.shopInfo.minusList[0].reach - this.cartPriceInfo.cartAllOriginPrice).toFixed(2))}元`, ',可减', `${this.shopInfo.minusList[0].reduce}元`]
                };
            }

            if (!this.cartPriceInfo.minusIndex) {
                console.log(5);
                return {
                    show: false,
                    contentList: []
                };
            }

            if (this.shopInfo.minusList.length === this.cartPriceInfo.minusIndex) {
                console.log(3);
                return {
                    show: true,
                    contentList: ['已减', `${this.shopInfo.minusList[this.cartPriceInfo.minusIndex - 1].reduce}`]
                };
            } else {
                console.log(4);
                return {
                    show: true,
                    contentList: [
                        '已减',
                        `${this.shopInfo.minusList[this.cartPriceInfo.minusIndex - 1].reduce}元`,
                        `,再买`,
                        `${Number((this.shopInfo.minusList[this.cartPriceInfo.minusIndex].reach - this.cartPriceInfo.cartAllOriginPrice).toFixed(2))}元`,
                        `可减`,
                        `${this.shopInfo.minusList[this.cartPriceInfo.minusIndex].reduce}`
                    ]
                };
                // return `已减${Number(
                // 	(this.shopInfo.minusList[this.cartPriceInfo.minusIndex].reach - this.cartPriceInfo.cartAllOriginPrice).toFixed(2)
                // )}元减${this.shopInfo.minusList[this.cartPriceInfo.minusIndex].reduce}元`;
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
    onUnload() {
        // if (observer) {
        // 	observer.disconnect();
        // }
        // Object.assign(this.$data, this.$options.data());
    },
    async onLoad(query) {
        try {
            this.$showLoading();
            this.shopInfo = uni.getStorageSync('shopInfo');
            this.businessType = uni.getStorageSync('businessType');
            const initPromise = this.init();
            const getSystemRpxPromise = getSystemRpx();
            await initPromise;
            const systemInfo = await getSystemRpxPromise;
            this.topBarHeightPX = (systemInfo.windowWidth / 750) * 2 * 40;
            console.log(systemInfo);
            console.log(this.topBarHeightPX);
        } catch (e) {
            console.log(e);
        } finally {
            this.$hideLoading();
        }
    },
    methods: {
        changeTopBar(title) {
            if (this.selectTopBarItem === title) return;
            this.selectTopBarItem = title;
        },
        foodScrollHandle(e) {
            debounce(() => {
                this.handleScroll(e);
            }, 30);
        },
        async handleScroll(e) {
            this.asideCategoryList;
            for (let i = 0; i < this.asideCategoryList.length; i++) {
                const categoryItem = this.asideCategoryList[i];
                const res = await this.selectQuery(`#${categoryItem.scrollTabID}id`);
                console.log(categoryItem);
                if (this.topBarHeightPX <= res.top || res.bottom > this.topBarHeightPX) {
                    console.log(res);
                    this.selectCategoryTabId = categoryItem.scrollTabID;
                    break;
                }
            }
        },
        selectQuery(id) {
            return new Promise((resolve, reject) => {
                uni.createSelectorQuery().select(id) .boundingClientRect(res => {
                        resolve(res);
                    }).exec();
            });
        },

        async cartClearCart() {
            await this.$showModal({
                content: '确认清空购物车吗？',
                showCancel: true
            });
            this.clearCart();
            this.toogleCartDetail()
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
            const { orderAgain, orderKey } = this.$root.$mp.query;
            const res = await this.$fetch.get('/user/order/menuList', {
                shopID: this.shopInfo.shopID
            });
            const foodCategoryList = res.data || [];
            foodCategoryList.forEach((item, index) => {
                item.scrollTabID = 'id' + item.categoryID;
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
        },
        initCart({ foodCategoryList = [], storageFoodList = [] } = {}) {
            storageFoodList.forEach(storageFoodItem => {
                const foodCategoryFind = foodCategoryList.find(foodCategoryItem => foodCategoryItem.categoryID === storageFoodItem.categoryID);
                if (foodCategoryFind) {
                    foodCategoryFind.foodList.forEach(foodItem => {
                        storageFoodItem.foodList.forEach(item => {
                            if (item.foodID === foodItem.foodID) {
                                foodItem.orderCount = item.orderCount;
                                this.cartCountChange({
                                    categoryID: foodCategoryFind.categoryID,
                                    foodItem
                                });
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
                const findFood = findCategory.foodList.find(item => item.foodID === foodItem.foodID);
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
            uni.setStorageSync(`storageFoodList_${this.shopInfo.shopID}`, this.cartFoodList);
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
                const res = await this.$fetch.get('/user/order/foodList', {
                    orderKey,
                    shopID: this.shopInfo.shopID
                });
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
            this.initCart({
                foodCategoryList: this.foodCategoryList,
                storageFoodList
            });
        },
        async toogleCartDetail(fromCardImg = false) {
            console.log(121)
            if (!this.cartFoodList.length) {
                this.showCartDetail = false;
                return;
            }
            console.log(fromCardImg)
            if (this.showCartDetail && fromCardImg) {
                console.log(this.$refs.foodCardDetail)
                this.$refs.foodCardDetail.showAnimate = false
                await delaySync(200)
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
            this.cartCountChange({
                categoryID,
                foodItem
            });
            this.addCountState = true;
            if (!this.cartFoodList.length) this.showCartDetail = false;
        },
        minusCount(categoryID, foodItem) {
            if (!this.minusCountState) return;
            this.minusCountState = false;
            foodItem.orderCount -= 1;
            this.cartCountChange({
                categoryID,
                foodItem
            });
            this.minusCountState = true;
            if (!this.cartFoodList.length) this.showCartDetail = false;
        },
        async toComfirmOrder() {
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
    color: #333;
    position: relative;
	}
    .menu-order {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-bottom: 140rpx;
    }
   
</style>
