import { MutationI, StateI, OrderDetailI , ShopItemI} from "@/interface/index";

function setOrderTabIndex (state: StateI, payload: number): void  {
    state.orderTabIndex = payload;
};

function setOrderErrorListFlag (state: StateI, payload: boolean): void  {
    state.orderErrorListFlag[state.orderTabIndex] = payload;
};
function setOrderDetail (state: StateI, orderDetail: OrderDetailI): void  {
    state.orderDetail = orderDetail;
};
function setOrderDetailShopInfo (state: StateI, shopInfo: ShopItemI): void  {
    state.orderDetailShopInfo = shopInfo;
};

export default {
    setOrderTabIndex,
    setOrderErrorListFlag,
    setOrderDetail,
    setOrderDetailShopInfo,
} as MutationI;
