<script lang="ts">
import { defineComponent, computed, getCurrentInstance, ref } from "vue";

export default defineComponent({
    onLaunch() {
        // #ifdef MP-WEIXIN
        // #endif
    },
    onShow() {
        console.log('App Show')
    },
    onHide() {
        console.log('App Hide')
    },
})
</script>

<style lang="scss">
/*每个页面公共css */
@import './uni.scss'

</style>
