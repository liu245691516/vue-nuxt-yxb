<template>
    <div>
        <div class="table">
            <div class="table_head">
                <ul>
                    <li class="checkbox"><label><input type="checkbox" @click="checkedAll($refs.checkall_t)" ref="checkall_t">全选</label></li>
                    <li class="goods_info">商品信息</li>
                    <li class="price">单价 (元)</li>
                    <li class="amount">数量</li>
                    <li class="money">金额 (元)</li>
                    <li class="handle">操作</li>
                </ul>
            </div>
            <ul class="table_body" v-loading="isLoading">
                <li class="clearfix t_list" v-for="(item, index) in goodsData" :key="index">
                    <div class="goods_info">
                        <div class="checkbox"><input type="checkbox" ref="checkbox" @click="changCheck"></div><img class="goods_img" :src="item.cover_pic || item.goods.cover_pic" @click="goodsDetails(item.goods.id)"><div class="goods_info_right">
                            <div class="desc" @click="goodsDetails(item.goods.id)">{{item.name || item.goods.name}}</div>
                            <div class="tag" v-if="item.goods && item.goods.cate">
                                <span>{{item.goods.cate}}</span>
                            </div>
                        </div><div class="specification" v-if="item.attr && item.attr.attr_list">
                            <a href="javascript:;" class="revised" @click="showSpeWrap(index)">修改</a>
                            <p v-for="(item, sindex) in item.attr.attr_list" :key="sindex">{{item.attr_name}}</p>
                            <div class="spe_wrap" v-if="showSpe==index" @click.stop="">
                                <ul>
                                    <li class="clearfix" v-for="(splist, lindex) in item.goods.attr_group" :key="lindex">
                                        <span class="title">{{splist.attr_group_name}}</span>
                                        <div class="list">
                                            <a href="javascript:;" :class="attrl==goodsData[index].spe[lindex]?'current':''" v-for="(attrl , attrlindex) in splist.attr_list" :key="attrlindex" @click.stop="changeSpe(index, lindex, attrl)">{{attrl}}</a>
                                        </div>
                                    </li>
                                </ul>
                                <div class="hint">
                                    <a href="javascript:;" class="cancel" @click="showSpe=-1">取消</a>
                                    <a href="javascript:;" class="sure" @click="sureUpdate(index)">确认</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="price td">
                        <input type="text" disabled :value="item.price || item.goods.price">
                    </div>
                    <div class="amount td">
                        <button class="minus" @click="minusAmount(index)">-</button>
                        <input type="text" v-model="item.num || 1" @keyup="changeAmount(index)">
                        <button class="add" @click="addAmount(index)">+</button>
                    </div>
                    <div class="money td">{{(item.price || item.goods.price) * (item.num || 1)}}</div>
                    <div class="handle td"><a href="javascript:;" @click="delGoods(item.id)">删除</a></div>
                </li>
            </ul>
        </div>
        <div class="goods_hit_b" ref="hint">
            <div class="selection clearfix" :class="showCart?'fixed':''">
                <div class="_center">
                    <div class="selection_left">
                        <label><input type="checkbox" ref="checkall_b" @click="checkedAll($refs.checkall_b)">全选</label>
                        <a href="javascript:;" class="del" @click="batchDelGoods"><i></i>删除</a>
                        <a href="javascript:;" class="collect_select_in" @click="collect"><i></i>收藏</a>
                    </div>
                    <div class="selection_right">
                        <span class="selected">已选择<span class="selected_num"> {{checkedNum}} </span>项</span>
                        <span class="selected total">共计: ￥<span class="selected_num">{{totalPrice}}</span></span>
                        <a class="clearing" href="javascript:;" @click="payBtn">去结算</a>
                    </div>
                </div>
            </div>
        </div>
        <confirm @deleteBtn='deleteCoupon' ref="confirm"></confirm>
    </div>
