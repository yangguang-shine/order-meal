import router from '../../../utils/router'

const setAddressList = (state: any, addressList: []): void => {
    state.addressList = addressList
}
const setDefaultAddress = (state: any, defaultAddress: any): void => {

    state.defaultAddress = defaultAddress
}
// const setFindAddressInfo = (state: any, addressInfo: any): void => {
//     state.findAddressInfo = addressInfo
// }
const toSelectAddress = (): void => {
    router.navigateTo({
        name: "user/address/list",
        query: {
            fromPage: "userHome"
        }
    });
}
export default { 
    setAddressList,
    setDefaultAddress,
    toSelectAddress,
}