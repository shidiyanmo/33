<template>
  <div class="root-view">
    <nav-bar class="nav-bar" left-text="返回" left-arrow @click-left="back">
      <span class="nav-title" slot="title">{{isRegister ? '注册' : '忘记密码'}}</span>
    </nav-bar>
    <div class="loginWrapper">
      <div class="hd">
        <h2>超市欢迎你</h2>
      </div>
      <div class="bd">
        <el-button type="text" @click="centerDialogVisible = true">点击阅读会员协议</el-button>
        <el-dialog
          title="百福易通优选商超会员协议"
          :visible.sync="centerDialogVisible"
          :fullscreen="true"
          center>
          <protocol-span></protocol-span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="disagreeAgreement">不同意</el-button>
            <el-button type="primary" @click="agreeAgreement">同意</el-button>
          </span>
        </el-dialog>
        <el-checkbox
          v-model="readChecked"
          :disabled="true"
          :border="true"
          size=mini
        >我同意遵守会员协议
        </el-checkbox>
        <el-form :model="registerForm" :rules="registerRule" ref="registerForm">
          <el-form-item prop="userName">
            <el-input type="userName" v-model="registerForm.userName" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input type="password" v-model="registerForm.pwd" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="checkPwd">
            <el-input type="password" v-model="registerForm.checkPwd" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input  v-model="registerForm.captcha" placeholder="请输入验证码">
              <el-button slot="append" @click="getCaptcha">{{ showCaptchaMsg }}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="submitBtn" type="primary" @click="submitForm('registerForm')">{{isRegister ? '立即注册' : '确认'}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="ft">
        <router-link to="/Login">重新登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import 'vant/packages/vant-css/lib/base.css'
import 'vant/packages/vant-css/lib/nav-bar.css'
import '../../static/css/style.css'
import Protocol from './Protocol'
// import { mapState } from 'vuex'
import store from '../vuex/store'
import { sendCaptcha, showMsg, doRegister } from '../lib/vueHelper'
export default {
  name: 'Register',
  data () {
    const validateUser = (rule, value, callback) => {
      const pattern = /^(1[3|4|5|8|7|4][0-9]\d{8})$/g
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!pattern.test(value)) {
        callback(new Error('请输入11位正确手机号'))
      } else {
        callback()
      }
    }
    var validatePwd = (rule, value, cb) => {
      var pattern = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/g
      if (value === '') {
        cb(new Error('请输入密码'))
      } else if (!pattern.test(value)) {
        cb(new Error('请输入6-20个数字加字母组合'))
      } else {
        if (this.registerForm.checkPwd !== '') {
          this.$refs.registerForm.validateField('checkPwd')
        }
        cb()
      }
    }
    var validateCheckPwd = (rule, value, cb) => {
      if (value === '') {
        cb(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.pwd) {
        cb(new Error('两次输入密码不一致!'))
      } else {
        cb()
      }
    }
    return {
      isRegister: true,
      centerDialogVisible: false,
      readChecked: false,
      registerForm: {
        userName: '',
        pwd: '',
        checkPwd: '',
        email: '',
        captcha: ''
      },
      registerRule: {
        userName: [
          {validator: validateUser, trigger: 'blur'}
        ],
        pwd: [
          {validator: validatePwd, trigger: 'blur'}
        ],
        checkPwd: [
          {validator: validateCheckPwd, trigger: 'blur'}
        ],
        captcha: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      }
    }
  },
  components: {
    'protocol-span': Protocol,
    NavBar
  },
  computed: {
    // ...mapState({
    //   showCaptchaMsg: 'captchaMsg'
    // })
    showCaptchaMsg () {
      return store.getters.getCaptchaMsg
    }
  },
  methods: {
    back () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    disagreeAgreement () {
      this.readChecked = false
      this.centerDialogVisible = false
    },
    agreeAgreement () {
      this.readChecked = true
      this.centerDialogVisible = false
    },
    submitForm (formName) {
      if (!this.readChecked) {
        alert('请同意遵守会员协议')
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            'username': this.registerForm.userName,
            'password': this.registerForm.pwd,
            'code': this.registerForm.captcha,
            'type': 2
          }
          doRegister(this, data)
        } else {
          return false
        }
      })
    },
    getCaptcha () {
      if (!this.readChecked) {
        alert('请同意遵守会员协议')
        return
      }
      if (store.getters.getCaptchaMsg === '发送成功' || store.getters.getCaptchaMsg === '已经发送') {
        showMsg(this, true, '已发送，请勿重复发送', 'error')
        return
      }
      this.$refs.registerForm.validateField('userName', (valid) => {
        if (!valid) {
          const data = {
            mobile: this.registerForm.userName
          }
          sendCaptcha(this, data)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
}
.loginWrapper .hd {
  width: 300px;
  margin-top: 32px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.loginWrapper .hd h2 {
  font-weight: 400;
  color: #20a0ff;
}
.loginWrapper .hd p {
  font-size: 15px;
  color: #1f2f3d;
}
.loginWrapper .bd {
  margin-top: 32px;
  width: 300px;
}
.loginWrapper .bd .submitBtn {
  width: 100%;
}
.loginWrapper .bd .el-form-item:last-child {
  margin-bottom: 10px;
}
.loginWrapper .ft {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
}
.loginWrapper .ft a {
  font-size: 14px;
  text-decoration: none;
  color: #20a0ff;
}
</style>
