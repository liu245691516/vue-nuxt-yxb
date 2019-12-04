<template>
    <div class="_center">
        <div class="breadcrumb">
            当前位置:
            <a href="/">首页</a><span>&gt;</span>
            <a href="javascript:;">发布需求</a>
        </div>
        <div class="box">
            <div class="title">
                <h3>发布需求</h3>
                <p class="desc">一站式操作简单快捷</p>
            </div>
            <div class="form">
                <div class="form_item clearfix">
                    <span class="name"><i>*</i>选择服务</span>
                    <div class="select_wrap">
                        <select class="categorys" v-model="currentColumns" @change="selectColumns">
                            <option v-for="(item, index) in columnsData" :value="index" :key="index">{{item.title}}</option>
                        </select>
                        <select class="categorys" v-model="demandParams.cate_id">
                            <option v-for="(item, index) in children" :value="item.id" :key="index">{{item.title}}</option>
                        </select>
                    </div>
                </div>
                <div class="form_item clearfix">
                    <span class="name">补充消息</span>
                    <textarea v-model="demandParams.remarks" placeholder="请填写您的需求"></textarea>
                </div>
                <p class="desc">请留下您的联系方式，以便我们能及时联系到您</p>
                <div class="form_item clearfix">
                    <span class="name">联系人</span>
                    <input type="text" v-model="demandParams.name" placeholder="请输入您的姓名">
                </div>
                <div class="form_item clearfix">
                    <span class="name">联系电话</span>
                    <input type="text" v-model="demandParams.mobile" placeholder="请输入您的联系电话">
                </div>
                <div class="form_item">
                    <a href="javascript:;" class="publish" @click="puplish">立即发布</a>
                </div>
            </div>
        </div>
        <login-box ref="loginModal"></login-box>
    </div>
</template>
<script>
import {postDemand, getColumns} from '~/libs/api';
import {mapState} from 'vuex';
import Cookies from 'js-cookie';
import loginBox from '~/components/login/login'; 
export default {
    layout: 'goods',
    data(){
        return {
            children: [],
            currentColumns: '',    //选中的栏目
            demandParams: {},
        }
    },
    computed: {
        ...mapState({
            columnsData: state => state.columnsData
        })
    },
    methods: {
        //选择栏目
        selectColumns(){
            this.children = this.columnsData[this.currentColumns].children;
        },

        //发布需求 - 选择栏目
        mouseenterColumns(index){
            this.serviceList = this.columnsData[index].children;
            this.currentIndex = index;
            this.currentService = -1;
        },

        //发布需求
        puplish(){
            if(!Cookies.get('access_token')){
                this.$refs.loginModal.showLoginBox();
                return
            }
            if(!this.demandParams.cate_id){
                this.$message.error('请选择您要的服务');
                return
            }else if(!this.demandParams.remarks){
                this.$message.error('请填写补充信息');
                return
            }else if(!this.demandParams.mobile){
                this.$message.error('请填写您的手机号');
                return
            }else if(!this.demandParams.name){
                this.$message.error('请填写您的名称');
                return
            }
            postDemand(this.demandParams).then(res => {
                if(res.code == 200){
                this.$message.success(res.message);
                this.demandParams = {};
                }else{
                this.$message.error(res.message);
                }
            })
        },
    },
    components:{
        loginBox
    }
}
</script>
<style lang="less" scoped>
    .box{
        border:1px solid @borderColor;
        margin-bottom:50px;
        .title{
            border-bottom:1px solid @highlight;
            height:130px;
            text-align: center;
            h3{
                font-size:32px;
                padding-top:45px;
                font-weight: normal;
            }
            .desc{
                padding-top:18px;
            }
        }
    }
    .form{
        width:800px;
        margin:75px auto 40px auto;
        .form_item{
            width:100%;
            margin-bottom:30px;
            span.name{
                display: inline-block;
                width:90px;
                float:left;
                line-height: 48px;
                i{
                    font-style: normal;
                    color:red;
                    margin-right:5px;
                }
            }
            .select_wrap{
                float: left;
                .categorys{
                    width:240px;
                    height:48px;
                    border:1px solid @borderColor;
                    margin-right:20px;
                    option{
                        line-height: 40px;
                    }
                }
            }
            textarea{
                width:686px;
                height:170px;
                border-color:@borderColor;
                padding:10px;
            }
            input{
                width:686px;
                height:48px;
                border:1px solid @borderColor;
                padding:10px;
            }
        }
        .desc{
            font-size:16px;
            padding:10px 0 40px 0;
        }
        .publish{
            width:340px;
            height:42px;
            display: block;
            text-align: center;
            line-height: 42px;
            color:#fff;
            font-size:16px;
            border-radius: 4px;
            margin:0 auto;
            background:@highlight;
        }
    }
</style>
