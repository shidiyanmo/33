<template>
  <div class="root-view">
    <nav-bar class="nav-bar" >
      <!-- left-text="返回" left-arrow @click-left="back" -->
      <span class="nav-title" slot="title">个人中心</span>
    </nav-bar>

    <div v-if="isLogin" class="header">

      <img :src="user.avatar" class="icon" />

      <div class="info_container">
        <p class="name">{{user.name}}</p>
        <p class="idNum">ID:{{showMobile}}</p>
      </div>
    </div>
    <div v-if="isLogin">
      <cell-group border class="cell_group">
        <cell value="付款" is-link :to="'/pay/' + user.mobile">
          <img class="van-cell__left-icon cell_left_icon" src="../assets/financial_fill.png" slot="icon" />
        </cell>
      </cell-group>
      <cell-group border class="cell_group">
        <cell value="操作记录" is-link to="/HandleHistory">
          <img class="van-cell__left-icon cell_left_icon" src="../assets/document_fill.png" slot="icon" />
        </cell>
      </cell-group>
      <cell-group border class="cell_group">
        <cell value="会员卡" is-link to="/VIPCard">
          <img class="van-cell__left-icon cell_left_icon" src="../assets/businesscard_fill.png" slot="icon" />
        </cell>
      </cell-group>
      <cell-group border class="cell_group">
        <cell value="会员协议" is-link to="/VIPProtocol">
          <img class="van-cell__left-icon cell_left_icon" src="../assets/form_fill.png" slot="icon" />
        </cell>
      </cell-group>
      <cell-group border class="cell_group">
        <cell value="我的积分" is-link to="/MyIntegral">
          <img class="van-cell__left-icon cell_left_icon" src="../assets/integ_fill.png" slot="icon" />
        </cell>
      </cell-group>
      <cell-group border class="cell_group">
        <cell :value="user.openid == 0 ? '绑定微信' : '已绑定微信'" is-link :to="user.openid == 0 ? '/BindWX' : ''">
          <img class="van-cell__left-icon cell_left_icon" src="../assets/integ_fill.png" slot="icon" />
        </cell>
      </cell-group>
    </div>

    <van-button class="login-button" type="primary" @click="centerDialogVisible = true" bottom-action>{{!isLogin ? '登录' : '退出登录'}}</van-button>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="80%"
      center>
      <span>确认退出</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="agreeAgreement">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Cell, NavBar, CellGroup, Button } from 'vant'
import { doLogout, transformPhone } from '../lib/vueHelper'
import 'vant/packages/vant-css/lib/base.css'
import 'vant/packages/vant-css/lib/nav-bar.css'
import 'vant/packages/vant-css/lib/cell.css'
import 'vant/packages/vant-css/lib/dialog.css'
import 'vant/packages/vant-css/lib/button.css'
import '../../static/css/style.css'
export default {
  name: 'MineCenter',
  data () {
    return {
      isLogin: false,
      user: {},
      showMobile: '******',
      avaImg: '',
      centerDialogVisible: false
    }
  },
  created () {
    this.user = this.$store.getters.getUser
    this.isLogin = this.user.id
    this.avaImg = this.user.avatar
    this.showMobile = transformPhone(this, this.user.mobile)
  },
  methods: {
    // back () {
    //   window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    // },
    agreeAgreement () {
      if (this.isLogin) {
        doLogout()
      } else {
        this.$router.push('/Login')
      }
    }
    // loginOrLogout () {
    //   if (this.isLogin) {
    //     Dialog.confirm({
    //       title: '提示',
    //       message: '确认退出吗'
    //     }).then(() => {
    //       // on confirm
    //       doLogout()
    //     }).catch(() => {
    //       // on cancel
    //     })
    //   } else {
    //     this.$router.push('/Login')
    //   }
    // }
  },
  components: {
    NavBar, Cell, CellGroup, vanButton: Button
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    background-color: #3B9CFF;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .icon {
    width: 65px;
    height: 65px;
    border-radius: 32.5px;
    border-color: #fff;
    border-width: 1px;
    background-color: #d8d8d8;
    margin: 16px;
  }
  .info_container {
    display: flex;flex-direction: column;justify-content: flex-start
  }
  .name {
    color: #fff;
    text-align: left;
    font-family: PingFangSC;
    font-size: 14px;
  }
  .idNum {
    color: #fff;
    text-align: left;
    font-family: PingFangSC;
    font-size: 12px
  }
  .cell_group {
    margin-top: 10px;
  }
  .cell_left_icon {
    width: 22px;height: 22px;margin-right: 10px
  }
  .login-button {
    position: absolute;
    left: 0px;
    bottom: 0px;
  }
</style>
