<template>
  <div class="root-view">
    <nav-bar class="nav-bar" left-text="返回" left-arrow @click-left="back">
    </nav-bar>

    <div class="search-bar">
      <el-date-picker
        v-model="btime"
        size="small"
        type="date"
        placeholder="起始时间"
        format="yy-MM-dd"
        value-format="yyyy-MM-dd"
        :default-value="defaultBtime"
      >
      </el-date-picker>
      <p class="zhi">至</p>
      <el-date-picker
        v-model="etime"
        size="small"
        type="date"
        placeholder="结束时间"
        format="yy-MM-dd"
        value-format="yyyy-MM-dd"
        :default-value="defaultEtime"
      >
      </el-date-picker>
      <el-button class="search-button" @click="search" icon="el-icon-search" circle></el-button>
    </div>

    <div class="seciton-header">
      <div class="seciton-item" v-for="(item, index) in ['时间','额度','会员','操作人']" :key="index">
        <p class="seciton-item-text">{{item}}</p>
      </div>
    </div>

    <list :loading="loading"
          :finished="finished"
          :loading-text="finished ? '没有更多了' : '加载中...'"
          @load="onLoad"
          :offset="parseInt('100')">
      <cell @click="clickCell(item)"  v-for="(item,index) in list" :key="index">
        <div style="display: flex;flex-direction: row;align-items: center" class="left-16" slot="title">
          <div class="seciton-item" v-for="(text,index) in [item.createTime,item.real_sum,item.member,item.worker]" :key="index">
            <p class="seciton-item-text" :style="{color:index == 1 ? item.symbol == 0 ? '#3B9CFF' : '#F53838' : '#333'}">{{index == 1 ? item.symbol == 0 ? '-' + text : '+' + text : text}}</p>
          </div>
        </div>
      </cell>
    </list>

    <popup class="" v-model="showDetail" position="right">
      <nav-bar class="nav-bar"
                left-text="返回"
                @click-left="showDetail = false"
                left-arrow>
        <span class="nav-title" slot="title">操作详情</span>
      </nav-bar>
      <list style="height:100%; overflow: scroll">
        <cell-group>
          <cell style="text-align: left" v-for="(value,key) in detail" :title="keys[key] ? keys[key] : key" :key="key" :value="key == 'type' ? value == 1 ? '会员卡支付' : '零售' : value">
          </cell>
        </cell-group>
        <div v-if="goods && goods.length > 0" class="section-header-part">
          <p class="section-title-part">商品信息</p>
        </div>
        <cell class="" style="text-align: left;align-items: center" v-for="(item,index) in goods" :title="item.name" :label="'数量：' + item.num + '     金额：' + item.price" :key="index">
          <img :src="item.img" style="margin-right: 20px" width="80" height="80" slot="icon"/>
        </cell>
      </list>
    </popup>
  </div>
</template>

<script>
import {NavBar, List, Cell, Popup, CellGroup} from 'vant'
import 'vant/packages/vant-css/lib/base.css'
import 'vant/packages/vant-css/lib/nav-bar.css'
import 'vant/packages/vant-css/lib/list.css'
import 'vant/packages/vant-css/lib/cell.css'
import 'vant/packages/vant-css/lib/popup.css'
import '../../static/css/style.css'
import { getHandleDetail, getHandleHistory, showMsg } from '../lib/vueHelper'
export default {
  name: 'HandleHistory',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      btime: '',
      etime: '',
      defaultEtime: null,
      defaultBtime: null,
      showDetail: false,
      detail: {},
      goods: [],
      keys: {
        createTime: '创建时间',
        real_sum: '实际金额',
        sum: '金额',
        worker: '操作人',
        act_sum: '优惠后金额',
        discount: '折扣比例',
        vip_sum: '会员价',
        name: '会员姓名',
        mobile: '手机号码',
        type: '支付方式',
        id: '记录id'
      }
    }
  },
  methods: {
    back () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    click () {

    },
    search () {
      this.page = 1
      this.list = []
      this.loading = false
      this.finished = false
      this.onLoad()
    },
    onLoad () {
      let self = this
      this.loading = true
      getHandleHistory(this, {btime: this.btime, etime: this.etime, page: this.page}, res => {
        if (res.data.result.length <= 0 && self.page === 1) {
          showMsg(self, true, '无该时间段数据', 'error')
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
    },
    clickCell (item) {
      this.showDetail = true
      let self = this
      getHandleDetail(this, {id: item.id, fixed: item.fixed}, res => {
        if (res.data.result instanceof Array) {
          self.detail = res.data.result[0]
          self.goods = res.data.result[0].goods
          delete self.detail['goods']
        } else {
          self.detail = res.data.result
          self.goods = res.data.goods
        }
      })
    }
  },
  components: {
    NavBar, List, Cell, Popup, CellGroup
  },
  created () {
    let date = new Date()
    this.defaultEtime = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
    console.log(this.defaultEtime)
    date.setTime(date.getTime() - 1000 * 3600 * 24 * 7)
    console.log(date)
    this.defaultBtime = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
    console.log(this.defaultBtime)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .search-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px 10px 10px;
    border-style: solid;
    border-color: #ebebeb;
    border-width: 0px 0px 1px 0px;
  }
  .zhi {
    margin: 0 10px;
  }
  .search-button {
    margin-left: 10px;
  }
  .seciton-header {
    height: 44px;
    display: flex;
    flex-direction: row;
    /*align-items: center;*/
    /*justify-content: center;*/
    border-style: solid;
    border-color: #ebebeb;
    border-width: 0px 0px 1px 0px;
  }
  .seciton-item {
    flex: 1;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .seciton-item-text{
    font-size:14px;
    color:rgba(43,47,51,1);
  }
  .section-title-part
  {
    font-size:14px;
    color:rgba(43,47,51,1);
    text-align: left;
  }
  .section-header-part
  {
    width:100%; height:30px;
    padding-left: 15px;
    display: flex;
    align-items: center;

    background:rgba(242,242,242,1);
  }
  .right-detail{
    font-size:14px;
    color:rgba(147,150,153,1);
  }
  .van-popup {
    width: 100%;
    padding: 0px;
    box-sizing: border-box;
    &--bottom {
      width: 100%;
      padding: 0;
      border-radius: 0;
    }
    .van-tabs__content {
      height: 156px;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .van-tab__pane:not(:first-child) {
      padding: 0px;
      line-height: 1.4;
      color: #666;
    }
    &--top {
      color: #fff;
      width: 100%;
      border-radius: 0;
      line-height: 20px;
      background-color: rgba(0, 0, 0, 0.8);
    }
    &--left,
    &--right {
      width: 100%;
      height: 100%;
    }
  }

  .left-16
  {
    left: -16px;
  }
</style>
