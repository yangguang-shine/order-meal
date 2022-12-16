export interface AddressItemI {
    address1: string;
    address2: string;
    latitude: string;
    longitude: string;
    mobile: string;
    name: string;
    sex: number;
    addressID?: number;
}
export const initAddressItem: AddressItemI = {
    address1: "",
    address2: "",
    latitude: "",
    longitude: "",
    mobile: "",
    name: "",
    sex: 0,
};
