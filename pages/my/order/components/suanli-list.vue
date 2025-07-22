<template>
  <view v-if="minerOrders">
    <view class="stats" v-if="summary">
      <view class="line-1">在运营总算力</view>
      <view class="line-2">{{ summary.Power }}</view>
      <view class="line-3">
        <view>
          <view class="s-1">实时算力</view>
          <view class="s-2 s-2_green">{{ summary.PowerAverage }}</view>
        </view>
        <view>
          <view class="s-1">24小时算力</view>
          <view class="s-2">{{ summary.PowerTimely }}</view>
        </view>
      </view>
    </view>
    <view class="list-box">
      <view class="list-tab">
        <view
          class="list-tab-item"
          v-for="(i, index) in status"
          :key="index"
          :class="{ active: currentStatus == i.name }"
          @click="changeStatus(i)"
        >
          {{ i.name }}
        </view>
      </view>
      <view class="list">
        <view
          class="list-item"
          v-for="(o, index) in minerOrders"
          :key="index"
          @click="goToDetail(o)"
        >
          <view class="line-1">
            <view
              class="line-bar"
              :style="{ background: o.Status == '已过期' ? '#7C8698' : '#5680FA' }"
            ></view>
            <view class="l-sAndr-s">
              <view
                class="l-s"
                :style="{ color: o.Status == '已过期' ? '#7C8698' : '#203152' }"
              >
                {{ o.Intro }}
              </view>
              <view class="r-s">
                <text v-if="o.Status == '待付款'" style="color: #ff3750">{{ o.Status }}</text>
                <text v-if="o.Status == '待开通'" style="color: #f7b500">{{ o.Status }}</text>
                <text v-if="o.Status == '在运营'" style="color: #16cb7e">{{ o.Status }}</text>
                <text v-if="o.Status == '已过期'" style="color: #7c8698">{{ o.Status }}</text>
              </view>
            </view>
          </view>
          <view class="line-2">订单号：{{ o.Uuid }}</view>
          <view class="line-3">
            <view class="item">
              <view class="key">总金额</view>
              <view :style="{ color: o.Status == '已过期' ? '#7C8698' : '#203152' }" class="value">
                {{ o.Amount }}
              </view>
            </view>
            <view class="item">
              <view class="key">租赁算力</view>
              <view :style="{ color: o.Status == '已过期' ? '#7C8698' : '#203152' }" class="value">
                {{ o.Power }}T
              </view>
            </view>
            <view class="item">
              <view class="key">开挖时间</view>
              <view :style="{ color: o.Status == '已过期' ? '#7C8698' : '#203152' }" class="value">
                {{ o.BeginTime }}
              </view>
            </view>
            <view class="item">
              <view class="key">截止时间</view>
              <view :style="{ color: o.Status == '已过期' ? '#7C8698' : '#203152' }" class="value">
                {{ o.EndTime }}
              </view>
            </view>
          </view>
        </view>
        <!-- 如有加载更多，可插入uni-load-more组件 -->
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "SuanliList",
  data() {
    return {
      initLoadData: true,
      currentStatus: "全部",
      status: [
        { name: "全部", status: "all" },
        { name: "待付款", status: 0 },
        { name: "待开通", status: 1 },
        { name: "在运营", status: 2 },
        { name: "已过期", status: 4 },
      ],
      summary: {
        Power: "5000T",
        PowerAverage: "4.084PH/s",
        PowerTimely: "4.111PH/s",
      },
      minerOrders: [
        {
          Intro: "BTA定期3个月算力",
          Status: "在运营",
          Uuid: "20190901ZL008",
          Amount: "12345",
          Power: "4100",
          BeginTime: "2019-09-10 8:00:00",
          EndTime: "2021-01-10 8:00:00",
        },
        {
          Intro: "BTA定期3个月算力",
          Status: "待付款",
          Uuid: "Uuid",
          Amount: "12345",
          Power: "4100",
          BeginTime: "2019-09-10 8:00:00",
          EndTime: "2021-01-10 8:00:00",
        },
        {
          Intro: "BTA定期3个月算力",
          Status: "待开通",
          Uuid: "Uuid",
          Amount: "12345",
          Power: "4100",
          BeginTime: "2019-09-10 8:00:00",
          EndTime: "2021-01-10 8:00:00",
        },
        {
          Intro: "BTA定期3个月算力",
          Status: "已过期",
          Uuid: "Uuid",
          Amount: "Amount",
          Power: "Power",
          BeginTime: "BeginTime",
          EndTime: "EndTime",
        },
      ],
      loadMoreConfig: {
        bottomDistance: 100,
        autoFill: false,
        allLoaded: false,
      },
    };
  },
  onShow() {
    uni.showLoading({ title: '加载中...' });
    this.loadMinerOrders("all");
  },
  methods: {
    loadBottom() {
      this.loadMinerOrders();
    },
    changeStatus(i) {
      this.currentStatus = i.name;
      // 可根据实际需求重置 minerOrders
      this.loadMinerOrders(i.status);
    },
    goToDetail(o) {
      uni.navigateTo({
        url: `/pages/order/suanliDetail?id=${o.Uuid}`
      });
    },
    loadMinerOrders(status) {
      // 用uni.request替换axios，实际项目可用封装的request
      // uni.showLoading({ title: '加载中...' });
      const pageSize = 20;
      uni.request({
        method: 'GET',
        url: '/show/power',
        data: {
          page: Math.ceil(this.minerOrders.length / pageSize) + 1,
          ps: pageSize,
          status,
        },
        success: (res) => {
          uni.hideLoading();
          this.summary = res.data.data.output;
          const orders = res.data.data.orders;
          this.minerOrders = this.minerOrders.concat(orders);
          this.loadMoreConfig.allLoaded = orders.length < pageSize;
        },
        fail: () => {
          uni.hideLoading();
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.list-box {
  padding: 16px 10px 0;

  .list-tab {
    display: flex;
    justify-content: space-around;
    text-align: center;
    border-bottom: 1px solid #d6d6d6;
    margin-bottom: 10px;

    .list-tab-item {
      width: 16.66%;
      color: #7c8698;
      font-size: 12px;
      line-height: 17px;
      padding-bottom: 12px;
      &.active {
        border-bottom: 2px solid #5680fa;
        color: #203152;
      }
    }
  }

  .list-item {
    border-bottom: 1px solid #d6d6d6;
    padding: 14px 0;
    .line-1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .line-bar {
        width: 4px;
        height: 14px;
        background: #5680fa;
        border-radius: 2px;
      }
      .l-sAndr-s {
        width: 334px;
        display: flex;
        justify-content: space-between;
        .l-s {
          height: 22px;
          line-height: 22px;
          font-size: 14px;
          padding-left: 12px;
          font-weight: 600;
          color: #203152;
        }
        .r-s {
          font-weight: 400;
          font-size: 14px;
          height: 22px;
          line-height: 22px;
        }
      }
    }
    .line-2 {
      padding-left: 16px;
      margin-top: 4px;
      margin-bottom: 12px;
      color: #7c8698;
      font-size: 12px;
      line-height: 22px;
    }
    .line-3 {
      display: flex;
      padding-left: 16px;
      flex-wrap: wrap;
      .item {
        width: 50%;
        flex-shrink: 0;
        margin-bottom: 6px;
        .key {
          font-size: 12px;
          line-height: 16px;
          margin-bottom: 4px;
          color: #7c8698;
        }
        .value {
          font-size: 12px;
          line-height: 22px;
          color: #203152;
        }
      }
    }
  }
}

.stats {
  height: 160px;
  background: #fff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 16px;
  text-align: center;
  margin-top: 1px;

  .line-1 {
    color: #7c8698;
    line-height: 17px;
    font-size: 12px;
    margin-bottom: 4px;
    letter-spacing: 1px;
  }

  .line-2 {
    color: #203152;
    line-height: 36px;
    font-size: 24px;
    margin-bottom: 24px;
  }

  .line-3 {
    display: flex;
    justify-content: space-around;
    .s-1 {
      color: #7c8698;
      line-height: 17px;
      font-size: 12px;
      margin-bottom: 4px;
      margin-bottom: 10px;
      letter-spacing: 1px;
    }
    .s-2 {
      color: #203152;
      font-size: 16px;
      line-height: 20px;
    }
  }
}
</style>
