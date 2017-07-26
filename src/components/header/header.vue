<template>
    <div class="header">
        <div class="content">
            <div class="avatar">
                <img :src="seller.avatar" width="64" height="64" alt="">
            </div>
            <div class="contentNews">
                <div class="tittle">
                    <div class="brand"></div>
                    <div class="name">{{seller.name}}</div>
                </div>
                <div class="description">{{seller.description}} / {{seller.deliveryTime}}分钟送达</div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="iconClassList[seller.supports[0].type]"></span>
                    <span class="info">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="iconCount" @click="showOrHide">
                <span class="count">{{seller.supports.length}}个</span>
                <span class="icon-keyboard_arrow_right"></span>
            </div>
        </div>
        <div class="bulletin" @click="showOrHide">
            <span class="bulletinIcon"></span>
            <span class="bulletinInfo">{{seller.bulletin}}</span>
            <span class="icon-keyboard_arrow_right"></span>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%" alt="">
        </div>
        <transition>
            <div class="detial" v-show="detialFloor">
                <div class="detial-main" @click="hideOrShow">
                    <div class="detial-tittle">
                        <div class="name">{{seller.name}}</div>
                        <div class="star">
                            <v-star :starType='48' :score='seller.score'></v-star>
                        </div>
                    </div>
                    <div class="detial-message">
                        <div class="mes-header">
                            <div class="line"></div>
                            <div class="mes-tittle">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <div class="mes-content">
                            <div v-for="(item,index) in seller.supports" :key="index">
                                <span class="icon" :class="iconClassList[item.type]"></span>
                                <span class="text">{{item.description}}</span>
                            </div>
                        </div>
                        <div class="mes-header">
                            <div class="line"></div>
                            <div class="mes-tittle">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="mes-content">
                            {{seller.bulletin}}
                        </div>
                    </div>
                </div>
                <div class="detial-close" @click="hideOrShow">
                    <span class="icon-close"></span>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
