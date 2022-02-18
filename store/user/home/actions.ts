import fetch from '../../../utils/fetch'
interface IAction {
    [key: string]: (state: any, payload: any) => any
}

const actions: IAction = {

}
actions['setDefaultAddress'] = (state: any, address: any): void => {
    state.defaultAddress = address
}

export default actions