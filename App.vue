<script lang="ts">
import { defineComponent, computed, getCurrentInstance, ref } from "vue";

export default defineComponent({
    onLaunch() {
        // #ifdef MP-WEIXIN
        // toLogin()
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

<style>
/*每个页面公共css */
</style>
