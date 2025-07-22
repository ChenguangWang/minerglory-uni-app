<template>
  <view class="page-container">
    <view class="page-box" v-if="order">
      <view class="title">
        <view class="l-s">
          <view class="line-bar"></view>
          {{ order.productName }}
        </view>
        <view class="r-s">
          <view class="viewContract" @click="goToContract">
            查看合同
          </view>
        </view>
      </view>
      <!-- 基本信息 -->
      <view class="info">
        <view>状态</view>
        <text v-if="order.orderStatus == '待付款'" style="color: #ff3750">{{ order.orderStatus }}</text>
        <text v-if="order.orderStatus == '待发货'" style="color: #f7b500">{{ order.orderStatus }}</text>
        <text v-if="order.orderStatus == '待上架'" style="color: #f7b500">{{ order.orderStatus }}</text>
        <text v-if="order.orderStatus == '在运营'" style="color: #16cb7e">{{ order.orderStatus }}</text>
        <text v-if="order.orderStatus == '已结束'" style="color: #7c8698">{{ order.orderStatus }}</text>
        <text v-if="order.orderStatus == '已取消'" style="color: #7c8698">{{ order.orderStatus }}</text>
      </view>
      <view class="info">
        <view>订单号</view>
        <view>{{ order.orderId }}</view>
      </view>
      <view class="info">
        <view>总金额</view>
        <view>{{ order.orderPrice && order.orderMachineNumber ? order.orderPrice * order.orderMachineNumber : 0 }}元</view>
      </view>
      <view class="info">
        <view>机器型号</view>
        <view>{{ order.productModel }}</view>
      </view>
      <view class="info">
        <view>额定功耗</view>
        <view>{{ order.productCop }} {{ order.productCopUnit }}</view>
      </view>
      <view class="info">
        <view>机器台数</view>
        <view>{{ order.orderMachineNumber }}台</view>
      </view>
      <view class="info">
        <view>总算力</view>
        <view>{{ order.orderHashrate }}{{ order.orderHashrateUnit }}</view>
      </view>
      <view class="info">
        <view>下单时间</view>
        <view>{{ order.orderDate }}</view>
      </view>
      <view class="info" v-if="order.orderStatus == '待付款'">
        <view>截止打款时间</view>
        <view>{{ order.orderLastpayDate }}</view>
      </view>
      <view class="info" v-if="order.orderStatus !== '待付款'">
        <view>打款时间</view>
        <view>{{ order.orderPayDate || '--' }}</view>
      </view>
      <view class="info" v-if="order.orderStatus !== '待付款'">
        <view>发货日期</view>
        <view>{{ order.productWaybillDatetime || '--' }}</view>
      </view>
      <view class="info">
        <view>物流单号</view>
        <view style="color: #5680fa">{{ order.productWaybillNumber || '--' }}</view>
      </view>
      <view class="line"></view>
      <view v-if="order.orderStatus == '已结束'">
        <view class="info">
          <view>结束时间</view>
          <view>{{ order.orderStatusTime }}</view>
        </view>
        <view class="info">
          <view>结束摘要</view>
          <view>已转出</view>
        </view>
        <view class="line"></view>
      </view>
      <view v-if="order.orderStatus == '已取消'">
        <view class="info">
          <view>取消时间</view>
          <view>{{ order.orderStatusTime }}</view>
        </view>
        <view class="info">
          <view>取消摘要</view>
          <view>{{ order.orderStatusText }}</view>
        </view>
        <view class="line"></view>
      </view>
      <view v-if="order.orderStatus == '待付款'">
        <view class="tips">
          <view class="title">付款提示</view>
          <view class="content">
            请在提交订单后24小时内完成支付，付款后，请登录官网“订单”，填写付款人姓名和付款金额等信息，点击订单后的“上传付款证明”。
          </view>
        </view>
        <view class="tips">
          <view class="title">风险提示</view>
          <view class="content">
            特定虚拟商品价格决定矿机价值，付款后即锁定本批订单数量和价格，基于特定商品价格上涨，本订单不会加价，反之特定虚拟商品价格下跌，本订单也不会退款。
          </view>
        </view>
      </view>
      <view class="btn">
        <button
          v-if="order.orderStatus == '待付款'"
          size="default"
          type="primary"
          @click="goToPay(order.id, '矿机款', order.orderId, order.productBatchId, order.orderPrice * order.orderMachineNumber)"
        >
          去付款
        </button>
        <button
          v-if="order.orderStatus == '已结束' || order.orderStatus == '在运营'"
          size="default"
          type="primary"
          @click="goToMachineDetail(order)"
        >
          矿机运行详情
        </button>
      </view>
    </view>
  </view>
