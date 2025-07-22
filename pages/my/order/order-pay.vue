<template>
  <view class="page-container">
    <view class="page-box">
      <view class="info">
        <view class="title">付款方式</view>
        <view>{{ collectionType }}</view>
      </view>
      <view class="info">
        <view class="title">账户名称</view>
        <view>{{ collectionAccount }}</view>
      </view>
      <view class="info">
        <view class="title">银行账户</view>
        <view>{{ collectionBankAccount }}</view>
      </view>
      <view class="info">
        <view class="title">开户银行</view>
        <view>{{ bankAddress }}</view>
      </view>
      <view class="line"></view>

      <u-form :model="form" ref="orderForm" :label-width="180">
        <u-form-item label="付款人" prop="orderPaymentName">
          <u-input v-model="form.orderPaymentName" placeholder="请输入付款人" clearable />
        </u-form-item>
        <u-form-item v-if="payName == '矿机款'" label="付款金额(元)" prop="orderPaymentMoney1">
          <u-input v-model="form.orderPaymentMoney1" placeholder="付款金额(元)" clearable />
        </u-form-item>
        <u-form-item v-if="payName == '缴纳电费' || payName == '缴纳费用'" label="付款金额(元)" prop="orderPaymentMoney2">
          <u-input v-model="form.orderPaymentMoney2" placeholder="付款金额(元)" clearable />
        </u-form-item>
        <u-form-item label="付款摘要" prop="orderPaymentText">
          <u-input v-model="form.orderPaymentText" placeholder="请输入付款摘要" clearable />
        </u-form-item>
        <u-form-item label="付款类别" prop="orderPaymentType">
          <u-input v-model="form.orderPaymentType" placeholder="请输入付款类别" disabled />
        </u-form-item>
        <u-form-item label="付款证明" prop="proof">
          <view>
            <upload-file></upload-file>
            <text style="font-size: 12px; margin-top: 10px; color: #aaa">只能上传jpg/png文件，且不超过500mb</text>
          </view>
        </u-form-item>
      </u-form>

      <view class="btn">
        <u-button type="primary" :max-count="1" @click="submit">确认提交</u-button>
      </view>
    </view>
  </view>
</template>
<script>
import { request } from '@/utils/request';
import { getLocalStorage } from '@/utils/cache';
import UploadFile from '@/components/upload-file.vue';

