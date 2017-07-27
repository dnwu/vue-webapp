<template>
    <div class="goods">
        <div class="menulist" ref="menulist">
            <ul>
                <li v-for="(menu,index) in goods" :key='index' :class="{active : setActiveClass===index?true:false}" @click='setActive(index,$event)'>
                    <span class="text border-1px">
                        <span class="icon" v-if="menu.type>0" :class="iconClassList[menu.type]"></span>{{menu.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="goodslist" ref="goodslist">
            <ul>
                <li class="categoryList" v-for="(category,index) in goods" :key="index">
                    <ul class="category">
                        <li class="tittle">{{category.name}}</li>
                        <li class="foods" v-for="(item,index) in category.foods" :key="index">
                            <div class="pic">
                                <img :src="item.image" width="64" height="64" alt="">
                            </div>
                            <div class="mes">
                                <div class="name">{{item.name}}</div>
                                <div class="description">{{item.description}}</div>
                                <div class="countAndScore">
                                    <span class="count">月售{{item.sellCount}}份</span>
                                    <span class="score">好评率{{item.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="new">¥{{item.price}}</span>
                                    <span class="old" v-show="item.oldPrice">¥{{item.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="shopcar">
            <div class="iconCar">
                <span class="icon-shopping_cart"></span>
            </div>
            <div class="moneyAndSendPay">
                <span class="money">¥0</span>
                <span class="sendPay">另需配送费¥4元</span>
            </div>
            <div class="totalPay">¥20起送</div>
        </div>
    </div>
</template>
<script>
const errno = 0
import BScroll from 'better-scroll'
export default {
    name: 'goods',
    data() {
        return {
            goods: {},
            iconClassList: ['decrease', 'discount', 'invoice', 'guarantee', 'special'],
            // goodsCategoryHeight: [],
            setActiveClass: 0
        }
    },
    created() {
        this.$http.get('/api/goods').then((data) => {
            if (data.data.errno === errno) {
                this.goods = data.data.data
                this.$nextTick(() => {
                    this.scroll1 = new BScroll(this.$refs.menulist, {
                        click: true
                    })
                    this.scroll2 = new BScroll(this.$refs.goodslist, {
                        probeType: 3
                    })
                    this.scroll1.on('scroll', (pos) => {
                    })
                    this.scroll2.on('scroll', (pos) => {
                        let scrollY = Math.abs(pos.y) || 0
                        for (let i = 0; i < this.goodsCategoryHeight.length; i++) {
                            if (scrollY >= this.goodsCategoryHeight[i] && scrollY < this.goodsCategoryHeight[i + 1]) {
                                this.setActiveClass = i
                            }
                        }
                    })
                })
            }
        })
    },
    methods: {
        setActive(index, $event) {
            if ($event._constructed === true) {
                this.setActiveClass = index
            }
            this.scroll2.scrollToElement(this.$refs.goodslist.querySelectorAll('.category')[this.setActiveClass], 300)
        }
    },
    computed: {
        goodsCategoryHeight: function () {
            var goodsCategoryHeightArr = []
            var goodsTotalHeight = 0
            var categoryList = this.$refs.goodslist.querySelectorAll('.category')
            goodsCategoryHeightArr.push(goodsTotalHeight)
            for (let i = 0; i < categoryList.length; i++) {
                goodsTotalHeight += categoryList[i].offsetHeight
                goodsCategoryHeightArr.push(goodsTotalHeight)
            }
            return goodsCategoryHeightArr
        }
    }
}
</script>
<style lang="scss">
@import '../../common/css/mixin.scss';
.goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 48px;
    overflow: hidden;
    .menulist {
        width: 80px;
        ul {
            background-color: #f3f5f7;
            li {
                padding: 0 12px;
                box-sizing: border-box;
                display: table;
                line-height: 14px;
                height: 54px;
                width: 100%;
                text-align: left;
                font-size: 0;
                .icon {
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                    vertical-align: top;
                    margin-right: 2px;
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
                    font-size: 12px;
                    color: rgb(20, 20, 20);
                    font-weight: 200;
                    display: table-cell;
                    vertical-align: middle;
                    @include border-1px(rgba(7, 17, 27, 0.1));
                }
                &:last-child {
                    .text {
                        &:last-child {
                            @include border-none();
                        }
                    }
                }
                &.active {
                    background-color: #fff;
                    .text {
                        font-weight: 700;
                        @include border-none();
                    }
                }
            }
        }
    }
    .goodslist {
        flex: 1;
        .category {
            .tittle {
                height: 26px;
                background-color: #f3f5f7;
                border-left: 3px solid #d9dde1;
                font-size: 12px;
                line-height: 26px;
                color: rgb(147, 153, 159);
                padding-left: 11px;
            }
            .foods {
                font-size: 0;
                padding: 18px;
                display: flex;
                @include border-1px(rgba(7, 17, 27, 0.1));
                &:last-child {
                    @include border-none();
                }
                .pic {
                    display: inline-block;
                    width: 64px;
                    height: 64px;
                    margin-right: 10px;
                }
                .mes {
                    flex: 1;
                    font-size: 14px;
                    vertical-align: top;
                    display: inline-block;
                    .name {
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                        line-height: 14px;
                        font-weight: 700;
                        padding-top: 2px;
                    }
                    .description {
                        font-size: 10px;
                        line-height: 10px;
                        color: rgb(147, 153, 159);
                        margin: 8px 0; // overflow: hidden;
                        // text-overflow: ellipsis;
                        // white-space: nowrap;
                        // width: 100px;
                    }
                    .countAndScore {
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                        line-height: 10px;
                        .count {
                            margin-right: 12px;
                        }
                    }
                    .price {
                        font-size: 10px/14px;
                        color: rgb(240, 20, 20);
                        line-height: 24px;
                        .new {
                            font-weight: 700;
                        }
                        .old {
                            font-weight: 700;
                            color: rgb(147, 153, 159);
                            text-decoration: line-through;
                            margin-left: 8px;
                        }
                    }
                }
            }
        }
    }
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
        }
    }
}
</style>