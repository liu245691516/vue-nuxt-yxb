<template>
    <div class="order_status">
        <div class="order_desc clearfix">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icongou"></use>
            </svg>
            <div class="desc">
                <div class="title">订单已完成</div>
                <div class="hint">您的订单已完成，感谢您选择叮咚营销宝。如有任何意见或疑问，请垂询客服热线：010-57433574</div>
            </div>
        </div>
        <div class="operation">
            <a href="javascript:;" class="continue_buy">继续选购</a>
            <a href="javascript:;" class="order_log">订单记录 &gt;&gt;</a>
        </div>
        <ul class="tabs">
            <li class="tab_head order_list">
                <ol class="clearfix">
                    <li>订单日期</li>
                    <li class="name">订单名称</li>
                    <li>订单数量</li>
                    <li>交易金额</li>
                    <li>订单状态</li>
                </ol>
            </li>
            <li class="order_list">
                <ol class="clearfix">
                    <li>2019-03-20</li>
                    <li class="name">
                        订单名称描述订单名称描述订单名称描述...
                    </li>
                    <li>1</li>
                    <li>1900.00</li>
                    <li>订单执行中</li>
                </ol>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    mounted () {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()

            setTimeout(() => this.$nuxt.$loading.finish(), 500)
        })
    }
}
</script>
<style lang="less" scoped>
.order_desc{
    width:820px;
    display: block;
    margin:0 auto;
    padding:10px 0 25px 0;
    svg.icon{
        display:block;
        width: 78px;
        height:78px;
        float:left;
    }
    .desc{
        color:#018700;
        float:left;
        margin:15px 0 0 20px;
        .title{
            font-size:24px;
            margin-bottom:25px;
        }
        .hint{
            font-size:16px;
        }
        p{
            line-height:25px;
            text-indent: 36px;
        };
    }
}
.operation{
    text-align: center;
    margin-bottom:35px;
    .continue_buy{
        display: inline-block;
        width:180px;
        height:42px;
        line-height: 42px;
        text-align: center;
        border:1px solid @borderColor;
        color:@highlight;
        background:#f9f9f9;
        font-size:16px;
    }
    .order_log{
        color:#999;
        line-height: 42px;
        margin-left:32px;
    }
}
.tabs{
    margin-bottom:60px;
    border:1px solid @borderColor;
    li.order_list{
        height:60px;
        line-height: 60px;
        color:#666;
        border-bottom:1px solid @borderColor;
        &:last-child{
            border:none;
        }
        &.tab_head{
            height:68px;
            line-height: 68px;
            color:#333;
            background: #f9f9f9;
        }
        ol>li{
            float: left;
            width:212px;
            text-align: center;
            &.name{
                width:350px;
            }
        }
    }
}

</style>
