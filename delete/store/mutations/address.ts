import { MutationI, StateI } from "@/interface/index";
import { AddressItemI} from '@/interface/address'


function setAddressList(state:StateI, addressList: AddressItemI[]): void {
    state.addressList = addressList;
};

function setDefaultAddress(state: StateI, defaultAddress: AddressItemI): void {
    console.log('vuex setDefaultAddress')
    console.log(defaultAddress)
    state.defaultAddress = defaultAddress;
};

// const setFindAddressInfo(state: any, addressInfo: any): void => {
//     state.findAddressInfo = addressInfo
// }
export default {
    setAddressList,
    setDefaultAddress,
}
