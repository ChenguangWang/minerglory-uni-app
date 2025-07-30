<template>
  <view class="page-container" v-fullscreen>
    <view class="page-box" v-if="pageShow">
      <!-- 认证状态页面 -->
      <view v-if="shimingRZ == 1">
        <view class="tips-box tips-box-after">
          <view class="line-1">您已完成实名认证</view>
          <view class="line-2">{{ mingzi1 }}</view>
          <view class="line-3">{{ id1 }}</view>
        </view>
        <button class="confirm-btn" type="primary" @click="goBack">返回</button>
      </view>
      <!-- 未认证状态页面 -->
      <view v-else>
        <view class="tips-box tips-box-before">
          用户提币、提现需要进行实名认证，请您输入姓名、身份证号，以及上传或拍摄身份证正反面照片
        </view>
        <u-form class="card-view u-m-t-20" :model="form" ref="identifyForm" label-position="top">
          <u-form-item label="姓名" prop="userRealname" :required="true">
            <u-input
              v-model="form.userRealname"
              placeholder="请输入真实姓名"
              clearable
            />
          </u-form-item>
          <u-form-item label="身份证号" prop="userRealid" :required="true">
            <u-input
              v-model="form.userRealid"
              placeholder="请输入身份证号"
              clearable
            />
          </u-form-item>
          <view class="id-card">
            <view class="input-item">
              <view class="title">身份证正面</view>
              <view class="photo_front" @click="chooseImage('front')">
                <image v-if="form.userIdcard" :src="form.userIdcard" class="preview-image" />
                <view v-else class="upload-placeholder">
                  <!-- <text class="upload-icon">+</text> -->
                </view>
              </view>
              <view class="tips">点击上传带头像一面</view>
            </view>
            <view class="input-item">
              <view class="title">身份证反面</view>
              <view class="photo_back" @click="chooseImage('back')">
                <image v-if="form.userIdcardBack" :src="form.userIdcardBack" class="preview-image" />
                <view v-else class="upload-placeholder">
                  <!-- <text class="upload-icon">+</text> -->
                </view>
              </view>
              <view class="tips">点击上传带国徽一面</view>
            </view>
          </view>
        </u-form>
        <button class="confirm-btn" type="primary" @click="submit">确定</button>
      </view>
    </view>
  </view>