// 导入star组件
import star from '../star/star.vue'
export default {
    name: 'header',
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            detialFloor: false
        }
    },
    created() {
        this.iconClassList = ['decrease', 'discount', 'invoice', 'guarantee', 'special']
    },
    methods: {
        showOrHide() {
            this.detialFloor = true
        },
        hideOrShow() {
            this.detialFloor = false
        }
    },
    components: {
        'v-star': star
    }
}
</script>
<style lang="scss" scoped>
@import '../../common/css/mixin.scss';
.header {
    background-color: rgba(7, 17, 27, 0.5);
    color: #fff;
    position: relative;
    overflow: hidden;
    .content {
        position: relative;
        padding: 24px 16px 18px 24px;
        font-size: 0;
        .avatar {
            display: inline-block;
            vertical-align: top;
        }
        .contentNews {
            display: inline-block;
            font-size: 0;
            padding: 2px 0 0 16px;
            .tittle {
                margin-bottom: 8px;
                .brand {
                    display: inline-block;
                    width: 30px;
                    height: 18px;
                    @include bgImg('brand');
                    background-size: 30px 18px;
                    background-position: center center;
                    background-repeat: no-repeat;
                    vertical-align: top;
                }
                .name {
                    display: inline-block;
                    font-size: 16px;
                    color: rgb(255, 255, 255);
                    font-weight: bold;
                    line-height: 18px;
                    margin-left: 6px;
                }
            }
            .description {
                font-size: 12px;
                color: rgb(255, 255, 255);
                font-weight: 200;
                line-height: 12px;
                margin-bottom: 10px;
            }
            .support {
                font-size: 0px;
                .icon {
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                    vertical-align: top;
                    margin-right: 4px;
                    &.decrease {
                        @include bgImg('decrease_1');
                    }
                    &.discount {
                        @include bgImg('discount_1');
                    }
                    &.guarantee {
                        @include bgImg('guarantee_1');
                    }
                    &.invoice {
                        @include bgImg('invoice_1');
                    }
                    &.special {
                        @include bgImg('special_1')
                    }
                }
                .info {
                    display: inline-block;
                    font-size: 10px;
                    color: #fff;
                    font-weight: 200;
                    line-height: 12px;
                    margin-bottom: 2px;
                    vertical-align: top;
                }
            }
        }
        .iconCount {
            position: absolute;
            bottom: 18px;
            right: 12px;
            height: 24px;
            border-radius: 12px;
            font-size: 10px;
            color: rgb(255, 255, 255);
            font-weight: 200;
            line-height: 12px;
            background-color: rgba(0, 0, 0, 0.2);
            padding: 7px 8px;
            box-sizing: border-box;
            .count {
                display: inline-block;
                vertical-align: middle;
            }
            .icon-keyboard_arrow_right {
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
    .bulletin {
        height: 28px;
        background-color: rgba(7, 17, 27, 0.2);
        padding: 0 12px;
        display: flex;
        .bulletinIcon {
            display: inline-block;
            width: 22px;
            height: 12px;
            background-size: 22px 12px;
            @include bgImg('bulletin');
            margin: 6px 4px 0 0;
        }
        .bulletinInfo {
            flex: 1;
            display: inline-block;
            font-size: 10px;
            color: #fff;
            font-weight: 200;
            line-height: 28px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .icon-keyboard_arrow_right {
            display: inline-block;
            line-height: 28px;
        }
    }
    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: -1;
        filter: blur(10px);
    }
    .detial {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(7, 17, 27, 0.8);
        z-index: 999;
        overflow: auto;
        &.v-enter-active,
        &.v-leave-active {
            transition: all 0.6s;
        }
        &.v-enter,
        &.v-leave-to {
            transform: translate(100%,-100%);
            opacity: 0;
        }
        .detial-main {
            box-sizing: border-box;
            min-height: 100%;
            padding: 64px 36px;
            .detial-tittle {
                .name {
                    font-size: 16px;
                    font-weight: 700;
                    color: rgb(255, 255, 255);
                    line-height: 16px;
                    text-align: center;
                }
                .star {
                    text-align: center;
                    margin: 16px 0 28px 0;
                }
            }
            .detial-message {
                .mes-header {
                    display: flex;
                    .line {
                        flex: 1;
                        @include border-1px(rgba(255, 255, 255, 0.2));
                        height: 0;
                        margin-top: 7px;
                    }
                    .mes-tittle {
                        padding: 0 12px;
                        font-size: 14px;
                        font-weight: 700;
                        color: #fff;
                        line-height: 14px;
                    }
                }
                .mes-content {
                    padding: 24px 0 28px 12px;
                    font-size: 12px;
                    font-weight: 200;
                    color: #fff;
                    line-height: 24px;
                    >div {
                        font-size: 0;
                        margin-bottom: 12px;
                        &:last-child {
                            margin-bottom: 0;
                        }
                        .icon {
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            background-size: 16px 16px;
                            background-repeat: no-repeat;
                            vertical-align: top;
                            margin-right: 6px;
                            &.decrease {
                                @include bgImg('decrease_1');
                            }
                            &.discount {
                                @include bgImg('discount_1');
                            }
                            &.guarantee {
                                @include bgImg('guarantee_1');
                            }
                            &.invoice {
                                @include bgImg('invoice_1');
                            }
                            &.special {
                                @include bgImg('special_1')
                            }
                        }
                        .text {
                            display: inline-block;
                            font-size: 12px;
                            font-weight: 200;
                            color: #fff;
                            line-height: 16px;
                        }
                    }
                }
            }
        }
        .detial-close {
            margin: -64px auto 0 auto;
            font-size: 32px;
            color: rgba(255, 255, 255, 0.5);
            .icon-close {
                display: block;
                width: 32px;
                height: 32px;
                margin: 0 auto;
            }
        }
    }
}
</style>