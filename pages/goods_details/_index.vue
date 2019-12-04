<template>
    <div class="goods_details_wrap _center" ref="box">
        <div class="breadcrumb">
            当前位置:
            <a href="/">首页</a><span>&gt;</span>
            <span><a :href="item.url" v-for="(item, index) in breadcrumb" :key="index">{{item.title}}</a><span>&gt;</span></span>
            <span>{{resData.name}}</span>
        </div>
        <div class="goods clearfix">
            <div class="g_left">
                <div class="g_left_top">
                    <img :src="resData.cover_pic">
                    <h4 class="name">{{resData.name}}</h4>
                    <div class="count">
                        <p><i class="iconfont">&#xe679;</i>浏览量</p>
                        <span>{{resData.view}}</span>
                    </div>
                    <span class="border">|</span>
                    <div class="count">
                        <p><i class="iconfont">&#xe679;</i>收藏</p>
                        <span>{{resData.collect}}</span>
                    </div>
                </div>
                <ul class="g_left_bottom">
                    <li>成交记录<span>已有{{resData.done}}人购买</span></li>
                    <li>服务态度<span><i>5</i>分</span></li>
                    <li>服务态度<span><i>5</i>分</span></li>
                    <li>服务态度<span><i>5</i>分</span></li>
                </ul>
            </div>
            <div class="content">
                <h4 class="title">{{resData.name}}</h4>
                <p class="desc" :title="resData.description">{{resData.description}}</p>
                <div class="price_wrap">
                    <div class="promotion"><span>促销</span>注册会员即送50元代金券</div>
                    <div class="price_desc">
                        <p class="price">价格: <span class="money">￥{{resData.price}}</span></p>
                        <p class="vip_price">会员价格:￥{{resData.price}}</p>
                    </div>
                </div>
                <div class="specification" v-for="(item, index) in resData.attr_group" :key="index" v-if="resData.attr_group.length>0">
                    <div class="title">{{item.attr_group_name}}</div><div class="sp_list">
                        <a href="javascript:;" :class="list == speCurrent[index] ? 'current' : ''" v-for="(list, lindex) in item.attr_list" :key="lindex" @click="selectSpecification(index, list)">{{list}}</a>
                    </div>
                </div>
                <p class="remarks"><span v-if="resData.remarks">下单备注：<b>{{resData.remarks}}</b></span></p>
                <div class="operation">
                    <a href="javascript:;" class="buy" @click="buy">立即购买</a>
                    <a href="javascript:;" class="add_cart" @click="addCart">加入购物车</a>
                </div>
                <ul class="hint">
                    <li><img src="../../assets/image/goods_icon_1.png">1对1服务</li>
                    <li><img src="../../assets/image/goods_icon_2.png">专业团队</li>
                    <li><img src="../../assets/image/goods_icon_3.png">用心服务</li>
                    <li><img src="../../assets/image/goods_icon_4.png">担保交易</li>
                    <li><img src="../../assets/image/goods_icon_5.png">私人定制</li>
                </ul>
            </div>
            <div class="g_right">
                <div class="service">
                    <div class="title">
                        <div class="border"></div>
                        <div class="kfzx">客服咨询</div>
                    </div>
                    <img class="head_img" :src="agentData.cover_pic">
                    <p class="name">营销顾问：{{agentData.name}}</p>
                    <a class="chat_btn" href="javascript:;" onclick="lubankfChatClick()"><i></i>点击联系客服</a>
                </div>
                <div class="other">
                    <div class="item" onclick="lubankfChatClick()">
                        <img src="../../assets/image/faqs.png">
                        <span>在线问答</span>
                        <span class="iconfont">&#xe65f;</span>
                    </div>
                    <div class="item pub_demand">
                        <a href="/post_demand" target="_blank">
                            <img src="../../assets/image/pub_xq.png">
                            <span>发布需求</span>
                            <span class="iconfont">&#xe65f;</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="details">
            <ul class="tabs">
                <li><a href="#desc_1" :class="scrollCurrent==0?'checked':''">产品目的</a></li>   
                <li><a href="#desc_2" :class="scrollCurrent==1?'checked':''">产品优势</a></li>  
                <li><a href="#desc_3" :class="scrollCurrent==2?'checked':''">合作流程</a></li>  
                <li><a href="#desc_4" :class="scrollCurrent==3?'checked':''">案例展示</a></li>  
            </ul>
            <div class="goods_info">
                <div class="desc_list" v-for="(item, index) in goodsInfo" ref="floor" :id="'desc_'+(index+1)" :key="index">
                    <h4 class="title">{{item.title}}</h4>
                    <div class="content" v-html="item.content"></div>
                </div>
            </div>
        </div>
        <!-- 立即购买提示框 -->
        <div class="mark" v-if="showModal"></div>
        <div class="dialog" v-if="showModal">
            <div class="head">
                <span>购买服务</span>
                <a href="javascript:;" class="iconfont" @click="showModal=false">&#xe61d;</a>
            </div>
            <div class="content">
                <ul class="goods_info clearfix">
                    <li><img :src="buyGoodsInfo.cover_pic"></li>
                    <li class="title">
                        <p class="overflow">{{buyGoodsInfo.name}}</p>
                        <span>标签</span>
                    </li>
                    <li v-if="speCurrent && speCurrent.length>0" class="specification">
                        <p v-for="(item, index) in speCurrent" :key="index">{{item}}</p>
                    </li>
                    <li class="desc">
                        <p>单价: ￥{{buyGoodsInfo.price}}</p>
                        <p>数量: {{buyGoodsNum}}</p>
                    </li>
                    <li class="amount_payable">
                        <p>应付金额: <span>￥{{buyGoodsNum*buyGoodsInfo.price}}</span></p>
                    </li>
                </ul>
                <div class="hint">
                    支付金额: <input type="text" disabled :value="buyGoodsNum*buyGoodsInfo.price"> <span class="iconfont">&#xe61d;</span>
                    购买数量：<input type="text" v-model="buyGoodsNum">
                </div>
                <div class="btn_wrap">
                    <a href="javascript:;" class="buy" @click="buyGoods">提 交</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {goodsDetail, addCart} from '~/libs/api';
