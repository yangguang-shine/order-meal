
import menu from './menu'
import confirm from './confirm'
import { GetterI} from "@/interface/index";


export default {
    ...menu,
    ...confirm,
} as GetterI