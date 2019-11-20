<template>
  <div class="login-page">
    <div id="login"
         class="layer bg"></div>
    <div class="flex-center">
      <div class="logo-group">
        <!-- <img src="@/assets/image/logo/w500.png"
             alt=""> -->
      </div>
      <div class="form-group">
        <el-card>
          <el-form :model="formLogin"
                   :rules="rules"
                   ref="loginForm">
            <el-form-item prop="username">
              <el-input type="text"
                        v-model="formLogin.username"
                        placeholder="username">
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password"
                        v-model="formLogin.password"
                        placeholder="password">
              </el-input>
            </el-form-item>
            <el-button @click="submit"
                       type="primary"
                       class="button-login">登陆</el-button>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import config from './config/default'
// import Cookies from 'js-cookie'
// 配置地址
// https://vincentgarreau.com/particles.js/#default
require('particles.js')

export default {
  data () {
    return {
      formLogin: {
        username: 'root',
        password: '0000'
      },
      rules: {
        username: { required: true, trigger: 'blur' },
        password: { required: true, trigger: 'blur' }
      }
    }
  },
  methods: {
    submit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$ws({
            name: this.formLogin.username,
            pass: this.formLogin.password
          }).connect().then(userInfo => {
            sessionStorage.setItem('user', JSON.stringify(userInfo))
            this.$router.push({ name: 'index' })
          })
        } else {
          return false
        }
      })
    },
    init () {
      window.particlesJS('login', config)
      sessionStorage.removeItem('user')
      this.$dataSource && this.$dataSource.close()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss">
@import "@/assets/style/public.scss";
.login-page {
  background-color: $color-primary;
  height: 100%;
  position: relative;
  // 层
  .layer {
    position: absolute;
    height: 100%;
    width: 100%;
  }
  .flex-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  // 背景
  .bg {
    canvas {
      display: block;
      margin: 0px;
      padding: 0px;
    }
  }
  // logo
  .logo-group {
    margin-top: -145px;
    position: relative;
    top: 75px;
    img {
      height: 140px;
    }
  }
  // 登陆表单
  .form-group {
    width: 300px;
    // 重新设置卡片阴影
    .el-card {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
        0 2px 4px 0 rgba(232, 237, 250, 0.5);
      .el-card__body {
        padding-top: 70px;
      }
    }
    // 登陆按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }
  // 帮助按钮
  .button-help {
    width: 300px;
    margin-top: $margin;
  }
}
</style>
