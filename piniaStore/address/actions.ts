import fetch from "@/utils/fetch";
import { AddressItemI } from "@/interface/address";
import { ActionI, ActionContextI } from "@/interface/index";
import addressState, { AddressStateI } from "./state";

async function getAddressList() {
    const addressList: AddressItemI[] = await fetch("address/list");
    addressState.addressList = addressList;
    return addressList || [];
}
async function deleteAddress(addressID: number) {
    await fetch("address/remove", { addressID });
}
async function setDefaultAddressFetch(addressID: number) {
    await fetch("address/setDefault", { addressID });
}
async function addAddress(addressInfo: AddressItemI) {
    await fetch("address/add", addressInfo);
}
async function findAddress(addressID: number) {
    const addressInfo = await fetch("address/find", { addressID });
    return addressInfo;
}
async function editAddress(addressInfo: AddressItemI) {
    await fetch("address/edit", addressInfo);
}

async function getDefaultAddress() {
    const defaultAddress: AddressItemI = await fetch("address/getDefault", {});
    addressState.defaultAddress = defaultAddress;
    return defaultAddress;
}

function setAddressList(addressList: AddressItemI[]): void {
    addressState.addressList = addressList;
}

function setDefaultAddress(defaultAddress: AddressItemI): void {
    console.log('pinia setDefaultAddress')
    console.log(defaultAddress)
    addressState.defaultAddress = defaultAddress;
}
export interface AddressActionI {
    getAddressList: () => Promise<AddressItemI[]>;
    deleteAddress: (addressID: number) => void;
    setDefaultAddressFetch: (addressID: number) => void;
    addAddress: (addressInfo: AddressItemI) => void;
    findAddress: (addressID: number) => void;
    editAddress: (addressInfo: AddressItemI) => void;
    getDefaultAddress: () => Promise<AddressItemI>;
    setAddressList: (addressList: AddressItemI[]) => void;
    setDefaultAddress: (defaultAddress: AddressItemI) => void;
}
export default {
    getAddressList,
    deleteAddress,
    setDefaultAddressFetch,
    addAddress,
    findAddress,
    editAddress,
    getDefaultAddress,
    setAddressList,
    setDefaultAddress,
} as AddressActionI;
