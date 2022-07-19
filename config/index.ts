  
const devTestProduce = true
export let domain = devTestProduce ? 'http://dev.jr.jd.com:9999' :  `http://yangguang.natappvip.cc`
export let requestHost: string = `${domain}/api`
if (process.env.NODE_ENV === 'development') {
	console.log('开发环境');
	domain = `http://dev.jr.jd.com:9999`
	requestHost = "http://dev.jr.jd.com:6789/api"
} else {
	console.log('生产环境');
}
export const host: string = `${domain}`
export const shopImgPath: string = `${domain}/image/shop`
export const foodImgPath:string = `${domain}/image/food`
export const commonImgPath:string = `${domain}/image/common`
export const defaultFoodImg:string = `${domain}/image/food/default.png`
// export const requestHost: string = "http://dev.jr.jd.com:6789/api"