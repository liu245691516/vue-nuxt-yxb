<template>
  <div>
    <my-header></my-header>
    <goods-page-top-nav></goods-page-top-nav>
    <nuxt />
    <my-footer></my-footer>
  </div>
</template>

<script>
  import MyHeader from '~/components/header'
  import goodsPageTopNav from '~/components/goods-page-top-nav/goods-page-top-nav'
  import MyFooter from '~/components/footer'
  export default {
    components:{
      MyHeader,
      goodsPageTopNav,
      MyFooter
    }
  }
</script>