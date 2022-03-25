import { MutationI, StateI } from "@/interface/index";


function setAddressList(state:StateI, payload: any): void {
    state.addressList = payload;
};

function setDefaultAddress(state: StateI, payload: any): void {
    state.defaultAddress = payload;
};

// const setFindAddressInfo(state: any, addressInfo: any): void => {
//     state.findAddressInfo = addressInfo
// }
export default {
    setAddressList,
    setDefaultAddress,
} as MutationI
