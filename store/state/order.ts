

export interface StateOrderI {
    allOrderList: any[], 
    orderTabIndex: number, 
    orderErrorListFlag: boolean[],
    orderDetail: any,
    orderDetailShopInfo: {}
}

const state: StateOrderI = {
    allOrderList: [[], [], [], []], 
    orderTabIndex: 0, 
    orderErrorListFlag: [false, false, false,false],
    orderDetail: {
        address: {}
    },
    orderDetailShopInfo: {}
}
export default state