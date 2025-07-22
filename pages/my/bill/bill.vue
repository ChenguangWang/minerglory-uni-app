<template>
  <view class="page-container">
    <u-calendar v-model="showCalendar" mode="range" :safe-area-inset-bottom="true" min-date="2022-01-01" @change="handleDateChange"></u-calendar>

    <view class="date-range-wrap u-flex u-row-center">
      <view class="date-range-title">账单日期：</view>
      <view style="flex: 1"></view>
      <view class="date-range-content u-flex" @click="showCalendar = true">
        <view class="date-range-item">
          {{ startDate }}
        </view>
        <view style="margin: 0 6px">至</view>
        <view class="date-range-item" >
          {{ endDate }}
        </view>
      </view>
    </view>

    <view class="page-box">
      <view class="top-box u-flex u-flex-wrap">
        <view class="top-box-item">
          <view class="line-1">客户电费</view>
          <view class="line-2">￥{{ overViewData.electricityFee || 0 }}</view>
        </view>
        <view class="top-box-item">
          <view class="line-1">运营费</view>
          <view class="line-2">￥{{ overViewData.operationFee || 0 }}</view>
        </view>
        <view class="top-box-item">
          <view class="line-1">托管费</view>
          <view class="line-2">￥{{ overViewData.tuoguanFee || 0 }}</view>
        </view>
        <view class="top-box-item col-50">
          <view class="line-1">上期结余</view>
          <view class="line-2">￥{{ overViewData.balanceMoney || 0 }}</view>
        </view>
        <view class="top-box-item col-50">
          <view class="line-1">结算币价</view>
          <view class="line-2">￥{{ overViewData.btcPrice || 0 }}</view>
        </view>
        <view class="top-box-item col-50">
          <view class="line-1">本期收益</view>
          <view class="line-2">
            {{ overViewData.incomeMoney || 0 }}
            {{ overViewData.billCurrencyType }}
          </view>
        </view>
        <view class="top-box-item col-50">
          <view class="line-1">历史收益</view>
          <view class="line-2">
            {{ overViewData.hisIncomeMoney || 0 }}
            {{ overViewData.billCurrencyType }}
          </view>
        </view>
      </view>

      <u-button
        type="primary"
        style="width: 100%; margin: 12px 0; background: #5680fa"
        v-show="overViewData.billStatus == 2"
        @click="toPay"
      >
        本期应缴 ￥{{ overViewData.payMoney || 0 }}
      </u-button>
      <view class="card-view u-m-t-30">
        <u-empty v-if="billList && billList.length == 0" text="暂无数据"></u-empty>
        <view class="list">
        <view
          class="item"
          v-for="(item, index) in billList"
          :key="index"
          @click="handleClickBill(item)"
        >
            <view class="line-1">
              <view class="l-sAndr-s">
                <view class="dot"></view>
                <view class="l-s">
                  账单日期：{{ item.billBeginDate }} - {{ item.billEndDate }}
                </view>
              </view>
            </view>
            <view class="content u-flex">
              <view class="line-2">
                <view class="r-s">
                  <text class="label">收益金额：</text>
                  {{ item.incomeMoney }} {{ item.billCurrencyType }}
                </view>
                <view class="r-s">
                  <text class="label">电费：</text>
                  ￥{{ item.electricityFee }}
                </view>
                <view class="r-s">
                  <text class="label">运营费：</text>
                  ￥{{ item.operationFee }}
                </view>
                <view class="r-s">
                  <text class="label">托管费：</text>
                  ￥{{ item.tuoguanFee }}
                </view>
                <view class="r-s">
                  <text class="label">结算币价：</text>
                  ￥{{ item.btcPrice }}
                </view>
              </view>
              <view class="line-3">
                <text :style="{ color: billStatusMap[item.billStatus]?.color }">
                  {{ billStatusMap[item.billStatus]?.label }}
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { request } from '@/utils/request';
import { getLocalStorage } from '@/utils/cache';
import { billPayStatusMap } from '@/const/bill.const';

