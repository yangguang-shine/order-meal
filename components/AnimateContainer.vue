<template>
    <div v-if="showAnimateContainer" class="com-animate-container" @showAnimate="showAnimate" @hideAnimate="hideAnimate">
        <slot v-slot:compontentSlot></slot>
    </div>
</template>

<script>
import { delaySync } from '@/utils/index.js'

export default {
    props: {
        showAnimateFlag: {
            type: Boolean,
            default: false
        },
        refComponents: {
                  type: String,
            default: ''
        }
    },
    data() {
        return {
            showAnimateContainer: false
        }
    },
    mounted() {
    },
    methods: {
        showAnimate() {
            this.$emit('showAnimate')
        },
        hideAnimate() {
            this.$emit('hideAnimate')
        }
    },
    watch: {
		showAnimateFlag: async function (newValue, oldValue){
            console.log(newValue)
            if (newValue) {
                this.showAnimateContainer = true
                console.log(this)
                console.log(this.$slots.default)
                this.$slots.default[0].showComponent()
                await delaySync(200)
            } else {
                this.$children[0].hideComponent()
                await delaySync(200)
                this.showAnimateContainer = false
            }
			console.log(oldValue)
		},
	}
}
</script>

<style>

</style>