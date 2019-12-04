<template>
    <section>
        <h4>优惠券<span class="explain">优惠券规则说明</span></h4>
        <div class="coupon_wrap">
            <div class="tabs">
                <a href="javascript:;" :class="currentIndex==0?'current':''" @click="selectTab(0)">可用优惠券<span class="iconfont">&#xe843;</span></a>
                <a href="javascript:;" :class="currentIndex==1?'current':''" @click="selectTab(1)">已用优惠券<span class="iconfont">&#xe843;</span></a>
                <a href="javascript:;" :class="currentIndex==2?'current':''" @click="selectTab(2)">过期优惠券<span class="iconfont">&#xe843;</span></a>
            </div>
            <ul class="coupon clearfix">
                <li>
                    <div class="price_top">
                        <svg class="icon svg-icon" aria-hidden="true" @click="delCoupon">
                            <use xlink:href="#iconguanbi--copy"></use>
                        </svg>
                        <p class="price">￥<span>100</span></p>
                        <p class="subtract">满2000减100</p>
                        <p class="indate">有效期至2019.03.31</p>
                    </div>
                    <div class="desc">
                        <p>限品类：<span>全品类(特例商品除外)</span></p>
                        <p>券编号：<span>123456789</span></p>
                        <a href="javascript:;" class="immediate_use">立即使用</a>
                    </div>
                </li>
                <li class="have_been_used ">
                    <div class="price_top">
                        <svg class="icon svg-icon" aria-hidden="true">
                            <use xlink:href="#iconguanbi--copy"></use>
                        </svg>
                        <p class="price">￥<span>100</span></p>
                        <p class="subtract">满2000减100</p>
                        <p class="indate">有效期至2019.03.31</p>
                    </div>
                    <div class="desc">
                        <p>限品类：<span>全品类(特例商品除外)</span></p>
                        <p>券编号：<span>123456789</span></p>
                        <i class="iconfont">&#xe645;</i>
                    </div>
                </li>
                <li class="have_been_used ">
                    <div class="price_top">
                        <svg class="icon svg-icon" aria-hidden="true">
                            <use xlink:href="#iconguanbi--copy"></use>
                        </svg>
                        <p class="price">￥<span>100</span></p>
                        <p class="subtract">满2000减100</p>
                        <p class="indate">有效期至2019.03.31</p>
                    </div>
                    <div class="desc">
                        <p>限品类：<span>全品类(特例商品除外)</span></p>
                        <p>券编号：<span>123456789</span></p>
                        <i class="iconfont">&#xe68e;</i>
                    </div>
                </li>
            </ul>
        </div>
        <confirm @deleteBtn='deleteCoupon' ref="confirm"></confirm>
    </section>
</template>

<script>
    import confirm from '~/components/confirm/confirm';
    export default {
        data(){
            return{
                currentIndex: 0
            }
        },
        methods:{
            selectTab(index){
                this.currentIndex = index;
            },

            //删除优惠券
            delCoupon(){
                this.$refs.confirm.showModal({
                    title: '确定要删除该优惠券吗?',
                    content: '删除后的优惠券将不可恢复，请谨慎操作'
                });
            },

            //确定删除优惠券
            deleteCoupon(){

            },
        },
        components:{
            confirm
        }
    }
</script>
<style lang="less" scoped>
    h4{
        font-size:16px;
        padding:34px 0 15px 0;
        margin:0 20px;
        border-bottom:1px solid @borderColor;
        .explain{
            color:#666;
            float:right;
            font-size:14px;
            font-weight: normal;
        }
    }
    .coupon_wrap{
        padding:20px 0;
        .tabs{
            height:45px;
            background:#f9f9f9;
            padding:0 60px;
            margin: 0 20px;
            a{
                line-height: 45px;
                margin-right:70px;
                position: relative;
                display: inline-block;
                span{
                    position: absolute;
                    left:50%;
                    bottom:-2px;
                    margin-left:-7px;
                    line-height: 1;
                    color: #fff;
                    font-size:12px;
                }
                &.current{
                    border-bottom:1px solid @highlight;
                    span{
                        color:@highlight;
                    }
                }
            }
        }
        .coupon{
            li{
                margin:20px 0 0 20px;
                width:214px;
                height:360px;
                text-align: center;
                float: left;
                .price_top{
                    height:180px;
                    background:url(../../../assets/image/coupon_bg.png) center no-repeat;
                    color:#fff;
                    position: relative;
                    .svg-icon{
                        position: absolute;
                        top:0;
                        right:0;
                        display: none;
                        cursor: pointer;
                    }
                    .price{
                        padding-top:35px;
                        font-size:24px;
                        span{
                            font-size:38px;
                            vertical-align: text-top;
                        }
                    }
                    .subtract{
                        padding-top:20px;
                    }
                    .indate{
                        font-size:12px;
                        color:#016692;
                        padding-top:45px;
                    }
                }
                .desc{
                    font-size:12px;
                    height:180px;
                    background:#f9f9f9;
                    p{
                        padding-top:18px;
                        text-align: left;
                        padding-left:10px;
                        color:#666;
                        font-weight: bold;
                        span{
                            color:#999;
                            font-weight: 500;
                        }
                    }
                    .immediate_use{
                        display: inline-block;
                        width:131px;
                        height:32px;
                        text-align: center;
                        line-height: 32px;
                        border-radius: 16px;
                        color:#72c7ec;
                        font-size:14px;
                        border:1px solid #72c7ec;
                        margin-top:56px;
                    }
                    i.iconfont{
                        font-size:62px;
                        color:#c7c7c7;
                        display: inline-block;
                        margin-top:42px;
                        margin-right:20px;
                        float:right;
                    }
                }
                &:hover{
                   box-shadow: 0 0 10px 3px #e5e5e5;
                   & .immediate_use{
                       background: #72c7ec;
                       color:#fff;
                   }
                   & .svg-icon{
                       display: block;
                   }
                }
                &.have_been_used{
                    .price_top{
                        background: url(../../../assets/image/coupon_used_bg.png) center no-repeat;
                        .indate{
                            color:#868686;
                        }
                    }
                }
            }
        }
    }
</style>
