import fetch from '@/utils/fly.js'

const actions = {

}
actions['getAddressList'] = async ({commit}, params = {}) => {
    console.log(params)
    const res = await fetch.post('/user/address/list', {})
    return res.data || []
}
export default actions