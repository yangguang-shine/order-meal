const user = [
	{
		name: 'user/center',
		path: '/pages/user/center/index'
	},
	{
		name: 'user/address/list',
		path: '/pages/user/address/list/index'
	},
	{
		name: 'user/address/edit',
		path: '/pages/user/address/edit/index'
	},
	
	{
		name: 'user/home',
		path: '/pages/user/home/index'
	},
	{
		name: 'user/menu/info',
		path: '/pages/user/menu/info/index'
	},
	{
		name: 'user/menu/confirm',
		path: '/pages/user/menu/confirm/index'
	},
	{
		name: 'user/order/list',
		path: '/pages/user/order/list/index'
	},
	{
		name: 'user/order/detail',
		path: '/pages/user/order/detail/index'
	},
	{
		name: 'user/shop/list',
		path: '/pages/user/shop/list/index'
	},
]

const manage = [
	{
		name: 'manage/category/list',
		path: '/pages/manage/category/list/index'
	},
	{
		name: 'manage/category/edit',
		path: '/pages/manage/category/edit/index'
	},
	{
		name: 'manage/food/list',
		path: '/pages/manage/food/list/index'
	},
	{
		name: 'manage/food/edit',
		path: '/pages/manage/food/edit/index'
	},

	{
		name: 'manage/meituan/copy',
		path: '/pages/manage/meituan/copy/index'
	},
	{
		name: 'manage/order/list',
		path: '/pages/manage/order/list/index'
	},
	{
		name: 'manage/order/detail',
		path: '/pages/manage/order/detail/index'
	},
	{
		name: 'manage/shop/list',
		path: '/pages/manage/shop/list/index'
	},
	{
		name: 'manage/shop/edit',
		path: '/pages/manage/shop/edit/index'
	},
	{
		name: 'animate/list',
		path: '/pages/animate/list/index'
	},
	{
		name: 'animate/item',
		path: '/pages/animate/item/index'
	},
]

const role = [
	{
		name: 'role',
		path: '/pages/role/index'
	},
]

const login = [
	{
		name: 'login',
		path: '/pages/login/index'
	},
]

const register = [
	{
		name: 'register',
		path: '/pages/register/index'
	},
]



// const shopList = [
// 	{
// 		name: 'shop/list',
// 		path: '/pages/shop/list/index'
// 	},
// ]

// const addressList = [
// 	{
// 		name: 'address/list',
// 		path: '/pages/center/address/list/index'
// 	},
// 	{
// 		name: 'address/edit',
// 		path: '/pages/center/address/edit/index'
// 	},
// ]

// const entertainmentList = [
// 	{
// 		name: 'entertainment',
// 		path: '/pages/entertainment/index'
// 	},
// 	{
// 		name: 'entertainment/joke',
// 		path: '/pages/entertainment/joke/index'
// 	},
// 	{
// 		name: 'entertainment/news',
// 		path: '/pages/entertainment/news/index'
// 	},
// 	{
// 		name: 'entertainment/cuisine',
// 		path: '/pages/entertainment/cuisine/index'
// 	},
// 	{
// 		name: 'entertainment/question',
// 		path: '/pages/entertainment/question/index'
// 	},
// ]

// const routerList = [
// 	{
// 		name: 'home',
// 		path: '/pages/home/index'
// 	},
// 	{
// 		name: 'register',
// 		path: '/pages/register/index'
// 	},
// 	{
// 		name: 'login',
// 		path: '/pages/login/index'
// 	},
// 	{
// 		name: 'orderList',
// 		path: '/pages/order/index'
// 	},
// 	{
// 		name: 'center',
// 		path: '/pages/user/center/index'
// 	},
// 	{
// 		name: 'menu',
// 		path: '/pages/menu/index'
// 	},
// 	{
// 		name: 'confirmOrder',
// 		path: '/pages/menu/confirmOrder/index'
// 	},
// 	{
// 		name: 'orderDetail',
// 		path: '/pages/order/orderDetail/index'
// 	},
// 	...addressList,
// 	...entertainmentList,
// 	...shopList
// ]
export default [
	...user,
	...manage,
	...role,
	...login,
	...register
]