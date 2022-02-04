<template>
  <section class="ratings" ref="Scroll">
    <div class="rating--wrapper">
      <!-- 评价header -->
      <div class="rating--header flex">
        <div class="header--left flex">
          <div class="commentScore--wrapper">
            <h3 class="commentScore--points">
              {{ ratings.comment_score }}
            </h3>
            <span class="commentScore--text">
              商家评分
            </span>
          </div>
          <div class="totalScore--wrapper">
            <div class="tasteScore--wrapper flex">
              <span class="score--text">
                口味
              </span>
              <div class="star--wrapper">
                <Star :score="ratings.food_score"></Star>
              </div>
              <span class="score--point">
                {{ ratings.food_score }}
              </span>
            </div>
            <div class="packScore--wrapper flex">
              <span class="score--text">
                包装
              </span>
              <div class="star--wrapper">
                <Star :score="ratings.pack_score"></Star>
              </div>
              <span class="score--point">
                {{ ratings.pack_score }}
              </span>
            </div>
          </div>
        </div>
        <div class="header--right">
          <div class="deliveryScore--wrapper">
            <h3 class="deliveryScore--points">
              {{ ratings.delivery_score }}
            </h3>
            <span class="deliveryScore--text">
              配送评分
            </span>
          </div>
        </div>
      </div>
      <!-- 评价body -->
      <div class="rating--body">
        <div class="body--header" v-if="ratings.tab">
          <ul class="header--nav">
            <li class="nav--item" @click="selectItem(2)" :class="{ active: item == 2 }">{{ ratings.tab[0].comment_score_title }}</li>
            <li class="nav--item" @click="selectItem(1)" :class="{ active: item == 1 }">{{ ratings.tab[1].comment_score_title }}</li>
            <li class="nav--item" @click="selectItem(0)" :class="{ active: item == 0 }">
              <img src="./icon_sub_tab_dp_normal@2x.png" alt="" class="item--img" v-show="!item == 0" />
              <img src="./icon_sub_tab_dp_highlighted@2x.png" alt="" class="item--img" v-show="item == 0" />
              {{ ratings.tab[2].comment_score_title }}
            </li>
          </ul>
        </div>
        <div class="body--features">
          <ul class="features--container">
            <li class="features--item" v-for="(label, index) in ratings.labels" :key="index" :class="{ heightlight: label.label_star < 5 }">
              <span class="item--name">{{ label.content }}</span>
              <span class="item--num">{{ label.label_count }}</span>
            </li>
          </ul>
        </div>
        <div class="body--comments">
          <ul class="foodComments">
            <li class="foodComment--item" v-for="(comment, index) in selectComments" :key="index">
              <div class="item--left">
                <!-- 头像 -->
                <img v-if="comment.user_pic_url" :src="comment.user_pic_url" alt="" class="profile" />
                <img v-if="!comment.user_pic_url" src="./anonymity.png" alt="" class="profile" />
              </div>
              <div class="item--right">
                <div class="item--header">
                  <h3 class="item--username">
                    {{ comment.user_name }}
                  </h3>
                  <span class="item--date">
                    {{ formatDate(comment.comment_time) }}
                  </span>
                </div>
                <div class="starWrapper">
                  <span>评分</span>
                  <Star :score="comment.order_comment_score"></Star>
                </div>
                <div class="item--body">
                  <p class="item--content" v-html="commentStr(comment.comment)"></p>
                </div>
                <!-- 用length减小开销 -->
                <div class="item--photos" v-if="comment.comment_pics.length">
                  <img class="item--photo" v-for="(item,index) in comment.comment_pics " :key="index" :src="item.url" alt="">
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// 导入bscroll
import BScroll from 'better-scroll'
import Star from '@/components/Star/Star.vue'

const ALL = 2
const PIC = 1
const COM = 0

