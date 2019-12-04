<template>
    <section>
        <h4>修改手机号</h4>
        <div class="form">
            <ul class="form_item">
                <li>
                    <span class="title">当前手机号:</span>
                    <span>{{mobile}}</span>
                </li>
                <li class="code">
                    <span class="title">验证码:</span>
                    <input type="text" placeholder="请输入验证码" :class="!verification.code?'':'borderColor'" v-model="params.code">
                    <div class="right-code verification"><img :src="codeImg" @click="generateCode"></div>
                </li>
                <li>
                    <span class="title">新手机号:</span>
                    <input type="text" placeholder="请输入新手机号" :class="!verification.mobile?'':'borderColor'" v-model="params.mobile">
                </li>
                <li class="code">
                    <span class="title">短信验证码:</span>
                    <input type="text" placeholder="请输入短信验证码" :class="!verification.sms_code?'':'borderColor'" v-model="params.sms_code">
                    <div class="right-code send_code" :class="codeTitle=='获取验证码'?'':'send_ing'" @click="sendCode">{{codeTitle}}</div>
                </li>
                <li>
                    <span class="title"></span>
                    <a href="javascript:;" class="sure_btn" @click="updatedTelBtn">{{btnText}}</a>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    import md5 from 'js-md5';
    import {updatedTelSendCode, updatedTel} from '~/libs/api';
    import Cookies from 'js-cookie';
    export default {
        data(){
            return {
                codeImg: '',
                codeTitle: '获取验证码',
                params: {},
                btnText: '确定',
                verification: {},
                mobile: '',
            }
        },
        mounted() {
            this.generateCode();
            this.mobile = Cookies.get('YXB_MOBILE') || '';
        },
        methods:{
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
                this.codeImg = `http://admin.yingxiaobao.org.cn/api/v1/member/info/alter-mobile-captcha?time=${time}&sign=${sign}&random=${this.random}`;
            },

             //发送验证码
            sendCode(){
                if(this.codeTitle !== "获取验证码") return false;
                if(!this.params.code){
                    this.$message.error('请输入图形验证码');
                    this.verification = {code: true};
                    return 
                }else if(!this.params.mobile){
                    this.$message.error('请输入手机号');
                    this.verification = {mobile: true};
                    return 
                }
                this.verification = {};
                var data = {
                    mobile: this.params.mobile,
                    code: this.params.code,
                    random: this.random
                }
                updatedTelSendCode(data).then(res => {
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

            //修改手机号
            updatedTelBtn(){
                this.btnText = '提交中...';
                if(!this.params.code){
                    this.$message.error('请输入图形验证码');
                    this.verification = {code: true};
                    return
                }else if(!this.params.mobile){
                    this.$message.error('请输入新手机号');
                    this.verification = {mobile: true};
                    return
                }else if(!this.params.sms_code){
                    this.$message.error('请输入手机验证码');
                    this.verification = {sms_code: true};
                    return
                }
                this.verification = {};
                this.params.random = this.random;
                updatedTel(this.params).then(res => {
                    if(res.code == 200){
                        this.$message.success(res.message);
                        this.params = {};
                    }else{
                        this.$message.error(res.message);
                    }
                })
            }
        }
    }
</script>
<style lang="less">
    .form .form_item li.code{
        input{
            width:382px !important;
            display: inline-block;
        }
        .right-code{
            display: inline-block;
            width:120px;
            height:38px;
            line-height: 38px;
            margin-left:10px;
            vertical-align: middle;
            &.verification{
                border:1px solid @borderColor;
                img{
                    width:118px;
                    height:36px;
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
</style>
