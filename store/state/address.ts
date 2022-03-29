
import {AddressItemI} from '@/interface/index'
export interface StateAddressI {
    addressList: AddressItemI[],
    defaultAddress: AddressItemI
}


const state: StateAddressI = {
    addressList: [],
    defaultAddress: {
        address1:'',
        address2: '',
        addressID: 0,
        latitude: '',
        longitude: '',
        mobile: '',
        name: '',
        sex: 0,
        userID: 0
    },
}
export default state