<template>
  <section class="goods">
    <!-- 分类列表 -->
    <div class="menuNav__container" ref="menuScroll">
      <ul class="menuNav__content">
        <li class="menuNav__item" :class="{'current':currentIndex===0}" @click="selectMenu(0)">
          <img class="menuNav__item-icon" v-if="container.tag_icon" :src="container.tag_icon" alt="专场" />
          <p class="menuNav__item-content">
            {{ container.tag_name }}
          </p>

        </li>
        <li class="menuNav__item"  v-for="(good, index) in goods" :key="index" :class="{'current':currentIndex===index+1}" @click="selectMenu(index+1)" >
          <img class="menuNav__item-icon" v-if="good.icon" :src="good.icon" alt="货物分类" />
          <p class="menuNav__item-content">
            {{ good.name }}
          </p>
          <i class="num" v-show="calculateCount(good.spus)">{{calculateCount(good.spus)}}</i>
        </li>
      </ul>
    </div>
<!-- 商品列表 -->
    <div class="foods__container" ref="foodScroll">
      <ul class="food__content ">
        <li class="food__recommended food-list-hook">
          <div class="food__recommended_list" v-for="(item, index) in container.operation_source_list" :key="index">
            <img class="food__recommended_img" :src="item.pic_url" alt="专场" />
          </div>
        </li>
        <li class="food__type food-list-hook" v-for="(good, index) in goods" :key="index">
          <h3 class="item__title">
            {{ good.name }}
          </h3>
          <!-- 具体的商品 -->
          <ul>
            <li class="food__tags " v-for="(item, index) in good.spus" :key="index" @click="showDetail(item)" >
              <div class="food__image" :style="getFoodImg(item.picture)"></div>
              <div class="food__detail">
                <h3 class="food__title">
                  {{ item.name }}
                </h3>
                <p class="food__desc" v-if="item.description">
                  {{ item.description }}
                </p>
                <div class="food__selling">
                  <span class="food__saled">{{ item.month_saled_content }}</span>
                  <span class="food__praised">{{ item.praise_content }}</span>
                </div>
                <img v-if="item.product_label_picture" :src="item.product_label_picture" alt="推荐" class="food__labled" />
                <p class="food__price">
                  <span class="food__price-text"> ￥{{ item.min_price }} </span>
                  <span class="food__price-measurement"> /{{ item.unit }} </span>
                </p>
              </div>
              <div class="cartcontrol-wrapper">
                 <Cartcontrol :good="item"></Cartcontrol>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
<!-- 购物车 -->
    <Shopcart :poiInfo="poiInfo" :selectedFoods ="selectedFoods"></Shopcart>
    <!-- 商品详情 -->
    <FoodDetail :choisedFood = "choisedFood"  ref="foodView"  ></FoodDetail>
  </section>
</template>

<script>
// 导入bscroll
import BScroll from 'better-scroll'
import Shopcart from '@/components/Shopcart/Shopcart.vue'
import Cartcontrol from '@/components/Cartcontrol/Cartcontrol.vue'
import FoodDetail from '@/components/FoodDetail/FoodDetail.vue'