export default {
  components: {
    UploadFile
  },
  data() {
    const params = this.$route?.params || {};
    const moneyValid = [
      { required: true, message: '请输入付款金额(元)', trigger: ['change', 'blur'] },
      {
        validator: (rule, value, callback) => {
          if (value === '' || value === null || value === undefined) {
            callback(new Error('请输入付款金额(元)'));
          } else if (isNaN(value)) {
            callback(new Error('付款金额必须为数字'));
          } else if (Number(value) <= 0) {
            callback(new Error('付款金额必须大于0'));
          } else {
            callback();
          }
        },
        trigger: ['blur']
      }
    ];
    return {
      payName: params.name || '',
      orderId: params.orderId || '',
      id: params.id || '',
      collectionType: '',
      collectionAccount: '',
      collectionBankAccount: '',
      bankAddress: '',
      orderPaymentPictureurl: '',
      form: {
        orderPaymentName: '',
        orderPaymentText: '',
        orderPaymentType: params.name || '',
        orderPaymentMoney1: params.orderPaymentMoney || '',
        orderPaymentMoney2: ''
      },
      fileList: [],
      rules: {
        orderPaymentName: [{ required: true, message: '请输入付款人', trigger: ['change', 'blur'] }],
        orderPaymentText: [{ required: true, message: '请输入付款摘要', trigger: ['change', 'blur'] }],
        orderPaymentMoney1: moneyValid,
        orderPaymentMoney2: moneyValid,
      }
    };
  },
  onLoad(options) {
    // 兼容 uni-app 页面参数
    if (options) {
      this.payName = options.name || this.payName;
      this.orderId = options.orderId || this.orderId;
      this.id = options.id || this.id;
      this.form.orderPaymentType = options.name || this.form.orderPaymentType;
      this.orderPaymentMoney1 = options.orderPaymentMoney || this.orderPaymentMoney1;
    }
    this.getInfo();
  },
  onReady() {
    if(this.payName == '矿机款') {
      delete this.rules['orderPaymentMoney2']
    } else {
      delete this.rules['orderPaymentMoney1']
    }
    this.$refs.orderForm.setRules(this.rules);
  },
  methods: {
    getInfo() {
      request({
        method: 'GET',
        url: '/api/blade-demo/collectionset/list',
        params: {
          id: '1375003428559781990'
        }
      }).then((res) => {
        const info = res.data.data.records[0] || {};
        this.collectionType = info.collectionType || '';
        this.collectionAccount = info.collectionAccount || '';
        this.collectionBankAccount = info.collectionBankAccount || '';
        this.bankAddress = info.bankAddress || '';
      });
    },
    useSonData(orderPaymentPictureurl) {
      this.orderPaymentPictureurl = orderPaymentPictureurl;
    },
    submit() {
      switch (this.payName) {
        case '矿机款':
          this.submitOrder();
          break;
        case '缴纳电费':
          this.submitCharge();
          break;
        case '缴纳费用':
          this.submitBill();
          break;
        default:
          break;
      }
    },
    submitOrder() {
      this.$refs.orderForm.validate((valid) => {
        if (valid) {
          request({
            method: 'POST',
            url: '/api/blade-demo/orderpayto/save',
            data: {
              orderPaymentName: this.form.orderPaymentName,
              orderPaymentText: this.form.orderPaymentText,
              orderPaymentType: this.form.orderPaymentType,
              paymentOrderId: this.orderId,
              orderPaymentPicture: 'aaabbbccc',
              collectionType: this.collectionType,
              collectionAccount: this.collectionAccount,
              collectionBankAccount: this.collectionBankAccount,
              bankAddress: this.bankAddress,
              orderPaymentPictureurl: this.orderPaymentPictureurl,
              orderPaymentMoney: this.form.orderPaymentMoney1,
              userId: getLocalStorage('userId')
            }
          }).then(() => {
            uni.$u.toast('提交成功，等待客服审核');
            setTimeout(() => {
              uni.navigateBack({ delta: 2 });
            }, 800);
          });
        } else {
          uni.$u.toast('请填写完整数据！');
        }
      });
    },
    submitCharge() {
      this.$refs.orderForm.validate((valid) => {
        if(valid) {
          request({
            method: 'POST',
            url: '/api/blade-demo/orderpayto/save',
            data: {
              orderPaymentName: this.form.orderPaymentName,
              orderPaymentText: this.form.orderPaymentText,
              orderPaymentType: this.form.orderPaymentType,
              paymentOrderId: this.orderId,
              orderPaymentPicture: 'aaabbbccc',
              collectionType: this.collectionType,
              collectionAccount: this.collectionAccount,
              collectionBankAccount: this.collectionBankAccount,
              bankAddress: this.bankAddress,
              orderPaymentPictureurl: this.orderPaymentPictureurl,
              orderPaymentMoney: this.form.orderPaymentMoney2,
              userId: getLocalStorage('userId')
            }
          }).then(() => {
            uni.$u.toast('提交成功，等待客服审核');
            setTimeout(() => {
              uni.navigateBack({ delta: 2 });
            }, 800);
          });
        } else {
          uni.$u.toast('请填写完整数据！');
        }
      })
      
    },
    submitBill() {
      this.$refs.orderForm.validate((valid) => {
        if(valid) {
          request({
            method: 'POST',
            url: '/api/blade-demo/orderpayto/save',
            data: {
              orderPaymentName: this.form.orderPaymentName,
              orderPaymentText: this.form.orderPaymentText,
              orderPaymentType: this.form.orderPaymentType,
              orderPaymentPicture: 'aaabbbccc',
              collectionType: this.collectionType,
              collectionAccount: this.collectionAccount,
              collectionBankAccount: this.collectionBankAccount,
              bankAddress: this.bankAddress,
              orderPaymentPictureurl: this.orderPaymentPictureurl,
              orderPaymentMoney: this.form.orderPaymentMoney2,
              userId: getLocalStorage('userId'),
              billIds: this.$route?.params?.billIds || ''
            }
          }).then(() => {
            uni.$u.toast('提交成功，等待客服审核');
            setTimeout(() => {
              uni.navigateBack({ delta: 1 });
            }, 800);
          });
        } else {
          uni.$u.toast('请填写完整数据！');
        }
      });
      
    }
  }
};
</script>
<style scoped lang="scss">
.page-container {
  padding-bottom: 60px;

  .page-box {
    padding: 20px 20px 0 30px;

    .form-item {
      position: relative;
      padding-left: 67px;
      margin-bottom: 10px;

      .label {
        width: 73px;
        position: absolute;
        top: 0;
        left: 0;
        line-height: 40px;
        padding-left: 3px;
        font-size: 12px; //font-size: 11px;
        color: #7c8698;
        // font-family: PingFangSC-Regular, PingFang SC;
      }

      input,
      textarea,
      select {
        width: 92%;
        height: 40px;
        border-radius: 2px;
        border: 1px solid rgba(231, 231, 231, 1);
        font-size: 12px;
        padding: 12px;
        color: #203152;
        background: none;
        margin-left: 20px;
        // font-family: PingFangSC-Regular, PingFang SC;
        line-height: 40px;
      }

      textarea {
        height: 80px;
      }

      select {
        padding: 0 12px;
        & option {
          width: 258px !important;
          height: 40px;
        }
      }
    }

    .info {
      display: flex;
      justify-content: space-between;
      line-height: 16px;
      font-size: 12px; //font-size: 11px;
      color: #7c8698;
      margin-bottom: 8px;

      .title {
        font-size: 14px;
        line-height: 22px;
        color: #203152;
      }
    }

    .line {
      border-top: 1px solid #d6d6d6;
      margin: 16px 0;
    }

    .btn {
      margin-top: 50px;
    }
  }
}

//改动代码
.page-title-container {
  .back-arrow-box {
    position: absolute;
    top: 23px;
    left: 23px;

    img {
      width: 17px;
      height: 17px;
    }
  }
  .text {
    color: #203152;
    height: 70px;
    line-height: 70px;
    text-align: center;
    font-size: 14px;
    // font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
  }
}
.base-uoload-pic-box .file-box {
  margin-bottom: 8px;
  .add-file {
    margin-left: 20px;
  }
}
</style>
