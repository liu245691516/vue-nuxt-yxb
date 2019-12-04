<template>
    <div class="order_status">
        <div class="order_desc clearfix">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icongou"></use>
            </svg>
            <div class="desc">
                <div class="title">您的订单支付信息及业务需求我们已经收到。我们正在积极确认执行订单，请耐心等待！</div>
                <div class="hint">提示:</div>
                <p>1、我们在执行过程中有可能遇到素材问题需要沟通，请认准来电：010-57433574</p>
                <p>2、订单的状态完成后我们会以电话或者微信信息的形式通知您。</p>
            </div>
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
            font-size:18px;
            margin-bottom:25px;
        }
        .hint{
            font-size:16px;
            padding-bottom:5px;
        }
        p{
            line-height:25px;
            text-indent: 36px;
        };
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
