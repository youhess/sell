<template>
  <transition name="slide-fade">
    <div class="foodDetail" ref="foodScroll" v-show="flag">
      <div class="foodDetail--wrapper">
        <!-- 详情页第一部风 -->
        <div class="foodDesc--container">
          <!-- button container -->
          <div class="button--container">
            <span class="icon-close" @click="closeView"> </span>
            <img class="icon-share" src="./share.png" alt="" />
            <img class="icon-more" src="./more.png" alt="" />
          </div>
          <!-- 存放图片容器 -->
          <div class="img--container">
            <!-- 想要高和宽度一样做自适应 -->
            <img :src="choisedFood.picture" alt="" />
          </div>
          <!-- 商品详情信息 -->
          <div class="detail--container">
            <div class="detail--content">
              <h3 class="detail--name">
                {{ choisedFood.name }}
              </h3>
              <p class="detail--selling">
                {{ choisedFood.month_saled_content }}
              </p>
              <img v-show="choisedFood.product_label_picture" :src="choisedFood.product_label_picture" alt="认证标志" class="detail--img" />
              <div class="detail--measure">
                <span class="detail--price"> ￥{{ choisedFood.min_price }} </span>
                <span class="detail--unit"> /{{ choisedFood.unit }} </span>
              </div>
            </div>

            <div class="selectedField">
              <div class="Cartcontrol--wrapper" v-show="choisedFood.count > 0">
                <Cartcontrol :good="choisedFood"></Cartcontrol>
              </div>
              <!-- 当商品不存在或者为0的时候选择隐藏 -->
              <div class="detail--choice" v-show="!choisedFood.count || choisedFood.count == 0" @click="addItems(choisedFood)">
                选规格
              </div>
            </div>
          </div>
        </div>
        <!-- 评价页面详情 第二部分 -->
        <div class="foodComments--container" v-if="choisedFood.rating">
          <div class="foodComment--header">
            <div class="foodComment-left">
              <div class="foodComment--title">
                <!-- 访问超过 两个层级 要加上v-if 确定food。rating有值才不会出问题-->
                {{ choisedFood.rating.title }}
              </div>
              <div class="ratio--container">
                (
                {{ choisedFood.rating.like_ratio_desc }}
                <span class="foodComment--ratio">
                  {{ choisedFood.rating.like_ratio }}
                </span>
                )
              </div>
            </div>

            <div class="foodComment--right">
              <div class="totleComment--title">
                {{ choisedFood.rating.snd_title }}
              </div>
              <span class="icon-keyboard_arrow_right"></span>
            </div>
          </div>
          <div class="foodComment--body">
            <ul class="foodComments">
              <li class="foodComment--item" v-for="(comment, index) in choisedFood.rating.comment_list" :key="index">
                <div class="item--left">
                  <!-- 头像 -->
                  <img v-if="comment.user_icon" :src="comment.user_icon" alt="" class="profile" />
                  <img v-if="!comment.user_icon" src="./anonymity.png" alt="" class="profile" />
                </div>
                <div class="item--right">
                  <div class="item--header">
                    <h3 class="item--username">
                      {{ comment.user_name }}
                    </h3>
                    <span class="item--date">
                      {{ comment.comment_time }}
                    </span>
                  </div>
                  <div class="item--body">
                    <p class="item--content">
                      {{ comment.comment_content }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// 导入bscroll
import BScroll from 'better-scroll'
import Cartcontrol from '@/components/Cartcontrol/Cartcontrol.vue'
import Vue from 'vue'
export default {
  data() {
    return {
      flag: false
    }
  },
  props: {
    choisedFood: {
      type: Object,
      default: {}
    }
  },
  methods: {
    // 父组件可以调用子组件
    showView() {
      this.flag = true

      this.$nextTick(() => {
        if (!this.foodScroll) {
          this.foodScroll = new BScroll(this.$refs.foodScroll, {
            click: true
          })
        } else {
          this.foodScroll.refresh()
        }
      })
    },
    closeView() {
      this.flag = false
    },
    addItems(item) {
      if (!item.count) {
        Vue.set(this.choisedFood, 'count', 1)
      } else {
        item.count += 1
      }
    }
  },
  components: {
    Cartcontrol,
    BScroll
  }
}
</script>

<style scoped>
.foodDetail {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 51px;
  width: 100%;
  background-color: #f4f4f4;
}

.foodDesc--container {
  position: relative;
  background-color: #fff;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
}

.button--container {
  width: 100%;
  display: flex;
  justify-content: end;
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px 10px 0 10px;
  box-sizing: border-box;
  gap: 10px;
  z-index: 100;
}

.button--container .icon-close {
  width: 30px;
  height: 30px;
  background-color: #7f7f7f;
  display: inline-block;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  font-size: 17px;
  color: #fff;
  margin-right: auto;
}
.button--container .icon-share,
.button--container .icon-more {
  width: 30px;
  height: 30px;
}

.img--container {
  position: relative;
  width: 100%;
  height: 0;
  /* 设置padding 100% 盒子高度会根据盒子宽度计算 */
  padding-top: 100%;
}

.img--container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.detail--container {
  display: flex;
  justify-content: space-between;
  padding: 0 15px 15px 15px;
}
.detail--content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
}
.detail--name {
  color: #333;
  font-size: 18px;
  font-weight: bold;
}
.detail--selling {
  font-size: 13px;
  color: #9d9d9d;
}
.detail--img {
  width: 70px;
}
.selectedField {
  align-self: end;
}
.detail--price {
  color: #fb4e44;
  font-size: 18px;
  font-weight: bold;
}
.detail--unit {
  font-size: 11px;
  color: #9d9d9d;
}
.detail--choice {
  background-color: #ffd161;
  color: black;
  font-size: 12px;
  padding: 10px 15px;
  border-radius: 15px;
}
.foodComments--container {
  margin-top: 10px;
  background-color: #fff;
}
.foodComment--header {
  display: flex;
  height: 45px;
  padding: 0 16px;
  justify-content: space-between;
  align-items: center;
}
.foodComment-left {
  display: flex;
}
.item--right{
  flex: 1;
  
}
.foodComment--title {
  font-size: 13px;
}
.ratio--container {
  font-size: 11px;
}
.foodComment--ratio {
  color: red;
}
.foodComment--right {
  display: flex;
  color: #999999;
}
.totleComment--title {
  font-size: 13px;
}
.foodComment--item {
  display: flex;
  padding: 15px 15px 15px 5px;
  border-top: 1px solid #e4e4e4 ;
}
.item--left {
  flex: 0 0 55px;
  text-align: center;
}
.item--header {
  display: flex;
  justify-content: space-between;
}
.item--username {
  font-size: 12px;
  margin-bottom: 17px;
}
.item--date {
  font-size: 10px;
  color: #666;
}
.item--content {
  font-size: 13px;
  line-height: 19px;
}
.profile {
  width: 40px;
  border-radius: 50%;
}
</style>