</template>
<script>
import {getCartList, updatedCart, deleteCart, collectGoodsApi} from '~/libs/api';
import Cookies from 'js-cookie';
import confirm from '~/components/confirm/confirm';
export default {
    data(){
        return{
            showCart: false,
            goodsData: [],        //商品列表
            _ids: [],
            isLoading: true,      //加载中
            totalPrice: 0,        //共计
            showSpe: -1,          //修改商品规格弹窗 i
            speGoodsData: [],
            checkedNum: 0,       //已选择几项
        }
    },
    mounted() {
        // 监听（绑定）滚轮滚动事件e
        window.addEventListener('scroll', this.handleScroll, true); 
        if(Cookies.get('access_token')){
            this.goosList();
        }else{
            this.goodsData = localStorage.SHOPPINGCART ? JSON.parse(localStorage.SHOPPINGCART) : [];
            this.isLoading = false;
            localStorage.CARTTOTAL = this.goodsData.length;
            if(this.goodsData.length==0){
                window.location.href = "/cart/nothing"; 
            }
        }
    },
    methods: {
        //滚轮滚动事件
        handleScroll: function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop|| document.body.scrollTop;  //滚动条高度
            var docHeight = document.documentElement.clientHeight;  //页面高度
            if(this.$refs.hint && (scrollTop + docHeight >= this.$refs.hint.offsetTop)){
                this.showCart = false;
            }else{
                this.showCart = true;
            }
        },

        //加载商品列表
        goosList(){
            getCartList().then(res => {
                this.isLoading = false;
                if(res.code == 200){
                    this.goodsData = res.data;
                    this.$store.commit('setCatCount', res.data.length);
                    localStorage.CARTTOTAL = res.data.length;
                    if(this.goodsData.length==0){
                        window.location.href = "/cart/nothing"; 
                    }else{
                        this.goodsData.forEach(v => {
                            if(v.attr){
                                v.spe = [];
                                v.attr.attr_list.forEach(e => {
                                    v.spe.push(e.attr_name);
                                })
                            }
                        })
                    }
                    this.goodsTotalPrice();
                }else{
                    this.$message.error(res.message);
                }
            })
        },

        //全选
        checkedAll(name){
            this.$refs.checkall_t.checked = name.checked;
            this.$refs.checkall_b.checked = name.checked;
            this.$refs.checkbox.forEach(v => {
                v.checked = name.checked;
            })
            if(name.checked){
                this.checkedNum = this.$refs.checkbox.length;
            }else{
                this.checkedNum = 0;
            }
            this.goodsTotalPrice();
        },

        //选中商品
        changCheck(index){
            var handle = false;
            this.checkedNum = 0;
            this.$refs.checkbox.forEach(v => {
                if(!v.checked){
                    this.$refs.checkall_t.checked = false;
                    this.$refs.checkall_b.checked = false;
                    handle = true;
                }else{
                    this.checkedNum += 1;
                }
            })
            if(!handle){
                this.$refs.checkall_t.checked = true;
                this.$refs.checkall_b.checked = true;
            }
            this.goodsTotalPrice();
        },

        //修改商品数量
        changeAmount(index){
            if(this.goodsData[index].num<1){
                this.goodsData[index].num = 1;
            }
            this.updatedCart(index);
        },

        //减少商品数量
        minusAmount(index){
            if(this.goodsData[index].num>1){
                this.goodsData[index].num -= 1;
                this.updatedCart(index);
            }
        },

        //增加商品数量
        addAmount(index){
            this.goodsData[index].num += 1;
            this.updatedCart(index);
        },

        //修改商品数量 api
        updatedCart(index , spe){
            var data = {
                goods_id: this.goodsData[index].goods_id,
                num: this.goodsData[index].num,
                id: this.goodsData[index].id
            }
            //规格
            if(spe){
                data.attr_name = spe;
            }
            this.goodsTotalPrice();
            updatedCart(data).then(res => {
                if(res.code == 200){
                    if(spe){
                        this.goosList();
                        this.showSpe = -1;
                    }
                }else{
                    this.$message.error(res.message);
                }
            })
        },

        //删除商品
        delGoods(id){
            this._ids = [id];
            this.del();
        },

        //批量删除
        batchDelGoods(){
            this._ids = [];
            this.$refs.checkbox.forEach((v,index) => {
                if(v.checked){
                    this._ids.push(this.goodsData[index].id);
                }
            })
            this.del();
        },

        //删除api
        del(){
            if(!Cookies.get('access_token')) return
            this.$refs.confirm.showModal({
                title: '确定要从购物车中删除吗?',
                content: '删除后的商品不可恢复，请谨慎删除'
            });
        },

        //确定删除商品
        deleteCoupon(){
            deleteCart({id: this._ids}).then(res => {
                if(res.code == 200){
                    this.goodsTotalPrice();
                    this.$message.success(res.message);
                    this.goosList();
                }else{
                    this.$message.error(res.message);
                }
            })
        },

        //收藏
        collect(){
            if(!Cookies.get('access_token')) return
            var arr = this.$refs.checkbox;
            this._ids = [];
            arr.forEach((e, index) => {
                if(e.checked){
                    this._ids.push(this.goodsData[index].id);
                }
            })
            if(this._ids.length < 1){
                this.$message.error('请勾选要收藏的商品!');
                return
            }
            collectGoodsApi({goods_id: this._ids}).then(res => {
                if(res.code == 200){
                    this.$message.success(res.message);
                }else{
                    this.$message.error(res.message);
                }
            })
        },

        //去结算
        payBtn(){
            let id = [];
            this.$nextTick(() => {
                this.$refs.checkbox.forEach((v, index) => {
                    if(v.checked){
                        id.push(this.goodsData[index].id);
                    }
                })
                if(id.length == 0){
                    this.$message.error('请选择商品');
                    return
                }
                this.$router.push({
                    path: '/cart/pay',
                    query: {'carts_id': id.join(',')}
                })
            })
        },

        //计算商品总价
        goodsTotalPrice(){
            this.totalPrice = 0;
            this.$nextTick(() => {
                this.$refs.checkbox.forEach((v, index) => {
                    if(v.checked){
                        this.totalPrice += Number(this.goodsData[index].goods.price) * this.goodsData[index].num;
                    }
                })
            })
        },

        //点击商品进入 详情页
        goodsDetails(id){
            window.open(`/goods_details/${id}.html`);
        },

        //修改商品规格
        changeSpe(index, lindex, name){
            this.goodsData[index].spe[lindex] = name;
            this.$set(this.goodsData, index, this.goodsData[index]);
        },

        //修改商品规格 - 确认
        sureUpdate(index){
            this.updatedCart(index, this.goodsData[index].spe);
        },

        showSpeWrap(index){
            this.showSpe = index;
            console.log(index)
        }
    },
    components:{
        confirm
    }
}
</script>
<style>
    @import 'element-ui/lib/theme-chalk/message-box.css';
