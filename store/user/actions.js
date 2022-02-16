import fetch from '@/utils/fetch.js'

const actions = {

}
actions['getAddressList'] = async ({commit}, params = {}) => {
    console.log(params)
    const addressList = await fetch('/user/address/list', {})
    return addressList || []
}
export default actions