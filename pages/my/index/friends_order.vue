<template>
    <section>
        <h4>好友订单</h4>
        <ul class="tabs">
            <li class="tab_head order_list">
                <ol class="clearfix">
                    <li>所属</li>
                    <li class="name">媒体名称</li>
                    <li class="time">创建时间</li>
                    <li>订单金额</li>
                    <li>订单状态</li>
                    <li>返利状态</li>
                </ol>
            </li>
            <li class="order_list">
                <ol class="clearfix">
                    <li>二级分类</li>
                    <li class="name">
                        订单名称描述订单名称描述订单名称描述...
                    </li>
                    <li class="time">2019-04-04</li>
                    <li>2000.00</li>
                    <li>执行中</li>
                    <li>待返利</li>
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
    }
    .tabs{
        margin:20px;
        border-top:1px solid @borderColor;
        border-bottom:1px solid @borderColor;
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
                width:119px;
                text-align: center;
                &.name{
                    width:258px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                &.time{
                    width:180px;
                }
            }
        }
    }
</style>
