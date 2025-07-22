<!-- 登录 -->
<template>
  <view class="page-container">
    <view class="login-section">
      <view class="top-tips">
        <view class="title-tips-line-1">登录</view>
        <view class="title-tips-line-2">Please enter your username and password</view>
      </view>
      <u-form :model="form" ref="loginForm" label-position="top">
        <u-form-item label="账号" prop="mobile">
          <u-input v-model="form.mobile" placeholder="请输入用户名/手机号/邮箱" clearable />
        </u-form-item>
        <u-form-item v-if="currentLoginType === 'pwd'" label="密码" prop="password">
          <u-input v-model="form.password" placeholder="请输入密码" type="password" clearable />
        </u-form-item>
        <u-form-item v-if="currentLoginType === 'identity'" label="验证码" prop="identity">
          <u-input v-model="form.identity" placeholder="请输入验证码" clearable />
          <u-button type="primary" size="mini" @click="sendCode" :disabled="!form.mobile || codeSending" style="margin-left: 16rpx">
            {{ codeSending ? codeSecond + 's' : '获取验证码' }}
          </u-button>
        </u-form-item>
      </u-form>
      <view class="login-btn">
        <u-button type="primary" :disabled="loginBtnDisabled" @click="onBtnClick" shape="circle" style="width: 100%; margin-top: 32rpx">立即登录</u-button>
        <view style="margin-top: 32rpx">
          还没有账号？
          <text class="register-link" @click="goRegister">立即注册</text>
        </view>
      </view>
      <!-- <view class="login-type-switch">
        <text v-if="currentLoginType === 'pwd'" @click="currentLoginType = 'identity'">手机验证码登录</text>
        <text v-else @click="currentLoginType = 'pwd'">密码登录</text>
      </view> -->
    </view>
    <treaty class="u-m-t-20"></treaty>
    <u-modal v-model="showGoogleModal" title="请输入谷歌二次验证码" showCancelButton @confirm="onGoogleConfirm">
      <u-input v-model="googleCode" placeholder="请输入谷歌验证码" />
    </u-modal>
  </view>
</template>

<script>
import { request } from '@/utils/request';
import { setLocalStorage, getLocalStorage } from '@/utils/cache';
import md5 from 'js-md5';
import treaty from '@/components/doc/treaty.vue'

export default {
  components: {treaty},
  data() {
    return {
      form: {
        mobile: '',
        password: '',
        identity: ''
      },
      currentLoginType: 'pwd',
      codeSending: false,
      codeSecond: 60,
      codeTimer: null,
      showGoogleModal: false,
      googleCode: '',
      userChromeStatus: 0,
      googleAuth: false,
      googleId: '',
    };
  },
  computed: {
    loginBtnDisabled() {
      if (this.currentLoginType === 'pwd') {
        return (!/^1[3456789]\d{9}$/.test(this.form.mobile) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.mobile)) || !this.form.password;
      } else {
        return (!/^1[3456789]\d{9}$/.test(this.form.mobile) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.mobile)) || !this.form.identity;
      }
    }
  },
  onShow() {
    this.loadData();
  },
  methods: {
    goRegister() {
      uni.navigateTo({ url: '/pages/user/register' });
    },
    sendCode() {
      if (this.codeSending) return;
      // 这里应调用后端发送验证码接口
      this.$u.toast('验证码已发送');
      this.codeSending = true;
      this.codeSecond = 60;
      this.codeTimer = setInterval(() => {
        this.codeSecond--;
        if (this.codeSecond <= 0) {
          clearInterval(this.codeTimer);
          this.codeSending = false;
        }
      }, 1000);
    },
    onBtnClick() {
      if (this.userChromeStatus == 0) {
        this.login();
      } else if (this.userChromeStatus == 1) {
        this.showGoogleModal = true;
      }
    },
    onGoogleConfirm() {
      if (!this.googleCode) {
        this.$u.toast('请输入谷歌验证码');
        return;
      }
      // 校验谷歌验证码
      uni.request({
        url: '/api/blade-demo/usersafe/googleLogin',
        method: 'GET',
        data: {
          id: this.googleId,
          code: this.googleCode
        },
        success: (res) => {
          if (res.data.code == 200) {
            this.login();
          } else {
            this.$u.toast('请检查谷歌二次验证码是否正确');
          }
        }
      });
    },
    login() {
      let params = {};
      let url = '';
      if (this.currentLoginType === 'pwd') {
        params = {
          tenantId: '924188',
          username: this.form.mobile,
          password: md5(this.form.password)
        };
        url = '/api/blade-auth/oauth/token';
      } else {
        params = {
          tenantId: '924188',
          username: this.form.mobile,
          captcha: this.form.identity
        };
        url = '/api/blade-auth/oauth/telphone/token';
      }
      request({
        url,
        method: 'POST',
        params
      }).then((res) => {
        if (res.data.access_token) {
          setLocalStorage('token', res.data.token_type + ' ' + res.data.access_token);
          setLocalStorage('userId', res.data.user_id);
          this.$u.toast('登录成功');
          setTimeout(() => {
            uni.switchTab({ url: '/pages/home-page/home-page' });
          }, 500);
        } else {
          this.$u.toast('登录失败，请检查您的账号密码是否正确');
        }
      });
    },
    loadData() {
      const userId = getLocalStorage('userId');
      if (!userId) return;
      request({
        url: '/api/blade-demo/usersafe/detail',
        method: 'GET',
        data: {
          userId
        },
        success: (res) => {
          this.googleId = res.data.data.id;
          this.userChromeStatus = res.data.data.userChromeStatus;
        }
      });
    }
  },
  onUnload() {
    if (this.codeTimer) clearInterval(this.codeTimer);
  }
};
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
  .login-type-switch {
    margin-top: 32rpx;
    color: #567ffa;
    font-size: 28rpx;
    text-align: center;
    text-decoration: underline;
  }
}
</style>
