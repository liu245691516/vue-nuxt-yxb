<template>
    <div class="article_details _center clearfix">
        <div class="_left">
            <div class="breadcrumb">
                当前位置:
                <nuxt-link to="/">首页</nuxt-link><span>&gt;</span>
                <nuxt-link to="/article">营销学院</nuxt-link><span>&gt;</span>
                <span>{{articleData.title}}</span>
            </div>
            <div class="art_head">
                <h3>{{articleData.title}}</h3>
                <ul class="clearfix">
                    <li v-if="articleData.author"><i class="iconfont user">&#xe613;</i>{{articleData.author}}</li>
                    <li><i class="iconfont date">&#xe713;</i>{{articleData.created_at}}</li>
                    <li><i class="iconfont browse">&#xe679;</i>{{articleData.view}}</li>
                </ul>
            </div>
            <div class="content" v-html="articleData.content"></div>  
            <div class="border_upon ">
                <p v-if="preData">上一篇: <nuxt-link :to="'/article/'+preData.id">{{preData.title}}</nuxt-link></p>
                <p v-if="nextData">下一篇: <nuxt-link :to="'/article/'+nextData.id">{{nextData.title}}</nuxt-link></p>
            </div>
            <div class="interested_article">
                <div class="title"><h3>您可能感兴趣的文章</h3></div>
                <ol>
                    <li v-for="(item, index) in interestData" :key="index"><nuxt-link :to="'/article/'+item.id">{{item.title}}</nuxt-link></li>
                </ol>
            </div>
        </div>
        <div class="_right">
            <div class="other_article">
                <div class="title">
                    <h3>相关文章</h3>
                    <nuxt-link to="/article" class="more">更多&gt;&gt;</nuxt-link>
                </div>
                <ol>
                    <li v-for="(item, index) in sameData" :key="index"><nuxt-link :to="'/article/'+item.id" :title="item.title">{{item.title}}</nuxt-link></li>
                </ol>
            </div>
        </div>
    </div>
</template>
<script>
import {getArticleDetails} from '~/libs/api';
export default {
    layout: 'goods',
    data(){
        return{
            articleData: {},   //文章详情
            sameData: [],      //相关文章
            interestData: [],  //感兴趣的文章
            preData: {},       //上一篇
            nextData: {},      //下一篇
        }
    },
    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        return getArticleDetails({id: params.details.split('.html')[0]}).then(res => {
            if(res.code == 200){
                return {
                    articleData: res.data.article,
                    sameData: res.data.same,
                    interestData: res.data.interest,
                    preData: res.data.pre,
                    nextData: res.data.next,
                }
            }
        })
    },
}
</script>
<style lang="less" scoped>
    .article_details{
        padding-bottom:40px;
        li{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        ._left{
            width:880px;
            float:left;
            .art_head{
                margin-top:52px;
                h3{
                    font-size:24px;
                    color:#000;
                    padding-bottom:33px;
                }
                ul{
                    padding-bottom:12px;
                    color:#a3a3a3;
                    li{
                        float:left;
                        width:136px;
                        .iconfont{
                            margin-right:5px;
                        }
                    }
                }
            }
            .content{
                line-height: 2;
                padding:42px 0;
                border-top:1px dashed @borderColor;
                border-bottom:1px dashed @borderColor;
            }
            .border_upon{
                padding:24px 0 42px 0;
                border-bottom:1px solid @borderColor;
                p{
                    font-size: 16px;
                    line-height: 36px;
                    color:#666;
                    a{
                        color:#666;
                        &:hover{
                            color: @highlight;
                        }
                    }
                }
            }
            .interested_article{
                .title{
                    padding:18px 10px;
                    border-bottom:1px solid @borderColor;
                    h3{
                        font-size:18px;
                        line-height: 25px;
                        padding-left:10px;
                        border-left:2px solid @highlight;
                    }
                }
                ol{
                    display: flex;
                    flex-wrap: wrap;
                    padding:15px 0 20px 20px;
                    li{
                        width:50%;
                        font-size:16px;
                        color:#666;
                        line-height: 40px;
                        padding:0 10px 0 15px;
                        position: relative;
                        &:before {
                            content: "";
                            display: block;
                            width: 5px;
                            height: 5px;
                            border-radius: 50%;
                            background-color: #e9e9e9;
                            position: absolute;
                            top: 18px;
                            left: 0;
                        }
                        &:hover a{
                            color:@highlight;
                        }
                    }
                    li:hover:before{
                        background:@highlight;
                    }
                }
            }
        }
        ._right{
            float: left;
            width:280px;
            margin:60px 0 0 40px;
            .issue{
                width:280px;
                border:1px solid @borderColor;
                background:#f8f8f8;
                h4{
                    height:80px;
                    color:#fff;
                    font-size:20px;
                    line-height: 80px;
                    text-align: center;
                    background:url(../../assets/image/box_bg.png) center no-repeat;
                }
                .content{
                    padding:20px 18px;
                    font-size:12px;
                    .textarea{
                        width:100%;
                        padding:10px;
                        line-height: 18px;
                        height:66px;
                        background:#fff;
                        margin-bottom:15px;
                        border:none;
                        resize: none;
                    }
                    .input{
                        height:36px;
                        background:#fff;
                        margin-bottom:10px;
                        input{
                            padding:0 10px;
                            width:100%;
                            height:36px;
                            &.code{
                                width:146px;
                                float: left;
                            }
                        }
                        a.get_code{
                            color:#1183f7;
                            float:right;
                            margin-right:15px;
                            line-height: 36px;
                        }
                    }
                    a.submit{
                        display: inline-block;
                        width:214px;
                        height:40px;
                        text-align: center;
                        line-height: 40px;
                        background:#ff8e00;
                        color:#fff;
                        font-size: 14px;
                        margin:5px 14px 0;
                    }
                }
            }
            .other_article{
                .title{
                    padding:18px 10px;
                    border-bottom:1px solid @borderColor;
                    h3{
                        font-size:18px;
                        line-height: 25px;
                        padding-left:10px;
                        display: inline-block;
                        border-left:2px solid @highlight;
                    }
                    .more{
                        float:right;
                        color:#666;
                        font-size: 12px;
                        line-height: 25px;
                    }
                }
                ol{
                    padding:15px 20px;
                    li{
                        font-size:16px;
                        color:#666;
                        line-height: 50px;
                        padding-left: 15px;
                        position: relative;
                        &:before {
                            content: "";
                            display: block;
                            width: 5px;
                            height: 5px;
                            border-radius: 50%;
                            background-color: #e9e9e9;
                            position: absolute;
                            top: 23px;
                            left: 0;
                        }
                        a{
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        &:hover a{
                            color:@highlight;
                        }
                    }
                    li:hover:before{
                        background:@highlight;
                    }
                }
            }
        }
    }
    .breadcrumb{
        border-bottom:1px solid @borderColor;
    }
</style>
