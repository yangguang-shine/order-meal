
import {AddressItemI, initAddressItem} from '@/interface/index'
export interface StateAddressI {
    addressList: AddressItemI[],
    defaultAddress: AddressItemI
}




const state: StateAddressI = {
    addressList: [],
    defaultAddress: initAddressItem,
}
export default state