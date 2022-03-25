import fetch from "@/utils/fetch";

import { ActionI, ActionsContextI } from "@/interface/index";
async function getAddressList({ commit }: ActionsContextI, payload: any) {
    const addressList = await fetch("user/address/list", {});
    commit("setAddressList", addressList);
    return addressList || [];
}

async function deleteAddress({ commit }: ActionsContextI, addressID: string) {
    await fetch("user/address/remove", { addressID });
}
async function setDefaultAddressFetch({ commit }: ActionsContextI, addressID: string) {
    await fetch("user/address/setDefault", { addressID });
}
async function addAddress({ commit }: ActionsContextI, addressInfo: any) {
    await fetch("user/address/add", addressInfo);
}
async function findAddress({ commit }: ActionsContextI, addressID: string) {
    const addressInfo = await fetch("user/address/find", { addressID });
    return addressInfo;
}
async function editAddress({ commit }: ActionsContextI, addressInfo: any) {
    await fetch("user/address/edit", addressInfo);
}

async function getDefaultAddress({ commit }: ActionsContextI) {
    const defaultAddress = await fetch("user/address/getDefault", {}, { error: false });
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
