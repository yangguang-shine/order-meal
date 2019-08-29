<template>
    <div class="shop-edit-container">
        <div class="edit-item flex-row flex-a-center">
            <div class="title">店铺名称：</div>
            <input type="text" class="flex-item input-name" v-model="shopInfo.shopName">
        </div>
        <div class="edit-item flex-row flex-a-center" @click="chooseAddress">
            <div class="title">门店地址：</div>
            <div class="flex-item flex-item">{{shopInfo.address || '请选择地址'}}</div>
        </div>
        <picker mode="time" @change="startPickerChange" value="09:00">
            <div class="edit-item flex-row flex-a-center">
                <div class="title">开店时间：</div>
                <div class="flex-item">
                    {{shopInfo.startTime || ''}}
                </div>
            </div>

        </picker>
        <picker mode="time" @change="endPickerChange" value="18:00">
            <div class="edit-item flex-row flex-a-center">
                <div class="title">闭店时间：</div>
                <div class="flex-item">
                    {{shopInfo.endTime || ''}}
                </div>
            </div>
        </picker>
        <div class="flex-row flex-a-center">
			<div class="title">店铺图片：</div>
			<image class="food-img" :src="shopInfo.imgUrl ? host + shopInfo.imgUrl : '/static/img/default-img.svg'" @click="chooseImg"></image>
		</div>
        <div v-if="shopID" class="flex-row flex-j-around">
            <div class="button" :style="{'background-color': $mainColor}" @click="editShop">修改</div>
            <div class="button delete-button" @click="deleteShop">删除</div>
        </div>
        <div v-else class="flex-row flex-j-center">
            <div class="button" :style="{'background-color': $mainColor}" @click="addShop">新增</div>
        </div>
    </div>
</template>

<script>
import host from '@/config/host'

export default {
    data() {
        return {
            shopInfo: {
                shopName: '店铺',
                imgUrl: '',
                address: '西直门凯德茂地铁站',
                startTime: '09:00',
                endTime: '18:00',
                host
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
            } else {
                this.shopInfo.shopName = `店铺${Math.random().toString(36).slice(2, 4)}`
            }
        } catch (e) {
            console.log(e)
        }
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
    font-size: 32rpx;
    padding: 30rpx;
    line-height: 1;
    .edit-item {
        height: 50rpx;
        line-height: 50rpx;
        padding-bottom: 20rpx; 
    }
    .input-name {
        height: 100%;
        line-height: 1;
    }
    .title {
        width: 180rpx;
    }
    .food-img {
        width: 100rpx;
        height: 100rpx;
    }
    .button {
        margin-top: 40rpx;
        width: 300rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border-radius: 40rpx;
        color: #fff;
    }
    .delete-button {
        background-color: #999;
        color: #fff;
    }
}
</style>

