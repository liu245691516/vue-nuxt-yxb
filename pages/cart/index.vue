<template>
    <div class="_center cart_wrap">
        <div class="step_wrap">
            <ul class="clearfix">
                <li>
                    <div class="step current_step"><span>01</span>选择商品</div>
                    <span class="iconfont" :class="step>=1?'font_color':''">&#xe65f;</span>
                </li>
                <li>
                    <div class="step" :class="step>=2?'current_step':''"><span>02</span>在线支付</div>
                    <span class="iconfont" :class="step>=2?'font_color':''">&#xe65f;</span>
                </li>
                <li>
                    <div class="step" :class="step>=3?'current_step':''"><span>03</span>提交信息</div>
                    <span class="iconfont" :class="step>=3?'font_color':''">&#xe65f;</span>
                </li>
                <li>
                    <div class="step" :class="step>=4?'current_step':''"><span>04</span>订单状态</div>
                    <span class="iconfont" :class="step>=4?'font_color':''">&#xe65f;</span>
                </li>
                <li>
                    <div class="step" :class="step>=5?'current_step':''"><span>05</span>订单完成</div>
                </li>
            </ul>
        </div>
        <nuxt-child />
    </div>
</template>
<script>
export default {
    layout: 'goods',
    data(){
        return{
            step:1,
        }
    },
    created() {
        var path = this.$route.path;
        switch (path) {
            case '/cart/list':
                this.step = 1;
                break;
            case '/cart/pay':
                this.step = 2;
                break;
            case '/cart/commit_info':
                this.step = 3;
                break;
            case '/cart/order_status':
                this.step = 4;
                break;
            case '/cart/order_finish':
                this.step = 5;
                break;
            default:
                break;
        }
    },
    watch: {
        '$route'(n, o){

        }
    },
}
</script>
<style lang="less" scoped>
.step_wrap{
    padding:25px 0;
    ul{
        display:flex;
        justify-content: space-around;
        li{
            .step{
                width:204px;
                height:42px;
                line-height: 42px;
                text-align: center;
                border:1px solid @borderColor;
                color:#666;
                border-radius: 4px;
                float: left;
                span{
                    margin-right:15px;
                }
            }
            img{
                float: left;
                margin:8px 15px;
            }
            .current_step{
                background:@highlight;
                color:#fff;
                border-color:@highlight;
            }
            .iconfont{
                font-size:24px;
                color:@borderColor;
                line-height: 42px;
                margin-left:10px;
                &.font_color{
                    color:@highlight;
                }
            }
        }
    }
}
</style>
