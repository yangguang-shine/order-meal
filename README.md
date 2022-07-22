# 项目介绍

**[【五脏俱全的餐饮点单项目】](http://yangguang.natappvip.cc)**

## 项目体验

**手机体验地址：[【点餐下单】](http://yangguang.natappvip.cc) http://yangguang.natappvip.cc**

**手机体验地址：[【点餐下单】](http://yangguang.natappvip.cc) http://yangguang.natappvip.cc**

**手机体验地址：[【点餐下单】](http://yangguang.natappvip.cc) http://yangguang.natappvip.cc**

**重要的事情说三遍！！！**

## 使用的核心技术

vue3、pinia、uni-app、typescript、es6及以上语法、composition api

## 相关访问地址

客户端：手机浏览器访问 http://yangguang.natappvip.cc

管理端：手机浏览器访问 http://yangguang.natappvip.cc/manage/

服务端：运行在域名 yangguang.natappvip.cc， 使用的是内网穿透技术，提供外网访问

客户端github地址: http://github.com/yangguang-shine/order-meal

管理端github地址： http://github.com/yangguang-shine/manage

服务端github地址: http://github.com/yangguang-shine/serve

## 主要功能

**首页**
1. 	登录、注册、注销、查看和修改个人信息
2. 	个人地址添加、删除、修改
3. 	支持店铺搜索、不同店铺`业务类型`（外卖、堂食、字体）、店铺不同`排序展示`（综合、销量、距离）、店铺的`满减营销`。
4. 	支持店铺的满减营销、轮播广告位、固定浮动广告位

**下单页**
1. 	支持点餐过程菜品和店铺切换、搜索菜品、菜品和分类`联合滚动`
2. 	支持店铺 `垂直模式` 和 `水平模式` 任意切换
3. 	支持滚动过程菜品`图片懒加载`
4. 	支持菜品详情、购物车总数量查看
5. 	支持购物车同菜品不同规格分别展示
6. 	支持菜品增加数量时，添加`按钮和购物车动效`
7. 	支持`菜品多规格、多规格加价`
8. 	支持菜品打包费、运费、起送价格配置
9. 	支持`分类必选项`、`店铺满减`信息实时查看
10. 支持菜品增加减少时，所有相关信息动态展示最新价格和数量
11. 支持菜品`凑单功能`、支持不同的价格区间展示
12. 支持购物车`一键清空`菜品
13. 支持动态展示必选项和起送差价按钮
14. 支持弹框展示过渡动效

**确订单页**
1. 支持送达大约`时间选择`
2. 支持送达`地址选择`
3. 支持继续点单
4. 支持同菜品不同规格分别展示
5. 支持下单菜品量大时，展示更多下单菜品
6. 支持查看包装费、运送费、满减优惠、实际预付价
7. 支持`用户备注`
8. 支持`下单`

**订单页**

1. 支持不同类型的订单显示
2. 支持订单`再来一单`
3. 支持订单的业务类型、店铺、订单状态、满减信息、支付信息等
4. 支持查看订单详情
5. 支持取消订单
6. 支持订单相关菜品以及其他信息展示

## 目录

	order-meal
		|----pages：		项目的页面文件
			|----home	项目首页
			|----menu	用户进行点单、确认订单、提交订单等一系列相关页面
			|----order	用户下单之后的订单列表以及详情页面
			|----center	用户个人中心页
			|----address	用户地址相关页面
			|----login	用户登录页面
			|----register	用户注册页面
			|----shop	店铺列表页面
			|----explain	用户地址页面
		|----components：	一般公共组件存放处
		|----config：		关于项目相关的域名地址的配置
		|----delete：		包含之前一些 vuex 和 option api pinia的相关store
		|----interface：	项目 typescript 相关模块的 interface 数据定义文件
		|----piniaStore：	vue3的全局数据状态管理，使用的 composition api 
		|----router：		全局路由配置文件
		|----static：		存放项目静态资源文件
		|----style：		存放全局公共css scss样式
		|----utils：		存放一些常用的公共方法
	
## 使用流程

1. 安装 `node` 和 `HbuilderX` 最新版（因时间原因，项目暂未迁移为 cli 模式，目前使用该工具主要进行打包，代码编写使用的是 `vs code`）。
2. 在HbuilderX中选择 `运行` --> `运行到浏览器`，进行本地预览开发
4. 需要搭配nodejs 接口服务才行，接口服务代码地址为： http://github.com/yangguang-shine/serve

## 点餐核心数据对象

 `CategoryItemI、CategoryListMapI、FoodItemI、FoodListMapI` 四个核心对象

**categoryItem: CategoryItemI 对象**

	categoryID: number; // 分类的唯一id
    categoryName: string; // 分类的名称
    required: number;	// 该分类是否必选 1、0
	categoryIDMain: string; //菜品滚动标识id
    categoryIDAside: string;	//菜品分类滚动标识id
    foodList: FoodItemI[]; // 菜品列表
    foodListMap: FoodListMapI //菜品列表的map对象，以foodID为key，foodItem为值

**foodItem: FoodItemI 对象**

    categoryID: number;	// 分类的唯一id
    categoryName: string;	// 分类的名称
    description: string;	//菜品描述
    foodID: number;	//菜品唯一id
    foodName: string;	//菜品名称
    imgUrl: string;	//菜品初始url
    orderCount: number;	//菜品已下单数量
    price: number;	//菜品价格
    shopID: number;	//菜品所属店铺id
    unit: string;	//菜品单位
    reserveCount: number;	//菜品库存
    packPrice: number;	//菜品打包价格
    specification: string;	//菜品规格 需要JSON.parse()获取菜品规格列表
	currentImg: string;	//菜品当前图片url，用于懒加载
    fullImgPath: string;	//菜品正确展示的url
    defaultImg: string;	//菜品默认初始图片url，用于懒加载
    foodItemAmount: number;	//下单菜品总价
    showReserveCountFlag: boolean;	//是否展示库存不足tag
    specificationList: specificationItemI[];	// 菜品规格列表
    orderSpecifaList: OrderSpecifaItemI[];	// 菜品已下单规格列表
    specificationSlectedIndexList: number[];	//菜品选择是不同规格的选项
    orderSpecifaListJSON?: string;	// 菜品已下单规格列表的 JSON.stringify()

**CategoryListMapI、FoodListMapI**

	两者存在是为了解决在增加菜品或删减菜品时需要每次遍历这个分类列表和菜品列表问题。
	将每个分类类表和菜品类表map化，每次只需要根据categoryID或foodID就能准确获取相关对象

	CategoryListMapI: 菜品分类的map对象，以categoryID为key，categoryItem为值

	FoodListMapI: 菜品列表的map对象，以foodID为key，foodItem为值



### 问题思考

#### 页面有许多可以重复使用的组件和方法

初始有些页面有些重复书写的方法和组件，现在功能 还不完善，等后期整体完工后，统一进行优化

#### 页面使用了跨端，兼容小程序和H5

开始时依照小程序的开发模式进行开发，当小程序没有问题后，在H5上进行内容扩充


思考总结

1. height和flex：1共存时，取最大的值，能解决元素宽高问题
2. 组件动画，在mounted进行属性改变最好，在v-if或v-show上对属性设置动画失效，因为渲染时，默认获得的属性就是结束后的状态，没有一种状态的变化，mounted初始化属性时，页面初始化状态属性已存在，在mounted修改属性能有动画
3. 页面隐藏一个absolute元素，他的left值要用负数，如-999，使用整数999，可能会导致页面能向左滑动，也理解了为啥都写-9999而不写+999的原因
4. 子元素既有定位，也受父盒子的flex布局影响，在不同手机上以哪个效果为准有区别
5. 组件初始化使用动画，标识最好添加settimeout 0
6. 移动端定位尽量使用absolute
7. 让点击区域更大，可以 maigin 取负值，padding 取相同的正值，两者相互抵消，但点击区域增大了
8. v-if显示的组件里使用scroll-view 动画可能不会失效在蒙层上添加 @touchmove.stop.prevent，一般情况下蒙层里内容是不能滑动的，但是发现想蒙层需要滑动的内容添加 @touchmove.stop 这是添加这个属性的div 是能滑动的，只有当滑动到底部时，才有页面级的滑动穿透，另一种是蒙层中使用<scroll-view> 组件
9. pointer-events: none; 可以忽略当前层点击事件，触发当前层下的点击事件


### 解决的问题
1. watch问题 组件 FoodAddMinus 中 props.foodItem.orderCount 只会监听这个数字变化，如果foodItem变成新的值，依然会触发回调，使用watch 要确保使用的对象一直保持不变，否则会出现意想不到的问题，对数据进行初始化，能避免问题

#### 滑动穿透问题，根据不同的场景使用不同的方法

1. 蒙层添加 @touchmove.stop.prevent，蒙层内部滚动元素使用scroll-view，能较完美的解决穿透问题
2. 蒙层添加 @touchmove.stop.prevent，蒙层内部滚动元素添加 @touchmove.stop，缺点，蒙层内滑到终点后，在滑动，页面也会跟着滑动，适用一屏内滑动的内容
3. 其他解决穿透的方法，网上也要很多，但都有一些缺点

#### 组件v-if或v-show渲染的进入动画在哪控制

1. 方便组件的管理，建议由子组件自己控制
2. 其他组件控制该组件显示或隐藏动画时，添加refs进行组件控制
3. 组件挂载的动画，在组件mounted是添加一个异步阻塞方法，确保属性的变化能引起动画产生，如项目使用的 await delaySync(0)，如不添加异步方式阻塞，挂载时可能无动画显示，（当然也有不添加异步方法也有动画的，如组件内有 scroll-view 组件时，就有动画）

### 升级后的vue3和vuex使用踩坑

1. mapState，mapMutation，mapAction等在setup中使用时，因无this，mapState不能使用，mapMutation，mapAction在setup中直接调用因无this一样不行，但在setup外却能使用，因为存在这个问题，自己封装了简单的mapState，mapMutation，mapAction，在utils/mapVuex中，当然仅限于基础使用，

### 问题

1. 数据变成初始化时，考虑下是不是加载时初始化了数据
2. 再来一单查看购物车时，有的图片还未加载问题


### 使用的技术

1. 数据状态管理pinia
2. 图片懒加载、防抖函数、提升js性能优化
3. 店铺颜色使用自定义值
4. 去凑单菜品列表也使用了图片懒加载
5. 弹框展示使用了基础动画，提升体验
6. 页面的数据来源基础都在categoryList这个字段上，修改的数据都是categoryList进行数据响应分发到视图上，如添加或减少数量能响应视图上的各处业务

### 业务

1. 点餐分成两种模式：水平模式和垂直模式，可通过点餐页面的右边按钮进行切换和店铺设置时设置默认值
2. 支持订单的再来一单
3. 支持多规格菜品
