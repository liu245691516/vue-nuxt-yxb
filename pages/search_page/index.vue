<template>
    <div class="product_wrap">
        <div class="product_box _center">
            <div class="breadcrumb">
                当前位置:
                <a href="/">首页</a><span>&gt;</span>
                <a href="javascript:;">搜索页</a>
            </div>
            <div class="columns">
                <ul class="clearfix">
                    <li :class="currentColumns == index ? 'current' : ''" v-for="(item, index) in columns" :key="index" @click="selectColumns(index)">{{item.title}}({{item.count}})</li>
                </ul>
            </div>
            <!-- 排序 -->
            <div class="filtrate clearfix">
                <ul class="sort">
                   <li :class="sortIndex=='1'?'current':''" @click="comprehensive(),sortIndex=1">综合排序</li> 
                   <li :class="sortIndex=='2'?'current':''" @click="changePubTime('created_at'),sortIndex=2">
                       <span>发布时间</span>
                       <div class="sort_icon">
                           <i class="desc iconfont" :class="params.sort=='ASC'&&params.order=='created_at'?'checked':''">&#xe843;</i>
                           <i class="inverted iconfont" :class="params.sort=='DESC'&&params.order=='created_at'?'checked':''">&#xe601;</i>
                       </div>
                   </li>
                   <li :class="sortIndex=='3'?'current':''" @click="changePrice('price'),sortIndex=3">
                       <span>价格排序</span>
                       <div class="sort_icon">
                           <i class="desc iconfont" :class="params.sort=='ASC'&&params.order=='price'?'checked':''">&#xe843;</i>
                           <i class="inverted iconfont" :class="params.sort=='DESC'&&params.order=='price'?'checked':''">&#xe601;</i>
                       </div>
                   </li>
                </ul>
                <div class="page_wrap">
                    <span class="total_count">共{{totalCount}}个媒介</span>
                    <span><i class="current_index">{{params.page}}</i>/{{Math.ceil(totalCount/10) || 1}}</span>
                    <div class="page_btn">
                        <a href="javascript:;" title="上一页" @click="prevs">&lt;</a><a href="javascript:;" title="下一页" @click="next">&gt;</a>
                    </div>
                </div>
            </div>
            <!-- 商品列表 -->
            <div class="goods_wrap" v-loading="isLoading">
                <div class="goods_list clearfix" v-for="(item, index) in resData" :key="index" @click="seeDetails(item.id)">
                    <div class="goods_img">
                        <img :src="item.cover_pic">
                        <span class="category" :title="item.category">{{item.category}}</span>
                    </div>
                    <div class="content">
                        <div class="desc">{{item.name}}</div>
                        <div class="pirce clearfix">
                            <p class="jiage">价格</p>
                            <p class="money">￥ {{item.price}}</p>
                        </div>
                    </div>
                    <div class="hint">
                        <a href="javascript:;" class="add_cart" @click.stop="addCart(index)">加入购物车</a><a href="javascript:;" class="buy" @click.stop="" onclick="lubankfChatClick()">联系客服</a>
                    </div>
                </div>
                <div class="yxb_no_data" v-if="resData.length==0">
                    暂无数据~
                </div>
            </div>

            <!-- page -->
            <div class="goods_hit_b" ref="hint" v-if="resData.length>0">
                <div class="page_wrap page_template">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        prev-text="上一页 "
                        next-text=" 下一页 "
                        :total="totalCount"
                        :current-page="params.page"
                        @current-change="pageChange">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import {searchGoods, addCart} from '~/libs/api';
