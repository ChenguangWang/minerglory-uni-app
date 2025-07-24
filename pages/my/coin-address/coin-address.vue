<!-- 提币地址 -->
<template>
  <view class="page-container">
    <view class="page-box">
      <view class="item" v-for="(c, cIndex) in list" :key="cIndex">
        <view class="l-s">
          <image :src="c.userAddressType == 'BTC'? '/static/image/my/tibi.png': '/static/image/my/usdt.png'" class="icon"></image>
          <view>
            <view class="line-1">
              {{ c.userAddressType }}
            </view>
            <view class="line-2">
              {{ c.userDrawAdress }}
            </view>
          </view>
        </view>
        <view class="r-s">
          <image class="clear-img" src="/static/image/my/clear.png" @tap="del(c.id)" style="width: 20px; height: 20px; margin-top: 3px" />
          <!-- <text class="line-2">{{ c.userAddressLabel }}</text> -->
        </view>
      </view>
      <view class="btn">
        <u-button type="primary" @click="create" shape="circle">添加新地址</u-button>
      </view>
    </view>
  </view>
</template>
<script>
import { request } from '@/utils/request';

export default {
  name: 'CoinAddress',
  data() {
    return {
      list: []
    };
  },
  onLoad() {
    this.loadList();
  },
  methods: {
    loadList() {
      request({
        method: 'GET',
        url: '/api/blade-demo/useraddress/list',
        data: {
          size: '999999'
        },
      }).then((res) => {
        if (res.data && res.data.data && res.data.data.records) {
          this.list = res.data.data.records;
        }
      });
    },
    create() {
      uni.navigateTo({ url: '/pages/my/coin-address/create-coin-address' });
    },
    del(id) {
      request({
        method: 'POST',
        url: '/api/blade-demo/useraddress/remove',
        params: {
          ids: id
        },
      }).then((res) => {
        if (res.data.code == 200) {
          uni.$u.toast('删除成功！');
          this.loadList();
        } else {
          uni.$u.toast('删除失败！');
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.page-container {
  .page-box {
    padding: 20px;
    .btn {
      margin-top: 30px;
    }
    .item {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      background: #fff;
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      min-height: 88px;
      margin-bottom: 17px;
      color: #203152;
      .l-s {
        display: flex;
        .icon {
          width: 48px;
          height: 48px;
          margin-right: 10px;
        }
        .line-1 {
          margin-top: 3px;
          font-weight: 600;
          line-height: 20px;
          font-size: 14px;
          color: #203152;
        }
        .line-2 {
          margin-top: 6px;
          font-size: 12px;
          line-height: 16px;
          font-weight: 300;
          color: #203152;
        }
      }
      .r-s {
        font-size: 12px;
        line-height: 16px;
        font-weight: 300;
        color: #203152;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .line-2 {
          margin-top: 6px;
        }
      }
    }
  }
}
</style>
