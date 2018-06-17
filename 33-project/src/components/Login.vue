<template>
  <div class="root-view">
    <nav-bar class="nav-bar">
      <span class="nav-title" slot="title">登录</span>
    </nav-bar>
    <div class="loginWrapper">
      <div class="hd">
        <h2>超市欢迎您</h2>
      </div>
      <div class="bd">
        <el-form :model="loginForm" :rules="loginRule" ref="loginForm">
          <el-form-item prop="userName">
            <el-input type="userName" v-model="loginForm.userName" placeholder="帐号"></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input type="password" v-model="loginForm.pwd" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submitBtn">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="ft">
        <router-link to="/register/re">还没有账号？马上注册</router-link>
        <router-link to="register/forget">忘记密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import 'vant/packages/vant-css/lib/base.css'
import 'vant/packages/vant-css/lib/nav-bar.css'
import '../../static/css/style.css'
import { doLogin } from '../lib/vueHelper'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        userName: '',
        pwd: ''
      },
      loginRule: {
        userName: [
          { required: true, message: '请输入11位手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在到 6 到 20 个数字加字母组合', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            'username': this.loginForm.userName,
            'password': this.loginForm.pwd
          }
          doLogin(this, data)
        } else {
          return false
        }
      })
    }
  },
  components: {
    NavBar
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
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    font-size: 18px;
  }
  .loginWrapper .hd {
    margin-top: 32px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300px;
  }
  .loginWrapper .hd h2{
    font-weight: 400;
    color: #20A0FF;
  }
  .loginWrapper .bd {
    margin-top: 32px;
    width: 300px;
  }
  .loginWrapper .bd .submitBtn {
    width: 100%;
  }
  .loginWrapper .ft {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 300px;
  }
  .loginWrapper .ft a {
    font-size: 14px;
    text-decoration: none;
    color: #20A0FF;
  }
</style>