export default {
  data() {
    const now = new Date();
    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
    return {
      showCalendar: false,
      startTime: threeMonthsAgo.getTime(),
      endTime: now.getTime(),
      showStartPickerFlag: false,
      showEndPickerFlag: false,
      overViewData: {},
      billList: [],
      billStatusMap: billPayStatusMap,
    };
  },
  computed: {
    startDate() {
      const d = new Date(this.startTime);
      return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    },
    endDate() {
      const d = new Date(this.endTime);
      return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    },
  },
  onLoad() {
    this.loadList();
  },
  methods: {
    back() {
      uni.navigateTo({
        url: '/pages/my/my',
      });
    },
    toPay() {
      uni.navigateTo({
        url: `/pages/my/order/order-pay?name=缴纳费用&billIds=${this.overViewData.billIds}`,
      });
    },
    handleDateChange(e) {
      this.startTime = e.startDate;
      this.endTime = e.endDate;
      this.loadList();
    },
    onStartConfirm(e) {
      this.showStartPickerFlag = false;
      if (e.value >= this.endTime) {
        uni.$u.toast('开始时间不能晚于结束时间！');
        return;
      }
      this.startTime = e.value;
      
    },
    onEndConfirm(e) {
      this.showEndPickerFlag = false;
      if (e.value <= this.startTime) {
        uni.$u.toast('结束时间不能早于开始时间！');
        return;
      }
      this.endTime = e.value;
      this.loadList();
    },
    handleClickBill(data) {
      uni.navigateTo({
        url: '/pages/my/myBillDetail/myBillDetail',
        query: {
          billIds: data.billIds,
        },
      });
    },
    loadList() {
      uni.showLoading({ title: '加载中...' });
      request({
        method: 'GET',
        url: '/api/blade-demo/bill/mylist',
        data: {
          current: 1,
          size: 999,
          userId: getLocalStorage('userId'),
          startTime: this.startDate,
          endTime: this.endDate,
        },
      })
        .then((res) => {
          uni.hideLoading();
          const { data } = res.data;
          this.overViewData = Object.assign(
            {
              balanceMoney: data.balanceMoney,
              hisIncomeMoney: data.hisIncomeMoney,
            },
            data.myBillDetailVO,
          );
          this.billList = data.myBillDetailVOList.records;
        })
        .catch(() => {
          uni.hideLoading();
        });
    },
  },
};
</script>

<style scoped lang="scss">
.date-range-wrap {
  display: flex;
  align-items: center;
  padding: 0 24px;
  .date-range-title {
    width: 86px;
  }
  .date-range-content {
    display: flex;
    .date-range-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

.page-container {
  padding-top: 10px;
  padding-bottom: 80px;

  .page-box {
    padding: 10px 20px 20px;

    .top-box {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
      border-radius: 4px;
      display: flex;
      flex-wrap: wrap;
      padding: 20px;
      .top-box-item {
        width: calc(100% / 3);
        padding: 0 4px;
        margin-bottom: 20px;
        flex-shrink: 0;
        &.col-50 {
          width: 50%;
        }
        &:nth-child(n + 5) {
          margin-bottom: 0px;
        }
        .line-1 {
          margin-bottom: 7px;
          color: #7c8698;
          font-size: 12px;
          line-height: 17px;
          // font-family: PingFangSC-Regular, PingFang SC;
        }

        .line-2 {
          color: #203152;
          font-size: 16px;
          line-height: 22px;
          font-family: AvantGarde-Demi, AvantGarde;
        }
      }
    }

    .list {
      //  width:335px;
      .item {
        // height: 126px;
        border-bottom: 1px solid #d6d6d6;
        padding: 12px 0;
        &:last-child {
          border-bottom: none;
        }

        .line-1 {
          display: flex;
          justify-content: space-between;
          color: #203152;

          .dot {
            width: 4px;
            height: 14px;
            background: #5680fa;
            border-radius: 2px;
          }

          .l-sAndr-s {
            // width:334px;
            display: flex;
            justify-content: space-between;
            .l-s {
              height: 14px;
              line-height: 14px;
              font-size: 14px;
              // border-left: 4px solid #5680FA;
              padding-left: 12px;
              font-weight: 600;
              // font-family: PingFangSC-Semibold, PingFang SC;
            }
          }
          .r-s1 {
            font-weight: 400;
            color: #ff3750;
            // font-family: PingFangSC-Regular, PingFang SC;
            margin-right: 10px;
          }
        }

        .content {
          display: flex;
        }
        .line-2 {
          width: 70%;

          line-height: 16px;
          font-size: 12px;
          margin-top: 8px;
          padding-left: 16px;
          .label {
            display: inline-block;
            color: #7c8698;
            width: 60px;
          }
          .r-s {
            margin-right: 10px;
          }
        }
        .line-3 {
          width: 30%;
          text-align: right;
          padding-top: 8px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
