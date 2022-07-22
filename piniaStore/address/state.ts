
import {AddressItemI, initAddressItem} from '@/interface/index'
import { RefI } from '@/interface/vueInterface';
import { ref, reactive } from "vue";
export interface AddressStateI {
    addressList: AddressItemI[],
    defaultAddress: AddressItemI
}
export type AddressStateG = {
    [T in keyof AddressStateI]: RefI<AddressStateI[T]>
}
const addressState: AddressStateI = reactive({
    addressList: [],
    defaultAddress: initAddressItem,
})
export default addressState