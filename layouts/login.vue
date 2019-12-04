<template>
    <div>
        <div class="head">
            <div class="_center content clearfix">
                <div class="logo">
                <img class="logo_img" src="../assets/image/logo.svg" title="叮咚营销宝">
                <img class="slogan" src="../assets/image/slogan.png">
                </div>
                <div class="advisory">
                <img src="../assets/image/tel_number.png">
                </div>
            </div>
        </div>
        <nuxt/>
        <div class="nav">
            <a href="javascript:;">网站首页</a>
            <span>|</span>
            <a href="javascript:;">关于我们</a>
            <span>|</span>
            <a href="javascript:;">联系我们</a>
        </div>
        <div class="footer">
            <div class="logo_b"></div>
            <p class="Copyright">Copyright © 2013-2019 北京合众康桥科技(版权所有)  |  北京合众康桥科技发展有限公司官网  京ICP</p>
        </div>
    </div>
</template>
<script>
    import Cookies from 'js-cookie';
    export default {
        created(){
            if(Cookies.get('access_token')){
                this.$router.push({
                    path: '/'
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.head{
    border-bottom:1px solid @highlight;
}
.content{
    padding:29px 0;
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
    .advisory{
        float: right;
    }
}
.nav{
    width:100%;
    height:72px;
    line-height: 72px;
    color:#666;
    text-align: center;
    a{
        color:#666;
        margin:0 30px;   
    }
}
.footer{
    .logo_b{
        height:100px;
        background:#fafafa url(../assets/image/login_logo_b.png) center no-repeat;
    }
    .Copyright{
        line-height: 78px;
        text-align: center;
        color:#999;
    }
}
</style>
