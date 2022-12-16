<template>
    <div class="com-transition-container" ref="container">
        <slot v-if="transitionFlag" class="aaaaa" :addClass="addClass"></slot>
    </div>
</template>

<script setup lang="ts">
import { RefI } from "@/interface/vueInterface";
import { watch, ref, useSlots, getCurrentInstance, onMounted } from "vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { delaySync } from "../utils";
interface PropsI {
    name: string;
    flag: boolean;
    time: number;
}
const props: PropsI = withDefaults(defineProps<PropsI>(), {
    name: "",
    flag: true,
    time: 500,
});
const addClass: RefI<string> = ref("");
const container: RefI<any> = ref();
const transitionFlag: RefI<boolean> = ref(props.flag);
onLoad(() => {
    // console.log(slots.default())
    // if (transitionFlag.value)
});
let originClassName = "";
onMounted(() => {});
watch(
    () => props.flag,
    async (newValue: boolean, oldValue: boolean) => {
        const enterFrom = `${props.name}-enter-from`;
        const enterActive = `${props.name}-enter-active`;
        const enterTo = `${props.name}-enter-to`;
        const leaveFrom = `${props.name}-leave-from`;
        const leaveActive = `${props.name}-leave-active`;
        const leaveTo = `${props.name}-leave-to`;
        if (newValue) {
            console.log(11111)
            // await delaySync(0);
            addClass.value = `${enterFrom}  ${enterActive}`;
            transitionFlag.value = true;
            await delaySync(0);
            addClass.value = `${enterActive} ${enterTo}`;
            await delaySync(props.time);
            addClass.value = "";
        } else {
            console.log(22222)
            addClass.value = `${leaveFrom} ${leaveActive}`;
            await delaySync(0);
            addClass.value = `${leaveActive} ${leaveTo}`;
            await delaySync(props.time);
            transitionFlag.value = false;
            addClass.value = "";
        }
    }
);
</script>

<style lang="scss" scoped></style>
