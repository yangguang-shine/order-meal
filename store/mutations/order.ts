import { MutationI } from "@/interface/index";

const setOrderTabIndex: MutationI = (state: any, payload): void => {
    state.orderTabIndex = payload;
};

const setOrderErrorListFlag: MutationI = (state: any, payload): void => {
    state.orderErrorListFlag[state.orderTabIndex] = payload;
};
const setOrderDetail: MutationI = (state: any, payload): void => {
    state.orderDetail = payload;
};
const setOrderDetailShopInfo: MutationI = (state: any, payload): void => {
    state.orderDetailShopInfo = payload;
};

export default {
    setOrderTabIndex,
    setOrderErrorListFlag,
    setOrderDetail,
    setOrderDetailShopInfo,
};
