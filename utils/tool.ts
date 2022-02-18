export const setStorage = (key, value) => {
	uni.setStorageSync(key, value)
}

export const getStorage = (key) => {
	return uni.getStorageSync(key)
}
export const vuexStorage = (state, key) => {
	return state[key] || uni.getStorageSync(key)
}