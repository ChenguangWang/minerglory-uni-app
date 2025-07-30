<template>
  <view class="page-container">
    <view class="page-box">
      <view class="tips-box">交易密码用户提现、提币、缴纳电费等场景</view>
      <u-form class="card-view u-m-t-20" :model="form" ref="dealPwdForm" label-position="top">
        <u-form-item label="邮箱验证码" prop="emailcode" :required="true">
          <u-input
            v-model="form.emailcode"
            placeholder="请输入邮箱验证码"
            type="number"
            clearable
          />
          <u-button size="mini" @click="sendEmailCode" :disabled="!form.email || emailCodeBtnDisabled" style="margin-left: 16rpx;">{{ emailTips || '获取验证码' }}</u-button>
          <u-verification-code ref="emailCode" @change="emailCodeChange"></u-verification-code>
        </u-form-item>
        <u-form-item label="谷歌二次验证码" prop="code" :required="true">
          <u-input
            v-model="form.code"
            placeholder="请输入谷歌二次验证码"
            type="number"
            clearable
          />
        </u-form-item>
        <u-form-item label="资金密码" prop="userDealpassword" :required="true">
          <u-input
            v-model="form.userDealpassword"
            placeholder="请输入资金密码"
            type="password"
            maxlength="6"
            clearable
            @input="onPasswordInput"
          />
        </u-form-item>
        <u-form-item label="确认资金密码" prop="confirmUserDealpassword" :required="true">
          <u-input
            v-model="form.confirmUserDealpassword"
            placeholder="请再次输入资金密码"
            type="password"
            maxlength="6"
            clearable
            @input="onConfirmPasswordInput"
          />
        </u-form-item>
      </u-form>
      <view class="btn-box">
        <button class="confirm-btn" type="primary" @click="submit">确认</button>
      </view>
    </view>
  </view>
</template>
<script>
import { request } from '@/utils/request';
import { getLocalStorage } from '@/utils/cache';
export default {
  data() {
    return {
      shimingRZ: 0,
      userChromeStatus: 0,
      phone: '',
      email: '',
      form: {
        emailcode: '',
        code: '',
        userDealpassword: '',
        confirmUserDealpassword: ''
      },
      emailTips: '',
      emailCodeBtnDisabled: false,
      rules: {
        emailcode: [
          { required: true, message: '请输入邮箱验证码', trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: '请输入谷歌二次验证码', trigger: ['blur', 'change'] }
        ],
        userDealpassword: [
          { required: true, message: '请输入资金密码', trigger: ['blur', 'change'] },
          { pattern: /^\d{6}$/, message: '资金密码必须为6位数字', trigger: ['blur', 'change'] }
        ],
        confirmUserDealpassword: [
          { required: true, message: '请再次输入资金密码', trigger: ['blur', 'change'] },
          { validator: (rule, value, callback) => {
              if (value !== this.form.userDealpassword) {
                callback('两次输入的资金密码不同');
              } else {
                callback();
              }
            }, trigger: ['blur', 'change'] }
        ]
      }
    };
  },
  onLoad(options) {
    this.shimingRZ = Number(options.shimingRZ) || 0;
    this.userChromeStatus = Number(options.userChromeStatus) || 0;
    this.phone = options.phone || '';
    this.email = options.email || '';
    this.loadMySummary();
    this.checkPrerequisites();
  },
  onReady() {
    this.$refs.dealPwdForm.setRules(this.rules);
  },
  methods: {
    checkPrerequisites() {
      if (this.shimingRZ == 0 && !this.phone && !this.email && this.userChromeStatus == 0) {
        uni.showToast({ title: '请您先进行实名认证，绑定手机号、绑定邮箱、绑定谷歌二次验证', icon: 'none' });
        return;
      }
      if (this.shimingRZ == 0) {
        uni.showToast({ title: '请您先进行实名认证！', icon: 'none' });
        return;
      }
      if (!this.phone) {
        uni.showToast({ title: '请您先绑定手机号！', icon: 'none' });
        return;
      }
      if (!this.email) {
        uni.showToast({ title: '请您先绑定邮箱！', icon: 'none' });
        return;
      }
      if (this.userChromeStatus == 0) {
        uni.showToast({ title: '请您先绑定谷歌二次验证！', icon: 'none' });
        return;
      }
    },
    loadMySummary() {
      request({
        method: 'get',
        url: '/api/blade-user/info',
        data: {
          id: getLocalStorage('userId')
        }
      }).then(res => {
        this.form.email = res.data.data.email;
      });
    },
    sendEmailCode() {
      if (!this.form.email) {
        uni.showToast({ title: '请先绑定邮箱', icon: 'none' });
        return;
      }
      if (this.$refs.emailCode.canGetCode) {
        uni.showLoading({ title: '正在获取验证码' });
        request({
          method: 'get',
          url: '/api/blade-user/sendEmailCode',
          data: {
            emailaddress: this.form.email
          }
        }).then(res => {
          uni.hideLoading();
          if (res.data.code == 200) {
            this.$u.toast('验证码已发送');
            this.$refs.emailCode.start();
          } else {
            this.$u.toast(res.data.msg || '发送失败');
          }
        });
      }
    },
    emailCodeChange(text) {
      this.emailTips = text;
      this.emailCodeBtnDisabled = text !== '获取验证码' && text !== '重新获取';
    },
    onPasswordInput(value) {
      this.form.userDealpassword = value.replace(/\D/g, '');
    },
    onConfirmPasswordInput(value) {
      this.form.confirmUserDealpassword = value.replace(/\D/g, '');
    },
    submit() {
      this.checkPrerequisites();
      this.$refs.dealPwdForm.validate(valid => {
        if (!valid) return;
        request({
          method: 'get',
          url: '/api/blade-demo/usersafe/dealVerification',
          data: {
            emailcode: this.form.emailcode,
            code: this.form.code,
            userDealpassword: this.form.userDealpassword,
            userId: getLocalStorage('userId')
          }
        }).then(res => {
          uni.showToast({ title: '设置成功', icon: 'none' });
          setTimeout(() => {
            uni.navigateBack();
          }, 800);
        });
      });
    }
  }
};
</script>
<style scoped lang="scss">
.page-container {
  .page-box {
    padding: 10px 20px 80px;
    .tips-box {
      min-height: 46px;
      background: #fff;
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
      border-radius: 4px;
      color: #7c8698;
      padding: 12px 10px;
      line-height: 22px;
      font-size: 12px;
    }
    .input-box {
      padding: 40px 20px 20px;
    }
  }
}
.confirm-btn {
  width: 100%;
  margin-top: 30px;
  background: #007aff;
  color: #fff;
  border-radius: 4px;
  height: 44px;
  font-size: 16px;
}
</style>
