export interface RouteInfoI {
	name: string,
	path: string
}

const address: RouteInfoI[] = [
	{
		name: 'address/list',
		path: '/pages/address/list/index'
	},
	{
		name: 'address/edit',
		path: '/pages/address/edit/index'
	},
]

const center : RouteInfoI[] = [
	{
		name: 'center',
		path: '/pages/center/index'
	},
	{
		name: 'center/userInfo',
		path: '/pages/center/userInfo/index'
	},
	{
		name: 'center/userInfo/edit',
		path: '/pages/center/userInfo/edit/index'
	}

	
]
const home: RouteInfoI[] = [
	
	{
		name: 'home',
		path: '/pages/home/index'
	},
]
const shop: RouteInfoI[] = [
	
	{
		name: 'shop',
		path: '/pages/shop/index'
	},
]

const login:RouteInfoI[] = [
	{
		name: 'login',
		path: '/pages/login/index',
	},
]

const menu: RouteInfoI[] = [
	{
		name: 'menu/info',
		path: '/pages/menu/info/index'
	},
	{
		name: 'menu/confirm',
		path: '/pages/menu/confirm/index'
	},
]

const order: RouteInfoI[] = [
	{
		name: 'order/list',
		path: '/pages/order/list/index'
	},
	{
		name: 'order/detail',
		path: '/pages/order/detail/index'
	},
]
const register:RouteInfoI[] = [
	{
		name: 'register',
		path: '/pages/register/index'
	},
]
const explain: RouteInfoI[] = [
{
	name: 'explain',
	path: '/pages/explain/index'
}
]


const route = [
	...address,
	...center,
	...home,
	...shop,
	...login,
	...menu,
	...order,
	...register,
	...explain
	// ...manage,
	// ...role,
]
export default route


// const user: RouteInfoI[] = [





// 	{
// 		name: 'shop/list',
// 		path: '/pages/shop/list/index'
// 	},
// ]

// const manage:RouteInfoI[] = [
// 	{
// 		name: 'manage/category/list',
// 		path: '/pages/manage/category/list/index'
// 	},
// 	{
// 		name: 'manage/category/edit',
// 		path: '/pages/manage/category/edit/index'
// 	},
// 	{
// 		name: 'manage/food/list',
// 		path: '/pages/manage/food/list/index'
// 	},
// 	{
// 		name: 'manage/food/edit',
// 		path: '/pages/manage/food/edit/index'
// 	},

// 	{
// 		name: 'manage/meituan/copy',
// 		path: '/pages/manage/meituan/copy/index'
// 	},
// 	{
// 		name: 'manage/order/list',
// 		path: '/pages/manage/order/list/index'
// 	},
// 	{
// 		name: 'manage/order/detail',
// 		path: '/pages/manage/order/detail/index'
// 	},
// 	{
// 		name: 'manage/shop/list',
// 		path: '/pages/manage/shop/list/index'
// 	},
// 	{
// 		name: 'manage/shop/edit',
// 		path: '/pages/manage/shop/edit/index'
// 	},
// 	{
// 		name: 'animate/list',
// 		path: '/pages/animate/list/index'
// 	},
// 	{
// 		name: 'animate/item',
// 		path: '/pages/animate/item/index'
// 	},
// ]

// const role:RouteInfoI[] = [
// 	{
// 		name: 'role',
// 		path: '/pages/role/index'
// 	},
// ]







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
// 		path: '/pages/center/index'
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

