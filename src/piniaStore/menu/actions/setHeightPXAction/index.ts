import menuState from "../../state";
// topBarPX: 40.5,
// minusPX: 25,
// footerPX: 70,
// cartImgPX: 60,
// foodAddIconPX: 20,
// asideBarHorizontalPX: 40


export function setTopBarHeightPX(topBarPX: number) {
    console.log('topBarPX', topBarPX)
    menuState.topBarPX = topBarPX
}
export function setMinusPX(minusPX: number) {
    console.log('minusPX', minusPX)
    menuState.minusPX = minusPX
}
export function setFooterPX(footerPX: number) {
    console.log('footerPX', footerPX)
    menuState.footerPX = footerPX
}

export function setCartImgPX(cartImgPX: number) {
    console.log('cartImgPX', cartImgPX)
    menuState.cartImgPX = cartImgPX
}
export function setAsideBarHorizontalPX(asideBarHorizontalPX: number) {
    console.log('asideBarHorizontalPX', asideBarHorizontalPX)
    menuState.asideBarHorizontalPX = asideBarHorizontalPX
}


export interface SetHeightPXActionI {
    setTopBarHeightPX: (topBarPX: number) => void
    setMinusPX: (minusPX: number) => void
    setFooterPX: (footerPX: number) => void
    setCartImgPX: (cartImgPX: number) => void
    setAsideBarHorizontalPX: (asideBarHorizontalPX: number) => void
}
const setHeightPXAction: SetHeightPXActionI = {
    setTopBarHeightPX,
    setMinusPX,
    setFooterPX,
    setCartImgPX,
    setAsideBarHorizontalPX,
}
export default setHeightPXAction