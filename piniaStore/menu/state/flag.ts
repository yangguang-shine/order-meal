export interface FlagI {
    startShopInfoAnimationFlag: boolean;
    shopInfoFlag: boolean;
    menuPackPriceExpalinFlag: boolean;
    cartDetailFlag: boolean;
    foodDetailFalg: boolean;
    cartImgAnimationFlag: boolean;
    searchFoodFlag: boolean;
    collectFoodFlag: Boolean;
    // 购物车详情时，点击购物车按钮
    showCartClickCartImgFlag: boolean;
    // 凑单弹框时，点击购物车按钮
    showCollectClickCartImgFlag: boolean;
    foodSpecificationFlag: boolean
}



const flagDefault: FlagI = {
    startShopInfoAnimationFlag: false,
    shopInfoFlag: false,
    menuPackPriceExpalinFlag: false,
    cartDetailFlag: false,
    foodDetailFalg: false,
    cartImgAnimationFlag: false,
    searchFoodFlag: false,
    collectFoodFlag: false,
    // 购物车详情时，点击购物车按钮
    showCartClickCartImgFlag: false,
    // 凑单弹框时，点击购物车按钮
    showCollectClickCartImgFlag: false,
    foodSpecificationFlag: false
}

const flag: FlagI = flagDefault

export default flag
