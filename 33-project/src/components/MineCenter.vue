<template>
  <div class="root-view">
    <nav-bar class="nav-bar" >
      <!-- left-text="返回" left-arrow @click-left="back" -->
      <span class="nav-title" slot="title">个人中心</span>
    </nav-bar>

    <div v-if="isLogin" class="header">

      <figure :src="avaImg" class="icon">11</figure>

      <div class="info_container">
        <p class="name">{{user.name}}</p>
        <p class="idNum">ID:{{showMobile}}</p>
      </div>
    </div>
    <div v-if="isLogin">
      <cell-group  border class="cell_group">
        <cell value="" is-link to="">
          <img class="cell_left-icon" src="" slot="icon" />
        </cell>
      </cell-group>
      <cell-group  border class="cell_group">
        <cell value="" is-link to="">
          <img class="cell_left-icon" src="" slot="icon" />
        </cell>
      </cell-group>
      <cell-group  border class="cell_group">
        <cell value="" is-link to="">
          <img class="cell_left-icon" src="" slot="icon" />
        </cell>
      </cell-group>
      <cell-group  border class="cell_group">
        <cell value="" is-link to="">
          <img class="cell_left-icon" src="" slot="icon" />
        </cell>
      </cell-group>
      <cell-group  border class="cell_group">
        <cell value="" is-link to="">
          <img class="cell_left-icon" src="" slot="icon" />
        </cell>
      </cell-group>
      <cell-group  border class="cell_group">
        <cell value="" is-link to="">
          <img class="cell_left-icon" src="" slot="icon" />
        </cell>
      </cell-group>
    </div>
  </div>
</template>

<script>
import {Cell, NavBar, CellGroup, Button, Row} from 'vant'
import 'vant/packages/vant-css/lib/base.css'
import 'vant/packages/vant-css/lib/nav-bar.css'
import 'vant/packages/vant-css/lib/cell.css'
import 'vant/packages/vant-css/lib/dialog.css'
import 'vant/packages/vant-css/lib/button.css'
import '../../static/css/style.css'
import { transformPhone } from '../lib/vueHelper'
export default {
  name: 'MineCenter',
  data () {
    return {
      isLogin: false,
      user: {},
      showMobile: '******',
      avaImg: ''
    }
  },
  components: {
    NavBar, Row, Cell, CellGroup, vanButton: Button
  },
  methods: {
    // back () {
    //   window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    // },
  },
  created () {
    this.user = this.$store.state.user
    this.isLogin = this.user.id
    this.avaImg = this.user.avatar
    this.showMobile = transformPhone(this, this.user.mobile)
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
    font-size: 5px;
  }
  .info_container {
    display: flex;flex-direction: column;justify-content: flex-start
  }
  .name {
    color: #fff;
    text-align: left
  }
  .idNum {
    color: #fff;
    text-align: left
  }
</style>
