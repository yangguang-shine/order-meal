
import {AddressInfoI} from '@/interface/index'
export interface AddressStateI {
    addressList: AddressInfoI[],
    defaultAddress: AddressInfoI
}


const state: AddressStateI = {
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