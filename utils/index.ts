import { PositionInfoI } from "../interface";
import { getCurrentInstance } from "vue";
export const getSetting = (scopeName: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        uni.getSetting({
            success: (res: any) => {
                if (res.authSetting[scopeName]) {
                    resolve();
                } else {
                    reject(res);
                }
            },
            fail: (res: any) => {
                reject(res);
            },
        });
    });
};
interface SystemInfoI {
    windowWidth: number;
    [index: string]: any;
}
export let navigationBarHeightPX = 0;
// H5使用的是模拟导航栏 44px
// #ifdef H5
navigationBarHeightPX = 44;
// #endif
//
export let tabBarHeightPX = 0;
// H5使用的是模拟tabBar 50px
// #ifdef H5
tabBarHeightPX = 50;
// #endif
//
export let systemInfo: SystemInfoI = uni.getSystemInfoSync();

export const getRpxToPx = (rpx: number): number => {
    if (!systemInfo) {
        systemInfo = uni.getSystemInfoSync();
    }
    return (systemInfo.windowWidth / 750) * rpx;
};

export const authorize = (scopeName: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        uni.authorize({
            scope: scopeName,
            success: (res: any) => {
                resolve(res);
            },
            fail: (res: any) => {
                reject(res);
            },
        });
    });
};

export const showModal = ({ title = "提示", content = "", showCancelFlag = false, cancelText = "取消", confirmText = "确定" }): Promise<any> => {
    return new Promise((resolve, reject) => {
        uni.showModal({
            title,
            content,
            showCancelFlag,
            cancelText,
            confirmText,
            success: (res: any) => {
                console.log('res')
                console.log(res)
                if (res.confirm) {
                    resolve(res);
                } else if (res.cancel) {
                    reject(res);
                } else {
                    reject(res);
                }
            },
            fail: (e: any) => {
                reject(e);
            },
        });
    });
};

export const showLoading = ({ title = "加载中", mask = true } = {}): Promise<any> => {
    return new Promise((resolve, reject) => {
        uni.showLoading({
            title,
            mask,
            success: (res: any) => {
                resolve(res);
            },
            fail: () => {
                reject();
            },
        });
    });
};

export const showToast = ({ title = "", icon = "none", duration = 2000, mask = true } = {}): Promise<any> => {
    return new Promise((resolve, reject) => {
        uni.showToast({
            title,
            icon,
            duration,
            mask,
            success: async (res: any) => {
                await delaySync(duration);
                resolve(res);
            },
            fail: async () => {
                await delaySync(duration);
                reject();
            },
        });
    });
};

export const hideLoading = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        uni.hideLoading({
            success: (res: any) => {
                resolve(res);
            },
            fail: () => {
                reject();
            },
        });
    });
};

export const hideToast = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        uni.hideToast({
            success: (res: any) => {
                resolve(res);
            },
            fail: () => {
                reject();
            },
        });
    });
};

export const delaySync = (time = 1000): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};

const formatTime = (unit: number): string => {
    const timeStr = `${unit}`;
    return timeStr.length === 1 ? `0${timeStr}` : timeStr;
};

export const timeStampTranslate = (timeStame: number): string => {
    const orderDate: Date = new Date(+timeStame);
    const year: number = orderDate.getFullYear();
    const month: number = orderDate.getMonth() + 1;
    const date: number = orderDate.getDate();
    const hour: number = orderDate.getHours();
    const minute: number = orderDate.getMinutes();
    return `${year}-${formatTime(month)}-${formatTime(date)} ${formatTime(hour)}:${formatTime(minute)}`;
};

/**
 * 换算金额，接口返回的数值单位为（分）
 * @param {*} num
 */
export function formatAmountNum(num: number): string {
    const numStr: string = (num / 100).toFixed(2);
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function format(number: string): string {
    return number && number.replace(/(?!^)(?=(\d{3})+\.)/g, ",");
}

export function toFixedToNumber(num: number, remain: number = 2) {
    return Number(num.toFixed(remain));
}

export interface ResSelectQueryI {
    bottom: number;
    dataset: any;
    height: number;
    id: string;
    left: number;
    right: number;
    top: number;
    width: number;
}
export function selectQuery(id: string, currentInstance?: any): Promise<ResSelectQueryI> {
    return new Promise((resolve, reject) => {
        try {
            let query: any = uni.createSelectorQuery();
            // if (type === "component") {
            //     const currentInstance = getCurrentInstance();
            //     query = query.in(currentInstance);
            // }
            if (currentInstance) {
                // const currentInstance = getCurrentInstance();
                query = query.in(currentInstance);
            }
            query
                .select(id)
                .boundingClientRect((res: ResSelectQueryI | null) => {
                    console.log(id)
                    console.log(res)
                    if (res) {
                        if (process.env.NODE_ENV === "development") {
                            res.top = res.top + navigationBarHeightPX;
                            res.bottom = res.bottom + navigationBarHeightPX;
                        } else {
                            console.log("生产环境");
                        }
                        resolve(res);
                    } else {
                        reject(null);
                    }
                })
                .exec();
        } catch (e) {
            console.log(id);
            console.log(e);
        } finally {
        }
    });
}
