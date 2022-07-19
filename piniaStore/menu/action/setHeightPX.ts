import menuState from "../state";
// topBarPX: 40.5,
// minusPX: 25,
// footerPX: 70,
// cartImgPX: 60,
// foodAddIconPX: 20,
// asideBarHorizontalPX: 40


function setTopBarHeightPX(topBarPX: number) {
    console.log('topBarPX', topBarPX)
    menuState.topBarPX = topBarPX
}
function setMinusPX(minusPX: number) {
    console.log('minusPX', minusPX)
    menuState.minusPX = minusPX
}
function setFooterPX(footerPX: number) {
    console.log('footerPX', footerPX)
    menuState.footerPX = footerPX
}

function setCartImgPX(cartImgPX: number) {
    console.log('cartImgPX', cartImgPX)
    menuState.cartImgPX = cartImgPX
}
function setAsideBarHorizontalPX(asideBarHorizontalPX: number) {
    console.log('asideBarHorizontalPX', asideBarHorizontalPX)
    menuState.asideBarHorizontalPX = asideBarHorizontalPX
}


export interface setHeightPXActionI {
    setTopBarHeightPX: (topBarPX: number) => void
    setMinusPX: (minusPX: number) => void
    setFooterPX: (footerPX: number) => void
    setCartImgPX: (cartImgPX: number) => void
    setAsideBarHorizontalPX: (asideBarHorizontalPX: number) => void
}
const setHeightPX: setHeightPXActionI = {
    setTopBarHeightPX,
    setMinusPX,
    setFooterPX,
    setCartImgPX,
    setAsideBarHorizontalPX,
}
export default setHeightPX