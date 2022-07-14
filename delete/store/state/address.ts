
import {AddressItemI, initAddressItem} from '@/interface/index'
export interface AddressStateI {
    addressList: AddressItemI[],
    defaultAddress: AddressItemI
}




const state: AddressStateI = {
    addressList: [],
    defaultAddress: initAddressItem,
}
export default state