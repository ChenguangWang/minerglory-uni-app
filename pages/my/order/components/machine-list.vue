<template>
  <view v-if="minerOrders">
    <view class="stats card-view" v-if="summary">
      <view class="line-1">在运营矿机数</view>
      <view class="line-2">{{ summary.a }}台</view>
      <view class="line-3">
        <view>
          <view class="s-1">实时算力</view>
          <view class="s-2">{{ summary.b }}{{ summary.b1 }}</view>
        </view>
        <view>
          <view class="s-1">24小时算力</view>
          <view class="s-2" style="color: #ff3750">{{ summary.c }}{{ summary.c1 }}</view>
        </view>
      </view>
    </view>
    <view class="list-box card-view">
      <view class="list-tab">
        <!-- <view
          class="list-tab-item"
          v-for="(i, index) in status"
          :key="index"
          :class='{ active: (currentStatus == "" && index == 0) || currentStatus == i.orderStatus }'
          @click="changeStatus(i)"
        >
          {{ i.orderStatus }}
        </view> -->

        <u-tabs :list="status" :is-scroll="false" v-model="currentIndex" :font-size="20" :item-width="85" @change="changeStatus"></u-tabs>
      </view>
      <view class="list">
        <view
          class="list-item"
          v-for="(o, index) in minerOrders"
          :key="index"
          @click="goToDetail(o)"
        >
          <view class="l-s">
            <view class="left">
              <image src="@/static/image/my/mayi-2.png" mode="aspectFill" />
            </view>
            <view class="right">
              <view class="line-1">
                {{ o.productName }}
              </view>
              <view class="line-2" style="font-size: 12px; line-height: 13px; color: #7c8698">
                订单号：{{ o.orderId }}
              </view>
              <view class="line-3" style="font-size: 12px; line-height: 13px; color: #7c8698">
                订单类型：{{ o.productCoinType }}
              </view>
              <view class="line-3" style="font-size: 12px; line-height: 13px; color: #7c8698">
                下单时间：{{ o.orderDate }}
              </view>
            </view>
          </view>
          <view class="r-s">
            <view class="line-1">
              <text v-if="o.orderStatus == '待付款'" style="color: #ff3750">{{ o.orderStatus }}</text>
              <text v-if="o.orderStatus == '待发货'" style="color: #f7b500">{{ o.orderStatus }}</text>
              <text v-if="o.orderStatus == '待上架'" style="color: #f7b500">{{ o.orderStatus }}</text>
              <text v-if="o.orderStatus == '在运营'" style="color: #16cb7e">{{ o.orderStatus }}</text>
              <text v-if="o.orderStatus == '已结束'" style="color: #7c8698">{{ o.orderStatus }}</text>
              <text v-if="o.orderStatus == '已取消'" style="color: #7c8698">{{ o.orderStatus }}</text>
            </view>
            <view class="line-2">{{ o.orderMachineNumber }}台</view>
          </view>
        </view>
        <u-empty text="暂无数据" mode="data" v-if="minerOrders.length === 0"></u-empty>
      </view>
    </view>
  </view>
</template>
<script>
import { getLocalStorage } from "@/utils/cache";

export default {
  name: "MachineList",
  data() {
    return {
      currentIndex: 0,
      currentStatus: '',
      status: [
        {name: '全部', value: ''},
        {name: '待付款', value: '待付款'},
        {name: '待发货', value: '待发货'},
        {name: '待上架', value: '待上架'},
        {name: '在运营', value: '在运营'},
        {name: '已结束', value: '已结束'},
        {name: '已取消', value: '已取消'},
      ],
      // status: [
      //   { orderStatus: "全部", status: "" },
      //   { orderStatus: "待付款", status: "待付款" },
      //   { orderStatus: "待发货", status: "待发货" },
      //   { orderStatus: "待上架", status: "待上架" },
      //   { orderStatus: "在运营", status: "在运营" },
      //   { orderStatus: "已结束", status: "已结束" },
      //   { orderStatus: "已取消", status: "已取消" },
      // ],
      summary: {
        a: null,
        b: null,
        c: null,
        b1: null,
        c1: null,
      },
      minerOrders: [],
      loadMoreConfig: {
        bottomDistance: 100,
        autoFill: false,
        allLoaded: false,
      },
    };
  },
  mounted() {
    uni.showLoading({ title: '加载中...' });
    this.loadMinerOrders();
  },
  methods: {
    loadBottom() {
      this.loadMinerOrders();
      this.allLoaded = true;
      // 若有下拉加载组件可调用 this.$refs.loadmore.onBottomLoaded();
    },
    changeStatus(i) {
      this.currentStatus = this.status[i].value;
      uni.showLoading({ title: '加载中...' });
      this.loadMinerOrders();
    },
    goToDetail(o) {
      // 跳转详情页，需根据实际路径调整
      uni.navigateTo({
        url: `/pages/my/order/order-machine-detail?orderId=${o.orderId}&productBatchId=${o.productBatchId}&orderStatus=${o.orderStatus}`
      });
    },
    loadMinerOrders() {
      // 用uni.request替换axios，实际项目可用封装的request
      uni.request({
        method: 'GET',
        url: '/api/blade-demo/details/list',
        data: {
          orderStatus: this.currentStatus,
          userId: getLocalStorage('userId'),
        },
        success: (res) => {
          uni.hideLoading();
          const data = res.data.data;
          this.minerOrders = data.detailsAllHashrate || [];
          if(this.currentIndex == 0) {
            this.summary.a = data.AllOrderMachineNumber >= 0 ? data.AllOrderMachineNumber : '--';
            this.summary.b = data.productHashrate10m;
            this.summary.b1 = data.productHashrate10mType;
            this.summary.c = data.productHashrate1d;
            this.summary.c1 = data.productHashrate1dType;
          }
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
  // padding: 20px 10px 0;
  margin-top: 30rpx;

  .list-tab {
    display: flex;
    justify-content: space-around;
    text-align: center;
    // border-bottom: 1px solid #d6d6d6;
    margin-bottom: 10px;

    .list-tab-item {
      width: 16.66%;
      color: #7c8698;
      font-size: 12px;
      line-height: 17px;
      padding-bottom: 12px;

      .active {
        border-bottom: 2px solid #5680fa;
        color: #203152;
      }
    }
  }

  .list-item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d6d6d6;
    padding: 10px 5px 10px 0;

    .l-s {
      color: #203152;
      line-height: 22px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .r-s {
      width: 60px;
      text-align: right;
      padding-top: 10px;

      .line-1 {
        font-size: 12px;
        line-height: 22px;
        font-weight: 500;
      }

      .line-2 {
        color: #6d778b;
        line-height: 16px;
        font-size: 12px; //font-size: 11px;
        margin-top: 2px;
      }
    }

    image {
      width: 49px;
      height: 49px;
      display: inline-block;
      margin-right: 12px;
    }

    &:last-child {
      border-bottom: none;
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

  .line-1 {
    color: #7c8698;
    line-height: 17px;
    font-size: 12px; //font-size: 11px;
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
      font-size: 12px; //font-size: 11px;
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
