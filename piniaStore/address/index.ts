import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import addressState , { AddressStateI } from './state'
import addressAction, { AddressActionI} from './actions'
// interface AddressStoreI {
//     addressState: AddressStateI,
// }
export type AddressStoreI = {
    addressState: AddressStateI
} & AddressActionI

export const useAddressStore = defineStore("address", () => {
    return { addressState, ...addressAction };
});
