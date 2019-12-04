<template>
    <div class="product_wrap">
        <div class="banner _center">
            <img :src="newHouse">
        </div>
        <div class="product_box _center">
            <ul class="tool_list clearfix" v-if="columnsData">
                <li class="tool_name" v-if="columnsData.title">
                    <span>{{columnsData.alias}}</span>
                    <div>{{columnsData.title}}</div>
                </li>
                <li v-for="(item, index) in columnsData.children" :key="index" v-if="columnsData.children.length>0" :class="$route.query.cate_id==item.id?'current':''">
                    <a :href="`/goods_list/${item.id}.html?t=column_id`" target="_blank">
                        <div class="img_wrap">
                            <img v-if="item.cover_pic" :src="item.cover_pic">
                        </div>
                        <p>{{item.title}}</p>
                    </a>
                </li>
            </ul>
            <div class="select_warp">
                <div class="select_item clearfix" v-if="fenleiData.length>0">
                    <span>分类:</span>
                    <ul>
                        <li :class="params.category_id == f.id?'select_in':''" v-for="(f, fIndex) in fenleiData" :key="fIndex" @click="selectFenlei(fIndex)">{{f.title}}</li>
                    </ul>
                </div>
                <div class="select_item clearfix industry" v-if="tradeData.length>0">
                    <span>行业:</span>
                    <ul class="industry_list" :class="showMore?'more':''">
                        <li :class="params.trade_id == item.id ? 'select_in' : ''" v-for="(item, index) in tradeData" :key="index" @click="selectTrade(item.id)">{{item.title}}</li>
                    </ul>
                    <a href="javascript:;" class="more" v-if="tradeData.length>11" @click="showMore=!showMore">更多<i class="iconfont">&#xe600;</i></a>
                </div>
                <div class="select_item clearfix price">
                    <span>价格:</span>
                    <ul class="price_list">
                        <li :class="priceCurrent == 0 ? 'select_in' : ''"  @click="selectPrice(0)">不限</li>

                        <li :class="priceCurrent == index+1 ? 'select_in' : ''"  v-for="(item, index) in priceData" :key="index" @click="selectPrice(index+1, index)">
                            <span v-if="item.min">{{item.min}}</span>
                            <span v-if="item.max"><i v-if="item.min">-</i>{{item.max}}</span>
                            <span v-if="!item.min">以下</span>
                            <span v-if="!item.max">以上</span>
                        </li>
                    </ul>
                    <div class="pirce_zdy">
                        <input type="text" class="start_price" v-model="params.min"> 元 -
                        <input type="text" class="end_price" v-model="params.max"> 元
                        <a href="javascript:;" class="sure" @click="goodsList">确定</a>
                    </div>
                </div>
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
            <div class="goods_wrap clearfix" v-loading="isLoading">
                <div class="goods_list" v-for="(item, index) in resData" :key="index" @click="seeDetails(item.id)">
                    <div class="goods_img">
                        <img :src="item.cover_pic">
                    </div>
                    <div class="content">
                        <div class="desc">{{item.name}}</div>
                        <div class="pirce clearfix">
                            <label @click.stop="stopNative"><input type="checkbox" ref="checkbox" @click.stop="checkedGoods">{{item.price}}</label>
                            <span class="collect_num"><i></i>{{item.collect}}</span>
                        </div>
                    </div>
                    <div class="hint">
                        <a href="javascript:;" class="add_cart" @click.stop="addCart(index)"><i class="iconfont">&#xe672;</i>加入购物车</a><a href="javascript:;" class="buy" @click.stop="buy(item)">立即购买</a>
                    </div>
                </div>
                <div class="yxb_no_data" v-if="resData.length==0">
                    暂无数据~
                </div>
            </div>
            <!-- page -->
            <div class="goods_hit_b" ref="hint" v-if="resData.length>0">
                <div class="selection clearfix" :class="showCart?'fixed':''">
                    <div class="_center">
                        <div class="selection_left">
                            <label><input type="checkbox" ref="allSelect" @click="allSelect($refs.allSelect.checked)">全选</label>
                            <a href="javascript:;" class="collect_select_in" @click="collectChecked"><i></i>收藏选择项</a>
                        </div>
                        <div class="selection_right">
                            <span class="selected">已选择<span class="selected_num">{{selectionNum}}</span>项</span>
                            <a href="javascript:;" class="a_btn buy" @click="batchBuy">立即购买</a>
                            <a href="javascript:;" class="a_btn add_cart" @click="batchAddCart">加入购物车</a>
                        </div>
                    </div>
                </div>
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
        <div class="mark" v-if="showModal"></div>
        <div class="dialog" v-if="showModal">
            <div class="head">
                <span>购买服务</span>
                <a href="javascript:;" class="iconfont" @click="showModal=false">&#xe61d;</a>
            </div>
            <div class="content">
                <ul>
                    <li v-for="(item, index) in buyList" :key="index" class="list">
                        <div class="goods_info">
                            <label><input type="checkbox" ref="b_checkbox" checked @click="b_checked"></label>
                            <span class="title overflow">{{item.name}}</span>   
                            <div class="hint">
                                金额: <input type="text" :value="item.price * item.num" disabled> <span class="iconfont">&#xe61d;</span>
                                数量：<input type="text" v-model="item.num" @keyup="changeGoodsNum(index)" @blur="changeGoodsNum(index, 'blur')">
                            </div>
                        </div>
                        <div class="spe_wrap" @click.stop="" v-if="item.attr_group.length>0">
                            <ul>
                                <li class="clearfix" v-for="(splist, lindex) in item.attr_group" :key="lindex">
                                    <span class="title">{{splist.attr_group_name}}</span>
                                    <div class="list">
                                        <a href="javascript:;" :class="attrl==item.currentSpe[lindex]?'current':''" v-for="(attrl , attrlindex) in splist.attr_list" :key="attrlindex" @click.stop="changeSpe(index, lindex, attrl)">{{attrl}}</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <div class="selection">
                    <label><input type="checkbox" checked ref="buyListCheckall" @click="b_checkall($refs.buyListCheckall.checked)">全选</label>
                    <div class="total">总计: <span class="price">{{totalPrice}}</span>元</div>
                </div>
                <div class="btn_wrap">
                    <a href="javascript:;" class="buy" @click="buyGoods">立即购买</a>
                    <a href="javascript:;" class="chat">在线咨询</a>
                </div>
            </div>
        </div>
        <login-box ref="loginModal"></login-box>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import {getColumns, getGoodsList, getSortPrice, addCart, collectGoodsApi} from '~/libs/api';
