import routerList from '../router';
const routerMap = routerList.reduce((obj, item) => {
	obj[item.name] = item.path
	return obj
}, {})
const router = (api) => (params = {}) => {
	const path = routerMap[params.name]
	const search =  Object.keys(params.query || {}).map(key => `${key}=${params.query[key]}`).join('&')
	const url = `${path}${search ? `?${search}` : ''}`
	uni[api]({
		url
	})
}
export default {
	navigateTo: router('navigateTo'),
	redirectTo: router('redirectTo'),
	reLaunchTo: router('reLaunch'),
	switchTabTo: router('switchTab'),
	back: router('navigateBack'),
}