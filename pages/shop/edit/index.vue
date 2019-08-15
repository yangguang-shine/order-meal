<template>
    <div class="shop-edit-container">
        <div class="flex-row flex-a-center">
            <div>name:</div>
            <input type="text">
        </div>
        <div class="flex-row flex-a-center" @click="chooseAddress">
            <div>address</div>
            <div class="flex-item">{{shopInfo.address || '请选择地址'}}</div>
        </div>
        <picker mode="time" @change="startPickerChange" value="09:00">
            <view class="picker">
            开放时间：{{shopInfo.startTime || ''}}
            </view>
        </picker>
        <picker mode="time" @change="endPickerChange" value="18:00">
            <view class="picker">
            结束时间：{{shopInfo.endTime || ''}}
            </view>
        </picker>
        <div class="flex-row flex-a-center">
			<div>imgUrl:</div>
			<image v-if="shopInfo.imgUrl" class="food-img" :src="shopInfo.imgUrl" @click="chooseImg"></image>
			<div v-else class="food-no-img" @click="chooseImg">+</div>
		</div>
        <div v-if="shopID" class="felx-row flex-a-around">
            <div class="button" @click="editShop">修改</div>
            <div class="button" @click="deleteShop">删除</div>
        </div>
        <div class="flex-row flex-j-center">
            <div class="button" @click="addShop">新增</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            shopInfo: {
                shopName: '',
                imgUrl: '',
                address: '',
                startTime: '09:00',
                endTime: '18:00',
            },
            shopID: '',
            addStatus: false
        }
    },
    async onLoad(options) {
        if (options.shopID) {
            this.shopID = options.shopID
        }
        try {
            if (this.shopID) {
                const res = await this.$fetch.get('/api/shop/find', { shopID: this.shopID })
                this.shopInfo = res.data || {}
            }
        } catch (e) {
            console.log(e)
        }
        // if (this.pickerArray.length) return;
        // const pickerArray = [[], []];
        // for (let i = 0; i < 24; i += 1) {
        //     if (`${i}`.length === 1) {
        //         pickerArray[0].push(`0${i}`)
        //     } else {
        //         pickerArray[0].push(`${i}`)
        //     }
        // }
        // for (let i = 0; i < 60; i += 1) {
        //     if (`${i}`.length === 1) {
        //         pickerArray[1].push(`0${i}`)
        //     } else {
        //         pickerArray[1].push(`${i}`)
        //     }
        // }
        // this.pickerArray = pickerArray
        // console.log(pickerArray)
    },
    async onUnload() {
        if (!this.shopID && this.shopInfo.imgUrl && !this.addStatus) {
            await this.$fetch.post('/api/img/delete', { imgUrl: this.shopInfo.imgUrl })
        }
        this.addStatus = false
        this.shopID = ''
        this.shopInfo = {
                shopName: '',
                imgUrl: '',
                address: '',
                startTime: '',
                endTime: '',
            };
    },
    methods: {
        startPickerChange(e) {
            const value = e.detail.value || []
            this.shopInfo.startTime = value
        },
        endPickerChange(e) {
            const value = e.detail.value || []
            this.shopInfo.endTime = value
        },
        chooseAddress() {
            uni.chooseLocation({
                success: (res) => {
                    console.log(res)
                    this.shopInfo.address = res.address
                },
            })
        },
        async editShop() {
            try {
                await this.$fetch.post('/api/shop/edit', { ...this.shopInfo, shopID: this.shopID })
                this.$myrouter.back()
            } catch (e) {
                console.log(e)
            }
        },
        async deleteShop() {
            try {
                await this.$fetch.post('/api/shop/delete', { shopID: this.shopID })
                this.$myrouter.back()
            } catch (e) {
                console.log(e)
            }
        },
        async addShop() {
            try {
                await this.$fetch.post('/api/shop/add', { ...this.shopInfo })
                this.addStatus = true
                this.$myrouter.back()
            } catch (e) {
                console.log(e)
            }
        },
        chooseImg() {
            uni.chooseImage({
                count: 1,
                success: (res) => {
                    const maxSize = 100 * 2 ** 10
                    const file = res.tempFiles[0]
                    const size = file.size
                    if (size > maxSize) {
                        uni.showModal({
                            title: '提示',
                            content: '选择图片要小于100KB'
                        })
                        return;
                    }
                    let imgUrl = ''
                    if (this.shopInfo.imgUrl) {
                        const reg = /.+\/(\d+\.)/
                        imgUrl = this.shopInfo.imgUrl.replace(reg, '$1')
                    }
                    // http://localhost:8090/images/upload/1565681342882.png
                    uni.uploadFile({
                        url: 'http://localhost:8090/api/img/uploadImg',
                        filePath: file.path,
                        name: 'img',
                        formData: {
                            shopID: this.shopID,
                            imgUrl
                        },
                        success: (res) => {
                            const data = JSON.parse(res.data)
                            this.shopInfo.imgUrl = (data.data || {}).imgUrl;
                        }
                    })
                }
            })
        },
    }
}
</script>
<style scoped lang="scss">
.shop-edit-container {
    font-size: 28rpx;
    padding: 30rpx;
    div {
        padding: 10rpx;
    }
    .button {
        width: 300rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
    }
}
</style>

