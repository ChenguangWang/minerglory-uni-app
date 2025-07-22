<!--首页-->
<template>
  <view class="u-p-t-status-bar-height">
    <view class="u-status-bar"></view>
    <view class="page-container">
      <!-- 顶部导航栏 -->
      <view class="top-box">
        <view class="logo">
          <image src="@/static/image/tab/logo.png" mode="aspectFit" />
        </view>
        <view class="loginAndregister" v-if="hasToken">
          欢迎，
          <text class="user-name" @click="toMySetting">{{ nickName }}</text>
        </view>
        <view class="loginAndregister" v-else>
          <navigator url="/pages/user/login">
            <text>登录</text>
          </navigator>
          <text>/</text>
          <navigator url="/pages/user/register">
            <text>注册</text>
          </navigator>
        </view>
      </view>

      <!-- 轮播图 -->
      <swiper class="banner-swiper" :autoplay="true" :interval="4000" :circular="true" indicator-dots>
        <swiper-item v-for="(item, index) in bannerList" :key="index">
          <image :src="item.url" mode="aspectFill" class="banner-image" />
        </swiper-item>
      </swiper>

      <!-- 特别推荐 -->
      <view class="list">
        <text class="list-title">特别推荐</text>
        <view class="card-view" v-if="products.length < 1">
          <u-empty text="暂无推荐"></u-empty>
        </view>
        <view v-for="p in products" :key="p.Id">
          <!-- 上架并推荐才显示 -->
          <view class="list-item" @click="goToDetail(p)" v-if="p.productRecommendStatus == '是' && p.productPutawayStatus == '是'">
            <view class="m-list-item">
              <view class="pic" v-if="p.productRepertory <= 0">已售罄</view>
              <view class="product-image">
                <image :src="p.avatar || picDemoImage" mode="aspectFill" />
              </view>
              <view class="product-info">
                <view class="line-1">{{ p.productName }}</view>
                <view class="line-2Andline-3">
                  <view class="line-2">
                    <text class="fl">额定算力：</text>
                    <text class="rl">{{ p.productHashrate }}{{ p.productHashrateUnit }}</text>
                  </view>
                  <view class="line-3">
                    <text class="fl">能效比低至：</text>
                    <text class="rl">{{ p.productCop }}{{ p.productCopUnit }}</text>
                  </view>
                  <view class="line-3_1">
                    <text class="fl">回本周期：</text>
                    <text class="rl">{{ p.hbzq || '--' }}</text>
                  </view>
                  <view class="line-3_2" v-show="p.ytsy">
                    <text class="fl">一天收益：</text>
                    <text class="rl">{{ p.ytsy }}</text>
                  </view>
                  <view class="line-3_3" v-show="p.productWaybillDatetime">
                    <text class="fl">发货日期：</text>
                    <text class="rl">{{ p.productWaybillDatetime }}</text>
                  </view>
                </view>
              </view>
            </view>
            <view class="line-4">￥{{ p.productSellPrice }}</view>
            <view class="line-5">
              <view class="tag">{{ p.productFirstLabel }}</view>
              <view class="tag active">{{ p.productSecondLabel }}</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 简单三步 -->
      <view class="threeStep">
        <text class="step-title">简单三步，安心挖矿</text>
        <view class="step-content">
          <view class="step-item">
            <image src="/static/image/helper/step1.png" mode="aspectFit" class="step-icon" />
            <text class="step-text">注册账户</text>
          </view>
          <view class="step-arrow">
            <image src="/static/image/helper/step-line.png" mode="aspectFit" class="arrow-icon" />
            <text class="arrow-text">无</text>
          </view>
          <view class="step-item">
            <image src="/static/image/helper/step2.png" mode="aspectFit" class="step-icon" />
            <text class="step-text">购买矿机/算力</text>
          </view>
          <view class="step-arrow">
            <image src="/static/image/helper/step-line.png" mode="aspectFit" class="arrow-icon" />
            <text class="arrow-text">无</text>
          </view>
          <view class="step-item">
            <image src="/static/image/helper/step3.png" mode="aspectFit" class="step-icon" />
            <text class="step-text">坐等收币</text>
          </view>
        </view>
      </view>

      <!-- 合作伙伴 -->
      <view class="partner">
        <text class="partner-title">合作伙伴</text>
        <view class="partner-content">
          <view v-for="(img, index) in imgList" :key="index" class="partner-item">
            <image :src="img.url" class="partner-logo" mode="aspectFit" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getLocalStorage } from '@/utils/cache';
