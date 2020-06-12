export const setStorage = (key, value) => {
	uni.setStorageSync(key, value)
}

export const getStorage = (key) => {
	return uni.getStorageSync(key)
}