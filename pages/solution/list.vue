<template>
    <div class="solution_wrap">
        <div class="banner">
            <div class="_center">
                <h3>一站式解决方案</h3>
                <p class="desc">多领域数万客户案例，贴合实用的解决方案</p>
            </div>
        </div>
        <div class="tab_nav">
            <ul class="_center">
                <li v-for="(item, index) in columns" :key="index" @click="selectColumns(item.id)" :class="$route.query.cate_id==item.id?'highlight':''">
                    <i :style="{'background':'url('+item.cover_pic+')'}"></i>
                    <span>{{item.title}}</span>
                </li>
            </ul>
        </div>
        <div class="solution_list _center">
            <ul class="clearfix" v-if="resData && resData.length>0">
                <li @click="solutionDetails" v-for="(item, index) in resData" :key="index">
                    <div class="item_box">
                        <div class="info">
                            <img :src="imgShow(item.cover)">
                            <h4 class="title" :title="item.title">{{item.title}}</h4>
                            <div class="desc">{{item.description}}</div>
                        </div>
                        <div class="hint">
                            <a class="collect" href="javascript:;" @click.stop="collect(index)">加入收藏</a>
                            <a href="javascript:;">查看详情</a>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="yxb_no_data" v-else>
                暂无数据~
            </div>
        </div>
        <login-box ref="loginModal"></login-box>
    </div>
</template>
<script>
    import {solutionList, solutionCollect} from '~/libs/api';
    import {defaultImg} from '~/mixins/mixin';
    import {mapState} from 'vuex';
    import Cookies from 'js-cookie';
    import loginBox from '~/components/login/login'; 
    export default {
        mixins:[defaultImg],
        data(){
            return{
                resData: [],
            }
        },
        asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
            return solutionList({cate_id: route.query.cate_id}).then(res => {
                if(res.code == 200){
                    return {resData: res.data.list}
                }
            })
        },
        computed: {
            ...mapState({
                columns: state => state.columnsData,
            })
        },
        methods:{
            solutionDetails(){
                window.open('/solution/wenda');
            },
            
            //选择栏目
            selectColumns(id){
                location.href = `/solution/list?cate_id=${id}`;
            },

            //收藏
            collect(index){
                if(!Cookies.get('access_token')){
                    this.$refs.loginModal.showLoginBox();
                    return 
                }
                solutionCollect({id: this.resData[index].id}).then(res => {
                    if(res.code == 200){
                        this.$message.success(res.message);
                    }else{
                        this.$message.error(res.message);
                    }
                })
            }
        },
        components:{
            loginBox
        }
    }
</script>

<style lang="less" scoped>
    .solution_wrap{
        .banner{
            height:300px;
            width:100%;
            min-width: 1200px;
            background:url(../../assets/image/solution/solution_bg.jpg) no-repeat;
            background-size: cover;
            color:#fff;
            text-indent: 80px;
            h3{
                font-size: 36px;
                padding-top:122px;
            }
            p{
                font-size:16px;
                padding-top:32px;
            }
        }
        .tab_nav{
            width:100%;
            min-width: 1200px;
            background: #f9f9f9;
            height:64px;
            line-height: 64px;
            ul{
                display: flex;
                li{
                    flex: 1;
                    text-align: center;
                    cursor: pointer;
                    i{
                        display: inline-block;
                        width: 24px;
                        height: 24px;
                        vertical-align: middle;
                        margin: -2px 6px 0 0;
                    }
                    &:hover{
                        color:#fff;
                        background:@highlight;
                        & i{
                            background-position: 0 -24px !important;
                        }
                    }
                    &.highlight{
                        color:#fff;
                        background:@highlight;
                        i{
                            background-position: 0 -24px !important;
                        }
                    }
                }
            }
        }
        .solution_list{
            padding:40px 0;
            ul{
                li{
                    float: left;
                    padding:10px;
                    margin-bottom:20px;
                    cursor: pointer;
                    &:hover{
                        border: @highlight;
                    }
                    .item_box{
                        border:1px solid @borderColor;
                        width:280px;
                        height:240px;
                        .info{
                            padding:20px;
                            height:197px;
                            border-bottom:1px solid @borderColor;
                            i.iconfont{
                                font-size:56px;
                                color:#898989;
                            }
                            img{
                                width:52px;
                                height:52px;
                            }
                            h4.title{
                                font-size:16px;
                                color:#000;
                                padding:35px 0 12px 0;
                                font-weight: normal;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            .desc{
                                color:#666;
                                line-height:20px;
                                height:40px;
                                overflow: hidden;
                            }
                        }
                        .hint{
                            display: flex;
                            height:40px;
                            a{
                                flex: 1;
                                text-align: center;
                                line-height:40px;
                                color:#000;
                                &.collect{
                                    border-right:1px solid @borderColor;
                                }
                                &:hover{
                                    color: @highlight;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
