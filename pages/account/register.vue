<template>
    <div>
        <div class="content">
            <div class="_center">
                <div class="register">
                    <h2>注册用户
                        <span>已有账号,<nuxt-link to="/account/login">去登录</nuxt-link></span>
                    </h2>
                    <div class="form-item">
                        <div class="item-input clearfix" :class="!verification.tel?'':'borderColor'">
                            <i class="iconfont">&#xe62b;</i>
                            <input type="text" placeholder="请输入您的手机号码" v-model="params.mobile" ref="mobile">
                        </div>
                    </div>
                    <div class="form-item">
                        <div class="code item-input clearfix" :class="!verification.code?'':'borderColor'">
                            <i class="iconfont">&#xe61f;</i>
                            <input type="text" placeholder="请输入验证码" v-model="params.code" ref="code">
                        </div><div class="right-code verification"><img :src="codeImg" @click="generateCode"></div>
                    </div>
                    <div class="form-item">
                        <div class="code item-input clearfix" :class="!verification.sms_code?'':'borderColor'">
                            <i class="iconfont">&#xe64f;</i>
                            <input type="text" placeholder="请输入短信验证码" v-model="params.sms_code" ref="sms_code">
                        </div><div class="right-code send_code" :class="codeTitle=='获取验证码'?'':'send_ing'" @click="sendCode">{{codeTitle}}</div>
                    </div>
                    <div class="form-item">
                        <div class="item-input clearfix" :class="!verification.pw?'':'borderColor'">
                            <i class="iconfont">&#xe621;</i>
                            <input type="password" placeholder="请输入您的密码" v-model="params.password" ref="password">
                        </div>
                    </div>
                    <div class="desc">
                        <i class="checkbox" v-if="!agreement" @click="agreement=1"></i>
                        <i class="iconfont" v-if="agreement" @click="agreement=0">&#xe61c;</i>
                        <span class="text">我已阅读并接受 <a href="javascript:;">《叮咚营销宝服务协议》</a></span>
                    </div>
                    <a href="javascript:;" class="register_btn" @click="registerBtn">{{textLoading}}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import md5 from 'js-md5';
    import { getCaptchaImg, registerSendCode, register } from '~/libs/api';
    let reg=/^[1][0-9]{10}$/;  
    export default {
        layout: 'login',
        data(){
            return{
                agreement: 1,           //是否勾选阅读协议
                codeTitle: '获取验证码',
                codeImg: '',              //验证码图片
                random: '',               //图形验证码的随机字符串
                params: {},
                verification: {},
                textLoading: '立即注册'
            }
        },
        head() {
            return {
                title: '叮咚营销宝 - 注册'
            }
        },
        created(){
            this.generateCode();
        },
        methods:{
            //发送验证码
            sendCode(){
                if(this.codeTitle !== "获取验证码") return false;
                if(!this.params.mobile){
                    this.$message.error('请输入手机号');
                    this.verification = {tel: true};
                    this.$refs.mobile.focus();
                    return
                }else if (!reg.test(this.params.mobile)) {
                    this.$message.error('手机号格式有误');
                    this.verification = {tel: true};
                    this.$refs.mobile.focus();
                    return 
                }else if(!this.params.code){
                    this.$message.error('请输入图形验证码');
                    this.verification = {code: true};
                    this.$refs.code.focus();
                    return 
                }
                this.verification = {};
                var data = {
                    mobile: this.params.mobile,
                    code: this.params.code,
                    random: this.random
                }
                registerSendCode(data).then(res => {
                    if(res.code == 200){
                        this.$message.success(res.message);
                        this.countDown();
                    }else{
                        this.$message.error(res.message);
                    }
                })
            },

            //验证码 倒计时
            countDown(){
                let num = 60;
                var str = setInterval(() => {
                    num-=1;
                    this.codeTitle = num + 's';
                    if(num == 0){
                        clearInterval(str);
                        this.codeTitle = '获取验证码';
                    }
                }, 1000);
            },

            //生成验证码
            generateCode(){
                let chars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                let res = "";
                for(let i = 0; i < 4 ; i ++) {
                    let id = Math.ceil(Math.random()*26);
                    res += chars[id];
                }
                let time = parseInt(new Date().getTime()/1000);
                let secret = 'N244pPLRqnCZQrGhngrZzcZiH3NJRP4Y';
                let appId = 'DingDong';
                let sign = md5(`appId=${appId}&time=${time}&secret=${secret}`);
                this.random = md5(new Date().getTime()+res);
                this.codeImg = `http://admin.yingxiaobao.org.cn/api/v1/site/register-captcha?time=${time}&sign=${sign}&random=${this.random}`;
            },

            //注册
            registerBtn(){
                if(this.textLoading != '立即注册') retrun
                if(!this.params.mobile){
                    this.$message.error('请输入手机号');
                    this.verification = {tel: true};
                    this.$refs.mobile.focus();
                    return
                }else if (!reg.test(this.params.mobile)) {
                    this.$message.error('手机号格式有误');
                    this.verification = {tel: true};
                    this.$refs.mobile.focus();
                    return 
                }else if(!this.params.code){
                    this.$message.error('请输入图形验证码');
                    this.verification = {code: true};
                    this.$refs.code.focus();
                    return 
                }else if(!this.params.sms_code){
                    this.$message.error('请输入短信验证码');
                    this.verification = {sms_code: true};
                    this.$refs.sms_code.focus();
                    return 
                }else if(!this.params.password){
                    this.$message.error('请输入密码');
                    this.verification = {sms_pw: true};
                    this.$refs.password.focus();
                    return 
                }else if(!this.agreement){
                    this.verification = {};
                    this.$message.error('请勾选已阅读并接受《叮咚营销宝服务协议》');
                    return
                }
                this.verification = {};
                var data = Object.assign(this.params, {random: this.random, agreement: this.agreement});
                this.textLoading = '提交中...';
                register(data).then(res =>{
                    if(res.code == 200){
                        this.$message.success(res.message);
                        this.params = {};
                        this.$router.push({
                            path: '/account/login'
                        })
                    }else{
                        this.$message.error(res.message);
                        this.textLoading = '立即注册';
                    }
                })
            },

        }
    }
