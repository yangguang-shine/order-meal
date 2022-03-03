<template>
    <view class="menu-container">
        <TopBar :selectTopBarItem="selectTopBarItem" @changeTopBar="changeTopBar"></TopBar>
        <view class="menu-order-box flex-col" :class="selectTopBarItem === '点餐' ? 'show-menu-order-box' : 'hide-menu-order-box'">
            <view class="menu-list-box flex-item flex-row ">
                <CategoryAsideBar ></CategoryAsideBar>
                <FoodCategoryList ></FoodCategoryList>
            </view>
            <CartDetail v-if="showCartDetail" ></CartDetail>
            <MinusPromotions  v-if="minusPromotionsObject.show" ></MinusPromotions>
            <MinusPromotionsBlock v-if="minusPromotionsObject.show"></MinusPromotionsBlock>
            <FooterCart ></FooterCart>
            <FooterCartBlock></FooterCartBlock>
            <FoodDetail v-if="showFoodDetailFalg"></FoodDetail>
        </view>
        <ShopInfo v-if="showShopInfo" ref="shopInfo" :shopInfo="shopInfo"></ShopInfo>
		<!-- <common-loading v-if="showLoadingFlag"></common-loading> -->
    </view>
</template>

<script>
import { host } from '@/config/host';
import { getSystemRpx } from '@/utils/index';
import CategoryAsideBar from './components/CategoryAsideBar.vue';
import FoodCategoryList from './components/FoodCategoryList.vue';
import MinusPromotions from './components/MinusPromotions.vue';
import MinusPromotionsBlock from './components/MinusPromotionsBlock.vue';
import FooterCart from './components/FooterCart.vue';
import FooterCartBlock from './components/FooterCartBlock.vue';
import CartDetail from './components/CartDetail.vue';
import FoodDetail from './components/FoodDetail.vue';

