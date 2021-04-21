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


export const delaySync = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time);
    })
}