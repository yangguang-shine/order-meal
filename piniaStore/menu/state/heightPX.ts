export interface HeightPXI {
    topBarPX: number,
    minusPX: number,
    footerPX: number,
    cartImgPX: number,
    foodAddIconPX: number
    asideBarHorizontalPX: number
}



const heightPXDefault: HeightPXI = {
    topBarPX: 40.5,
    minusPX: 25,
    footerPX: 70,
    cartImgPX: 60,
    foodAddIconPX: 20,
    asideBarHorizontalPX: 40
}

const heightPX: HeightPXI = heightPXDefault

export default heightPX
