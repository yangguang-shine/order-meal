import { CategoryItemI } from "@/interface/menu";
import { ComputedStateI } from "@/interface/vuex";
import { MenuActionI } from "@/piniaStore/menu/actions";
import { selectQuery, systemInfo } from "@/utils/";
import { topBarHeightPX } from "../infoConfig";
interface HandleFoodCategoryListScrollParams {
    categoryList: ComputedStateI<CategoryItemI[]>;
    currentInstance: any;
    setSelectedCategoryID: MenuActionI["setSelectedCategoryID"];
    setCategoryIDMain: MenuActionI["setCategoryIDMain"];
    setCategoryIDAside: MenuActionI["setCategoryIDAside"];
}
export async function handleFoodCategoryListScroll({ categoryList, currentInstance, setSelectedCategoryID, setCategoryIDMain, setCategoryIDAside }: HandleFoodCategoryListScrollParams) {
    for (let i = 0; i < categoryList.value.length; i++) {
        const categoryItem: CategoryItemI = categoryList.value[i];
        console.log(categoryItem.categoryIDMain);
        const categoryItemPositionInfo = await selectQuery(`#${categoryItem.categoryIDMain}`, currentInstance);
        console.log(categoryItemPositionInfo);
        if (topBarHeightPX <= categoryItemPositionInfo.top || categoryItemPositionInfo.bottom > topBarHeightPX) {
            setSelectedCategoryID(categoryItem.categoryID);
            setCategoryIDMain("");
            setCategoryIDAside(categoryItem.categoryIDAside);
            console.log("categoryList.value");
            console.log(categoryList.value);
            await handleLazyImg({
                index: i,
                currentInstance,
                categoryList,
            });
            break;
        }
    }
}
interface HandleLazyImgParams {
    index: number;
    currentInstance: any;
    categoryList: ComputedStateI<CategoryItemI[]>;
}
async function handleLazyImg({ index, currentInstance, categoryList }: HandleLazyImgParams) {
    const categoryItem: CategoryItemI = categoryList.value[index];
    let lastCategoryFlag: boolean = true;
    for (let i = 0; i < categoryItem.foodList.length; i++) {
        const foodItem = categoryItem.foodList[i];
        const imgPositionInfo = await selectQuery(`#img-${foodItem.foodID}`, currentInstance);
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
            currentInstance,
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
