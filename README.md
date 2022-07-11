# 使用流程

1. 安装node和HbuilderX。
2. 在HbuilderX中运行命令 npm install
3. 在HbuilderX的选项“运行”在微信小程序中

## 主要功能

1. 可以自定义店铺、菜品分类、菜品详情。
2. 可以上传店铺图片和菜品图片。
3. 店铺中可以增加满减营销和业务类型（预定和外卖）
4. 可以在自定义的店铺进行点餐、下单。
5. 店铺的管理者可以对其他客户下的订单进行操作。
6. 提供删除自定义店铺相关信息（包含图片），操作不可逆。

## 在线使用

手机浏览器访问：[个人点餐项目](https://yangguang.natappvip.cc/pages/home/index)

用户端：手机浏览器访问 https://yangguang.natappvip.cc/pages/home/index

管理端：手机浏览器访问 https://yangguang.natappvip.cc/manage/pages/home/index

小程序版： 添加微信：13429808281，获取体验权限

## 相关github地址

用户端github地址: https://github.com/yangguang-shine/my-uni-app

管理端github地址： https://github.com/yangguang-shine/mp-manage

后端github地址: https://github.com/yangguang-shine/my-app


### 问题思考

#### 不使用vuex原因

页面刷新后，所有存在vuex的数据全部丢失，每个依赖vuex数据的页面都要考虑页面刷新，数据丢失问题，所有项目不使用vuex，使用了localStorage

#### 页面有许多可以重复使用的组件和方法

初始有些页面有些重复书写的方法和组件，现在功能 还不完善，等后期整体完工后，统一进行优化

#### 页面使用了跨端，兼容小程序和H5

开始时依照小程序的开发模式进行开发，当小程序没有问题后，在H5上进行内容扩充


思考总结

1. 猜测height和flex：1共存时，取最大的值
2. 组件动画，在mounted进行属性改变最好，在v-if或v-show上对属性设置动画失效，因为渲染时，默认获得的属性就是结束后的状态，没有一种状态的变化，mounted初始化属性时，页面初始化状态属性已存在，在mounted修改属性能有动画
3. 页面隐藏一个absolute元素，他的left值要用负数，如-999，使用整数999，可能会导致页面能向左滑动，也理解了为啥都写-9999而不写+999的原因
4. 子元素既有定位，也受父盒子的flex布局影响，在不同手机上以哪个效果为准有区别
5. 组件初始化使用动画，标识最好添加settimeou 0
6. 移动端定位尽量使用absolute
7. 让点击区域更大，可以 maigin 取负值，padding 取相同的正值，两者相互抵消，但点击区域增大了
8. v-if显示的组件里使用scroll-view 动画可能不会失效在蒙层上添加 @touchmove.stop.prevent，一般情况下蒙层里内容是不能滑动的，但是发现想蒙层需要滑动的内容添加 @touchmove.stop 这是添加这个属性的div 是能滑动的，只有当滑动到底部时，才有页面级的滑动穿透，另一种是蒙层中使用<scroll-view> 组件
9. pointer-events: none; 可以忽略当前层点击事件，触发当前层下的点击事件


### 解决的问题
1. watch问题 组件 FoodAddMinus 中 props.foodItem.orderCount 只会监听这个数字变化，如果foodItem变成新的值，依然会触发回调，使用watch 要确保使用的对象一直保持不变，否则会出现意想不到的问题，多对数据进行初始化，能避免很多问题

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

4.14: 添加点餐页垂直以及水平模式并相互切换
4.19: 添加菜品售罄功能，仅剩1份等标识
4.20: 平台店铺业务列表完善
4.21: 外卖业务新增起送费、配送费（外卖业务）、打包费（外卖、自提业务）
4.22: 确认订单也支持堂食、外卖、自提业务
4.25: 添加店铺皮肤色
4.26: 菜品库存判断
4.27: 分类和菜品添加扁平map，防止总是遍历list
4.28: 超出库存提示
7.11: 添加必点选项

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
3. 
