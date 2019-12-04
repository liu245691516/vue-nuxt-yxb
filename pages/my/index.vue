<template>
    <div class="_center">
        <!-- 个人中心 -->
        <div class="breadcrumb">
            当前位置:
            <nuxt-link to="/">首页</nuxt-link><span>&gt;</span>
            <span>个人中心</span>
        </div>
        <div class="my_info_content clearfix">
            <div class="_left">
                <div class="top_info clearfix">
                    <img class="head_img" src="../../assets/image/pro_img.png">
                    <div class="user">
                        <p>欢迎您,</p>
                        <p>{{user}}</p>
                    </div>
                    <a href="javascript:;" class="login_out" @click="loginOut">安全退出</a>
                </div>
                <div class="progress clearfix">
                    <span class="title">资料完善度:</span>
                    <div class="el_progress">
                        <el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="success"></el-progress>
                    </div>
                </div>
                <div class="level">
                    当前等级: 普通会员
                </div>
            </div>
            <div class="_right">
                <div class="recommend clearfix">
                    <img src="../../assets/image/tuijian.png">
                    <div class="copy_link clearfix">
                        <input type="text" value="http://m.yingxiaobao.cn"><a href="javascript:;" class="copy_btn tag-read" data-clipboard-text="http://m.yingxiaobao.cn" @click="copyBtn">复制链接</a>
                    </div>
                </div>
                <div class="account clearfix">
                    <div class="balance">
                        <p>账户余额: <span>0.00</span>元</p>
                        <p>当前冻结: <span>1.00</span>元</p>
                        <a href="javascript:;" class="charge_btn">在线充值</a>
                    </div>
                    <div class="recommend_bonus">
                        <ul class="clearfix">
                            <li>可提现奖励: <span>0.00</span>元</li>
                            <li class="even">待收奖励: <span>0.00</span>元</li>
                            <li>邀请订单额: <span>0.00</span>元</li>
                            <li class="even">邀请好友数: <span>1</span>人</li>
                        </ul>
                        <div class="hint">
                            <a class="tixian" href="javascript:;">奖金提现</a>
                            <a class="goto_account" href="javascript:;">转可用资金</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="my_info_content clearfix">
            <ul class="menu_left">
                <li class="title"><i class="iconfont">&#xe613;</i>个人中心</li>
                <li :class="path=='/my'?'current':''"><nuxt-link to="/my">基本信息<span class="iconfont">&#xe65f;</span></nuxt-link></li>
                <li :class="path=='/my/pw'?'current':''"><nuxt-link to="/my/pw">修改密码<span class="iconfont">&#xe65f;</span></nuxt-link></li>
                <li :class="path=='/my/tel'?'current':''"><nuxt-link to="/my/tel">修改手机号<span class="iconfont">&#xe65f;</span></nuxt-link></li>
                <li :class="path=='/my/collect_solution'?'current':''"><nuxt-link to="/my/collect_solution">解决方案收藏<span class="iconfont">&#xe65f;</span></nuxt-link></li>
                <li :class="path=='/my/collect_product'?'current':''"><nuxt-link to="/my/collect_product">产品收藏<span class="iconfont">&#xe65f;</span></nuxt-link></li>
                <li :class="path=='/my/coupon'?'current':''"><nuxt-link to="/my/coupon">我的优惠券<span class="iconfont">&#xe65f;</span></nuxt-link></li>
                <li class="title"><i class="iconfont">&#xe62c;</i>财务中心</li>
                <li :class="path=='/my/consume_log'?'current':''"><nuxt-link to="/my/consume_log">消费记录<span class="iconfont">&#xe65f;</span></nuxt-link></li>
                <li :class="path=='/my/recharge'?'current':''"><nuxt-link to="/my/recharge">账户充值<span class="iconfont">&#xe65f;</span></nuxt-link></li>
                <!--<li :class="path=='/my/invoice_title'?'current':''"><nuxt-link to="/my/invoice_title">发票抬头<span class="iconfont">&#xe65f;</span></nuxt-link></li>
                <li><nuxt-link to="/my/invoice_title">开发票<span class="iconfont">&#xe65f;</span></nuxt-link></li>-->
                <li class="title"><i class="iconfont">&#xe616;</i>订单中心</li>
                <li :class="path=='/my/order_log'?'current':''"><nuxt-link to="/my/order_log">订单记录<span class="iconfont">&#xe65f;</span></nuxt-link></li>
                <li class="title"><i class="iconfont">&#xe61b;</i>返利推广</li>
                <li><nuxt-link to="/">推广详情<span class="iconfont">&#xe65f;</span></nuxt-link></li>
                <li :class="path=='/my/promotion_friends'?'current':''"><nuxt-link to="/my/promotion_friends">推广好友<span class="iconfont">&#xe65f;</span></nuxt-link></li>
                <li :class="path=='/my/friends_order'?'current':''"><nuxt-link to="/my/friends_order">好友订单<span class="iconfont">&#xe65f;</span></nuxt-link></li>
                <li :class="path=='/my/money_log'?'current':''"><nuxt-link to="/my/money_log">提现记录<span class="iconfont">&#xe65f;</span></nuxt-link></li>
                <li :class="path=='/my/turn_log'?'current':''"><nuxt-link to="/my/turn_log">转出记录<span class="iconfont">&#xe65f;</span></nuxt-link></li>
            </ul>
            <div class="content_right">
                <nuxt-child />
            </div>
        </div>
    </div>
