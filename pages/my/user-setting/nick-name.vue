<!-- 用户设置 - 用户昵称 -->
<template>
  <view class="page-container" v-if="mySummary">
    <u-form :model="form" ref="nickNameForm" label-position="top">
      <u-form-item label="用户昵称" prop="nickname" :required="true">
        <u-input
          v-model="form.nickname"
          placeholder="请输入用户昵称"
          clearable
        />
      </u-form-item>
    </u-form>
    <view class="tips u-m-t-20">请输入2位以上，20位以内的中文、英文或数字字符。</view>
    <button class="confirm-btn" type="primary" @click="submit">确认修改</button>
  </view>
</template>
<script>
import { request } from '@/utils/request';
import { getLocalStorage } from '@/utils/cache';
export default {
  data() {
    return {
      form: {
        nickname: ''
      },
      mySummary: true, // 临时数据
      rules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: ['blur', 'change'] },
          { pattern: /^[0-9a-zA-Z\u4e00-\u9fa5-_]{2,20}$/, message: '请输入2-20位中英文或数字', trigger: ['blur', 'change'] }
        ]
      }
    };
  },
  onReady() {
    this.$refs.nickNameForm.setRules(this.rules);
  },
  methods: {
    submit() {
      this.$refs.nickNameForm.validate(valid => {
        if (!valid) return;
        request({
          method: 'post',
          url: '/api/blade-user/update',
          data: {
            name: this.form.nickname,
            id: getLocalStorage('userId')
          }
        }).then(() => {
          uni.showToast({ title: '修改成功', icon: 'none' });
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
  background: #fafafa;
  padding: 0 40px;
  .input-box {
    padding: 105px 0 20px;
    position: relative;
    .clear-img {
      position: absolute;
      bottom: 43px;
      right: 10px;
      width: 16px;
      height: 16px;
      display: block;
    }
    .input {
      height: 60px;
      border-bottom: 0.5px solid #d6d6d6; 
      width: 100%;
      background: none;
      padding: 16px 30px 16px 0px;
      line-height: 28px;
      font-size: 20px;
      color: #203152;
    }
  }
  .tips {
    color: #7c8698;
    font-size: 12px;
    line-height: 15px;
    margin-bottom: 200px;
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