export default {
  data() {
    return {
      ratings: {},
      item: ALL
    }
  },
  created() {
    // 获取数据
    const that = this
    this.$axios
      .get('/api/ratings')
      .then(function(response) {
        // handle success
        const dataSource = response.data

        if (dataSource.code == 0) {
          that.ratings = dataSource.data
          // 调用nextTick方法,就是为了确保将bettre-scroll的初始化放置在异步请求完成之后。 Vue.js 提供了我们一个获取 DOM 对象的接口—— vm.nextTick方法,就是为了确保将bettre−scroll的初始化放置在异步请求完成之后。
          that.$nextTick(() => {
            if (!that.Scroll) {
              that.Scroll = new BScroll(that.$refs.Scroll, {
                click: true
              })
            } else {
              that.Scroll.refresh()
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
  components: {
    Star,
    BScroll
  },
  computed: {
    // 如果需要使用的对象数组是从中取值 可以用computed
    selectComments() {
      if (this.item == ALL) {
        return this.ratings.comments
      } else if (this.item == PIC) {
        let arr = []
        this.ratings.comments.forEach(comment => {
          // length有长度表示有数据
          if (comment.comment_pics.length) {
            arr.push(comment)
            // console.log(comment.comment_pics);
          }
        })
        return arr
      } else {
        return this.ratings.comments_dp.comments
      }
    }
  },
  methods: {
    selectItem(item) {
      this.item = item

      this.$nextTick(()=>{
        this.Scroll.refresh();
      })
    },
    // 时间戳的转变
    formatDate(time) {
      let date = new Date(time * 1000)

      // 时间格式
      let fmt = `yyyy.MM.dd`

      // 正则表达式
      if (/(y+)/.test(fmt)) {
        let year = date.getFullYear().toString()
        fmt = fmt.replace(RegExp.$1, year)
      }

      if (/(M+)/.test(fmt)) {
        let month = date.getMonth() + 1
        if (month < 10) {
          month = '0' + month
        }
        fmt = fmt.replace(RegExp.$1, month)
      }

      if (/(d+)/.test(fmt)) {
        let myDate = date.getDate().toString()
        if (myDate < 10) {
          myDate = '0' + myDate
        }
        fmt = fmt.replace(RegExp.$1, myDate)
      }
      return fmt
    },
    // ##之间高亮
    commentStr(content) {
      let rel = /#[^#]+#/g
      return content.replace(rel, '<i>$&</i>')
    }
  }
}
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ratings {
  position: absolute;
  width: 100%;
  left: 0;
  top: 220px;
  bottom: 0;
  overflow: hidden;
  background-color: #f4f4f4;
}
.rating--header {
  height: 90px;
  font-size: 12px;
  color: #666666;
  background-color: #fff;
}
.header--left {
  flex: 1;
}
.header--right {
  flex: 0 0 90px;
}

.commentScore--wrapper {
  flex: 0 0 90px;
  text-align: center;
}
.deliveryScore--wrapper {
  text-align: center;
}
.totalScore--wrapper {
  flex: 1;
  line-height: 25px;
  border-right: 1px solid #e4e4e4;
}
.tasteScore--wrapper,
.packScore--wrapper {
  gap: 10px;
}
.commentScore--points {
  font-size: 25px;
  line-height: 30px;
  color: #ffb000;
}
.deliveryScore--points {
  font-size: 25px;
  line-height: 30px;
}
.rating--body {
  margin-top: 10px;
  padding: 15px;
  background-color: #fff;
}
.header--nav {
  display: flex;
  justify-content: space-between;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #ffd161;
  color: #ffb000;
  font-size: 15px;
  text-align: center;
  line-height: 35px;
}
.item--img {
  width: 15px;
  height: 15px;
  vertical-align: middle;
}
.nav--item {
  flex: 1;
}
.nav--item:nth-child(1),
.nav--item:nth-child(2) {
  border-right: 1px solid #ffd161;
}

.nav--item.active {
  background-color: #ffd161;
  color: black;
}

.features--container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
  font-size: 12px;
}
.features--item {
  display: flex;
  padding: 10px;
}
.features--item {
  background-color: #f4f4f4;
  color: #656565;
  border-radius: 5px;
}

.heightlight {
  color: #c4c4c4;
}

/* --------------------------comment----------------------------- */
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
  border-bottom: 1px solid #e4e4e4;
}
.item--left {
  flex: 0 0 55px;
  text-align: center;
}
.item--right {
  flex: 1;
}
.item--header {
  display: flex;
  justify-content: space-between;
}
.item--username {
  font-size: 12px;
  margin-bottom: 10px;
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
.starWrapper {
  display: flex;
  gap: 5px;
  font-size: 12px;
  color: #b5b5b5;
  padding-bottom: 10px;
}
.item--photo{
  width: 145px;
}

</style>
<style >
  i {
  color: #576b95;
}
</style>
