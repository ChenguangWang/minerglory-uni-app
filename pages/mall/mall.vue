<template>
  <view class="page-container">
    <!-- 顶部tab -->
    <!-- <u-tabs :list="tabList" :current="tabActive" @change="changeTabActive" /> -->

    <!-- 商品列表，滚动加载 -->
    <scroll-view scroll-y style="height: 100%" @scrolltolower="getProductList">
      <view v-for="p in products" :key="p.id">
        <view class="list-item">
          <view class="m-list-item">
            <view class="pic" v-if="p.productRepertory <= 0">已售罄</view>
            <image :src="p.avatar || picDemoImage" class="product-img" mode="aspectFill" />
            <view class="info">
              <view class="line-1">{{ p.productName }}</view>
              <view class="line-2">
                <text class="fl">额定算力：</text>
                <text class="rl">{{ p.productHashrate }}{{ p.productHashrateUnit }}</text>
              </view>
              <view class="line-3">
                <text class="fl">能耗比：</text>
                <text class="rl">{{ p.productCop }}{{ p.productCopUnit }}</text>
              </view>
              <view class="line-3_1">
                <text class="fl">回本周期：</text>
                <text class="rl">{{ p.hbzq || '--' }}</text>
              </view>
              <view class="line-3_2" v-if="p.ytsy">
                <text class="fl">一天收益：</text>
                <text class="rl">{{ p.ytsy }}</text>
              </view>
              <view class="line-3_3" v-if="p.productWaybillDatetime">
                <text class="fl">发货日期：</text>
                <text class="rl">{{ p.productWaybillDatetime }}</text>
              </view>
              <view class="line-4">￥{{ p.productSellPrice }}</view>
              <view class="line-5">
                <view>{{ p.productFirstLabel }}</view>
                <view class="active">{{ p.productSecondLabel }}</view>
              </view>
            </view>
          </view>
          <view class="line-6">
            <button class="buy-btn" type="primary" size="mini" :disabled="p.productRepertory <= 0" @click="goToDetail(p)">立即抢购</button>
          </view>
        </view>
      </view>
      <!-- 无数据 -->
      <view v-if="!products.length && !loading" class="empty">暂无商品</view>
      <!-- 加载中/没有更多 -->
      <view v-if="loading" class="loadmore">加载中...</view>
      <view v-else-if="loadStatus === 'nomore' && products.length" class="loadmore">没有更多了</view>
    </scroll-view>

    <!-- 加载中/没有更多 -->
    <!-- <u-loadmore :status="loadStatus" /> -->
  </view>
</template>

<script>
import { request } from '@/utils/request';

export default {
  data() {
    return {
      tabList: [{ name: '算力' }, { name: '矿机' }],
      tabActive: 1, // 默认矿机
      products: [],
      current: 1,
      pagesize: 10,
      loading: false,
      loadStatus: 'loadmore', // loading, nomore
      picDemoImage: '/static/image/taosuanli/pic-demo.png'
    };
  },
  onShow() {
    this.resetList();
    this.getProductList();
  },
  methods: {
    resetList() {
      this.products = [];
      this.current = 1;
      this.loadStatus = 'loadmore';
    },
    changeTabActive(index) {
      this.tabActive = index;
      this.resetList();
      this.getProductList();
    },
    getProductList() {
      if (this.loading || this.loadStatus === 'nomore') return;
      this.loading = true;
      request({
        url: '/api/blade-demo/product/pageByProductRepertory',
        method: 'GET',
        data: {
          current: this.current,
          size: this.pagesize
        }
      }).then((res) => {
        this.loading = false;
        const list = (res.data.data && res.data.data.records) || [];
        this.products = this.products.concat(list).filter((item) => item.productPutawayStatus === '是');
        if (list.length < this.pagesize) {
          this.loadStatus = 'nomore';
        } else {
          this.current += 1;
          this.loadStatus = 'loadmore';
        }
      });
    },
    goToDetail(row) {
      if (this.tabActive === 0) {
        uni.navigateTo({ url: `/pages/mall/machine-detail/machine-detail?id=${row.id}` });
      } else {
        if (row.productRepertory > 0) {
          uni.navigateTo({ url: `/pages/mall/machine-detail/machine-detail?id=${row.id}&productCop=${row.productCop}` });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  padding: 0;
  background: #f5f6fa;
  height: 100%;
}
.scroll-view {
  width: 100%;
}
.list-item {
  background: #fff;
  box-shadow: 4rpx 4rpx 20rpx rgba(0, 0, 0, 0.1);
  border-radius: 8rpx;
  margin: 24rpx 20rpx 0 20rpx;
  min-height: 244rpx;
  .m-list-item {
    display: flex;
    position: relative;
    padding: 40rpx 40rpx 20rpx 208rpx;
    .pic {
      position: absolute;
      top: 0;
      right: 0;
      height: 168rpx;
      width: 200rpx;
      background-image: url('/static/image/taosuanli/sq.png');
      background-size: 100% 100%;
      font-size: 28rpx;
      font-weight: 600;
      color: #999;
      text-align: center;
      line-height: 140rpx;
      padding-left: 40rpx;
    }
    .product-img {
      position: absolute;
      top: 102rpx;
      left: 32rpx;
      width: 150rpx;
      height: 150rpx;
      border-radius: 10rpx;
      box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
    }
    .info {
      flex: 1;
      .line-1 {
        color: #203152;
        font-size: 32rpx;
        font-weight: 800;
        margin-bottom: 16rpx;
      }
      .line-2,
      .line-3,
      .line-3_1,
      .line-3_2,
      .line-3_3 {
        display: flex;
        justify-content: space-between;
        font-size: 24rpx;
        color: #7c8698;
      }
      .line-4 {
        margin: 8rpx 0;
        color: #ff3750;
        font-size: 28rpx;
      }
      .line-5 {
        display: flex;
        align-items: center;
        > view {
          border-radius: 30rpx;
          border: 1rpx solid #e7e7e7;
          font-size: 20rpx;
          color: #7c8698;
          margin-right: 20rpx;
          padding: 0 24rpx;
          background: #f0f0f0;
        }
        .active {
          color: #1b91ff;
          background: #e6f8ff;
          border: 1rpx solid #1b91ff;
        }
      }
    }
  }
  .line-6 {
    padding: 0 32rpx 32rpx;
  }
}
.buy-btn {
  width: 100%;
  background: #567ffa;
  color: #fff;
  border-radius: 8rpx;
}
.empty,
.loadmore {
  text-align: center;
  color: #bbb;
  padding: 32rpx 0;
  font-size: 28rpx;
}
</style>
