<template>
    <div class="root-view">
        <nav-bar class="nav-bar"
                 left-text="返回"
                 @click-left="back"
                 left-arrow>

            <span class="nav-title" slot="title">会员协议</span>

        </nav-bar>
        <protocol-span></protocol-span>
    </div>
</template>

<script>
import {NavBar} from 'vant'
import 'vant/packages/vant-css/lib/base.css'
import 'vant/packages/vant-css/lib/nav-bar.css'

import '../../static/css/style.css'
import Protocol from './Protocol'
export default {
  name: 'VIPProtocol',
  methods: {
    back () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  },
  components: {
    'protocol-span': Protocol,
    NavBar
  }
}
</script>

<style scoped>

</style>
