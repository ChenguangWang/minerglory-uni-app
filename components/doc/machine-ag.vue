<template>
  <view class="treaty-container">
    <view class="treaty-tips">
      我接受
      <text class="link" @click="popupVisible = true">《MinerGlory矿机代购及托管服务协议》</text>
    </view>
    <u-popup v-model="popupVisible" mode="center" border-radius="16" :mask-close-able="true">
      <scroll-view scroll-y class="pop-box">
        <view class="title">《矿机代购及托管服务协议》</view>
        <view class="content">
          甲乙双方本着平等自愿原则，就矿机代购及托管服务达成一致意见，协议如下。
        </view>
        <view class="content">
          1、甲方委托乙方代购比特币运算服务器（下称矿机），关于本批次矿机的采购型号、数量、单价和金额等详情，参见附件。
        </view>
        <view class="content">
          2、甲方同意乙方将矿机安装在乙方指定的云服务机房，并委托乙方提供云计算技术服务和矿机运行托管服务。托管服务开始日期由安装生产日期由矿机发货情况决定。
        </view>
        <view class="content">
          3、乙方应提供专业技术及管理人员、电力设施配套、宽带网络配套、安全监控、服务器等服务，保证矿机的稳定运行。
        </view>
        <view class="content">
          4、甲方拥有矿机的所有权，享有矿机产出收益，并同意通过产出比特币支付乙方托管服务费，托管服务费根据甲方托管矿机的台数越多享有一定的折扣，具体参见附件。托管服务期间，甲方矿机所消耗电费由甲方承担。
        </view>
        <view class="content">
          5、矿机产出比特币将每周结算一次，乙方将甲方矿机的净产出比特币支付到甲方指定的比特币地址。甲方亦可选择乙方将比特币卖出换成人民币支付给甲方。
          <view>
            甲方净收益（比特币）：矿机产出比特币 – 托管服务费
          </view>
          <view>
            如甲方选择电费从比特币扣除的再减去相应的电费。
          </view>
        </view>
        <view class="content">
          6、甲方在矿机连续30天产出不足以支付电费，或电费占产出比例较高且有更合适的新矿机时，有权结束托管，并发起清算，清算方式由双方协商解决。
        </view>
        <view class="content">
          7、在托管期间，甲方可退出托管，3年内退出托管甲方收取矿机市场价值以及产币价值之和相比初期投入溢价的20%作为手续费（如无溢价不收取费用）。3年后转让不收取手续费，手续费以比特币支付。甲乙双方协商一致退出除外。
        </view>
        <view class="content">
          8、在乙方矿机投入回本前，托管服务费按照实际产币量5%收取，乙方回本后按照除去电费后净利润的20%收取。
        </view>
        <view class="content">
          9、甲方知晓比特币矿机及比特币行业的以下风险，并自愿承担可能导致的损失：
          <view>
            a)比特币行业存在监管风险，比特币价格可能发生暴涨暴跌。
          </view>
          <view>
            b)比特币全网算力可能发生大幅增长，使得矿机产出大幅下降。
          </view>
          <view>
            c)矿机有运行损坏、意外事故损坏、运输途中损坏丢失的风险。
          </view>
          <view>
            d)矿场可能存在停电、断网等意外事故，导致矿机停机的风险。
          </view>
          乙方应积极采取措施减少损失，并向甲方提交风险或意外的详细情况和相关凭证依据，尽快恢复矿机的正常运行。
        </view>
        <view class="content">
          10、争议解决：执行本协议发生争执时，由当事人协商解决；协商不成，双方同意向乙方所在地人民法院提起诉讼。
        </view>
        <view class="content">
          11、不可抗力：任何一方遇有不可抗力而全部或部分不能履行本合同或迟延履行本合同，应自不可抗力事件发生之日起三日内，将事件情况以书面形式通知另一方，并于事件发生之日起二十日内，向另一方提交导致其全部或部分不能履行或迟延履行的证明。
        </view>
        <view class="content">
          12、本协议附件是协议的一部分，双方协商后可再约定补充协议。电子邮件、微信聊天记录确认均可作为本协议补充内容。
        </view>
        <view class="content">
          13、本协议一式贰份，双方各执壹份。本协议扫描、影印或电子版均具有同等法律效力。
        </view>
        <view class="popup-btns">
          <u-button type="primary" @click="popupVisible = false" shape="circle" style="width:100%;margin-top:32rpx;">关闭</u-button>
        </view>
      </scroll-view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      popupVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>
.treaty-container {
  .treaty-tips {
    color: #7c8698;
    font-size: 24rpx;
    .link {
      color: #0091ff;
    }
  }
}
.pop-box {
  width: 80vw;
  max-width: 700rpx;
  padding: 40rpx 32rpx;
  max-height: 80vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 16rpx;
  .title {
    font-size: 36rpx;
    margin-bottom: 32rpx;
    text-align: center;
    font-weight: bold;
  }
  .content {
    font-size: 24rpx;
    line-height: 36rpx;
    color: #7c8698;
    margin-bottom: 24rpx;
  }
  .popup-btns {
    margin-top: 32rpx;
    text-align: center;
  }
}
</style>
