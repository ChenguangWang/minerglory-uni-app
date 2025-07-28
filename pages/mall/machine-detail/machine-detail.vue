<!-- 矿机详情 -->
<template>
  <view class="page-container">
    <view class="detail" v-if="product">
      <view class="title">
        <view class="title-bar"></view>
        {{ product.productName }}
      </view>
      <view class="info">
        <text>额定算力</text>
        <text>{{ product.productHashrate }}{{ product.productHashrateUnit }}</text>
      </view>
      <view class="info">
        <text>发货日期</text>
        <text>{{ product.productWaybillDatetime }}</text>
      </view>
      <view class="info">
        <text>能耗比</text>
        <text>{{ product.productCop }}{{ product.productCopUnit }}</text>
      </view>
      <view class="line"></view>
      <view class="info">
        <text>付款方式</text>
        <text>线下转账</text>
      </view>
      <view class="input u-text-right">
        <u-number-box v-model="orderMachineNumber" :min="1" :max="product.productRepertory || 999" integer />
      </view>
      <view class="total">
        <view class="key">金额合计</view>
        <view class="value">¥{{ totalPrices }}</view>
      </view>
      <view class="treaty">
        <!-- <view class="btn" @click="treatyAgree = !treatyAgree" :class="{ 'active-btn': treatyAgree }"></view> -->
        <u-checkbox v-model="treatyAgree">
          <machine-ag></machine-ag>
        </u-checkbox>

      </view>
      <view class="confirm-btn">
        <u-button type="primary" :disabled="!treatyAgree" @click="showConfirm = true">确认</u-button>
      </view>
      <u-modal v-model="showConfirm" title="下单确认" content="确认下单吗？" @confirm="confirm" showCancelButton />
      <u-toast ref="uToast" />
    </view>
  </view>
</template>

<script>
import { request } from '@/utils/request'
import { getLocalStorage } from '@/utils/cache'
import MachineAg from '@/components/doc/machine-ag.vue'

export default {
  components: {
    MachineAg
  },
  data() {
    return {
      treatyAgree: false,
      product: {},
      orderMachineNumber: 1,
      showConfirm: false
    }
  },
  computed: {
    totalPrices() {
      if (this.product && this.orderMachineNumber) {
        return (this.product.productSellPrice * this.orderMachineNumber).toFixed(2)
      }
      return 0
    }
  },
  onLoad(options) {
    this.productId = options.id
    this.productCop = options.productCop
    this.loadProduct()
  },
  methods: {
    loadProduct() {
      uni.showLoading();
      request({
        method: 'GET',
        url: '/api/blade-demo/product/detail',
        data: {
          id: this.productId
        }
      }).then(res => {
        this.product = res.data.data
        uni.hideLoading()
      })
    },
    confirm() {
      if (!this.orderMachineNumber) {
        this.$refs.uToast.show({ title: '请输入购买份数', type: 'warning' })
        return
      }
      if (!this.treatyAgree) {
        this.$refs.uToast.show({ title: '请同意协议', type: 'warning' })
        return
      }
      uni.showLoading({title: '下单中'});
      request({
        method: 'POST',
        url: '/api/blade-demo/details/saveByUser',
        data: {
          orderMachineNumber: this.orderMachineNumber,
          orderMonthElectricity: this.product.monthElectricity,
          orderPrice: this.product.productSellPrice,
          payMoney: this.product.productSellPrice * this.orderMachineNumber,
          productName: this.product.productName,
          productBatchId: this.product.productBatchId,
          orderHashrate: this.product.productHashrate * this.orderMachineNumber,
          userId: getLocalStorage('userId'),
          productCop: this.product.productCop,
          productElectricityPrice: this.product.productElectricityPrice,
          electricalLoss: this.product.electricalLoss,
          productModel: this.product.productModel,
          productId: this.product.id
        }
      }).then(res => {
        uni.hideLoading()
        if (res.data && res.data.code == 200) {
          this.$refs.uToast.show({ title: '已下单', type: 'success' })
          setTimeout(() => {
            uni.navigateTo({ url: `/pages/my/order/order-machine-detail?orderId=${res.data.data.orderId}&productBatchId=${res.data.data.productBatchId}` })
          }, 800)
        } else if (res.data && res.data.code == 400) {
          this.$refs.uToast.show({ title: '请检查您是否有未付款的订单 如果已付款请您等待后台审核', type: 'warning' })
        } else if (res.data && res.data.code == 4000) {
          this.$refs.uToast.show({ title: res.data.msg, type: 'warning' })
        } else {
          this.$refs.uToast.show({ title: '下单失败', type: 'error' })
        }
      }).catch(() => {
        this.$refs.uToast.show({ title: '下单失败', type: 'error' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  background: #f5f6fa;
  min-height: 100%;
}
.detail {
  padding: 50rpx 36rpx 160rpx;
  border-radius: 20rpx;
  .title {
    display: flex;
    align-items: center;
    font-size: 32rpx;
    font-weight: 600;
    color: #203152;
    margin-bottom: 32rpx;
    .title-bar {
      margin-right: 16rpx;
      width: 8rpx;
      height: 32rpx;
      background: #5680fa;
      border-radius: 4rpx;
      display: inline-block;
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
    color: #7c8698;
    margin-bottom: 24rpx;
    margin-left: 12rpx;
  }
  .line {
    margin: 32rpx 0 40rpx;
    border-top: 1rpx solid #d6d6d6;
  }
  .input {
    margin-bottom: 40rpx;
    :deep(.num-btn) {
      top: 0;
    }
  }
  .total {
    display: flex;
    justify-content: space-between;
    margin-left: 12rpx;
    .key {
      font-size: 28rpx;
      color: #7c8698;
    }
    .value {
      color: #ff3750;
      font-size: 36rpx;
      font-weight: bold;
    }
  }
  .treaty {
    display: flex;
    margin-top: 60rpx;
    font-size: 24rpx;
    .btn {
      width: 24rpx;
      height: 24rpx;
      border: 1rpx solid #e7e7e7;
      background: #f2f2f2;
      margin-right: 24rpx;
      &.active-btn {
        background: #5680fa;
      }
    }
  }
}
.confirm-btn {
  margin-top: 64rpx;
}
</style>