import { request } from '@/utils/request';

export default {
  name: 'shouye',
  data() {
    return {
      hasToken: getLocalStorage('token'),
      picDemoImage: '/static/image/taosuanli/pic-demo.png',
      nickName: '',
      bannerList: [],
      imgList: [
        { url: '/static/image/my/hezuo1.png' },
        { url: '/static/image/my/hezuo2.png' },
        { url: '/static/image/my/hezuo3.png' },
        { url: '/static/image/my/hezuo4.png' },
        { url: '/static/image/my/hezuo5.png' },
        { url: '/static/image/my/hezuo6.png' },
        { url: '/static/image/my/hezuo7.png' },
        { url: '/static/image/my/hezuo8.png' },
        { url: '/static/image/my/hezuo9.png' }
      ],
      products: []
    };
  },

  onLoad() {
    this.loadBannerList();
    this.loadProducts();
  },
  onShow(){
    this.loadMySummary();
  },
  methods: {
    // 加载轮播图
    loadBannerList() {
      // 在uni-app中，需要手动管理轮播图数据
      // static/image/banner 内的图片
      const length = 8;
      const bannerList = [];
      for (var i = 0; i < length; i++) {
        bannerList.push({
          url: `/static/image/banner/${i + 1}.jpg`
        });
      }
      this.bannerList = bannerList;
    },

    toMySetting() {
      uni.navigateTo({
        url: '/pages/my/setting'
      });
    },

    goToDetail(row) {
      if (this.tabActive === 0) {
        uni.navigateTo({
          url: `/pages/taosuanliPage/suanliDetail?id=${row.productId}`
        });
      } else {
        if (row.productRepertory > 0) {
          //库存大于0才能进入详情
          uni.navigateTo({
            url: `/pages/mall/machine-detail/machine-detail?id=${row.id}&productCop=${row.productCop}`
          });
        }
      }
    },

    loadProducts() {
      uni.showLoading({
        title: '加载中...'
      });

      request({
        method: 'GET',
        url: '/api/blade-demo/product/listSpaceTop'
      })
        .then((res) => {
          uni.hideLoading();
          this.products = res.data.data;
        })
        .catch((err) => {
          uni.hideLoading();
          uni.showToast({
            title: '加载失败',
            icon: 'none'
          });
        });
    },

    loadMySummary() {
      const userId = getLocalStorage('userId');
      if (!userId) {
        return;
      }

      request({
        method: 'GET',
        url: '/api/blade-user/info',
        data: {
          id: userId
        }
      }).then((res) => {
        this.hasToken = getLocalStorage('token');
        this.nickName = res.data.data.name;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  padding: 80px 20px 48px;
  background-color: #f5f5f5;

  .top-box {
    height: 64px;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);
    position: fixed;
    top: var(--status-bar-height);
    left: 0;
    z-index: 999;
    padding: 0 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    .logo {
      font-size: 16px;
      font-weight: 600;
      color: #203152;
      line-height: 22px;

      image {
        height: 56px;
        width: 120px;
      }
    }

    .loginAndregister {
      font-size: 14px;
      line-height: 22px;

      .user-name {
        color: #0044a0;
      }

      navigator {
        display: inline;
        color: #0044a0;
      }
    }
  }

  .banner-swiper {
    height: 120px;
    margin: 0 auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    overflow: hidden;

    .banner-image {
      width: 100%;
      height: 100%;
    }
  }

  .list {
    margin-top: 20px;
    min-height: 100px;

    .list-title {
      line-height: 22px;
      font-weight: 800;
      color: #203152;
      font-size: 18px;
      margin-bottom: 12px;
      display: block;
    }

    .list-item {
      background: #fff;
      box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      margin-bottom: 12px;
      min-height: 122px;

      .m-list-item {
        padding: 16px 20px 3px 104px;
        position: relative;
        min-height: 104px;

        .pic {
          position: absolute;
          top: 0;
          right: 0;
          height: 84px;
          width: 100px;
          background-image: url('/static/image/taosuanli/sq.png');
          background-size: 100% 100%;
          font-size: 14px;
          font-weight: 600;
          color: #999;
          text-align: center;
          line-height: 70px;
          padding-left: 20px;
        }

        .product-image {
          position: absolute;
          top: 44px;
          left: 16px;
          width: 75px;
          height: 75px;

          image {
            width: 100%;
            height: 100%;
            border-radius: 5px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
          }
        }

        .product-info {
          .line-1 {
            color: #203152;
            font-size: 14px;
            line-height: 22px;
            margin-bottom: 8px;
            font-weight: 600;
          }

          .line-2Andline-3 {
            .line-2,
            .line-3,
            .line-3_1,
            .line-3_2,
            .line-3_3 {
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              line-height: 16px;
              color: #7c8698;
            }
          }
        }
      }

      .line-4 {
        color: #ff3750;
        font-family: AvantGarde-Demi, AvantGarde;
        line-height: 22px;
        font-size: 14px;
        margin-left: 104px;
      }

      .line-5 {
        height: 40px;
        display: flex;
        align-items: center;
        margin-left: 104px;
        padding-right: 20px;

        .tag {
          height: 22px;
          border-radius: 15px;
          border: 1px solid #e7e7e7;
          text-align: center;
          font-size: 10px;
          line-height: 22px;
          color: #7c8698;
          margin-right: 10px;
          padding: 0 12px;
          background: #f0f0f0;

          &.active {
            color: #1b91ff;
            background: #e6f8ff;
            border: 1px solid #1b91ff;
          }
        }
      }
    }
  }

  .threeStep {
    margin: 24px 0;
    width: 100%;
    padding-bottom: 16px;
    background: #fff;
    overflow: hidden;

    .step-title {
      text-align: center;
      font-weight: 600;
      color: #203152;
      line-height: 22px;
      font-size: 16px;
      margin: 16px 0 20px;
      display: block;
    }

    .step-content {
      margin-top: 8px;
      display: flex;
      justify-content: space-evenly;
      color: #7c8698;
      font-size: 13px;
      line-height: 18px;
      align-items: center;

      .step-item {
        text-align: center;

        .step-icon {
          width: 40px;
          height: 40px;
          margin-bottom: 8px;
        }

        .step-text {
          display: block;
          margin-top: 8px;
        }
      }

      .step-arrow {
        text-align: center;

        .arrow-icon {
          width: 30px;
          height: 20px;
          margin-bottom: 8px;
        }

        .arrow-text {
          display: block;
          margin-top: 8px;
          color: rgba(255, 255, 255, 0);
        }
      }
    }
  }

  .partner {
    margin-bottom: 30px;

    .partner-title {
      text-align: center;
      line-height: 22px;
      font-size: 16px;
      color: #203152;
      font-weight: 600;
      margin-bottom: 16px;
      display: block;
    }

    .partner-content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .partner-item {
        width: 30%;
        text-align: center;
        height: 54px;
        margin-bottom: 6px;
        background: #fff;
        overflow: hidden;

        &:nth-child(3n) {
          margin-right: 0px;
        }

        .partner-logo {
          width: 100%;
          height: 106%;
        }
      }
    }
  }
}
</style>
