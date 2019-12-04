<template>
    <section>
        <h4>解决方案收藏</h4>
        <div class="form" v-loading="loading"> 
            <ul class="solution_wrap">
                <li class="clearfix" v-for="(item, index) in resData" :key="index">    
                    <img :src="imgShow(item.cover)">
                    <div class="desc">{{item.title}}</div>
                    <div class="hint">
                        <a href="javascript:;" class="delete" @click="del(item.id)">删除</a>
                        <a href="/solution/list" class="details">查看详情</a>
                    </div>
                </li>
            </ul>
        </div>
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
        <confirm @deleteBtn='deleteCoupon' ref="confirm"></confirm>
    </section>
</template>

<script>
    import {getCollectSolution, cancelSolutionCollect} from '~/libs/api';
    import confirm from '~/components/confirm/confirm';
    import {defaultImg} from '~/mixins/mixin';
    export default {
        mixins: [defaultImg],
        data(){
            return {
                resData: [],    
                totalCount: 0,     //总条数
                page: 1,           //页码
                del_id: '',        //要删除的id
                loading: true,     //加载中
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            //加载收藏列表
            init(){
                getCollectSolution().then(res => {
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
                cancelSolutionCollect({}, this.del_id).then(res => {
                    if(res.code == 200){
                        this.$message.success(res.message);
                        this.init();
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
<style lang="less" scoped>
    .form{
        min-height: 100px;
    }
    h4{
        font-size:16px;
        padding:34px 0 15px 0;
        margin-left:20px;
        border-bottom:1px solid @borderColor;
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
                width:610px;
                padding:20px;
                float:left;
                font-size:16px;
            }
            .hint{
                float:right;
                padding:27px 0;
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
