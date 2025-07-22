<!-- 用户设置 -->
<template>
  <view class="page-container" v-if="mySummary">
    <view class="info">
      <view class="l-s">
        <u-avatar :src="avatarUrl" size="large"  />
        <view class="text">
          <!-- 昵称 -->
          <view class="line-1">{{ mySummary.name }}</view>
          <!-- 手机号 -->
          <view class="line-2">{{ mySummary.phone }}</view>
        </view>
      </view>
      <view class="r-s">
        <u-icon name="setting" size="36" @click="goTo('/pages/my/mySettingNickname')" />
      </view>
    </view>
    <u-cell-group :border="false" class="card-view">
      <u-cell-item title="登录帐号" isLink @click="goTo('/pages/my/mySettingName')" />
      <u-cell-item title="绑定邮箱" isLink @click="goTo('/pages/my/mySettingEmail')" />
      <u-cell-item :border-bottom="false" title="修改密码" isLink @click="goTo('/pages/my/mySettingResetPwd')" />
    </u-cell-group>
    <view class="exit-btn-wrap">
      <u-button class="exit-btn" type="error" shape="circle" @click="showLogout = true">退出登录</u-button>
    </view>
    <u-modal v-model="showLogout" title="提示" content="确认退出?" @confirm="exit" showCancelButton />
  </view>
</template>

<script>
import { request } from '@/utils/request'
import { deleteLocalStorage, getLocalStorage } from '@/utils/cache'
export default {
  data() {
    return {
      mySummary: {},
      userChromeStatus: '',
      showLogout: false
    }
  },
  computed: {
    avatarUrl() {
      return this.mySummary.avatar || '/static/image/my/man.svg'
    }
  },
  onShow() {
    this.loadMySummary()
    this.loadData()
  },
  methods: {
    goTo(url) {
      uni.navigateTo({ url })
    },
    loadMySummary() {
      request({
        method: 'GET',
        url: '/api/blade-user/info',
        data: {
          id: getLocalStorage('userId')
        }
      }).then(res => {
        this.mySummary = res.data.data
      })
    },
    loadData() {
      request({
        method: 'GET',
        url: '/api/blade-demo/usersafe/detail',
        data: {
          userId: getLocalStorage('userId')
        }
      }).then(res => {
        this.userChromeStatus = res.data.data.userChromeStatus
      })
    },
    exit() {
      request({
        method: 'GET',
        url: '/api/blade-auth/oauth/logout'
      }).then(() => {
        deleteLocalStorage('token')
        deleteLocalStorage('userId')
        this.$u.toast('已退出登录')
        setTimeout(() => {
          uni.reLaunch({ url: '/pages/user/login' })
        }, 500)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20rpx 32rpx 0 32rpx;
  background: #f5f6fa;
  height: 100%;
}
.info {
  margin: 20rpx 0 32rpx;
  background: #fff;
  box-shadow: 0 10rpx 20rpx 0 rgba(0,0,0,0.05);
  border-radius: 12rpx;
  padding: 32rpx 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .l-s {
    display: flex;
    align-items: center;
    .text {
      margin-left: 24rpx;
      .line-1 {
        font-weight: 600;
        color: #203152;
        font-size: 32rpx;
        margin-bottom: 8rpx;
      }
      .line-2 {
        color: #203152;
        font-size: 24rpx;
        font-weight: 400;
      }
    }
  }
  .r-s {
    margin-left: 16rpx;
  }
}
.exit-btn-wrap {
  margin: 80rpx 0 0 0;
  display: flex;
  justify-content: center;
}
.exit-btn {
  width: 80vw;
  font-size: 32rpx;
  font-weight: 600;
}
</style>
