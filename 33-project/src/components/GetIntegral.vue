<template>
  <div class="root-view">
    <nav-bar class="nav-bar"
             left-text="返回"
             @click-left="back"
             left-arrow>

      <span class="nav-title" slot="title">获取积分</span>
    </nav-bar>

    <cell-group border>
      <cell style="text-align: left;align-items: center" title="打卡签到" label="每天签到获得1积分" is-link @click="clickCell(0)">
        <img class="van-cell__left-icon cell_left_icon" src="../assets/sign_integral.png" slot="icon"/>
      </cell>
      <cell style="text-align: left;align-items: center" title="充值" label="每次充值的金额x1积分" is-link @click="clickCell(1)">
        <img class="van-cell__left-icon cell_left_icon" src="../assets/charge_integral.png" slot="icon"/>
      </cell>
      <cell style="text-align: left;align-items: center" title="消费" label="每次消费的金额x1积分" is-link @click="clickCell(2)">
        <img class="van-cell__left-icon cell_left_icon" src="../assets/pay_integral.png" slot="icon"/>
      </cell>
    </cell-group>
  </div>
</template>

<script>
import { NavBar, Cell, CellGroup, Dialog } from 'vant'
import 'vant/packages/vant-css/lib/base.css'
import 'vant/packages/vant-css/lib/nav-bar.css'
import 'vant/packages/vant-css/lib/cell.css'
import 'vant/packages/vant-css/lib/dialog.css'
import { getVIPSign, showMsg } from '../lib/vueHelper'
import '../../static/css/style.css'
export default {
  name: 'GetIntegral',
  components: {
    NavBar, Cell, CellGroup, Dialog
  },
  methods: {
    clickCell (index) {
      if (index === 0) {
        getVIPSign(this, {}, res => {
          showMsg(this, true, '签到成功', 'success')
        })
      } else if (index === 1) {
        Dialog.confirm({
          title: '提示',
          message: '充值请联系10010'
        }).then(() => {
          window.location.herf = 'tel://10010'
        }).catch(() => {

        })
      } else {
        Dialog.confirm({
          title: '提示',
          message: '请前往 三三易通超市购买商品，联系电话：10010'
        }).then(() => {
          window.location.herf = 'tel://10010'
        }).catch(() => {

        })
      }
    },
    back () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cell_left_icon {
    /*background-color: #d8d8d8;*/
    width: 22px;
    height: 22px;
    margin-right: 10px;
  }
</style>
