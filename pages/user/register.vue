<!-- 注册 -->
<template>
  <view class="page-container">
    <view class="login-section">
      <view class="top-tips">
        <view class="title-tips-line-1">注册</view>
        <view class="title-tips-line-2">Fill in the information to register an account</view>
      </view>
      <u-form :model="form" ref="registerForm" label-position="top">
        <u-form-item label="注册邮箱" prop="email">
          <u-input
            v-model="form.email"
            placeholder="请输入邮箱"
            clearable
          />
        </u-form-item>
        <!-- <view class="login-drag-box">
          <drag ref="drag" :email="form.email" @send="send"></drag>
        </view> -->
        <u-form-item label="验证码" prop="code">
          <u-input
            v-model="form.code"
            placeholder="请输入邮箱验证码"
            clearable
          />
          <u-button
            size="mini"
            @click="sendCode"
            :disabled="!form.email"
            style="margin-left: 16rpx;"
          >{{ tips || '获取验证码' }}</u-button>
          <u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
        </u-form-item>
        <u-form-item label="登录密码" prop="password">
          <u-input
            v-model="form.password"
            placeholder="请设置登录密码"
            type="password"
            clearable
          />
        </u-form-item>
        <u-form-item label="确认登录密码" prop="password2">
          <u-input
            v-model="form.password2"
            placeholder="请确认登录密码"
            type="password"
            clearable
          />
        </u-form-item>
      </u-form>
      <view class="login-btn">
        <u-button
          type="primary"
          :disabled="loginBtnDisabled"
          @click="register"
          shape="circle"
          style="width:100%;margin-top:32rpx;"
        >注册</u-button>
        <view style="margin-top: 32rpx;">
          已有账号？
          <text class="register-link" @click="goLogin">去登录</text>
        </view>
      </view>
    </view>
    <treaty class="u-m-t-20"></treaty>
  </view>
</template>

<script>
import { request } from '@/utils/request'
import md5 from 'js-md5'
import treaty from '@/components/doc/treaty.vue'

export default {
  components: {treaty},
  data() {
    return {
      emailReg: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      form: {
        email: '',
        code: '',
        password: '',
        password2: ''
      },
      codeSecond: 60,
      codeTimer: null,
      tips: '',
    }
  },
  computed: {
    loginBtnDisabled() {
      return (
        !this.emailReg.test(this.form.email) ||
        !this.form.code ||
        !this.form.password ||
        !this.form.password2 ||
        this.form.password !== this.form.password2
      )
    }
  },
  methods: {
    goLogin() {
      uni.navigateTo({ url: '/pages/user/login' })
    },
    /**
     * 发送验证码
     */
    onSendCode() {
      uni.showLoading({
						title: '正在获取验证码'
					});
      request({
          method: "get",
          url: "/api/blade-user/sendEmailCode",
          data: {
            emailaddress: this.form.email
          },
        }).then((res) => {
          uni.hideLoading();
          if (res.data.code == 200) {
            this.$u.toast('验证码已发送')
            this.$refs.uCode.start();
          }
          if (res.data.code == 400) {
            this.$u.toast(res.data.msg);
          }
        });
    },
    codeChange(text) {
      this.tips = text;
    },
    sendCode() {
      if (!this.emailReg.test(this.form.email)) {
        this.$u.toast('请输入正确的邮箱')
        return
      }
      if(this.$refs.uCode.canGetCode) {
        this.onSendCode();
      }
    },
    register() {
      request({
        method: 'POST',
        url: '/api/blade-user/regist',
        data: {
          $tenantId: '',
          $userType: '前台用户',
          deptId: '1364412325448151042',
          deptName: '',
          postId: '1364412325536231426',
          roleId: '1364424903813525505',
          roleName: '',
          tenantId: '924188',
          tenantName: '',
          userType: 2,
          userTypeName: '',
          account: this.form.email,
          name: this.form.email,
          password: md5(this.form.password),
          password2: md5(this.form.password2),
          realName: this.form.email,
          statusName: '',
          phone: '',
          email: this.form.email,
          captcha: this.form.code
        }
      }).then(res => {
        if (res.data && res.data.code == 200) {
          this.$u.toast('注册成功')
          setTimeout(() => {
            uni.navigateTo({ url: '/pages/user/login' })
          }, 500)
        } else {
          this.$u.toast(res.data && res.data.msg ? res.data.msg : '注册失败')
        }
      }).catch(error => {
        this.$u.toast(error.msg || '注册失败')
      })
    },
  },
  onUnload() {
    if (this.codeTimer) clearInterval(this.codeTimer)
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  padding: 0 40rpx;
  background: url(/static/image/bg/bg-3.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login-section {
  width: 100%;
  background: #fff;
  border-radius: 20rpx;
  box-shadow: 0 15rpx 30rpx rgba(0, 0, 0, 0.1);
  padding: 60rpx 32rpx 40rpx 32rpx;
  .top-tips {
    .title-tips-line-1 {
      font-size: 48rpx;
      font-weight: bold;
      color: #203152;
      margin-bottom: 12rpx;
    }
    .title-tips-line-2 {
      font-size: 24rpx;
      color: #7c8698;
    }
  }
  .login-btn {
    margin-top: 32rpx;
    .register-link {
      color: #0091ff;
      margin-left: 8rpx;
    }
  }
}
.login-drag-box {
  padding-bottom: 20rpx;
}
</style>
