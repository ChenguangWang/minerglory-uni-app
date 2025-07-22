<template>
  <view class="page-container">
    <view class="tab-bar">
      <view
        class="tab-item"
        :class="{ active: selectedTab === 'running' }"
        @click="selectedTab = 'running'"
      >正在运营</view>
      <view
        class="tab-item"
        :class="{ active: selectedTab === 'completed' }"
        @click="selectedTab = 'completed'"
      >已完成</view>
    </view>
    <view v-if="selectedTab === 'running'">
      <view class="card-list">
        <OperationCard
          v-for="machine in runningMachines"
          :key="machine.id"
          :data="machine"
        />
        <view class="card-view" v-if="runningMachines.length == 0" >
          <u-empty text="暂无数据"></u-empty>
        </view>
      </view>
    </view>
    <view v-else>
      <view class="card-list">
        <OperationCard
          v-for="machine in completedMachines"
          :key="machine.id"
          :data="machine"
        />
        <view class="card-view" v-if="completedMachines.length == 0">
          <u-empty text="暂无数据"></u-empty>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import OperationCard from "./components/operation-card.vue";
import {request} from '@/utils/request.js';
import { getLocalStorage } from "@/utils/cache";

export default {
  name: "OperationDetails",
  components: {
    OperationCard,
  },
  data() {
    return {
      selectedTab: "running",
      machines: [],
    };
  },
  computed: {
    runningMachines() {
      return (
        this.machines &&
        this.machines.filter((machine) => machine.orderStatus === "在运营")
      );
    },
    completedMachines() {
      return (
        this.machines &&
        this.machines.filter((machine) => machine.orderStatus === "已结束")
      );
    },
  },
  onLoad(options) {
    uni.showLoading({ title: "加载中..." });
    this.loadMachineDetails(options);
  },
  methods: {
    loadMachineDetails(options) {
      const orderId = options?.orderId;
      const orderType = options?.orderType;
      const productBatchId = options?.productBatchId;
      if (!orderId) {
        uni.showToast({ title: "订单不存在", icon: "none" });
        setTimeout(() => {
          uni.navigateBack();
        }, 1000);
        return;
      }
      if (orderType == 2) {
        request({
          method: "GET",
          url: "/api/blade-demo/details/page",
          data: {
            current: 1,
            size: 100,
            parentOrderId: orderId,
          },
        }).then((res) => {
            uni.hideLoading();
            const { code, data } = res.data;
            if (code == 200) {
              this.machines = data.records;
            }
          }).catch(() => {
            uni.hideLoading();
          });
      } else {
        request({
          method: "GET",
          url: "/api/blade-demo/details/detail",
          data: {
            userId: getLocalStorage("userId"),
            orderId,
            productBatchId,
          },
        }).then((res) => {
            uni.hideLoading();
            this.machines = [res.data.data];
          }
        ).catch(() => {
            uni.hideLoading();
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.page-container {
  padding-bottom: 80px;
  height: 100%;
  background: #fafafa;
  .tab-bar {
    display: flex;
    border-bottom: 1px solid #e5e5e5;
    background: #fff;
    .tab-item {
      flex: 1;
      text-align: center;
      padding: 20rpx 0;
      font-size: 30rpx;
      color: #7c8698;
      &.active {
        color: #203152;
        border-bottom: 2px solid #5680fa;
        font-weight: 600;
      }
    }
  }
  .card-list {
    padding: 20rpx 30rpx 0;
  }
}
</style>
