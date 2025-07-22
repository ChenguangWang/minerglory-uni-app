<template>
  <view class="card">
    <view class="card-title">{{ data.productName }}</view>
    <view class="card-info">
      <view class="info-item">
        <text>期号</text>
        <text class="special-val">{{ data.productIssue }}</text>
      </view>
      <view class="info-item">
        <text>运营订单号</text>
        <text class="special-val">{{ data.orderId }}</text>
      </view>
      <view class="info-item">
        <text>机器型号</text>
        <text>{{ data.productModel }}</text>
      </view>
      <view class="info-item">
        <text>机器安置台数</text>
        <text>{{ data.orderMachineNumber }}台</text>
      </view>
      <view class="info-item">
        <text>机器总算力</text>
        <text>{{ data.orderHashrate }}{{ data.orderHashrateUnit }}</text>
      </view>
      <view class="info-item">
        <text>电费单价</text>
        <text>{{ data.productElectricityPrice }}（元/度）</text>
      </view>
      <view class="info-item">
        <text>挖矿类型</text>
        <text>{{ miningModeMap[data.miningMode]?.label }}</text>
      </view>
      <view class="info-item">
        <text>缴纳方式</text>
        <text>{{ electricPayTypeMap[data.electricityPayType]?.label }}</text>
      </view>
      <view class="info-item">
        <text>托管费（回本前）</text>
        <text>{{ data.trusteeshipAgoName }}</text>
      </view>
      <view class="info-item">
        <text>托管费（回本后）</text>
        <text>{{ data.trusteeshipLaterName }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { miningModeMap, electricPayTypeMap } from "@/const/bill.const";
export default {
  name: "OperationCard",
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      miningModeMap,
      electricPayTypeMap,
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  padding: 16px;

  .card-title {
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #203152;
  }

  .card-info {
    font-size: 12px;
    color: #7c8698;
    line-height: 16px;

    .info-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
      .special-val {
        color: #203152;
      }
    }
  }
}
</style>