import topBar from './components/topBar.vue';
import shopInfo from './components/shopInfo.vue';
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
        CategoryAsideBar,
        FoodCategoryList,
        MinusPromotions,
        FooterCart,
        CartDetail,
        topBar,
        shopInfo,
        MinusPromotionsBlock,
        FooterCartBlock,
        FoodDetail
    },
    data() {
        return {
            businessType: '',
            shopInfo: {},
            addCountState: true,
            minusCountState: true,
            selectCategoryTabId: '',
            scrollIntoCategoryTabID: '',
            showCartDetail: false,
            categoryList: [],
            cartCategoryList: [],
            selectTopBarItem: '点餐',
            host,
            topBarHeightPX: 40,
            pageScrollTo: '点餐',
            showShopInfo: false,
            showFoodDetailFalg: false,
			showLoadingFlag: true,
            selectFoodItem: {}
        };
    },
    computed: {
        minusPromotionsObject() {
            if ((this.shopInfo.minusList || []).length === 0 || this.cartCategoryList.length === 0) {
                return {
                    show: false,
                    contentList: []
                };
            }
            if (this.cartPriceInfo.noReachFirst) {
                return {
                    show: true,
                    contentList: ['再买', `${Number((this.shopInfo.minusList[0].reach - this.cartPriceInfo.cartAllOriginPrice).toFixed(2))}元`, ',可减', `${this.shopInfo.minusList[0].reduce}元`]
                };
            }

            if (!this.cartPriceInfo.minusIndex) {
                return {
                    show: false,
                    contentList: []
                };
            }

            if (this.shopInfo.minusList.length === this.cartPriceInfo.minusIndex) {
                return {
                    show: true,
                    contentList: ['已减', `${this.shopInfo.minusList[this.cartPriceInfo.minusIndex - 1].reduce}`]
                };
            } else {
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
            }
        },
        cartPriceInfo() {
            const cartAllOriginPrice = this.cartCategoryList
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
                cartAllOriginPrice: +cartAllOriginPrice,
                cartAlldiscountPrice: +cartAlldiscountPrice,
                discountPrice: +discountPrice,
                minusIndex,
                noReachFirst
            };
        },
        allCartFoodCount() {
            return this.cartCategoryList.reduce((all, item) => {
                const itemFoodAll = item.foodList.reduce((all, item) => {
                    all += item.orderCount;
                    return all;
                }, 0);
                all += itemFoodAll;
                return all;
            }, 0);
        },
        asideCategoryList() {
            const asideCategoryList = this.categoryList.map(foodCategoryItem => {
                const cartFind = this.cartCategoryList.find(cartFoodItem => cartFoodItem.categoryID === foodCategoryItem.categoryID);
                if (cartFind) {
                    const orderCount = cartFind.foodList.reduce((all, item) => {
                        all += item.orderCount;
                        return all;
                    }, 0);
                    return {
                        categoryName: foodCategoryItem.categoryName,
                        categoryID: foodCategoryItem.categoryID,
                        orderCount,
                        categoryTabID: foodCategoryItem.categoryTabID
                    };
                } else {
                    return {
                        categoryName: foodCategoryItem.categoryName,
                        categoryID: foodCategoryItem.categoryID,
                        orderCount: 0,
                        categoryTabID: foodCategoryItem.categoryTabID
                    };
                }
            });
            return asideCategoryList;
        }
    },
    onUnload() {
     
    },
    async onShow(query) {
		try {
            this.$showLoading()
			this.shopInfo = uni.getStorageSync('shopInfo');
			this.businessType = uni.getStorageSync('businessType');
			const initPromise = this.init();
			const getSystemRpxPromise = getSystemRpx();
			await initPromise;
			const systemInfo = await getSystemRpxPromise;
			this.topBarHeightPX = (systemInfo.windowWidth / 750) * 2 * 40;
		} catch(e) {
			console.log(e)
		} finally {
            this.$hideLoading()
            
		}
    },
    methods: {
        showFoodDetail(foodItem) {
            this.selectFoodItem = foodItem
            this.showFoodDetailFalg = true
        },
        async closeFoodDetail() {
            this.showFoodDetailFalg = false
        },
        async changeTopBar(title) {
            if (this.selectTopBarItem === title) return;
            this.selectTopBarItem = title;
            if (this.selectTopBarItem === '点餐') {
                this.$refs.shopInfo.showComponents = false
                // 多100 是为了购物车absolute转化成fixed能流畅 200 生硬
                await delaySync(300)
                this.showShopInfo = false
            } else if (this.selectTopBarItem === '商家') {
                this.showShopInfo = true
            }
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
                const res = await this.selectQuery(`#${categoryItem.categoryTabID}id`);
                if (this.topBarHeightPX <= res.top || res.bottom > this.topBarHeightPX) {
                    this.selectCategoryTabId = categoryItem.categoryTabID;
                    this.scrollIntoCategoryTabID = null;

                    break;
                }
            }
        },
        selectQuery(id) {
            return new Promise((resolve, reject) => {
                uni.createSelectorQuery().select(id).boundingClientRect(res => {
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
            this.closeCartDetail()
        },
        async init() {
            const { orderAgain, orderKey } = this.$root.$mp.query;
            const categoryList = await this.$fetch('user/order/menuList', {
                shopID: this.shopInfo.shopID
            });
            categoryList.forEach((item, index) => {
                item.categoryTabID = 'id' + item.categoryID;
            });
            if (categoryList.length) {
                this.selectCategoryTabId = categoryList[0].categoryTabID;
                this.scrollIntoCategoryTabID = null;
            }
            // 重来一单，orderAgain 和 orderKey 缺一不可
            if (orderAgain && orderKey) {
                const orderCategoryFoodList = await this.getOrderFoodList(orderKey);
                if (orderCategoryFoodList.length) {
                    uni.setStorageSync(`storageFoodList_${this.shopInfo.shopID}`, orderCategoryFoodList);
                }
            }
            this.categoryList = categoryList;
            this.getStorageCart();
        },
        initCart({ categoryList = [], storageFoodList = [] } = {}) {
			this.cartCategoryList = []
            storageFoodList.forEach(storageFoodItem => {
                const foodCategoryFind = categoryList.find(foodCategoryItem => foodCategoryItem.categoryID === storageFoodItem.categoryID);
                if (foodCategoryFind) {
                    foodCategoryFind.foodList.forEach(foodItem => {
                        storageFoodItem.foodList.forEach(item => {
                            if (item.foodID === foodItem.foodID) {
                                foodItem.orderCount = item.orderCount;
                                this.cartCountChange(foodItem);
                            }
                        });
                    });
                }
            });
        },
        cartCountChange(foodItem = {}) {
            // 购物车数量增加减少使用的是引用改变，其他关联也相应改变
            const findCategory = this.cartCategoryList.find(item => item.categoryID === foodItem.categoryID);
            if (findCategory) {
                const findFood = findCategory.foodList.find(item => item.foodID === foodItem.foodID);
                if (!findFood) {
                    findCategory.foodList.push(foodItem);
                }
            } else {
                this.cartCategoryList.push({
                    categoryID: foodItem.categoryID,
                    foodList: [foodItem]
                });
            }
            this.cartCategoryList.forEach(item => {
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
            this.cartCategoryList = this.cartCategoryList.filter(item => item.foodList.length > 0);
            uni.setStorageSync(`storageFoodList_${this.shopInfo.shopID}`, this.cartCategoryList);
        },
        clearCart() {
            this.cartCategoryList.forEach(categoryTtem => {
                categoryTtem.foodList.forEach(foodItem => {
                    foodItem.orderCount = 0;
                });
            });
            this.cartCategoryList = [];
            uni.removeStorageSync(`storageFoodList_${this.shopInfo.shopID}`);
        },
        async getOrderFoodList(orderKey) {
            try {
                const data = await this.$fetch('user/order/foodList', {
                    orderKey,
                    shopID: this.shopInfo.shopID
                });
                const orderCategoryFoodList = data.reduce((list, item) => {
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
                categoryList: this.categoryList,
                storageFoodList
            });
        },
        async toogleCartDetail() {
            if (!this.cartCategoryList.length) {
                this.showCartDetail = false;
                return;
            }
            if (this.showCartDetail) {
                await this.$refs.foodCardDetail.closeCartDetail()
				this.showCartDetail = false
            } else {
				this.showCartDetail = true
			}
        },
        closeCartDetail() {
            this.showCartDetail = false
        },
        changeSelectCategoryTab(categoryTabID) {
            this.selectCategoryTabId = categoryTabID;
            this.scrollIntoCategoryTabID = categoryTabID;
        },
        addCount(foodItem) {
            if (!this.addCountState) return;
            this.addCountState = false;
            foodItem.orderCount += 1;
            this.cartCountChange(foodItem);
            this.addCountState = true;
            if (!this.cartCategoryList.length) this.showCartDetail = false;
        },
        minusCount(foodItem) {
            if (!this.minusCountState) return;
            this.minusCountState = false;
            foodItem.orderCount -= 1;
            this.cartCountChange(foodItem);
            this.minusCountState = true;
            if (!this.cartCategoryList.length) this.showCartDetail = false;
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
    height: 100vh;
}
.menu-container {
    font-size: 28rpx;
    width: 750rpx;
    height: 100vh;
    color: #333;
    position: relative;
    .menu-list-box {
        height: 0rpx;
    }
    .menu-order-box {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        padding-top: 80rpx;
        box-sizing: border-box;
        transition: all ease-in-out 0.3s;
    }
    .show-menu-order-box {
        left: 0;
    }
    .hide-menu-order-box {
        left: -750rpx;
    }
    //    .shop-info-box  {
    //         position: absolute;
    //         top: 0;
    //         width: 100%;
    //         height: 100%;
    //         padding-top: 80rpx;
    //         box-sizing: border-box;
    //         transition: all ease-in-out .3s;
    // }

    // flex：1 和 height共存 ，取最大值
}
</style>