import loginBox from '~/components/login/login'; 
export default {
    layout: 'goods',
    data(){
        return{
            newHouse: '',         //广告图
            columnsData: {},      //筛选列表
            fenleiData: '',       //分类
            tradeData: '',        //行业
            priceCurrent: 0,      //筛选 - 价格下标
            priceData: [],        //筛选 - 价格列表
            sortIndex: 1,         //排序 下标
            totalCount: 0,        //总条数
            currentPage: 1,       //修改分页为第几页
            showCart: true,       //底部加入购物车 收藏栏定位
            isLoading: true,      //加载中
            selectionNum: 0,      //已选中的数量
            resData: [],
            _ids: [],             //选中的商品id
            showMore: false,      //行业是否显示更多
            showModal: false,     //立即购买 弹框列表
            buyList: [],          //购买列表
            totalPrice: 0,        //总价
            webTitle: '',
            params: {
                page: 1,
            }
        }
    },
    mounted: function () {
        // 监听（绑定）滚轮滚动事件
        window.addEventListener('scroll', this.handleScroll, true);  
        this.init();
    },
    async asyncData ({params, query}) {
        let str = {cate_id: params.index.split('.html')[0]};
        if(query.t == "column_id"){
            str = {column_id: params.index.split('.html')[0]};
        }
        //goodsList商品列表       priceList价格列表
        let [goodsList, priceList] = await Promise.all([
            getGoodsList(str),
            getSortPrice()
        ])
        return {
            resData: goodsList.data.list,
            webTitle: goodsList.data.webTitle,
            totalCount: goodsList.data.totalCount,
            isLoading: false,
            priceData: priceList.data.list,
            newHouse: priceList.data.adv
        }
    },
    head() {
        return {
            title: this.webTitle || '叮咚营销宝'
        }
    },
    created(){
        if(this.$route.query.t == "column_id"){
            this.params = {column_id: this.$route.params.index.split('.html')[0]};
        }else{
            this.params = {cate_id: this.$route.params.index.split('.html')[0]};
        } 
        if(this.resData){
            this.resData.forEach((v, rindex) => {
                v.spe = [];
                v.currentSpe = [];
                if(v.attr && v.attr.length > 0){
                    v.attr.forEach((k, index) => {
                        v.spe[index] = [],
                        k.attr_list.forEach(n => {
                            v.spe[index].push(n.attr_name);
                        })
                    })
                    v.price = v.attr[0].price;
                    v.attr[0].attr_list.forEach((m, mindex) =>{
                        v.currentSpe.push(m.attr_name);
                    })
                }
                
            })
        }
    },
    methods: {
        //加载筛选列表
        init(){
            getColumns({scenario: 'other'}).then(res => {
                if(res.code == 200){
                    res.data.forEach(v => {
                        if(this.$route.params.index.split('.html')[0] == v.id){
                            this.columnsData = v;
                            this.fenleiData = v.children[0].children ? v.children[0].children : [];
                            try {
                                this.tradeData = v.children[0].children&&v.children[0].children[0].children? v.children[0].children[0].children : [];
                            } catch (error) {
                                
                            }
                        }
                        if(v.children){
                            v.children.forEach((e, index) => {
                                if(e.id == this.$route.params.index.split('.html')[0]){
                                    this.columnsData = v;
                                    this.fenleiData = e.children ? e.children : [];
                                    try {
                                        this.tradeData = e.children&&e.children[0].children? e.children[0].children : [];
                                    } catch (error) {
                                        
                                    }
                                }
                            })
                        }
                    });
                }else{
                    this.$message.error(res.message);
                }
            })
        },
        //商品列表
        goodsList(){
            this.isLoading = true;
            this.allSelect(false);
            getGoodsList(this.params).then(res => {
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

        //滚轮滚动事件
        handleScroll: function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop|| document.body.scrollTop;  //滚动条高度
            var docHeight = document.documentElement.clientHeight;  //页面高度
            this.$nextTick(()=>{
                if(this.$refs.hint && (scrollTop + docHeight >= this.$refs.hint.offsetTop)){
                    this.showCart = false;
                }else{
                    this.showCart = true;
                }
            })
        },
        //筛选 - 选择分类
        selectFenlei(index){
            if(this.params.category_id == this.fenleiData[index].id){
                this.params.category_id = '';
            }else{
                this.params.category_id = this.fenleiData[index].id;
            }
            this.tradeData = this.fenleiData[index].children;
            this.goodsList();
        },

        //筛选 - 选择行业
        selectTrade(id){
            if(this.params.trade_id == id){
                this.params.trade_id = '';
            }else{
                this.params.trade_id = id;
            }
            this.goodsList();
        },
        
        //筛选 - 选择价格
        selectPrice(type, index){
            this.priceCurrent = type;
            if(type){
                var msg = this.priceData[index];
                this.params.min = msg.min;
                this.params.max = msg.max;
            }else{
                delete this.params.min;
                delete this.params.max;
            }
            this.goodsList();
        },

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
            var msg = [this.resData[index]];
            var data = {
                goods: [
                    {
                        goods_id: [this.resData[index].id],
                        attr_name: [],
                    }
                ]
            }
            if(this.resData[index].attr.length>0){
                this.resData[index].attr[0].attr_list.forEach(v=>{
                    data.goods[0].attr_name.push(v.attr_name);
                })
            }
            this.addCartApi(data, 1, msg);
        },

        //批量加入购物车
        batchAddCart(){
            let msg = [];
            let data = {
                goods: []
            };
            this._ids = [];
            this.$refs.checkbox.forEach((e, index) => {
                if(e.checked){
                    msg.push(this.resData[index]);
                    this._ids.push(this.resData[index].id);
                    data.goods.push({
                        goods_id: this.resData[index].id,
                        attr_name: []
                    })
                    if(this.resData[index].attr.length>0){
                        this.resData[index].attr[0].attr_list.forEach(v=>{
                            data.goods[index].attr_name.push(v.attr_name);
                        })
                    }
                }
            })
            this.addCartApi(data, 2, msg);
        },

        //加入购物车API
        addCartApi(data, type, msg){
            if(data.goods.length == 0) {
                this.$message.error('请勾选要加入购物车的商品');
                return false
            }
            if(!Cookies.get('access_token')){
                this.$store.commit('updatedCartTotal', {value: msg, this: this});
                return
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
        buy(data){
            if(!Cookies.get('access_token')){
                this.$refs.loginModal.showLoginBox();
                return 
            }
            data.num = 1;
            this.buyList = [data];
            this.showModal = true;
            this.totalPrice = data.price;
        },

        //批量购买
        batchBuy(){
            if(!Cookies.get('access_token')){
                this.$refs.loginModal.showLoginBox();
                return 
            }
            this.buyList = [];
            this.totalPrice = 0;
            this.$refs.checkbox.forEach((e, index) => {
                if(e.checked){
                    this.totalPrice += Number(this.resData[index].price);
                    this.resData[index].num = 1;
                    this.buyList.push(this.resData[index]);
                }
            })
            this.showModal = true;
        },

        //查看商品详情
        seeDetails(id){
            window.open(`/goods_details/${id}.html`);
        },

        //商品列表全选
        allSelect(name){
            if(this.$refs.allSelect){
                this.$refs.allSelect.checked = name;
                this.$refs.checkbox.forEach((e, index) => {
                    e.checked = name;
                })
                if(name){
                    this.selectionNum = this.$refs.checkbox.length;
                }else{
                    this.selectionNum = 0;
                }
            }
        },

        //商品单选
        checkedGoods(){
            this._ids = [];
            let handle = false;
            this.selectionNum = 0;
            this.$refs.checkbox.forEach(v => {
                if(!v.checked){
                    this.$refs.allSelect.checked = false;
                    handle = true;
                }else{
                    this.selectionNum += 1;
                    this._ids.push(v.id);
                }
            })
            if(!handle){
                this.$refs.allSelect.checked = true;
            }
        },

        //收藏商品
        collectChecked(){
            var arr = this.$refs.checkbox;
            this._ids = [];
            arr.forEach((e, index) => {
                if(e.checked){
                    this._ids.push(this.resData[index].id);
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

        //购买列表全选
        b_checkall(name){
            this.$refs.buyListCheckall.checked = name;
            this.$refs.b_checkbox.forEach((e, index) => {
                e.checked = name;
            })
            this.changeGoodsNum();
        },

        //购买列表单选
        b_checked(){
            let handle = false;
            this.$refs.b_checkbox.forEach(v => {
                if(!v.checked){
                    this.$refs.buyListCheckall.checked = false;
                    handle = true;
                }
            })
            if(!handle){
                this.$refs.buyListCheckall.checked = true;
            }
            this.changeGoodsNum();
        },

        //购买服务 - 修改数量
        changeGoodsNum(index, type){
            this.totalPrice = 0;
            if(index && this.buyList[index].num < 1 && type == 'blur'){
                this.buyList[index].num = 1;
            }
            if(index) this.$set(this.buyList, index, this.buyList[index]);
            this.buyList.forEach((v, index) => {
                if(this.$refs.b_checkbox[index].checked){
                    this.totalPrice += Number(v.price) * v.num;
                }
            })
        },

        //购买服务 - 修改商品规格
        changeSpe(index, lindex, name){
            this.buyList[index].currentSpe[lindex] = name;
            this.buyList[index].spe.forEach((v, j) => {
                if(this.buyList[index].currentSpe.toString() == v.toString()){
                    this.buyList[index].price = this.buyList[index].attr[j].price;
                    this.$set(this.buyList, index, this.buyList[index]);
                    this.changeGoodsNum(index);
                }
            })
        },
        
        //购买服务 - 立即购买
        buyGoods(){
            let data = [];
            this.$refs.b_checkbox.forEach((v, index) => {
                if(v.checked){
                    data.push({
                        goods_id: this.buyList[index].id,
                        num: this.buyList[index].num
                    })
                    if(this.buyList[index].currentSpe){
                        data[index].attr_name = this.buyList[index].currentSpe;
                    }
                }
            })
            this.$router.push({
                path: '/cart/pay',
                query: {'goods_id': JSON.stringify(data)}
            })
        },

        //上一页
        prevs(){
            if(this.params.page>1){
                this.pparams.age -= 1;
            }
        },

        //下一页
        next(){
            if(this.params.page <= this.totalCount/10){
                this.params.page += 1;
            }
        },

    },
    components:{
        loginBox
    }
}
</script>

<style>
    @import 'element-ui/lib/theme-chalk/pagination.css';
    @import 'element-ui/lib/theme-chalk/icon.css';
</style>
<style lang="less" scoped>
    @import './goods_list.less';
</style>