export default {
  data() {
    return {
      container: {},
      goods: [],
      poiInfo:{},
      listHeight: [],
      scorllY: 0,
      menuScroll:{},
      foodScroll:{},
      choisedFood:{}
    }
  },
  props: {},
  methods: {
    getFoodImg(picUrl) {
      return `background-image:url("${picUrl}")`
    },
    init() {
      this.menuScroll = new BScroll(this.$refs.menuScroll,{
        click:true
      })
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        probeType: 3, //必须指定probeType为3时，才会派发scroll事件
        click:true

      });

      this.foodScroll.on('scroll', pos => {
        // console.log(pos.y)
        this.scorllY = Math.abs(Math.round(pos.y));
      })
    },
    calculateLocation() {
      let locationArr = this.$refs.foodScroll.getElementsByClassName('food-list-hook')
      // console.log(locationArr);
      let height = 0

      this.listHeight.push(height)

      for (let i = 0; i < locationArr.length; i++) {
        let item = locationArr[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
      // console.log(this.listHeight)
    },
    selectMenu(index){
// console.log(index);
    let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
    let el = foodlist[index]
    this.foodScroll.scrollToElement(el,250);
    },
    calculateCount(spus){
      let count = 0;
      spus.forEach((food)=>{
        if(food.count > 0){
          count += food.count;
        }
      })
      return count;
    },
    showDetail(food){
      this.choisedFood = food;
      // 显示详情页面 
      this.$refs.foodView.showView();
    }
  },
  created() {
    // Make a request for a user with a given ID
    const that = this
    this.$axios
      .get('/api/goods')
      .then(function(response) {
        // handle success
        const dataSource = response.data

        if (dataSource.code == 0) {
          that.container = dataSource.data.container_operation_source
          that.goods = dataSource.data.food_spu_tags
          that.poiInfo = dataSource.data.poi_info
          // 调用nextTick方法,就是为了确保将bettre-scroll的初始化放置在异步请求完成之后。 Vue.js 提供了我们一个获取 DOM 对象的接口—— vm.nextTick方法,就是为了确保将bettre−scroll的初始化放置在异步请求完成之后。
          that.$nextTick(() => {
            that.init()

            that.calculateLocation()
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
  computed:{
    currentIndex(){
      // 根据右侧的滚动位置，确定对应的索引下标
      for(let i = 0 ;i<this.listHeight.length;i++){
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i+1];
      // 测试在上述区间中 当height2不存在
      if(!height2||(this.scorllY >= height1 && this.scorllY <= height2)){
        return i;
      }

      }
    },
    selectedFoods(){
      let foods = [];
      this.goods.forEach((good)=>{
        good.spus.forEach((item)=>{
          if(item.count>0){
            foods.push(item);
          }
        
        })
      })
      return foods;
    }
  },
  components:{
    Shopcart,
    Cartcontrol,
    FoodDetail
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  position: absolute;
  width: 100%;
  top: 220px;
  bottom: 50px;
  /* background: #bababc; */
  overflow: hidden;
}
/* 
flex:flex-grow flex-shrink flex-basis;
默认 flex:0 1 auto

*/

.menuNav__container {
  flex: 0 0 85px;
  background-color: #f4f4f4;
}
.foods__container {
  flex: 1;
  /* background-color: red; */
}
.menuNav__item {
  padding: 15px 25px 15px 10px;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  align-items: center;
  gap: 3px;
  position: relative;
}
.menuNav__item-content {
  font-size: 13px;
  color: #333;
  line-height: 17px;
  /*  */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.menuNav__item-icon {
  width: 15px;
  height: 15px;
}
.food__recommended {
  /* img没有设置高度但是出来了 */
  /* width: 100%; */
  padding: 11px 11px 0 11px;
  border-bottom: 1px solid #e4e4e4;
}
.food__recommended_img {
  width: 100%;
  margin-bottom: 11px;
  border-radius: 5px;
}
.food__type {
  padding: 11px;
}
.item__title {
  font-size: 13px;
  height: 13px;
  background: url('btn_yellow_highlighted@2x.png') no-repeat;
  /* background-position: 0 0px; */
  background-size: 2px 13px;
  padding-left: 7px;
  margin-bottom: 12px;
}

.food__tags {
  display: flex;
  position: relative;
  margin-bottom: 25px;
  align-items: center;
}
.food__image {
  flex: 0 0 63px;
  background-position: center;
  background-size: 120% 100%;
  background-repeat: no-repeat;
  margin-right: 11px;
  height: 67px;
}
.food__detail {
  flex: 1;
}
.food__title {
  color: #333;
  font-size: 16px;
  line-height: 21px;
  font-weight: bold;
}

.food__selling,
.food__price-measurement,
.food__desc {
  font-size: 10px;
  color: #bfbfbf;
  margin-top: 10px;
}
.food__desc {
  line-height: 15px;
  /* 省略 */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.food__labled {
  width: 60px;
  margin-top: 5px;
}
.food__price {
  margin-top: 8px;
}
.food__price-text {
  color: #fb4e44;
  font-size: 15px;
  font-weight: bold;
}
.current{
  background: #fff;
}
.cartcontrol-wrapper{
  position: absolute;
  right: 0;
  bottom: 0;
}
.num{
  position: absolute;
        width: 15px;
        height: 15px;
        font-size: 8px;
        line-height: 15px;
        text-align: center;
        border-radius: 50%;
        color: #fff;
        background-color: red;
        top: 5px;
        right: 8px;
}
</style>
