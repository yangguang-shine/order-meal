import fetch from "@/utils/fetch";
import { AddressItemI} from '@/interface/address'
import { ActionI, ActionContextI } from "@/interface/index";
async function getAddressList({ commit }: ActionContextI) {
    const addressList : AddressItemI[] = await fetch("user/address/list");
    commit("setAddressList", addressList);
    return addressList || [];
}

async function deleteAddress({ commit }: ActionContextI, addressID: number) {
    await fetch("user/address/remove", { addressID });
}
async function setDefaultAddressFetch({ commit }: ActionContextI, addressID: number) {
    await fetch("user/address/setDefault", { addressID });
}
async function addAddress({ commit }: ActionContextI, addressInfo: AddressItemI) {
    await fetch("user/address/add", addressInfo);
}
async function findAddress({ commit }: ActionContextI, addressID: number) {
    const addressInfo = await fetch("user/address/find", { addressID });
    return addressInfo;
}
async function editAddress({ commit }: ActionContextI, addressInfo: AddressItemI) {
    await fetch("user/address/edit", addressInfo);
}

async function getDefaultAddress({ commit }: ActionContextI) {
    const defaultAddress: AddressItemI = await fetch("user/address/getDefault", {}, { AutoErrorFlag: false });
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
