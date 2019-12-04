<template>
    <div>
        <div class="content">
            <div class="_center">
                <div class="register">
                    <h2>找回密码</h2>
                    <div class="form-item">
                        <div class="item-input clearfix" :class="!verification.tel?'':'borderColor'">
                            <i class="iconfont">&#xe62b;</i>
                            <input type="text" v-model="params.mobile" placeholder="请输入您的手机号码" ref="mobile">
                        </div>
                    </div>
                    <div class="form-item">
                        <div class="code item-input clearfix" :class="!verification.sms_code?'':'borderColor'">
                            <i class="iconfont">&#xe64f;</i>
                            <input type="text" v-model="params.sms_code" placeholder="请输入短信验证码" ref="sms_code">
                        </div><div class="right-code send_code" :class="codeTitle=='获取验证码'?'':'send_ing'" @click="sendCode">{{codeTitle}}</div>
                    </div>
                    <div class="form-item">
                        <div class="item-input clearfix" :class="!verification.pw?'':'borderColor'">
                            <i class="iconfont">&#xe621;</i>
                            <input type="password" v-model="params.password" placeholder="请输入新密码" ref="password">
                        </div>
                    </div>
                    <div class="hint">
                        <nuxt-link to="/account/login" class="cancel">取消</nuxt-link>
                        <a href="javascript:;" class="sure" @click="sure">{{loadingText}}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {retrievePassword, retrievePasswordCode} from '~/libs/api';
    let reg=/^[1][0-9]{10}$/;  
    export default {
        layout: 'login',
        data(){
            return{
                codeTitle: '获取验证码',
                loadingText: '确定',
                params: {},
                verification: {},
            }
        },
        head() {
            return {
                title: '叮咚营销宝 - 找回密码'
            }
        },
        methods:{
            //发送验证码
            sendCode(){
                if(this.codeTitle != '获取验证码') return;
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
                }
                this.verification = {};
                retrievePasswordCode({mobile: this.params.mobile}).then(res => {
                    if(res.code == 200){
                        this.$message.success(res.message);
                        this.countDown();
                    }else{
                        this.$message.error(res.message);
                        this.codeTitle = '获取验证码';
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

            //确定
            sure(){
                if(this.loadingText != '确定') return;
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
                }else if(!this.params.sms_code){
                    this.$message.error('请输入短信验证码');
                    this.verification = {sms_code: true};
                    this.$refs.sms_code.focus();
                    return 
                }else if(!this.params.password){
                    this.$message.error('请输入新密码');
                    this.verification = {pw: true};
                    this.$refs.password.focus();
                    return 
                }
                this.verification = {};
                this.loadingText = '提交中...';
                retrievePassword(this.params).then(res => {
                    this.loadingText = '确定';
                    if(res.code == 200){
                        this.$message.success(res.message);
                        this.$router.push({
                            path: '/account/login'
                        })
                    }else{
                        this.$message.error(res.message);
                    }
                })
            }
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
                    line-height: 20px;
                }
                .form-item{
                    padding-top:25px;
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
                        &.send_code{
                            color:#fff;
                            background:@highlight;
                            text-align: center;
                            cursor: pointer;
                            vertical-align: middle;
                            &.send_ing{
                                color:#999;
                                background: #fff;
                                border:1px solid @borderColor;
                            }
                        }
                    }
                }
                .hint{
                    padding-top:50px;
                    display:flex;
                    justify-content: space-around;
                    a{
                        display: inline-block;
                        width:160px;
                        height:54px;
                        line-height: 54px;
                        text-align: center;
                        font-size:18px;
                        &.cancel{
                            color:#666;
                            border:1px solid @borderColor;
                        }
                        &.sure{
                            color:#fff;
                            background:@highlight;
                        }
                    }
                }
            }
        }
    }
</style>
