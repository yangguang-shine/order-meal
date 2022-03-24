import { MutationI } from "@/interface/index";


const setAddressList: MutationI = (state, payload): void => {
    state.addressList = payload;
};

const setDefaultAddress: MutationI = (state, payload,): void => {
    state.defaultAddress = payload;
};

// const setFindAddressInfo = (state: any, addressInfo: any): void => {
//     state.findAddressInfo = addressInfo
// }

export default {
    setAddressList,
    setDefaultAddress,
};