</template>

<script>
    import Clipboard from 'clipboard';              //拷贝
    import Cookies from 'js-cookie';
    let Base64 = require('js-base64').Base64;
    export default {
        layout: 'goods',
        head() {
            return {
                title: '叮咚营销宝 - 个人中心'
            }
        },
        data(){
            return{
                path: '',
                user: '',
            }
        },
        created(){
            this.path = this.$route.path;
            //登录用户信息
            if(Cookies.get('YXB_ID')) this.user = Base64.decode(Cookies.get('YXB_ID'));
        },
        methods: {
            copyBtn(){
                var clipboard = new Clipboard('.tag-read')
                clipboard.on('success', e => {
                    this.$message.success('复制成功');
                    // 释放内存
                    clipboard.destroy()
                })
                clipboard.on('error', e => {
                    // 不支持复制
                    this.$message.error('该浏览器不支持自动复制');
                    // 释放内存
                    clipboard.destroy()
                })
            },

            //退出登录
            loginOut(){
                Cookies.remove('YXB_ID');
                Cookies.remove('access_token');
                localStorage.clear();
                location.href = "/";
            }
        },
        watch: {
            '$route'(n, o){
                this.path = n.path;
            }
        },
    }
</script>

<style>
    @import 'element-ui/lib/theme-chalk/progress.css';
</style>

