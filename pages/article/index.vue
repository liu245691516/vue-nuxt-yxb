<template>
    <div class="article _center">
        <div class="top_banner clearfix" v-if="recommendData.length>0">
            <div class="_left">
                <nuxt-link :to="'/article/'+recommendData[0].id"><img :src="recommendData[0].cover"></nuxt-link>
            </div>
            <div class="_right">
                <div class="_r_top">
                    <nuxt-link :to="'/article/'+recommendData[1].id"><img :src="recommendData[1].cover"></nuxt-link><nuxt-link :to="'/article/'+recommendData[2].id"><img :src="recommendData[2].cover"></nuxt-link>
                </div>
                <nuxt-link :to="'/article/'+recommendData[3].id"><img :src="recommendData[3].cover"></nuxt-link>
            </div> 
        </div>
        <ul class="tabs" v-if="classifyArr">
            <li :class="item.id==cate_id? 'checked' : ''" v-for="(item, index) in classifyArr" :key="index" @click="selectTab(item.id)">{{item.title}}</li>
        </ul>
        <div class="clearfix">
            <div class="article_content">
                <ul v-if="resData">
                    <li class="list clearfix" v-for="(item, index) in resData" :key="index">
                        <div class="article_img" @click="articleDetails(item.id)">
                            <img :src="defaultImg(item.cover)">
                        </div>
                        <div class="content">
                            <h4 class="title" @click="articleDetails(item.id)">{{item.title}}</h4>
                            <div class="desc" @click="articleDetails(item.id)">
                                {{item.description}}
                            </div>
                            <div class="hint">
                                <div class="hint_l">
                                    <span class="date"><i></i>{{item.created_at}}</span>
                                    <span class="browse"><i></i>{{item.view}}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="page_wrap page_template" v-if="totalCount">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        prev-text="上一页 "
                        next-text=" 下一页 "
                        :total="totalCount"
                        :current-page="page"
                        @current-change="pageChange">
                    </el-pagination>
                </div>
            </div>
            <!-- 推荐文章 -->
            <div class="recommendArticle">
                <div class="other_article">
                    <div class="title">
                        <h3>推荐文章</h3>
                    </div>
                    <ol>
                        <li v-for="(item, index) in recommendData" :key="index"><nuxt-link :to="'/article/'+item.id">{{item.title}}</nuxt-link></li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getArticleList, getArticleTypeList} from '~/libs/api';
export default {
    layout: 'goods',
    data(){
        return{
            classifyArr: [],    //分类列表
            cate_id: '',        //当前分类
            resData: [],        //文章列表  
            recommendData: [],  //顶部 - 推荐文章
            page: 1,
            totalCount: 0,
        }
    },
    async asyncData ({query}) {
        // getArticleList	     文章列表
        // getArticleTypeList	 文章分类类别
        let [articleList, classify] = await Promise.all([
            getArticleList({cate_id: query.cate_id || '', page: query.page || 1}),
            getArticleTypeList(),
        ])
        return {
            resData: articleList.data.list,
            totalCount: articleList.data.totalCount,
            recommendData: articleList.data.recommend,
            classifyArr: classify.data
        }
    },
    created() {
        this.cate_id = this.$route.query.cate_id || '';
        this.page = Number(this.$route.query.page) || 1;
    },
    methods: {
        selectTab(id){
            this.cate_id = id;
            window.open(`/article?cate_id=${this.cate_id}&page=${this.page}`, '_self');
        },

        //查看文章详情
        articleDetails(id){
            this.$router.push({
                path: `/article/${id}.html`
            })
        },
        
        pageChange(page){
            this.page = page;
            window.open(`/article?cate_id=${this.cate_id}&page=${this.page}`, '_self');
        },

        //默认图片
        defaultImg(url){
            return url= url=='' ? require('../../assets/image/article_default.png') : url;
        }
    },
}
</script>
<style>
    @import 'element-ui/lib/theme-chalk/pagination.css';
    @import 'element-ui/lib/theme-chalk/icon.css';
    .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #fff;
        border:1px solid #ff8e00;
        color: #ff8e00;
    }
</style>

<style lang="less" scoped>
    .top_banner{
        margin:20px 0;
        height: 280px;
        a{
            display: inline-block;
            overflow: hidden;
        }
        img{
            width:100%;
            height: 100%;
            transition: all 2s;
            &:hover{
                transform: scale(1.1);
            }
        }
        ._left{
            float: left;
            width:540px;
            img{
                width:100%;
            }
        }
        ._right{
            width:650px;
            float: left;
            margin-left:10px;
            ._r_top{
                margin-bottom:15px;
                img{
                    width:320px;
                    height:130px;
                    display: inline-block;
                }
                a:last-child{
                    margin-left:10px;
                }
            }
        }
    }
    .tabs{
        display: flex;
        margin:25px 0;
        flex-wrap: wrap;
        border-bottom:1px solid @borderColor;
        li{
           width:116px;
           cursor: pointer;
           height:40px;
           line-height: 40px; 
           font-size:16px;
           color:#999;
           border-radius: 20px;
           text-align: center;
           margin-bottom:10px;
           &.checked{
               background:#f1f1f1;
               color:#333;
           }
           &:hover{
               background:#f1f1f1;
               color:#333;
           }
        }
    }
    .article_content{
        width:880px;
        min-height:50px;
        float: left;
        li.list{
            padding:20px 0;
            border-bottom:1px solid @borderColor;
            &:hover{
                background:#f6f6f6;
            }
            .article_img{
                width:265px;
                height:160px;
                float: left;
                cursor: pointer;
                img{
                    width:100%;
                    height: 100%;
                }
            }
            .content{
                float: left;
                width:560px;
                margin-left:20px;
                h4.title{
                    font-size:20px;
                    padding:16px 0 10px 0;
                    font-weight: 400;
                    cursor: pointer;
                    &:hover{
                        color:@highlight;
                    }
                }
                .desc{
                    color:#999;
                    line-height: 24px;
                    height:48px;
                    overflow: hidden;
                    margin-bottom:25px;
                    cursor: pointer;
                }
                .hint{
                    .hint_l{
                        font-size:12px;
                        color:#999;
                        width:210px;
                        float: left;
                        line-height: 20px;
                        i{
                            display: inline-block;
                            vertical-align: middle;
                            margin:-2px 5px 0 0;
                        }
                        span.date{
                            margin-right:32px;
                            i{
                                width:16px;
                                height:16px;
                                background: url(../../assets/image/date.png) center no-repeat;
                            }
                        }
                        span.browse>i{
                            width:20px;
                            height:15px;
                            background: url(../../assets/image/see.png) center no-repeat;
                        }
                    }
                    .tag{
                        float:left;
                        li{
                            display: inline-block;
                            height:20px;
                            padding:0 10px;
                            line-height: 18px;
                            color:#999;
                            font-size:12px;
                            border-radius: 10px;
                            border:1px solid @borderColor;
                        }
                    }
                }
            }
        }
    }
    .recommendArticle{
        float: left;
        margin-left: 40px;
        width:280px;
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
                width:100%;
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
                    padding:0 10px 0 15px;
                    position: relative;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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
    .page_wrap{
        text-align: center;
        margin:20px 0 40px 0;
    }
</style>
