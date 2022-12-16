import complexAction, { ComplexActionI } from "./complexAction";
import fetchAction, { FetchActionI } from "./fetchAction";
import setFlagAction, { SetFlagActionI } from "./setFlagAction";
import setHeightPXAction, { SetHeightPXActionI } from "./setHeightPXAction";
import setSimpleAction, { SetSimpleActionI } from "./setSimpleAction";

export type MenuActionI = ComplexActionI & FetchActionI & SetFlagActionI & SetHeightPXActionI & SetSimpleActionI;
const menuAction: MenuActionI = {
    ...fetchAction,
    ...complexAction,
    ...setFlagAction,
    ...setSimpleAction,
    ...setHeightPXAction,
};

export default menuAction;