import { get, post } from '~/libs/http'
import Cookies from 'js-cookie';
export default {
    layout: 'goods',
    data(){
        return{
            floorArr: [],
            scrollCurrent: 0,         //滚动条当前位置
            resData: {},              //商品详情数据
            agentData: {},            //客服信息
            breadcrumb: [],           //当前位置
            showModal: false,         //立即购买确认信息
            buyGoodsInfo: {},         //立即购买 - 购买详情
            buyGoodsNum: 1,           //购买数量
            goodsInfo: [
                {title: '产品目的', content: ''},
                {title: '产品优势', content: ''},
                {title: '合作流程', content: ''},
                {title: '案例展示', content: ''},
            ],
            speCurrent:[],
        }
    },
    asyncData (context) {
        return get(`api/v1/roof/goods/${context.params.index.split('.html')[0]}`).then(res => {
            if(res.code == 200){
                return {
                    resData: res.data.goods, 
                    agentData: res.data.goods,
                    breadcrumb: res.data.nav,
                    webTitle: res.data.webTitle,
                    goodsInfo: [
                        {title: '产品目的', content: res.data.goods.purpose || '--'},
                        {title: '产品优势', content: res.data.goods.advantage || '--'},
                        {title: '合作流程', content: res.data.goods.flow || '--'},
                        {title: '案例展示', content: res.data.goods.case || '--'},
                    ]
                }
            }else{
                console.log(res.message);
            }
        })
    },
    head() {
        return {
            title: this.webTitle || this.resData.name,
            script: [
                {src: 'https://cdn.lubankf.com/IM/js/lb_service.js?accessId=gnHbJ9-O5Zbi2-qKleWhKcYHh8A-6ee9&autoShow=true'}
            ]
        }
    },
    mounted: function () {
        // 监听（绑定）滚轮滚动事件
        this.$nextTick(()=>{
            window.addEventListener('scroll', this.handleScroll, true);  
            this.recordHeight();
        })
    },
    created() {
        //加载规格
        if(this.resData){
            if(this.resData.attr && this.resData.attr.length>0){
                this.resData.price = this.resData.attr[0].price;
                if(this.resData.attr[0].attr_list){
                    this.resData.attr[0].attr_list.forEach(v =>{
                        this.speCurrent.push(v.attr_name);
                    })
                }
            }
        }
    },
    methods: {
        recordHeight(){
            this.$refs.floor.forEach(v => {
                this.floorArr.push(v.offsetTop);
            });
        },

        //选择商品规格
        selectSpecification(index, list){ 
            this.$set(this.speCurrent, index , list);
            this.resData.attr.forEach((v) => {
                let j = [];
                this.resData.attr_group.forEach((e, index) => {
                    j.push(v.attr_list[index].attr_name);
                })
                if(j.toString() == this.speCurrent.toString()){
                    this.resData.price == v.price;
                    this.$set(this.resData, 'price', v.price);
                }
            })
        },

        //加入购物车
        addCart(){
            if(!Cookies.get('access_token')){
                this.$store.commit('updatedCartTotal', {value: [this.resData], this: this});
                return
            }
            var data = {
                goods:[
                    {
                        goods_id: this.resData.id, 
                        attr_name: this.speCurrent
                    }
                ]
            }
            addCart(data).then(res => {
                if(res.code == 200){
                   this.$message.success('加入购物车成功');
                   let num = 0;
                   this.$store.commit('setCatCount', res.data.cartCount)
                }else{
                    this.$message.error(res.message);
                }
            })
        },

        //立即购买
        buy(){
            this.buyGoodsInfo = this.resData;
            this.showModal = true;
        },

        //立即购买 - 提交
        buyGoods(){
            let data = [];
            data.push({
                goods_id: this.resData.id,
                num: this.buyGoodsNum
            })
            if(this.speCurrent){
                data[0].attr_name = this.speCurrent;
            }
            this.$router.push({
                path: '/cart/pay',
                query: {'goods_id': JSON.stringify(data)}
            })
        },

        //滚轮滚动事件
        handleScroll: function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop|| document.body.scrollTop;  //滚动条高度
            var docHeight = document.documentElement.clientHeight;  //页面高度
            this.floorArr.forEach((e,index) => {
                if(scrollTop + docHeight >= e && (scrollTop + docHeight < this.floorArr[index+1] || index == this.floorArr.length-1)){
                    this.scrollCurrent = index;
                }
            })
        }
    },
    destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll);   //  离开页面清除（移除）滚轮滚动事件
    }
}
</script>
<style lang="less" scoped>
    @import './goods_details.less';
</style>
