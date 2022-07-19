import menuState from "./state";

function setTopBarHeightPX(topBarPX: number) {
    // menuState.topBarPX = topBarPX
    console.log('topBarPX', topBarPX)
    menuState.topBarPX = topBarPX
}
export interface SetActionI {
    setTopBarHeightPX: (topBarPX: number) => void
}
const setAction: SetActionI = {
    setTopBarHeightPX
}
export default setAction