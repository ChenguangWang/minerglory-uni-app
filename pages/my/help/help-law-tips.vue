<template>
  <view class="page-container">
    <view class="page-box">
      <view class="card">
        <u-divider half-width="100%" color="#203152" margin-bottom="20">第一条</u-divider>
        <text class="content">
          本平台的宗旨是在不违反维尔京群岛相关法律法规的前提下，尽可能地为全球广大数字资产爱好者及投资者提供专业的、国际化水准的数字资产交易平台和数字资产金融产品服务。
        </text>
      </view>
      <view class="card">
        <u-divider half-width="100%" color="#203152" margin-bottom="20">第二条</u-divider>
        <text class="content">
          用户禁止使用本平台从事洗钱、走私、商业贿赂等一切非法交易活动，若发现此类事件，本平台将立即冻结相关账户，并且报送有权管理权限之机关处理。
        </text>
      </view>
      <view class="card">
        <u-divider half-width="100%" color="#203152" margin-bottom="20">第三条</u-divider>
        <text class="content">
          当有管理权限之机关出示相应的调查文件要求本平台配合对指定用户进行调查，或要求本平台对用户账户采取查封、冻结或者划转等措施时，本平台有权依据有管理权限机关之要求，提供相应的用户数据，或进行相应的操作以协助调查。
          因上述情形而造成的用户隐私泄露、账户不能操作及由此给用户所造成的直接或间接的损失等，本平台不承担任何责任。
        </text>
      </view>
      <view class="card">
        <u-divider half-width="100%" color="#203152" margin-bottom="20">第四条</u-divider>
        <text class="content">
          本平台作为服务的提供方，会依据维尔京群岛之法律对本平台规则进行完善，并使得本平台之服务符合维尔京群岛之监管法律之要求。任何用户处于非法目的使用本平台，或使用本平台从事非法行为的，本平台对用户的行为不承担任何连带责任。
        </text>
      </view>
      <view class="card">
        <u-divider half-width="100%" color="#203152" margin-bottom="20">第五条</u-divider>
        <text class="content">
          用户以任何方式登录本平台或直接、间接使用本平台服务的，视其同意本声明之内容，并自愿接受本声明之约束。
        </text>
      </view>
      <view class="card">
        <u-divider half-width="100%" color="#203152" margin-bottom="20">第六条</u-divider>
        <text class="content">
          本平台提供的服务不应当理解为或被用于向任何认定本平台所提供之服务为非法的国家或地区的用户发出要约。
        </text>
      </view>
      <view class="card">
        <u-divider half-width="100%" color="#203152" margin-bottom="20">第七条</u-divider>
        <text class="content">
          本平台与用户进行的所有活动都发生在维尔京群岛境内，而不管用户使用本平台或以其他方式与本平台发生关系的实际所在位置。这意味着本平台之相关规则、规定或指引仅受维尔京群岛法律之约束，而不受用户在任何特定时间所在之任何其他国家或地区的法律之影响。用户从平台寻求任何补偿，必须在维尔京群岛法律中寻求支持。
        </text>
      </view>
      <view class="card">
        <u-divider half-width="100%" color="#203152" margin-bottom="20">第八条</u-divider>
        <text class="content">
          本平台没有对维尔京群岛以外的任何居民进行要约。然而，用户不需要必须是维尔京群岛居民才有资格在本平台进行投资。用户有责任保证自己遵守其居住地的法律或其使用本平台时所在国家或地区的法律，本平台不对用户违反其居住地或所在地国家或地区的法律承担任何法律责任。
        </text>
      </view>
      <view class="card">
        <u-divider half-width="100%" color="#203152" margin-bottom="20">第九条</u-divider>
        <text class="content">
          若本平台所提供之服务在某一国家或地区被视为非法或者未满足当地法律之要求，则本平台不对该国家或地区之居民进行要约，且拒绝为该国家或地区的居民提供服务。
        </text>
      </view>
      <view class="card">
        <u-divider half-width="100%" color="#203152" margin-bottom="20">第十条</u-divider>
        <text class="content">
          本声明未尽事宜，参见本平台之其他相关规则、规定或指引；当本声明或本平台之其他相关规则、规定或指引与维尔京群岛相关法律法规相冲突时，适用维尔京群岛相关法律法规。
        </text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'HelpLawTips',
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
    .content {
      color: #7c8698;
      font-size: 14px;
      line-height: 22px;
      display: block;
    }
  }
}
</style>
