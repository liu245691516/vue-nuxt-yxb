<template>
    <section>
        <h4>发票抬头<span class="explain">发票规则</span></h4>
        <div class="invoice_wrap">
            <div class="tabs">
                <a href="javascript:;" :class="currentIndex==0?'current':''" @click="selectTab(0)">普票抬头<span class="iconfont">&#xe843;</span></a>
                <a href="javascript:;" :class="currentIndex==1?'current':''" @click="selectTab(1)">增票资质<span class="iconfont">&#xe843;</span></a> 
            </div>
            <ul class="invoice clearfix">
                <li>
                    
                </li>
            </ul>
        </div>
        <confirm @deleteBtn='deleteinvoice' ref="confirm"></confirm>
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
            delinvoice(){
                this.$refs.confirm.showModal({
                    title: '确定要删除该优惠券吗?',
                    content: '删除后的优惠券将不可恢复，请谨慎操作'
                });
            },

            //确定删除优惠券
            deleteinvoice(){

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
    .invoice_wrap{
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
        .invoice{
            li{
               width:299px;
               height:240px;
               background:#f9f9f9;
               border:1px solid @borderColor;
               margin:20px 0 0 20px;
               padding:15px;
            }
        }
    }
</style>
