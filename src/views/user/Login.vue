<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="用户名/邮箱"
          v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入用户名或邮箱地址' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
              ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="请输入密码"
          v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }]}
              ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-row :gutter="16" v-if="isNeedVerCode">
        <a-col class="gutter-row" :span="16">
          <a-form-item>
            <a-input size="large" type="text" placeholder="验证码" v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <img :src="verifyCode" alt="验证码" style="width: 100%;margin-top: 5px;cursor: pointer" @click="getVerifyCode">
        </a-col>
      </a-row>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >登录</a-button>
      </a-form-item>

      <!--<div class="user-login-other">-->
        <!--<span>其他登录方式</span>-->
        <!--<a>-->
          <!--<a-icon class="item-icon" type="alipay-circle"></a-icon>-->
        <!--</a>-->
        <!--<a>-->
          <!--<a-icon class="item-icon" type="taobao-circle"></a-icon>-->
        <!--</a>-->
        <!--<a>-->
          <!--<a-icon class="item-icon" type="weibo-circle"></a-icon>-->
        <!--</a>-->
        <!--&lt;!&ndash;<router-link class="register" :to="{ name: 'register' }">注册账户</router-link>&ndash;&gt;-->
      <!--</div>-->
    </a-form>
  </div>
</template>

<script>
import md5 from 'md5'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { getVerifyCode } from '@/api/login'
import { getStore } from "@/utils/storage"

export default {
  data () {
    return {
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      stepCaptchaVisible: false,
      isNeedVerCode: false,
      verifyCode: '',
      verKey: '',
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        smsSendBtn: false
      }
    }
  },
  created () {
    this.getVerifyCode();
  },
  mounted(){

  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      callback()
    },
    getVerifyCode: function () {
      let that = this;
      getVerifyCode()
        .then((res) => {
          let data = res && res.data ? res.data.rows : '';
          that.verifyCode = `data:image/png;base64,${data.captcha}`;
          that.isNeedVerCode = !!data.key;
          that.verKey = data.key;
          console.log(data)
        }).catch(err => {
          that.$notification['error']({
            message: '错误',
            description: '获取验证码错误',
            duration: 3
          })
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      let that = this;
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this

      state.loginBtn = true
      let validateFieldsKey = ['username', 'password'];
      this.isNeedVerCode ? validateFieldsKey.push('captcha') : '';

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = {
            _username: values.username,
            // password: sha256_digest(values.password),
            _passwd: md5(values.password),
          };
          that.isNeedVerCode ? loginParams._captcha = values.captcha : '';
          that.isNeedVerCode ? loginParams._key = that.verKey : '';

          Login(loginParams)
            .then((res) => {
              // let goPageName = getStore('ISADMIN') ? 'application' : 'aihpc'
              // let goPageName = this.$store.getters.isAdmin ? 'application' : 'aihpc'
              that.$router.push({ name: 'aihpc' });
              // 延迟 1 秒显示欢迎信息
              setTimeout(() => {
                this.$notification.success({
                  message: '欢迎',
                  duration: 2,
                  description: `${timeFix()}，欢迎回来`
                })
              }, 1000)

            }).catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    requestFailed (err) {
      let code = err && err.data ? err.data.code : ''
      if(code === 101){
        this.$notification['error']({
          message: '错误',
          description: ((err.response || {}).data || {}).message || '用户名密码错误',
          duration: 4
        })
      }else if(code === -2){
        this.$notification['error']({
          message: '错误',
          description: ((err.response || {}).data || {}).message || '请输入验证码',
          duration: 4
        })
      }else{
        this.$notification['error']({
          message: '错误',
          description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
          duration: 4
        })
      }

    },
  }
}
</script>

<style lang="less" scoped>
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
