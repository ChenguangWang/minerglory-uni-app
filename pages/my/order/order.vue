<template>
  <view class="page-container">
    <view class="page-box">
      <view class="top-tab-2">
        <view class="item item-1" @click="changeTabActive(0)" :class="{ active: tabActive == 0 }"></view>
        <view class="item item-2" @click="changeTabActive(1)" :class="{ active: tabActive == 1 }"></view>
      </view>
      <SuanliList v-if="tabActive == 0"></SuanliList>
      <MachineList v-if="tabActive == 1"></MachineList>
    </view>
  </view>
</template>

<script>
import MachineList from './components/machine-list.vue';
import SuanliList from './components/suanli-list.vue';

export default {

  name: 'OrderPage',
  components: { SuanliList, MachineList },
  data() {
    return {
      tabActive: 1
    };
  },

  // onLoad(options) {
  //   // uni-app页面加载时触发
  // },

  // onShow() {
  //   // uni-app页面显示时触发
  // },

  // onReady() {
  //   // uni-app页面初次渲染完成时触发
  // },

  // onHide() {
  //   // uni-app页面隐藏时触发
  // },

  // onUnload() {
  //   // uni-app页面卸载时触发
  // },

  // 页面进入前拦截
  onBeforeRouteEnter(to, from, next) {
    tab = 1;
    if (from.path == '/orderPage/suanliDetail') {
      tab = 0;
    }
    next();
  },

  methods: {
    changeTabActive(index) {
      this.tabActive = index;
    }
  }
};
</script>

<style scoped lang="scss">
.page-container {
  padding: 40rpx 40rpx 180rpx;
  background: #fafafa;
  height: 100%;

  .page-box {
    padding-bottom: 60rpx;
  }

  .top-tab-2 {
    // display: flex;
    display: none;
    justify-content: space-around;
    align-items: center;
    padding: 20rpx 0;

    .item {
      flex: 1;
      text-align: center;
      padding: 20rpx;
      margin: 0 10rpx;
      border-radius: 10rpx;
      transition: all 0.3s ease;

      &.active {
        background-color: #007aff;
        color: #fff;
      }

      &.item-1 {
        background-color: #f5f5f5;
      }

      &.item-2 {
        background-color: #f5f5f5;
      }
    }
  }
}
</style>
