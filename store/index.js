import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
Vue.use(Vuex)

// window.fetch() 的 Polyfill
// require('whatwg-fetch')
const store = () => new Vuex.Store({
  state: {
    columnsData: [],           //栏目列表   
    shoppingCartTotal: 0,      //购物车数量
    shoppingCart:[],           //购物车商品
  },

  mutations: {
    //栏目列表
    setColumns(state, data){
        state.columnsData = data;
    },

    //退出登录
    loginOut(state, data){
        Cookies.remove('YXB_ID');
        Cookies.remove('access_token');
        localStorage.clear();
        if(data == 'login'){
            location.href = '/account/login';
        }else{
            location.href = "/";
        }
    },

    //购物车列表
    updatedCartTotal(state, data) {
        let cart = localStorage.SHOPPINGCART ? JSON.parse(localStorage.SHOPPINGCART): [];
        if(typeof(data.value) == 'number' || typeof(data.value) == 'string'){
            handle = false;
            cart.forEach((v, index) => {
                if(v.id == data.value){
                    cart.splice(index, 1);
                }
            })
        }else {
            if(cart.length>0){
                data.value.forEach(e => {
                    let handle = true;
                    cart.forEach((v, cIndex) => {
                        if(v.id == e.id){
                            handle = false;  
                            cart[cIndex].num = cart[cIndex].num ? cart[cIndex].num += 1 : 2
                        }
                    })
                    if(handle) {
                        cart.push(e);
                    }
                })
                data.this.$message.success('加入购物车成功');
            }else{
                cart = data.value;
            }
        }
        state.shoppingCartTotal = cart.length;
        state.shoppingCart = cart;
        if(!Cookies.get('access_token')){
            localStorage.CARTTOTAL = cart.length;
            localStorage.SHOPPINGCART = JSON.stringify(cart);
        }
    },

    //购物车数量
    setCatCount(state, data){
        state.shoppingCartTotal = data;
        localStorage.CARTTOTAL = data || 0;
    }

  },

  actions: {
    // ...
  }

})

export default store