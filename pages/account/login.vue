<template>
    <div>
        <div class="content">
            <div class="_center">
                <div class="login" @keydown.enter="loginBtn">
                    <h2>欢迎登录
                        <span>没有账号,<nuxt-link to="/account/register">立即注册</nuxt-link></span>
                    </h2>
                    <div class="form-item">
                        <div class="item-input clearfix" :class="!verification.tel?'':'borderColor'">
                            <i class="iconfont">&#xe62b;</i>
                            <input type="text" v-model="params.mobile" autofocus placeholder="请输入您的手机号码" ref="telInput">
                        </div>
                    </div>
                    <div class="form-item" v-if="login_type=='user'">
                        <div class="item-input clearfix" :class="!verification.pw?'':'borderColor'">
                            <i class="iconfont">&#xe621;</i>
                            <input type="password" v-model="params.password" placeholder="请输入您的密码" ref="pwInput">
                        </div>
                    </div>
                    <div class="form-item" v-if="login_type=='code'">
                        <div class="code item-input clearfix" :class="!verification.code?'':'borderColor'">
                            <i class="iconfont">&#xe64f;</i>
                            <input type="text" v-model="params.code" placeholder="请输入短信验证码" ref="code">
                        </div><div class="right-code send_code" :class="codeTitle=='获取验证码'?'':'send_ing'" @click="sendCode">{{codeTitle}}</div>
                    </div>
                    <div class="desc">
                        <i class="checkbox" v-if="!checked" @click="checked=true"></i>
                        <i class="iconfont" v-if="checked" @click="checked=false">&#xe61c;</i>
                        <span class="text">自动登录</span>
                        <nuxt-link to="/account/retrieve_password" class="forget_password"  v-if="login_type=='user'">忘记密码?</nuxt-link>
                    </div>
                    <div class="hint">
                        <a href="javascript:;" class="login_btn" @click="loginBtn">{{loginBtnText}}</a>
                        <a href="javascript:;" class="select_login_type" v-if="login_type=='user'" @click="login_type='code'">短信验证码登录</a>
                        <a href="javascript:;" class="select_login_type" v-if="login_type=='code'" @click="login_type='user'">账户密码登录</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {userLoginApi, codeLoginApi, loginSendCode} from '~/libs/api';
    import Cookies from 'js-cookie';
    let Base64 = require('js-base64').Base64;
    let reg=/^[1][0-9]{10}$/;  
    export default {
        layout: 'login',
        data(){
            return{
                checked: true,            //是否勾选阅读协议
                codeTitle: '获取验证码',
                loginBtnText: '登录',     
                params: {},
                verification: {},
                login_type: 'user',       //登录方式
            }
        },
        head() {
            return {
                title: '叮咚营销宝 - 登录'
            }
        },
        methods:{
            //短信登录 - 发送验证码
            sendCode(){
                if(this.codeTitle != '获取验证码') return
                if(!this.params.mobile){
                    this.$message.error('请输入手机号');
                    this.verification = {tel: true};
                    return
                }else if (!reg.test(this.params.mobile)) {
                    this.$message.error('手机号格式有误');
                    this.verification = {tel: true};
                    return 
                }
                this.verification = {};
                loginSendCode({mobile: this.params.mobile}).then(res => {
                    if(res.code == 200){
                        this.$message.success(res.message);
                        this.countDown();
                    }else{
                        this.$message.error(res.message);
                        this.codeTitle = '获取验证码';
                    }
                })
            },

            //登录
            loginBtn(){
                if(this.loginBtnText != '登录') return
                this.$nextTick(() => {
                    var reg=/^[1][0-9]{10}$/;  
                    if(!this.params.mobile){
                        this.$message.error('请输入手机号');
                        this.verification = {tel: true};
                        this.$refs.telInput.focus();
                        return
                    }else if (!reg.test(this.params.mobile)) {
                        this.$message.error('手机号格式有误');
                        this.verification = {tel: true};
                        this.$refs.telInput.focus();
                        return 
                    }else if(!this.params.code && this.login_type == 'code'){
                        this.$message.error('请输入验证码');
                        this.verification = {code: true};
                        this.$refs.code.focus();
                        return 
                    }else if(!this.params.password && this.login_type == 'user'){
                        this.$message.error('请输入密码');
                        this.verification = {pw: true};
                        this.$refs.pwInput.focus();
                        return 
                    }
                    this.verification = {};
                    this.loginBtnText = '正在登录...';
                    if(this.login_type == 'user'){
                        this.userLogin();
                    }else{
                        this.codeLogin();
                    }
                })
            },

            //账号密码登录
            userLogin(){
                var data = {
                    username: this.params.mobile,
                    password: this.params.password,
                    group: 'pc'
                }
                userLoginApi(data).then(res => {
                    if(res.code == 200){
                        this.loginSuccess(res);
                    }else{
                        this.$message.error(res.message);
                        this.loginBtnText = '登录';
                    }
                })
            },

            //短信验证码登录
            codeLogin(){
                var data = {
                    mobile: this.params.mobile,
                    code: this.params.code,
                    group: 'pc'
                }
                codeLoginApi(data).then(res => {
                    if(res.code == 200){
                        this.loginSuccess(res);
                    }else{
                        this.$message.error(res.message);
                    }
                })
            },

            //登录成功
            loginSuccess(res){
                Cookies.set('access_token', res.data.access_token);
                Cookies.set('YXB_ID', Base64.encode(res.data.member.design_name));
                Cookies.set('YXB_MOBILE', res.data.member.mobile);
                this.$router.push({
                    path: '/'
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
            .login{
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
                    line-height: 20px;
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
                    padding-top:25px;
                    .item-input{
                        height:55px;
                        width:100%;
                        border:1px solid @borderColor;
                        .iconfont{
                            color:#999;
                            font-size:20px;
                            margin-left:15px;
                            line-height: 53px;
                            float: left;
                        }
                        input{
                            width:290px;
                            padding:0 10px;
                            height:53px;
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
                        height:55px;
                        line-height: 55px;
                        margin-left:10px;
                        vertical-align: middle;
                        &.verification{
                            border:1px solid @borderColor;
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
                        color:#999;
                    }
                    a.forget_password{
                        float: right;
                        color:@highlight;
                        font-size:12px;
                    }
                }
                .hint{
                    margin-top:47px;
                    text-align: center;
                    .login_btn{
                        width:100%;
                        display: block;
                        height:45px;
                        line-height: 45px;
                        text-align: center;
                        color:#fff;
                        background:@highlight;
                    }
                    .select_login_type{
                        color:#999999;
                        font-size:14px;
                        margin-top:20px;
                        display: block;
                    }
                }
            }
        }
    }
</style>
