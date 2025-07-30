<!-- 安全中心 -->
<template>
  <view class="page-container" v-if="mySummary">
    <u-cell-group :border="false" class="card-view">
      <u-cell-item isLink @click="goToRealname" >
        <template #title>
          <view class="item">
            <view>
              实名认证
              <text v-if="shimingRZ == 1 && status == 0">（已完成）</text>
              <text v-if="status == 1">（待审核）</text>
            </view>
          </view>
        </template>
      </u-cell-item>
      <u-cell-item isLink @click="jump" >
        <template #title>
          <view class="item" style="position: relative">
            <view style="position: relative">
              交易密码设置
              <text v-if="jiaoyimimaSZ == 1">（已设置）</text>
            </view>
            <view v-if="jiaoyimimaSZ == 1" @click.stop="setPassAgain" style="width: 100%; height: 62px; position: absolute; top: 0; left: 0"></view>
          </view>
        </template>
      </u-cell-item>
      <u-cell-item :border-bottom="false"  isLink @click="goToGoogle" >
        <template #title>
          <view class="item">
            <view>
              谷歌二次验证
              <text v-if="userChromeStatus == 1">（已设置）</text>
            </view>
          </view>
        </template>
      </u-cell-item>
    </u-cell-group>

    
    <u-modal
      v-model="showModal"
      :title="modalTitle"
      :content="modalContent"
      show-cancel-button
      @confirm="onModalConfirm"
      @cancel="onModalCancel"
    />
  </view>
</template>
<script>
import { request } from '@/utils/request';
import { getLocalStorage } from '@/utils/cache';
export default {
  data() {
    return {
      mySummary: {
        myPic: 'default',
        myNick: '清链8016'
      },
      shimingRZ: 0,
      userChromeStatus: 0,
      jiaoyimimaSZ: 0,
      userRealname: '',
      userRealid: '',
      userIdcard: '',
      userIdcardBack: '',
      id: '',
      status: 1,
      email: '',
      phone: '',
      showModal: false,
      modalTitle: '',
      modalContent: '',
      modalAction: null
    };
  },
  onLoad() {
    this.loadData();
    this.loadinfo();
  },
  methods: {
    goToRealname() {
      uni.navigateTo({
        url: `/pages/my/safe-setting/safe-setting-identify?shimingRZ=${this.shimingRZ}&id=${this.id}&status=${this.status}`
      });
    },
    goToGoogle() {
      uni.navigateTo({
        url: `/pages/my/safe-setting/safe-setting-google?id=${this.id}&userChromeStatus=${this.userChromeStatus}`
      });
    },
    jump() {
      uni.navigateTo({
        url: `/pages/my/safe-setting/safe-setting-deal-pwd?id=${this.id}&phone=${this.phone}&email=${this.email}&userChromeStatus=${this.userChromeStatus}&shimingRZ=${this.shimingRZ}&userRealname=${this.userRealname}&userRealid=${this.userRealid}&userIdcard=${this.userIdcard}&userIdcardBack=${this.userIdcardBack}`
      });
    },
    loadData() {
      request({
        method: 'get',
        url: '/api/blade-demo/usersafe/detail',
        data: {
          userId: getLocalStorage('userId')
        }
      }).then(res => {
        const data = res.data.data;
        this.userRealname = data.userRealname;
        this.userRealid = data.userRealid;
        this.userIdcard = data.userIdcard;
        this.userIdcardBack = data.userIdcardBack;
        this.shimingRZ = data.userRealnameStaus || 0;
        this.jiaoyimimaSZ = data.userDealStatus;
        this.id = data.id;
        this.userChromeStatus = data.userChromeStatus;
        this.status = data.status === undefined ? 1 : data.status;
      });
    },
    setPassAgain() {
      this.modalTitle = '温馨提示';
      this.modalContent = '您的交易密码已设置，点击确定进行修改';
      this.showModal = true;
      this.modalAction = 'setPassAgain';
    },
    onModalConfirm() {
      if (this.modalAction === 'setPassAgain') {
        this.jump();
      }
      this.showModal = false;
    },
    onModalCancel() {
      this.showModal = false;
      uni.showToast({ title: '取消设置！', icon: 'none' });
    },
    loadinfo() {
      request({
        method: 'get',
        url: '/api/blade-user/info',
        data: {
          id: getLocalStorage('userId')
        }
      }).then(res => {
        this.email = res.data.data.email;
        this.phone = res.data.data.phone;
      });
    }
  }
};
</script>
<style scoped lang="scss">
.page-container {
  padding: 16px 20px 80px;
}
</style>
