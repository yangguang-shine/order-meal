import { MutationI, StateI, UserInfoI } from "@/interface/index";
import { AddressItemI } from "@/interface/address";

function setUserInfo(state: StateI, userInfo: UserInfoI): void {
    state.userInfo = userInfo;
}

// const setFindAddressInfo(state: any, addressInfo: any): void => {
//     state.findAddressInfo = addressInfo
// }
export default {
    setUserInfo,
};
