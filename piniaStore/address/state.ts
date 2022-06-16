
import {AddressItemI, initAddressItem} from '@/interface/index'
import { ref, reactive } from "vue";
export interface AddressStateI {
    addressList: AddressItemI[],
    defaultAddress: AddressItemI
}
const addressState: AddressStateI = reactive({
    addressList: [],
    defaultAddress: initAddressItem,
})
export default addressState