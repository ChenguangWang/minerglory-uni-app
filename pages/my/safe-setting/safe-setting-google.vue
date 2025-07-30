<template>
  <view class="page-container" v-if="userChromeStatus != null">
    <view class="page-box">
      <view class="code-box">
        <image :src="url" />
        <view class="tips-1">16位密钥</view>
        <view class="tips-2">{{ googleSecret }}</view>
      </view>
      <view class="tip" v-if="userChromeStatus == 0">
        *请将上方16位恢复密钥备份在安全地址，遗失密钥将无法恢复两步验证
      </view>
      <!-- 未设置 -->
      <view v-if="userChromeStatus == 0" class="card-view">
        <u-form :model="form" ref="googleForm" label-position="top">
          <u-form-item label="谷歌两步验证码" prop="code" :required="true">
            <u-input
              v-model="form.code"
              placeholder="请输入验证码"
              type="number"
              clearable
            />
            <u-button size="mini" @click="sendGoogleCode" :disabled="googleCodeBtnDisabled" style="margin-left: 16rpx;">{{ googleTips || '获取验证码' }}</u-button>
            <u-verification-code ref="googleCode" @change="googleCodeChange"></u-verification-code>
          </u-form-item>
        </u-form>
        <view class="btn-box">
          <button class="confirm-btn" type="primary" @click="confirm">确定</button>
        </view>
      </view>
      <!-- 已设置 -->
      <view v-else>
        <view class="btn-box">
          <button class="confirm-btn" type="primary" @click="goBack">我已设置并备份密钥</button>
        </view>
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
      options: {},
      code: "",
      url: "",
      googleSecret: "",
      myInfo: "hhh",
      userChrome: "",
      userChromeStatus: null,
      form: {
        code: ''
      },
      googleTips: '',
      googleCodeBtnDisabled: false,
      rules: {
        code: [
          { required: true, message: '请输入谷歌两步验证码', trigger: ['blur', 'change'] },
          { pattern: /^\d{6}$/, message: '验证码必须为6位数字', trigger: ['blur', 'change'] }
        ]
      }
    };
  },
  onLoad(options) {
    this.options = options;
    this.userChromeStatus = Number(options.userChromeStatus) || 0;
    this.sixteen();
  },
  onReady() {
    if (this.userChromeStatus == 0) {
      this.$refs.googleForm.setRules(this.rules);
    }
  },
  methods: {
    goBack() {
      uni.navigateTo({
        url: `/pages/my/safe-setting/safe-setting`
      });
    },
    // 16位秘钥
    sixteen() {
      request({
        method: "get",
        url: "/api/blade-demo/usersafe/generateGoogleSecret",
        data: {
          userId: getLocalStorage('userId'),
          id: this.options.id
        }
      }).then((res) => {
        this.googleSecret = res.data.data.googleSecret; //32位密钥
        this.userChrome = res.data.data.userChrome; //二维码的参数
        this.ewm();
      });
    },
    //二维码
    ewm() {
      request({
        method: "get",
        url: "/api/blade-demo/usersafe/genQrCode",
        responseType: 'arraybuffer',
        data: {
          secretQrCode: this.userChrome,
        }
      }).then((res) => {
        console.log("二维码的返回", res.data);
        // 在uni-app中直接使用返回的图片URL
        const base64 = uni.arrayBufferToBase64(res.data);
        this.url = 'data:image/jpeg;base64,'+ base64;
      });
    },
    sendGoogleCode() {
      if (this.$refs.googleCode.canGetCode) {
        uni.showLoading({ title: '正在获取验证码' });
        request({
          method: 'get',
          url: '/api/sendGoogleCode',
          data: {
            userId: getLocalStorage('userId')
          }
        }).then(res => {
          uni.hideLoading();
          if (res.data.code == 200) {
            this.$u.toast('验证码已发送');
            this.$refs.googleCode.start();
          } else {
            this.$u.toast(res.data.msg || '发送失败');
          }
        });
      }
    },
    googleCodeChange(text) {
      this.googleTips = text;
      this.googleCodeBtnDisabled = text !== '获取验证码' && text !== '重新获取';
    },
    confirm() {
      this.$refs.googleForm.validate(valid => {
        if (!valid) return;
        request({
          method: "get",
          url: "/api/blade-demo/usersafe/googleLogin",
          data: {
            id: this.options.id,
            code: this.form.code //验证码
          }
        }).then((res) => {
          if (res.data.code == 200) {
            uni.showToast({ title: '设置成功', icon: 'none' });
            setTimeout(() => {
              uni.navigateBack();
            }, 800);
          }
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
    color: #7c8698;

    .code-box {
      height: 344px;
      background: #fff;
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
      border-radius: 4px;
      padding-top: 30px;
      text-align: center;

      image {
        width: 220px;
        height: 220px;
        display: block;
        margin: 0 auto 24px;
      }

      .tips-1 {
        font-size: 12px;
        line-height: 17px;
        margin-bottom: 8px;
        font-weight: 600;
        color: #7c8698;
      }

      .tips-2 {
        font-size: 16px;
        line-height: 22px;
        color: #7c8698;
      }
    }

    .tip {
      margin: 24px 20px 20px;
      font-size: 12px;
      line-height: 16px;
      height: 34px;
      color: #7c8698;
    }

    .form-box {
      padding: 0 20px;
    }

    .btn-box {
      margin-top: 40px;
    }
  }
}
.confirm-btn {
  width: 100%;
  background: #007aff;
  color: #fff;
  border-radius: 4px;
  height: 44px;
  font-size: 16px;
}
</style>
