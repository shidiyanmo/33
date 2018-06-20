<template>
  <div class="root-view">
    <nav-bar class="nav-bar"
             left-text="返回"
             @click-left="back"
             left-arrow>

      <span class="nav-title" slot="title">积分记录</span>
    </nav-bar>

    <div class="seciton-header">
      <div class="seciton-item" v-for="(item, index) in ['时间', '额度', '类型', '备注']" :key="index">
        <p class="seciton-item-text">{{item}}</p>
      </div>
    </div>

    <list :loading="loading"
          :finished="finished"
          :loading-text="finished ? '没有更多了' : '加载中...'"
          @load="onload"
          :offset="parseInt('100')"
    >
      <cell v-for="(item, index) in list" :key="index">
        <div class="left-16" style="display: flex;flex-direction: row;align-items:center" slot="title">
          <div class="seciton-item" v-for="(text, index) in [item.createTime, item.num, type[item.state+''], item.remark]" :key="index">
            <p class="seciton-item-text" :style="{color: index == 1 ? item.symbol == 0 ? '#3B9CFF' : '#F53838' : '#999'}">{{index == 1 ? item.symbol == 0 ? '-' + text : '+' + text : text}}</p>
          </div>
        </div>
      </cell>
    </list>
  </div>
</template>

<script>
import {NavBar, List, Cell} from 'vant'
import 'vant/packages/vant-css/lib/base.css'
import 'vant/packages/vant-css/lib/nav-bar.css'
import 'vant/packages/vant-css/lib/list.css'
import 'vant/packages/vant-css/lib/cell.css'
import '../../static/css/style.css'
import {getIntegralHistory, showMsg} from '../lib/vueHelper'
export default {
  name: 'IntegralHistory',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      // 类型,1为打卡，2消费，3为充值，4为兑换
      type: {
        '1': '打卡', '2': '消费', '3': '充值', '4': '兑换'
      }
    }
  },
  methods: {
    back () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    onload () {
      let self = this
      this.loading = true
      getIntegralHistory(this, {page: this.page}, res => {
        if (res.data.result.length <= 0 && self.page === 1) {
          showMsg(self, true, '无该时段数据', 'error')
          self.finished = true
        } else if (res.data.result.length <= 0) {
          showMsg(self, true, '没有更多了', 'error')
          self.finished = true
        } else {
          let newArr = self.list.concat(res.data.result)
          self.page++
          self.list = newArr
        }
        self.loading = false
      })
    }
  },
  components: {
    NavBar, List, Cell
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .left-16
  {
    left: -16px;
  }
  .seciton-item-text{
    font-size:14px;
    color:#333;
  }
  .seciton-item{
    flex: 1;
    align-items: center;
    justify-content: center;
    display: flex;

  }
  .seciton-header
  {
    height: 44px;
    display: flex;
    flex-direction: row;
    /*align-items: center;*/
    /*justify-content: center;*/
    border-style: solid;
    border-color: #ebebeb;
    border-width: 0px 0px 1px 0px;
  }
</style>
