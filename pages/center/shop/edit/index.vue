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
        <div class="edit-item-minus flex-row" @click="chooseAddress">
            <div class="title">满减营销：</div>
            <div class="flex-item">
                <div v-if="!minusList.length" class="no-minus minus-item center"> 暂无满减营销</div>
                <div v-for="(minusItem, index) in minusList" :key="minusItem.random" class="minus-item flex-row flex-j-between flex-a-center">
                    <div class="flex-row flex-a-center">
                        <div class="minus-item-title">第{{index + 1}}档:</div>
                        <div class="minus-reach-title">满</div>
                        <input type="number" class="center input-minus" v-model="minusItem.reach" :style="{color: $mainColor}" selection-start="-1"selection-end="-1"cursor="-1">
                        <div class="minus-reduce-title">减</div>
                        <input type="number" class="center input-minus" v-model="minusItem.reduce" :style="{color: $mainColor}" selection-start="-1"selection-end="-1"cursor="-1">
                    </div>
                    <image class="delete-icon" src="/static/img/shop-delete.svg" @click.stop="deleteMinusItem(index)"></image>
                </div>
                <div class="add-minus" :style="{color: $mainColor}" @click="addMinus">添加满减</div>
            </div>
        </div>
        <div class="flex-row flex-j-center">
            <div v-if="shopID" class="button" :style="{'background-color': $mainColor}" @click="editShop">修改</div>
            <div v-else class="button" :style="{'background-color': $mainColor}" @click="addShop">新增</div>
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
                minus: '',
                addState: false
            },
            minusList: [], 
            shopID: '',
            host
        }
    },
    async onLoad(options) {
        if (options.shopID) {
            this.shopID = options.shopID
        }
        try {
            this.$showLoading()
            if (this.shopID) {
                const res = await this.$fetch.get('/api/shop/find', { shopID: this.shopID })
                this.shopInfo = res.data || {}
                const minusSplit = this.shopInfo.minus.split(',')
                if (minusSplit[0] === '')
                this.minusList = []
                else {                
                    this.minusList = minusSplit.map((item) => {
                        const splitMinus = item.split('-')
                        return {
                            reach: splitMinus[0],
                            reduce: splitMinus[1],
                            random: Math.random()
                        }
                    })
                }
            } else {
                this.shopInfo.shopName = `店铺${Math.random().toString(36).slice(2, 4)}`
            }
            this.$hideLoading()
        } catch (e) {
            console.log(e)
            this.$hideLoading()
            this.$showModal({
                content: '店铺信息获取失败'
            })
        }
    },
    async onUnload() {
        console.log(!this.shopID && this.shopInfo.imgUrl && !this.addState)
        if(!this.shopID && this.shopInfo.imgUrl && !this.addState) {
            await this.$fetch.post('/api/img/delete', { imgUrl: this.shopInfo.imgUrl, deleteShop: true })
        }
        this.shopID = ''
        this.addState = false
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
                fail: (res) => {
                    console.log(res)
                }
            })
        },
        checkoutMinus() {
            let minusArray = []
            let price = 0
            const minusStatus = this.minusList.every((item, index) => {
                const reg = /^[1-9]\d*$/
                if (Number(item.reach) <= price) {
                    this.$showModal({
                        content: `满减档次必须递增`
                    })
                    return
                }
                price = Number(item.reach)
                reg.test(reg)
                if (reg.test(item.reach) &&  reg.test(item.reduce) && Number(item.reach) > Number(item.reduce)) {
                    minusArray.push(`${item.reach}-${item.reduce}`)
                    return true
                } else {
                    this.$showModal({
                        content: `第${index + 1}档输入有误`
                    })
                    return false
                }
            })
            return {
                minusArray,
                minusStatus
            }
        },
        async editShop() {
            try {
                const result = this.checkoutMinus()
                if (!result.minusStatus) return;
                this.shopInfo.minus = result.minusArray.join(',')
                this.$showLoading({
                    title: '修改中'
                })
                await this.$fetch.post('/api/shop/edit', { ...this.shopInfo, shopID: this.shopID })
                this.$hideLoading()
                await this.$showModal({
                    content: '修改成功'
                })
                this.$myrouter.back()
            } catch (e) {
                this.$hideLoading()
                this.$showModal({
                    content: '修改失败'
                })
                console.log(e)
            }
        },
        // async deleteShop() {
        //     try {
        //         await this.$fetch.post('/api/shop/delete', { shopID: this.shopID })
        //         this.$myrouter.back()
        //     } catch (e) {
        //         console.log(e)
        //     }
        // },
        async addShop() {
            try {
                const result = this.checkoutMinus()
                if (!result.minusStatus) return;
                this.shopInfo.minus = result.minusArray.join(',')
                this.$showLoading({
                    title: '添加中'
                })
                await this.$fetch.post('/api/shop/add', { ...this.shopInfo })
                this.addState = true
                this.$hideLoading()
                await this.$showModal({
                    content: '添加成功'
                })
                this.$myrouter.back()
            } catch (e) {
                this.$hideLoading()
                await this.$showModal({
                    content: '添加失败'
                })
                console.log(e)
            }
        },
        addMinus() {
            this.minusList.push({
                reach: '',
                reduce: '',
                random: Math.random()
            })
        },
        deleteMinusItem(index) {
            this.minusList.splice(index, 1)
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
                    uni.uploadFile({
                        url: `${host}/api/img/shop/h5uploadImg`,
                        filePath: file.path,
                        name: 'image',
                        formData: {
                            shopID: this.shopID, imgUrl
                        },
                        success: async (res) => { //成功的回调
                            console.log(res)
                            const data = JSON.parse(res.data)
                            this.$showLoading({
                                title: '上传中'
                            })
                            this.shopInfo.imgUrl = (data.data || {}).imgUrl
                            this.$hideLoading()
                            this.$showModal({
                                content: '上传成功'
                            }) 
                        }
                    })
                    // #ifdef  MP-WEIXIN
                    // const fileSplit = file.path.split(".")
                    // const ext = fileSplit[fileSplit.length -1];
                    // wx.getFileSystemManager().readFile({
                    //     filePath: file.path, //选择图片返回的相对路径
                    //     encoding: 'base64', //编码格式
                    //     success: async (res) => { //成功的回调
                    //         console.log(res)
                    //         const data = res.data
                    //         const postData = `data:image/${ext};base64,${res.data}`
                    //         // console.log('data:image/png;base64,' + res.data)
                    //         this.$showLoading({
                    //             title: '上传中'
                    //         })
                    //         const imgRes =await this.$fetch.post('/api/img/shop/uploadImg', { imgData: postData, ext, shopID: this.shopID, imgUrl })
                    //         this.shopInfo.imgUrl = (imgRes.data || {}).imgUrl
                    //         this.$hideLoading()
                    //         this.$showModal({
                    //             content: '上传成功'
                    //         }) 
                    //     }
                    // })
                    // #endif
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
    input { outline: none;border: none;list-style: none }
    .edit-item {
        height: 50rpx;
        line-height: 50rpx;
        padding-bottom: 20rpx; 
    }
    .edit-item-minus{
        padding-bottom: 20rpx;
        line-height: 50rpx;
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
    .minus-item {
        margin-bottom: 20rpx;
    }
    .minus-item-title {
        margin-right: 20rpx;
    }
    .minus-reach-title, .minus-reduce-title {
        margin-right: 20rpx;
    }
    .no-minus {
        color: #999
    }
    .input-minus {
        line-height: 40rpx;
        width: 80rpx;
        border: 2rpx solid;
        border-radius: 8rpx;
        box-sizing: border-box;
        min-height: 40rpx;
        height: 40rpx;
        margin-right: 20rpx;
        font-size: 26rpx;
    }
    .delete-icon {
        height: 40rpx;
        width: 40rpx;
        padding-right: 30rpx;
    }
    .add-minus {
        margin:0 auto ; 
        text-align: center;
        width: 200rpx;
        border: 2rpx solid;
        border-radius: 25rpx;
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