</style>
<style lang="less" scoped>
.table{
    margin-bottom:15px;
    .table_head{
        height:56px;
        border:1px solid @borderColor;
        line-height: 56px;
        padding:0 10px;
        li{
            float: left;
            color:#666;
            width:170px;
            text-align: center;
            &.checkbox{
                width:116px;
                text-align: left;
                input{
                    margin-right:5px;
                }
            }
            &.goods_info{
                width:450px;
                text-align: left;
            }
            &.handle{
                width:100px;
            }
        }
    }
    .table_body{
        min-height: 110px;
        li.t_list{
            padding:10px;
            border-bottom:1px solid @borderColor;
            &:hover{
                background:#f9f9f9;
            }
            &:hover .specification{
                border:1px dashed @borderColor;
                .revised{
                    display: block;
                }
            }
        }
        .goods_info{
            width:566px;
            float: left;
            .checkbox{
                margin:20px 22px 0 0;
                float: left;
            }
            .goods_img{
                width:90px;
                height:90px;
                border-radius: 4px;
                float: left;
                cursor: pointer;
            }
            .goods_info_right{
                width:250px;
                float:left;
                margin-left:20px;
                .desc{
                    line-height: 26px;
                    margin-top:12px;
                    cursor: pointer;
                    &:hover{
                        color:@highlight;
                    }
                }
                .tag{
                    span{
                        display: inline-block;
                        height:22px;
                        line-height: 22px;
                        padding:0 5px;
                        color:#fff;
                        background:@highlight;
                        font-size:12px;
                    }
                }
            }
            .specification{
                width: 160px;
                height: 80px;
                float: left;
                border: 1px solid #fff;
                position: relative;
                padding-top: 10px;
                &:hover{
                    border:1px dashed @highlight;
                    .revised{
                        background:@highlight;
                        display: inline-block;
                        color:#fff;
                    }
                }
                .revised{
                    position: absolute;
                    right:0;
                    top:0;
                    z-index: 10;
                    width:32px;
                    height:25px;
                    line-height: 25px;
                    text-align: center;
                    background:@borderColor;
                    color:#999;
                    font-size:12px;
                    display: none;
                }
                p{
                    line-height: 20px;
                    padding-left: 20px;
                    color: #666;
                    font-size: 14px;
                }
                .spe_wrap{
                    position: absolute;
                    top:10px;
                    left:0;
                    width: 570px;
                    min-height: 80px;
                    z-index: 99;
                    padding:20px;
                    border:1px solid @borderColor;
                    box-shadow: 0 0 10px 3px #e5e5e5;
                    background:#fff;
                    li{
                        margin-bottom:10px;
                        .title{
                            width:60px;
                            float: left;
                            line-height: 32px;
                        }
                        .list{
                            float:left;
                            width:450px;
                            a{
                                display: inline-block;
                                height:32px;
                                line-height: 32px;
                                padding:0 5px;
                                border:1px solid @borderColor;
                                border-radius: 5px;
                                margin-right:10px;
                                color:#666;
                                &.current{
                                    border:1px solid @highlight;
                                }
                            }
                        }
                    }
                    .hint{
                        padding-top:10px;
                        text-align: center;
                        a{
                            display: inline-block;
                            height:30px;
                            width:80px;
                            line-height: 30px;
                            border:1px solid @borderColor;
                            margin:0 10px;
                            border-radius: 5px;
                            &.cancel{
                                color:#666;
                            }
                            &.sure{
                                color:#fff;
                                border:1px solid @highlight;
                                background:@highlight;
                            }
                        }
                    }
                }
            }
        }
        .td{
            width:170px;
            text-align: center;
            float: left;
            padding:30px 0;
            line-height: 28px;
        }
        .price>input{
            width:112px;
            height:28px;
            border:1px solid @borderColor;
            text-align: center;
            padding:0 10px;
            background:#fff;
        }
        .amount{
            padding:30px 27px;
            button{
                width:28px;
                height:28px;
                float: left;
                background: #eee;
                border:1px solid @borderColor;
            }
            input{
                width:56px;
                height:28px;
                float:left;
                border-top:1px solid @borderColor;
                border-bottom:1px solid @borderColor;
                padding:0 10px;
                text-align: center;
                background:#fff;
            }
        }
        .money{
            font-size:16px;
            color:@highlight;
        }
        .handle{
            width:90px;
        }
    }
}
.goods_hit_b{
    margin-top:15px;
    .selection{
        height:56px;
        background:#eee;
        line-height: 56px;
        margin-bottom:50px;
        .selection_left{
            float:left;
            padding-left:10px;
            label{
                margin-right:28px;
                input{
                    margin-right:5px;
                    width:16px;
                    height:16px;
                    vertical-align: middle;
                    margin-top:-4px;
                }
            }
            a{
                margin-left:50px;
                i{
                    display: inline-block;
                    vertical-align: middle;
                    margin:-3px 5px 0;
                }
            }
            .del{
                i{
                    width:13px;
                    height:14px;
                    background:url(../../../assets/image/del_goods.png) center no-repeat;
                }
            }
            .collect_select_in{
                i{
                    width:12px;
                    height:10px;
                    background:url(../../../assets/image/collect_pro.png) center no-repeat;

                }
            }
        }
        .selection_right{
            float:right;
            span.selected{
                margin-right:40px;
                span.selected_num{
                    color:@highlight;
                    font-weight: bold;
                }
            }
            span.total{
                margin-right:130px;
            }
            a.clearing{
                width:100px;
                height:56px;
                color:#fff;
                display: inline-block;
                text-align: center;
                font-size:18px;
                background:@highlight;
                font-weight: bold;
            }
        }
        &.fixed{
            position: fixed;
            bottom:0;
            left:0;
            width:100%;
            z-index: 20;
            margin-bottom:0;
        }
    }
}
</style>
