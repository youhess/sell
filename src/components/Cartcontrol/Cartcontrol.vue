<template>
  <div class="cartcontrol">
    <transition name="slide">
      <div class="cart--dec icon-remove_circle_outline" @click.stop.prevent="decCart" v-show="good.count"></div>
    </transition>

    <div class="crat--count" v-show="good.count">
      {{ this.good.count }}
    </div>
    <div class="cart--add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    good: {
      type: Object
    }
  },
  methods: {
    decCart() {
      this.good.count--
    },
    addCart() {
      if (!this.good.count) {
        Vue.set(this.good, 'count', 1)
      } else {
        this.good.count++
      }
    }
  }
}
</script>

<style scoped>
.cartcontrol {
  display: flex;
  align-items: center;
}
.cart--dec {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #d8dadd;
}
.cart--add {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #ffd161;
}

.crat--count {
  font-size: 12px;
  padding: 0 13px;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s linear;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(20px) rotate(180deg);
}
</style>