</script>
<style lang="less" scoped>
    .content{
        width:100%;
        min-width: 1200px;
        height:600px;
        background:url(../../assets/image/login_bg.png) center no-repeat;
        ._center{
            position: relative;
            .register{
                width:380px;
                background:#fff;
                padding:25px;
                position: absolute;
                right:20px;
                top:88px;
                h2{
                    font-size:20px;
                    color:@highlight;
                    font-weight: normal;
                    line-height: 34px;
                    span{
                        float:right;
                        font-size:12px;
                        color:#999;
                        a{
                            color:@highlight;
                        }
                    }
                }
                .form-item{
                    padding-top:15px;
                    .item-input{
                        height:45px;
                        width:100%;
                        border:1px solid @borderColor;
                        .iconfont{
                            color:#999;
                            font-size:20px;
                            margin-left:15px;
                            line-height: 43px;
                            float: left;
                        }
                        input{
                            width:290px;
                            padding:0 10px;
                            height:43px;
                        }
                        &.code{
                            width:220px;
                            display: inline-block;
                            input{
                                width:180px;
                            }
                        }
                        &.borderColor{
                            border-color:red;
                        }
                    }
                    .right-code{
                        display: inline-block;
                        width:100px;
                        height:45px;
                        line-height: 45px;
                        margin-left:10px;
                        vertical-align: middle;
                        &.verification{
                            border:1px solid @borderColor;
                            img{
                                width:98px;
                                height:43px;
                            }
                        }
                        &.send_code{
                            color:#fff;
                            background:@highlight;
                            text-align: center;
                            cursor: pointer;
                            &.send_ing{
                                color:#999;
                                background: #fff;
                                border:1px solid @borderColor;
                            }
                        }
                    }
                }
                .desc{
                    padding:18px 0;
                    line-height: 14px;
                    .checkbox{
                        display: inline-block;
                        width:14px;
                        height:14px;
                        border:1px solid @borderColor;
                        vertical-align: middle;
                        margin-top: -3px;
                        cursor: pointer;
                    }
                    i.iconfont{
                        color:@highlight;
                        cursor: pointer;
                    }
                    .text{
                        margin-left:8px;
                        font-size:12px;
                        color:#ccc;
                        a{
                            color:@highlight;
                        }
                    }
                }
                .register_btn{
                    width:100%;
                    display: block;
                    height:45px;
                    line-height: 45px;
                    text-align: center;
                    color:#fff;
                    background:@highlight;
                }
            }
        }
    }
</style>
