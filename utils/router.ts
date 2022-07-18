import routerList from "@/router/index";
import { RouteInfoI } from "@/router/index";
const routerMap = routerList.reduce((obj: { [index: string]: string }, item: RouteInfoI) => {
    obj[item.name] = item.path;
    return obj;
}, {});
interface RouteParamsI {
    name: string;
    query?: any;
}
const router =
    (api: "navigateTo" | "redirectTo" | "reLaunch" | "switchTab" | "navigateBack") =>
    (params: RouteParamsI | number = 1) => {
        console.log("params");
        console.log(params);
        // 生产环境动态使用uni api 会被tree shaking掉
        if (typeof params !== "number") {
            const path: string = routerMap[params.name];
            const search: string = Object.keys(params.query || {})
                .map((key) => `${key}=${params.query[key]}`)
                .join("&");
            const url: string = `${path}${search ? `?${search}` : ""}`;
            console.log(url)
            if (api === "navigateTo") {
                uni.navigateTo({
                    url,
                });
            } else if (api === "redirectTo") {
                uni.redirectTo({
                    url,
                });
            } else if (api === "reLaunch") {
                uni.reLaunch({
                    url,
                });
            } else if (api === "switchTab") {
                uni.switchTab({
                    url,
                });
            }
        }
        if (api === "navigateBack") {
            uni.navigateBack({
                delta: params,
            });
        }
    };
export default {
    navigateTo: router("navigateTo"),
    redirectTo: router("redirectTo"),
    reLaunchTo: router("reLaunch"),
    switchTabTo: router("switchTab"),
    back: router("navigateBack"),
};

// export default {
// 	navigateTo: (params) => {
// 		const path: string = routerMap[params.name]
// 		const search: string =  Object.keys(params.query || {}).map(key => `${key}=${params.query[key]}`).join('&')
// 		const url: string = `${path}${search ? `?${search}` : ''}`
// 		uni.navigateTo({
// 			url
// 		})
// 	},
// 	redirectTo: (params) => {
// 		const path: string = routerMap[params.name]
// 		const search: string =  Object.keys(params.query || {}).map(key => `${key}=${params.query[key]}`).join('&')
// 		const url: string = `${path}${search ? `?${search}` : ''}`
// 		uni.redirectTo({
// 			url
// 		})
// 	},
// 	reLaunchTo: (params) => {
// 		const path: string = routerMap[params.name]
// 		const search: string =  Object.keys(params.query || {}).map(key => `${key}=${params.query[key]}`).join('&')
// 		const url: string = `${path}${search ? `?${search}` : ''}`
// 		uni.reLaunch({
// 			url
// 		})
// 	},
// 	switchTabTo: (params) => {
// 		const path: string = routerMap[params.name]
// 		const search: string =  Object.keys(params.query || {}).map(key => `${key}=${params.query[key]}`).join('&')
// 		const url: string = `${path}${search ? `?${search}` : ''}`
// 		uni.switchTab({
// 			url
// 		})
// 	},
// 	back: (params) => {
// 		const path: string = routerMap[params.name]
// 		const search: string =  Object.keys(params.query || {}).map(key => `${key}=${params.query[key]}`).join('&')
// 		const url: string = `${path}${search ? `?${search}` : ''}`
// 		uni.navigateBack({
// 			url
// 		})
// 	},
// }
