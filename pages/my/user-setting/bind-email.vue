<!-- 用户设置 - 绑定邮箱 -->
<template>
  <view class="page-container">
    <u-form v-if="hasEmail" :model="form" label-position="top">
      <u-form-item label="邮箱">
        <view>
          <u-input v-model="form.email" disabled />
          <view class="tips">您已有邮箱，无法重新设置</view>
        </view>
      </u-form-item>
    </u-form>
    <u-form v-else :model="form" ref="bindEmailForm" label-position="top">
      <u-form-item label="邮箱" prop="email" :required="true">
        <u-input v-model="form.email" placeholder="请输入绑定的邮箱" clearable />
      </u-form-item>
      <u-form-item label="验证码" prop="code" :required="true">
        <u-input v-model="form.code" placeholder="请输入收到的验证码" clearable />
        <u-button size="mini" @click="sendCode" :disabled="!form.email || codeBtnDisabled" style="margin-left: 16rpx;">{{ tips || '获取验证码' }}</u-button>
        <u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
      </u-form-item>
    </u-form>
    <button v-if="!hasEmail" class="confirm-btn" type="primary" @click="submit">确认设置</button>
  </view>
</template>

<script>
import { request } from '@/utils/request';
import { getLocalStorage } from '@/utils/cache';
export default {
  data() {
    return {
      form: {
        email: '',
        code: ''
      },
      hasEmail: false,
      shimingRZ: 0,
      tips: '',
      codeBtnDisabled: false,
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: ['blur', 'change'] },
          { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  onReady() {
    this.$refs.bindEmailForm.setRules(this.rules);
  },
  onLoad() {
    this.loadMySummary();
    this.loadData();
  },
  methods: {
    loadData() {
      request({
        method: 'GET',
        url: '/api/blade-demo/usersafe/detail',
        data: {
          userId: getLocalStorage('userId')
        },
      }).then(res => {
        this.shimingRZ = res.data.data.userRealnameStaus;
      });
    },
    submit() {
      this.$refs.bindEmailForm.validate(valid => {
        if (!valid) return;
        request({
          method: 'GET',
          url: '/api/blade-demo/usersafe/bindingemailVerification',
          data: {
            userId: getLocalStorage('userId')?.value,
            emailaddress: this.form.email,
            emailcode: this.form.code
          },
        }).then(res => {
          if (res.data.code == 200) {
            this.hasEmail = true;
            uni.navigateBack();
          } else {
            uni.showToast({ title: '请检查邮箱验证码是否正确', icon: 'none' });
          }
        });
      });
    },
    loadMySummary() {
      request({
        method: 'GET',
        url: '/api/blade-user/info',
      }).then(res => {
        this.hasEmail = !!res.data.data.email;
        this.form.email = res.data.data.email || '';
      });
    },
    onSendCode() {
      uni.showLoading({ title: '正在获取验证码' });
      request({
        method: 'get',
        url:  "/api/blade-user/sendEmailCode",
        data: {
          email: this.form.email
        },
      }).then((res) => {
        uni.hideLoading();
        if (res.data.code == 200) {
          this.$u.toast('验证码已发送');
          this.$refs.uCode.start();
        } else {
          this.$u.toast(res.data.msg || '发送失败');
        }
      });
    },
    codeChange(text) {
      this.tips = text;
      this.codeBtnDisabled = text !== '获取验证码' && text !== '重新获取';
    },
    sendCode() {
      // 校验邮箱格式
      const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailReg.test(this.form.email)) {
        this.$u.toast('请输入正确的邮箱');
        return;
      }
      if (this.$refs.uCode.canGetCode) {
        this.onSendCode();
      }
    }
  }
}
</script>

<style scoped lang="scss">
.page-container {
  background: #fafafa;
  padding: 0 40px;
  .input-box {
    padding: 105px 0 150px;
    position: relative;
  }
}
.tips {
  color: #7c8698;
  font-size: 12px;
  line-height: 20px;
  margin-bottom: 200px;
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
