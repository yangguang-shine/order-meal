import fetch from "@/utils/fetch";
import { AddressItemI} from '@/interface/address'
import { ActionI, ActionContextI } from "@/interface/index";
async function getAddressList({ commit }: ActionContextI) {
    const addressList : AddressItemI[] = await fetch("address/list");
    commit("setAddressList", addressList);
    return addressList || [];
}

async function deleteAddress({ commit }: ActionContextI, addressID: number) {
    await fetch("address/remove", { addressID });
}
async function setDefaultAddressFetch({ commit }: ActionContextI, addressID: number) {
    await fetch("address/setDefault", { addressID });
}
async function addAddress({ commit }: ActionContextI, addressInfo: AddressItemI) {
    await fetch("address/add", addressInfo);
}
async function findAddress({ commit }: ActionContextI, addressID: number) {
    const addressInfo = await fetch("address/find", { addressID });
    return addressInfo;
}
async function editAddress({ commit }: ActionContextI, addressInfo: AddressItemI) {
    await fetch("address/edit", addressInfo);
}

async function getDefaultAddress({ commit }: ActionContextI) {
    const defaultAddress: AddressItemI = await fetch("address/getDefault", {}, { AutoErrorFlag: false });
    commit("setDefaultAddress", defaultAddress);
    return defaultAddress;
}
export default {
    getAddressList,
    deleteAddress,
    setDefaultAddressFetch,
    addAddress,
    findAddress,
    editAddress,
    getDefaultAddress,
}as ActionI;
