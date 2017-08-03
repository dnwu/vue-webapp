<template>
    <div class="carcontrol">
        <transition name='decrease'>
            <div class="countDecrease icon-remove_circle_outline" v-show="showOrHide" @click.stop="decrease($event,item)"></div>
        </transition>
        <div class="count" v-show="showOrHide">{{count}}</div>
        <div class="countAdd icon-add_circle" @click.stop="add($event,item)">
            <div class="carCountBox" v-for="(item,index) in circleStatus" :key="index">
                <!--<transition name="circle" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave">
                                        <div class="circle-out" :data-index='index' v-show="item.show">
                                            <div class="circle-in">
                                            </div>
                                        </div>
                                    </transition>-->
                <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                    <div class="circle-out" :data-index='index' v-show="item.show">
                        <div class="circle-in"></div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            count: 0,
            info: [],
            // 控制小球的隐藏
            circleStatus: [{
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }],
            // 小球的坐标值
            circlePosition: {}
            // 显示小球的盒子
            // circleBox: []
        }
    },
    props: {
        item: {
            type: Object
        },
        shopCarPositionData: {
        }
    },
    methods: {
        decrease(e, item) {
            if (!e._constructed) {
                return
            }
            if (this.count > 0) {
                this.count--
            }
            this.info = {
                name: item.name,
                price: item.price,
                count: this.count
            }
            this.$emit('addInfo', JSON.stringify(this.info))
        },
        add(e, item) {
            if (!e._constructed) {
                return
            }
            this.count++
            this.info = {
                name: item.name,
                price: item.price,
                count: this.count
            }
            // console.log(e.target)
            // 把每次点击的数据传给父组件
            // 这里如果每次把相同的对象传过去,就会发生对象联动的现象,
            this.$emit('addInfo', JSON.stringify(this.info))

            // 点击小球的时候调用getposition方法
            this.getPostion(e)

            // // 計算出來小球的位置,当位置变化的时候不选择这个小球进行动画
            // var position = e.target.getElementsByClassName('circle')[0].getBoundingClientRect().top
            // console.log(position)
            // 遍历小球,选择一个让其显示
            this.chooseCircle(e)
        },
        beforeEnter(el) {
            // console.log(el)
            el.style.display = ''
            el.style.transform = 'translateX(0px)'
            el.style.webkitTransform = `translateX(0px)`
            // console.log(target.getElementsByClassName('circle-in')[0])
            var targetIn = el.getElementsByClassName('circle-in')[0]
            targetIn.style.transform = `translateY(0px)`
            targetIn.style.webkitTransform = `translateY(0px)`
        },
        enter(el, done) {
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight
            this.$nextTick(() => {
                // console.log(11111, this.shopCarPositionData)
                el.style.transform = `translateX(-${this.computedLength.x}px)`
                el.style.webkitTransform = `translateX(-${this.computedLength.x}px)`
                // console.log(el.getElementsByClassName('circle-in')[0])
                var targetIn = el.getElementsByClassName('circle-in')[0]
                targetIn.style.transform = `translateY(${this.computedLength.y}px)`
                targetIn.style.webkitTransform = `translateY(${this.computedLength.y}px)`
            })
            el.addEventListener('transitionend', done)
        },
        // 小球动画
        afterEnter(el) {
            el.style.display = 'none'

            // 获取需要还原小球的index
            var index = el.dataset.index
            console.log(index, '結束')
            // console.log('after', this.circleStatus)

            // console.log('after', this.circleStatus)
            // el.style.display = 'none'
            this.circleStatus[index].show = false

            // for (let i = 0; i < this.circleStatus.length; i++) {
            //     this.circleStatus[i].show = false
            // }
            /* eslint-disable no-unused-vars */
            // let rf = el.offsetHeight
            // for (var i = 0; i < this.circleBox.length; i++) {
            //     var boll = this.circleBox.shift()
            //     while (boll.show) {
            //         boll.show = false
            //         el.style.display = 'none'
            //     }
            // }
        },
        // beforeLeave(el) {
        //     // // console.log('after', el)
        //     // console.log('leave')
        //     // el.style.transform = 'translateX(0px)'
        //     // el.style.webkitTransform = `translateX(0px)`
        //     // // console.log(target.getElementsByClassName('circle-in')[0])
        //     // var targetIn = el.getElementsByClassName('circle-in')[0]
        //     // targetIn.style.transform = `translateY(0px)`
        //     // targetIn.style.webkitTransform = `translateY(0px)`
        // },
        // 获取点击小球的位置
        getPostion(e) {
            var pos = e.target.getBoundingClientRect()
            // console.log(pos)
            // console.log('getposition')
            var x = pos.left + pos.width / 2
            var y = pos.top + pos.height / 2
            // console.log(e.target)
            this.circlePosition = {
                x: x,
                y: y
            }
        },
        // 遍历小球,选择一个让其显示
        chooseCircle(e) {
            for (var i = 0; i < this.circleStatus.length; i++) {
                if (!this.circleStatus[i].show) {
                    console.log(i)
                    this.circleStatus[i].show = true
                    // this.circleBox.push(this.circleStatus[i])
                    return
                }
            }
        }
    },
    computed: {
        showOrHide: function () {
            if (this.count > 0) {
                return true
            } else {
                return false
            }
        },
        // 计算小球移动的左右距离
        computedLength() {
            // let PosObj = {}
            var carY = this.shopCarPositionData.top + this.shopCarPositionData.height / 2
            var carX = this.shopCarPositionData.left + this.shopCarPositionData.width / 2
            var circleX = this.circlePosition.x
            var circleY = this.circlePosition.y
            let posObj = {
                x: circleX - carX,
                y: carY - circleY
            }
            return posObj
        }
    }
}
</script>
<style lang="scss" scoped>
.carcontrol {
    div {
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        color: rgb(0, 160, 220);
        vertical-align: middle;
        &.count {
            width: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 24px;
        }
        &.countDecrease,
        &.countAdd {
            padding: 6px;
        }
        &.decrease-enter-active,
        &.decrease-leave-active {
            transition: all 0.4s;
        }
        &.decrease-enter,
        &.decrease-leave-to {
            transform: translateX(40px) rotate(180deg);
            opacity: 0;
        }
    }
    .countAdd {
        position: relative;
        .circle-out {
            // &.circle-enter-active,
            width: 10px;
            height: 10px;
            position: absolute;
            top: 13px;
            left: 13px;
            transition: all .6s linear;
            z-index: 111;
            .circle-in {
                position: absolute;
                top: 0;
                left: 0;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: red;
                transition: all .6s cubic-bezier(.27, -0.52, .92, .48);
            }
        }
    }
}
</style>