<template>
    <section>
        <h4>订单记录</h4>
        <div class="form">
            <div class="tab_head clearfix">
                <div class="order_info item">订单详情</div>
                <div class="price item">金额</div>
                <div class="status item">全部状态 <i class="iconfont">&#xe601;</i>
                    <ul class="select_status">
                        <li>全部状态</li>
                        <li>待支付</li>
                        <li>待提交</li>
                        <li>待执行</li>
                        <li>执行中</li>
                        <li>执行完成</li>
                    </ul>
                </div>
                <div class="hint item">操作</div>
            </div>
            <ul class="order_wrap">
                <li>    
                    <div class="title">
                        <p>2019-03-31 16:45:56 <span>订单号:<span class="order_number">8989323365</span></span></p>
                    </div>
                    <div class="order_list_wrap clearfix">
                        <div class="order_info item">
                            <img src="../../../assets/image/pro_img.png">
                            <p class="desc">所购产品名称描述文字信息内容所购产品名称描述文...</p>
                        </div>
                        <div class="item price">￥2000.00</div>
                        <div class="item pay_status">待支付</div>
                        <div class="item hint">
                            <p><a href="javascript:;">去支付</a></p>
                            <p><a href="javascript:;" @click="cancelOrder">取消订单</a></p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <confirm @deleteBtn='deleteCoupon' ref="confirm">
            <div slot="select" class="cancel_wrap">
                <span><i>*</i>取消原因:</span>
                <select class="categorys">
                    <option v-for="(item, index) in reason" :value="item.id" :key="index">{{item.title}}</option>
                </select>
            </div>
        </confirm>
    </section>
</template>

<script>
    import confirm from '~/components/confirm/confirm';
    export default {
        data(){
            return {
                reason: [
                    {title: '请选择取消原因', id:0},
                    {title: '我不想买了', id:1},
                    {title: '重复购买', id:2},
                    {title: '付款遇到问题', id:3},
                    {title: '拍错了', id:4},
                    {title: '其他原因', id:5},
                ]
            }
        },
        methods:{
            cancelOrder(){
                this.$refs.confirm.showModal({
                    title: '确定要删除该优惠券吗?',
                    content: '删除后的优惠券将不可恢复，请谨慎操作'
                });
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
        margin-left:20px;
        border-bottom:1px solid @borderColor;
    }
    .form{
        padding:20px;
        width:100%;
        .tab_head{
            height:45px;
            line-height: 45px;
            background:@borderColor;
            .status{
                position: relative;
                cursor: pointer;
                .iconfont{
                    font-size:12px;
                    display: inline-block;
                }
                &:hover .select_status{
                    display: block;
                }
                &:hover>i{
                    transition:all .3s;
                    transform: rotate(180deg);
                }
                .select_status{
                    display: none;
                    position: absolute;
                    top:44px;
                    background:#fff;
                    border:1px solid @borderColor;
                    text-align: center;
                    width:120px;
                    li{
                        height:28px;
                        line-height: 28px;
                        cursor: pointer;
                        &:hover{
                            color:#fff;
                            background:#1e90ff;
                        }
                    }
                }
            }
        }
        .item{
            float: left;
            width:120px;
            text-align: center;
            &.order_info{
                width:554px;
            }
        }
        .order_wrap{
            margin-top:20px;
            li{
                margin-bottom:20px;
                border:1px solid @borderColor;
                color:#666;
                .title{
                    height:46px;
                    line-height: 46px;
                    background:#f9f9f9;
                    padding:0 16px;
                    border-bottom:1px solid @borderColor;
                    span{
                        margin-left:40px;
                        .order_number{
                            color:#333;
                            margin-left:24px;
                        }
                    }
                }
                .order_list_wrap{
                    border-bottom:1px solid @borderColor;
                    height:96px;
                    .order_info{
                        padding:15px;
                        text-align: left;
                        img{
                            width:64px;
                            height:64px;
                            display: inline-block;
                        }
                        .desc{
                            line-height: 64px;
                            margin-left:10px;
                            width:440px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            display: inline-block;
                            cursor: pointer;
                            &:hover{
                                color:@highlight;
                            }
                        }
                    }
                    .item{
                        border-right:1px solid @borderColor;
                        height:100%;
                        &:last-child{
                            border:none;
                        }
                        &.price{
                            line-height: 96px;
                            color:#000;
                        }
                        &.pay_status{
                            line-height: 96px;
                            color:@highlight;
                        }
                        &.hint{
                            line-height: 22px;
                            padding-top:25px;
                        }
                    }
                    &:last-child{
                        border:none;
                    }
                }
            }
        }
    }
    .cancel_wrap{
        margin-bottom:25px;
        font-size:12px;
        i{
            font-style: normal;
            color:red;
            vertical-align: middle;
            margin-right:5px;
        }
        .categorys{
            width:180px;
            height: 30px;
            border:1px solid @borderColor;
            margin-left:10px;
        }
    }
</style>
