<template>
    <section>
        <!-- 基本信息 -->
        <h4>基本信息</h4>
        <div class="form information">
            <ul class="form_item">
                <li>
                    <span class="title">登录账户:</span>
                    <span>{{mobile}}</span>
                </li>
                <li>
                    <span class="title">联系人姓名:</span>
                    <input type="text" placeholder="请输入联系人姓名" v-model="params.realname">
                </li>
                <li>
                    <span class="title">联系电话:</span>
                    <input type="text" placeholder="请输入联系电话" v-model="params.mobile">
                </li>
                <li>
                    <span class="title">QQ号码:</span>
                    <input type="text" placeholder="请输入QQ号码" v-model="params.qq">
                </li>
                <li>
                    <span class="title">微信号码:</span>
                    <input type="text" placeholder="请输入微信号码" v-model="params.wechat">
                </li>
            </ul>
        </div>
        <h4>企业信息</h4>
        <div class="form">
            <ul class="form_item">
                <li>
                    <span class="title">企业名称:</span>
                    <input type="text" placeholder="请输入企业名称" v-model="params.company_name">
                </li>
                <li>
                    <span class="title">企业地址:</span>
                    <div class="address_wrap">
                        <div class="select_wrap">
                            <select class="province" v-model="params.company_province" @change="selectProvince">
                                <option v-for="(item, index) in province" :value="item.id" :key="index">{{item.title}}</option>
                            </select>
                            <select class="city" v-model="params.company_city">
                                <option v-for="(item, index) in region" :value="item.id" :key="index">{{item.title}}</option>
                            </select>
                        </div>
                        <input class="address" type="text" placeholder="请输入公司详细地址" v-model="params.company_address">
                    </div>
                </li>
                <li>
                    <span class="title">官方地址:</span>
                    <input type="text" placeholder="请输入官方地址" v-model="params.website">
                </li>
                <li>
                    <span class="title">官微地址:</span>
                    <input type="text" placeholder="请输入官微地址" v-model="params.wechat_web"> 
                </li>
                <li>
                    <span class="title">公司简介:</span>
                    <input type="text" placeholder="请输入公司简介" v-model="params.comment">
                </li>
                <li>
                    <span class="title"></span>
                    <a href="javascript:;" class="sure_btn" @click="changeInfo">确定</a>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    import {getRegion, updateInfo, getPersonalInfo} from '~/libs/api';
    import Cookies from 'js-cookie';
    export default {
        data(){
            return{
                province: [],       //省
                region: [],         //地区
                params: {},
                mobile: '',
            }
        },
        created() {
            this.initRegion();
        },
        mounted() {
            this.initRegion(this.params.company_province);
            this.mobile = Cookies.get('YXB_MOBILE') || '';
        },
        asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
            return getPersonalInfo().then(res => {
                    if(res.code == 200){
                        return {params: Object.assign(res.data.personal, res.data.company)}
                    }
                })
        },
        methods:{
            //加载地区
            initRegion(id){
                getRegion({pid: id}).then(res =>{
                    if(res.code == 200){
                        if(id){
                            this.region = res.data;
                        }else{
                            this.province= res.data;
                        }
                    }else{
                        this.$message.error(res.message);
                    }
                })
            },
            
            //选择省
            selectProvince(){
                this.initRegion(this.params.company_province);
                this.params.company_city = '';
            },

            //修改个人信息
            changeInfo(){
                updateInfo(this.params).then(res => {
                    if(res.code == 200){
                        this.$message.success(res.message);
                    }else{
                        this.$message.error(res.message);
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    h4{
        font-size:16px;
        padding:34px 0 15px 0;
        margin-left:20px;
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
</style>
