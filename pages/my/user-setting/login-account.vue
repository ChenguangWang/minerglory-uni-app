<!-- 用户设置 - 用户名 -->
<template>
  <view class="page-container">
    <u-form :model="form" :rules="rules" ref="formRef" label-position="top">
      <u-form-item label="用户名" prop="account">
        <u-input
          v-model="form.account"
          placeholder="请输入用户名"
          :disabled="hasName"
          clearable
        >
          <template v-if="!hasName" #suffix>
            <image
              class="clear-img"
              src="/static/image/my/clear.png"
              @tap="clearText"
              style="width: 16px; height: 16px"
            />
          </template>
        </u-input>
      </u-form-item>
    </u-form>
    <view class="tips" v-if="!hasName">
      请输入6位以上，20位以内的英文或数字字符。<br />
      一旦设置，不可修改，请您慎重。
    </view>
    <view class="tips" v-else>
      您已有登录帐号，无法重新设置
    </view>
    <u-button
      class="btn0"
      type="primary"
      @tap="submit"
      :disabled="hasName"
      v-if="!hasName"
      shape="circle"
      style="width: 100%; margin-top: 32rpx"
    >确认设置</u-button>
  </view>
</template>

<script>
import { request } from '@/utils/request';
import {getLocalStorage} from '@/utils/cache';

export default {
  name: 'user-setting-login-account',
  data() {
    return {
      hasName: false,
      form: {
        account: ''
      },
      rules: {
        account: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^[0-9a-zA-Z\u4e00-\u9fa5]{6,20}$/,
            message: '请输入6-20位中英文或数字',
            trigger: ['blur', 'change']
          }
        ]
      }
    };
  },
  onLoad() {
    this.loadMySummary();
  },
  methods: {
    clearText() {
      this.form.account = '';
    },
    async loadMySummary() {
      try {
        const res = await request({
          url: '/api/blade-user/info',
          method: 'GET'
        });
        const account = res.data.data.account;
        this.hasName = !!account;
        this.form.account = account || '';
      } catch (e) {}
    },
    submit() {
      this.$refs.formRef.validate().then(async (valid) => {
        if (!valid) return;
        try {
          await request({
            url: '/api/blade-user/update',
            method: 'POST',
            data: {
              account: this.form.account,
              id: getLocalStorage('userId')
            }
          });
          this.hasName = true;
          uni.navigateBack();
        } catch (e) {}
      });
    }
  }
};
</script>

<style scoped lang="scss">
.page-container {
  background: #fafafa;
  padding: 0 40px;

  .tips {
    color: #7c8698;
    font-size: 12px;
    line-height: 20px;
    margin-bottom: 200px;
  }
}
</style>
