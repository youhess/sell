<template>
<div class="shopcart--container">
     <div class="shopcart " :class="{ heightlight: totalCount > 0 }">
    <div class="shopcart-left">
      <!-- 左侧图标 -->
      <div class="logo-wrapper" :class="{ heightlight: totalCount > 0 }" @click="toggleList">
        <span class="icon-shopping_cart" :class="{ heightlight: totalCount > 0 }"> </span>
        <i class="icon-num" v-show="totalCount">{{ totalCount }}</i>
      </div>
      <!-- 详细描述价格 运费层 -->
      <div class="desc-warpper">
        <p class="total-price" v-show="totalPrice">￥{{ totalPrice }}</p>
        <p class="tip">另需{{ poiInfo.shipping_fee_tip }}</p>
      </div>
    </div>
    <!-- 购物测右侧 -->
    <div class="shopcart-right" :class="{ heightlight: totalCount > 0 }">
      {{ payStr }}
    </div>

    <!-- 弹出购物车 -->
    <div class="shopcart-list" v-show="listShow" :class="{ show: listShow }">
      <div class="list-top" v-if="poiInfo.discounts2">
        {{ poiInfo.discounts2[0].info }}
      </div>
      <div class="list-header">
        <h3 class="title">1号口袋</h3>
        <div class="empty">
          <img src="./ash_bin.png" alt="" />
          <span class="empty-name" @click="emptySelected">清空购物车</span>
        </div>
      </div>
      <div class="list-content" ref="listContent">
        <ul>
          <li class="selecteddItem" v-for="(item, index) in selectedFoods" :key="index">
            <div class="selecteddItem-warpper">
              <div class="desc-left">
                <p class="desc-name">
                  {{ item.name }}
                </p>
                <p class="desc-unit" v-show="!item.description">
                  {{ item.unit }}
                </p>
                <p class="desc-desc">
                  {{ item.description }}
                </p>
              </div>
              <div class="desc-right">
                <span class="desc-price"> ￥{{ item.min_price }} </span>
              </div>
            </div>
            <div class="cartcontral-wrapper">
              <Cartcontrol :good="item"></Cartcontrol>
            </div>
          </li>
        </ul>
      </div>
      <div class="list-bottom"></div>
    </div>
    

    
    </div>
       <div class="shopcart-mask" v-show="listShow" @click="toggleList"></div>
</div>
 
</template>

<script>
// 导入bscroll
import BScroll from 'better-scroll'
import Cartcontrol from '@/components/Cartcontrol/Cartcontrol.vue'
export default {
  data() {
    return {
      fold: true
    }
  },
  props: {
    poiInfo: {
      type: Object,
      default: {}
    },
    selectedFoods: {
      type: Array,
      // 数组的返回写法不同
      default() {
        return []
      }
    }
  },
  methods: {
    toggleList() {
      if (!this.totalCount) {
        // 个数为0
        return
      }
      this.fold = !this.fold
    },
    emptySelected(){
        this.selectedFoods.forEach((item)=>{
            item.count = 0;
        })
    }
  },
  computed: {
    // 总个数
    totalCount() {
      let num = 0
      this.selectedFoods.forEach(food => {
        num += food.count
      })
      return num
    },
    // 总金额
    totalPrice() {
      let total = 0
      this.selectedFoods.forEach(food => {
        total += food.count * food.min_price
      })
      return total
    },
    payStr() {
      if (this.totalCount > 0) {
        return '去结算'
      } else {
        return this.poiInfo.min_price_tip
      }
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true
        // 列表是不显示的
        return false
      }
      // 这一步为了让fold被点击中后 初始值为隐藏
      let show = !this.fold

      if (show) {
        this.$nextTick(() => {
          // 添加一个shopScroll的对象
          if (!this.shopScroll) {
            this.shopScroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.shopScroll.refresh()
          }
        })
      }
      return show
    }
  },
  components: {
    Cartcontrol,
    BScroll
  }
}
</script>

<style scoped>
.shopcart {
  width: 100%;
  height: 51px;
  background-color: #514f4f;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: 99;
}
.shopcart.heightlight {
  background-color: #4f4e4e;
}
.shopcart-left {
  flex: 1;
  display: flex;
}
.shopcart-right {
  flex: 0 0 110px;
  height: 100%;
  line-height: 51px;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  color: #b2b1b0;
}
.shopcart-right.heightlight {
  background-color: #ffd161;
  color: #212121;
}
.logo-wrapper {
  width: 50px;
  height: 50px;
  background-color: #666666;
  border-radius: 50%;
  text-align: center;
  position: relative;
  bottom: 14px;
  margin-left: 10px;
}
.logo-wrapper.heightlight {
  background-color: #ffd161;
}
.logo-wrapper .icon-shopping_cart.heightlight {
  color: #333;
}
.logo-wrapper span {
  font-size: 28px;
  line-height: 50px;
  color: #c4c4c4;
}
.desc-warpper {
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  /* justify-content: space-evenly; */
}
.desc-warpper .tip {
  font-size: 12px;
  color: #bab9b9;
}
.desc-warpper .total-price {
  font-size: 20px;
  color: #fff;
  line-height: 20px;
}

.icon-num {
  position: absolute;
  width: 15px;
  height: 15px;
  font-size: 8px;
  line-height: 15px;
  border-radius: 50%;
  color: #fff;
  background-color: red;
  top: 0;
  right: 0;
}
.shopcart-list {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
}
.shopcart-list.show {
  /* 显示全部 */
  transform: translateY(-100%);
}
.list-top {
  background-color: #f3e6c6;
  height: 30px;
  font-size: 11px;
  color: #53504b;
  line-height: 30px;
  text-align: center;
}
.list-header {
  display: flex;
  justify-content: space-between;
  height: 30px;
  align-items: center;
  border-left: 5px solid #53c123;
  background-color: #f4f4f4;
}
.list-header .title {
  font-size: 11px;
  padding-left: 6px;
}
.shopcart-mask{
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(7,17,27,0.6);
    z-index: 98;
}

.empty {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-right: 10px;
}
.empty img {
  width: 13px;
}
.empty .empty-name {
  font-size: 12px;
}
.list-content {
  max-height: 200px;
  overflow: hidden;
  background-color: #fff;
}
.list-content .selecteddItem {
  height: 60px;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 12px 0 12px;
  border-bottom: 1px solid #f0f0f0;
}
.selecteddItem-warpper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 34px;
  flex: 1;
}
.desc-left {
  flex: 0 0 128px;
}
.desc-left .desc-name {
  font-size: 18px;
  /* font-weight: 600; */
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.desc-left .desc-unit,
.desc-desc {
  font-size: 14px;
  color: #b4b4b4;
  margin-top: 8px;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
