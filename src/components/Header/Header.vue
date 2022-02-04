<template>
  <header class="header">
    <!-- 头顶样式 -->
    <div class="top-wrapper">
      <div class="back-wrapper">
        <span class="icon-arrow_lift"></span>
      </div>
      <form class="search-wrapper">
        <span class="search-icon"></span>
        <input type="text" class="search-bar" placeholder="搜索店内商品" />
      </form>
      <div class="more-wrapper">
        <a href="#" class="spelling-bt">拼单</a>
        <div class="more-bt">
          <i class="more-point"></i>
          <i class="more-point"></i>
          <i class="more-point"></i>
        </div>
      </div>
    </div>
    <!-- 主题内容 -->
  <div class="content-wrapper">
    <div class="content-icon" :style="contentIcon">
      <!-- <img :src="poiInfo.pic_url" alt=""> -->
    </div>
    <div class="content-name">
      <h3>
          {{poiInfo.name}}
      </h3>
    </div>
    <div class="content-collect" >
      <img class="collect-icon" src="./star.png" alt="收藏">
      <span class="collect-name">
        收藏
      </span>
    </div>
  </div>
  <!-- 公告内容 -->
  <div class="bulletin-wrapper">
    <img v-if="poiInfo.discounts2"  class="bulletin-icon" :src="poiInfo.discounts2[0].icon_url" alt="">
    <span v-if="poiInfo.discounts2" class="bulletin-content">{{poiInfo.discounts2[0].info}}</span>
    <div v-if="poiInfo.discounts2" class="bulletin-detail" @click="toggleBulliten">
      <div class="bulletin-detail-content">
         {{poiInfo.discounts2.length}}个活动
      </div>
        <span class="icon-keyboard_arrow_right bulletin-arrow"></span>
    </div>
  </div>
  <!-- 背景 -->
  <div class="bg-wrapper" :style="bgImg">
    <!-- <img :src="poiInfo.head_pic_url" alt=""> -->
  </div>
 <transition name="specific-animation">
  <!-- 公告详情 -->
  <div class="bulletin-specific" v-show="isShow">
    <div class="specific-container" >
      <div class="specific-content" :style="specificBg">
          <div class="specific-icon" :style="contentIcon">
          </div>
          <div class="specific-title">
            {{poiInfo.name}}
          </div>
          <!-- 评价稍后 -->
         
          <div class="score">
             <Star class="score_icons" :score="poiInfo.wm_poi_score" ></Star>
            <span class="score_content">{{poiInfo.wm_poi_score}}</span>
          </div>
          <p class="specific-feeDemand">
            {{poiInfo.shipping_fee_tip}}<i>|</i>
            {{poiInfo.min_price_tip}}<i>|</i>
            {{poiInfo.delivery_time_tip}}
          </p>
          <p class="specific-deliveryTime">
           配送时间： {{poiInfo.shipping_time}}
          </p >
          <p class="specific-spliter">
          <div class="discounts">
           
               <img v-if="poiInfo.discounts2"  class="discounts-icon" :src="poiInfo.discounts2[0].icon_url" alt="">
               <span v-if="poiInfo.discounts2" class="discounts-content">{{poiInfo.discounts2[0].info}}</span>
            
          </div>
      </div>
      <div class="specific-close" @click="toggleBulliten">
        <span class="icon-close"></span>
      </div>
    </div>
  </div>
</transition>
  </header>
</template>

<script>
import Star from '@/components/Star/Star.vue'
export default {
  data(){
    return {
      isShow:false
    }
  },
  props: {
    poiInfo: {
      type: Object,
      default: {}
    }
  },
  computed:{
    bgImg(){
      return `background-image:url(${this.poiInfo.head_pic_url})`;
    },
    contentIcon(){
      return `background-image:url(${this.poiInfo.pic_url})`;
    },
    specificBg(){
       return `background-image:url(${this.poiInfo.poi_back_pic_url})`;
    }
  },
  methods:{
    toggleBulliten(){
      this.isShow = !this.isShow;
    }
  },
  components:{
    Star
  }
}
</script>

<style>
/* 导入字体图标 */
@import url("../../common/styles/icon.css");
.header {
  width: 100%;
  height: 160px;
  padding-top: 20px;
  position: relative;
}
.top-wrapper{
  position: relative;
  
}
.back-wrapper{
    width:50px ;
    height: 30px;
    position: absolute;
    top: 0;
    left: 0;
    line-height: 30px;
    text-align: center;
    color: #fff;
}

