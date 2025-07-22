<template>
  <view class="page-container">
    <view class="page-box">
      <view class="card">
        <!-- <text class="title main">加入我们</text> -->
        <text class="content">
          在MinerGlory工作，有机会直接促进数字资产市场发展并影响全球数百万人。选择MinerGlory，选择一种生活方式：跟一群人做一项影响未来的事业。因爱而做，做回自我！<br />
          人因梦想而伟大，加入我们，共创辉煌未来！<br />
          <text class="email">support@minerglory.com</text>
        </text>
      </view>
      <view class="card">
        <u-divider half-width="100%" color="#203152" margin-bottom="20">产品经理</u-divider>
        <text class="content">
          如果你逻辑清晰并有设计产品的天赋，擅长站在用户的角度考虑问题，会像照料宝宝一样照料你的产品，请加入我们的产品团队；你要做好准备为产品设计激烈的辩论，比如哪一款紫色更适合深度图；同时也请大展身手设计出加密数字资产行业大家都喜欢的产品。我们现在有很多个宝宝需要你去照料成长，宝宝们分别是：网页端、电脑端和移动端等等。
        </text>
      </view>
      <view class="card">
        <u-divider half-width="100%" color="#203152" margin-bottom="20">Java 开发工程师</u-divider>
        <text class="content">
          如果你能写出高质量的Java 7/8，并熟悉MySQL, MongoDB, Spring, Tomcat, Redis。那就加入我们努力又谦虚好学的Java团队吧，反正程序猿的故事程序猿最懂。
        </text>
      </view>
      <view class="card">
        <u-divider half-width="100%" color="#203152" margin-bottom="20">用户运营总监</u-divider>
        <text class="content">
          继工程师、产品经理之后，下一个“天命”岗位会是增长黑客。用户是产品的根基，如果你擅长建立整个用户体系，快速获取用户，搭建产品与用户之间的桥梁，相信你会为币安带来最优质的用户。
        </text>
      </view>
      <view class="card">
        <u-divider half-width="100%" color="#203152" margin-bottom="20">市场经理</u-divider>
        <text class="content">
          你的主要工作就是负责花钱。比如，做百万美元的疯狂赠送活动，定制T恤和其他的创意礼物，举办投票活动或其他竞赛，参加线下峰会，上电视(好吧，至少可以出现在YouTube上)。有个小小的条件，你要能带来越来越多的用户；如果这是你，欢迎来帮我们多花点钱。
        </text>
      </view>
      <view class="card">
        <u-divider half-width="100%" color="#203152" margin-bottom="20">内容运营总监</u-divider>
        <text class="content">
          如果你带过国际化内容团队，不仅能写一手叫人称赞的好文，而且懂的与内容的伙伴们一起创造更多有价值的内容分享给需要的人，通过内容来吸引全球各地的区块链和数字货币的爱好者们。那么欢迎你的加入。英语如母语，拥有国际平台经验及文化背景将是你的加分项。
        </text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'HelpJoinUs',
};
</script>
<style scoped lang="scss">
.page-container {
  overflow: overlay;
  .page-box {
    padding: 20px 10px 80px;
    .card {
      background: #fff;
      border-radius: 8px;
      margin-bottom: 16px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }
    .title {
      color: #203152;
      font-size: 16px;
      font-weight: 600;
      line-height: 22px;
      margin-bottom: 8px;
      display: block;
    }
    .title.main {
      font-size: 18px;
    }
    .content {
      color: #7c8698;
      font-size: 14px;
      line-height: 22px;
      display: block;
    }
    .email {
      color: #2979ff;
      font-weight: bold;
      font-size: 14px;
      display: block;
      margin-top: 8px;
    }
  }
}
</style>
