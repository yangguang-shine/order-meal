import fetch from '../../../utils/fetch'
const getAddressList = async ({ commit }, params = {}) => {
    const addressList = await fetch('user/address/list', {})
    commit('setAddressList', addressList)
    return addressList || []
}

const deleteAddress = async ({ commit }, addressID: string) => {
    await fetch('user/address/remove', { addressID })
}
const setDefaultAddressFetch = async ({ commit }, addressID: string) => {
    await fetch('user/address/setDefault', { addressID })
}
const addAddress = async ({ commit }, addressInfo: any) => {
    await fetch('user/address/add', addressInfo)
}
const findAddress = async ({ commit }, addressID: string) => {
    const addressInfo = await fetch('user/address/find', { addressID })
    return addressInfo
}
const editAddress = async ({ commit }, addressInfo: any) => {
    await fetch('user/address/edit', addressInfo)
}

const getDefaultAddress = async ({ commit }) => {
    const defaultAddress = await fetch('user/address/getDefault',{}, {error: false})
    commit('setDefaultAddress', defaultAddress)
    return defaultAddress
}


export default {
    getAddressList,
    deleteAddress,
    setDefaultAddressFetch,
    addAddress,
    findAddress,
    editAddress,
    getDefaultAddress
}