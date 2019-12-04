<template>
    <div class="pay_wrap">
        <div class="sure_order">
            <h3 class="title">确认订单</h3>
            <ul class="order_list" v-loading="loading">
                <li v-for="(item, index) in resData" :key="index">
                    <img class="goods_img" :src="item.cover_pic" @click="goGoodsDetails(item.goods_id)">
                    <div class="info">
                        <p class="desc" @click="goGoodsDetails(item.goods_id)">{{item.name}}</p>
                        <div class="tag">
                            <span>{{item.cate}}</span>
                        </div>
                    </div>
                    <div class="price_count">
                        <p>单价: ￥{{item.price}}</p>
                        <p>数量: {{item.num}}</p>
                    </div>
                    <div class="money">应付金额: <span>￥{{item.total_price}}</span></div>
                </li>
            </ul>
        </div>
        <!-- <div class="use_ticket">
            <h3 class="title" @click="toggleDiscount">使用优惠券
                <span>满2000减100元优惠券</span>
                <a href="javascript:;" class="show_discount" :class="showDiscount?'rotate':''"><i class="iconfont">&#xe600;</i></a>
            </h3>
            <ul class="discount_list" v-if="showDiscount">
                <li class="usable" :class="discountCurrent==1?'checked':''" @click="selectDiscount(1)">    
                    <div class="discount_bg">
                        <p class="limit">
                            <span>￥100</span>
                            满2000
                        </p>
                        <p class="end_date">有效期至2019.03.31</p>
                    </div>
                    <div class="tag">[全品类]</div>
                </li>
                <li class="not_available" :class="discountCurrent==2?'checked':''" @click="selectDiscount(2)">    
                    <div class="discount_bg">
                        <p class="limit">
                            <span>￥100</span>
                            满2000
                        </p>
                        <p class="end_date">有效期至2019.03.31</p>
                    </div>
                    <div class="tag">[全品类]</div>
                </li>
            </ul>
        </div> -->
        <div class="payment">
            <h3 class="title">支付方式</h3>
            <div class="box">
                <div class="pay_type">
                    <a href='javascript:;' v-for="(item, index) in paytype" :key="index" :class="payTypeCurrent==item.key?'checked':''" @click="selectPayType(item.key)">
                        <img v-if="item.key=='0'" src="../../../assets/image/pay_wechat.png">
                        <img v-else-if="item.key=='1'" src="../../../assets/image/pay_ali.png">
                        <img v-else-if="item.key=='2'" src="../../../assets/image/pay_yue.png">
                    </a>
                </div>
                <div class="balance">
                    <span>当前您的账户 ({{user}}) 余额:<span class="money">￥{{balance}}</span></span>
                    <span class="recharge" v-if="balance < orderInfo.pay_price">当前余额不满足您目前的订单金额，请先 <a href="/my/recharge" target="_blank" class="recharge_btn">充值</a> 或选择其他支付方式</span>
                </div>
                <!-- <div class="pay_bank">
                    <div class="tabs">
                        <a :class="bankPayment==1?'current':''" href="javascript:;" @click="selectBankPayment(1)">个人网银支付</a><a :class="bankPayment==2?'current':''" href="javascript:;" @click="selectBankPayment(2)">企业网银支付</a>
                    </div>
                    <ul class="bank_list clearfix" v-if="bankPayment==1">
                        <li :class="currentBank==1?'checked':''" @click="selectBank(1)"><img src="../../../assets/image/bank_gs.png"></li>
                        <li :class="currentBank==2?'checked':''" @click="selectBank(2)"><img src="../../../assets/image/bank_zs.png"></li>
                        <li :class="currentBank==3?'checked':''" @click="selectBank(3)"><img src="../../../assets/image/bank_js.png"></li>
                        <li :class="currentBank==4?'checked':''" @click="selectBank(4)"><img src="../../../assets/image/bank_zz.png"></li>
                    </ul>
                    <ul class="bank_list clearfix" v-if="bankPayment==2">
                        <li :class="currentBank==1?'checked':''" @click="selectBank(1)"><img src="../../../assets/image/bank_zs.png"></li>
                        <li :class="currentBank==2?'checked':''" @click="selectBank(2)"><img src="../../../assets/image/bank_js.png"></li>
                    </ul>
                </div> -->
                <div class="pay_info">
                    <p>1件商品,总商品金额: <span>￥{{orderInfo.total_price}}</span></p>
                    <p>优惠: <span class="discount_price">￥{{orderInfo.discount}}</span></p>
                    <p>应支付金额: <span>￥{{orderInfo.pay_price}}</span></p>
                    <div><a href="javascript:;" class="immediate_pay" @click="pay">{{btnText}}</a></div>
                    <div><nuxt-link to="/cart" class="return">返回修改订单</nuxt-link></div>
                </div>
            </div>
        </div>

        <!-- 微信支付 -->
        <div class="mark" v-if="showQrcode">
            <div class="wechat_pay">
                <a src="javascript:;" class="iconfont close_wechat_pay" @click="colseQrcode">&#xe651;</a>
                <p class="title">微信扫码支付</p>
                <div class="qrcode-img">
                    <img :src="qrcode">
                    <div class="success" v-if="wechatPaySuccess">
                       <svg class="icon iconfont" aria-hidden="true">
                            <use xlink:href="#icongou"></use>
                        </svg>
                    </div>
                </div>
                <a href="javascript:;" class="other_pay_type" @click="colseQrcode">选择其他方式支付</a>
            </div>
        </div>
        <confirm @deleteBtn='deleteCoupon' ref="confirm"></confirm>
    </div>