.more-wrapper{
    width: 100px;
     height: 30px;
     position:absolute;
     top: 0;
     right: 0;
     /* background-color: #666; */
     display: flex;
     /* flex: 1; */
     justify-content: space-evenly;
     align-items: center;
     /* padding:7px 15px 0 24px;
     box-sizing: border-box; */
}
.bulletin-wrapper{
  display: flex;
  align-items: center;
  margin-top: 11px;
}
.top-wrapper .search-wrapper{
  width: 100%;
  height: 30px;
  padding: 0 100px 0 50px;
  /* 设置盒子从边框计算 */
  box-sizing: border-box;
}
.top-wrapper .search-icon{
  width: 30px;
  height:30px;
  background: url("./titans_h5_search@2x.png") no-repeat 11px center;
  background-size: 13px 13px;
  position: absolute;
}
.top-wrapper .search-bar{
  width: 100%;
  height: 30px;
  border: none;
   /* 设置盒子从边框计算 */
  box-sizing: border-box;
  background-color: #cdcdcc;
  border-radius: 25px;
  padding-left: 30px;
  /* 去除选中框效果 */
  outline: none;
}
.more-wrapper .spelling-bt{
  width: 30px;
  height: 12px;
  font-size: 12px ;
  /* line-height: 12px; */
  text-align: center;
  color: #fff;
  text-decoration: none;
  border: 2px #fff solid ;
  padding: 2.5px 2.5px;

 
}
.more-wrapper .more-bt{
  display: flex;
  gap: 1.5px;

}

.more-wrapper .more-point{
  
  width: 4px;
  height: 4px;
  border: 1px #fff solid;
  border-radius: 15px;
}
.header .bg-wrapper{
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
  left: 0;
  overflow: hidden;
  z-index: -1;
   background-size: 100% 100%;
  background-position: center;
}


.content-wrapper{
  display: flex;
  /* justify-content: space-evenly; */
  align-items: center;
  margin-top: 17px;
}
.content-icon{
  width: 60px;
  height: 60px;
  overflow: hidden;
  background-size: 140% 100%;
  background-position: center;
  border-radius: 5px;
  margin-left: 10px;
}

.content-name{
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-left:15px ;
}
.content-collect{
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px 0 auto;
  gap: 5px;
  /* justify-content: space-around; */
}
.collect-icon{
    width: 20px;
    height: 20px;
}
.bulletin-icon{
  width: 20px;
  height: 20px;
   margin-left: 10px;
}
.bulletin-content{
  color: #fff;
  font-size: 11px;
  margin-left: 13px;
}
.bulletin-detail{
  color: #fff;
  font-size: 11px;
  margin:0 10px 0 auto;
  display: flex;
  align-items: center;
  
}
.bulletin-arrow{
 font-size: 15px;
}

.bulletin-specific{
  width: 100%;
  height: 100vh;
  position: absolute;
  background: rgba(98,98,98,0.8);
  top: 0;
  left: 0;
  z-index: 1;
}
.specific-icon {
  width: 70px;
  height: 70px;
  overflow: hidden;
  background-size: 140% 100%;
  background-position: center;
  border-radius: 5px;
}
.specific-container{
   width: 100%;
  height: 100vh;
  padding:43px 20px 125px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

}
.specific-content{
 width: 100%;
 height: 100%;
 border-radius: 10px;
 background-size: 100% 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
}
.specific-icon{
  margin-top: 40px;
}
.specific-title{
  margin-top: 13px;
  font-size: 15px;
  color: #fff;
}
.specific-feeDemand{
  margin-top: 8px;
  color: #bababc;
  font-size: 11px;
}
.specific-deliveryTime{
  margin-top: 13px;
  color: #bababc;
  font-size: 9px;
}
.specific-spliter{
  width: 95%;
  height: 1px;
  background-color: #bababc;
  margin-top: 21px;
}
.discounts{
   margin-top: 20px;
   display: flex;
   align-items: center;
   padding: 0 20px;
}
.discounts .discounts-icon {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}
.discounts .discounts-content{
  color: #fff;
  font-size: 11px;
}
.specific-close{
  width: 40px;
  height: 40px;
  background-color: rgba(108,108,108,0.7);
  text-align: center;
  line-height: 40px;
  border: 1px solid rgba(140,140,140,0.9);
  border-radius: 50px;
  margin-top: 20px;
}
.specific-close span{
  font-size: 15px;
  color: #fff;
 
}
.score{
  color: #fff;
  display: flex;
  gap: 6px;
  margin-top: 6px;
  align-items:center;
}
.score_content{
  font-size: 10px;
}

/* animation */
.specific-animation-enter-active, .specific-animation-leave-active {
  transition: opacity .3s;
}
.specific-animation-enter, .specific-animation-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
