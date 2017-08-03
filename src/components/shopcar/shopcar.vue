<template>
    <div class="shopcar">
        <div class="iconCar" ref="iconCarDom" :class="{enoughSend:enoughSend}">
            <span class="icon-shopping_cart"></span>
        </div>
        <div class="moneyAndSendPay">
            <span class="money">¥{{totalPayMoney}}</span>
            <span class="sendPay">另需配送费¥{{seller.deliveryPrice}}元</span>
        </div>
        <div class="totalPay" :class="{enoughSend:enoughSend}">{{totalPay}}</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    props: {
        seller: {
            type: Object
        },
        totalgoods: {
            type: Array,
            defult: function () {
                return []
            }
        }
    },
    computed: {
        totalPayMoney: function () {
            let totalPay = 0
            if (this.totalgoods.length) {
                this.totalgoods.forEach(function (element) {
                    totalPay += element.price * element.count
                })
            }
            return totalPay
        },
        totalPay: function () {
            if (this.totalPayMoney === 0) {
                return `¥ ${this.seller.minPrice}起送`
            } else if (this.seller.minPrice - this.totalPayMoney > 0) {
                return `还差¥${this.seller.minPrice - this.totalPayMoney}起送`
            } else {
                return `去结算`
            }
        },
        enoughSend: function () {
            if (this.seller.minPrice - this.totalPayMoney <= 0) {
                return true
            }
        }
    },
    mounted() {
        this.getCarPosition()
    },
    methods: {
        getCarPosition() {
            // console.log(this.$refs.iconCarDom)
            // console.log(1111, this.$refs.iconCarDom)
            var pos = this.$refs.iconCarDom.getBoundingClientRect()
            // console.log(pos)
            this.$emit('getCarPositionData', pos)
        }
    }
}
</script>
<style lang="scss" scoped>
.shopcar {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 48px;
    background-color: #141d27;
    padding-left: 12px;
    .iconCar {
        position: relative;
        left: 0;
        bottom: 10px;
        z-index: 66;
        display: inline-block;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: #141d27;
        text-align: center;
        &.enoughSend {
            .icon-shopping_cart {
                background-color: #00A0DC;
                color: #fff;
            }
        }
        .icon-shopping_cart {
            display: inline-block;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.2);
            z-index: 99;
            font-size: 24px;
            color: rgba(255, 255, 255, 0.4);
            line-height: 44px;
            margin-top: 6px;
        }
    }
    .moneyAndSendPay {
        flex: 1;
        display: inline-block;
        color: rgba(255, 255, 255, 0.4);
        font-size: 16px;
        line-height: 24px;
        margin-left: 12px;
        margin-top: 12px;
        .money {
            font-weight: 700;
            padding-right: 12px;
            border-right: 1px solid rgba(255, 255, 255, 0.4);
        }
        .sendPay {
            font-size: 14px;
            font-weight: 200;
            padding-left: 12px;
        }
    }
    .totalPay {
        width: 100px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.4);
        font-weight: 700;
        line-height: 24px;
        padding-top: 12px;
        background-color: rgba(255, 255, 255, 0.2);
        text-align: center;
        &.enoughSend {
            background-color: #00A0DC;
            color: #fff;
        }
    }
}
</style>