<template>
  <section class="seller" ref="viewScroll">
    <!-- s商家滚动页面 -->

    <div class="seller--wrapper">
      <!-- 商家详情介绍 -->
      <div class="seller--detail">
        <div class="detail--header">
          <div class="header--left"></div>
          <div class="header--body">
            {{ seller.address }}
          </div>
          <div class="header--right"></div>
        </div>
        <div class="detail--body" ref="picScroll">
          <div class="img--wrapper" v-if="seller.poi_env">
            <img v-for="(imgUrl, index) in seller.poi_env.thumbnails_url_list" :key="index" :src="imgUrl" alt="商家图片" class="detail--img" />
          </div>
        </div>
        <div class="detail--footer">
          <div class="footer--left"></div>
          <div class="footer--body">
            查看食品安全档案
          </div>
          <div class="footer--right"></div>
        </div>
      </div>
      <!-- 商家配速介绍板块 -->
      <div class="seller--delivery">
        <div class="delivery--serve">
          <div class="serve--icon"></div>
          <div class="delivery--tip">配送服务：{{ seller.app_delivery_tip }}</div>
        </div>

        <div class="delivery--time">
          <div class="time--icon"></div>
          <div class="delivery--tip">配送时间：{{ seller.shipping_time }}</div>
        </div>
      </div>
      <!-- 商家服务板块 -->
      <div class="seller--serve">
        <div class="serve--header">
          <div class="serve--header-left"></div>
          <div class="serve--header-detail">
            商家服务
          </div>
          <div class="serve--header-right" v-if="seller.poi_service">
            <div class="poi--service" v-for="(item,index) in seller.poi_service" :key="index">
              <div class="check--img" :style="checkiconBg(item.icon)"></div>
              <span>
                {{ item.content}}
              </span>
            </div>
          </div>
        </div>
        <div class="serve--discount">
          <div class="discount-wrapper" v-for="(item,index) in seller.discounts2" :key="index">
          <div class="discount--icon" :style="checkiconBg(item.icon_url)" ></div>
          <div class="discount--content">{{item.info}}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// 导入bscroll
import BScroll from 'better-scroll'

export default {
  data() {
    return {
      seller: {}
    }
  },
  created() {
    const that = this
    this.$axios
      .get('/api/seller')
      .then(function(response) {
        // handle success
        const dataSource = response.data

        if (dataSource.code == 0) {
          that.seller = dataSource.data
           // 调用nextTick方法,就是为了确保将bettre-scroll的初始化放置在异步请求完成之后。 Vue.js 提供了我们一个获取 DOM 对象的接口—— vm.nextTick方法,就是为了确保将bettre−scroll的初始化放置在异步请求完成之后。
          that.$nextTick(() => {
            if (!that.picScroll) {
              that.picScroll = new BScroll(that.$refs.picScroll, {
                scrollX: true,
                probeType: 3 // listening scroll event
              })
            } else {
              that.picScroll.refresh()
            }

            if (!that.viewScroll) {
              that.viewScroll = new BScroll(that.$refs.viewScroll, {
                 probeType: 3,
                  click: true
              })
            } else {
              that.viewScroll.refresh()
            }
          })
        }
      })
      .catch(function(error) {
        // handle error
        console.log(error)
      })
      .then(function() {
        // always executed
      })
  },
  methods:{
    checkiconBg(url){
      return `background-image: url(${url})`;
    }
  },
  components:{
    BScroll
  }
}
</script>

<style scoped>
.seller {
  position: absolute;
  width: 100%;
  left: 0;
  top: 220px;
  bottom: 0;
  overflow: hidden;
  background-color: #f4f4f4;
}
.seller--detail {
  background-color: #fff;
  margin-top: 15px;
}
.detail--header {
  height: 60px;
  display: flex;
  font-size: 15px;
  border-bottom: 1px solid #f0f0f0;
  justify-content: space-between;
}
.header--body {
  align-self: center;
}
.header--left {
  background: url('./address.png') no-repeat center;
  background-size: 16px 20px;
  flex: 0 0 45px;
}
.header--right {
  background: url('./phone.png') no-repeat center;
  background-size: 20px 20px;
  flex: 0 0 60px;
}
.detail--body {
  height: 100px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
}
.img--wrapper {
  display: flex;
}
.detail--img {
  width: 95px;
  height: 75px;
  flex: 1;
  margin: 0 5px;
}
/* fotter---------------- */
.detail--footer {
  height: 45px;
  display: flex;
  justify-content: space-between;
}
.footer--left {
  background: url('./safety.png') no-repeat center;
  background-size: 18px 20px;
  flex: 0 0 45px;
}
.footer--right {
  background: url('./icon_arrow_address_bar_brown@2x.png') no-repeat center;
  background-size: 7px 10px;
  flex: 0 0 60px;
}
.footer--body {
  align-self: center;
  font-size: 15px;
  flex: 1;
}
/* ====================== */
.seller--delivery {
  background-color: #fff;
  margin-top: 15px;
  font-size: 15px;
}
.delivery--serve {
  display: flex;
  height: 45px;
}
.delivery--time {
  display: flex;
  height: 65px;
}
.serve--icon {
  background: url('./delivery.png') no-repeat center;
  background-size: 18px 20px;
  flex: 0 0 45px;
}
.time--icon {
  background: url('./ic_smsverification_waiting@2x.png') no-repeat center;
  background-size: 20px 20px;
  flex: 0 0 45px;
}
.delivery--tip {
  flex: 1;
  align-self: center;
  line-height: 20px;
}
/* ------------------------ */
.seller--serve{
   background-color: #fff;
   margin-top: 15px;
   font-size: 15px;
   line-height: 16px;
}
.discount-wrapper,
.serve--header {
  display: flex;
  height: 50px;
 
}
.discount-wrapper{
  align-items: center;
}
.poi--service{
  display: flex;
  gap: 10px;
}
.serve--header-left {
  background: url('./icon_register_radio_on@2x.png') no-repeat center;
  background-size: 20px 20px;
  flex: 0 0 45px;
}
.serve--header-detail {
  align-self: center;
}
.check--img{
  width: 15px;
  height: 15px;
  background-size: 15px 15px;
  background-repeat: no-repeat;

  
}
.serve--header-right{
  align-self: center;
  margin-left: 12px;
}
.discount--icon{
  flex: 0 0 45px;

   width: 15px;
  height: 15px;
  background-position: center;
  background-size: 15px 15px;
  background-repeat: no-repeat;
}
.discount--content{
  padding-right: 5px;
}
</style>
