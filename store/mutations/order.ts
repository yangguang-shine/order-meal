import { MutationI, StateI } from "@/interface/index";

function setOrderTabIndex (state: StateI, payload: number): void  {
    state.orderTabIndex = payload;
};

function setOrderErrorListFlag (state: StateI, payload: boolean): void  {
    state.orderErrorListFlag[state.orderTabIndex] = payload;
};
function setOrderDetail (state: StateI, payload): void  {
    state.orderDetail = payload;
};
function setOrderDetailShopInfo (state: StateI, payload): void  {
    state.orderDetailShopInfo = payload;
};

export default {
    setOrderTabIndex,
    setOrderErrorListFlag,
    setOrderDetail,
    setOrderDetailShopInfo,
} as MutationI;