</template>
<script>
import { request } from '@/utils/request';
import { getLocalStorage } from '@/utils/cache';
export default {
  data() {
    return {
      shimingRZ: 0,
      status: 0,
      pageShow: true,
      form: {
        userRealname: "",
        userRealid: "",
        userIdcard: "",
        userIdcardBack: "",
      },
      mingzi1: "",
      id1: "",
      rules: {
        userRealname: [
          { required: true, message: '请输入真实姓名', trigger: ['blur', 'change'] },
          { pattern: /^[\u4E00-\u9FA0]{2,10}|[A-Za-z]{2,10}$/, message: '姓名格式不正确', trigger: ['blur', 'change'] }
        ],
        userRealid: [
          { required: true, message: '请输入身份证号', trigger: ['blur', 'change'] },
          { pattern: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/, message: '身份证号格式不正确', trigger: ['blur', 'change'] }
        ]
      }
    };
  },
  onLoad(options) {
    this.shimingRZ = Number(options.shimingRZ) || 0;
    this.status = Number(options.status) || 0;
    this.loadData();
  },
  onReady() {
    this.$refs.identifyForm.setRules(this.rules);
  },
  methods: {
    loadData() {
      request({
        method: "get",
        url: "/api/blade-demo/usersafe/detail",
        data: {
          userId: getLocalStorage('userId'),
        }
      }).then(res => {
        this.mingzi1 = res.data.data.userRealname;
        this.id1 = res.data.data.userRealid;
        this.shimingRZ = res.data.data.userRealnameStaus;
        this.pageShow = true;
      }).catch(err => {
        if (err.data?.code == 400) {
          this.pageShow = true;
        }
      });
    },
    chooseImage(type) {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0];
          if (type === 'front') {
            this.form.userIdcard = tempFilePath;
          } else {
            this.form.userIdcardBack = tempFilePath;
          }
          this.uploadImage(tempFilePath, type);
        }
      });
    },
    uploadImage(filePath, type) {
      uni.showLoading({ title: '上传中...' });
      uni.uploadFile({
        url: '/api/upload',
        filePath: filePath,
        name: 'file',
        success: (res) => {
          uni.hideLoading();
          const data = JSON.parse(res.data);
          if (data.code === 200) {
            if (type === 'front') {
              this.form.userIdcard = data.data.url;
            } else {
              this.form.userIdcardBack = data.data.url;
            }
            this.$u.toast('上传成功');
          } else {
            this.$u.toast('上传失败');
          }
        },
        fail: () => {
          uni.hideLoading();
          this.$u.toast('上传失败');
        }
      });
    },
    submit() {
      this.$refs.identifyForm.validate(valid => {
        if (!valid) return;
        
        if (!this.form.userIdcard || !this.form.userIdcardBack) {
          uni.showToast({ title: '请上传身份证正反面照片', icon: 'none' });
          return;
        }

        if (this.status == 1) {
          //待审核
          request({
            method: "post",
            url: "/api/blade-demo/usersafe/save",
            data: {
              userId: getLocalStorage('userId'),
              userRealname: this.form.userRealname,
              userRealid: this.form.userRealid,
              userIdcard: this.form.userIdcard,
              userIdcardBack: this.form.userIdcardBack,
            }
          }).then((res) => {
            uni.showToast({ title: '信息已提交，我们将在一到两个工作日完成审核认证', icon: 'none' });
            this.shimingRZ = 1;
            this.loadData();
          });
        } else if (this.status == 2) {
          //审核不通过
          request({
            method: "post",
            url: "/api/blade-demo/usersafe/update",
            data: {
              userId: getLocalStorage('userId'),
              userRealname: this.form.userRealname,
              userRealid: this.form.userRealid,
              userIdcard: this.form.userIdcard,
              userIdcardBack: this.form.userIdcardBack,
              status: 1,
              userRealnameStaus: "1",
              id: this.$options.id,
            }
          }).then((res) => {
            uni.showToast({ title: '信息已提交，我们将在一到两个工作日完成审核认证', icon: 'none' });
            setTimeout(() => {
              uni.navigateBack();
            }, 800);
            this.shimingRZ = 1;
            this.loadData();
          });
        }
      });
    },
    goBack() {
      uni.navigateBack();
    }
  }
};
</script>
<style scoped lang="scss">
.page-container {
  .page-box {
    padding: 10px 20px 80px;

    .tips-box {
      background: #fff;
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
      border-radius: 4px;

      &.tips-box-before {
        min-height: 48px;
        padding: 12px 10px;
        color: #7c8698;
        font-size: 12px;
        line-height: 22px;
      }

      &.tips-box-after {
        min-height: 186px;
        padding: 32px 0;
        margin-bottom: 364px;
        text-align: center;
        color: #203152;
        .line-1 {
          font-size: 24px;
          line-height: 33px;
          margin-bottom: 40px;
          font-weight: 600;
          color: #203152;
        }
        .line-2 {
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 12px;
          font-weight: 600;
          color: #203152;
        }
        .line-3 {
          color: #7c8698;
          font-size: 12px;
          line-height: 17px;
          color: #7c8698;
        }
      }
    }

    // .input-box {
    //   padding: 40px 20px;
      .id-card {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;

        .input-item {
          margin-bottom: 12px;

          .title {
            margin-bottom: 20px;
          }

          .photo_front, .photo_back {
            display: flex;
            position: relative;
            align-items: center;
            justify-content: center;
            width: 143px;
            height: 96px;
            border: 1px dashed #ddd;
            border-radius: 4px;
            background: url("/static/image/my/group.png");
            background-size: 100% 100%;

            .preview-image {
              width: 100%;
              height: 100%;
              border-radius: 4px;
            }

            .upload-placeholder {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;

              .upload-icon {
                font-size: 24px;
                color: #999;
              }
            }
          }

          .tips {
            text-align: center;
            font-size: 12px;
            line-height: 16px;
            color: #203152;
            opacity: 0.2;
            margin-top: 12px;
          }
        }
      }
    }
  }
// }
.confirm-btn {
  width: 100%;
  margin-top: 30px;
  background: #007aff;
  color: #fff;
  border-radius: 4px;
  height: 44px;
  font-size: 16px;
}
</style>
