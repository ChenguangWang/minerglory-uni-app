<!-- 用户设置 - 修改密码 -->
<template>
  <view class="page-container">
    <u-form :model="form" ref="resetPwdForm" label-position="top">
      <u-form-item label="旧密码" prop="oldPwd" :required="true">
        <u-input v-model="form.oldPwd" placeholder="请输入旧密码" type="password" clearable />
      </u-form-item>
      <u-form-item label="新密码" prop="newPwd" :required="true">
        <u-input v-model="form.newPwd" placeholder="请输入新密码" type="password" clearable />
      </u-form-item>
      <u-form-item label="确认新密码" prop="newPwdConfirm" :required="true">
        <u-input v-model="form.newPwdConfirm" placeholder="请再次输入新密码" type="password" clearable />
      </u-form-item>
    </u-form>
    <button class="confirm-btn" type="primary" @click="submit">确认</button>
  </view>
</template>
<script>
import { request } from '@/utils/request';
import { getLocalStorage } from '@/utils/cache';
import md5 from 'js-md5';

export default {
  data() {
    return {
      form: {
        oldPwd: '',
        newPwd: '',
        newPwdConfirm: ''
      },
      rules: {
        oldPwd: [
          { required: true, message: '请输入旧密码', trigger: ['blur', 'change'] }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: ['blur', 'change'] }
        ],
        newPwdConfirm: [
          { required: true, message: '请再次输入新密码', trigger: ['blur', 'change'] },
          { validator: (rule, value, callback) => {
              if (value !== this.form.newPwd) {
                callback('两次输入的新密码不一致');
              } else {
                callback();
              }
            }, trigger: ['blur', 'change'] }
        ]
      }
    };
  },
  onReady() {
    this.$refs.resetPwdForm.setRules(this.rules);
  },
  methods: {
    submit() {
      this.$refs.resetPwdForm.validate(valid => {
        if (!valid) return;
        request({
          method: 'POST',
          url: '/api/blade-user/update-password',
          data: {
            oldPassword: md5(this.form.oldPwd),
            newPassword: md5(this.form.newPwd),
            newPassword1: md5(this.form.newPwdConfirm),
            userId: getLocalStorage('userId')
          },
        }).then(res => {
          if (res.data.success) {
              uni.showToast({ title: '修改密码成功！', icon: 'none' });
              setTimeout(() => {
                uni.navigateBack();
              }, 800);
            } else {
              uni.showToast({ title: res.data.msg, icon: 'none' });
            }
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
    padding: 105px 0 60px;
    position: relative;
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
