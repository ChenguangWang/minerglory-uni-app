<!-- 我的 -->
<template>
  <view class="page-container" v-if="mySummary">
    <view class="basic-info u-flex u-flex-col u-row-center">
      <u-avatar :src="avatarUrl" size="large" bg-color="#FFFFFF" />
      <view class="name">{{ mySummary.name || '--' }}</view>
    </view>

    <!-- 资产统计 -->
    <view class="money-stats" v-if="mySummary">
      <view class="line-1">总资产折合（BTC）</view>
      <view class="line-2">{{ allBTC || '--' }}</view>
      <image class="bit" src="@/static/image/my/bit.png" mode="aspectFit" />
    </view>

    <!-- 功能区块 -->
    <u-grid :col="3" class="tab u-p-0">
      <u-grid-item @click="goTo('/pages/my/order/order')">
        <image src="@/static/image/my/icon-3.png" class="icon" />
        <text>我的订单</text>
      </u-grid-item>
      <u-grid-item @click="goTo('/pages/my/property/property')">
        <image src="@/static/image/my/icon-1.png" class="icon" />
        <text>我的资产</text>
      </u-grid-item>
      <u-grid-item @click="goTo('/pages/my/bill/bill')">
        <image src="@/static/image/my/icon-2.png" class="icon" />
        <text>我的账单</text>
      </u-grid-item>
    </u-grid>

    <!-- 个人中心 -->
    <view class="jump-group card-view u-p-b-0">
      <view class="title">个人中心</view>
      <u-cell-group :border="false">
        <u-cell-item title="用户设置" isLink @click="goTo('/pages/my/user-setting/user-setting')" />
        <u-cell-item title="安全设置" isLink @click="goTo('/pages/my/mySafeAddress')" />
        <u-cell-item title="提币地址" :border-bottom="false" isLink @click="goTo('/pages/my/coin-address/coin-address')" />
      </u-cell-group>
    </view>

    <!-- 关于我们 -->
    <view class="jump-group card-view u-p-b-0">
      <view class="title">关于我们</view>
      <u-cell-group :border="false">
        <u-cell-item title="帮助中心" isLink @click="goTo('/pages/my/help/help')" />
        <u-cell-item title="关于MinerGlory" :border-bottom="false" isLink @click="goTo('/pages/my/about/about')" />
      </u-cell-group>
    </view>
  </view>
</template>

<script>
import { request } from '@/utils/request';
import { getLocalStorage } from '@/utils/cache';

export default {
  data() {
    return {
      allBTC: '',
      mySummary: {}
    };
  },
  computed: {
    avatarUrl() {
      // 可根据mySummary返回的头像字段调整
      return this.mySummary.avatar || '/static/image/my/man.svg';
    }
  },
  onShow() {
    this.loadMySummary();
    this.loadAllBTC();
  },
  methods: {
    goTo(url) {
      uni.navigateTo({ url });
    },
    loadMySummary() {
      uni.showLoading({ title: '加载中...' });
      request({
        url: '/api/blade-user/info',
        method: 'GET',
        data: {
          id: getLocalStorage('userId')
        }
      })
        .then((res) => {
          this.mySummary = res.data.data;
        })
        .catch((err) => {
          const { code, msg } = err;
          if (code !== 200) {
            uni.showToast({
              title: msg,
              icon: 'none'
            });
            // 跳转登录页面
            uni.navigateTo({
              url: '/pages/user/login'
            });
          }
        })
        .finally(() => {
          uni.hideLoading();
        });
    },
    loadAllBTC() {
      uni.showLoading({ title: '加载中...' });
      request({
        url: '/api/blade-demo/assetlegal/AllMoney',
        method: 'GET',
        data: {
          userId: getLocalStorage('userId')
        }
      })
        .then((res) => {
          this.allBTC = res.data.data.allBTC;
        })
        .finally(() => {
          uni.hideLoading();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  height: 100%;
  padding: 0 40rpx;
  background: #f5f6fa;
  overflow-y: auto;
  overflow-x: hidden;
}
.basic-info {
  padding-top: 48rpx;
  .name {
    font-size: 36rpx;
    font-weight: 600;
    margin-top: 24rpx;
    color: #203152;
  }
}
.money-stats {
  background: rgba(86, 128, 250, 0.8);
  border-radius: 16rpx;
  margin: 32rpx 0;
  padding: 48rpx 40rpx;
  color: #fff;
  position: relative;
  .line-1 {
    font-size: 24rpx;
    margin-bottom: 32rpx;
  }
  .line-2 {
    font-size: 48rpx;
    font-weight: bold;
  }
  .bit {
    position: absolute;
    top: 16rpx;
    right: -40px;
    height: 90%;
  }
}
.tab {
  margin: 32rpx 0 24rpx;
  .icon {
    width: 48rpx;
    height: 48rpx;
    margin-bottom: 16rpx;
  }
}
.jump-group {
  margin-bottom: 32rpx;
  .title {
    border-left: 4px solid #5680fa;
    font-size: 28rpx;
    font-weight: 500;
    padding-left: 24rpx;
    color: #203152;
  }
}
</style>
