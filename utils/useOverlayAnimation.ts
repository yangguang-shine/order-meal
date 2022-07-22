import { ref } from "vue";
import { showModal } from ".";
export interface OverlayAnimationI {
    overlayAnimationData: any;
    mainAnimationData: any;
    toStartAnimation: Function;
    toEndAnimation: Function;
}
export interface OverlayAnimationParamsI {
    duration?: number;
    type?: 'translateY' | 'scale' | 'fixedImg';
    timingFunction?: string;
}

export default function useOverlayAnimation({ duration = 300, type = "translateY", timingFunction = "ease-in-out" }: OverlayAnimationParamsI = {}): OverlayAnimationI {

    const overlayAnimationData = ref(null);
    const mainAnimationData = ref(null);
    const overlayAnimation = uni.createAnimation({
        duration,
        timingFunction,
    });

    const mainAnimation = uni.createAnimation({
        duration,
        timingFunction,
    });
    function toStartAnimation() {
        overlayAnimation.opacity(1).step();
        overlayAnimationData.value = overlayAnimation.export();
        if (type === "translateY") {
            mainAnimation.translateY(0).step();
        } else if (type === "scale") {
            mainAnimation.scale(1).step();
        } else if (type === "fixedImg") {
            mainAnimation.right('-40rpx').opacity(.5).step()
            // mainAnimation.scale(1).step();
        } else {
            console.log("暂不支持该模式");
        }
        mainAnimationData.value = mainAnimation.export();
    }
    function toEndAnimation() {
        overlayAnimation.opacity(0).step();
        overlayAnimationData.value = overlayAnimation.export();
        if (type === "translateY") {
            mainAnimation.translateY("100%").step();
        } else if (type === "scale") {
            mainAnimation.scale(0).step();
        } else if (type === "fixedImg") {
            mainAnimation.right('30rpx').opacity(1).step()

        } else {
            console.log("暂不支持该模式");
        }
        mainAnimationData.value = mainAnimation.export();
    }
    return {
        overlayAnimationData,
        mainAnimationData,
        toStartAnimation,
        toEndAnimation,
    };
}
