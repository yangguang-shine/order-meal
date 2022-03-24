import fetch from '@/utils/fetch'
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


export default {
    getAddressList,
    deleteAddress,
    setDefaultAddressFetch,
    addAddress,
    findAddress,
    editAddress
}