import { CategoryItemI } from "@/interface/menu";
import { ComputedStateI } from "@/interface/vuex";
import { MenuActionI } from "@/piniaStore/menu/actions";
import { selectQuery, systemInfo } from "@/utils/";
import menuState from "@/piniaStore/menu/state";
interface HandleFoodCategoryListScrollParams {
    categoryList: ComputedStateI<CategoryItemI[]>;
    type?: "vertical" | "horizontal";
    setSelectedCategoryID: MenuActionI["setSelectedCategoryID"];
    setCategoryIDMain: MenuActionI["setCategoryIDMain"];
    setCategoryIDAside: MenuActionI["setCategoryIDAside"];
}
export async function handleFoodCategoryListScroll({ categoryList, setSelectedCategoryID, setCategoryIDMain, setCategoryIDAside, type = "vertical" }: HandleFoodCategoryListScrollParams) {
    for (let i = 0; i < categoryList.value.length; i++) {
        const categoryItem: CategoryItemI = categoryList.value[i];
        const categoryItemPositionInfo = await selectQuery(`#${categoryItem.categoryIDMain}`);
        if (type === "vertical") {
            if (menuState.topBarPX <= categoryItemPositionInfo.top + 1 || categoryItemPositionInfo.bottom - 1 > menuState.topBarPX) {
                setSelectedCategoryID(categoryItem.categoryID);
                setCategoryIDMain("");
                setCategoryIDAside(categoryItem.categoryIDAside);
                await handleLazyImg({
                    index: i,
                    categoryList,
                });
                break;
            }
        } else if (type === "horizontal") {
            const topBarAndAsideBarPX = menuState.topBarPX + menuState.asideBarHorizontalPX
            if (topBarAndAsideBarPX <= categoryItemPositionInfo.top + 1 || categoryItemPositionInfo.bottom -1 > topBarAndAsideBarPX) {
                setSelectedCategoryID(categoryItem.categoryID);
                setCategoryIDMain("");
                setCategoryIDAside(categoryItem.categoryIDAside);
                await handleLazyImg({
                    index: i,
                    categoryList,
                });
                break;
            }
        }
    }
}
interface HandleLazyImgParams {
    index: number;
    categoryList: ComputedStateI<CategoryItemI[]>;
}
async function handleLazyImg({ index, categoryList }: HandleLazyImgParams) {
    const categoryItem: CategoryItemI = categoryList.value[index];
    let lastCategoryFlag: boolean = true;
    for (let i = 0; i < categoryItem.foodList.length; i++) {
        const foodItem = categoryItem.foodList[i];
        const imgPositionInfo = await selectQuery(`#img-${foodItem.foodID}`);
        if (imgPositionInfo.top > systemInfo.windowHeight) {
            lastCategoryFlag = false;
            break;
        }
        if ((0 <= imgPositionInfo.top && imgPositionInfo.top <= systemInfo.windowHeight) || (0 <= imgPositionInfo.bottom && imgPositionInfo.bottom < systemInfo.windowHeight)) {
            foodItem.currentImg = foodItem.fullImgPath;
        }
    }
    if (lastCategoryFlag && index + 1 < categoryList.value.length) {
        await handleLazyImg({
            index: index + 1,
            categoryList,
        });
    }
}

export function debounce(fn: any, delay: number) {
    let timer: any;
    return (...params: any[]) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...params);
            clearTimeout(timer);
        }, delay);
    };
}

export function throttle(fn: any, delay: number) {
    let timer: undefined | number = undefined;
    return (...params: any[]) => {
        if (!timer) {
            timer = setTimeout(() => {
                fn(...params);
                clearTimeout(timer);
            }, delay);
        }
    };
}
