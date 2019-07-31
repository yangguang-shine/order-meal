import routerList from '../router';
const routerMap = routerList.reduce((obj, item) => {
	obj[item.name] = item.path
	return obj
}, {})
const router = (api) => (params = {}) => {
	const path = routerMap[params.name]
	console.log(params)
	const search =  Object.keys(params.query || {}).map(key => `${key}=${params.query[key]}`).join('&')
	console.log(search)
	const url = `${path}${search ? `?${search}` : ''}`
	uni[api]({
		url
	})
}
export default {
	push: router('navigateTo'),
	raplace: router('redirectTo'),
	reLaunch: router('reLaunch'),
	switchTab: router('switchTab'),
	back: router('navigateBack'),
}