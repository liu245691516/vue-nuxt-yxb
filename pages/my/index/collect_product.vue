<template>
    <section>
        <!-- 产品收藏 -->
        <h4>产品收藏</h4>
        <div class="form" v-loading="loading">
            <ul class="solution_wrap">
                <li class="clearfix" v-for="(item, index) in resData" :key="index">    
                    <img :src="imgShow(item.cover_pic)">
                    <div class="desc">
                        <p class="overflow">{{item.name}}</p>
                        <span class="keywords">{{item.cate}}</span>
                    </div>
                    <div class="hint">
                        <span class="price">单价:￥<i>{{item.price}}</i></span>
                        <a href="javascript:;" class="delete" @click="del(item.id)">删除</a>
                        <a :href="`/goods_details/${item.id}.html`" target="_blank" class="details">查看详情</a>
                    </div>
                </li>
            </ul>
            <div class="yxb_no_data" v-if="resData.length==0">
                暂无数据~
            </div>
            <div class="page_wrap page_template" v-if="resData.length>0">
                    <el-pagination
                    background
                    layout="prev, pager, next"
                    prev-text="上一页 "
                    next-text=" 下一页 "
                    :total="totalCount"
                    @current-change="pageChange">
                </el-pagination>
            </div>
        </div>
        <confirm @deleteBtn='deleteCoupon' ref="confirm"></confirm>
    </section>
</template>

<script>
    import {getCollectProduct, cancelProductCollect} from '~/libs/api';
    import confirm from '~/components/confirm/confirm';
    import {defaultImg} from '~/mixins/mixin';
    export default {
        mixins: [defaultImg],
        data(){
            return{
                resData: [],    
                totalCount: 0,     //总条数
                page: 1,           //页码
                del_id: '',        //要删除的id
                loading: true,     //加载中
            }
        },
        mounted() {
            this.collectProductList();
        },
        methods:{
            //加载列表
            collectProductList(){
                getCollectProduct({page: this.page}).then(res => {
                    this.loading = false;
                    if(res.code == 200){
                        this.resData = res.data.list;
                        this.totalCount = Number(res.data.totalCount);
                    }else{
                        this.$message.error(res.message);
                    }
                })
            },

            //删除收藏
            del(id){
                this.del_id = id;
                this.$refs.confirm.showModal({
                    title: '确定要删除该商品吗?',
                    content: '已删除的商品不可恢复，请谨慎删除'
                });
            },

            deleteCoupon(){
                cancelProductCollect({}, this.del_id).then(res => {
                    if(res.code == 200){
                        this.$message.success(res.message);
                        this.collectProductList();
                    }else{
                        this.$message.error(res.message);
                    }
                })
            },

            // 分页
            pageChange(page){
                this.page = page;
                this.collectProductList();
            },
        },
        components:{
            confirm
        }
    }
</script>
<style>
    @import 'element-ui/lib/theme-chalk/pagination.css';
</style>

<style lang="less" scoped>
    h4{
        font-size:16px;
        padding:34px 0 15px 0;
        margin:0 20px;
        border-bottom:1px solid @borderColor;
    }
    .form{
        min-height: 100px;
    }
    .solution_wrap{
        padding:2px 20px 0 20px;
        li{
            padding:20px 0;
            border-bottom:1px dashed @borderColor;
            img{
                width:90px;
                height:90px;
                border-radius: 6px;
                float: left;
            }
            .desc{
                width:420px;
                padding:20px 0 15px 20px;
                float:left;
                p{
                    font-size:16px;
                    padding-bottom:14px;
                }
                .keywords{
                    height:24px;
                    padding:0 8px;
                    line-height: 24px;
                    display: inline-block;
                    color:#fff;
                    background:@highlight;
                }
            }
            .hint{
                float:right;
                padding:27px 0;
                span.price{
                    color:@highlight;
                    margin-right:43px;
                    i{
                        font-style: normal;
                        font-weight: bold;
                    }
                }
                a{
                    display: inline-block;
                    height:36px;
                    line-height: 36px;
                    border:1px solid @borderColor;
                    text-align: center;
                    border-radius: 4px;
                    padding:0 25px;
                    &.details{
                        color:@highlight;
                        border-color:@highlight;
                        margin-left:20px;
                    }
                }
            }
        }
    }
    .page_wrap{
        padding-top:20px;
    }
</style>
