<template>
    <div class="commit_wrap">
        {{resData}}
        <h4 class="title"><span class="iconfont">&#xe603;</span>您的订单已支付成功</h4>
        <div class="order_wrap">
            <div class="desc">共[<span>1</span>]个商品，总价：<span>1900.00</span></div>
            <ul>
                <li class="tab_head">
                    <ol class="clearfix">
                        <li class="info">产品信息</li>
                        <li class="shux">产品属性</li>
                        <li class="price">单价（元）</li>
                        <li class="count">数量</li>
                        <li class="money">支付(元)</li>
                    </ol>
                </li>
                <li class="order_list">
                    <ol class="clearfix">
                        <li class="info">
                            <img src="../../../assets/image/pro_img.png">
                            <div class="text">商品信息标题描述文字商品...</div>
                        </li>
                        <li class="shux">产品属性</li>
                        <li class="price">12000.00</li>
                        <li class="count">1</li>
                        <li class="money">12000.00</li>
                    </ol>
                </li>
            </ul>
        </div>
        <h4 class="title"><span class="iconfont">&#xe68f;</span>订单需求
            <span class="notes">（温馨提示：请根据分类认真填写您的联系方式和订单需求，以便我们更好的执行）</span>
        </h4>
        <div class="oreder_demand">
            <ul class="relation">
                <li>
                    <span><i>*</i>联系人
                    </span><input type="text" placeholder="请输入您的姓名" :class="!verification.username?'':'borderColor'" ref="username" v-model="params.username"> 
                </li>
                <li>
                    <span><i>*</i>联系方式
                    </span><input type="text" placeholder="请输入您的联系方式" :class="!verification.mobile?'':'borderColor'" ref="mobile" v-model="params.mobile">
                </li>
                <li>
                    <span><i>*</i>微信号码
                    </span><input type="text" placeholder="请输入您的微信号码" :class="!verification.wechat?'':'borderColor'" ref="wechat" v-model="params.wechat">
                </li>
            </ul>
            <div class="other">
                <p class="desc_item"><span>添加附件信息</span>（格式支持：zip、rar、doc、docx、xlsx、ppt、pdf、txt、图片等格式）</p>
                <div class="other_info">
                    <div class="desc_item text clearfix">
                        选中0个文件，共0B
                        <div class="select_file">
                            <a href="javascript:;">选择文件</a>
                            <input type="file" name="file" accept=".jpg,.jpeg,.png,.gif" @change="uploadFile($event, 'img')">
                        </div>
                    </div>
                    <ul class="file_wrap clearfix">
                        <li class="image_list" v-for="(item, index) in imgs" :key="index">
                            <i class="iconfont" @click="delImg(index)">&#xe692;</i>
                            <img :src="item">
                        </li>
                        <li class="upload_image upload">
                            <input type="file" name="file" accept=".jpg,.jpeg,.png,.gif" @change="uploadFile($event, 'img')">
                            <span class="iconfont">&#xe60a;</span>
                        </li>
                    </ul>
                    <div class="desc_item text clearfix">
                        选中0个文件，共0B
                        <div class="select_file">
                            <a href="javascript:;">选择文件</a>
                            <input type="file" name="file" accept=".zip,.rar,.doc,.docx,.xlsx,.ppt,.pdf,.txt" @change="uploadFile($event, 'file')">
                        </div>
                    </div>
                    <ul class="file_wrap clearfix">
                        <li class="image_list file_list">
                            <i class="iconfont">&#xe692;</i>
                            <span class="iconfont">&#xe6e0;</span>
                            <p class="file_name">文件名.zip</p>
                        </li>
                        <li class="upload_file upload">
                            <input type="file" name="file" accept=".jpg,.jpeg,.png,.gif" @change="uploadFile($event, 'file')">
                            <span class="iconfont">&#xe678;</span>
                        </li>
                    </ul>
                    <div class="desc_item text clearfix">
                        您的订单需求
                    </div>
                    <textarea class="textarea" placeholder="在这里输入您的订单要求和说明，客服电话：010-57433574"></textarea>
                </div>
            </div>
            <div class="submit_info">
                <a href="javascript:;" class="submit_btn" @click="submitBtn">{{btnText}}</a>
            </div>
        </div>
    </div>
