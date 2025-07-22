<!-- 我的资产 -->
<template>
  <view class="page-container" v-if="mySummary">
    <view class="page-box">
      <view class="top-box view-card">
        <view class="top-box-item">
          <view class="line-1">总资产折合（BTC）</view>
          <view class="line-2">{{ mySummary.wallet.allBTC }}</view>
        </view>
        <view class="top-box-item">
          <view class="line-1">账户总资产估值</view>
          <view class="line-2">{{ mySummary.wallet.expectMoney }}</view>
        </view>
      </view>
      <view class="top-tab-2" style="width: 100%">
        <u-subsection :list="optionList" v-model="tabActive" active-color="#2A79FF"></u-subsection>
      </view>
      <scroll-view scroll-y style="height: 400px;" @scrolltolower="loadBottom">
        <view class="list-box">
          <view class="item" v-for="a in assets" :key="a.Id">
            <template v-if="tabActive === 0">
              <view class="l-s">
                <image src="/static/my/bit-1.png" mode="aspectFit" />
                <view style="display: flex; align-items: center">
                  <view class="line-1">{{ a.moneyType }}</view>
                </view>
              </view>
              <view class="r-s">
                <view class="line-1">{{ a.moneyReal }}</view>
                <view class="line-2">≈{{ a.moneyExpect }}</view>
              </view>
            </template>
            <template v-if="tabActive === 1">
              <view class="l-s">
                <image src="/static/my/CNY.png" mode="aspectFit" />
                <view style="display: flex; align-items: center">
                  <view class="line-1">{{ a.moneyType }}</view>
                </view>
              </view>
              <view class="r-s">
                <view class="line-1">{{ a.moneyReal }}</view>
                <view class="line-2">≈{{ a.moneyExpect }}</view>
              </view>
            </template>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="black-line-bg"></view>
  </view>
</template>
<script>
import { request } from '@/utils/request';
import { getLocalStorage } from '@/utils/cache';

export default {
  data() {
    return {
      initLoadData: true,
      tabActive: 0,
      moneyCashType: '数字资产',
      mySummary: {
        wallet: {
          allBTC: '',
          expectMoney: ''
        }
      },
      assets: [],
      loadMoreConfig: {
        bottomDistance: 100,
        autoFill: false,
        allLoaded: false
      },
      optionList: [
        {
          name: '数字资产'
        },
        {
          name: '法币资产'
        },
      ]
    };
  },
  onLoad() {
    this.all();
    this.changeTabActive(0);
  },
  methods: {
    changeTabActive(index) {
      this.tabActive = index;
      this.moneyCashType = this.tabActive == 0 ? '数字资产' : '法币资产';
      if (this.tabActive === 0) {
        this.loadSZ();
      } else {
        this.loadFB();
      }
      this.loadMoreConfig.allLoaded = false;
    },
    loadBottom() {
      if (this.tabActive === 0) {
        this.loadSZ();
      } else {
        this.loadFB();
      }
    },
    all() {
      uni.showLoading({
        title: '加载中...'
      });
      request({
        method: 'GET',
        url: '/api/blade-demo/assetlegal/AllMoney',
        params: {
          userId: getLocalStorage('userId')
        }
      }).then((res) => {
        this.mySummary.wallet.allBTC = res.data.data.allBTC;
        this.mySummary.wallet.expectMoney = res.data.data.expectMoney;
      }).finally(() => {
        uni.hideLoading();
      });
    },
    loadSZ() {
      uni.showLoading({
        title: '加载中...'
      });
      request({
        method: 'GET',
        url: '/api/blade-demo/assetdigital/list',
        params: {
          userId: getLocalStorage('userId'),
          size: '999999'
        }
      }).then((res) => {
        this.assets = res.data.data.assetDigitalVOPage.records;
      }).finally(() => {
        uni.hideLoading();
      });
    },
    loadFB() {
      uni.showLoading({
        title: '加载中...'
      });
      request({
        method: 'GET',
        url: '/api/blade-demo/assetlegal/list',
        params: {
          userId: getLocalStorage('userId'),
          size: '999999'
        }
      }).then((res) => {
        this.assets = res.data.data.assetDigitalVOPage.records;
      }).finally(() => {
        uni.hideLoading();
      });
    }
  }
};
</script>
<style scoped lang="scss">
.page-container {
  padding-bottom: 60px;

  .page-box {
    padding: 9px 20px 0;

    .top-box {
      // width:335px;
      height: 88px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
      border-radius: 4px;
      margin-bottom: 20px;
      display: flex;

      .top-box-item {
        width: 50%;
        padding: 20px;

        .line-1 {
          width: 135px;
          height: 17px;
          margin-bottom: 7px;
          color: #7c8698;
          font-size: 12px; //font-size: 11px;
          line-height: 17px;
          // font-family: PingFangSC-Regular, PingFang SC;
          letter-spacing: 1px;
        }

        .line-2 {
          height: 24px;
          color: #203152;
          font-size: 16px;
          line-height: 24px;
          font-family: AvantGarde-Demi, AvantGarde;
        }
      }
    }

    .list-box {
      padding: 5px 0 0;
      // width:335px;

      .item {
        height: 70px;
        border-bottom: 1px solid #d6d6d6;
        display: flex;
        justify-content: space-between;
        padding: 10px 0 11px 10px;

        .l-s {
          display: flex;

          image {
            display: block;
            width: 49px;
            height: 49px;
            margin-right: 20px;
          }
        }

        .line-1 {
          color: #203152;
          font-size: 14px;
          height: 22px;
          line-height: 22px;
          margin-top: 5px;
          // font-family: PingFangSC-Regular, PingFang SC;
        }

        .line-2 {
          color: #7c8698;
          font-size: 12px; //font-size: 11px;
          line-height: 16px;
          margin-top: 2px;
          height: 16px;
          // font-family: PingFangSC-Regular, PingFang SC;
        }

        .r-s {
          .line-1 {
            font-weight: 500;
            // font-family: PingFangSC-Medium, PingFang SC;
          }
        }
      }
    }
  }
}
</style>
