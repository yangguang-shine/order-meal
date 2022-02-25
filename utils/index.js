export const getSetting = (scopeName) => {
    return new Promise((resolve, reject) => {
        uni.getSetting({
            success: (res) => {
                if (res.authSetting[scopeName]) resolve()
                else reject(res)
            },
            fail: (res) => {
                reject(res)
            }
        })
    })
}

export const getSystemRpx = () => {
    return new Promise((resolve, reject) => {
        uni.getSystemInfo({
            success(res) {
                console.log(111)
                resolve(res)
            },
            fail(e) {
                console.log(222)
                reject(e)
            }
        });
    })
}

export const authorize = (scopeName) => {
    return new Promise((resolve, reject) => {
        uni.authorize({
            scope: scopeName,
            success: (res) => {
                resolve(res)
            },
            fail: (res) => {
                reject(res)
            }
        })
    })
}

export const showModal = ({ title = '提示', content = '', showCancel = false, cancelText = '取消', confirmText = '确定' }) => {
    return new Promise((resolve, reject) => {
        uni.showModal({
            title,
            content,
            showCancel,
            cancelText,
            confirmText,
            success: (res) => {
                if (res.confirm) {
                    resolve(res);
                } else if (res.cancel) {
                    reject(res);
                } else {
                    reject(res)
                }
            },
            fail: () => {
                reject()
            }
        })
    })
}

export const showLoading = ({ title = '加载中', mask = true } = {}) => {
    return new Promise((resolve, reject) => {
        uni.showLoading({
            title,
            mask,
            success: () => {
                resolve()
            },
            fail: () => {
                reject()
            }
        })
    })
}

export const showToast = ({ title = '', icon = 'none', duration = 1500, mask = false } = {}) => {
    return new Promise((resolve, reject) => {
        uni.showToast({
            title,
            icon,
            duration,
            mask,
            success: () => {
                resolve()
            },
            fail: () => {
                reject()
            }
        })
    })
}

export const hideLoading = ({ title = '', icon = 'none', duration = 1500, mask = false } = {}) => {
    return new Promise((resolve, reject) => {
        uni.hideLoading({
            success: () => {
                resolve()
            },
            fail: () => {
                reject()
            }
        })
    })
}

export const hideToast = ({ title = '', icon = 'none', duration = 1500, mask = false } = {}) => {
    return new Promise((resolve, reject) => {
        uni.hideToast({
            success: () => {
                resolve()
            },
            fail: () => {
                reject()
            }
        })
    })
}


export const delaySync = (time = 1000) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time);
    })
}


const formatTime = (unit) => {
	const timeStr = `${unit}`
	return timeStr.length === 1 ? `0${timeStr}` : timeStr
}

export const timeStampTranslate = (timeStame) => {
	const orderDate = new Date(+timeStame);
	const year = orderDate.getFullYear()
	const month = orderDate.getMonth() + 1
	const date = orderDate.getDate()
	const hour = orderDate.getHours()
	const minute = orderDate.getMinutes()
	return `${year}-${formatTime(month)}-${formatTime(date)} ${formatTime(hour)}:${formatTime(minute)}`
}


/**
 * 换算金额，接口返回的数值单位为（分）
 * @param {*} num
 */
export function formatAmountNum(num) {
    num = parseFloat(num) || 0;
    num = (num / 100).toFixed(2);
    num = num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return num;
}

function format(number) {
    return number && number.replace(/(?!^)(?=(\d{3})+\.)/g, ",");
  }