</template>
<script>
import { getLocalStorage } from '@/utils/cache';

export default {
  name: "OrderMachineDetail",
  data() {
    return {
      order: {},
    };
  },
  computed: {
    title() {
      return `矿机${this.order.orderType == 1 ? "交易" : "运营"}订单详情`;
    },
  },
  onLoad(options) {
    uni.showLoading({ title: '加载中...' });
    this.loadOrderDetail(options);
  },
  methods: {
    goToContract() {
      // 跳转到合同页面，需根据实际路径调整
      uni.navigateTo({
        url: `/pages/order/machineAgreement?orderId=${this.order.orderId}&productBatchId=${this.order.productBatchId}`
      });
    },
    goToPay(id0, name0, orderId0, productBatchId0, orderPaymentMoney0) {
      uni.navigateTo({
        url: `/pages/order/machinePay?id=${id0}&name=${name0}&orderId=${orderId0}&productBatchId=${productBatchId0}&orderPaymentMoney=${orderPaymentMoney0}`
      });
    },
    goToBack() {
      uni.navigateBack();
    },
    goToMachineDetail(data) {
      // 运营账单使用其交易账单id
      const orderId = data.orderType == 2 && data.parentOrderId ? data.parentOrderId : data.orderId;
      uni.navigateTo({
        url: `/pages/my/order/operation-details?orderId=${orderId}&productBatchId=${data.productBatchId}&orderType=${data.orderType}`
      });
    },
    loadOrderDetail(options) {
      // 订单详情表接口--订单详情
      const orderId = options?.orderId;
      const productBatchId = options?.productBatchId;
      if (!orderId) {
        this.goToBack();
        return;
      }
      uni.request({
        method: 'GET',
        url: '/api/blade-demo/details/detail',
        data: {
          userId: getLocalStorage('userId'),
          orderId,
          productBatchId,
        },
        success: (res) => {
          uni.hideLoading();
          this.order = res.data.data;
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
.page-container {
  padding-bottom: 80px;
  height: 100%;
  background: #fafafa;
  .page-box {
    padding: 20px 30px 0;

    .info {
      display: flex;
      justify-content: space-between;
      line-height: 16px;
      font-size: 12px;
      color: #7c8698;
      margin-bottom: 8px;
      div {
        margin-right: 10px;
      }
    }

    .line {
      border-top: 1px solid #d6d6d6;
      margin: 16px 0;
    }

    .btn {
      margin-top: 46px;
      margin-bottom: 30px;
    }

    .tips {
      color: #7c8698;
      font-size: 12px;
      line-height: 16px;
      margin-bottom: 16px;
      .title {
        font-weight: 600;
        margin-bottom: 8px;
      }
      .content {
        font-weight: 400;
      }
    }

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      .l-s {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        line-height: 22px;
        color: #203152;
      }
      .line-bar {
        display: inline-block;
        margin-right: 8px;
        width: 4px;
        height: 14px;
        background: #5680fa;
        border-radius: 2px;
      }
      .r-s {
        .viewContract {
          width: 76px;
          height: 29px;
          border-radius: 15px;
          border: 1px solid #e7e7e7;
          color: #7c8698;
          font-size: 12px;
          line-height: 17px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
