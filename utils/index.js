export const getSetting = (scopeName) => {
    return new Promise((resolve, reject) => {
        uni.getSetting({
            success: (res) => {
                if (res.authSetting[`scope.${scopeName}`]) resolve()
                else reject()
            },
            fail: () => {
                reject()
            }
        })
    })

}