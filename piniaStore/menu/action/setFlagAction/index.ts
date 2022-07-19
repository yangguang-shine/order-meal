
import menuState from "../../state";
import getCollectFoodList from "../complexAction/getCollectFoodList";
function setFoodDetailFlag(foodDetailFalg: boolean) {
    menuState.foodDetailFalg = foodDetailFalg;
}

function setStartShopInfoAnimationFlag(startShopInfoAnimationFlag: boolean) {
    menuState.startShopInfoAnimationFlag = startShopInfoAnimationFlag;
}

function setShopInfoFlag(shopInfoFlag: boolean) {
    menuState.shopInfoFlag = shopInfoFlag;
}
function setCartImgAnimationFlag(cartImgAnimationFlag: boolean) {
    menuState.cartImgAnimationFlag = cartImgAnimationFlag;
}

function toogleCartDetailFlag() {
    if (menuState.collectFoodFlag) {
        menuState.showCollectClickCartImgFlag = true;
        return;
    }
    if (menuState.cartDetailFlag) {
        menuState.showCartClickCartImgFlag = true;
        return;
    }
    if (menuState.cartCategoryList.length > 0) {
        menuState.cartDetailFlag = !menuState.cartDetailFlag;
    } else {
        menuState.cartDetailFlag = false;
    }
}
function setSearchFoodFlag(searchFoodFlag: boolean) {
    menuState.searchFoodFlag = searchFoodFlag;
}

function setCartDetailFlag(cartDetailFlag: boolean) {
    menuState.cartDetailFlag = cartDetailFlag;
}
function setCollectFoodFlag(collectFoodFlag: boolean) {
    getCollectFoodList();
    menuState.collectFoodFlag = collectFoodFlag;
}

function setMenuPackPriceExpalinFlag(menuPackPriceExpalinFlag: boolean) {
    menuState.menuPackPriceExpalinFlag = menuPackPriceExpalinFlag;
}

function setShowCartClickCartImgFlag(showCartClickCartImgFlag: boolean) {
    menuState.showCartClickCartImgFlag = showCartClickCartImgFlag;
}

function setShowCollectClickCartImgFlag(showCollectClickCartImgFlag: boolean) {
    menuState.showCollectClickCartImgFlag = showCollectClickCartImgFlag;
}
function setFoodSpecificationFlag(foodSpecificationFlag: boolean) {
    menuState.foodSpecificationFlag = foodSpecificationFlag;
}

export interface SetFlagActionI {
    setFoodDetailFlag: (foodDetailFalg: boolean) => void;
    setStartShopInfoAnimationFlag: (startShopInfoAnimationFlag: boolean) => void;
    setShopInfoFlag: (shopInfoFlag: boolean) => void;
    setCartImgAnimationFlag: (cartImgAnimationFlag: boolean) => void;
    setSearchFoodFlag: (searchFoodFlag: boolean) => void;
    toogleCartDetailFlag: () => void;
    setCartDetailFlag: (cartDetailFlag: boolean) => void;
    setCollectFoodFlag: (collectFoodFlag: boolean) => void;
    setMenuPackPriceExpalinFlag: (menuPackPriceExpalinFlag: boolean) => void;
    setShowCartClickCartImgFlag: (showCartClickCartImgFlag: boolean) => void;
    setShowCollectClickCartImgFlag: (showCollectClickCartImgFlag: boolean) => void;
    setFoodSpecificationFlag: (foodSpecificationFlag: boolean) => void;
}
const setFlagAction: SetFlagActionI = {
    setFoodDetailFlag,
    setStartShopInfoAnimationFlag,
    setShopInfoFlag,
    setCartImgAnimationFlag,
    setSearchFoodFlag,
    toogleCartDetailFlag,
    setCartDetailFlag,
    setCollectFoodFlag,
    setMenuPackPriceExpalinFlag,
    setShowCartClickCartImgFlag,
    setShowCollectClickCartImgFlag,
    setFoodSpecificationFlag,
};
export default setFlagAction;
