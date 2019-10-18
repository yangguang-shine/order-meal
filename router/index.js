const shopList = [
	{
		name: 'shop/list',
		path: '/pages/shop/list/index'
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

const entertainmentList = [
	{
		name: 'entertainment',
		path: '/pages/entertainment/index'
	},
	{
		name: 'entertainment/joke',
		path: '/pages/entertainment/joke/index'
	},
	{
		name: 'entertainment/news',
		path: '/pages/entertainment/news/index'
	},
	{
		name: 'entertainment/cuisine',
		path: '/pages/entertainment/cuisine/index'
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
	...addressList,
	...entertainmentList,
	...shopList
]
export default routerList