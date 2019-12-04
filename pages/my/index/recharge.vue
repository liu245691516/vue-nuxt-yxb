<template>
    <section>
        <h4>账户充值</h4>
        <div class="explain">
            <p class="title">充值说明</p>
            <p>1.最低充值金额为100元，小于100元的充值不予受理</p>
            <p>1.最低充值金额为100元，小于100元的充值不予受理</p>
            <p>1.最低充值金额为100元，小于100元的充值不予受理</p>
        </div>
        <div class="recharge">
            <div class="re_item">
                <span class="title">充值金额:</span>
                <div class="price_input re_r">
                    <input type="text" placeholder="≥100">
                    <span>元</span>
                </div>
            </div>
            <div class="re_item">
                <span class="title">充值方式:</span>
                <div class="re_type re_r">
                    <a href="javascript:;" class="current">微信<span class="iconfont">&#xe74e;</span></a>
                    <a href="javascript:;">支付宝</a>
                    <a href="javascript:;">网银盾</a>
                </div>
            </div>
            <div class="re_item">
                <span class="title">确认金额:</span>
                <div class="sure_price re_r">
                    5000元
                </div>
            </div>
            <div class="re_item">
                <span class="title"></span>
                <a href="javascript:;" class="recharge_btn re_r">立即充值</a>
            </div>
        </div>
        <h4 class="recharge_log">充值记录</h4>
        <ul class="tabs">
            <li class="tab_head order_list">
                <ol class="clearfix">
                    <li>编号</li>
                    <li class="name">充值时间</li>
                    <li>充值方式</li>
                    <li>充值金额</li>
                    <li>充值状态</li>
                </ol>
            </li>
            <li class="order_list">
                <ol class="clearfix">
                    <li>01</li>
                    <li class="name">
                        2019-04-01
                    </li>
                    <li>微信</li>
                    <li>1900.00</li>
                    <li>已完成</li>
                </ol>
            </li>
            <li class="order_list">
                <ol class="clearfix">
                    <li>02</li>
                    <li class="name">
                        2019-04-01
                    </li>
                    <li>微信</li>
                    <li>1900.00</li>
                    <li>已完成</li>
                </ol>
            </li>
        </ul>
    </section>
</template>

<script>
    export default {
        
    }
</script>
<style lang="less" scoped>
    h4{
        font-size:16px;
        padding:34px 0 15px 0;
        margin-left:20px;
        border-bottom:1px solid @borderColor;
        &.recharge_log{
            border-top:1px solid @borderColor;
        }
    }
    .explain{
        margin:20px;
        padding:16px 20px 20px 20px;
        background:#fff6f0;
        .title{
            font-size:16px;
            color:@highlight;
            padding-bottom:14px;   
        }
        p{
            line-height: 27px;
        }
    }
    .recharge{
        margin:20px 20px 40px 20px;
        color:#666;
        .re_item{
            padding-bottom:20px;
            line-height: 42px;
            .re_r{
                display: inline-block;
            }
            span.title{
                width:116px;
                display: inline-block;
                text-align: center;
                marign-right:25px;
            }
            .price_input{
                display: inline-block;
                width:240px;
                height:42px;
                border:1px solid @borderColor;
                input{
                    width:210px;
                    padding:0 10px;
                    height:40px;
                }
            }
            .re_type{
                a{
                    display: inline-block;
                    width:120px;
                    height:42px;
                    line-height: 42px;
                    text-align: center;
                    margin-right:10px;
                    border:1px solid @borderColor;
                    font-size:16px;
                    color:#666;
                    position: relative;
                    .iconfont{
                        position: absolute;
                        bottom:0;
                        right:0;
                        color:@highlight;
                        line-height: 1;
                    }
                    &.current{
                        border-color:@highlight;
                    }
                }
            }
            .sure_price{
                font-size:22px;
                color:@highlight;
            }
            .recharge_btn{
                display: inline-block;
                width:180px;
                height:45px;
                text-align: center;
                line-height: 45px;
                color:#fff;
                background:@highlight;
            }
        }
    }
    .tabs{
        margin:20px;
        border:1px solid @borderColor;
        li.order_list{
            height:45px;
            line-height: 45px;
            color:#666;
            border-bottom:1px dashed @borderColor;
            &:last-child{
                border:none;
            }
            &.tab_head{
                height:68px;
                line-height: 68px;
                color:#333;
                background: #e5e5e5;
                font-weight: bold;
            }
            ol>li{
                float: left;
                width:153px;
                text-align: center;
                &.name{
                    width:300px;
                }
            }
        }
    }
</style>