</template>
<script>
import {orderPayInfo, getPayType, orderPay, orderPayStatus} from '~/libs/api';
import confirm from '~/components/confirm/confirm';
import Cookies from 'js-cookie';
let Base64 = require('js-base64').Base64;
export default {
    head() {
        return {
            title: '叮咚营销宝 - 在线支付',
        }
    },
    data(){
        return{
            resData: [],                      //订单列表
            balance: '',                      //余额
            orderInfo: {
                discount: 0,
                pay_price: 0,
                total_price: 0
            },                  
            showDiscount: false,              //显示优惠券
            discountCurrent:1,                //选中的优惠券
            payTypeCurrent: 0,                //支付方式
            bankPayment: 1,                   //银行支付方式 1 默认个人网银支付
            currentBank: 1,                   //选择银行
            loading: true,                    //加载订单中
            user: '',                         //当前账户
            paytype: [],                      //支付方式
            params: {},                       //参数
            showQrcode: false,                 //显示微信支付二维码
            qrcode: '',                       //微信支付二维码路径
            wechatPaySuccess: false,          //微信支付成功
            order_no: '',                     //订单编号
            btnText: '立即支付',              
            timer: '',
        }
    },
    //加载订单列表
    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        var str = {};
        if(route.query.goods_id){
            try {
                str = {goods: JSON.parse(route.query.goods_id)};
            } catch (error) {
                
            }
        }else{
            try {
                let carts_id = route.query.carts_id.split (',');
                str = {carts_id: carts_id};
            } catch (error) {
                
            }
        }
        return orderPayInfo(str).then(res => {
            if(res.code == 200){
                return {
                    loading: false,
                    resData: res.data.cart,
                    balance: res.data.balance,
                    orderInfo: {
                        discount: res.data.discount,
                        pay_price: res.data.pay_price,
                        total_price: res.data.total_price
                    }
                }
            }else if(res.code == 422){
                redirect('/');
            }
        })
    },
    mounted() {
        if(Cookies.get('YXB_ID')) this.user = Base64.decode(Cookies.get('YXB_ID'));
        if(this.$route.query.goods_id){
            try {
                this.params = {goods: JSON.parse(this.$route.query.goods_id)};
            } catch (error) {
                
            }
        }else{
            try {
                let carts_id = this.$route.query.carts_id.split (',');
                this.params = {carts_id: carts_id};
            } catch (error) {
                
            }
        }
        this.initPayType();
    },
    methods: {
        //加载支付方式
        initPayType(){
            getPayType().then(res => {
                if(res.code == 200){
                    this.paytype = res.data;
                }else{
                    this.$message.error(res.message);
                }
            })
        },

        //关闭二维码支付弹窗
        colseQrcode(){
            this.showQrcode = false;
            clearTimeout(this.timer);
        },

        //立即支付
        pay(){
            this.params.pay_type = this.payTypeCurrent;
            if(this.btnText != '立即支付') return false
            this.btnText = '提交中...';
            orderPay(this.params).then(res => {
                this.btnText = '立即支付';
                if(res.code == 200){
                    this.order_no = res.data.order_no;
                    //微信支付
                    if(this.params.pay_type == 0){
                        this.showQrcode = true;
                        this.qrcode = res.data.qrcode;
                        this.getOrderPayStatus();
                    }else if(this.params.pay_type == 1){
                        //支付宝支付
                        this.alipay(res);
                    }
                }else{
                    this.$message.error(res.message);
                }
            }).catch(res => {
                this.btnText = '立即支付';
                this.$message.error('服务器异常');
            })
        },

        //支付宝支付
        alipay(res){
            window.open(res.data.url);
            this.$refs.confirm.showModal({
                title: '支付提示',
                content: '正在支付中，请根据您支付的情况点击下面按钮',
                btnText: '支付完成'
            });
        },

        //点击了支付完成
        deleteCoupon(){
            this.getOrderPayStatus();
        },

        //订单支付状态
        getOrderPayStatus(){
            clearTimeout(this.timer);
            orderPayStatus({order_no: this.order_no}).then(res => {
                if(res.code == 200){
                    if(res.data.pay_status == 1){
                        this.wechatPaySuccess = true;
                        this.$message.success({
                            message: '支付成功',
                            duration: 1000,
                            onClose: () => {
                                this.wechatPaySuccess = false;
                                this.showQrcode = false;
                                clearTimeout(this.timer);
                                this.$router.push({
                                    path: '/cart/commit_info'
                                })
                            }
                        });
                        
                    }else{
                        //微信
                        if(this.params.pay_type == 0){
                            this.timer = setTimeout(() => {
                                this.getOrderPayStatus();
                            }, 2000);
                        }else if(this.params.pay_type == 1){
                            //支付宝
                            this.$message.error('支付失败');
                        }
                    }
                }else{
                    this.$message.error(res.message);
                }
            })
        },
        
        //显示or隐藏优惠券
        toggleDiscount(){
            this.showDiscount = !this.showDiscount;
        },

        //选择优惠券
        selectDiscount(index){
            this.discountCurrent = index;
        },

        //选择支付方式 (微信 支付宝 余额)
        selectPayType(type){
            this.payTypeCurrent = type;
        },

        //选择银行支付方式 (个人 企业)
        selectBankPayment(type){
            this.bankPayment = type;
        },

        //选择银行
        selectBank(type){
            this.currentBank = type;
        },

        //跳转商品详情页
        goGoodsDetails(id){
            window.open(`/goods_details/${id}.html`);
        }
    },
    components:{
        confirm
    }
}
</script>
<style lang="less" scoped>
.pay_wrap{
    border:1px solid @borderColor;
    margin-bottom:20px;
    h3.title{
        font-size:16px;
        padding:25px 0 15px 0;
        font-weight:500;
        span{
            font-size:14px;
            color:#666;
            margin-left:5px;
        }
        a.show_discount{
            float:right;
            margin-right:5px;
            &.rotate{
                transform: rotate(-90deg);
            }
        }
    }
    .sure_order{
        padding:0 20px;
        border-bottom:20px solid #f9f9f9;
        ul.order_list{
            padding-bottom:5px;
            border-top:1px solid @borderColor;
            min-height: 100px;
            li{
                padding:15px 0;
                display: flex;
                img.goods_img{
                    width:80px;
                    height:80px;
                    display: inline-block;
                    border-radius: 4px;
                    margin-right:25px;
                    cursor: pointer;
                }
                .info{
                    width:320px;
                    margin-right:250px;
                    .desc{
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        padding:15px 0;
                        cursor: pointer;
                        &:hover{
                            color:@highlight;
                        }
                    }
                    .tag>span{
                        height:22px;
                        padding:0 5px;
                        color:#fff;
                        line-height: 22px;
                        background:@highlight;
                        font-size:12px;
                        display: inline-block;
                        border-radius: 4px;
                    }
                }
                .price_count{
                    padding:15px 0;
                    line-height: 25px;
                    width:240px;
                }
                .money{
                    line-height: 80px;
                    font-size:16px;
                    span{
                        color:@highlight;
                        font-weight: bold;
                    }
                }
            }
        }
    }
    .use_ticket{
        padding:0 20px;
        border-bottom:20px solid #f9f9f9;
        ul.discount_list{
            padding-top:24px;
            display: flex;
            flex-wrap: wrap;
            border-top:1px solid @borderColor;
            li{
                width:207px;
                height:102px;
                margin:0 0 20px 20px;
                cursor: pointer;
                .discount_bg{
                    height:69px;
                    background:url(../../../assets/image/discount_usable.png) center no-repeat;
                    color:#fff;
                    padding:15px 22px 0;
                    font-size:12px;
                    p.limit{
                        margin-bottom:10px;
                        span{
                            font-size:24px;
                        }
                    }
                    p.end_date{
                        color:#ceeaf8;
                    }
                }
                .tag{
                    padding:0 20px;
                    line-height: 32px;
                    color:#72c7ec;
                    border:1px solid @borderColor;
                    border-top:none;
                }
                &.checked{
                    .tag{
                        border-color:#72c7ec;
                        background:url(../../../assets/image/checked_pay.png) right bottom no-repeat;
                    }
                }
                &.not_available{
                    .discount_bg{
                        background: url(../../../assets/image/discount_not.png) center no-repeat;
                        p.end_date{
                            color:#afafaf;
                        }
                    }
                    .tag{
                        color:#d1d1d1;
                    }
                }
            }
        }
    }
    .payment{
        padding:0 20px;
        .box{
            padding:0 23px;
        }
        .pay_type{
            padding:10px 0;
            a{
                display: inline-block;
                width:172px;
                height:38px;
                text-align: center;
                border:1px solid @borderColor;
                margin-right:10px;
                &.checked{
                    border-color:#72c7ec;
                    background:url(../../../assets/image/checked_pay.png) right bottom no-repeat;
                }
                img{
                    display: inline-block;
                }
            }
        }
        .balance{
            margin:35px 0 32px 0;
            .money{
                color:@highlight;
                font-size:18px;
            }
            .recharge{
                margin-left:100px;
                .recharge_btn{
                    display: inline-block;
                    width:68px;
                    height:30px;
                    line-height: 30px;
                    text-align: center;
                    background:@highlight;
                    color:#fff;
                    border-radius: 6px;
                    margin:0 5px;
                }
            }
        }
        .pay_bank{
            .tabs{
                border-bottom:1px solid @borderColor;
                a{
                    display: inline-block;
                    width:110px;
                    height:60px;
                    line-height: 60px;
                    margin-right:50px;
                    font-size:16px;
                    color:#666;
                    &.current{
                        font-weight: bold;
                        color:#333;
                        background:url(../../../assets/image/select_bank.png) center bottom no-repeat;
                    }
                }
            }
            .bank_list{
                padding:20px 0 30px 0;
                border-bottom:1px solid @borderColor;
                li{
                    float: left;
                    width:172px;
                    height:38px;
                    margin-right:10px;
                    text-align: center;
                    border:1px solid @borderColor;
                    &.checked{
                        border-color:#72c7ec;
                        background:url(../../../assets/image/checked_pay.png) right bottom no-repeat;
                    }
                    img{
                        display: inline-block;
                    }
                }
            }
        }
        .pay_info{
            padding:20px 0 42px 0;
            text-align: right;
            font-size:16px;
            p{
                line-height: 44px;
                span{
                    display: inline-block;
                    width:210px;
                    text-align: left;
                    color:@highlight;
                    font-weight: bold;
                    font-size:18px;
                    padding-left:80px;
                    &.discount_price{
                        font-weight: 500;
                    }
                }
            }
            a.immediate_pay{
                width:230px;
                height:50px;
                display: inline-block;
                background:@highlight;
                color:#fff;
                font-size:18px;
                text-align: center;
                line-height: 50px;
                border-radius: 6px;
                margin:13px 0;
            }
            a.return{
                width:230px;
                text-align: center;
                display: inline-block;
                color:#666;
            }
        }
    }
    .mark{
        position: fixed;
        width:100%;
        height:100%;
        top:0;
        bottom:0;
        left:0;
        right:0;
        background:rgba(0,0,0,.5);
        z-index: 99;
        .wechat_pay{
            width:356px;
            height:356px;
            background:#fff;
            position: fixed;
            top:50%;
            left:50%;
            margin-top:-178px;
            margin-left:-178px;
            border-radius: 5px;
            padding: 25px 33px 33px;
            .close_wechat_pay{
                position: absolute;
                right:10px;
                top:10px;
                &:hover{
                   text-decoration: underline; 
                }
            }
            .title{
                margin: 0 0 28px;
                font-size: 18px;
                text-align: center;
            }
            .qrcode-img{
                width: 190px;
                height: 190px;
                margin: 0 auto;
                position: relative;
                img{
                    width:190px;
                    height:190px;
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    color: #fff;
                    cursor: pointer;
                    z-index: 99;
                }
                .success{
                    position: absolute;
                    width:100%;
                    height:100%;
                    background: rgba(0,0,0,.5);
                    z-index: 100;
                    text-align: center;
                }
                .iconfont{
                    margin-top:63px;
                    width:64px;
                    height:64px;
                }
            }
            .other_pay_type{
                color:#333;
                margin-top: 20px;
                font-size: 13px;
                text-align: center;
                display: block;
                color:@highlight;
                &:hover{
                   text-decoration: underline; 
                }
            }
        }
    }
}
</style>
