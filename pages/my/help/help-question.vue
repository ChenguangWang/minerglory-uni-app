<template>
  <view class="page-container">
  </view>
</template>

<script>
import {request} from '@/utils/request'

export default {
  data() {
    return {
      url: "",
    };
  },
  mounted() {
    this.getLink();
  },
  methods: {
    getLink() {
      request({
        method: "get",
        url: "/api/blade-demo/word/list",
        data: {
          wordFileName: "常见问题",
        },
      }).then((res) => {
        this.url = res.data.data.records[0].link;
        this.openPdf(); //在此处调用！！！
      });
    },

    openPdf() {
      uni.showLoading({ title: '文件加载中' });
      
      uni.downloadFile({
        url: this.url,
        success: (res) => {
          if (res.statusCode === 200) {
            const filePath = res.tempFilePath;
            uni.openDocument({
              filePath: filePath,
              showMenu: true, // 允许用户转发、收藏等操作（仅部分平台支持）
              success: () => {
                console.log('打开文档成功');
              },
              fail: (err) => {
                console.error('打开失败', err);
                uni.showToast({
                  title: '打开文件失败',
                  icon: 'none'
                });
              },
              complete: () => {
                uni.hideLoading();
              }
            });
          }
        },
        fail: (err) => {
          console.error('下载失败', err);
          uni.showToast({
            title: '下载文件失败',
            icon: 'none'
          });
          uni.hideLoading();
        }
      });
    }
  },
};
</script>

<style scoped lang="scss">
.page-container {
  .page-box {
    padding: 20px 20px 80px;

    .title {
      color: #203152;
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 8px;
      // font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
    }

    .content {
      color: #7c8698;
      font-size: 12px;
      line-height: 22px;
      margin-bottom: 20px;
      // font-family: PingFangSC-Regular, PingFang SC;
    }
  }
}
</style>
