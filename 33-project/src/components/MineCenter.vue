<template>
  <div class="root-view">
    <nav-bar class="nav-bar" left-text="返回">
      <span class="nav-title" slot="title">个人中心</span>
    </nav-bar>
    2131313
  </div>
</template>

<script>
import { NavBar } from 'vant'
import 'vant/packages/vant-css/lib/base.css'
import 'vant/packages/vant-css/lib/nav-bar.css'
import '../../static/css/style.css'
export default {
  name: 'MineCenter',
  components: {
    NavBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
