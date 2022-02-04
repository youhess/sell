<template>
  <div >
    <!-- header -->
    <Header :poiInfo="poiInfo"></Header>
    <!-- naviagtion -->
    <Nav :commentNum="commentNum"></Nav>
    <!-- content -->
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Nav from '@/components/Nav/Nav.vue'

export default {
  name: 'App',
  data() {
    return {
      // 异步请求获得header值
      poiInfo: {},
      commentNum:0
    }
  },
  created() {
    // Make a request for a user with a given ID
    const that = this
    // 获取商品页菜单全部信息
    this.$axios
      .get('/api/goods')
      .then(function(response) {
        // handle success
        const dataSource = response.data

        if(dataSource.code == 0 ){
          that.poiInfo = dataSource.data.poi_info;
          // console.log(dataSource.data.poi_info);
        }
      })
      .catch(function(error) {
        // handle error
        console.log(error)
      })
      .then(function() {
        // always executed
      })
      // 获取商品评价页面信息
       this.$axios
      .get('/api/ratings')
      .then(function(response) {
        // handle success
        const dataSource = response.data

        if(dataSource.code == 0 ){
          that.commentNum = dataSource.data.comment_num;
          // console.log(dataSource.data.poi_info);
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
    Header,
    Nav
  }
}
</script>

<style>

  </style>
