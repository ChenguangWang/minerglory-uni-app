<!-- 提币地址 -->
<template>
  <view class="page-container">
    <view class="page-box">
      <view class="tab">
        <view class="tab-item" @tap="changeTabActive(0)">
          <view :class="['inner', tabActive === 0 ? 'inner-active' : '']">
            <image src="/static/image/my/Shape.png" class="tab-icon" />
            <text>BTC</text>
          </view>
        </view>
        <view class="tab-item" @tap="changeTabActive(1)">
          <view :class="['inner', tabActive === 1 ? 'inner-active' : '']">
            <image src="/static/image/my/usdt.png" class="tab-icon" />
            <text>USDT</text>
          </view>
        </view>
      </view>
      <view class="input-box">
        <u-form ref="form" :model="form" :rules="rules" label-width="80" label-position="top">
          <u-form-item label="新地址" prop="userDrawAdress" required>
            <u-input v-model="form.userDrawAdress" placeholder="请输入新地址" />
          </u-form-item>
          <u-form-item label="确认新地址" prop="confirmAddress" required>
            <u-input v-model="form.confirmAddress" placeholder="请再次输入新地址"/>
          </u-form-item>
          <u-form-item label="地址标签" prop="userAddressLabel">
            <u-input v-model="form.userAddressLabel" placeholder="请输入地址标签" />
          </u-form-item>
        </u-form>
        <view class="btn">
          <u-button type="primary" shape="circle" @click="submit">确认添加</u-button>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { request } from '@/utils/request';
import {getLocalStorage} from '@/utils/cache';

export default {
  name: 'CreateCoinAddress',
  data() {
    return {
      tabActive: 0,
      form: {
        userDrawAdress: '',
        confirmAddress: '',
        userAddressLabel: ''
      },
      userAddressType: 'BTC',
      rules: {
        userDrawAdress: [
          { required: true, message: '请输入新地址', trigger: ['blur', 'change'] }
        ],
        confirmAddress: [
          { required: true, message: '请再次输入新地址', trigger: ['blur', 'change'] },
          { validator: (rule, value, callback) => {
              if (value !== this.form.userDrawAdress) {
                callback(new Error('两次输入的地址不同！'));
              } else {
                callback();
              }
            }, trigger: ['blur', 'change'] }
        ]
      }
    };
  },
  methods: {
    changeTabActive(index) {
      this.tabActive = index;
      this.userAddressType = index === 0 ? 'BTC' : 'USDT';
    },
    submit() {
      this.$refs.form.validate().then(valid => {
        if (!valid) return;
        let userId = '';
        try {
          userId = getLocalStorage('userId');
        } catch (e) {}
        request({
          method: 'POST',
          url: '/api/blade-demo/useraddress/save',
          data: {
            userAddressLabel: this.form.userAddressLabel,
            userAddressType: this.userAddressType,
            userDrawAdress: this.form.userDrawAdress,
            userId: userId
          }
        }).then((res) => {
          if (res.data && res.data.code === 200) {
            uni.$u.toast('添加成功！');
            setTimeout(() => {
              uni.navigateBack();
            }, 800);
          } else {
            uni.$u.toast(res.data && res.data.msg ? res.data.msg : '添加失败！');
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
    padding: 20px;
    .btn {
      margin-top: 30px;
    }
    .input-box {
      padding: 30px 16px;
    }
    .tab {
      display: flex;
      justify-content: space-between;
      margin: 16px -8px 12px;
      height: 35px;
      .tab-item {
        width: 50%;
        padding: 0 8px;
        .inner {
          background: #dee7ff;
          height: 35px;
          color: #5680fa;
          text-align: center;
          line-height: 35px;
          border-radius: 4px;
          box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          .tab-icon {
            width: 20px;
            height: 20px;
            margin-right: 8px;
          }
          &.inner-active {
            color: #fff;
            background: #5680fa;
          }
        }
      }
    }
    .input-item {
      margin-bottom: 18px;
      .title {
        font-size: 14px;
        color: #203152;
        margin-bottom: 6px;
        display: block;
      }
    }
  }
}
</style>
