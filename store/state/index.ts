
import address, { AddressStateI} from './address'
import home, { HomeStateI } from './home'
import menu, {MenuStateI} from './menu'
import confirm, {ConfirmStateI} from './confirm'
import order, { orderStateI } from './order'

// export type StateIndexI  = AddressI & HomeI & MenuStateI & ConfirmStateI & orderStateI
// const state:StateIndexI  = {
//     ...address,
//     ...home,
//     ...menu,
//     ...confirm,
//     ...order,
// }
export default {
    ...address,
    ...home,
    ...menu,
    ...confirm,
    ...order,
}