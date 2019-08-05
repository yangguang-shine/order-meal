const categoryList = [
	{
		name: 'category/list',
		path: '/pages/category/list/index'
	},
	{
		name: 'category/edit',
		path: '/pages/category/edit/index'
	},
]
const foodList = [
	{
		name: 'food/list',
		path: '/pages/food/list/index'
	},
	{
		name: 'food/edit',
		path: '/pages/food/edit/index'
	},
]
const routerList = [
	{
		name: 'home',
		path: '/pages/home/index'
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
	...categoryList,
	...foodList
]
export default routerList