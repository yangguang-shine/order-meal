const shopList = [
	{
		name: 'shop/list',
		path: '/pages/manage/shop/list/index'
	},
	{
		name: 'shop/edit',
		path: '/pages/manage/shop/edit/index'
	},
	{
		name: 'shop/orderList',
		path: '/pages/manage/shop/order/list/index'
	},
	{
		name: 'shop/orderDetail',
		path: '/pages/manage/shop/order/detail/index'
	},
]

const categoryList = [
	{
		name: 'category/list',
		path: '/pages/manage/category/list/index'
	},
	{
		name: 'category/edit',
		path: '/pages/manage/category/edit/index'
	},
]

const foodList = [
	{
		name: 'food/list',
		path: '/pages/manage/food/list/index'
	},
	{
		name: 'food/edit',
		path: '/pages/manage/food/edit/index'
	},
]

const addressList = [
	{
		name: 'address/list',
		path: '/pages/center/address/list/index'
	},
	{
		name: 'address/edit',
		path: '/pages/center/address/edit/index'
	},
]

const routerList = [
	{
		name: 'home',
		path: '/pages/home/index'
	},
	{
		name: 'register',
		path: '/pages/register/index'
	},
	{
		name: 'login',
		path: '/pages/login/index'
	},
	{
		name: 'orderList',
		path: '/pages/order/index'
	},
	{
		name: 'center',
		path: '/pages/center/index'
	},
	{
		name: 'menu',
		path: '/pages/menu/index'
	},
	{
		name: 'confirmOrder',
		path: '/pages/menu/confirmOrder/index'
	},
	{
		name: 'orderDetail',
		path: '/pages/order/orderDetail/index'
	},
	{
		name: 'manage',
		path: '/pages/manage/index'
	},
	...shopList,
	...categoryList,
	...foodList,
	...addressList
]
export default routerList