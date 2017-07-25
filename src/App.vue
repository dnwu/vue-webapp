<template>
  <div>
    <v-header :seller='seller'></v-header>
    <div class="tab border-1px">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评价</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import header from './components/header/header'
const errno = 0
export default {
  data() {
    return {
      seller: {}
    }
  },
  created() {
    // 这里发送ajax请求,请求header组件所需要的数据
    this.$http.get('/api/seller').then((Response) => {
      if (Response.data.errno === errno) {
        this.seller = Response.data.data
      }
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang='scss'>
@import 'common/css/mixin.scss';
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  // border-bottom: 1px solid rgba(7, 17, 27, .1);
  @include border-1px(rgba(7, 17, 27, .1));
  .tab-item {
    text-align: center;
    line-height: 40px;
    flex: 1;
    font-size: 14px;
    color: rgb(77, 85, 93);
    &.router-link-active {
      color: rgb(240, 20, 20)
    }
  }
}
</style>
