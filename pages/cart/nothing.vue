<template>
    <div class="empty_order">
        <div class="desc">
            <img src="../../assets/image/empty_order.png">
            <div class="text">
                <p>暂无订单!</p>
                <p>暂无订单！ 购物车空空的哦~，去看看心仪的商品吧~<nuxt-link class="go_shopping" to="/">去购物</nuxt-link></p>
            </div>
        </div>
    </div>
</template>
<script>
import {getCartList} from '~/libs/api';
export default {
    layout: 'goods',
    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        return getCartList().then(res =>{
            if(res.code == 200){
                if(res.data.length != 0){
                    redirect('/cart');
                }
            }
        })
    },
}
</script>
<style lang="less" scoped>
.empty_order{
    padding:120px 0 166px 0;
    text-align: center;
    .desc{
        display: inline-block;
        img{
            float: left;
        }
        .text{
            margin-left:45px;
            text-align: left;
            float:left;
            padding-top:15px;
            p{
                color:#666;
                line-height: 32px;
            }
            .go_shopping{
                width:78px;
                height:30px;
                display: inline-block;
                color:#ff6900;
                border:1px solid #ff6900;
                text-align: center;
                line-height: 30px;
                margin-left:10px;
            }
        }
    }
}
</style>

