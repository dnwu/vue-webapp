# my-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 第一天

``` bash
1 mock数据
2 配置路由
```
## 第二天

``` bash
1 header组件完毕
    1 评分组件
    2 一像素边框
    3 vue动画
    4 felx布局
    5 sticky-footer布局
```

## 第三天

``` bash
1 goods组件完成部分
    1 better-scroll插件的运用
    2 左右菜单联动
    3 goods底部部分布局完成
```

## 第四天

``` bash
1 购物车小球制作完成
    1 运用vue过渡
    2 getBoundingClientRect获取元素距离页面的距离
    3 transitionend 事件(transitionend 事件在 CSS 完成过渡后触发)
2 之中遇到的问题和解决办法
    1 在js钩子中,要注意DOM的一步渲染,所以在enter和leave的钩子函数里边要强行的渲染一下DOM,然后在this.nexttick()中执行,保证DOM重新渲染完,重新渲染DOM可以使用el.offsetHeght()
    2 在官方文档中有说明,就是在enter和leave必须要有done这个回调,(当只用JavaScript过渡的时候,在enter和leave中，回调函数done是必须的.否则，它们会被同步调用，过渡会立即完成。),什么时候执行这个done就有点讲究了,可以在里边监听一下transitionend事件,在transition过渡完成后执行这个done回调
    3 在afterenter中还原小球的show的值为false,但是在你连击的时候有时候会出现小球DOM,并没有刷新的情况,这个时候你可以把小球的状态设置成display为none,
4 详情可以看代码,过程中的问题代码都没有删,很乱, 不过也好,以后可以看看自己是怎么写代码的,且行且珍惜
```
``` js

```