<style lang="less">
    .my_info_content{
        width:100%;
        height:240px;
        border:1px solid @borderColor;
        margin-bottom:20px;
        ._left{
            float:left;
            width:398px;
            height:100%;
            padding:29px 25px 0 25px; 
            .top_info{
                padding-bottom:25px;
                .head_img{
                    width:96px;
                    height:96px;
                    border-radius: 50%;
                    float: left;
                }
                .user{
                    float: left;
                    width:182px;
                    color:#000;
                    padding-left:20px;
                    p{
                        padding-top:18px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
                .login_out{
                    float: left;
                    width:66px;
                    height:26px;
                    color:#fff;
                    line-height: 26px;
                    text-align: center;
                    display: inline-block;
                    border-radius: 4px;
                    background:@highlight;
                    margin-top:16px;
                }
            }
            .progress{
                span.title{
                    display:block;
                    float:left;
                    color:#000;
                    padding-right:20px;
                    line-height: 20px;
                }
                .el_progress{
                    float:left;
                    width:252px;
                }
            }
            .level{
                color:@highlight;
                padding-top:20px;
            }
        }
        ._right{
            float: left;
            width:800px;
            border-left:1px solid @borderColor;
            .recommend{
                padding:10px 30px;
                border-bottom:1px solid @borderColor;
                img{
                    padding:2px 20px 0 187px;
                    float: left;
                }
                .copy_link{
                    height:38px;
                    width:322px;
                    border:1px solid @borderColor;
                    border-radius: 4px;
                    float:left;
                    input{
                        width:205px;
                        height:36px;
                        color:#000;
                        display: inline-block;
                        padding-left:10px;
                        float: left;
                    }
                    .copy_btn{
                        width:115px;
                        height:36px;
                        display: inline-block;
                        background: @highlight;
                        color:#fff;
                        line-height: 36px;
                        text-align: center;
                        font-size:16px;
                    }
                }
            }
            .account{
                padding:25px 0 34px 0; 
                .balance{
                    width:326px;
                    height:120px;
                    padding:0 30px;
                    float: left;
                    border-right:1px solid @borderColor;
                    p{
                        color:#000;
                        line-height: 34px;
                        padding-bottom:10px;
                        span{
                            color:@highlight;
                            font-weight: bold;
                            font-size:16px;
                        }
                    }
                    a.charge_btn{
                        display: inline-block;
                        width:76px;
                        height:28px;
                        line-height: 28px;
                        text-align: center;
                        color:#fff;
                        background:@highlight;
                        border-radius: 4px;
                    }
                }
                .recommend_bonus{
                    width:472px;
                    float:left;
                    padding:0 30px;
                    ul{
                        li{
                            float:left;
                            color:#000;
                            line-height: 34px;
                            padding-bottom:10px;
                            width:183px;
                            margin-right:45px;
                            span{
                                color:@highlight;
                                font-weight: bold;
                                font-size:16px;
                            }
                            &.even{
                                margin:0;
                            }
                        }
                    }
                    .hint{
                        a{
                           display: inline-block;
                            height:28px;
                            line-height: 28px;
                            text-align: center;
                            border:1px solid @borderColor;
                            border-radius: 4px; 
                            &.tixian{
                                width:76px;
                                color:#fff;
                                background:@highlight;
                                border-color:@highlight;
                            }
                            &.goto_account{
                                width:92px;
                                color:#000;
                                margin-left:15px;
                            }
                        }
                    }
                }
            }
        }
    }
    .my_info_content{
        margin-bottom:60px;
        border:1px solid @borderColor;
        height: 100%;
        .menu_left{
            min-height: 800px;
            width:240px;
            float:left;
            padding-top:15px;
            li{
                padding:0 20px;
                height:40px;
                line-height: 40px;
                &.title{
                    margin-top:10px;
                    font-size:16px;
                    .iconfont{
                        margin-right:3px;
                        color:@highlight;
                    }
                }
                a{
                    display: block;
                    height:40px;
                    line-height: 40px;
                    color:#666;
                    text-indent: 20px;
                    &:hover{
                        color:#333;
                    }
                    span{
                        float: right;
                        color:#fff;
                    }
                    i.num{
                        font-style: normal;
                        font-size:12px;
                        height:20px;
                        padding:0 6px;
                        color:#fff;
                        background:@highlight;
                        border-radius: 10px;
                        margin-left:5px;
                    }
                }
                &.current{
                    color:#fff;
                    background:@highlight;
                    a{
                        color:#fff;
                    }
                }
            }
        }
        .content_right{
            width:958px;
            float:left;
            min-height: 800px;
            border-left:1px solid @borderColor;
        }
        h4{
            font-size:16px;
            padding:34px 0 15px 0;
            margin:0 20px;
            border-bottom:1px solid @borderColor;
        }
        .form{
            width:100%;
            .form_item{
                width:670px;
                margin:0 auto;
                padding:22px 0 26px 0;
                li{
                    min-height:38px;
                    margin-bottom:24px;
                    color:#666;
                    span{
                        line-height: 38px;
                    }
                    span.title{
                        width:80px;
                        line-height: 38px;
                        display: inline-block;
                        margin-right:29px;
                        vertical-align: top;
                    }
                    input{
                        width:512px;
                        height:38px;
                        border:1px solid @borderColor;
                        padding:0 10px;
                        &.borderColor{
                            border-color:red;
                        }
                    }
                    .address_wrap{
                        display: inline-block;
                        select{
                            width:192px;
                            height:38px;
                            border:1px solid @borderColor;
                            margin:0 20px 24px 0;
                        }
                    }
                    .sure_btn{
                        display: inline-block;
                        width:512px;
                        height:38px;
                        background:@highlight;
                        color:#fff;
                        text-align: center;
                        line-height: 38px;
                    }
                }
            }
            &.information{
                border-bottom:1px solid @borderColor;
            }
        }
    }
</style>

