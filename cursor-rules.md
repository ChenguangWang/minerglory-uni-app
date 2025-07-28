# Cursor Rules for uni-app + uView 项目

## 1. 组件使用
- 页面结构优先使用 `<view>`、`<image>`、`<text>` 等 uni-app 基础组件。
- 表单相关统一使用 uView 的 `<u-form>`、`<u-form-item>`、`<u-input>`、`<u-button>` 等组件。
- 按钮统一用 `<u-button>`，不再自定义按钮组件。
- Toast、消息提示统一用 `uni.$u.toast`。

## 2. 样式规范
- 页面整体采用卡片化风格，圆角、阴影、间距与 uView 设计保持一致。
- 表单 label 统一使用 `label-position="top"`，输入框不加 border 属性，保持 uView 默认风格。
- 图片资源统一放在 `/static/image/` 目录，引用时用绝对路径（如 `/static/image/my/xxx.png`）。
- 所有样式采用 SCSS，命名采用 BEM 或语义化 class。

## 3. 数据与方法
- 缓存使用 `@/utils/cache` 中的 `getLocalStorage` 或者 `setLocalStorage` 方法。
- 网络请求统一封装为 `request` 方法（如 `@/utils/request`），不直接使用 `uni.request` 或 `axios`。
- 路由跳转统一用 `uni.navigateTo` 或 `uni.navigateBack`。
- 表单校验通过 uView 的 rules 机制实现，校验失败时不手动弹 toast。

## 4. 代码结构
- 页面组件 `name` 属性必须与文件名语义一致。
- data、computed、methods、生命周期钩子顺序排列，保持简洁。
- 不使用未用到的生命周期钩子和空方法。
- 事件绑定统一用 `@tap` 或 `@click`，不混用。

## 5. 可维护性
- 复用性强的样式、方法、组件应抽离到公共目录。
- 表单、按钮、列表等 UI 组件风格保持一致，避免多种风格混用。
- 代码注释清晰，复杂逻辑需有注释说明。

## 6. 其他
- 禁止直接操作 DOM。
- 禁止使用 jQuery、mint-ui 等与 uni-app/uView 不兼容的库。
- 禁止在小程序端使用不支持的 API。 