export const devPort = '6789'
export const proHost = '9999'
export const devHost = 'dev.jr.jd.com'
export let serveDomain = 'https://yangguang.natappvip.cc'
// #ifdef H5
serveDomain = window.location.origin;
// #endif
// #ifdef MP-WEIXIN
serveDomain = `https://yangguang.natappvip.cc`;
// #endif
export let requestHost: string = `${serveDomain}/api`;
if (process.env.NODE_ENV === "development") {
    console.log("开发环境");
    serveDomain = `http://${devHost}:${devPort}`;
    requestHost = `http://${devHost}:${proHost}`;
} else {
    console.log("生产环境");
}
export const host: string = `${serveDomain}`;
export const shopImgPath: string = `${serveDomain}/image/shop`;
export const foodImgPath: string = `${serveDomain}/image/food`;
export const commonImgPath: string = `${serveDomain}/image/common`;
export const defaultFoodImg: string = `${serveDomain}/image/food/default.png`;
// export const requestHost: string = "http://dev.jr.jd.com:6789/api"
