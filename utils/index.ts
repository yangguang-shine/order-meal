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

let systemInfo: SystemInfoI;

export const get1rpx2px = (rpx: number): number => {
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

export const showModal = ({
    title = "提示",
    content = "",
    showCancel = false,
    cancelText = "取消",
    confirmText = "确定",
}) : Promise<any> => {
    return new Promise((resolve, reject) => {
        uni.showModal({
            title,
            content,
            showCancel,
            cancelText,
            confirmText,
            success: (res: any) => {
                if (res.confirm) {
                    resolve(res);
                } else if (res.cancel) {
                    reject(res);
                } else {
                    reject(res);
                }
            },
            fail: () => {
                reject();
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

export const showToast = ({
    title = "",
    icon = "none",
    duration = 1500,
    mask = false,
} = {}) : Promise<any>=> {
    return new Promise((resolve, reject) => {
        uni.showToast({
            title,
            icon,
            duration,
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

export const hideToast = ():Promise<any> => {
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

export const timeStampTranslate = (timeStame: number) : string => {
    const orderDate = new Date(+timeStame);
    const year = orderDate.getFullYear();
    const month = orderDate.getMonth() + 1;
    const date = orderDate.getDate();
    const hour = orderDate.getHours();
    const minute = orderDate.getMinutes();
    return `${year}-${formatTime(month)}-${formatTime(date)} ${formatTime(
        hour
    )}:${formatTime(minute)}`;
};

/**
 * 换算金额，接口返回的数值单位为（分）
 * @param {*} num
 */
export function formatAmountNum(num: number) : string {
    num = parseFloat(num) || 0;
    num = (num / 100).toFixed(2);
    num = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num;
}

function format(number: number): string {
    return number && number.replace(/(?!^)(?=(\d{3})+\.)/g, ",");
}
