<template>
  <div>
    <my-header></my-header>
    <div class="nav_t">
        <div class="_center content clearfix">
            <div class="logo">
              <nuxt-link to="/"><img class="logo_img" src="../assets/image/logo.svg" title="叮咚营销宝"></nuxt-link>
              <img class="slogan" src="../assets/image/slogan.png">
            </div>
            <ul class="nav_wrap clearfix">
              <li v-for="(item, index) in navList" :key="index" v-if="index<5"><a :href="item.url" target="_blank">{{item.title}}</a></li>
            </ul>
            <div class="advisory">
              <img src="../assets/image/tel_number.png">
            </div>
        </div>
    </div>
    <nuxt />
    <my-footer></my-footer>
  </div>
</template>

<script>
  import MyHeader from '~/components/header'
  import MyFooter from '~/components/footer'
  import {getNavTop} from '~/libs/api'
  export default {
    data(){
      return{
        navList: []
      }
    },
    created() {
      //加载导航列表
      getNavTop().then(res => {
        if(res.code == 200){
          this.navList = res.data;
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    components:{
      MyHeader,
      MyFooter
    }
  }
</script>
<style lang="less" scoped>
  .nav_t{
    width:100%;
    height:80px;
    background:#fff;
    .content{
      padding:19px 0;
      .logo{
        margin-right:52px;
        display: inline-block;
        .logo_img{
            width:180px;
            height:42px;
        }
        .slogan{
          margin-left:20px;
          padding-left:20px;
          border-left:1px solid #e5e5e5;
        }
      }
      .nav_wrap{
        line-height: 42px;
        display: inline-block;
        li{
          line-height: 36px;
          float:left;
          font-size:16px;
          margin-right:32px;
          border-bottom:2px solid #fff;
          &:hover{
            border-bottom:2px solid #ff6900;
            a{
                color:#ff6900;
            }
          }
        }
      }
      .advisory{
        float: right;
      }
    }
  }
</style>
