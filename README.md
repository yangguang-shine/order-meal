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

手机浏览器访问：[个人点餐项目](https://yangguang.natappvip.cc/user/pages/home/index)

用户端：手机浏览器访问 https://yangguang.natappvip.cc/user/pages/home/index

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
8. v-if显示的组件里使用scroll-view 动画可能不会失效


