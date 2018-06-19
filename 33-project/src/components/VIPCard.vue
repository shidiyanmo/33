<template>
  <div class="root-view">
    <nav-bar class="nav-bar"
             left-text="返回"
             @click-left="back"
             left-arrow>

      <span class="nav-title" slot="title">会员卡</span>
    </nav-bar>

    <div class="vip-card-container">
      <img src="../assets/vipcard-bg.png" width="375" height="255"/>
      <div class="vip-card-info-container">
        <span class="vip-card-text">会员卡</span>
        <span class="vip-card-no">NO.{{cardInfo.cardno}}</span>
        <span class="balance-text">余额 {{cardInfo.balance}}元</span>
      </div>
    </div>

    <div class="part-line"></div>

    <div class="section-header">
      <p class="section-title">会员权益</p>
      <p class="section-desc">三三会员用会员卡消费可享受三三商超最高9折优惠(指定商品除外)，并享受用积分兑换商品。三三会员用会员卡消费可享受三三商超最高9折优惠(指定商品除外)，并享受用积分兑换商品。</p>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import 'vant/packages/vant-css/lib/base.css'
import 'vant/packages/vant-css/lib/nav-bar.css'
import { getVIPCardInfo } from '../lib/vueHelper'
import '../../static/css/style.css'
export default {
  name: 'VIPCard',
  data () {
    return {
      cardInfo: {}
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
    }

  },
  created () {
    getVIPCardInfo(this, {}, res => {
      this.cardInfo = res.data.result
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .balance-text {
    margin-top: 103px;
    font-size: 17px;
    color: rgba(255, 255, 255, 1);
  }

  .vip-card-no {
    font-size: 12px;
    text-align: left;
    color: rgba(255, 255, 255, 1);
  }

  .vip-card-text {
    font-size: 20px;
    text-align: left;
    color: rgba(255, 255, 255, 1);
  }

  .vip-card-info-container {
    position: absolute;
    top: 85px;
    left: 41px;
    display: flex;
    flex-direction: column;
    align-items: left;
  }

  .section-desc {
    width: 92%;
    text-align: left;
    font-size: 12px;
    color: rgba(147, 150, 153, 1);
  }

  .section-header {
    width: 100%;

    align-items: left;
    display: flex;
    padding-left: 15px;
    flex-direction: column;
  }

  .section-title {
    margin: 13px 15px 13px 0px;
    font-size: 14px;
    color: rgba(43, 47, 51, 1);
    text-align: left;
  }

  .part-line {
    height: 10px;
    width: 100%;
    background-color: #ebebeb;
  }

  .vip-card-container {
    padding: 16px 0px 16px 0px;
  }
</style>
