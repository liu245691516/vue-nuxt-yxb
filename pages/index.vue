<template>
  <section>
    <!-- 产品 -->
    <index-product :adv="advData" :recommendGoods="recommendGoodsData" :agents="agentsData" :solution="article_single"></index-product>
    <!-- 步骤 -->
    <div class="step">
      <ul class="clearfix">
        <li>
          <div class="index">1</div>
          <div class="step_name">
            <p class="title">咨询服务</p>
            <p>上千家企业服务</p>
          </div>
        </li>
        <li>
          <div class="index">2</div>
          <div class="step_name">
            <p class="title">顾问对接</p>
            <p>专家客服对接服务</p>
          </div>
        </li>
        <li>
          <div class="index">3</div>
          <div class="step_name">
            <p class="title">制作方案</p>
            <p>专业团队定制方案</p>
          </div>
        </li>
        <li>
          <div class="index">4</div>
          <div class="step_name">
            <p class="title">文案执行</p>
            <p>万余优质资源保证服务</p>
          </div>
        </li>
        <li>
          <div class="index">5</div>
          <div class="step_name">
            <p class="title">效果评估</p>
            <p>服务打款客户完成预期效果</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 限时推广 -->
    <div class="time_promote" v-if="promoteData && promoteData.length>0">
      <div class="divider clearfix">
        <div class="border_l"></div>
        <div class="title">
          限时推广
        </div>
        <div class="border_r"></div>
      </div>
      <p class="describe">致力为客户提供高质量的服务和最有价值的渠道</p>
      <ul class="promote_list clearfix">
        <li v-for="(item, index) in promoteData" :key="index">
          <div class="pro_list_t">
            <p class="title" :title="item.title">{{item.title}}</p>
            <p class="desc">{{item.description}}</p>
            <div class="content clearfix">
              <div class="time_warp">
                <div v-if="item.expire_time>0">
                  <p class="time_t">距离活动<span class="end">结束</span>仅剩</p>
                  <p class="date" v-if="item.promote">
                    <span>{{item.promote.day}}</span>天
                    <span>{{item.promote.hour}}</span>时
                    <span>{{item.promote.min}}</span>分
                    <span>{{item.promote.second}}</span>秒
                  </p>
                </div>
                <div v-else>
                  活动已过期
                </div>
              </div>
              <img :src="item.goods.cover_pic" class="pro_img">
            </div>
          </div>
          <div class="pro_list_b">
            <div class="price">
              <p class="current_price">￥<span>{{item.active_price}}</span></p>
              <p class="original_price" v-if="item.active_price">￥{{item.goods.price}}</p>
            </div>
            <a class="buy" :href="`/goods_details/${item.goods.id}.html`" target="_blank">立即购买</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="clearfix"></div>
    <!-- 合作伙伴 -->
    <div class="partner">
      <div class="_center">
        <div class="divider clearfix">
          <div class="border_l"></div>
          <div class="title">
            合作伙伴
          </div>
          <div class="border_r"></div>
        </div>
        <p class="describe">致力为客户实现低成本获客，提高流量转化率，品牌美誉度提升，及内部运营效率</p>
        <div class="partner_wrap">
          <div class="partner_t">
            <span>叮咚营销宝合作伙伴</span>
            <a class="more" href="javascript:;">查看更多 ></a>
          </div>
          <ul class="partner_list">
            <li class="left_bottom" :class="index==5||index==11||index==17?'right':''" v-for="(item, index) in partnerList" :key="index" @mouseenter="mouseenterImg(index)" @mouseleave="mouseleaveImg(index)">
              <img :src="item">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {indexInit} from '~/libs/api';
import indexProduct from '~/components/index-product/index-product';
export default {
  data(){
    return{
      partnerList:[],         //合作伙伴
      advData: [],            //轮播图
      recommendGoodsData: [],    //推荐商品
      promoteData: [],      //限时推广
    }
  },
  head() {
      return {
          title: `叮咚营销宝-网络推广、新媒体营销等网络营销资源和服务担保平台`,
          meta: [
            { hid: 'description', name: 'description', content: '叮咚营销宝-网络推广、新媒体营销等网络营销资源和服务担保平台' }
          ],
          script: [
              {src: 'https://cdn.lubankf.com/IM/js/lb_service.js?accessId=gnHbJ9-O5Zbi2-qKleWhKcYHh8A-6ee9&autoShow=true'}
          ]
      }
  },
  created() {
    this.partnerImg();
    this.promoteCountDown();       //推广倒计时
  },
  async asyncData (context) {
    //首页信息
    // adv	            array	轮播图
    // recommend_goods	array	推荐商品
    // limited_goods	  array	限时推广
    //article_single    object	解决方案
    let [indexInfo] = await Promise.all([
      indexInit()
    ])
    return {
      advData: indexInfo.data.adv,
      recommendGoodsData: indexInfo.data.recommend_goods,
      promoteData: indexInfo.data.limited_goods,
      agentsData: indexInfo.data.agents,
      article_single: indexInfo.data.article_single,
    }
  },
  methods: {
    partnerImg(){
      for(var i = 0; i < 18; i++){
        this.partnerList.push(require(`../assets/image/partner/hzhb_img${i+1}.png`));
      }
    },

    //推广倒计时
    promoteCountDown(){
      this.timer = setInterval(() => {
        let second = '00',
          min = '00',
          hour = '00',
          day = '00';
        if(this.promoteData.length > 0){
          this.promoteData.forEach((v, index) => {
            if(v.expire_time>0){
              v.expire_time = v.expire_time - 1;
              second = parseInt(v.expire_time);  
              if( parseInt(v.expire_time )> 60){  
                
                  second = parseInt(v.expire_time) % 60;  
                  min = parseInt(v.expire_time / 60);  
                    
                  if( min > 60 ){  
                      min = parseInt(v.expire_time / 60) % 60;  
                      hour = parseInt( parseInt(v.expire_time / 60) /60 );  
                
                      if( hour > 24 ){  
                          hour = parseInt( parseInt(v.expire_time / 60) /60 ) % 24;  
                          day = parseInt( parseInt( parseInt(v.expire_time / 60) /60 ) / 24 );  
                      }  
                  }  
              }  
              if(day < 10) day = "0" + Number(day);
              if(hour < 10) hour = "0" + Number(hour);
              if(min < 10) min = "0" + Number(min);
              if(second < 10) second = "0" + Number(second);
              v.promote = {
                day: day,
                hour: hour,
                min: min,
                second: second
              }
              this.$set(this.promoteData, index, v);
            }
          });
        }
      }, 1000);
    },

    //合作伙伴 - 鼠标划入图片
    mouseenterImg(index){
      this.$nextTick(() => {
          this.$set(this.partnerList,index,require(`../assets/image/partner/hzhb_img_bg_${index+1}.png`));
      })
    },

    //合作伙伴 - 鼠标离开图片
    mouseleaveImg(index){
      this.$nextTick(() => {
          this.$set(this.partnerList,index,require(`../assets/image/partner/hzhb_img${index+1}.png`));
      })
    },

  },
  watch: {
    
  },
  components:{
    indexProduct
  },
}
</script>
<style lang="less" scoped>
  @import './index.less';
</style>