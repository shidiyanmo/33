<template>
  <div class="rootview">
    <nav-bar class="nav-bar"
             left-text="返回"
             @click-left="back"
             left-arrow>

      <span class="nav-title" slot="title">我的积分</span>
    </nav-bar>

    <div class="container">
      <div class="img-container" style="display: flex;flex-direction: column">
        <p class="integral-text">{{point}}</p>
        <img src="../assets/integral_bg.png" width="231" height="231"/>
      </div>
    </div>

    <div style="flex-direction: row;display: flex">
      <img @click="clickImg(0)" src="../assets/get_integral.png" width="187" height="115">
      <img @click="clickImg(1)" src="../assets/integral_history.png" width="187" height="115">
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import 'vant/packages/vant-css/lib/base.css'
import 'vant/packages/vant-css/lib/nav-bar.css'
import '../../static/css/style.css'
import { getIntegral } from '../lib/vueHelper'
export default {
  name: 'MineIntegral',
  data () {
    return {
      point: '****'
    }
  },
  components: {
    NavBar
  },
  methods: {
    back () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    clickImg (p) {
      let path = ''
      if (p === 0) {
        path = '/GetIntegral'
      } else {
        path = '/IntegralHistory'
      }
      this.$router.push(path)
    }
  },
  created () {
    let self = this
    getIntegral(this, {}, res => {
      self.point = res.data.result.points
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .img-container
  {
    /*width: 231px;*/
    /*height: 231px;*/
  }
  .integral-text{
    position: relative;
    top: 110px;
    width:231px;
    font-size:50px;
    color:rgba(255,255,255,1);
  }
  .container
  {
    width:100%;
    height:416px;
    background:linear-gradient(-180deg,rgba(59,156,255,1),rgba(59,156,255,1));
    align-items: center;
    justify-content: center;
    display: flex;
  }
</style>
