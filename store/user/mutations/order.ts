import router from '../../../utils/router'

const setOrderTabIndex = (state: any, payload): void => {
    state.orderTabIndex = payload
}

const setOrderErrorListFlag = (state: any, payload): void => {
    state.orderErrorListFlag[state.orderTabIndex] = payload
}
const setOrderDetail = (state: any, payload): void => {
    state.orderDetail = payload
}
const setOrderDetailShopInfo = (state: any, payload): void => {
    state.orderDetailShopInfo = payload
}

export default { 
    setOrderTabIndex,
    setOrderErrorListFlag,
    setOrderDetail,
    setOrderDetailShopInfo
}