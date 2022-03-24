

export interface orderStateI {
    allOrderList: any[], 
    orderTabIndex: number, 
    orderErrorListFlag: boolean[],
    orderDetail: any,
    orderDetailShopInfo: {}
}

const state: orderStateI = {
    allOrderList: [[], [], [], []], 
    orderTabIndex: 0, 
    orderErrorListFlag: [false, false, false,false],
    orderDetail: {
        address: {}
    },
    orderDetailShopInfo: {}
}
export default state