export default {
    layout: 'goods',
    data(){
        return{
            sortIndex: 1,         //排序 下标
            totalCount: 0,        //总条数
            currentPage: 1,       //修改分页为第几页
            isLoading: false,     //加载中
            resData: [],          //商品列表
            columns: [],          //栏目分类列表
            params: {
                page: 1,
            },
            currentColumns: -1,    
        }
    },
    async asyncData ({query}) {
        //商品列表   
        let [goodsList] = await Promise.all([
            searchGoods({
                cate_id: query.cate_id,
                keyword: query.keyword
            })
        ])
        return {
            resData: goodsList.data.list,
            totalCount: goodsList.data.totalCount,
            columns: goodsList.data.columns,
            isLoading: false,
        }
    },
    head() {
        return {
            title: `叮咚营销宝 - 搜索页`,
            script: [
                {src: 'https://cdn.lubankf.com/IM/js/lb_service.js?accessId=gnHbJ9-O5Zbi2-qKleWhKcYHh8A-6ee9&autoShow=true'}
            ]
        }
    },
    methods: {
        //商品列表
        goodsList(){
            this.isLoading = true;
            this.params.keyword = this.$route.query.keyword;
            searchGoods(this.params).then(res => {
                this.isLoading = false;
                if(res.code == 200){
                    this.resData = res.data.list;
                    this.totalCount = res.data.totalCount;
                }else{
                    this.$message.error(res.message);
                }
            })
        },

        // 分页
        pageChange(page){
            this.params.page = page;
            this.goodsList();
        },

        //阻止冒泡
        stopNative(){},


        //筛选 - 综合排序
        comprehensive(){
            delete this.params.order;
            delete this.params.sort;
            this.goodsList();
        },

        //筛选 - 发布时间
        changePubTime(v){
            let s = this.params.sort == 'DESC' ? 'ASC' : 'DESC';
            this.$set(this.params, 'sort', s);
            this.params.order = v;
            this.goodsList();
        },

        //筛选 - 价格
        changePrice(v){
            let s = this.params.sort == 'DESC' ? 'ASC' : 'DESC';
            this.$set(this.params, 'sort', s);
            this.params.order = v;
            this.goodsList();
        },

        //加入购物车
        addCart(index){
            var data = [this.resData[index]];
            this.addCartApi(index, data);
        },


        //加入购物车API
        addCartApi(index, data){
            if(!Cookies.get('access_token')){
                this.$store.commit('updatedCartTotal', {value: data, this: this});
                return
            }
            var str = {
                goods: [
                    {
                        goods_id: this.resData[index].id,
                        attr_name: this.resData[index].attr,
                    }
                ]
            }
            addCart(str).then(res => {
                if(res.code == 200){
                   this.$message.success('加入购物车成功');
                   let num = 0;
                   this.$store.commit('setCatCount', res.data.cartCount)
                }else{
                    this.$message.error(res.message);
                }
            })
        },

        //查看商品详情
        seeDetails(id){
            window.open(`/goods_details/${item.goods.id}.html`);
        },

        //选择搜索分类
        selectColumns(index){
            this.params.cate_id = this.columns[index].id;
            this.currentColumns = index;
            this.goodsList();
        },

        //上一页
        prevs(){
            if(this.params.page>1){
                this.params.age -= 1;
            }
        },

        //下一页
        next(){
            if(this.params.page <= this.totalCount/10){
                this.params.page += 1;
            }
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
    .product_wrap{
        margin-bottom:20px;
        background:#fff;
    }
    .product_box{
        .columns{
            height:80px;
            padding:20px;
            ul{
            display: flex;
            li{
                min-width:110px;
                text-align: center;
                height:42px;
                line-height: 42px;
                border:1px solid @borderColor;
                border-radius: 5px;
                margin-right:15px;
                padding:0 10px;
                cursor: pointer;
                &:hover{
                    color: #fff;
                    background: @highlight;
                    border-color: @highlight;
                }
                &.current{
                    color: #fff;
                    background: @highlight;
                    border-color: @highlight;
                }
            }
        }
        }
        .filtrate{
            height:48px;
            border-bottom:1px solid @borderColor;
            padding:13px 0;
            .sort{
                float:left;
                li{
                    float:left;
                    width:120px;
                    text-align: center;
                    height:20px;
                    line-height: 20px;
                    border-right: 1px solid @borderColor;
                    margin-top:1px;
                    cursor: pointer;
                    &.current{
                        color:@highlight;
                    }
                    .sort_icon{
                        display: inline-block;
                        vertical-align: middle;
                        margin-top:-3px;
                        i{
                            display: block;
                            margin:1px 0;
                            cursor: pointer;
                            color:#8c8c8c;
                            line-height: 6px;
                            font-size:12px;
                            height: 6px;
                            overflow: hidden;
                            &.desc{
                                // background:url(../../assets/image/sort_top.png) center no-repeat;    
                                vertical-align: bottom;                       
                            }
                            &.inverted{
                                vertical-align: top;
                                // background:url(../../assets/image/sort_bottom.png) center no-repeat;
                            }
                            &.checked{
                                color:@highlight;
                            }
                        }
                        
                    }
                }
            }
            .page_wrap{
                float:right;
                span{
                    color:#666;
                    &.total_count{
                        margin-right:20px;
                    }
                    i.current_index{
                        font-style: normal;
                        color:@highlight;
                    }
                }
                .page_btn{
                    margin-left:10px;
                    display: inline-block;
                    a{
                        display: inline-block;
                        width:41px;
                        height:22px;
                        border:1px solid @borderColor;
                        text-align: center;
                        line-height: 22px;
                        color:#ccc;
                        &:hover{
                            background:@highlight;
                            color:#fff;
                        }
                    }
                }
            }
        }
        .goods_wrap{
            width: 100%;
            .goods_list{
                width:100%;
                border-bottom:1px solid @borderColor;
                padding:20px;
                cursor: pointer;
                &:hover{
                    background:#f8f8f8;
                }
                .goods_img{
                    width:80px;
                    height:80px;
                    border-radius: 50%;
                    float: left;
                    position: relative;
                    img{
                        width:100%;
                        height:100%;
                        border-radius: 50%;
                    }
                    .category{
                        width: 70px;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        background: #fe6a00;
                        position: absolute;
                        color: #fff;
                        top: 70px;
                        left: 5px;
                        font-size:12px;
                        border-radius: 4px;
                    }
                }
                .content{
                    padding-left:35px;
                    float: left;
                    .desc{
                        width:760px;
                        font-size:16px;
                        line-height: 25px;
                        margin-bottom:15px;
                        overflow: hidden;
                        font-weight: bold;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .pirce{
                        p.jiage{
                            font-size:12px;
                            color:#666;
                            margin-bottom:10px;
                        }
                        p.money{
                            font-size: 16px;
                            color: #ff6900;
                            font-weight: bold;
                        }
                    }
                }
                .hint{
                    float: right;
                    padding-top:20px;
                    a{
                        display: inline-block;
                        width:123px;
                        height:40px;
                        line-height: 40px;
                        text-align: center;
                        border:1px solid @borderColor;
                        border-radius: 5px;
                        &.add_cart{
                            color:@highlight;
                            border:1px solid @highlight;
                            margin-right:15px;
                        }
                        &.buy{
                            color:@highlight;
                            color:#000;
                        }
                    }
                }
            }
        }
        .goods_hit_b{
            margin-top:15px;
            .page_wrap{
                padding-top:20px;
                height:115px;
                text-align: center;
            }
        }
    }
</style>
