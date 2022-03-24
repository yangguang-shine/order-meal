
import fetch from '@/utils/fetch'

import { ActionI } from "@/interface/index";
const getAddressList: ActionI = async ({ commit }, params = {}) => {
    const addressList = await fetch('user/address/list', {})
    commit('setAddressList', addressList)
    return addressList || []
}

const deleteAddress : ActionI = async ({ commit }, addressID: string) => {
    await fetch('user/address/remove', { addressID })
}
const setDefaultAddressFetch : ActionI = async ({ commit }, addressID: string) => {
    await fetch('user/address/setDefault', { addressID })
}
const addAddress : ActionI = async ({ commit }, addressInfo: any) => {
    await fetch('user/address/add', addressInfo)
}
const findAddress : ActionI = async ({ commit }, addressID: string) => {
    const addressInfo = await fetch('user/address/find', { addressID })
    return addressInfo
}
const editAddress : ActionI = async ({ commit }, addressInfo: any) => {
    await fetch('user/address/edit', addressInfo)
}

const getDefaultAddress : ActionI = async ({ commit }) => {
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