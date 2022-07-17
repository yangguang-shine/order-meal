import routerList from '@/router/index';
import { RouteInfoI } from '@/router/index';
const routerMap = routerList.reduce((obj: {[index: string]: string} , item: RouteInfoI) => {
	obj[item.name] = item.path
	return obj
}, {})
// const router = (api: string) => (params: {
// 	name: string,
// 	query?: any
// } = {name: '', query: {}}) => {
// 	const path: string = routerMap[params.name]
// 	const search: string =  Object.keys(params.query || {}).map(key => `${key}=${params.query[key]}`).join('&')
// 	const url: string = `${path}${search ? `?${search}` : ''}`
// 	uni[api]({
// 		url
// 	})
// }
// export default {
// 	navigateTo: router('navigateTo'),
// 	redirectTo: router('redirectTo'),
// 	reLaunchTo: router('reLaunch'),
// 	switchTabTo: router('switchTab'),
// 	back: router('navigateBack'),
// }

export default {
	navigateTo: (params) => {
		const path: string = routerMap[params.name]
		const search: string =  Object.keys(params.query || {}).map(key => `${key}=${params.query[key]}`).join('&')
		const url: string = `${path}${search ? `?${search}` : ''}`
		uni.navigateTo({
			url
		})
	},
	redirectTo: (params) => {
		const path: string = routerMap[params.name]
		const search: string =  Object.keys(params.query || {}).map(key => `${key}=${params.query[key]}`).join('&')
		const url: string = `${path}${search ? `?${search}` : ''}`
		uni.redirectTo({
			url
		})
	},
	reLaunchTo: (params) => {
		const path: string = routerMap[params.name]
		const search: string =  Object.keys(params.query || {}).map(key => `${key}=${params.query[key]}`).join('&')
		const url: string = `${path}${search ? `?${search}` : ''}`
		uni.reLaunch({
			url
		})
	},
	switchTabTo: (params) => {
		const path: string = routerMap[params.name]
		const search: string =  Object.keys(params.query || {}).map(key => `${key}=${params.query[key]}`).join('&')
		const url: string = `${path}${search ? `?${search}` : ''}`
		uni.switchTab({
			url
		})
	},
	back: (params) => {
		const path: string = routerMap[params.name]
		const search: string =  Object.keys(params.query || {}).map(key => `${key}=${params.query[key]}`).join('&')
		const url: string = `${path}${search ? `?${search}` : ''}`
		uni.navigateBack({
			url
		})
	},
}