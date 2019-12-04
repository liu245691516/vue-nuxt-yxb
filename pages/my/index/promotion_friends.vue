<template>
    <section>
        <h4>推广好友</h4>
        <ul class="tabs">
            <li class="tab_head order_list">
                <ol class="clearfix">
                    <li>账号</li>
                    <li>姓名</li>
                    <li>注册时间</li>
                </ol>
            </li>
            <li class="order_list">
                <ol class="clearfix">
                    <li>18810498554</li>
                    <li>姓名</li>
                    <li>2019-04-01 16:40</li>
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
                width:33.3%;
                text-align: center;
                &.name{
                    width:300px;
                }
            }
        }
    }
</style>
