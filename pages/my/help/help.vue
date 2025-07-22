<template>
  <view class="page-container u-p-40">
    <view class="card-view">
      <u-cell-group :border="false">
        <u-cell-item title="常见问题" isLink @click="goTo('/pages/my/help/help-question')" />
        <u-cell-item title="反洗钱指引" isLink @click="goTo('/pages/my/help/help-money-tips')" />
        <u-cell-item title="法律声明" isLink @click="goTo('/pages/my/help/help-law-tips')" />
        <u-cell-item title="加入我们" :border-bottom="false" isLink @click="goTo('/pages/my/help/help-join-us')" />
      </u-cell-group>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goTo(url) {
      uni.navigateTo({ url });
    }
  }
};
</script>
