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
                <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
                <div v-if="seller.supports" class="support">
                    <span class="type"></span>
                    <span class="info">{{seller.supports[0].description}}</span>
                </div>
            </div>
        </div>
        <div class="bulletin"></div>
    </div>
</template>
<script>
export default {
    name: 'header',
    props: {
        seller: {
            type: Object
        }
    }
}
</script>
<style lang="scss" scoped>
.header {
    background-color: #000;
    color: #fff;
    .content {
        padding: 24px 16px 18px 24px;
        font-size: 0;
        .avatar {
            display: inline-block;
        }
        .contentNews {
            display: inline-block;
            font-size: 16px;
        }
    }
}
</style>