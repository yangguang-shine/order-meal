export const setStorage = (key, value) => {
	uni.setStorageSync(key, value)
}

export const getStorage = (key) => {
	return uni.getStorageSync(key)
}
export const vuexStorage = (state, key) => {
	return state[key] || uni.getStorageSync(key)
}


export function debounce(fn: any, delay: number) {
    let timer: any;
    return (...params: any[]) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...params);
            clearTimeout(timer);
        }, delay);
    };
}

export function throttle(fn: any, delay: number) {
    let timer: undefined | number = undefined;
    return (...params: any[]) => {
        if (!timer) {
            timer = setTimeout(() => {
                fn(...params);
                clearTimeout(timer);
            }, delay);
        }
    };
}