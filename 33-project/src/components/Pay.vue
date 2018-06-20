<template>
  <div class="root-view">
    <nav-bar class="nav-bar"
             left-text="返回"
             @cllick-left="back"
             left-arrow>
      <span class="nav-title" slot="title">付款</span>
    </nav-bar>

    <div v-if="!showPayInfo">
      <div style="margin-top: 84px">
        <span class="info">验证码已发至{{showMobile}}</span>
      </div>
      <security-code @input="handleSubmit()" class="code" v-model="code"></security-code>

      <van-button @click="buttonClick">
        {{time > 0 ? '重新获取（' + time + '）' : '重新获取'}}
      </van-button>
    </div>

    <div v-if="showPayInfo" class="payInfo">
      <img src="../assets/pay-bg.png" class="pay-bg">
      <div class="payInfo2">
        <img :src="qrcode" v-if="qrcode.length > 0" class="qr-code"/>
      </div>
    </div>
  </div>
</template>

<script>
import {NavBar, Button, Dialog} from 'vant'
import SecurityCode from './common/SecurityCode.vue'
import 'vant/packages/vant-css/lib/base.css'
import 'vant/packages/vant-css/lib/nav-bar.css'
import 'vant/packages/vant-css/lib/dialog.css'
import {getPayQRCode, sendCaptcha, transformPhone} from '../lib/vueHelper'
import '../../static/css/style.css'
export default {
  name: 'Pay',
  data () {
    return {
      code: '',
      showMobile: '',
      mobile: '',
      time: 60,
      buttonText: '重新获取（60）',
      showPayInfo: false,
      qrcode: '',
      confirmed: false
    }
  },
  methods: {
    handleSubmit () {
      if (this.code.length === 4) {
        let self = this
        getPayQRCode(this, {code: this.code}, res => {
          self.qrcode = res.data.result
        })
        this.showPayInfo = true
      }
    },
    buttonClick () {
      if (this.time <= 0) {
        sendCaptcha(this, {mobile: this.mobile})
        this.time = 60
        this.timer()
      }
    },
    back () {
      console.log(1)
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$roter.push('/')
    },
    timer () {
      let timer = setInterval(() => {
        this.time--
        if (this.time < 0) {
          window.clearInterval(timer)
        }
      }, 1000)
    }
  },
  components: {
    NavBar, VanButton: Button, Dialog, SecurityCode
  },
  created () {
    this.mobile = 18565665856
    // this.mobile = this.$route.params.phone
    this.showMobile = transformPhone(this, this.mobile)
    console.log('created')
    Dialog.confirm({
      title: '提示',
      message: '确认发送支付验证码？'
    }).then(() => {
      sendCaptcha(this, {mobile: this.mobile})
      this.timer()
      this.confirmed = true
    }).catch(() => {
      if (this.confirmed) {

      } else {
        this.back()
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.payInfo2
  {
    width: 100%;
    left: 0px;
    height: 533px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 44px;
  }
  .qr-code
  {
    width: 161px;
    height: 161px;
    background-color: white;
  }
  .pay-bg
  {
    width:345px;
    height:421px;
    border-radius: 2px ;
  }
  .payInfo
  {
    padding: 50px 15px 132px 15px;
    background-color: #3B9CFF;

  }
  .info {
    font-size:14px;
    font-family:PingFangSC-Regular;
    color:rgba(147,150,153,1);
  }
  .code
  {
    margin-top: 28px;

  }
</style>
