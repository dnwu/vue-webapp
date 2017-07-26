<template>
    <div class="star" :class="starTypeClass">
        <span v-for="(starClass,index) in starClassArr" :key="index" :class="starClass"></span>
    </div>
</template>
<script>
const starNum = 5
export default {
    name: 'star',
    props: {
        // 接受两个参数
        starType: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    computed: {
        // 遍历分数,把需要的类名纯如到这个数据中
        starClassArr: function () {
            // 把score以0.5为单位划分
            const starClassArr = []
            let score = Math.floor(this.score * 2) / 2
            for (let i = 0; i < Math.floor(score); i++) {
                starClassArr.push('star-on')
            }
            if (score % 1 !== 0) {
                starClassArr.push('star-half')
            }
            while (starClassArr.length < starNum) {
                starClassArr.push('star-off')
            }
            return starClassArr
        },
        starTypeClass: function () {
            return 'star' + this.starType
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../common/css/mixin.scss';
.star {
    display: inline-block;
    font-size: 0;
    span {
        display: inline-block;
    }
    &.star24 {
        span {
            width: 10px;
            height: 10px;
            background-size: 10px 10px;
            margin-right: 12px;
            &:last-child {
                margin-right: 0;
            }
            &.star-on {
                @include bgImg('star24_on');
            }
            &.star-half {
                @include bgImg('star24_half');
            }
            &.star-off {
                @include bgImg('star24_off');
            }
        }
    }
    &.star36 {
        span {
            width: 15px;
            height: 15px;
            background-size: 15px 15px;
            margin-right: 18px;
            &:last-child {
                margin-right: 0;
            }
            &.star-on {
                @include bgImg('star36_on');
            }
            &.star-half {
                @include bgImg('star36_half');
            }
            &.star-off {
                @include bgImg('star36_off');
            }
        }
    }
    &.star48 {
        span {
            width: 20px;
            height: 20px;
            background-size: 20px 20px;
            margin-right: 24px;
            &:last-child {
                margin-right: 0;
            }
            &.star-on {
                @include bgImg('star48_on');
            }
            &.star-half {
                @include bgImg('star48_half');
            }
            &.star-off {
                @include bgImg('star48_off');
            }
        }
    }
}
</style>