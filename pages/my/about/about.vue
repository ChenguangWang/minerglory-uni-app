<!-- 关于MinerGlory -->
<template>
  <view class="page-container">
    <view class="page-box">
      <view class="content">
        MinerGlory交易平台是由Tsingchain Capital战略投资的一个专注于超算算力、超算服务器以及相应数字资产的交易平台。MinerGlory注册在维尔京群岛，为全球用户提供更加安全、便捷的区块资产兑换服务，聚合全球优质区块链资产，致力于打造世界级的算力资产交易平台。
      </view>
      <u-divider text="联系方式" :half-width="120" />
      <view class="contact">联系我们 support@minerglory.com</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {};
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  .page-box {
    padding: 40rpx 30rpx;
    .content {
      color: #7c8698;
      font-size: 28rpx;
      line-height: 44rpx;
      margin-bottom: 80rpx;
      text-align: left;
    }
    .contact {
      text-align: center;
      color: #444;
      font-size: 28rpx;
      margin-top: 40rpx;
    }
  }
}
</style>