</template>
<script>
import {getCartList} from '~/libs/api';
export default {
    head() {
        return {
            title: '叮咚营销宝 - 提交信息',
        }
    },
    data(){
        return{
            params: {},
            verification: {},
            imgs: ['http://admin.yingxiaobao.org.cn:80/attachment/images/2019/04/11/image_155494661297102995.jpg', 'http://admin.yingxiaobao.org.cn:80/attachment/images/2019/04/04/image_155436632699979797.jpg'],
            btnText: '提交信息', 
            resData: '',
        }
    },
    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        return getCartList().then(res => {
            return {resData: res}
        })
    },
    methods:{
        uploadFile(file, type) {
            console.log(file.path[0].files[0], type)
            if (file) {
                if (file.size > 10 * 1024 * 1024){
                    this.$message.error("上传文件太大，超过10M")
                    return;
                }
                let xhr = new XMLHttpRequest();
                let fd = new FormData();
                let _this = this;
                fd.append('file', file);
                fd.append('token', '023700586201488a2175676d82f8d218');
                fd.append('uuid', '14072597');
                fd.append('time', '1555333966');

                xhr.upload.addEventListener('progress', function(){ _this.uploadImgProgress(event) }, false);
                xhr.addEventListener('load', function(){ _this.uploadImgComplete(event, type) }, false);
                xhr.addEventListener('error', function(){ _this.uploadImgFailed(event) }, false);
                xhr.addEventListener('abort', function(){ _this.uploadImgCanceled(event) }, false);
                xhr.open('POST', 'http://api.meijiebao.org.cn/image/uploadWord');
                xhr.send(fd);
                xhr.getAllResponseHeaders()
            }
        },

        //上传中
        uploadImgProgress(e) {
            // console.log(e)
        },

        uploadImgComplete(event, type) {
            console.log(event, type)
            // var res = e.target.response;
            // var data = JSON.parse(res);
            // console.log(data)
            // if (data.code == 0) {
                
            // } else {
            //     alert(data.msg);
            // }
        },
        uploadImgFailed(e) {
            this.$message.error('文件上传失败');
        },
        uploadImgCanceled (e) {
            this.$message.error('文件上传被取消');
        },

        //删除图片
        delImg(index){
            this.imgs.splice(index, 1);
        },

        //提交
        submitBtn(){
            if(this.btnText != '提交信息'){
                return
            }
            if(!this.params.username){
                this.verification = {username: true};
                this.$message.error('请输入您的姓名');
                this.$refs.username.focus();
                return
            }else if(!this.params.mobile){
                this.verification = {mobile: true};
                this.$message.error('请输入您的联系方式');
                this.$refs.mobile.focus();
                return
            }else if(!this.params.wechat){
                this.verification = {wechat: true};
                this.$message.error('请输入您的微信号码');
                this.$refs.wechat.focus();
                return
            }
            this.verification = {};
            this.btnText = '提交中...';
            setTimeout(() => {
                this.btnText = '提交信息';
            }, 1000);
        }
    }
}
</script>
<style lang="less" scoped>
.commit_wrap{
    margin-bottom:60px;
    h4.title{
        padding-bottom:17px;
        font-size:18px;
        line-height: 30px;
        .iconfont{
            font-size:30px;
            color:@highlight;
            margin-right:15px;
            float:left;
            font-weight: 500;
        }
        .notes{
            font-size:12px;
            color:#666;
            font-weight: 500;
        }
    }
    .order_wrap{
        margin-bottom:25px;
        border:1px solid @borderColor;
        .desc{
            font-size:12px;
            padding-left:50px;
            height:50px;
            line-height: 50px;
            border-bottom:1px solid @borderColor;
            span{
                color:@highlight;
                font-weight: bold;
            }
        }
        ul>li{
            padding-left:50px;
            ol{
                li{
                    float:left;
                    width:205px;
                    text-align: center;
                    &.info{
                        width:325px;
                        text-align: left;
                    }
                }
            }
            &.tab_head{
                line-height: 45px;
                background:#f9f9f9;
            }
            &.order_list{
                padding:10px 0;
                padding-left:50px;
                line-height: 40px;
                border-bottom:1px dashed @borderColor;
                &:last-child{
                    border:none;
                }
                .info{
                    img{
                        width:40px;
                        height:40px;
                        float: left;
                        margin:0 20px 0 7px;
                    }
                    .text{
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size:16px;
                    }
                }
            }
        }
    }
    .oreder_demand{
        border:1px solid @borderColor;
        .relation{
            padding:30px 45px 3px 45px;
            border-bottom:1px dashed @borderColor;
            li{
                height:78px;
                span{
                    display: inline-block;
                    width:97px;
                    line-height: 48px;
                    margin-right:15px;
                    text-align: right;
                    i{
                        font-style: normal;
                        color:red;
                        margin-right:8px;
                        vertical-align: middle;
                    }
                }
                input{
                    width:995px;
                    height:48px;
                    border:1px solid @borderColor;
                    background:#f9f9f9;
                    display: inline-block;
                    padding:0 10px;
                    &.borderColor{
                        border-color:red;
                    }
                }
            }
        }
    }
    .other{
        padding:0 20px 20px 20px;
        border-bottom:1px dashed @borderColor;
        .desc_item{
            line-height: 50px;
            span{
                color:@highlight;
            }
        }
        .other_info{
            border:1px solid @borderColor;
            .text{
                padding:0 10px;
                color:#666;
                border-bottom:1px solid @borderColor;
            }
            .select_file{
                float: right;
                width:94px;
                height:34px;
                position: relative;
                cursor: pointer;
                input{
                    width:94px;
                    height:34px;
                    opacity: 0;
                    position: absolute;
                    top:0;
                    cursor: pointer;
                }
                a{
                    width:94px;
                    height:34px;
                    line-height: 34px;
                    text-align: center;
                    display: inline-block;
                    color:#666;
                    border:1px solid @borderColor;
                    border-radius: 4px;
                }
                &:hover a{
                    color:@highlight;
                    border-color: @highlight;
                }
            }
            .file_wrap{
                padding:15px 5px 0 15px;
                border-bottom:20px solid #f9f9f9;
                li{
                    float: left;
                    width:120px;
                    height:120px;
                    border:1px dashed @borderColor;
                    text-align: center;
                    margin:0 10px 10px 0;
                    position: relative;
                    &.upload{
                        input{
                            width:120px;
                            height:120px;
                            position: absolute;
                            top:0;
                            left:0;
                            opacity: 0;
                        }
                    }
                    &.image_list{
                        i.iconfont{
                            position: absolute;
                            font-size:18px;
                            color:#515151;
                            top:-9px;
                            right:-9px;
                            line-height: 1;
                            cursor: pointer;
                            display: none;
                        }
                        &:hover i.iconfont{
                            display: inline-block;
                        }
                        img{
                            width:100%;
                            height:100%;
                        }
                    }
                    span.iconfont{
                        font-size:46px;
                        color:@borderColor;
                        line-height: 120px;
                    }
                    &.file_list{
                        span{
                            color:#f5a623;
                            line-height: 86px;
                        }
                        p.file_name{
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                    &.upload_file{
                        transform:rotateY(180deg);
                        span{
                            font-size:60px;
                        }
                    }
                }
            }
            .textarea{
                height:146px;
                width:100%;
                padding:20px 10px;
                color:#999;
                line-height: 24px;
                border:none;
            }
        }
    }
    .submit_info{
        height:105px;
        .submit_btn{
            display:block;
            width:340px;
            height:45px;
            background:@highlight;
            color:#fff;
            line-height: 45px;
            text-align: center;
            border-radius: 4px;
            font-size:16px;
            margin:30px auto 0;
        }
    }
}

</style>
