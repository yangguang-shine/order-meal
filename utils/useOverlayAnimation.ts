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
    type?: 'translateY' | 'scale';
    timingFunction?: string;
}

export default function useOverlayAnimation({ duration = 300, type = "translateY", timingFunction = "ease-in-out" }: OverlayAnimationParamsI = {}): OverlayAnimationI {
    console.log(11111231)
    console.log({
        duration,
        type,
        timingFunction,
    })
    const overlayAnimationData = ref(null);
    const mainAnimationData = ref(null);
    const overlayAnimation = uni.createAnimation({
        duration,
        timingFunction,
    });

    const detailAnimation = uni.createAnimation({
        duration,
        timingFunction,
    });
    function toStartAnimation() {
        overlayAnimation.opacity(1).step();
        overlayAnimationData.value = overlayAnimation.export();
        if (type === "translateY") {
            detailAnimation.translateY(0).step();
        } else if (type === "scale") {
            detailAnimation.scale(1).step();
        } else {
            console.log("暂不支持该模式");
        }
        mainAnimationData.value = detailAnimation.export();
    }
    function toEndAnimation() {
        overlayAnimation.opacity(0).step();
        overlayAnimationData.value = overlayAnimation.export();
        if (type === "translateY") {
            detailAnimation.translateY("100%").step();
        } else if (type === "scale") {
            detailAnimation.scale(0).step();
        } else {
            console.log("暂不支持该模式");
        }
        mainAnimationData.value = detailAnimation.export();
    }
    return {
        overlayAnimationData,
        mainAnimationData,
        toStartAnimation,
        toEndAnimation,
    };
}
