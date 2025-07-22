if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$v = {
    name: "u-icon",
    emits: ["click", "touchstart"],
    props: {
      // 图标类名
      name: {
        type: String,
        default: ""
      },
      // 图标颜色，可接受主题色
      color: {
        type: [String, null],
        default: ""
      },
      // 字体大小，单位rpx
      size: {
        type: [Number, String],
        default: "inherit"
      },
      // 是否显示粗体
      bold: {
        type: Boolean,
        default: false
      },
      // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
      index: {
        type: [Number, String],
        default: ""
      },
      // 触摸图标时的类名
      hoverClass: {
        type: String,
        default: ""
      },
      // 自定义扩展前缀，方便用户扩展自己的图标库
      customPrefix: {
        type: String,
        default: "uicon"
      },
      // 图标右边或者下面的文字
      label: {
        type: [String, Number],
        default: ""
      },
      // label的位置，只能右边或者下边
      labelPos: {
        type: String,
        default: "right"
      },
      // label的大小
      labelSize: {
        type: [String, Number],
        default: "28"
      },
      // label的颜色
      labelColor: {
        type: String,
        default: "#606266"
      },
      // label与图标的距离(横向排列)
      marginLeft: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginTop: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginRight: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginBottom: {
        type: [String, Number],
        default: "6"
      },
      // 图片的mode
      imgMode: {
        type: String,
        default: "widthFix"
      },
      // 自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 用于显示图片小图标时，图片的宽度
      width: {
        type: [String, Number],
        default: ""
      },
      // 用于显示图片小图标时，图片的高度
      height: {
        type: [String, Number],
        default: ""
      },
      // 用于解决某些情况下，让图标垂直居中的用途
      top: {
        type: [String, Number],
        default: 0
      },
      // 是否为DecimalIcon
      showDecimalIcon: {
        type: Boolean,
        default: false
      },
      // 背景颜色，可接受主题色，仅Decimal时有效
      inactiveColor: {
        type: String,
        default: "#ececec"
      },
      // 显示的百分比，仅Decimal时有效
      percent: {
        type: [Number, String],
        default: "50"
      }
    },
    computed: {
      customClass() {
        let classes = [];
        let { customPrefix, name } = this;
        let index = name.indexOf("-icon-");
        if (index > -1) {
          customPrefix = name.substring(0, index + 5);
          classes.push(name);
        } else {
          classes.push(`${customPrefix}-${name}`);
        }
        if (customPrefix === "uicon") {
          classes.push("u-iconfont");
        } else {
          classes.push(customPrefix);
        }
        if (this.showDecimalIcon && this.inactiveColor && this.$u.config.type.includes(this.inactiveColor)) {
          classes.push("u-icon__icon--" + this.inactiveColor);
        } else if (this.color && this.$u.config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        return classes;
      },
      iconStyle() {
        let style = {};
        style = {
          fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$u.addUnit(this.top)
        };
        if (this.showDecimalIcon && this.inactiveColor && !this.$u.config.type.includes(this.inactiveColor)) {
          style.color = this.inactiveColor;
        } else if (this.color && !this.$u.config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        return this.name.indexOf("/") !== -1;
      },
      imgStyle() {
        let style = {};
        style.width = this.width ? this.$u.addUnit(this.width) : this.$u.addUnit(this.size);
        style.height = this.height ? this.$u.addUnit(this.height) : this.$u.addUnit(this.size);
        return style;
      },
      decimalIconStyle() {
        let style = {};
        style = {
          fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$u.addUnit(this.top),
          width: this.percent + "%"
        };
        if (this.color && !this.$u.config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      decimalIconClass() {
        let classes = [];
        classes.push(this.customPrefix + "-" + this.name);
        if (this.customPrefix == "uicon") {
          classes.push("u-iconfont");
        } else {
          classes.push(this.customPrefix);
        }
        if (this.color && this.$u.config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        else
          classes.push("u-icon__icon--primary");
        return classes;
      }
    },
    methods: {
      click() {
        this.$emit("click", this.index);
      },
      touchstart() {
        this.$emit("touchstart", this.index);
      }
    }
  };
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle([$props.customStyle]),
        class: vue.normalizeClass(["u-icon", ["u-icon--" + $props.labelPos]]),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.click && $options.click(...args))
      },
      [
        $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "u-icon__img",
          src: $props.name,
          mode: $props.imgMode,
          style: vue.normalizeStyle([$options.imgStyle])
        }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: vue.normalizeClass(["u-icon__icon", $options.customClass]),
          style: vue.normalizeStyle([$options.iconStyle]),
          "hover-class": $props.hoverClass,
          onTouchstart: _cache[0] || (_cache[0] = (...args) => $options.touchstart && $options.touchstart(...args))
        }, [
          $props.showDecimalIcon ? (vue.openBlock(), vue.createElementBlock("text", {
            key: 0,
            style: vue.normalizeStyle([$options.decimalIconStyle]),
            class: vue.normalizeClass([$options.decimalIconClass, "u-icon__decimal"]),
            "hover-class": $props.hoverClass
          }, null, 14, ["hover-class"])) : vue.createCommentVNode("v-if", true)
        ], 46, ["hover-class"])),
        vue.createCommentVNode(' 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示，微信小程序不传值默认为null，故需要增加null的判断 '),
        $props.label !== "" && $props.label !== null ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 2,
            class: "u-icon__label",
            style: vue.normalizeStyle({
              color: $props.labelColor,
              fontSize: _ctx.$u.addUnit($props.labelSize),
              marginLeft: $props.labelPos == "right" ? _ctx.$u.addUnit($props.marginLeft) : 0,
              marginTop: $props.labelPos == "bottom" ? _ctx.$u.addUnit($props.marginTop) : 0,
              marginRight: $props.labelPos == "left" ? _ctx.$u.addUnit($props.marginRight) : 0,
              marginBottom: $props.labelPos == "top" ? _ctx.$u.addUnit($props.marginBottom) : 0
            })
          },
          vue.toDisplayString($props.label),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$u], ["__scopeId", "data-v-5de67484"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-icon/u-icon.vue"]]);
  function formatAppLog(type2, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type2, filename, ...args);
    } else {
      console[type2].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const _sfc_main$u = {
    name: "u-empty",
    props: {
      // 图标路径
      src: {
        type: String,
        default: ""
      },
      // 提示文字
      text: {
        type: String,
        default: ""
      },
      // 文字颜色
      color: {
        type: String,
        default: "#c0c4cc"
      },
      // 图标的颜色
      iconColor: {
        type: String,
        default: "#c0c4cc"
      },
      // 图标的大小
      iconSize: {
        type: [String, Number],
        default: 120
      },
      // 文字大小，单位rpx
      fontSize: {
        type: [String, Number],
        default: 26
      },
      // 选择预置的图标类型
      mode: {
        type: String,
        default: "data"
      },
      //  图标宽度，单位rpx
      imgWidth: {
        type: [String, Number],
        default: 120
      },
      // 图标高度，单位rpx
      imgHeight: {
        type: [String, Number],
        default: "auto"
      },
      // 是否显示组件
      show: {
        type: Boolean,
        default: true
      },
      // 组件距离上一个元素之间的距离
      marginTop: {
        type: [String, Number],
        default: 0
      },
      iconStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        icons: {
          car: "购物车为空",
          page: "页面不存在",
          search: "没有搜索结果",
          address: "没有收货地址",
          wifi: "没有WiFi",
          order: "订单为空",
          coupon: "没有优惠券",
          favor: "暂无收藏",
          permission: "无权限",
          history: "无历史记录",
          news: "无新闻列表",
          message: "消息列表为空",
          list: "列表为空",
          data: "数据为空"
        }
        // icons: [{
        // 	icon: 'car',
        // 	text: '购物车为空'
        // },{
        // 	icon: 'page',
        // 	text: '页面不存在'
        // },{
        // 	icon: 'search',
        // 	text: '没有搜索结果'
        // },{
        // 	icon: 'address',
        // 	text: '没有收货地址'
        // },{
        // 	icon: 'wifi',
        // 	text: '没有WiFi'
        // },{
        // 	icon: 'order',
        // 	text: '订单为空'
        // },{
        // 	icon: 'coupon',
        // 	text: '没有优惠券'
        // },{
        // 	icon: 'favor',
        // 	text: '暂无收藏'
        // },{
        // 	icon: 'permission',
        // 	text: '无权限'
        // },{
        // 	icon: 'history',
        // 	text: '无历史记录'
        // },{
        // 	icon: 'news',
        // 	text: '无新闻列表'
        // },{
        // 	icon: 'message',
        // 	text: '消息列表为空'
        // },{
        // 	icon: 'list',
        // 	text: '列表为空'
        // },{
        // 	icon: 'data',
        // 	text: '数据为空'
        // }],
      };
    }
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$7);
    return $props.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: "u-empty",
        style: vue.normalizeStyle({
          marginTop: $props.marginTop + "rpx"
        })
      },
      [
        vue.createVNode(_component_u_icon, {
          name: $props.src ? $props.src : "empty-" + $props.mode,
          "custom-style": $props.iconStyle,
          label: $props.text ? $props.text : $data.icons[$props.mode],
          "label-pos": "bottom",
          "label-color": $props.color,
          "label-size": $props.fontSize,
          size: $props.iconSize,
          color: $props.iconColor,
          "margin-top": "14"
        }, null, 8, ["name", "custom-style", "label", "label-color", "label-size", "size", "color"]),
        vue.createElementVNode("view", { class: "u-slot-wrap" }, [
          vue.renderSlot(_ctx.$slots, "bottom", {}, void 0, true)
        ])
      ],
      4
      /* STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$t], ["__scopeId", "data-v-486b9546"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-empty/u-empty.vue"]]);
  const CACHE_PREFIX = "miner-glory";
  const getPrefixKey = (key) => {
    return `${CACHE_PREFIX}-${key}`;
  };
  const getLocalStorage = (key) => {
    return uni.getStorageSync(getPrefixKey(key));
  };
  const setLocalStorage = (key, value) => {
    uni.setStorageSync(getPrefixKey(key), value);
  };
  const deleteLocalStorage = (key) => {
    uni.removeStorageSync(getPrefixKey(key));
  };
  let baseURLMap = {
    // 开发
    develop: "http://www.minerglory.com",
    // 体验版
    trial: "http://www.minerglory.com",
    // 正式版
    release: "http://www.minerglory.com"
  };
  let baseURL = baseURLMap["develop"];
  baseURL = baseURLMap["release"];
  function dataToQueryParam(data) {
    if (!data || typeof data !== "object")
      return "";
    return Object.keys(data).map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join("&");
  }
  function request(config2) {
    config2.header = {
      "Tenant-Id": "924188",
      Authorization: "Basic c2FiZXI6c2FiZXJfc2VjcmV0"
    };
    const token = getLocalStorage("token");
    if (token) {
      config2.header["Blade-Auth"] = token;
    }
    let method = !config2.method ? "GET" : config2.method.toLocaleUpperCase();
    if (method === "POST" && config2.params && typeof config2.params === "object") {
      const params = dataToQueryParam(config2.params);
      if (params) {
        config2.url += (config2.url.indexOf("?") === -1 ? "?" : "&") + params;
      }
      config2.data = void 0;
    }
    return new Promise((resolve, reject) => {
      uni.request(
        Object.assign(config2, {
          url: baseURL + config2.url,
          method,
          timeout: 12e4,
          // 超时2分钟
          withCredentials: true,
          //跨域请求时是否携带凭证（cookies）
          success: async (res) => {
            let statusCode = res.statusCode;
            if (statusCode !== 200 && statusCode !== 204) {
              uni.showToast({
                title: res.data.error ? res.data.error.message : "网络错误!",
                icon: "none",
                duration: 2e3
              });
              reject(res.data || res.data.error.message);
            } else {
              const { code: code2, msg } = res.data;
              if (!code2 || code2 == 200) {
                resolve(res);
              } else if (code2 == 401) {
                uni.showToast({
                  title: "登录已过期，请重新登录",
                  icon: "none",
                  duration: 2e3
                });
                uni.navigateTo({
                  url: "/pages/user/login"
                });
                reject();
              } else {
                uni.showToast({
                  title: msg,
                  icon: "none",
                  duration: 2e3
                });
                reject(res.data);
              }
            }
          },
          fail: (error) => {
            uni.showToast({
              title: "网络异常，请稍后重试",
              icon: "none",
              duration: 2e3
            });
            reject(error);
          }
        })
      );
    });
  }
  const _imports_0$1 = "/static/image/tab/logo.png";
  const _imports_1$1 = "/static/image/helper/步骤1.png";
  const _imports_2$1 = "/static/image/helper/step-line.png";
  const _imports_3$1 = "/static/image/helper/步骤2.png";
  const _imports_4 = "/static/image/helper/步骤3.png";
  const _sfc_main$t = {
    name: "shouye",
    data() {
      return {
        hasToken: getLocalStorage("token"),
        picDemoImage: "/static/image/taosuanli/pic-demo.png",
        nickName: "",
        bannerList: [],
        imgList: [
          { url: "/static/image/my/hezuo1.png" },
          { url: "/static/image/my/hezuo2.png" },
          { url: "/static/image/my/hezuo3.png" },
          { url: "/static/image/my/hezuo4.png" },
          { url: "/static/image/my/hezuo5.png" },
          { url: "/static/image/my/hezuo6.png" },
          { url: "/static/image/my/hezuo7.png" },
          { url: "/static/image/my/hezuo8.png" },
          { url: "/static/image/my/hezuo9.png" }
        ],
        products: []
      };
    },
    onLoad() {
      this.loadBannerList();
      this.loadProducts();
      this.loadMySummary();
    },
    methods: {
      // 加载轮播图
      loadBannerList() {
        const length = 8;
        const bannerList = [];
        for (var i = 0; i < length; i++) {
          bannerList.push({
            url: `/static/image/banner/${i + 1}.jpg`
          });
        }
        this.bannerList = bannerList;
      },
      toMySetting() {
        uni.navigateTo({
          url: "/pages/my/setting"
        });
      },
      goToDetail(row) {
        if (this.tabActive === 0) {
          uni.navigateTo({
            url: `/pages/taosuanliPage/suanliDetail?id=${row.productId}`
          });
        } else {
          if (row.productRepertory > 0) {
            uni.navigateTo({
              url: `/pages/mall/machine-detail/machine-detail?id=${row.id}&productCop=${row.productCop}`
            });
          }
        }
      },
      loadProducts() {
        uni.showLoading({
          title: "加载中..."
        });
        request({
          method: "GET",
          url: "/api/blade-demo/product/listSpaceTop"
        }).then((res) => {
          uni.hideLoading();
          this.products = res.data.data;
        }).catch((err) => {
          uni.hideLoading();
          uni.showToast({
            title: "加载失败",
            icon: "none"
          });
        });
      },
      loadMySummary() {
        const userId = getLocalStorage("userId");
        if (!userId) {
          return;
        }
        request({
          method: "GET",
          url: "/api/blade-user/info",
          data: {
            id: userId
          }
        }).then((res) => {
          this.nickName = res.data.data.name;
        });
      }
    }
  };
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_empty = resolveEasycom(vue.resolveDynamicComponent("u-empty"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-p-t-status-bar-height" }, [
      vue.createElementVNode("view", { class: "u-status-bar" }),
      vue.createElementVNode("view", { class: "page-container" }, [
        vue.createCommentVNode(" 顶部导航栏 "),
        vue.createElementVNode("view", { class: "top-box" }, [
          vue.createElementVNode("view", { class: "logo" }, [
            vue.createElementVNode("image", {
              src: _imports_0$1,
              mode: "aspectFit"
            })
          ]),
          $data.hasToken ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "loginAndregister"
          }, [
            vue.createTextVNode(" 欢迎， "),
            vue.createElementVNode(
              "text",
              {
                class: "user-name",
                onClick: _cache[0] || (_cache[0] = (...args) => $options.toMySetting && $options.toMySetting(...args))
              },
              vue.toDisplayString($data.nickName),
              1
              /* TEXT */
            )
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "loginAndregister"
          }, [
            vue.createElementVNode("navigator", { url: "/pages/user/login" }, [
              vue.createElementVNode("text", null, "登录")
            ]),
            vue.createElementVNode("text", null, "/"),
            vue.createElementVNode("navigator", { url: "/pages/user/register" }, [
              vue.createElementVNode("text", null, "注册")
            ])
          ]))
        ]),
        vue.createCommentVNode(" 轮播图 "),
        vue.createElementVNode("swiper", {
          class: "banner-swiper",
          autoplay: true,
          interval: 4e3,
          circular: true,
          "indicator-dots": ""
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.bannerList, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("swiper-item", { key: index }, [
                vue.createElementVNode("image", {
                  src: item.url,
                  mode: "aspectFill",
                  class: "banner-image"
                }, null, 8, ["src"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createCommentVNode(" 特别推荐 "),
        vue.createElementVNode("view", { class: "list" }, [
          vue.createElementVNode("text", { class: "list-title" }, "特别推荐"),
          $data.products.length < 1 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "card-view"
          }, [
            vue.createVNode(_component_u_empty, { text: "暂无推荐" })
          ])) : vue.createCommentVNode("v-if", true),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.products, (p) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: p.Id
              }, [
                vue.createCommentVNode(" 上架并推荐才显示 "),
                p.productRecommendStatus == "是" && p.productPutawayStatus == "是" ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "list-item",
                  onClick: ($event) => $options.goToDetail(p)
                }, [
                  vue.createElementVNode("view", { class: "m-list-item" }, [
                    p.productRepertory <= 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "pic"
                    }, "已售罄")) : vue.createCommentVNode("v-if", true),
                    vue.createElementVNode("view", { class: "product-image" }, [
                      vue.createElementVNode("image", {
                        src: p.avatar || $data.picDemoImage,
                        mode: "aspectFill"
                      }, null, 8, ["src"])
                    ]),
                    vue.createElementVNode("view", { class: "product-info" }, [
                      vue.createElementVNode(
                        "view",
                        { class: "line-1" },
                        vue.toDisplayString(p.productName),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "line-2Andline-3" }, [
                        vue.createElementVNode("view", { class: "line-2" }, [
                          vue.createElementVNode("text", { class: "fl" }, "额定算力："),
                          vue.createElementVNode(
                            "text",
                            { class: "rl" },
                            vue.toDisplayString(p.productHashrate) + vue.toDisplayString(p.productHashrateUnit),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode("view", { class: "line-3" }, [
                          vue.createElementVNode("text", { class: "fl" }, "能效比低至："),
                          vue.createElementVNode(
                            "text",
                            { class: "rl" },
                            vue.toDisplayString(p.productCop) + vue.toDisplayString(p.productCopUnit),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode("view", { class: "line-3_1" }, [
                          vue.createElementVNode("text", { class: "fl" }, "回本周期："),
                          vue.createElementVNode(
                            "text",
                            { class: "rl" },
                            vue.toDisplayString(p.hbzq || "--"),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.withDirectives(vue.createElementVNode(
                          "view",
                          { class: "line-3_2" },
                          [
                            vue.createElementVNode("text", { class: "fl" }, "一天收益："),
                            vue.createElementVNode(
                              "text",
                              { class: "rl" },
                              vue.toDisplayString(p.ytsy),
                              1
                              /* TEXT */
                            )
                          ],
                          512
                          /* NEED_PATCH */
                        ), [
                          [vue.vShow, p.ytsy]
                        ]),
                        vue.withDirectives(vue.createElementVNode(
                          "view",
                          { class: "line-3_3" },
                          [
                            vue.createElementVNode("text", { class: "fl" }, "发货日期："),
                            vue.createElementVNode(
                              "text",
                              { class: "rl" },
                              vue.toDisplayString(p.productWaybillDatetime),
                              1
                              /* TEXT */
                            )
                          ],
                          512
                          /* NEED_PATCH */
                        ), [
                          [vue.vShow, p.productWaybillDatetime]
                        ])
                      ])
                    ])
                  ]),
                  vue.createElementVNode(
                    "view",
                    { class: "line-4" },
                    "￥" + vue.toDisplayString(p.productSellPrice),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "line-5" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "tag" },
                      vue.toDisplayString(p.productFirstLabel),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "view",
                      { class: "tag active" },
                      vue.toDisplayString(p.productSecondLabel),
                      1
                      /* TEXT */
                    )
                  ])
                ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createCommentVNode(" 简单三步 "),
        vue.createElementVNode("view", { class: "threeStep" }, [
          vue.createElementVNode("text", { class: "step-title" }, "简单三步，安心挖矿"),
          vue.createElementVNode("view", { class: "step-content" }, [
            vue.createElementVNode("view", { class: "step-item" }, [
              vue.createElementVNode("image", {
                src: _imports_1$1,
                mode: "aspectFit",
                class: "step-icon"
              }),
              vue.createElementVNode("text", { class: "step-text" }, "注册账户")
            ]),
            vue.createElementVNode("view", { class: "step-arrow" }, [
              vue.createElementVNode("image", {
                src: _imports_2$1,
                mode: "aspectFit",
                class: "arrow-icon"
              }),
              vue.createElementVNode("text", { class: "arrow-text" }, "无")
            ]),
            vue.createElementVNode("view", { class: "step-item" }, [
              vue.createElementVNode("image", {
                src: _imports_3$1,
                mode: "aspectFit",
                class: "step-icon"
              }),
              vue.createElementVNode("text", { class: "step-text" }, "购买矿机/算力")
            ]),
            vue.createElementVNode("view", { class: "step-arrow" }, [
              vue.createElementVNode("image", {
                src: _imports_2$1,
                mode: "aspectFit",
                class: "arrow-icon"
              }),
              vue.createElementVNode("text", { class: "arrow-text" }, "无")
            ]),
            vue.createElementVNode("view", { class: "step-item" }, [
              vue.createElementVNode("image", {
                src: _imports_4,
                mode: "aspectFit",
                class: "step-icon"
              }),
              vue.createElementVNode("text", { class: "step-text" }, "坐等收币")
            ])
          ])
        ]),
        vue.createCommentVNode(" 合作伙伴 "),
        vue.createElementVNode("view", { class: "partner" }, [
          vue.createElementVNode("text", { class: "partner-title" }, "合作伙伴"),
          vue.createElementVNode("view", { class: "partner-content" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.imgList, (img, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "partner-item"
                }, [
                  vue.createElementVNode("image", {
                    src: img.url,
                    class: "partner-logo",
                    mode: "aspectFit"
                  }, null, 8, ["src"])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ])
    ]);
  }
  const PagesHomePageHomePage = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$s], ["__scopeId", "data-v-456c689e"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/pages/home-page/home-page.vue"]]);
  let base64Avatar = "data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREMEQwRkY0RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREMEQwRkY1RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEQwRDBGRjJGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEQwRDBGRjNGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAMDg8QDw4MExMUFBMTHBsbGxwfHx8fHx8fHx8fAQcHBw0MDRgQEBgaFREVGh8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCADIAMgDAREAAhEBAxEB/8QAcQABAQEAAwEBAAAAAAAAAAAAAAUEAQMGAgcBAQAAAAAAAAAAAAAAAAAAAAAQAAIBAwICBgkDBQAAAAAAAAABAhEDBCEFMVFBYXGREiKBscHRMkJSEyOh4XLxYjNDFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHbHFyZ/Dam+yLA+Z2L0Pjtyj2poD4AAAAAAAAAAAAAAAAAAAAAAAAKWFs9y6lcvvwQeqj8z9wFaziY1n/HbUX9XF97A7QAGXI23EvJ1goyfzR0YEfN269jeZ+a03pNe0DIAAAAAAAAAAAAAAAAAAAACvtO3RcVkXlWutuL9YFYAAAAAOJRjKLjJVi9GmB5/csH/mu1h/in8PU+QGMAAAAAAAAAAAAAAAAAAaMDG/6MmMH8C80+xAelSSVFolwQAAAAAAAHVlWI37ErUulaPk+hgeYnCUJuElSUXRrrQHAAAAAAAAAAAAAAAAABa2Oz4bM7r4zdF2ICmAAAAAAAAAg7zZ8GX41wuJP0rRgYAAAAAAAAAAAAAAAAAD0m2R8ODaXU33tsDSAAAAAAAAAlb9HyWZcnJd9PcBHAAAAAAAAAAAAAAAAAPS7e64Vn+KA0AAAAAAAAAJm+v8Ftf3ewCKAAAAAAAAAAAAAAAAAX9muqeGo9NttP06+0DcAAAAAAAAAjb7dTu2ra+VOT9P8AQCWAAAAAAAAAAAAAAAAAUNmyPt5Ltv4bui/kuAF0AAAAAAADiUlGLlJ0SVW+oDzOXfd/Ind6JPRdS0QHSAAAAAAAAAAAAAAAAAE2nVaNcGB6Lbs6OTao9LsF51z60BrAAAAAABJ3jOVHjW3r/sa9QEgAAAAAAAAAAAAAAAAAAAPu1duWriuW34ZR4MC9hbnZyEoy8l36XwfYBsAAADaSq9EuLAlZ+7xSdrGdW9Hc5dgEdtt1erfFgAAAAAAAAAAAAAAAAADVjbblX6NR8MH80tEBRs7HYivyzlN8lovaBPzduvY0m6eK10TXtAyAarO55lpJK54orolr+4GqO/Xaea1FvqbXvA+Z77kNeW3GPbV+4DJfzcm/pcm3H6Vou5AdAFLC2ed2Pjv1txa8sV8T6wOL+yZEKu1JXFy4MDBOE4ScZxcZLinoB8gAAAAAAAAAAAB242LeyJ+C3GvN9C7QLmJtePYpKS+5c+p8F2IDYAANJqj1T4oCfk7Nj3G5Wn9qXJax7gJ93Z82D8sVNc4v30A6Xg5i42Z+iLfqARwcyT0sz9MWvWBps7LlTf5Grce9/oBTxdtxseklHxT+uWr9AGoAB138ezfj4bsFJdD6V2MCPm7RdtJzs1uW1xXzL3gTgAAAAAAAAADRhYc8q74I6RWs5ckB6GxYtWLat21SK731sDsAAAAAAAAAAAAAAAASt021NO/YjrxuQXT1oCOAAAAAAABzGLlJRSq26JAelwsWONYjbXxcZvmwO8AAAAAAAAAAAAAAAAAAef3TEWPkVivx3NY9T6UBiAAAAAABo2+VmGXblddIJ8eivRUD0oAAAAAAAAAAAAAAAAAAAYt4tKeFKVNYNSXfRgefAAAAAAAAr7VuSSWPedKaW5v1MCsAAAAAAAAAAAAAAAAAAIe6bj96Ts2n+JPzSXzP3ATgAAAAAAAAFbbt1UUrOQ9FpC4/UwK6aaqtU+DAAAAAAAAAAAAAAA4lKMIuUmoxWrb4ARNx3R3q2rLpa4Sl0y/YCcAAAAAAAAAAANmFud7G8r89r6X0dgFvGzLGRGtuWvTF6NAdwAAAAAAAAAAAy5W442PVN+K59EePp5ARMvOv5MvO6QXCC4AZwAAAAAAAAAAAAAcxlKLUotprg1owN+PvORborq+7Hnwl3gUbO74VzRydt8pKn68ANcJwmqwkpLmnUDkAAAAfNy9atqtyagut0AxXt5xIV8Fbj6lRd7Am5G65V6qUvtwfyx94GMAAAAAAAAAAAAAAAAAAAOU2nVOj5gdsc3LiqRvTpyqwOxbnnrhdfpSfrQB7pnv/AGvuS9gHXPMy5/Fem1yq0v0A6W29XqwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z";
  const _sfc_main$s = {
    name: "u-avatar",
    emits: ["click"],
    props: {
      // 背景颜色
      bgColor: {
        type: String,
        default: "transparent"
      },
      // 头像路径
      src: {
        type: [String, null],
        default: ""
      },
      // 尺寸，large-大，default-中等，mini-小，如果为数值，则单位为rpx
      // 宽度等于高度
      size: {
        type: [String, Number],
        default: "default"
      },
      // 头像模型，square-带圆角方形，circle-圆形
      mode: {
        type: String,
        default: "circle"
      },
      // 文字内容
      text: {
        type: String,
        default: ""
      },
      // 图片的裁剪模型
      imgMode: {
        type: String,
        default: "aspectFill"
      },
      // 标识符
      index: {
        type: [String, Number],
        default: ""
      },
      // 右上角性别角标，man-男，woman-女
      sexIcon: {
        type: [String, null],
        default: "man"
      },
      // 右下角的等级图标
      levelIcon: {
        type: String,
        default: "level"
      },
      // 右下角等级图标背景颜色
      levelBgColor: {
        type: String,
        default: ""
      },
      // 右上角性别图标的背景颜色
      sexBgColor: {
        type: String,
        default: ""
      },
      // 是否显示性别图标
      showSex: {
        type: Boolean,
        default: false
      },
      // 是否显示等级图标
      showLevel: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        error: false,
        // 头像的地址，因为如果加载错误，需要赋值为默认图片，props值无法修改，所以需要一个中间值
        avatar: this.src ? this.src : base64Avatar
      };
    },
    watch: {
      src(n) {
        if (!n) {
          this.avatar = base64Avatar;
          this.error = true;
        } else {
          this.avatar = n;
          this.error = false;
        }
      }
    },
    computed: {
      wrapStyle() {
        let style = {};
        style.height = this.size == "large" ? "120rpx" : this.size == "default" ? "90rpx" : this.size == "mini" ? "70rpx" : this.size + "rpx";
        style.width = style.height;
        style.flex = `0 0 ${style.height}`;
        style.backgroundColor = this.bgColor;
        style.borderRadius = this.mode == "circle" ? "500px" : "5px";
        if (this.text)
          style.padding = `0 6rpx`;
        return style;
      },
      imgStyle() {
        let style = {};
        style.borderRadius = this.mode == "circle" ? "500px" : "5px";
        return style;
      },
      // 取字符串的第一个字符
      uText() {
        return String(this.text)[0];
      },
      // 性别图标的自定义样式
      uSexStyle() {
        let style = {};
        if (this.sexBgColor)
          style.backgroundColor = this.sexBgColor;
        return style;
      },
      // 等级图标的自定义样式
      uLevelStyle() {
        let style = {};
        if (this.levelBgColor)
          style.backgroundColor = this.levelBgColor;
        return style;
      }
    },
    methods: {
      // 图片加载错误时，显示默认头像
      loadError() {
        this.error = true;
        this.avatar = base64Avatar;
      },
      click() {
        this.$emit("click", this.index);
      }
    }
  };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-avatar",
        style: vue.normalizeStyle([$options.wrapStyle]),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.click && $options.click(...args))
      },
      [
        !$options.uText && $data.avatar ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          onError: _cache[0] || (_cache[0] = (...args) => $options.loadError && $options.loadError(...args)),
          style: vue.normalizeStyle([$options.imgStyle]),
          class: "u-avatar__img",
          src: $data.avatar,
          mode: $props.imgMode
        }, null, 44, ["src", "mode"])) : $options.uText ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            class: "u-line-1",
            style: {
              fontSize: "38rpx"
            }
          },
          vue.toDisplayString($options.uText),
          1
          /* TEXT */
        )) : vue.renderSlot(_ctx.$slots, "default", { key: 2 }, void 0, true),
        $props.showSex && $props.sexIcon ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 3,
            class: vue.normalizeClass(["u-avatar__sex", ["u-avatar__sex--" + $props.sexIcon]]),
            style: vue.normalizeStyle([$options.uSexStyle])
          },
          [
            $props.sexIcon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
              key: 0,
              name: $props.sexIcon,
              size: "20"
            }, null, 8, ["name"])) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        $props.showLevel ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 4,
            class: "u-avatar__level",
            style: vue.normalizeStyle([$options.uLevelStyle])
          },
          [
            vue.createVNode(_component_u_icon, {
              name: $props.levelIcon,
              size: "20"
            }, null, 8, ["name"])
          ],
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r], ["__scopeId", "data-v-49012a02"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-avatar/u-avatar.vue"]]);
  const _sfc_main$r = {
    name: "u-grid-item",
    emits: ["click"],
    props: {
      // 背景颜色
      bgColor: {
        type: String,
        default: "#ffffff"
      },
      // 点击时返回的index
      index: {
        type: [Number, String],
        default: ""
      },
      // 自定义样式，对象形式
      customStyle: {
        type: Object,
        default() {
          return {
            padding: "30rpx 0"
          };
        }
      }
    },
    data() {
      return {
        parentData: {
          hoverClass: "",
          // 按下去的时候，是否显示背景灰色
          col: 3,
          // 父组件划分的宫格数
          border: true
          // 是否显示边框，根据父组件决定
        }
      };
    },
    created() {
      this.updateParentData();
      if (this.parent && this.parent.children) {
        this.parent.children.push(this);
      }
    },
    computed: {
      // 每个grid-item的宽度
      width() {
        return 100 / Number(this.parentData.col) + "%";
      }
    },
    methods: {
      // 获取父组件的参数
      updateParentData() {
        this.getParentData("u-grid");
      },
      click() {
        this.$emit("click", this.index);
        this.parent && this.parent.click(this.index);
      }
    }
  };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "u-grid-item",
      "hover-class": $data.parentData.hoverClass,
      "hover-stay-time": 200,
      onClick: _cache[0] || (_cache[0] = (...args) => $options.click && $options.click(...args)),
      style: vue.normalizeStyle({
        background: $props.bgColor,
        width: $options.width
      })
    }, [
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["u-grid-item-box", [$data.parentData.border ? "u-border-right u-border-bottom" : ""]]),
          style: vue.normalizeStyle([$props.customStyle])
        },
        [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ],
        6
        /* CLASS, STYLE */
      )
    ], 12, ["hover-class"]);
  }
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q], ["__scopeId", "data-v-60e229e5"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-grid-item/u-grid-item.vue"]]);
  const _sfc_main$q = {
    name: "u-grid",
    emits: ["click"],
    props: {
      // 分成几列
      col: {
        type: [Number, String],
        default: 3
      },
      // 是否显示边框
      border: {
        type: Boolean,
        default: true
      },
      // 宫格对齐方式，表现为数量少的时候，靠左，居中，还是靠右
      align: {
        type: String,
        default: "left"
      },
      // 宫格按压时的样式类，"none"为无效果
      hoverClass: {
        type: String,
        default: "u-hover-class"
      }
    },
    data() {
      return {
        index: 0
      };
    },
    watch: {
      // 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
      parentData() {
        if (this.children.length) {
          this.children.map((child) => {
            typeof child.updateParentData == "function" && child.updateParentData();
          });
        }
      }
    },
    created() {
      this.children = [];
    },
    computed: {
      // 计算父组件的值是否发生变化
      parentData() {
        return [this.hoverClass, this.col, this.size, this.border];
      },
      // 宫格对齐方式
      gridStyle() {
        let style = {};
        switch (this.align) {
          case "left":
            style.justifyContent = "flex-start";
            break;
          case "center":
            style.justifyContent = "center";
            break;
          case "right":
            style.justifyContent = "flex-end";
            break;
          default:
            style.justifyContent = "flex-start";
        }
        return style;
      }
    },
    methods: {
      click(index) {
        this.$emit("click", index);
      }
    }
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-grid", { "u-border-top u-border-left": $props.border }]),
        style: vue.normalizeStyle([$options.gridStyle])
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p], ["__scopeId", "data-v-897c440a"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-grid/u-grid.vue"]]);
  const _sfc_main$p = {
    name: "u-cell-item",
    emits: ["click"],
    props: {
      // 左侧图标名称(只能uView内置图标)，或者图标src
      icon: {
        type: String,
        default: ""
      },
      // 左侧标题
      title: {
        type: [String, Number],
        default: ""
      },
      // 右侧内容
      value: {
        type: [String, Number],
        default: ""
      },
      // 标题下方的描述信息
      label: {
        type: [String, Number],
        default: ""
      },
      // 是否显示下边框
      borderBottom: {
        type: Boolean,
        default: true
      },
      // 是否显示上边框
      borderTop: {
        type: Boolean,
        default: false
      },
      // 多个cell中，中间的cell显示下划线时，下划线是否给一个到左边的距离
      // 1.4.0版本废除此参数，默认边框由border-top和border-bottom提供，此参数会造成干扰
      // borderGap: {
      // 	type: Boolean,
      // 	default: true
      // },
      // 是否开启点击反馈，即点击时cell背景为灰色，none为无效果
      hoverClass: {
        type: String,
        default: "u-cell-hover"
      },
      // 是否显示右侧箭头
      arrow: {
        type: Boolean,
        default: true
      },
      // 内容是否垂直居中
      center: {
        type: Boolean,
        default: false
      },
      // 是否显示左边表示必填的星号
      required: {
        type: Boolean,
        default: false
      },
      // 标题的宽度，单位rpx
      titleWidth: {
        type: [Number, String],
        default: ""
      },
      // 右侧箭头方向，可选值：right|up|down，默认为right
      arrowDirection: {
        type: String,
        default: "right"
      },
      // 控制标题的样式
      titleStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 右侧显示内容的样式
      valueStyle: {
        type: [Object, null],
        default() {
          return {};
        }
      },
      // 描述信息的样式
      labelStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: "transparent"
      },
      // 用于识别被点击的是第几个cell
      index: {
        type: [String, Number],
        default: ""
      },
      // 是否使用lable插槽
      useLabelSlot: {
        type: Boolean,
        default: false
      },
      // 左边图标的大小，单位rpx，只对传入icon字段时有效
      iconSize: {
        type: [Number, String],
        default: 34
      },
      // 左边图标的样式，对象形式
      iconStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    },
    computed: {
      arrowStyle() {
        let style = {};
        if (this.arrowDirection == "up")
          style.transform = "rotate(-90deg)";
        else if (this.arrowDirection == "down")
          style.transform = "rotate(90deg)";
        else
          style.transform = "rotate(0deg)";
        return style;
      }
    },
    methods: {
      click() {
        this.$emit("click", this.index);
      }
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock("view", {
      onClick: _cache[0] || (_cache[0] = (...args) => $options.click && $options.click(...args)),
      class: vue.normalizeClass(["u-cell", { "u-border-bottom": $props.borderBottom, "u-border-top": $props.borderTop, "u-col-center": $props.center, "u-cell--required": $props.required }]),
      "hover-stay-time": "150",
      "hover-class": $props.hoverClass,
      style: vue.normalizeStyle({
        backgroundColor: $props.bgColor
      })
    }, [
      $props.icon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
        key: 0,
        size: $props.iconSize,
        name: $props.icon,
        "custom-style": $props.iconStyle,
        class: "u-cell__left-icon-wrap"
      }, null, 8, ["size", "name", "custom-style"])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "u-flex"
      }, [
        vue.renderSlot(_ctx.$slots, "icon", {}, void 0, true)
      ])),
      vue.createElementVNode(
        "view",
        {
          class: "u-cell_title",
          style: vue.normalizeStyle([
            {
              width: $props.titleWidth ? $props.titleWidth + "rpx" : "auto"
            },
            $props.titleStyle
          ])
        },
        [
          $props.title !== "" ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [
              vue.createTextVNode(
                vue.toDisplayString($props.title),
                1
                /* TEXT */
              )
            ],
            64
            /* STABLE_FRAGMENT */
          )) : vue.renderSlot(_ctx.$slots, "title", { key: 1 }, void 0, true),
          $props.label || _ctx.$slots.label ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 2,
              class: "u-cell__label",
              style: vue.normalizeStyle([$props.labelStyle])
            },
            [
              $props.label !== "" ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                [
                  vue.createTextVNode(
                    vue.toDisplayString($props.label),
                    1
                    /* TEXT */
                  )
                ],
                64
                /* STABLE_FRAGMENT */
              )) : vue.renderSlot(_ctx.$slots, "label", { key: 1 }, void 0, true)
            ],
            4
            /* STYLE */
          )) : vue.createCommentVNode("v-if", true)
        ],
        4
        /* STYLE */
      ),
      vue.createElementVNode(
        "view",
        {
          class: "u-cell__value",
          style: vue.normalizeStyle([$props.valueStyle || {}])
        },
        [
          $props.value !== "" ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [
              vue.createTextVNode(
                vue.toDisplayString($props.value),
                1
                /* TEXT */
              )
            ],
            64
            /* STABLE_FRAGMENT */
          )) : vue.renderSlot(_ctx.$slots, "default", { key: 1 }, void 0, true)
        ],
        4
        /* STYLE */
      ),
      _ctx.$slots["right-icon"] ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "u-flex u-cell_right"
      }, [
        vue.renderSlot(_ctx.$slots, "right-icon", {}, void 0, true)
      ])) : vue.createCommentVNode("v-if", true),
      $props.arrow ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
        key: 3,
        name: "arrow-right",
        style: vue.normalizeStyle([$options.arrowStyle]),
        class: "u-icon-wrap u-cell__right-icon-wrap"
      }, null, 8, ["style"])) : vue.createCommentVNode("v-if", true)
    ], 14, ["hover-class"]);
  }
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["__scopeId", "data-v-e5554f60"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-cell-item/u-cell-item.vue"]]);
  const _sfc_main$o = {
    name: "u-cell-group",
    props: {
      // 分组标题
      title: {
        type: String,
        default: ""
      },
      // 是否显示分组list上下边框
      border: {
        type: Boolean,
        default: true
      },
      // 分组标题的样式，对象形式，注意驼峰属性写法
      // 类似 {'font-size': '24rpx'} 和 {'fontSize': '24rpx'}
      titleStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        index: 0
      };
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-cell-box" }, [
      $props.title ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: "u-cell-title",
          style: vue.normalizeStyle([$props.titleStyle])
        },
        vue.toDisplayString($props.title),
        5
        /* TEXT, STYLE */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["u-cell-item-box", { "u-border-bottom u-border-top": $props.border }])
        },
        [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ],
        2
        /* CLASS */
      )
    ]);
  }
  const __easycom_3$2 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__scopeId", "data-v-dd1e88cb"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-cell-group/u-cell-group.vue"]]);
  const _imports_0 = "/static/image/my/bit.png";
  const _imports_1 = "/static/image/my/icon-3.png";
  const _imports_2 = "/static/image/my/icon-1.png";
  const _imports_3 = "/static/image/my/icon-2.png";
  const _sfc_main$n = {
    data() {
      return {
        allBTC: "",
        mySummary: {}
      };
    },
    computed: {
      avatarUrl() {
        return this.mySummary.avatar || "/static/image/my/man.svg";
      }
    },
    onShow() {
      this.loadMySummary();
      this.loadAllBTC();
    },
    methods: {
      goTo(url2) {
        uni.navigateTo({ url: url2 });
      },
      loadMySummary() {
        uni.showLoading("加载中...");
        request({
          url: "/api/blade-user/info",
          method: "GET",
          data: {
            id: getLocalStorage("userId")
          }
        }).then((res) => {
          this.mySummary = res.data.data;
        }).finally(() => {
          uni.hideLoading();
        });
      },
      loadAllBTC() {
        uni.showLoading("加载中...");
        request({
          url: "/api/blade-demo/assetlegal/AllMoney",
          method: "GET",
          data: {
            userId: getLocalStorage("userId")
          }
        }).then((res) => {
          this.allBTC = res.data.data.allBTC;
        }).finally(() => {
          uni.hideLoading();
        });
      }
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_avatar = resolveEasycom(vue.resolveDynamicComponent("u-avatar"), __easycom_0$5);
    const _component_u_grid_item = resolveEasycom(vue.resolveDynamicComponent("u-grid-item"), __easycom_1$3);
    const _component_u_grid = resolveEasycom(vue.resolveDynamicComponent("u-grid"), __easycom_2$2);
    const _component_u_cell_item = resolveEasycom(vue.resolveDynamicComponent("u-cell-item"), __easycom_2$1);
    const _component_u_cell_group = resolveEasycom(vue.resolveDynamicComponent("u-cell-group"), __easycom_3$2);
    return $data.mySummary ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "page-container"
    }, [
      vue.createElementVNode("view", { class: "basic-info u-flex u-flex-col u-row-center" }, [
        vue.createVNode(_component_u_avatar, {
          src: $options.avatarUrl,
          size: "large",
          "bg-color": "#FFFFFF"
        }, null, 8, ["src"]),
        vue.createElementVNode(
          "view",
          { class: "name" },
          vue.toDisplayString($data.mySummary.name || "--"),
          1
          /* TEXT */
        )
      ]),
      vue.createCommentVNode(" 资产统计 "),
      $data.mySummary ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "money-stats"
      }, [
        vue.createElementVNode("view", { class: "line-1" }, "总资产折合（BTC）"),
        vue.createElementVNode(
          "view",
          { class: "line-2" },
          vue.toDisplayString($data.allBTC || "--"),
          1
          /* TEXT */
        ),
        vue.createElementVNode("image", {
          class: "bit",
          src: _imports_0,
          mode: "aspectFit"
        })
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 功能区块 "),
      vue.createVNode(_component_u_grid, {
        col: 3,
        class: "tab u-p-0"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_u_grid_item, {
            onClick: _cache[0] || (_cache[0] = ($event) => $options.goTo("/pages/my/order/order"))
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("image", {
                src: _imports_1,
                class: "icon"
              }),
              vue.createElementVNode("text", null, "我的订单")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_u_grid_item, {
            onClick: _cache[1] || (_cache[1] = ($event) => $options.goTo("/pages/my/myProperty"))
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("image", {
                src: _imports_2,
                class: "icon"
              }),
              vue.createElementVNode("text", null, "我的资产")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_u_grid_item, {
            onClick: _cache[2] || (_cache[2] = ($event) => $options.goTo("/pages/my/myBill"))
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("image", {
                src: _imports_3,
                class: "icon"
              }),
              vue.createElementVNode("text", null, "我的账单")
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createCommentVNode(" 个人中心 "),
      vue.createElementVNode("view", { class: "jump-group card-view u-p-b-0" }, [
        vue.createElementVNode("view", { class: "title" }, "个人中心"),
        vue.createVNode(_component_u_cell_group, { border: false }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_u_cell_item, {
              title: "用户设置",
              isLink: "",
              onClick: _cache[3] || (_cache[3] = ($event) => $options.goTo("/pages/my/user-setting/user-setting"))
            }),
            vue.createVNode(_component_u_cell_item, {
              title: "安全设置",
              isLink: "",
              onClick: _cache[4] || (_cache[4] = ($event) => $options.goTo("/pages/my/mySafeAddress"))
            }),
            vue.createVNode(_component_u_cell_item, {
              title: "提币地址",
              "border-bottom": false,
              isLink: "",
              onClick: _cache[5] || (_cache[5] = ($event) => $options.goTo("/pages/my/myCoinAddress"))
            })
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      vue.createCommentVNode(" 关于我们 "),
      vue.createElementVNode("view", { class: "jump-group card-view u-p-b-0" }, [
        vue.createElementVNode("view", { class: "title" }, "关于我们"),
        vue.createVNode(_component_u_cell_group, { border: false }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_u_cell_item, {
              title: "帮助中心",
              isLink: "",
              onClick: _cache[6] || (_cache[6] = ($event) => $options.goTo("/pages/my/myHelper"))
            }),
            vue.createVNode(_component_u_cell_item, {
              title: "关于MinerGlory",
              "border-bottom": false,
              isLink: "",
              onClick: _cache[7] || (_cache[7] = ($event) => $options.goTo("/pages/my/about/about"))
            })
          ]),
          _: 1
          /* STABLE */
        })
      ])
    ])) : vue.createCommentVNode("v-if", true);
  }
  const PagesMyMy = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__scopeId", "data-v-2f1ef635"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/pages/my/my.vue"]]);
  const _sfc_main$m = {
    data() {
      return {
        tabList: [{ name: "算力" }, { name: "矿机" }],
        tabActive: 1,
        // 默认矿机
        products: [],
        current: 1,
        pagesize: 10,
        loading: false,
        loadStatus: "loadmore",
        // loading, nomore
        picDemoImage: "/static/image/taosuanli/pic-demo.png"
      };
    },
    onShow() {
      this.resetList();
      this.getProductList();
    },
    methods: {
      resetList() {
        this.products = [];
        this.current = 1;
        this.loadStatus = "loadmore";
      },
      changeTabActive(index) {
        this.tabActive = index;
        this.resetList();
        this.getProductList();
      },
      getProductList() {
        if (this.loading || this.loadStatus === "nomore")
          return;
        this.loading = true;
        request({
          url: "/api/blade-demo/product/pageByProductRepertory",
          method: "GET",
          data: {
            current: this.current,
            size: this.pagesize
          }
        }).then((res) => {
          this.loading = false;
          const list = res.data.data && res.data.data.records || [];
          this.products = this.products.concat(list);
          if (list.length < this.pagesize) {
            this.loadStatus = "nomore";
          } else {
            this.current += 1;
            this.loadStatus = "loadmore";
          }
        });
      },
      goToDetail(row) {
        if (this.tabActive === 0) {
          uni.navigateTo({ url: `/pages/mall/machine-detail/machine-detail?id=${row.id}` });
        } else {
          if (row.productRepertory > 0) {
            uni.navigateTo({ url: `/pages/mall/machine-detail/machine-detail?id=${row.id}&productCop=${row.productCop}` });
          }
        }
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page-container" }, [
      vue.createCommentVNode(" 顶部tab "),
      vue.createCommentVNode(' <u-tabs :list="tabList" :current="tabActive" @change="changeTabActive" /> '),
      vue.createCommentVNode(" 商品列表，滚动加载 "),
      vue.createElementVNode(
        "scroll-view",
        {
          "scroll-y": "",
          style: { "height": "100%" },
          onScrolltolower: _cache[0] || (_cache[0] = (...args) => $options.getProductList && $options.getProductList(...args))
        },
        [
          vue.createCommentVNode(` <view v-for="p in products" :key="p.id" v-if="p.productPutawayStatus === '是'"> `),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.products, (p) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: p.id
              }, [
                vue.createElementVNode("view", { class: "list-item" }, [
                  vue.createElementVNode("view", { class: "m-list-item" }, [
                    p.productRepertory <= 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "pic"
                    }, "已售罄")) : vue.createCommentVNode("v-if", true),
                    vue.createElementVNode("image", {
                      src: p.avatar || $data.picDemoImage,
                      class: "product-img",
                      mode: "aspectFill"
                    }, null, 8, ["src"]),
                    vue.createElementVNode("view", { class: "info" }, [
                      vue.createElementVNode(
                        "view",
                        { class: "line-1" },
                        vue.toDisplayString(p.productName),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "line-2" }, [
                        vue.createElementVNode("text", { class: "fl" }, "额定算力："),
                        vue.createElementVNode(
                          "text",
                          { class: "rl" },
                          vue.toDisplayString(p.productHashrate) + vue.toDisplayString(p.productHashrateUnit),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "line-3" }, [
                        vue.createElementVNode("text", { class: "fl" }, "能耗比："),
                        vue.createElementVNode(
                          "text",
                          { class: "rl" },
                          vue.toDisplayString(p.productCop) + vue.toDisplayString(p.productCopUnit),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "line-3_1" }, [
                        vue.createElementVNode("text", { class: "fl" }, "回本周期："),
                        vue.createElementVNode(
                          "text",
                          { class: "rl" },
                          vue.toDisplayString(p.hbzq || "--"),
                          1
                          /* TEXT */
                        )
                      ]),
                      p.ytsy ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "line-3_2"
                      }, [
                        vue.createElementVNode("text", { class: "fl" }, "一天收益："),
                        vue.createElementVNode(
                          "text",
                          { class: "rl" },
                          vue.toDisplayString(p.ytsy),
                          1
                          /* TEXT */
                        )
                      ])) : vue.createCommentVNode("v-if", true),
                      p.productWaybillDatetime ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 1,
                        class: "line-3_3"
                      }, [
                        vue.createElementVNode("text", { class: "fl" }, "发货日期："),
                        vue.createElementVNode(
                          "text",
                          { class: "rl" },
                          vue.toDisplayString(p.productWaybillDatetime),
                          1
                          /* TEXT */
                        )
                      ])) : vue.createCommentVNode("v-if", true),
                      vue.createElementVNode(
                        "view",
                        { class: "line-4" },
                        "￥" + vue.toDisplayString(p.productSellPrice),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "line-5" }, [
                        vue.createElementVNode(
                          "view",
                          null,
                          vue.toDisplayString(p.productFirstLabel),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "view",
                          { class: "active" },
                          vue.toDisplayString(p.productSecondLabel),
                          1
                          /* TEXT */
                        )
                      ])
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "line-6" }, [
                    vue.createElementVNode("button", {
                      class: "buy-btn",
                      type: "primary",
                      size: "mini",
                      disabled: p.productRepertory <= 0,
                      onClick: ($event) => $options.goToDetail(p)
                    }, "立即抢购", 8, ["disabled", "onClick"])
                  ])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          vue.createCommentVNode(" 无数据 "),
          !$data.products.length && !$data.loading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "empty"
          }, "暂无商品")) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 加载中/没有更多 "),
          $data.loading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "loadmore"
          }, "加载中...")) : $data.loadStatus === "nomore" && $data.products.length ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "loadmore"
          }, "没有更多了")) : vue.createCommentVNode("v-if", true)
        ],
        32
        /* NEED_HYDRATION */
      ),
      vue.createCommentVNode(" 加载中/没有更多 "),
      vue.createCommentVNode(' <u-loadmore :status="loadStatus" /> ')
    ]);
  }
  const PagesMallMall = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__scopeId", "data-v-6808f5eb"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/pages/mall/mall.vue"]]);
  function broadcast(componentName, eventName, params) {
  }
  const Emitter = {
    methods: {
      /**
       * 派发 (向上查找) (一个)
       * @param componentName // 需要找的组件的名称
       * @param eventName // 事件名称
       * @param params // 需要传递的参数
       */
      dispatch(componentName, eventName, params) {
        let parent = this.$parent || this.$root;
        let name = parent.$options.name;
        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;
          if (parent) {
            name = parent.$options.name;
          }
        }
        if (parent) {
          parent[eventName](params);
        }
      },
      /**
       * 广播 (向下查找) (广播多个)
       * @param componentName // 需要找的组件的名称
       * @param eventName // 事件名称
       * @param params // 需要传递的参数
       */
      broadcast(componentName, eventName, params) {
        broadcast.call(this, componentName, eventName, params);
      }
    }
  };
  const _sfc_main$l = {
    name: "u-input",
    emits: ["update:modelValue", "input", "change", "confirm", "clear", "blur", "focus", "click", "touchstart"],
    mixins: [Emitter],
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      // 输入框的类型，textarea，text，number
      type: {
        type: String,
        default: "text"
      },
      inputAlign: {
        type: String,
        default: ""
      },
      placeholder: {
        type: String,
        default: "请输入内容"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      placeholderStyle: {
        type: String,
        default: "color: #c0c4cc;"
      },
      confirmType: {
        type: String,
        default: "done"
      },
      // 输入框的自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
      fixed: {
        type: Boolean,
        default: false
      },
      // 是否自动获得焦点
      focus: {
        type: Boolean,
        default: false
      },
      // 密码类型时，是否显示右侧的密码图标
      passwordIcon: {
        type: Boolean,
        default: true
      },
      // input|textarea是否显示边框
      border: {
        type: Boolean,
        default: false
      },
      // 输入框的边框颜色
      borderColor: {
        type: String,
        default: "#dcdfe6"
      },
      autoHeight: {
        type: Boolean,
        default: true
      },
      // type=select时，旋转右侧的图标，标识当前处于打开还是关闭select的状态
      // open-打开，close-关闭
      selectOpen: {
        type: Boolean,
        default: false
      },
      // 高度，单位rpx
      height: {
        type: [Number, String],
        default: ""
      },
      // 是否可清空
      clearable: {
        type: [Boolean, String]
      },
      // 指定光标与键盘的距离，单位 px
      cursorSpacing: {
        type: [Number, String],
        default: 0
      },
      // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
      selectionStart: {
        type: [Number, String],
        default: -1
      },
      // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
      selectionEnd: {
        type: [Number, String],
        default: -1
      },
      // 是否自动去除两端的空格
      trim: {
        type: Boolean,
        default: true
      },
      // 是否显示键盘上方带有”完成“按钮那一栏
      showConfirmbar: {
        type: Boolean,
        default: true
      },
      // 弹出键盘时是否自动调节高度，uni-app默认值是true
      adjustPosition: {
        type: Boolean,
        default: true
      },
      // input的背景色
      backgroundColor: {
        type: String
      },
      // input的padding
      padding: {
        type: String
      }
    },
    data() {
      return {
        defaultValue: "",
        inputHeight: 70,
        // input的高度
        textareaHeight: 100,
        // textarea的高度
        validateState: false,
        // 当前input的验证状态，用于错误时，边框是否改为红色
        focused: false,
        // 当前是否处于获得焦点的状态
        showPassword: false,
        // 是否预览密码
        lastValue: "",
        // 用于头条小程序，判断@input中，前后的值是否发生了变化，因为头条中文下，按下键没有输入内容，也会触发@input时间
        uForm: {
          inputAlign: "",
          clearable: ""
        },
        showCover: false
      };
    },
    watch: {
      valueCom(nVal, oVal) {
        this.defaultValue = nVal;
        if (nVal != oVal && this.type == "select")
          this.handleInput({
            detail: {
              value: nVal
            }
          });
      },
      defaultValue(nVal, oVal) {
        if (nVal && nVal.length > this.maxlength) {
          setTimeout(() => {
            nVal = nVal.substring(0, this.maxlength);
            this.handleInput({
              detail: {
                value: nVal
              }
            });
          }, 0);
        }
      }
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      inputAlignCom() {
        return this.inputAlign || this.uForm.inputAlign || "left";
      },
      clearableCom() {
        if (typeof this.clearable == "boolean")
          return this.clearable;
        if (typeof this.uForm.clearable == "boolean")
          return this.uForm.clearable;
        return true;
      },
      // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，给用户可以传入字符串数值
      inputMaxlength() {
        return Number(this.maxlength);
      },
      getStyle() {
        let style = {};
        style.minHeight = this.height ? this.height + "rpx" : this.type == "textarea" ? this.textareaHeight + "rpx" : this.inputHeight + "rpx";
        style = Object.assign(style, this.customStyle);
        return style;
      },
      //
      getCursorSpacing() {
        return Number(this.cursorSpacing);
      },
      // 光标起始位置
      uSelectionStart() {
        return String(this.selectionStart);
      },
      // 光标结束位置
      uSelectionEnd() {
        return String(this.selectionEnd);
      }
    },
    created() {
      this.defaultValue = this.valueCom;
    },
    mounted() {
      let parent = this.$u.$parent.call(this, "u-form");
      if (parent) {
        Object.keys(this.uForm).map((key) => {
          this.uForm[key] = parent[key];
        });
      }
    },
    methods: {
      /**
       * change 事件
       * @param event
       */
      handleInput(event) {
        let value = event.detail.value;
        if (this.trim)
          value = this.$u.trim(value);
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
        this.defaultValue = value;
        setTimeout(() => {
          this.dispatch("u-form-item", "onFieldChange", value);
        }, 40);
      },
      /**
       * blur 事件
       * @param event
       */
      handleBlur(event) {
        setTimeout(() => {
          this.focused = false;
        }, 100);
        let value = event.detail.value;
        this.$emit("blur", value);
        setTimeout(() => {
          this.dispatch("u-form-item", "onFieldBlur", value);
        }, 40);
      },
      onFormItemError(status) {
        this.validateState = status;
      },
      onFocus(event) {
        this.focused = true;
        this.$emit("focus");
      },
      onConfirm(e) {
        this.$emit("confirm", e.detail.value);
      },
      onClear(event) {
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
        this.$emit("clear");
      },
      inputClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-input", {
          "u-input--border": $props.border,
          "u-input--error": $data.validateState
        }]),
        style: vue.normalizeStyle({
          padding: $props.padding ? $props.padding : `0 ${$props.border ? 20 : 0}rpx`,
          borderColor: $props.borderColor,
          textAlign: $options.inputAlignCom,
          backgroundColor: $props.backgroundColor
        }),
        onClick: _cache[11] || (_cache[11] = vue.withModifiers((...args) => $options.inputClick && $options.inputClick(...args), ["stop"]))
      },
      [
        $props.type == "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
          key: 0,
          class: "u-input__input u-input__textarea",
          style: vue.normalizeStyle([$options.getStyle]),
          value: $data.defaultValue,
          placeholder: $props.placeholder,
          placeholderStyle: $props.placeholderStyle,
          disabled: $props.disabled,
          fixed: $props.fixed,
          focus: $props.focus,
          maxlength: -1,
          autoHeight: $props.autoHeight,
          "selection-end": $options.uSelectionEnd,
          "selection-start": $options.uSelectionStart,
          "cursor-spacing": $options.getCursorSpacing,
          "show-confirm-bar": $props.showConfirmbar,
          "adjust-position": $props.adjustPosition,
          onInput: _cache[0] || (_cache[0] = (...args) => $options.handleInput && $options.handleInput(...args)),
          onBlur: _cache[1] || (_cache[1] = (...args) => $options.handleBlur && $options.handleBlur(...args)),
          onFocus: _cache[2] || (_cache[2] = (...args) => $options.onFocus && $options.onFocus(...args)),
          onConfirm: _cache[3] || (_cache[3] = (...args) => $options.onConfirm && $options.onConfirm(...args))
        }, null, 44, ["value", "placeholder", "placeholderStyle", "disabled", "fixed", "focus", "autoHeight", "selection-end", "selection-start", "cursor-spacing", "show-confirm-bar", "adjust-position"])) : (vue.openBlock(), vue.createElementBlock("input", {
          key: 1,
          class: vue.normalizeClass(["u-input__input", "u-input__" + $props.type]),
          type: $props.type == "password" ? "text" : $props.type,
          style: vue.normalizeStyle([$options.getStyle]),
          value: $data.defaultValue,
          maxlength: 1e4,
          password: $props.type == "password" && !$data.showPassword,
          placeholder: $props.placeholder,
          placeholderStyle: $props.placeholderStyle,
          disabled: $props.disabled || $props.type === "select" && !$data.showCover,
          focus: $props.focus,
          confirmType: $props.confirmType,
          "cursor-spacing": $options.getCursorSpacing,
          "selection-end": $options.uSelectionEnd,
          "selection-start": $options.uSelectionStart,
          "show-confirm-bar": $props.showConfirmbar,
          "adjust-position": $props.adjustPosition,
          onFocus: _cache[4] || (_cache[4] = (...args) => $options.onFocus && $options.onFocus(...args)),
          onBlur: _cache[5] || (_cache[5] = (...args) => $options.handleBlur && $options.handleBlur(...args)),
          onInput: _cache[6] || (_cache[6] = (...args) => $options.handleInput && $options.handleInput(...args)),
          onConfirm: _cache[7] || (_cache[7] = (...args) => $options.onConfirm && $options.onConfirm(...args))
        }, null, 46, ["type", "value", "password", "placeholder", "placeholderStyle", "disabled", "focus", "confirmType", "cursor-spacing", "selection-end", "selection-start", "show-confirm-bar", "adjust-position"])),
        $props.type === "select" && $data.showCover ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "cover-input",
          onClick: _cache[8] || (_cache[8] = vue.withModifiers((...args) => $options.inputClick && $options.inputClick(...args), ["stop"]))
        })) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "u-input__right-icon u-flex" }, [
          $options.clearableCom && $options.valueCom != "" && $data.focused ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "u-input__right-icon__clear u-input__right-icon__item",
            onClick: _cache[9] || (_cache[9] = (...args) => $options.onClear && $options.onClear(...args))
          }, [
            vue.createVNode(_component_u_icon, {
              size: "32",
              name: "close-circle-fill",
              color: "#c0c4cc"
            })
          ])) : vue.createCommentVNode("v-if", true),
          $props.passwordIcon && $props.type == "password" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "u-input__right-icon__clear u-input__right-icon__item"
          }, [
            vue.createVNode(_component_u_icon, {
              size: "32",
              name: !$data.showPassword ? "eye" : "eye-fill",
              color: "#c0c4cc",
              onClick: _cache[10] || (_cache[10] = ($event) => $data.showPassword = !$data.showPassword)
            }, null, 8, ["name"])
          ])) : vue.createCommentVNode("v-if", true),
          $props.type == "select" ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 2,
              class: vue.normalizeClass(["u-input__right-icon--select u-input__right-icon__item", {
                "u-input__right-icon--select--reverse": $props.selectOpen
              }])
            },
            [
              vue.createVNode(_component_u_icon, {
                name: "arrow-down-fill",
                size: "26",
                color: "#c0c4cc"
              })
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-dc846cb1"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-input/u-input.vue"]]);
  var define_process_env_default = {};
  function _extends() {
    _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  var formatRegExp = /%[sdj%]/g;
  var warning = function warning2() {
  };
  if (typeof process !== "undefined" && define_process_env_default && true && typeof window !== "undefined" && typeof document !== "undefined") {
    warning = function warning3(type2, errors) {
      if (typeof console !== "undefined" && console.warn) {
        if (errors.every(function(e) {
          return typeof e === "string";
        })) {
          formatAppLog("warn", "at uni_modules/vk-uview-ui/libs/util/async-validator.js:30", type2, errors);
        }
      }
    };
  }
  function convertFieldsError(errors) {
    if (!errors || !errors.length)
      return null;
    var fields = {};
    errors.forEach(function(error) {
      var field = error.field;
      fields[field] = fields[field] || [];
      fields[field].push(error);
    });
    return fields;
  }
  function format() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var i = 1;
    var f = args[0];
    var len = args.length;
    if (typeof f === "function") {
      return f.apply(null, args.slice(1));
    }
    if (typeof f === "string") {
      var str = String(f).replace(formatRegExp, function(x) {
        if (x === "%%") {
          return "%";
        }
        if (i >= len) {
          return x;
        }
        switch (x) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
            break;
          default:
            return x;
        }
      });
      for (var arg = args[i]; i < len; arg = args[++i]) {
        str += " " + arg;
      }
      return str;
    }
    return f;
  }
  function isNativeStringType(type2) {
    return type2 === "string" || type2 === "url" || type2 === "hex" || type2 === "email" || type2 === "pattern";
  }
  function isEmptyValue(value, type2) {
    if (value === void 0 || value === null) {
      return true;
    }
    if (type2 === "array" && Array.isArray(value) && !value.length) {
      return true;
    }
    if (isNativeStringType(type2) && typeof value === "string" && !value) {
      return true;
    }
    return false;
  }
  function asyncParallelArray(arr, func2, callback) {
    var results = [];
    var total = 0;
    var arrLength = arr.length;
    function count(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === arrLength) {
        callback(results);
      }
    }
    arr.forEach(function(a) {
      func2(a, count);
    });
  }
  function asyncSerialArray(arr, func2, callback) {
    var index = 0;
    var arrLength = arr.length;
    function next(errors) {
      if (errors && errors.length) {
        callback(errors);
        return;
      }
      var original = index;
      index = index + 1;
      if (original < arrLength) {
        func2(arr[original], next);
      } else {
        callback([]);
      }
    }
    next([]);
  }
  function flattenObjArr(objArr) {
    var ret = [];
    Object.keys(objArr).forEach(function(k) {
      ret.push.apply(ret, objArr[k]);
    });
    return ret;
  }
  function asyncMap(objArr, option, func2, callback) {
    if (option.first) {
      var _pending = new Promise(function(resolve, reject) {
        var next = function next2(errors) {
          callback(errors);
          return errors.length ? reject({
            errors,
            fields: convertFieldsError(errors)
          }) : resolve();
        };
        var flattenArr = flattenObjArr(objArr);
        asyncSerialArray(flattenArr, func2, next);
      });
      _pending["catch"](function(e) {
        return e;
      });
      return _pending;
    }
    var firstFields = option.firstFields || [];
    if (firstFields === true) {
      firstFields = Object.keys(objArr);
    }
    var objArrKeys = Object.keys(objArr);
    var objArrLength = objArrKeys.length;
    var total = 0;
    var results = [];
    var pending = new Promise(function(resolve, reject) {
      var next = function next2(errors) {
        results.push.apply(results, errors);
        total++;
        if (total === objArrLength) {
          callback(results);
          return results.length ? reject({
            errors: results,
            fields: convertFieldsError(results)
          }) : resolve();
        }
      };
      if (!objArrKeys.length) {
        callback(results);
        resolve();
      }
      objArrKeys.forEach(function(key) {
        var arr = objArr[key];
        if (firstFields.indexOf(key) !== -1) {
          asyncSerialArray(arr, func2, next);
        } else {
          asyncParallelArray(arr, func2, next);
        }
      });
    });
    pending["catch"](function(e) {
      return e;
    });
    return pending;
  }
  function complementError(rule) {
    return function(oe) {
      if (oe && oe.message) {
        oe.field = oe.field || rule.fullField;
        return oe;
      }
      return {
        message: typeof oe === "function" ? oe() : oe,
        field: oe.field || rule.fullField
      };
    };
  }
  function deepMerge$1(target, source) {
    if (source) {
      for (var s in source) {
        if (source.hasOwnProperty(s)) {
          var value = source[s];
          if (typeof value === "object" && typeof target[s] === "object") {
            target[s] = _extends({}, target[s], {}, value);
          } else {
            target[s] = value;
          }
        }
      }
    }
    return target;
  }
  function required(rule, value, source, errors, options, type2) {
    if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type2 || rule.type))) {
      errors.push(format(options.messages.required, rule.fullField));
    }
  }
  function whitespace(rule, value, source, errors, options) {
    if (/^\s+$/.test(value) || value === "") {
      errors.push(format(options.messages.whitespace, rule.fullField));
    }
  }
  var pattern = {
    // http://emailregex.com/
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    ),
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
  };
  var types = {
    integer: function integer(value) {
      return types.number(value) && parseInt(value, 10) === value;
    },
    "float": function float(value) {
      return types.number(value) && !types.integer(value);
    },
    array: function array3(value) {
      return Array.isArray(value);
    },
    regexp: function regexp(value) {
      if (value instanceof RegExp) {
        return true;
      }
      try {
        return !!new RegExp(value);
      } catch (e) {
        return false;
      }
    },
    date: function date3(value) {
      return typeof value.getTime === "function" && typeof value.getMonth === "function" && typeof value.getYear === "function";
    },
    number: function number3(value) {
      if (isNaN(value)) {
        return false;
      }
      return typeof +value === "number";
    },
    object: function object3(value) {
      return typeof value === "object" && !types.array(value);
    },
    method: function method(value) {
      return typeof value === "function";
    },
    email: function email2(value) {
      return typeof value === "string" && !!value.match(pattern.email) && value.length < 255;
    },
    url: function url2(value) {
      return typeof value === "string" && !!value.match(pattern.url);
    },
    hex: function hex(value) {
      return typeof value === "string" && !!value.match(pattern.hex);
    }
  };
  function type(rule, value, source, errors, options) {
    if (rule.required && value === void 0) {
      required(rule, value, source, errors, options);
      return;
    }
    var custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
    var ruleType = rule.type;
    if (custom.indexOf(ruleType) > -1) {
      if (!types[ruleType](value)) {
        errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
      }
    } else if (ruleType && typeof value !== rule.type) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
  }
  function range$1(rule, value, source, errors, options) {
    var len = typeof rule.len === "number";
    var min = typeof rule.min === "number";
    var max = typeof rule.max === "number";
    var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    var val = value;
    var key = null;
    var num = typeof value === "number";
    var str = typeof value === "string";
    var arr = Array.isArray(value);
    if (num) {
      key = "number";
    } else if (str) {
      key = "string";
    } else if (arr) {
      key = "array";
    }
    if (!key) {
      return false;
    }
    if (arr) {
      val = value.length;
    }
    if (str) {
      val = value.replace(spRegexp, "_").length;
    }
    if (len) {
      if (val !== rule.len) {
        errors.push(format(options.messages[key].len, rule.fullField, rule.len));
      }
    } else if (min && !max && val < rule.min) {
      errors.push(format(options.messages[key].min, rule.fullField, rule.min));
    } else if (max && !min && val > rule.max) {
      errors.push(format(options.messages[key].max, rule.fullField, rule.max));
    } else if (min && max && (val < rule.min || val > rule.max)) {
      errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
    }
  }
  var ENUM = "enum";
  function enumerable(rule, value, source, errors, options) {
    rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
    if (rule[ENUM].indexOf(value) === -1) {
      errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(", ")));
    }
  }
  function pattern$1(rule, value, source, errors, options) {
    if (rule.pattern) {
      if (rule.pattern instanceof RegExp) {
        rule.pattern.lastIndex = 0;
        if (!rule.pattern.test(value)) {
          errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
        }
      } else if (typeof rule.pattern === "string") {
        var _pattern = new RegExp(rule.pattern);
        if (!_pattern.test(value)) {
          errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
        }
      }
    }
  }
  var rules = {
    required,
    whitespace,
    type,
    range: range$1,
    "enum": enumerable,
    pattern: pattern$1
  };
  function string$1(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options, "string");
      if (!isEmptyValue(value, "string")) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
        rules.pattern(rule, value, source, errors, options);
        if (rule.whitespace === true) {
          rules.whitespace(rule, value, source, errors, options);
        }
      }
    }
    callback(errors);
  }
  function method2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function number2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (value === "") {
        value = void 0;
      }
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function _boolean(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function regexp2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (!isEmptyValue(value)) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function integer2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function floatFn(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function array2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value, "array") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options, "array");
      if (!isEmptyValue(value, "array")) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function object2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  var ENUM$1 = "enum";
  function enumerable$1(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules[ENUM$1](rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function pattern$2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (!isEmptyValue(value, "string")) {
        rules.pattern(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function date2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (!isEmptyValue(value)) {
        var dateObject;
        if (typeof value === "number") {
          dateObject = new Date(value);
        } else {
          dateObject = value;
        }
        rules.type(rule, dateObject, source, errors, options);
        if (dateObject) {
          rules.range(rule, dateObject.getTime(), source, errors, options);
        }
      }
    }
    callback(errors);
  }
  function required$1(rule, value, callback, source, options) {
    var errors = [];
    var type2 = Array.isArray(value) ? "array" : typeof value;
    rules.required(rule, value, source, errors, options, type2);
    callback(errors);
  }
  function type$1(rule, value, callback, source, options) {
    var ruleType = rule.type;
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value, ruleType) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options, ruleType);
      if (!isEmptyValue(value, ruleType)) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function any(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
    }
    callback(errors);
  }
  var validators = {
    string: string$1,
    method: method2,
    number: number2,
    "boolean": _boolean,
    regexp: regexp2,
    integer: integer2,
    "float": floatFn,
    array: array2,
    object: object2,
    "enum": enumerable$1,
    pattern: pattern$2,
    date: date2,
    url: type$1,
    hex: type$1,
    email: type$1,
    required: required$1,
    any
  };
  function newMessages() {
    return {
      "default": "Validation error on field %s",
      required: "%s is required",
      "enum": "%s must be one of %s",
      whitespace: "%s cannot be empty",
      date: {
        format: "%s date %s is invalid for format %s",
        parse: "%s date could not be parsed, %s is invalid ",
        invalid: "%s date %s is invalid"
      },
      types: {
        string: "%s is not a %s",
        method: "%s is not a %s (function)",
        array: "%s is not an %s",
        object: "%s is not an %s",
        number: "%s is not a %s",
        date: "%s is not a %s",
        "boolean": "%s is not a %s",
        integer: "%s is not an %s",
        "float": "%s is not a %s",
        regexp: "%s is not a valid %s",
        email: "%s is not a valid %s",
        url: "%s is not a valid %s",
        hex: "%s is not a valid %s"
      },
      string: {
        len: "%s must be exactly %s characters",
        min: "%s must be at least %s characters",
        max: "%s cannot be longer than %s characters",
        range: "%s must be between %s and %s characters"
      },
      number: {
        len: "%s must equal %s",
        min: "%s cannot be less than %s",
        max: "%s cannot be greater than %s",
        range: "%s must be between %s and %s"
      },
      array: {
        len: "%s must be exactly %s in length",
        min: "%s cannot be less than %s in length",
        max: "%s cannot be greater than %s in length",
        range: "%s must be between %s and %s in length"
      },
      pattern: {
        mismatch: "%s value %s does not match pattern %s"
      },
      clone: function clone() {
        var cloned = JSON.parse(JSON.stringify(this));
        cloned.clone = this.clone;
        return cloned;
      }
    };
  }
  var messages = newMessages();
  function Schema(descriptor) {
    this.rules = null;
    this._messages = messages;
    this.define(descriptor);
  }
  Schema.prototype = {
    messages: function messages2(_messages) {
      if (_messages) {
        this._messages = deepMerge$1(newMessages(), _messages);
      }
      return this._messages;
    },
    define: function define(rules2) {
      if (!rules2) {
        throw new Error("Cannot configure a schema with no rules");
      }
      if (typeof rules2 !== "object" || Array.isArray(rules2)) {
        throw new Error("Rules must be an object");
      }
      this.rules = {};
      var z;
      var item;
      for (z in rules2) {
        if (rules2.hasOwnProperty(z)) {
          item = rules2[z];
          this.rules[z] = Array.isArray(item) ? item : [item];
        }
      }
    },
    validate: function validate(source_, o, oc) {
      var _this = this;
      if (o === void 0) {
        o = {};
      }
      if (oc === void 0) {
        oc = function oc2() {
        };
      }
      var source = source_;
      var options = o;
      var callback = oc;
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      if (!this.rules || Object.keys(this.rules).length === 0) {
        if (callback) {
          callback();
        }
        return Promise.resolve();
      }
      function complete(results) {
        var i;
        var errors = [];
        var fields = {};
        function add(e) {
          if (Array.isArray(e)) {
            var _errors;
            errors = (_errors = errors).concat.apply(_errors, e);
          } else {
            errors.push(e);
          }
        }
        for (i = 0; i < results.length; i++) {
          add(results[i]);
        }
        if (!errors.length) {
          errors = null;
          fields = null;
        } else {
          fields = convertFieldsError(errors);
        }
        callback(errors, fields);
      }
      if (options.messages) {
        var messages$1 = this.messages();
        if (messages$1 === messages) {
          messages$1 = newMessages();
        }
        deepMerge$1(messages$1, options.messages);
        options.messages = messages$1;
      } else {
        options.messages = this.messages();
      }
      var arr;
      var value;
      var series = {};
      var keys = options.keys || Object.keys(this.rules);
      keys.forEach(function(z) {
        arr = _this.rules[z];
        value = source[z];
        arr.forEach(function(r) {
          var rule = r;
          if (typeof rule.transform === "function") {
            if (source === source_) {
              source = _extends({}, source);
            }
            value = source[z] = rule.transform(value);
          }
          if (typeof rule === "function") {
            rule = {
              validator: rule
            };
          } else {
            rule = _extends({}, rule);
          }
          rule.validator = _this.getValidationMethod(rule);
          rule.field = z;
          rule.fullField = rule.fullField || z;
          rule.type = _this.getType(rule);
          if (!rule.validator) {
            return;
          }
          series[z] = series[z] || [];
          series[z].push({
            rule,
            value,
            source,
            field: z
          });
        });
      });
      var errorFields = {};
      return asyncMap(series, options, function(data, doIt) {
        var rule = data.rule;
        var deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
        deep = deep && (rule.required || !rule.required && data.value);
        rule.field = data.field;
        function addFullfield(key, schema) {
          return _extends({}, schema, {
            fullField: rule.fullField + "." + key
          });
        }
        function cb(e) {
          if (e === void 0) {
            e = [];
          }
          var errors = e;
          if (!Array.isArray(errors)) {
            errors = [errors];
          }
          if (!options.suppressWarning && errors.length) {
            Schema.warning("async-validator:", errors);
          }
          if (errors.length && rule.message) {
            errors = [].concat(rule.message);
          }
          errors = errors.map(complementError(rule));
          if (options.first && errors.length) {
            errorFields[rule.field] = 1;
            return doIt(errors);
          }
          if (!deep) {
            doIt(errors);
          } else {
            if (rule.required && !data.value) {
              if (rule.message) {
                errors = [].concat(rule.message).map(complementError(rule));
              } else if (options.error) {
                errors = [options.error(rule, format(options.messages.required, rule.field))];
              } else {
                errors = [];
              }
              return doIt(errors);
            }
            var fieldsSchema = {};
            if (rule.defaultField) {
              for (var k in data.value) {
                if (data.value.hasOwnProperty(k)) {
                  fieldsSchema[k] = rule.defaultField;
                }
              }
            }
            fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);
            for (var f in fieldsSchema) {
              if (fieldsSchema.hasOwnProperty(f)) {
                var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
                fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
              }
            }
            var schema = new Schema(fieldsSchema);
            schema.messages(options.messages);
            if (data.rule.options) {
              data.rule.options.messages = options.messages;
              data.rule.options.error = options.error;
            }
            schema.validate(data.value, data.rule.options || options, function(errs) {
              var finalErrors = [];
              if (errors && errors.length) {
                finalErrors.push.apply(finalErrors, errors);
              }
              if (errs && errs.length) {
                finalErrors.push.apply(finalErrors, errs);
              }
              doIt(finalErrors.length ? finalErrors : null);
            });
          }
        }
        var res;
        if (rule.asyncValidator) {
          res = rule.asyncValidator(rule, data.value, cb, data.source, options);
        } else if (rule.validator) {
          res = rule.validator(rule, data.value, cb, data.source, options);
          if (res === true) {
            cb();
          } else if (res === false) {
            cb(rule.message || rule.field + " fails");
          } else if (res instanceof Array) {
            cb(res);
          } else if (res instanceof Error) {
            cb(res.message);
          }
        }
        if (res && res.then) {
          res.then(function() {
            return cb();
          }, function(e) {
            return cb(e);
          });
        }
      }, function(results) {
        complete(results);
      });
    },
    getType: function getType(rule) {
      if (rule.type === void 0 && rule.pattern instanceof RegExp) {
        rule.type = "pattern";
      }
      if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
        throw new Error(format("Unknown rule type %s", rule.type));
      }
      return rule.type || "string";
    },
    getValidationMethod: function getValidationMethod(rule) {
      if (typeof rule.validator === "function") {
        return rule.validator;
      }
      var keys = Object.keys(rule);
      var messageIndex = keys.indexOf("message");
      if (messageIndex !== -1) {
        keys.splice(messageIndex, 1);
      }
      if (keys.length === 1 && keys[0] === "required") {
        return validators.required;
      }
      return validators[this.getType(rule)] || false;
    }
  };
  Schema.register = function register(type2, validator) {
    if (typeof validator !== "function") {
      throw new Error("Cannot register a validator by type, validator is not a function");
    }
    validators[type2] = validator;
  };
  Schema.warning = warning;
  Schema.messages = messages;
  Schema.warning = function() {
  };
  const _sfc_main$k = {
    name: "u-form-item",
    emits: ["click", "labelClick", "rightClick", "leftClick"],
    mixins: [Emitter],
    inject: {
      uForm: {
        default() {
          return null;
        }
      }
    },
    props: {
      // input的label提示语
      label: {
        type: String,
        default: ""
      },
      // 绑定的值
      prop: {
        type: String,
        default: ""
      },
      // 是否显示表单域的下划线边框
      borderBottom: {
        type: [String, Boolean],
        default: ""
      },
      // label的位置，left-左边，top-上边
      labelPosition: {
        type: String,
        default: ""
      },
      // label的宽度，单位rpx
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // lable的样式，对象形式
      labelStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // lable字体的对齐方式
      labelAlign: {
        type: String,
        default: ""
      },
      // 右侧图标
      rightIcon: {
        type: String,
        default: ""
      },
      // 左侧图标
      leftIcon: {
        type: String,
        default: ""
      },
      // 左侧图标的样式
      leftIconStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 左侧图标的样式
      rightIconStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置
      required: {
        type: Boolean,
        default: false
      },
      inputAlign: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        initialValue: "",
        // 存储的默认值
        // isRequired: false, // 是否必填，由于人性化考虑，必填"*"号通过props的required配置，不再通过rules的规则自动生成
        validateState: "",
        // 是否校验成功
        validateMessage: "",
        // 校验失败的提示语
        // 有错误时的提示方式，message-提示信息，border-如果input设置了边框，变成呈红色，
        errorType: ["message"],
        fieldValue: "",
        // 获取当前子组件input的输入的值
        // 父组件的参数，在computed计算中，无法得知this.parent发生变化，故将父组件的参数值，放到data中
        parentData: {
          borderBottom: true,
          labelWidth: 90,
          labelPosition: "left",
          labelStyle: {},
          labelAlign: "left",
          inputAlign: "left"
        }
      };
    },
    watch: {
      validateState(val) {
        this.broadcastInputError();
      },
      // 监听u-form组件的errorType的变化
      "uForm.errorType"(val) {
        this.errorType = val;
        this.broadcastInputError();
      }
    },
    computed: {
      // 计算后的label宽度，由于需要多个判断，故放到computed中
      uLabelWidth() {
        return this.elLabelPosition == "left" ? this.label === "true" || this.label === "" ? "auto" : this.$u.addUnit(this.elLabelWidth) : "100%";
      },
      showError() {
        return (type2) => {
          if (this.errorType.indexOf("none") >= 0)
            return false;
          else if (this.errorType.indexOf(type2) >= 0)
            return true;
          else
            return false;
        };
      },
      // label的宽度
      elLabelWidth() {
        return this.labelWidth != 0 || this.labelWidth != "" ? this.labelWidth : this.parentData.labelWidth ? this.parentData.labelWidth : 90;
      },
      // label的样式
      elLabelStyle() {
        return Object.keys(this.labelStyle).length ? this.labelStyle : this.parentData.labelStyle ? this.parentData.labelStyle : {};
      },
      // label的位置，左侧或者上方
      elLabelPosition() {
        return this.labelPosition ? this.labelPosition : this.parentData.labelPosition ? this.parentData.labelPosition : "left";
      },
      // label的对齐方式
      elLabelAlign() {
        return this.labelAlign ? this.labelAlign : this.parentData.labelAlign ? this.parentData.labelAlign : "left";
      },
      // label的下划线
      elBorderBottom() {
        return this.borderBottom !== "" ? this.borderBottom : typeof this.parentData.borderBottom === "boolean" ? this.parentData.borderBottom : true;
      },
      elInputAlign() {
        return this.inputAlign ? this.inputAlign : this.parentData.inputAlign ? this.parentData.inputAlign : "left";
      }
    },
    methods: {
      // 点击事件
      onClick() {
        this.$emit("click");
      },
      // label点击事件
      onLabelClick() {
        this.$emit("labelClick");
      },
      // 右侧图标点击事件
      onRightClick() {
        this.$emit("rightClick");
      },
      // 左侧图标点击事件
      onLeftClick() {
        this.$emit("leftClick");
      },
      broadcastInputError() {
        this.broadcast("u-input", "onFormItemError", this.validateState === "error" && this.showError("border"));
      },
      // 判断是否需要required校验
      setRules() {
        let that = this;
        uni.$on("onFieldBlur", that.onFieldBlur);
        uni.$on("onFieldChange", that.onFieldChange);
      },
      // 从u-form的rules属性中，取出当前u-form-item的校验规则
      getRules() {
        let rules2 = this.parent.rules;
        rules2 = rules2 ? rules2[this.prop] : [];
        return [].concat(rules2 || []);
      },
      // blur事件时进行表单校验
      onFieldBlur() {
        this.validation("blur");
      },
      // change事件进行表单校验
      onFieldChange() {
        this.validation("change");
      },
      // 过滤出符合要求的rule规则
      getFilteredRule(triggerType = "") {
        let rules2 = this.getRules();
        if (!triggerType)
          return rules2;
        return rules2.filter((res) => res.trigger && res.trigger.indexOf(triggerType) !== -1);
      },
      getData(dataObj, name, defaultValue) {
        let newDataObj;
        if (dataObj) {
          newDataObj = JSON.parse(JSON.stringify(dataObj));
          let k = "", d = ".", l = "[", r = "]";
          name = name.replace(/\s+/g, k) + d;
          let tstr = k;
          for (let i = 0; i < name.length; i++) {
            let theChar = name.charAt(i);
            if (theChar != d && theChar != l && theChar != r) {
              tstr += theChar;
            } else if (newDataObj) {
              if (tstr != k)
                newDataObj = newDataObj[tstr];
              tstr = k;
            }
          }
        }
        if (typeof newDataObj === "undefined" && typeof defaultValue !== "undefined")
          newDataObj = defaultValue;
        return newDataObj;
      },
      setData(dataObj, name, value) {
        let dataValue;
        if (typeof value === "object") {
          dataValue = JSON.parse(JSON.stringify(value));
        } else {
          dataValue = value;
        }
        let regExp2 = new RegExp("([\\w$]+)|\\[(:\\d)\\]", "g");
        const patten = name.match(regExp2);
        for (let i = 0; i < patten.length - 1; i++) {
          let keyName = patten[i];
          if (typeof dataObj[keyName] !== "object")
            dataObj[keyName] = {};
          dataObj = dataObj[keyName];
        }
        dataObj[patten[patten.length - 1]] = dataValue;
      },
      // 校验数据
      validation(trigger, callback = () => {
      }) {
        if (!this.parent || !this.parent.model) {
          return callback("");
        }
        this.fieldValue = this.getData(this.parent.model, this.prop);
        let rules2 = this.getFilteredRule(trigger);
        if (!rules2 || rules2.length === 0) {
          return callback("");
        }
        this.validateState = "validating";
        let validator = new Schema({
          [this.prop]: rules2
        });
        validator.validate({
          [this.prop]: this.fieldValue
        }, {
          firstFields: true
        }, (errors, fields) => {
          this.validateState = !errors ? "success" : "error";
          this.validateMessage = errors ? errors[0].message : "";
          let field = errors ? errors[0].field : "";
          callback(this.validateMessage, {
            state: this.validateState,
            key: field,
            msg: this.validateMessage
          });
        });
      },
      // 清空当前的u-form-item
      resetField() {
        this.setData(this.parent.model, this.prop, this.initialValue);
        this.validateState = "success";
      }
    },
    // 组件创建完成时，将当前实例保存到u-form中
    mounted() {
      this.parent = this.$u.$parent.call(this, "u-form");
      if (this.parent) {
        Object.keys(this.parentData).map((key) => {
          this.parentData[key] = this.parent[key];
        });
        if (this.prop) {
          this.parent.fields.push(this);
          this.errorType = this.parent.errorType;
          this.initialValue = this.fieldValue;
          this.$nextTick(() => {
            this.setRules();
          });
        }
      }
    },
    beforeUnmount() {
      if (this.parent && this.prop) {
        this.parent.fields.map((item, index) => {
          if (item === this)
            this.parent.fields.splice(index, 1);
        });
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-form-item", { "u-border-bottom": $options.elBorderBottom, "u-form-item__border-bottom--error": $data.validateState === "error" && $options.showError("border-bottom") }]),
        onClick: _cache[3] || (_cache[3] = (...args) => $options.onClick && $options.onClick(...args))
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "u-form-item__body",
            style: vue.normalizeStyle({
              flexDirection: $options.elLabelPosition == "left" ? "row" : "column"
            })
          },
          [
            vue.createCommentVNode(' 微信小程序中，将一个参数设置空字符串，结果会变成字符串"true" '),
            vue.createElementVNode(
              "view",
              {
                class: "u-form-item--left",
                style: vue.normalizeStyle({
                  width: $options.uLabelWidth,
                  flex: `0 0 ${$options.uLabelWidth}`,
                  marginBottom: $options.elLabelPosition == "left" ? 0 : "10rpx"
                })
              },
              [
                vue.createCommentVNode(" 为了块对齐 "),
                $props.required || $props.leftIcon || $props.label ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "u-form-item--left__content"
                }, [
                  vue.createCommentVNode(" nvue不支持伪元素before "),
                  $props.required ? (vue.openBlock(), vue.createElementBlock("text", {
                    key: 0,
                    class: "u-form-item--left__content--required"
                  }, "*")) : vue.createCommentVNode("v-if", true),
                  $props.leftIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "u-form-item--left__content__icon",
                    onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.onLeftClick && $options.onLeftClick(...args), ["stop"]))
                  }, [
                    vue.createVNode(_component_u_icon, {
                      name: $props.leftIcon,
                      "custom-style": $props.leftIconStyle
                    }, null, 8, ["name", "custom-style"])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode(
                    "view",
                    {
                      class: "u-form-item--left__content__label",
                      style: vue.normalizeStyle([$options.elLabelStyle, {
                        "justify-content": $options.elLabelAlign == "left" ? "flex-start" : $options.elLabelAlign == "center" ? "center" : "flex-end"
                      }]),
                      onClick: _cache[1] || (_cache[1] = (...args) => $options.onLabelClick && $options.onLabelClick(...args))
                    },
                    vue.toDisplayString($props.label),
                    5
                    /* TEXT, STYLE */
                  )
                ])) : vue.createCommentVNode("v-if", true)
              ],
              4
              /* STYLE */
            ),
            vue.createElementVNode("view", { class: "u-form-item--right u-flex" }, [
              vue.createElementVNode("view", { class: "u-form-item--right__content" }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "u-form-item--right__content__slot",
                    style: vue.normalizeStyle($options.elLabelPosition == "left" && $options.elInputAlign == "right" ? "text-align:right;display: inline-block;line-height:initial;" : "")
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  4
                  /* STYLE */
                ),
                _ctx.$slots.right || $props.rightIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "u-form-item--right__content__icon u-flex",
                  onClick: _cache[2] || (_cache[2] = vue.withModifiers((...args) => $options.onRightClick && $options.onRightClick(...args), ["stop"]))
                }, [
                  $props.rightIcon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                    key: 0,
                    "custom-style": $props.rightIconStyle,
                    name: $props.rightIcon
                  }, null, 8, ["custom-style", "name"])) : vue.createCommentVNode("v-if", true),
                  vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
                ])) : vue.createCommentVNode("v-if", true)
              ])
            ])
          ],
          4
          /* STYLE */
        ),
        $data.validateState === "error" && $options.showError("message") ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: "u-form-item__message",
            style: vue.normalizeStyle({
              paddingLeft: $options.elLabelPosition == "left" ? _ctx.$u.addUnit($options.elLabelWidth) : "0",
              textAlign: $options.elInputAlign == "right" ? "right" : "left"
            })
          },
          vue.toDisplayString($data.validateMessage),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-361fbc0d"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-form-item/u-form-item.vue"]]);
  const _sfc_main$j = {
    name: "u-button",
    emits: ["click", "getphonenumber", "getuserinfo", "error", "opensetting", "launchapp", "chooseavatar"],
    props: {
      // 是否细边框
      hairLine: {
        type: Boolean,
        default: true
      },
      // 按钮的预置样式，default，primary，error，warning，success
      type: {
        type: String,
        default: "default"
      },
      // 按钮尺寸，default，medium，mini
      size: {
        type: String,
        default: "default"
      },
      // 按钮形状，circle（两边为半圆），square（带圆角）
      shape: {
        type: String,
        default: "square"
      },
      // 按钮是否镂空
      plain: {
        type: Boolean,
        default: false
      },
      // 是否禁止状态
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否加载中
      loading: {
        type: Boolean,
        default: false
      },
      // 开放能力，具体请看uniapp稳定关于button组件部分说明
      // https://uniapp.dcloud.io/component/button
      openType: {
        type: String,
        default: ""
      },
      // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
      // 取值为submit（提交表单），reset（重置表单）
      formType: {
        type: String,
        default: ""
      },
      // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
      // 只微信小程序、QQ小程序有效
      appParameter: {
        type: String,
        default: ""
      },
      // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
      hoverStopPropagation: {
        type: Boolean,
        default: false
      },
      // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
      lang: {
        type: String,
        default: "en"
      },
      // 会话来源，open-type="contact"时有效。只微信小程序有效
      sessionFrom: {
        type: String,
        default: ""
      },
      // 会话内消息卡片标题，open-type="contact"时有效
      // 默认当前标题，只微信小程序有效
      sendMessageTitle: {
        type: String,
        default: ""
      },
      // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
      // 默认当前分享路径，只微信小程序有效
      sendMessagePath: {
        type: String,
        default: ""
      },
      // 会话内消息卡片图片，open-type="contact"时有效
      // 默认当前页面截图，只微信小程序有效
      sendMessageImg: {
        type: String,
        default: ""
      },
      // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
      // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
      showMessageCard: {
        type: Boolean,
        default: false
      },
      // 手指按（触摸）按钮时按钮时的背景颜色
      hoverBgColor: {
        type: String,
        default: ""
      },
      // 水波纹的背景颜色
      rippleBgColor: {
        type: String,
        default: ""
      },
      // 是否开启水波纹效果
      ripple: {
        type: Boolean,
        default: false
      },
      // 按下的类名
      hoverClass: {
        type: String,
        default: ""
      },
      // 自定义样式，对象形式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
      dataName: {
        type: String,
        default: ""
      },
      // 节流，一定时间内只能触发一次
      throttleTime: {
        type: [String, Number],
        default: 500
      },
      // 按住后多久出现点击态，单位毫秒
      hoverStartTime: {
        type: [String, Number],
        default: 20
      },
      // 手指松开后点击态保留时间，单位毫秒
      hoverStayTime: {
        type: [String, Number],
        default: 150
      },
      timerId: {
        type: [String, Number]
      }
    },
    computed: {
      // 当没有传bgColor变量时，按钮按下去的颜色类名
      getHoverClass() {
        if (this.loading || this.disabled || this.ripple || this.hoverClass)
          return "";
        let hoverClass = "";
        hoverClass = this.plain ? "u-" + this.type + "-plain-hover" : "u-" + this.type + "-hover";
        return hoverClass;
      },
      // 在'primary', 'success', 'error', 'warning'类型下，不显示边框，否则会造成四角有毛刺现象
      showHairLineBorder() {
        if (["primary", "success", "error", "warning"].indexOf(this.type) >= 0 && !this.plain) {
          return "";
        } else {
          return "u-hairline-border";
        }
      }
    },
    data() {
      let btnTimerId = this.timerId || "button_" + Math.floor(Math.random() * 1e8 + 0);
      return {
        btnTimerId,
        rippleTop: 0,
        // 水波纹的起点Y坐标到按钮上边界的距离
        rippleLeft: 0,
        // 水波纹起点X坐标到按钮左边界的距离
        fields: {},
        // 波纹按钮节点信息
        waveActive: false
        // 激活水波纹
      };
    },
    methods: {
      // 按钮点击
      click(e) {
        this.$u.throttle(() => {
          if (this.loading === true || this.disabled === true)
            return;
          if (this.ripple) {
            this.waveActive = false;
            this.$nextTick(function() {
              this.getWaveQuery(e);
            });
          }
          this.$emit("click", e);
        }, this.throttleTime, true, this.btnTimerId);
      },
      // 查询按钮的节点信息
      getWaveQuery(e) {
        this.getElQuery().then((res) => {
          let data = res[0];
          if (!data.width || !data.width)
            return;
          data.targetWidth = data.height > data.width ? data.height : data.width;
          if (!data.targetWidth)
            return;
          this.fields = data;
          let touchesX = "", touchesY = "";
          touchesX = e.touches[0].clientX;
          touchesY = e.touches[0].clientY;
          this.rippleTop = touchesY - data.top - data.targetWidth / 2;
          this.rippleLeft = touchesX - data.left - data.targetWidth / 2;
          this.$nextTick(() => {
            this.waveActive = true;
          });
        });
      },
      // 获取节点信息
      getElQuery() {
        return new Promise((resolve) => {
          let queryInfo = "";
          queryInfo = uni.createSelectorQuery().in(this);
          queryInfo.select(".u-btn").boundingClientRect();
          queryInfo.exec((data) => {
            resolve(data);
          });
        });
      },
      // 下面为对接uniapp官方按钮开放能力事件回调的对接
      getphonenumber(res) {
        this.$emit("getphonenumber", res);
      },
      getuserinfo(res) {
        this.$emit("getuserinfo", res);
      },
      error(res) {
        this.$emit("error", res);
      },
      opensetting(res) {
        this.$emit("opensetting", res);
      },
      launchapp(res) {
        this.$emit("launchapp", res);
      },
      chooseavatar(res) {
        this.$emit("chooseavatar", res);
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("button", {
      id: "u-wave-btn",
      class: vue.normalizeClass(["u-btn u-line-1 u-fix-ios-appearance", [
        "u-size-" + $props.size,
        $props.plain ? "u-btn--" + $props.type + "--plain" : "",
        $props.loading ? "u-loading" : "",
        $props.shape == "circle" ? "u-round-circle" : "",
        $props.hairLine ? $options.showHairLineBorder : "u-btn--bold-border",
        "u-btn--" + $props.type,
        $props.disabled ? `u-btn--${$props.type}--disabled` : ""
      ]]),
      "hover-start-time": Number($props.hoverStartTime),
      "hover-stay-time": Number($props.hoverStayTime),
      disabled: $props.disabled,
      "form-type": $props.formType,
      "open-type": $props.openType,
      "app-parameter": $props.appParameter,
      "hover-stop-propagation": $props.hoverStopPropagation,
      "send-message-title": $props.sendMessageTitle,
      "send-message-path": "sendMessagePath",
      lang: $props.lang,
      "data-name": $props.dataName,
      "session-from": $props.sessionFrom,
      "send-message-img": $props.sendMessageImg,
      "show-message-card": $props.showMessageCard,
      onGetphonenumber: _cache[0] || (_cache[0] = (...args) => $options.getphonenumber && $options.getphonenumber(...args)),
      onGetuserinfo: _cache[1] || (_cache[1] = (...args) => $options.getuserinfo && $options.getuserinfo(...args)),
      onError: _cache[2] || (_cache[2] = (...args) => $options.error && $options.error(...args)),
      onOpensetting: _cache[3] || (_cache[3] = (...args) => $options.opensetting && $options.opensetting(...args)),
      onLaunchapp: _cache[4] || (_cache[4] = (...args) => $options.launchapp && $options.launchapp(...args)),
      onChooseavatar: _cache[5] || (_cache[5] = (...args) => $options.chooseavatar && $options.chooseavatar(...args)),
      style: vue.normalizeStyle([$props.customStyle, {
        overflow: $props.ripple ? "hidden" : "visible"
      }]),
      onClick: _cache[6] || (_cache[6] = vue.withModifiers(($event) => $options.click($event), ["stop"])),
      "hover-class": $options.getHoverClass,
      loading: $props.loading
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.ripple ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["u-wave-ripple", [$data.waveActive ? "u-wave-active" : ""]]),
          style: vue.normalizeStyle({
            top: $data.rippleTop + "px",
            left: $data.rippleLeft + "px",
            width: $data.fields.targetWidth + "px",
            height: $data.fields.targetWidth + "px",
            "background-color": $props.rippleBgColor || "rgba(0, 0, 0, 0.15)"
          })
        },
        null,
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ], 46, ["hover-start-time", "hover-stay-time", "disabled", "form-type", "open-type", "app-parameter", "hover-stop-propagation", "send-message-title", "lang", "data-name", "session-from", "send-message-img", "show-message-card", "hover-class", "loading"]);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-097def2b"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-button/u-button.vue"]]);
  const _sfc_main$i = {
    name: "u-form",
    props: {
      // 当前form的需要验证字段的集合
      model: {
        type: Object,
        default() {
          return {};
        }
      },
      // 验证规则
      // rules: {
      // 	type: [Object, Function, Array],
      // 	default() {
      // 		return {};
      // 	}
      // },
      // 有错误时的提示方式，message-提示信息，border-如果input设置了边框，变成呈红色，
      // border-bottom-下边框呈现红色，none-无提示
      errorType: {
        type: Array,
        default() {
          return ["message", "toast"];
        }
      },
      // 是否显示表单域的下划线边框
      borderBottom: {
        type: Boolean,
        default: true
      },
      // label的位置，left-左边，top-上边
      labelPosition: {
        type: String,
        default: "left"
      },
      // label的宽度，单位rpx
      labelWidth: {
        type: [String, Number],
        default: 90
      },
      // lable字体的对齐方式
      labelAlign: {
        type: String,
        default: "left"
      },
      // lable的样式，对象形式
      labelStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 表单内所有input的inputAlign属性的值
      inputAlign: {
        type: String,
        default: "left"
      },
      // 表单内所有input的clearable属性的值
      clearable: {
        type: Boolean,
        default: true
      }
    },
    provide() {
      return {
        uForm: this
      };
    },
    data() {
      return {
        rules: {}
      };
    },
    created() {
      this.fields = [];
    },
    methods: {
      setRules(rules2) {
        this.rules = rules2;
      },
      // 清空所有u-form-item组件的内容，本质上是调用了u-form-item组件中的resetField()方法
      resetFields() {
        this.fields.map((field) => {
          field.resetField();
        });
      },
      // 校验全部数据
      validate(callback) {
        return new Promise((resolve) => {
          let valid = true;
          let count = 0;
          let errorArr = [];
          let errorObjArr = [];
          this.fields.map((field) => {
            field.validation("", (errorMsg, errObj) => {
              if (errorMsg) {
                valid = false;
                errorArr.push(errorMsg);
                errorObjArr.push(errObj);
              }
              if (++count === this.fields.length) {
                resolve(valid, errorObjArr[0]);
                if (this.errorType.indexOf("none") === -1 && this.errorType.indexOf("toast") >= 0 && errorArr.length) {
                  this.$u.toast(errorArr[0]);
                }
                if (typeof callback == "function")
                  callback(valid, errorObjArr[0]);
              }
            });
          });
        });
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-form" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]);
  }
  const __easycom_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-000ccc72"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-form/u-form.vue"]]);
  const _sfc_main$h = {
    name: "u-loading",
    props: {
      // 动画的类型
      mode: {
        type: String,
        default: "circle"
      },
      // 动画的颜色
      color: {
        type: String,
        default: "#c7c7c7"
      },
      // 加载图标的大小，单位rpx
      size: {
        type: [String, Number],
        default: "34"
      },
      // 是否显示动画
      show: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      // 加载中圆圈动画的样式
      cricleStyle() {
        let style = {};
        style.width = this.size + "rpx";
        style.height = this.size + "rpx";
        if (this.mode == "circle")
          style.borderColor = `#e4e4e4 #e4e4e4 #e4e4e4 ${this.color ? this.color : "#c7c7c7"}`;
        return style;
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["u-loading", $props.mode == "circle" ? "u-loading-circle" : "u-loading-flower"]),
        style: vue.normalizeStyle([$options.cricleStyle])
      },
      null,
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-32db0ed8"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-loading/u-loading.vue"]]);
  const _sfc_main$g = {
    name: "u-mask",
    emits: ["click"],
    props: {
      // 是否显示遮罩
      show: {
        type: Boolean,
        default: false
      },
      // 层级z-index
      zIndex: {
        type: [Number, String],
        default: ""
      },
      // 用户自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 遮罩的动画样式， 是否使用使用zoom进行scale进行缩放
      zoom: {
        type: Boolean,
        default: true
      },
      // 遮罩的过渡时间，单位为ms
      duration: {
        type: [Number, String],
        default: 300
      },
      // 是否可以通过点击遮罩进行关闭
      maskClickAble: {
        type: Boolean,
        default: true
      },
      // 遮罩的模糊度
      blur: {
        type: [Number, String],
        default: 0
      }
    },
    data() {
      return {
        zoomStyle: {
          transform: ""
        },
        scale: "scale(1.2, 1.2)"
      };
    },
    watch: {
      show(n) {
        if (n && this.zoom) {
          this.zoomStyle.transform = "scale(1, 1)";
        } else if (!n && this.zoom) {
          this.zoomStyle.transform = this.scale;
        }
      }
    },
    computed: {
      maskStyle() {
        let style = {};
        style.backgroundColor = "rgba(0, 0, 0, 0.6)";
        if (this.show)
          style.zIndex = this.zIndex ? this.zIndex : this.$u.zIndex.mask;
        else
          style.zIndex = -1;
        style.transition = `all ${this.duration / 1e3}s ease-in-out`;
        if (Object.keys(this.customStyle).length)
          style = {
            ...style,
            ...this.customStyle
          };
        return style;
      },
      filterStyle() {
        let { blur } = this;
        let style = {};
        if (blur) {
          style.backdropFilter = `blur(${blur}rpx)`;
        }
        return style;
      }
    },
    methods: {
      click() {
        if (!this.maskClickAble)
          return;
        this.$emit("click");
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-mask", {
          "u-mask-zoom": $props.zoom,
          "u-mask-show": $props.show
        }]),
        "hover-stop-propagation": "",
        style: vue.normalizeStyle([$options.maskStyle, $data.zoomStyle, $options.filterStyle]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.click && $options.click(...args)),
        onTouchmove: vue.withModifiers(() => {
        }, ["stop", "prevent"])
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    );
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-b3b508a8"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-mask/u-mask.vue"]]);
  const _sfc_main$f = {
    name: "u-popup",
    emits: ["update:modelValue", "input", "open", "close"],
    props: {
      value: {
        type: Boolean,
        default: false
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      /**
       * 显示状态
       */
      show: {
        type: Boolean,
        default: false
      },
      /**
       * 弹出方向，left|right|top|bottom|center
       */
      mode: {
        type: String,
        default: "left"
      },
      /**
       * 是否显示遮罩
       */
      mask: {
        type: Boolean,
        default: true
      },
      // 抽屉的宽度(mode=left|right)，或者高度(mode=top|bottom)，单位rpx，或者"auto"
      // 或者百分比"50%"，表示由内容撑开高度或者宽度
      length: {
        type: [Number, String],
        default: "auto"
      },
      // 是否开启缩放动画，只在mode=center时有效
      zoom: {
        type: Boolean,
        default: true
      },
      // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
      safeAreaInsetBottom: {
        type: Boolean,
        default: false
      },
      // 是否可以通过点击遮罩进行关闭
      maskCloseAble: {
        type: Boolean,
        default: true
      },
      // 用户自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 此为内部参数，不在文档对外使用，为了解决Picker和keyboard等融合了弹窗的组件
      // 对v-model双向绑定多层调用造成报错不能修改props值的问题
      popup: {
        type: Boolean,
        default: true
      },
      // 显示显示弹窗的圆角，单位rpx
      borderRadius: {
        type: [Number, String],
        default: 0
      },
      zIndex: {
        type: [Number, String],
        default: ""
      },
      // 是否显示关闭图标
      closeable: {
        type: Boolean,
        default: false
      },
      // 关闭图标的名称，只能uView的内置图标
      closeIcon: {
        type: String,
        default: "close"
      },
      // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
      closeIconPos: {
        type: String,
        default: "top-right"
      },
      // 关闭图标的颜色
      closeIconColor: {
        type: String,
        default: "#909399"
      },
      // 关闭图标的大小，单位rpx
      closeIconSize: {
        type: [String, Number],
        default: "30"
      },
      // 宽度，只对左，右，中部弹出时起作用，单位rpx，或者"auto"
      // 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
      width: {
        type: String,
        default: ""
      },
      // 高度，只对上，下，中部弹出时起作用，单位rpx，或者"auto"
      // 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
      height: {
        type: String,
        default: ""
      },
      // 给一个负的margin-top，往上偏移，避免和键盘重合的情况，仅在mode=center时有效
      negativeTop: {
        type: [String, Number],
        default: 0
      },
      // 遮罩的样式，一般用于修改遮罩的透明度
      maskCustomStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 遮罩打开或收起的动画过渡时间，单位ms
      duration: {
        type: [String, Number],
        default: 250
      },
      // 遮罩的模糊度
      blur: {
        type: [String, Number],
        default: 0
      },
      backgroundColor: {
        type: String,
        default: "#ffffff"
      }
    },
    data() {
      return {
        visibleSync: false,
        showDrawer: false,
        timer: null,
        closeFromInner: false
        // value的值改变，是发生在内部还是外部
      };
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      // 根据mode的位置，设定其弹窗的宽度(mode = left|right)，或者高度(mode = top|bottom)
      style() {
        let style = {};
        if (this.mode == "left" || this.mode == "right") {
          style = {
            width: this.width ? this.getUnitValue(this.width) : this.getUnitValue(this.length),
            height: "100%",
            transform: `translate3D(${this.mode == "left" ? "-100%" : "100%"},0px,0px)`
          };
        } else if (this.mode == "top" || this.mode == "bottom") {
          style = {
            width: "100%",
            height: this.height ? this.getUnitValue(this.height) : this.getUnitValue(this.length),
            transform: `translate3D(0px,${this.mode == "top" ? "-100%" : "100%"},0px)`
          };
        }
        style.zIndex = this.uZindex;
        if (this.borderRadius) {
          switch (this.mode) {
            case "left":
              style.borderRadius = `0 ${this.borderRadius}rpx ${this.borderRadius}rpx 0`;
              break;
            case "top":
              style.borderRadius = `0 0 ${this.borderRadius}rpx ${this.borderRadius}rpx`;
              break;
            case "right":
              style.borderRadius = `${this.borderRadius}rpx 0 0 ${this.borderRadius}rpx`;
              break;
            case "bottom":
              style.borderRadius = `${this.borderRadius}rpx ${this.borderRadius}rpx 0 0`;
              break;
          }
          style.overflow = "hidden";
        }
        if (this.duration)
          style.transition = `all ${this.duration / 1e3}s linear`;
        return style;
      },
      // 中部弹窗的特有样式
      centerStyle() {
        let style = {};
        style.width = this.width ? this.getUnitValue(this.width) : this.getUnitValue(this.length);
        style.height = this.height ? this.getUnitValue(this.height) : "auto";
        style.zIndex = this.uZindex;
        style.marginTop = `-${this.$u.addUnit(this.negativeTop)}`;
        if (this.borderRadius) {
          style.borderRadius = `${this.borderRadius}rpx`;
          style.overflow = "hidden";
        }
        return style;
      },
      // 计算整理后的z-index值
      uZindex() {
        return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
      }
    },
    watch: {
      valueCom: {
        handler(val) {
          if (val) {
            this.open();
          } else if (!this.closeFromInner) {
            this.close();
          }
          this.closeFromInner = false;
        }
      }
    },
    mounted() {
      if (this.valueCom) {
        this.open();
      }
    },
    methods: {
      // 判断传入的值，是否带有单位，如果没有，就默认用rpx单位
      getUnitValue(val) {
        if (/(%|px|rpx|auto)$/.test(val))
          return val;
        else
          return val + "rpx";
      },
      // 遮罩被点击
      maskClick() {
        this.close();
      },
      close() {
        this.closeFromInner = true;
        this.change("showDrawer", "visibleSync", false);
      },
      // 中部弹出时，需要.u-drawer-content将居中内容，此元素会铺满屏幕，点击需要关闭弹窗
      // 让其只在mode=center时起作用
      modeCenterClose(mode) {
        if (mode != "center" || !this.maskCloseAble)
          return;
        this.close();
      },
      open() {
        this.change("visibleSync", "showDrawer", true);
      },
      // 此处的原理是，关闭时先通过动画隐藏弹窗和遮罩，再移除整个组件
      // 打开时，先渲染组件，延时一定时间再让遮罩和弹窗的动画起作用
      change(param1, param2, status) {
        if (this.popup == true) {
          this.$emit("input", status);
          this.$emit("update:modelValue", status);
        }
        this[param1] = status;
        if (status) {
          this.$nextTick(() => {
            this[param2] = status;
            this.$emit(status ? "open" : "close");
          });
        } else {
          this.timer = setTimeout(() => {
            this[param2] = status;
            this.$emit(status ? "open" : "close");
          }, this.duration);
        }
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_mask = resolveEasycom(vue.resolveDynamicComponent("u-mask"), __easycom_0$2);
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$7);
    return $data.visibleSync ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        style: vue.normalizeStyle([$props.customStyle, {
          zIndex: $options.uZindex - 1,
          "--bgcolor": $props.backgroundColor
        }]),
        class: "u-drawer",
        "hover-stop-propagation": ""
      },
      [
        vue.createVNode(_component_u_mask, {
          blur: $props.blur,
          duration: $props.duration,
          "custom-style": $props.maskCustomStyle,
          maskClickAble: $props.maskCloseAble,
          "z-index": $options.uZindex - 2,
          show: $data.showDrawer && $props.mask,
          onClick: $options.maskClick
        }, null, 8, ["blur", "duration", "custom-style", "maskClickAble", "z-index", "show", "onClick"]),
        vue.createCommentVNode(" 移除	@tap.stop.prevent "),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["u-drawer-content", [
              $props.safeAreaInsetBottom ? "safe-area-inset-bottom" : "",
              "u-drawer-" + $props.mode,
              $data.showDrawer ? "u-drawer-content-visible" : "",
              $props.zoom && $props.mode == "center" ? "u-animation-zoom" : ""
            ]]),
            onClick: _cache[3] || (_cache[3] = ($event) => $options.modeCenterClose($props.mode)),
            onTouchmove: _cache[4] || (_cache[4] = vue.withModifiers(() => {
            }, ["stop", "prevent"])),
            style: vue.normalizeStyle([$options.style])
          },
          [
            $props.mode == "center" ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: "u-mode-center-box",
                onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                }, ["stop", "prevent"])),
                onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
                }, ["stop", "prevent"])),
                style: vue.normalizeStyle([$options.centerStyle])
              },
              [
                $props.closeable ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                  key: 0,
                  onClick: $options.close,
                  class: vue.normalizeClass(["u-close", ["u-close--" + $props.closeIconPos]]),
                  name: $props.closeIcon,
                  color: $props.closeIconColor,
                  size: $props.closeIconSize
                }, null, 8, ["onClick", "class", "name", "color", "size"])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("scroll-view", {
                  class: "u-drawer__scroll-view",
                  "scroll-y": "true"
                }, [
                  vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                ])
              ],
              36
              /* STYLE, NEED_HYDRATION */
            )) : (vue.openBlock(), vue.createElementBlock("scroll-view", {
              key: 1,
              class: "u-drawer__scroll-view",
              "scroll-y": "true"
            }, [
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ])),
            vue.createElementVNode(
              "view",
              {
                onClick: _cache[2] || (_cache[2] = (...args) => $options.close && $options.close(...args)),
                class: vue.normalizeClass(["u-close", ["u-close--" + $props.closeIconPos]])
              },
              [
                $props.mode != "center" && $props.closeable ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                  key: 0,
                  name: $props.closeIcon,
                  color: $props.closeIconColor,
                  size: $props.closeIconSize
                }, null, 8, ["name", "color", "size"])) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )
          ],
          38
          /* CLASS, STYLE, NEED_HYDRATION */
        )
      ],
      4
      /* STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-c93a8fd2"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-popup/u-popup.vue"]]);
  const _sfc_main$e = {
    name: "u-modal",
    emits: ["update:modelValue", "input", "confirm", "cancel"],
    props: {
      // 是否显示Modal
      value: {
        type: Boolean,
        default: false
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      // 层级z-index
      zIndex: {
        type: [Number, String],
        default: ""
      },
      // 标题
      title: {
        type: [String],
        default: "提示"
      },
      // 弹窗宽度，可以是数值(rpx)，百分比，auto等
      width: {
        type: [Number, String],
        default: 600
      },
      // 弹窗内容
      content: {
        type: String,
        default: "内容"
      },
      // 是否显示标题
      showTitle: {
        type: Boolean,
        default: true
      },
      // 是否显示确认按钮
      showConfirmButton: {
        type: Boolean,
        default: true
      },
      // 是否显示取消按钮
      showCancelButton: {
        type: Boolean,
        default: false
      },
      // 确认文案
      confirmText: {
        type: String,
        default: "确认"
      },
      // 取消文案
      cancelText: {
        type: String,
        default: "取消"
      },
      // 确认按钮颜色
      confirmColor: {
        type: String,
        default: "#2979ff"
      },
      // 取消文字颜色
      cancelColor: {
        type: String,
        default: "#606266"
      },
      // 圆角值
      borderRadius: {
        type: [Number, String],
        default: 16
      },
      // 标题的样式
      titleStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 内容的样式
      contentStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 取消按钮的样式
      cancelStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 确定按钮的样式
      confirmStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 是否开启缩放效果
      zoom: {
        type: Boolean,
        default: true
      },
      // 是否异步关闭，只对确定按钮有效
      asyncClose: {
        type: Boolean,
        default: false
      },
      // 是否允许点击遮罩关闭modal
      maskCloseAble: {
        type: Boolean,
        default: false
      },
      // 给一个负的margin-top，往上偏移，避免和键盘重合的情况
      negativeTop: {
        type: [String, Number],
        default: 0
      },
      // 遮罩的模糊度
      blur: {
        type: [Number, String],
        default: 0
      }
    },
    data() {
      return {
        loading: false,
        // 确认按钮是否正在加载中
        popupValue: false
      };
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      cancelBtnStyle() {
        return Object.assign(
          {
            color: this.cancelColor
          },
          this.cancelStyle
        );
      },
      confirmBtnStyle() {
        return Object.assign(
          {
            color: this.confirmColor
          },
          this.confirmStyle
        );
      },
      uZIndex() {
        return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
      }
    },
    watch: {
      // 如果是异步关闭时，外部修改v-model的值为false时，重置内部的loading状态
      // 避免下次打开的时候，状态混乱
      valueCom: {
        immediate: true,
        handler(n) {
          if (n === true)
            this.loading = false;
          this.popupValue = n;
        }
      }
    },
    methods: {
      confirm() {
        if (this.asyncClose) {
          this.loading = true;
        } else {
          this.$emit("input", false);
          this.$emit("update:modelValue", false);
        }
        this.$emit("confirm");
      },
      cancel() {
        this.$emit("cancel");
        this.$emit("input", false);
        this.$emit("update:modelValue", false);
        setTimeout(() => {
          this.loading = false;
        }, 300);
      },
      // 点击遮罩关闭modal，设置v-model的值为false，否则无法第二次弹起modal
      popupClose() {
        this.$emit("input", false);
        this.$emit("update:modelValue", false);
      },
      // 清除加载中的状态
      clearLoading() {
        this.loading = false;
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_loading = resolveEasycom(vue.resolveDynamicComponent("u-loading"), __easycom_0$3);
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_u_popup, {
        blur: $props.blur,
        zoom: $props.zoom,
        mode: "center",
        popup: false,
        "z-index": $options.uZIndex,
        modelValue: $data.popupValue,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.popupValue = $event),
        length: $props.width,
        "mask-close-able": $props.maskCloseAble,
        "border-radius": $props.borderRadius,
        onClose: $options.popupClose,
        "negative-top": $props.negativeTop
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "u-model" }, [
            $props.showTitle ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: "u-model__title u-line-1",
                style: vue.normalizeStyle([$props.titleStyle])
              },
              vue.toDisplayString($props.title),
              5
              /* TEXT, STYLE */
            )) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "u-model__content" }, [
              _ctx.$slots.default || _ctx.$slots.$default ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  style: vue.normalizeStyle([$props.contentStyle])
                },
                [
                  vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                ],
                4
                /* STYLE */
              )) : (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 1,
                  class: "u-model__content__message",
                  style: vue.normalizeStyle([$props.contentStyle])
                },
                vue.toDisplayString($props.content),
                5
                /* TEXT, STYLE */
              ))
            ]),
            $props.showCancelButton || $props.showConfirmButton ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "u-model__footer u-border-top"
            }, [
              $props.showCancelButton ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  "hover-stay-time": 100,
                  "hover-class": "u-model__btn--hover",
                  class: "u-model__footer__button",
                  style: vue.normalizeStyle([$options.cancelBtnStyle]),
                  onClick: _cache[0] || (_cache[0] = (...args) => $options.cancel && $options.cancel(...args))
                },
                vue.toDisplayString($props.cancelText),
                5
                /* TEXT, STYLE */
              )) : vue.createCommentVNode("v-if", true),
              $props.showConfirmButton || _ctx.$slots["confirm-button"] ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                "hover-stay-time": 100,
                "hover-class": $props.asyncClose ? "none" : "u-model__btn--hover",
                class: "u-model__footer__button hairline-left",
                style: vue.normalizeStyle([$options.confirmBtnStyle]),
                onClick: _cache[1] || (_cache[1] = (...args) => $options.confirm && $options.confirm(...args))
              }, [
                _ctx.$slots["confirm-button"] ? vue.renderSlot(_ctx.$slots, "confirm-button", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  [
                    $data.loading ? (vue.openBlock(), vue.createBlock(_component_u_loading, {
                      key: 0,
                      mode: "circle",
                      color: $props.confirmColor
                    }, null, 8, ["color"])) : (vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      { key: 1 },
                      [
                        vue.createTextVNode(
                          vue.toDisplayString($props.confirmText),
                          1
                          /* TEXT */
                        )
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ],
                  64
                  /* STABLE_FRAGMENT */
                ))
              ], 12, ["hover-class"])) : vue.createCommentVNode("v-if", true)
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["blur", "zoom", "z-index", "modelValue", "length", "mask-close-able", "border-radius", "onClose", "negative-top"])
    ]);
  }
  const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-5708b0b9"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-modal/u-modal.vue"]]);
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  function getAugmentedNamespace(n) {
    if (n.__esModule)
      return n;
    var f = n.default;
    if (typeof f == "function") {
      var a = function a2() {
        if (this instanceof a2) {
          return Reflect.construct(f, arguments, this.constructor);
        }
        return f.apply(this, arguments);
      };
      a.prototype = f.prototype;
    } else
      a = {};
    Object.defineProperty(a, "__esModule", { value: true });
    Object.keys(n).forEach(function(k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function() {
          return n[k];
        }
      });
    });
    return a;
  }
  var md5$1 = { exports: {} };
  const __viteBrowserExternal = new Proxy({}, {
    get(_, key) {
      throw new Error(`Module "" has been externalized for browser compatibility. Cannot access ".${key}" in client code.  See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
    }
  });
  const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: __viteBrowserExternal
  }, Symbol.toStringTag, { value: "Module" }));
  const require$$1 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
  /**
   * [js-md5]{@link https://github.com/emn178/js-md5}
   *
   * @namespace md5
   * @version 0.8.3
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2014-2023
   * @license MIT
   */
  (function(module) {
    (function() {
      var INPUT_ERROR = "input is invalid type";
      var FINALIZE_ERROR = "finalize already called";
      var WINDOW = typeof window === "object";
      var root = WINDOW ? window : {};
      if (root.JS_MD5_NO_WINDOW) {
        WINDOW = false;
      }
      var WEB_WORKER = !WINDOW && typeof self === "object";
      var NODE_JS = !root.JS_MD5_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
      if (NODE_JS) {
        root = commonjsGlobal;
      } else if (WEB_WORKER) {
        root = self;
      }
      var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && true && module.exports;
      var ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
      var HEX_CHARS = "0123456789abcdef".split("");
      var EXTRA = [128, 32768, 8388608, -2147483648];
      var SHIFT = [0, 8, 16, 24];
      var OUTPUT_TYPES = ["hex", "array", "digest", "buffer", "arrayBuffer", "base64"];
      var BASE64_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
      var blocks = [], buffer8;
      if (ARRAY_BUFFER) {
        var buffer = new ArrayBuffer(68);
        buffer8 = new Uint8Array(buffer);
        blocks = new Uint32Array(buffer);
      }
      var isArray2 = Array.isArray;
      if (root.JS_MD5_NO_NODE_JS || !isArray2) {
        isArray2 = function(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
      }
      var isView = ArrayBuffer.isView;
      if (ARRAY_BUFFER && (root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !isView)) {
        isView = function(obj) {
          return typeof obj === "object" && obj.buffer && obj.buffer.constructor === ArrayBuffer;
        };
      }
      var formatMessage = function(message) {
        var type2 = typeof message;
        if (type2 === "string") {
          return [message, true];
        }
        if (type2 !== "object" || message === null) {
          throw new Error(INPUT_ERROR);
        }
        if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          return [new Uint8Array(message), false];
        }
        if (!isArray2(message) && !isView(message)) {
          throw new Error(INPUT_ERROR);
        }
        return [message, false];
      };
      var createOutputMethod = function(outputType) {
        return function(message) {
          return new Md5(true).update(message)[outputType]();
        };
      };
      var createMethod = function() {
        var method = createOutputMethod("hex");
        if (NODE_JS) {
          method = nodeWrap(method);
        }
        method.create = function() {
          return new Md5();
        };
        method.update = function(message) {
          return method.create().update(message);
        };
        for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
          var type2 = OUTPUT_TYPES[i];
          method[type2] = createOutputMethod(type2);
        }
        return method;
      };
      var nodeWrap = function(method) {
        var crypto = require$$1;
        var Buffer = require$$1.Buffer;
        var bufferFrom;
        if (Buffer.from && !root.JS_MD5_NO_BUFFER_FROM) {
          bufferFrom = Buffer.from;
        } else {
          bufferFrom = function(message) {
            return new Buffer(message);
          };
        }
        var nodeMethod = function(message) {
          if (typeof message === "string") {
            return crypto.createHash("md5").update(message, "utf8").digest("hex");
          } else {
            if (message === null || message === void 0) {
              throw new Error(INPUT_ERROR);
            } else if (message.constructor === ArrayBuffer) {
              message = new Uint8Array(message);
            }
          }
          if (isArray2(message) || isView(message) || message.constructor === Buffer) {
            return crypto.createHash("md5").update(bufferFrom(message)).digest("hex");
          } else {
            return method(message);
          }
        };
        return nodeMethod;
      };
      var createHmacOutputMethod = function(outputType) {
        return function(key, message) {
          return new HmacMd5(key, true).update(message)[outputType]();
        };
      };
      var createHmacMethod = function() {
        var method = createHmacOutputMethod("hex");
        method.create = function(key) {
          return new HmacMd5(key);
        };
        method.update = function(key, message) {
          return method.create(key).update(message);
        };
        for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
          var type2 = OUTPUT_TYPES[i];
          method[type2] = createHmacOutputMethod(type2);
        }
        return method;
      };
      function Md5(sharedMemory) {
        if (sharedMemory) {
          blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
          this.blocks = blocks;
          this.buffer8 = buffer8;
        } else {
          if (ARRAY_BUFFER) {
            var buffer2 = new ArrayBuffer(68);
            this.buffer8 = new Uint8Array(buffer2);
            this.blocks = new Uint32Array(buffer2);
          } else {
            this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          }
        }
        this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0;
        this.finalized = this.hashed = false;
        this.first = true;
      }
      Md5.prototype.update = function(message) {
        if (this.finalized) {
          throw new Error(FINALIZE_ERROR);
        }
        var result = formatMessage(message);
        message = result[0];
        var isString = result[1];
        var code2, index = 0, i, length = message.length, blocks2 = this.blocks;
        var buffer82 = this.buffer8;
        while (index < length) {
          if (this.hashed) {
            this.hashed = false;
            blocks2[0] = blocks2[16];
            blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
          }
          if (isString) {
            if (ARRAY_BUFFER) {
              for (i = this.start; index < length && i < 64; ++index) {
                code2 = message.charCodeAt(index);
                if (code2 < 128) {
                  buffer82[i++] = code2;
                } else if (code2 < 2048) {
                  buffer82[i++] = 192 | code2 >>> 6;
                  buffer82[i++] = 128 | code2 & 63;
                } else if (code2 < 55296 || code2 >= 57344) {
                  buffer82[i++] = 224 | code2 >>> 12;
                  buffer82[i++] = 128 | code2 >>> 6 & 63;
                  buffer82[i++] = 128 | code2 & 63;
                } else {
                  code2 = 65536 + ((code2 & 1023) << 10 | message.charCodeAt(++index) & 1023);
                  buffer82[i++] = 240 | code2 >>> 18;
                  buffer82[i++] = 128 | code2 >>> 12 & 63;
                  buffer82[i++] = 128 | code2 >>> 6 & 63;
                  buffer82[i++] = 128 | code2 & 63;
                }
              }
            } else {
              for (i = this.start; index < length && i < 64; ++index) {
                code2 = message.charCodeAt(index);
                if (code2 < 128) {
                  blocks2[i >>> 2] |= code2 << SHIFT[i++ & 3];
                } else if (code2 < 2048) {
                  blocks2[i >>> 2] |= (192 | code2 >>> 6) << SHIFT[i++ & 3];
                  blocks2[i >>> 2] |= (128 | code2 & 63) << SHIFT[i++ & 3];
                } else if (code2 < 55296 || code2 >= 57344) {
                  blocks2[i >>> 2] |= (224 | code2 >>> 12) << SHIFT[i++ & 3];
                  blocks2[i >>> 2] |= (128 | code2 >>> 6 & 63) << SHIFT[i++ & 3];
                  blocks2[i >>> 2] |= (128 | code2 & 63) << SHIFT[i++ & 3];
                } else {
                  code2 = 65536 + ((code2 & 1023) << 10 | message.charCodeAt(++index) & 1023);
                  blocks2[i >>> 2] |= (240 | code2 >>> 18) << SHIFT[i++ & 3];
                  blocks2[i >>> 2] |= (128 | code2 >>> 12 & 63) << SHIFT[i++ & 3];
                  blocks2[i >>> 2] |= (128 | code2 >>> 6 & 63) << SHIFT[i++ & 3];
                  blocks2[i >>> 2] |= (128 | code2 & 63) << SHIFT[i++ & 3];
                }
              }
            }
          } else {
            if (ARRAY_BUFFER) {
              for (i = this.start; index < length && i < 64; ++index) {
                buffer82[i++] = message[index];
              }
            } else {
              for (i = this.start; index < length && i < 64; ++index) {
                blocks2[i >>> 2] |= message[index] << SHIFT[i++ & 3];
              }
            }
          }
          this.lastByteIndex = i;
          this.bytes += i - this.start;
          if (i >= 64) {
            this.start = i - 64;
            this.hash();
            this.hashed = true;
          } else {
            this.start = i;
          }
        }
        if (this.bytes > 4294967295) {
          this.hBytes += this.bytes / 4294967296 << 0;
          this.bytes = this.bytes % 4294967296;
        }
        return this;
      };
      Md5.prototype.finalize = function() {
        if (this.finalized) {
          return;
        }
        this.finalized = true;
        var blocks2 = this.blocks, i = this.lastByteIndex;
        blocks2[i >>> 2] |= EXTRA[i & 3];
        if (i >= 56) {
          if (!this.hashed) {
            this.hash();
          }
          blocks2[0] = blocks2[16];
          blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
        }
        blocks2[14] = this.bytes << 3;
        blocks2[15] = this.hBytes << 3 | this.bytes >>> 29;
        this.hash();
      };
      Md5.prototype.hash = function() {
        var a, b, c, d, bc, da, blocks2 = this.blocks;
        if (this.first) {
          a = blocks2[0] - 680876937;
          a = (a << 7 | a >>> 25) - 271733879 << 0;
          d = (-1732584194 ^ a & 2004318071) + blocks2[1] - 117830708;
          d = (d << 12 | d >>> 20) + a << 0;
          c = (-271733879 ^ d & (a ^ -271733879)) + blocks2[2] - 1126478375;
          c = (c << 17 | c >>> 15) + d << 0;
          b = (a ^ c & (d ^ a)) + blocks2[3] - 1316259209;
          b = (b << 22 | b >>> 10) + c << 0;
        } else {
          a = this.h0;
          b = this.h1;
          c = this.h2;
          d = this.h3;
          a += (d ^ b & (c ^ d)) + blocks2[0] - 680876936;
          a = (a << 7 | a >>> 25) + b << 0;
          d += (c ^ a & (b ^ c)) + blocks2[1] - 389564586;
          d = (d << 12 | d >>> 20) + a << 0;
          c += (b ^ d & (a ^ b)) + blocks2[2] + 606105819;
          c = (c << 17 | c >>> 15) + d << 0;
          b += (a ^ c & (d ^ a)) + blocks2[3] - 1044525330;
          b = (b << 22 | b >>> 10) + c << 0;
        }
        a += (d ^ b & (c ^ d)) + blocks2[4] - 176418897;
        a = (a << 7 | a >>> 25) + b << 0;
        d += (c ^ a & (b ^ c)) + blocks2[5] + 1200080426;
        d = (d << 12 | d >>> 20) + a << 0;
        c += (b ^ d & (a ^ b)) + blocks2[6] - 1473231341;
        c = (c << 17 | c >>> 15) + d << 0;
        b += (a ^ c & (d ^ a)) + blocks2[7] - 45705983;
        b = (b << 22 | b >>> 10) + c << 0;
        a += (d ^ b & (c ^ d)) + blocks2[8] + 1770035416;
        a = (a << 7 | a >>> 25) + b << 0;
        d += (c ^ a & (b ^ c)) + blocks2[9] - 1958414417;
        d = (d << 12 | d >>> 20) + a << 0;
        c += (b ^ d & (a ^ b)) + blocks2[10] - 42063;
        c = (c << 17 | c >>> 15) + d << 0;
        b += (a ^ c & (d ^ a)) + blocks2[11] - 1990404162;
        b = (b << 22 | b >>> 10) + c << 0;
        a += (d ^ b & (c ^ d)) + blocks2[12] + 1804603682;
        a = (a << 7 | a >>> 25) + b << 0;
        d += (c ^ a & (b ^ c)) + blocks2[13] - 40341101;
        d = (d << 12 | d >>> 20) + a << 0;
        c += (b ^ d & (a ^ b)) + blocks2[14] - 1502002290;
        c = (c << 17 | c >>> 15) + d << 0;
        b += (a ^ c & (d ^ a)) + blocks2[15] + 1236535329;
        b = (b << 22 | b >>> 10) + c << 0;
        a += (c ^ d & (b ^ c)) + blocks2[1] - 165796510;
        a = (a << 5 | a >>> 27) + b << 0;
        d += (b ^ c & (a ^ b)) + blocks2[6] - 1069501632;
        d = (d << 9 | d >>> 23) + a << 0;
        c += (a ^ b & (d ^ a)) + blocks2[11] + 643717713;
        c = (c << 14 | c >>> 18) + d << 0;
        b += (d ^ a & (c ^ d)) + blocks2[0] - 373897302;
        b = (b << 20 | b >>> 12) + c << 0;
        a += (c ^ d & (b ^ c)) + blocks2[5] - 701558691;
        a = (a << 5 | a >>> 27) + b << 0;
        d += (b ^ c & (a ^ b)) + blocks2[10] + 38016083;
        d = (d << 9 | d >>> 23) + a << 0;
        c += (a ^ b & (d ^ a)) + blocks2[15] - 660478335;
        c = (c << 14 | c >>> 18) + d << 0;
        b += (d ^ a & (c ^ d)) + blocks2[4] - 405537848;
        b = (b << 20 | b >>> 12) + c << 0;
        a += (c ^ d & (b ^ c)) + blocks2[9] + 568446438;
        a = (a << 5 | a >>> 27) + b << 0;
        d += (b ^ c & (a ^ b)) + blocks2[14] - 1019803690;
        d = (d << 9 | d >>> 23) + a << 0;
        c += (a ^ b & (d ^ a)) + blocks2[3] - 187363961;
        c = (c << 14 | c >>> 18) + d << 0;
        b += (d ^ a & (c ^ d)) + blocks2[8] + 1163531501;
        b = (b << 20 | b >>> 12) + c << 0;
        a += (c ^ d & (b ^ c)) + blocks2[13] - 1444681467;
        a = (a << 5 | a >>> 27) + b << 0;
        d += (b ^ c & (a ^ b)) + blocks2[2] - 51403784;
        d = (d << 9 | d >>> 23) + a << 0;
        c += (a ^ b & (d ^ a)) + blocks2[7] + 1735328473;
        c = (c << 14 | c >>> 18) + d << 0;
        b += (d ^ a & (c ^ d)) + blocks2[12] - 1926607734;
        b = (b << 20 | b >>> 12) + c << 0;
        bc = b ^ c;
        a += (bc ^ d) + blocks2[5] - 378558;
        a = (a << 4 | a >>> 28) + b << 0;
        d += (bc ^ a) + blocks2[8] - 2022574463;
        d = (d << 11 | d >>> 21) + a << 0;
        da = d ^ a;
        c += (da ^ b) + blocks2[11] + 1839030562;
        c = (c << 16 | c >>> 16) + d << 0;
        b += (da ^ c) + blocks2[14] - 35309556;
        b = (b << 23 | b >>> 9) + c << 0;
        bc = b ^ c;
        a += (bc ^ d) + blocks2[1] - 1530992060;
        a = (a << 4 | a >>> 28) + b << 0;
        d += (bc ^ a) + blocks2[4] + 1272893353;
        d = (d << 11 | d >>> 21) + a << 0;
        da = d ^ a;
        c += (da ^ b) + blocks2[7] - 155497632;
        c = (c << 16 | c >>> 16) + d << 0;
        b += (da ^ c) + blocks2[10] - 1094730640;
        b = (b << 23 | b >>> 9) + c << 0;
        bc = b ^ c;
        a += (bc ^ d) + blocks2[13] + 681279174;
        a = (a << 4 | a >>> 28) + b << 0;
        d += (bc ^ a) + blocks2[0] - 358537222;
        d = (d << 11 | d >>> 21) + a << 0;
        da = d ^ a;
        c += (da ^ b) + blocks2[3] - 722521979;
        c = (c << 16 | c >>> 16) + d << 0;
        b += (da ^ c) + blocks2[6] + 76029189;
        b = (b << 23 | b >>> 9) + c << 0;
        bc = b ^ c;
        a += (bc ^ d) + blocks2[9] - 640364487;
        a = (a << 4 | a >>> 28) + b << 0;
        d += (bc ^ a) + blocks2[12] - 421815835;
        d = (d << 11 | d >>> 21) + a << 0;
        da = d ^ a;
        c += (da ^ b) + blocks2[15] + 530742520;
        c = (c << 16 | c >>> 16) + d << 0;
        b += (da ^ c) + blocks2[2] - 995338651;
        b = (b << 23 | b >>> 9) + c << 0;
        a += (c ^ (b | ~d)) + blocks2[0] - 198630844;
        a = (a << 6 | a >>> 26) + b << 0;
        d += (b ^ (a | ~c)) + blocks2[7] + 1126891415;
        d = (d << 10 | d >>> 22) + a << 0;
        c += (a ^ (d | ~b)) + blocks2[14] - 1416354905;
        c = (c << 15 | c >>> 17) + d << 0;
        b += (d ^ (c | ~a)) + blocks2[5] - 57434055;
        b = (b << 21 | b >>> 11) + c << 0;
        a += (c ^ (b | ~d)) + blocks2[12] + 1700485571;
        a = (a << 6 | a >>> 26) + b << 0;
        d += (b ^ (a | ~c)) + blocks2[3] - 1894986606;
        d = (d << 10 | d >>> 22) + a << 0;
        c += (a ^ (d | ~b)) + blocks2[10] - 1051523;
        c = (c << 15 | c >>> 17) + d << 0;
        b += (d ^ (c | ~a)) + blocks2[1] - 2054922799;
        b = (b << 21 | b >>> 11) + c << 0;
        a += (c ^ (b | ~d)) + blocks2[8] + 1873313359;
        a = (a << 6 | a >>> 26) + b << 0;
        d += (b ^ (a | ~c)) + blocks2[15] - 30611744;
        d = (d << 10 | d >>> 22) + a << 0;
        c += (a ^ (d | ~b)) + blocks2[6] - 1560198380;
        c = (c << 15 | c >>> 17) + d << 0;
        b += (d ^ (c | ~a)) + blocks2[13] + 1309151649;
        b = (b << 21 | b >>> 11) + c << 0;
        a += (c ^ (b | ~d)) + blocks2[4] - 145523070;
        a = (a << 6 | a >>> 26) + b << 0;
        d += (b ^ (a | ~c)) + blocks2[11] - 1120210379;
        d = (d << 10 | d >>> 22) + a << 0;
        c += (a ^ (d | ~b)) + blocks2[2] + 718787259;
        c = (c << 15 | c >>> 17) + d << 0;
        b += (d ^ (c | ~a)) + blocks2[9] - 343485551;
        b = (b << 21 | b >>> 11) + c << 0;
        if (this.first) {
          this.h0 = a + 1732584193 << 0;
          this.h1 = b - 271733879 << 0;
          this.h2 = c - 1732584194 << 0;
          this.h3 = d + 271733878 << 0;
          this.first = false;
        } else {
          this.h0 = this.h0 + a << 0;
          this.h1 = this.h1 + b << 0;
          this.h2 = this.h2 + c << 0;
          this.h3 = this.h3 + d << 0;
        }
      };
      Md5.prototype.hex = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
        return HEX_CHARS[h0 >>> 4 & 15] + HEX_CHARS[h0 & 15] + HEX_CHARS[h0 >>> 12 & 15] + HEX_CHARS[h0 >>> 8 & 15] + HEX_CHARS[h0 >>> 20 & 15] + HEX_CHARS[h0 >>> 16 & 15] + HEX_CHARS[h0 >>> 28 & 15] + HEX_CHARS[h0 >>> 24 & 15] + HEX_CHARS[h1 >>> 4 & 15] + HEX_CHARS[h1 & 15] + HEX_CHARS[h1 >>> 12 & 15] + HEX_CHARS[h1 >>> 8 & 15] + HEX_CHARS[h1 >>> 20 & 15] + HEX_CHARS[h1 >>> 16 & 15] + HEX_CHARS[h1 >>> 28 & 15] + HEX_CHARS[h1 >>> 24 & 15] + HEX_CHARS[h2 >>> 4 & 15] + HEX_CHARS[h2 & 15] + HEX_CHARS[h2 >>> 12 & 15] + HEX_CHARS[h2 >>> 8 & 15] + HEX_CHARS[h2 >>> 20 & 15] + HEX_CHARS[h2 >>> 16 & 15] + HEX_CHARS[h2 >>> 28 & 15] + HEX_CHARS[h2 >>> 24 & 15] + HEX_CHARS[h3 >>> 4 & 15] + HEX_CHARS[h3 & 15] + HEX_CHARS[h3 >>> 12 & 15] + HEX_CHARS[h3 >>> 8 & 15] + HEX_CHARS[h3 >>> 20 & 15] + HEX_CHARS[h3 >>> 16 & 15] + HEX_CHARS[h3 >>> 28 & 15] + HEX_CHARS[h3 >>> 24 & 15];
      };
      Md5.prototype.toString = Md5.prototype.hex;
      Md5.prototype.digest = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
        return [
          h0 & 255,
          h0 >>> 8 & 255,
          h0 >>> 16 & 255,
          h0 >>> 24 & 255,
          h1 & 255,
          h1 >>> 8 & 255,
          h1 >>> 16 & 255,
          h1 >>> 24 & 255,
          h2 & 255,
          h2 >>> 8 & 255,
          h2 >>> 16 & 255,
          h2 >>> 24 & 255,
          h3 & 255,
          h3 >>> 8 & 255,
          h3 >>> 16 & 255,
          h3 >>> 24 & 255
        ];
      };
      Md5.prototype.array = Md5.prototype.digest;
      Md5.prototype.arrayBuffer = function() {
        this.finalize();
        var buffer2 = new ArrayBuffer(16);
        var blocks2 = new Uint32Array(buffer2);
        blocks2[0] = this.h0;
        blocks2[1] = this.h1;
        blocks2[2] = this.h2;
        blocks2[3] = this.h3;
        return buffer2;
      };
      Md5.prototype.buffer = Md5.prototype.arrayBuffer;
      Md5.prototype.base64 = function() {
        var v1, v2, v3, base64Str = "", bytes = this.array();
        for (var i = 0; i < 15; ) {
          v1 = bytes[i++];
          v2 = bytes[i++];
          v3 = bytes[i++];
          base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] + BASE64_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] + BASE64_ENCODE_CHAR[(v2 << 2 | v3 >>> 6) & 63] + BASE64_ENCODE_CHAR[v3 & 63];
        }
        v1 = bytes[i];
        base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] + BASE64_ENCODE_CHAR[v1 << 4 & 63] + "==";
        return base64Str;
      };
      function HmacMd5(key, sharedMemory) {
        var i, result = formatMessage(key);
        key = result[0];
        if (result[1]) {
          var bytes = [], length = key.length, index = 0, code2;
          for (i = 0; i < length; ++i) {
            code2 = key.charCodeAt(i);
            if (code2 < 128) {
              bytes[index++] = code2;
            } else if (code2 < 2048) {
              bytes[index++] = 192 | code2 >>> 6;
              bytes[index++] = 128 | code2 & 63;
            } else if (code2 < 55296 || code2 >= 57344) {
              bytes[index++] = 224 | code2 >>> 12;
              bytes[index++] = 128 | code2 >>> 6 & 63;
              bytes[index++] = 128 | code2 & 63;
            } else {
              code2 = 65536 + ((code2 & 1023) << 10 | key.charCodeAt(++i) & 1023);
              bytes[index++] = 240 | code2 >>> 18;
              bytes[index++] = 128 | code2 >>> 12 & 63;
              bytes[index++] = 128 | code2 >>> 6 & 63;
              bytes[index++] = 128 | code2 & 63;
            }
          }
          key = bytes;
        }
        if (key.length > 64) {
          key = new Md5(true).update(key).array();
        }
        var oKeyPad = [], iKeyPad = [];
        for (i = 0; i < 64; ++i) {
          var b = key[i] || 0;
          oKeyPad[i] = 92 ^ b;
          iKeyPad[i] = 54 ^ b;
        }
        Md5.call(this, sharedMemory);
        this.update(iKeyPad);
        this.oKeyPad = oKeyPad;
        this.inner = true;
        this.sharedMemory = sharedMemory;
      }
      HmacMd5.prototype = new Md5();
      HmacMd5.prototype.finalize = function() {
        Md5.prototype.finalize.call(this);
        if (this.inner) {
          this.inner = false;
          var innerHash = this.array();
          Md5.call(this, this.sharedMemory);
          this.update(this.oKeyPad);
          this.update(innerHash);
          Md5.prototype.finalize.call(this);
        }
      };
      var exports = createMethod();
      exports.md5 = exports;
      exports.md5.hmac = createHmacMethod();
      if (COMMON_JS) {
        module.exports = exports;
      } else {
        root.md5 = exports;
      }
    })();
  })(md5$1);
  var md5Exports = md5$1.exports;
  const md5 = /* @__PURE__ */ getDefaultExportFromCjs(md5Exports);
  const _sfc_main$d = {
    data() {
      return {
        popup1Visible: false,
        popup2Visible: false
      };
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_2);
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "treaty-container" }, [
      vue.createElementVNode("view", { class: "treaty-tips" }, [
        vue.createTextVNode(" *使用即为同意 "),
        vue.createElementVNode("text", {
          class: "link",
          onClick: _cache[0] || (_cache[0] = ($event) => $data.popup1Visible = true)
        }, "《用户服务协议》"),
        vue.createTextVNode(" 和 "),
        vue.createElementVNode("text", {
          class: "link",
          onClick: _cache[1] || (_cache[1] = ($event) => $data.popup2Visible = true)
        }, "《用户隐私条款》")
      ]),
      vue.createVNode(_component_u_popup, {
        modelValue: $data.popup1Visible,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.popup1Visible = $event),
        mode: "center",
        "border-radius": "16",
        "mask-close-able": true
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("scroll-view", {
            "scroll-y": "",
            class: "pop-box"
          }, [
            vue.createElementVNode("view", { class: "title" }, "《用户服务协议》"),
            vue.createElementVNode("view", { class: "content" }, [
              vue.createElementVNode("view", { class: "sub-content" }, ' MinerGlory（www.minerglory.cn）系为用户提供数字资产超算服务器、数字资产超算服务算力、数字货币等数字资产（以下统一称为"数字资产"）交易和相关服务的信息中介服务平台（以下简称"平台"）。平台依据本协议（定义见下文）的规定为在平台进行注册的会员（以下简称"会员"）提供服务，本协议在会员和平台之间具有法律约束力。平台在此特别提醒用户认真阅读并充分理解本协议项下的各条款，特别是本协议中涉及免除或限制平台责任的条款，以及排除或限制用户权利的条款。用户应当审慎阅读，并选择接受或不接受本协议。除非用户接受本协议项下的所有条款，否则用户无权使用平台基于本协议所提供的服务。若用户不同意本协议的内容，或拒绝承认平台随时对本协议进行单方修改的权利，则用户应当立即停止使用并不再访问本平台。用户一经注册成为会员或使用平台服务即视为对本协议全部条款（包括本公司对本协议随时做出的任何修改）充分理解并完全接受。 为了本协议表述之方便，本平台在本协议中合称使用"我们"或其他第一人称称呼；访问平台的自然人或其他主体均称为"您"或其他第二人称；我们和您在本协议中合称为"双方"，我们或您称为"一方"。 '),
              vue.createElementVNode("view", { class: "sub-title" }, "第一章 定义和解释"),
              vue.createElementVNode("view", { class: "sub-content" }, [
                vue.createTextVNode(" 第一条在本协议中，除非本协议项下条款另有约定，以下词汇或者表述应当具有下述意义："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)本协议 应当包括本服务协议、隐私条款、反洗钱指引以及其他在平台上已经发布或将来可能发布的各类规则、附件、声明、说明或指引等构成。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)不可抗力：包括信息网络设备维护、信息网络连接故障、电脑、通讯或其他系统的故障、电力故障、天气原因、意外事故、罢工、劳动争议、暴乱、起义、骚乱、生产力或生产资料不足、火灾、洪水、风暴、爆炸、战争或其他合作方原因、数字资产市场崩溃、政府行为、司法或行政机关的命令、其他不在平台可控范围内或平台无能力控制的情形。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)关联公司：与其他公司之间存在直接或间接控制关系或重大影响关系的公司；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)知识产权：应当具有本协议第八十九条之意义。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第二条在该协议中引用的任何法典或者成文法令或者行政规章应当引用其最新的修订版本，无论该修订是在本协议签订之前或者之后做出。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第三条本协议中任何条款之标题的应用是出于简便的考量，而不应当用于解释协议条款之用途。引用任何陈述，条款，附件，表格是指该协议项下之陈述，条款，附件，表格。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(' 第四条该协议项下，除非协议中另有要求，在任何情形下使用"包括"一词，应当具有"包括但不限于"之意义。'),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第五条除非本协议条款另有约定，本协议项下的各个文件相互冲突或者不一致，应当以下述顺序来决定文件的效力以解决冲突或者不一致："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)MinerGlory用户服务协议；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)MinerGlory隐私条款；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)MinerGlory反洗钱和反恐怖融资指引；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)其他协议、规则和指引。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第六条用户可以选择使用平台的不同语言版本，若存在平台的不同语言版本之内容不一致或者相冲突，或遗漏内容之情形，平台的中文文本应当优先适用。"),
                vue.createElementVNode("br")
              ]),
              vue.createElementVNode("view", { class: "sub-title" }, "第二章 平台基本条款"),
              vue.createElementVNode("view", { class: "sub-content" }, [
                vue.createTextVNode(" 第七条平台系信息中介服务平台（网址：www.minerglory.cn，如平台以公告等形式发布新的网址，请届时访问新的网址），平台服务是由本公司通过平台及客户端等各种方式向会员提供的服务，具体服务内容主要包括：数字资产交易信息发布、数字资产交易管理服务、用户服务等交易辅助服务，具体详情平台实际提供的服务内容为准。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第八条为了保障您的权益，您在自愿注册使用平台服务前，必须仔细阅读并充分理解知悉本服务协议所有条款。一经注册或使用平台服务即视为对本协议和平台对本协议随时做出的任何修改的充分理解和接受；如有违反而导致任何法律后果，您将自己独立承担相应的法律责任。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第九条在本协议履行过程中，平台可根据情况对本协议进行修改。一旦本协议的内容发生变动，平台将公布最新的服务协议，不再向会员作个别通知。如果会员不同意平台对本协议所做的修改，会员有权停止使用平台服务。如果会员继续使用平台服务，则视为会员接受平台对本协议所做的修改，并应遵照修改后的协议执行。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第十条平台对于会员的通知及任何其他的协议、告示或其他关于会员使用会员账户及服务的通知，会员同意平台可通过平台公告、站内信、电子邮件、手机短信、无线通讯装置等电子方式或邮寄等物理方式进行，该等通知于发送之日视为已送达收件人 （如以邮寄方式向会员发出通知的，则在该等通知按照会员在平台留存的联系地址交邮后的第三个自然日即视为送达）。因不可归责于平台的原因（包括电子邮件地址、手机号码、联系地址等不准确或无效、信息传输故障等）导致会员未在前述通知视为送达之日收到该等通知的，平台不承担任何责任。"),
                vue.createElementVNode("br")
              ]),
              vue.createElementVNode("view", { class: "sub-title" }, "第三章 注册会员"),
              vue.createElementVNode("view", { class: "sub-content" }, [
                vue.createTextVNode(" 第十一条在使用平台服务前，用户必须先在平台上进行注册。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第十二条注册平台个人会员的用户应当是年满十八岁或根据其所在国法律规定具有完全民事权利和民事行为能力，能够独立承担民事责任的自然人"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第十三条欲注册机构会员的法人、组织或其他机构，应当指定年满十八岁或根据其所在国法律规定具有完全民事权利和民事行为能力，能够独立承担民事责任的自然人代表机构完成平台注册。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第十四条您一旦点击同意注册按钮，即表示您或您有权代理的机构同意本协议的全部内容，且您本人或您所代理的机构受到本协议之约束。若您不具备本协议第十二条或第十三条所要求之主体资格，则您及您有权代理的机构应承担因此而导致的一切后果，且平台保留注销或永久冻结您账户，并向您及您有权代理机构追究责任的权利。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第十五条您同意根据平台用户注册页面的要求提供姓名、电子邮箱、手机号码、国籍，身份证件等信息。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第十六条在注册前或者注册后，平台有权根据用户所在国家或地区的法律法规、规则、命令等规范的要求，向用户要求提供更多的信息或资料等。用户应当配合平台提交相关信息或资料，并采取合理的措施以符合当地的规范之要求。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第十七条会员在此承诺以下事项："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)出于合法交易自身数字资产之目的注册及使用本平台，且不具有以平台为媒介违反法律法规或破坏数字资产交易秩序之意图；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)会员必须依平台要求提示提供真实、最新、有效及完整的资料；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)会员保证并承诺通过平台进行交易的数字资产及资金来源合法；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)会员有义务维持并更新会员的资料，确保其为真实、最新、有效及完整；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (五)个人会员不为美国之居民，机构会员不为美国注册之公司；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (六)除本协议以外，会员应同时遵守平台不时发布及更新的全部规则，包括公告、产品流程说明、平台项目说明、风险提示等。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第十八条除非用户提交的信息是明显虚假，错误和不完整的，平台有权信赖用户所提供的信息。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第十九条若用户违背本协议第十七之承诺："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)平台有权包括停用会员平台帐户、拒绝会员使用平台服务的部份或全部功能。在此情况下，平台不承担任何责任，并且会员同意负担因此所产生的直接或间接的任何支出或损失；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)未及时更新基本资料，导致平台服务无法提供或提供时发生任何错误，会员不得将此作为取消交易或拒绝付款的理由，平台亦不承担任何责任，所有后果应由会员承担；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)会员应当承担因违背承诺而产生的任何直接或间接损失及不利后果，扣取不当获利，且平台保留追究会员责任的权利。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第二十条在您合法、完整并有效提供注册所需信息并经验证后，注册流程即告结束，用户正式成为平台会员，且可在平台进行会员登陆。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第二十一条会员通过平台购买或出售算力或数字资产应当符合以下要求："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)会员应当确保会员对其在交易页面上发布拟出售的数字资产或拟购买需支付的价款享有相应的权利，会员不得在交易页面上发布与数字资产之销售或购买无关的信息；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)会员应当确保其销售或购买数字资产以及发布交易信息等行为符合其所在主权国家或地区相关法律法规及本协议之要求，符合社会公序良俗，并其不侵犯任何第三方主体的合法权益；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)会员应当保证其填写的收款账户或付款账户为会员本人所有，因会员填写非本人的收款账户或付款账户而导致的损失和一切法律后果由会员本人承担；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)会员应当维护交易平台市场良性竞争秩序，不得贬低、诋毁竞争对手，不得干扰本网站上进行的任何交易活动，不得以任何不正当方式提升或试图提升自身的信用度，不得以任何方式干扰或试图干扰平台的正常运作；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (五)会员应当遵守诚实信用原则，确保会员所发布的交易信息合法合规、真实有效，并在交易过程中切实履行您的交易承诺；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (六)会员应当按其所在国家或地区法律法规的规定纳税。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第二十二条平台发现用户不适合进行高风险投资情形时，有权终止会员之投资行为或终止会员对会员账户之使用。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第二十三条无论本协议其他条款如何规定，平台对用户是否能够通过平台用户认证，以及是否注销已认证用户之资格具有自由裁量权。平台有权拒绝或注销任何用户的注册，且没有义务告知用户拒绝注册之理由，平台不承担任何因平台拒绝用户注册而导致用户所遭受的直接或间接的损失，且保留追究用户责任的权利。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第二十四条用户系自愿注册成为平台会员，平台没有强迫、诱导、欺骗或者通过其他不公平的手段对用户施加影响。"),
                vue.createElementVNode("br")
              ]),
              vue.createElementVNode("view", { class: "sub-title" }, "第四章 注册平台服务的内容"),
              vue.createElementVNode("view", { class: "sub-content" }, [
                vue.createTextVNode(" 第二十五条平台对完成注册的会员提供以下服务："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)提供数字资产各项目方所公开的相关信息；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)数字资产各项目的实时行情及交易信息；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)数字资产交易管理服务；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)提供客户服务；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (五)保障平台正常运营的技术和管理服务；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (六)平台公示的其他服务。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第二十六条平台接受数字资产项目方的委托依据本协议第二十五条进行信息发布，为数字资产之间的交易提供撮合服务，平台仅对数字资产项目方发布的信息承担文本审查责任，不对信息的准确、完整、合法性做出保证，也不承担相关责任，会员应依其独立判断做出决策。会员据此进行数字资产交易的，产生的风险由会员自行承担，会员无权据此向平台提出任何法律主张。会员与数字资产项目方之间因交易发生的或与交易有关的任何纠纷，应由纠纷各方自行解决，平台不承担任何交易风险及法律责任。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第二十七条本协议第二十五条所述之数字资产交易管理服务应当包括以下内容："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)会员账户：会员在平台进行注册时将生成会员账户，会员账户将记载会员在平台的活动，上述会员账户是会员登陆平台的唯一账户。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)数字资产交易：会员可以通过平台提交数字资产交易指令，用会员账户中的数字资产交易其他数字资产。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)法币和数字资产交易撮合服务：会员可以通过平台提交法币交易指令，购买平台中超算服务器、超算算力或数字货币销售方的数字资产。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)充币和提币：会员可以将数字货币等数字资产从其他地址转入会员账户指定地址，或将会员账户中的数字货币等数字资产转出至其他地址。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (五)交易状态更新：会员确认，会员在平台上按平台服务流程所确认的数字资产交易状态，将成为平台为会员进行相关交易或操作的不可撤销的指令。会员同意相关指令的执行时间以平台在平台系统中进行实际操作的时间为准。会员同意平台有权依据本协议及/或平台相关纠纷处理规则等约定对相关事项进行处理。会员未能及时对交易状态进行修改、确认或未能提交相关申请所引起的任何纠纷或损失由会员自行负责，平台不承担任何责任。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (六)交易指令传递：平台依据会员输入交易指令的时间和数据传递交易指令。会员了解平台系数字资产交易的撮合方，并不是买家或卖家参与买卖数字资产交易行为本身，且平台不提供任何国家法定货币的充入或提取业务。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (七)交易查询：平台将对会员在平台的所有操作进行记录，不论该操作之目的最终是否实现。会员可以通过会员账户实时查询会员账户名下的交易记录。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (八)交易安全设置：平台有权基于交易安全等方面的考虑不时设定涉及交易的相关事项，包括交易限额、交易次数等，会员了解平台的前述设定可能会对交易造成一定不便，对此没有异议。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (九)系统故障处理：如果平台发现了因系统故障或其他任何原因导致的处理错误，无论有利于平台还是有利于会员，平台都有权纠正该错误。如果该错误导致会员实际收到的数字资产多于应获得的数字资产，则无论错误的性质和原因为何，平台保留纠正不当执行的交易的权利，会员应根据平台向会员发出的有关纠正错误的通知的具体要求返还多收的数字资产或进行其他操作。会员理解并同意，平台不承担因前述处理错误而导致的任何损失或责任。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第二十八条除了本协议第二十五条项下所列之服务，和平台公示的技术性服务，平台不能就数字资产交易提供给会员任何投资、法律、税收或其他专业意见，且任何平台所提供之任何消息、探讨、分析、价格等信息均为一般评论，不构成对会员进行任何数字资产交易的建议。如果会员需要专业意见，会员应当向相关专业人事咨询数字货币交易有关的投资、法律、税收或其他专业性建议。平台不承担会员因依赖上述一般评论而产生的任何直接或间接而产生的损失（包括任何利润损失）。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第二十九条平台提供的服务不应当理解为或被用于向任何认定平台所提供之服务为非法的国家或地区的用户发出要约。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第三十条会员使用本平台进行数字资产交易的过程中应当遵守以下交易规则："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)浏览交易信息：会员在平台浏览交易信息时，应当仔细阅读交易信息中包含的全部内容，包括价格、委托量、手续费、买入或卖出方向，会员应当在完全理解并接受交易信息中的全部内容后，再点击按钮进行交易。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)委托之提交：在理解并完全接收交易信息中的全部内容后，会员可以输入数字资产交易信息，确认该信息无误后提交交易委托。一旦会员提交交易委托，则会员授权平台代理会员依据会员输入的数字资产交易信息进行相应的交易撮合。会员知悉并同意，当有满足会员委托交易价格的数字资产交易时，平台应当自动完成交易之撮合，且无需提前通知会员。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)交易明细之查询：会员可以通过个人账户直中的交易明细中查看相应的数字资产交易成交记录。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)撤销或修改委托：会员知悉，在委托之数字资产交易撮合未完成之前，会员有权随时撤销或修改委托。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第三十一条会员通过本平台使用法币购买卖方数字资产交易的过程中应当遵守以下交易规则："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)浏览交易信息：会员在平台浏览交易信息时，应当仔细阅读交易信息中包含的全部内容，包括价格、购买量、手续费、购买方式、购买限额等。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)买单和卖单的创建：通过平台提供的法币交易页面，会员创建了买单或者卖单，或者接受了其他用户的买单或卖单，则代表该会员同意并接受买单或卖单上显示的价格或数量；一旦会员创建或者接受，则交易价格被锁定，买方或卖方均无法在此次交易中更改或添加任何额外费用。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)涉交易数字资产代管：在整个法币交易过程中，交易订单涉及的数字资产将由平台代管，直到卖方确认收到全额付款并在法币平台上确认收款操作为止。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)支付价款：会员应当按照卖方在法币交易平台向您提供的有效的付款细节完成付款。会员了解，付款方式是会员和交易方之间所约定的第三方支付方式，包括但不限于网银转账、支付宝、微信转账等，平台不会和价款有任何形式的接触，对于所支付的价款也不存在任何形式的控制。因此，因付款，付款方式，或付款渠道而产生的或与其相关的一切交易纠纷与本平台无关，平台将不承担任何形式的责任。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (五)信息之理解和交易对手的确认：会员应当在完全理解并接受交易信息中的全部内容后再进行交易，并在达成交易前核实会员或交易对手的账户信息、收付款账户等信息。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第三十二条平台有权基于下述原因修改、暂停或永久停止对会员开放的平台之部分或全部服务："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)依据会员所属主权国家或地区的法律法规、规则、命令等规范的要求；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)平台出于保护平台或客户利益之合法利益；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)数字资产交易规则发生变更；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)其他合理理由。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第三十三条平台基于本协议第三十二条修改、暂停或永久停止对会员开放的平台之部分或全部服务的，生效日以平台公告为准。"),
                vue.createElementVNode("br")
              ]),
              vue.createElementVNode("view", { class: "sub-title" }, "第五章 账户安全及管理"),
              vue.createElementVNode("view", { class: "sub-content" }, [
                vue.createTextVNode(" 第三十四条会员了解并同意，确保会员账户及密码的机密安全是会员的责任。会员将对利用该会员账户及密码所进行的一切行动及言论，负完全的责任，并同意以下事项："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)会员应根据平台的相关规则以及平台的相关提示创建密码（密码包括但不限于登陆密码、资金密码、注册账户时绑定的手机号码以及手机接收的手机验证码、谷歌验证等，具体形式可能发生变化，下同），应避免选择过于明显的单词或日期，比如会员的姓名、昵称或者生日等；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)会员不对其他任何人泄露账户或密码，亦不可使用其他任何人的账户或密码。因黑客、病毒或会员的保管疏忽等非平台原因导致会员的会员账户遭他人非法使用的，平台不承担任何责任；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)会员禁止在未经平台同意的情形下不得将平台账号以赠与、借用、租用、转让或以其他方式处分给第三方；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)平台通过会员的会员账户及密码来识别会员的指令，会员确认，使用会员账户和密码登陆后在平台的一切行为均代表会员本人。会员账户操作所产生的电子信息记录均为会员行为的有效凭据，并由会员本人承担由此产生的全部责任；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (五)在平台通知会员可能预见的安全风险后，采取措施保障会员账号和密码安全；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (六)冒用他人账户及密码的，平台及其合法授权主体保留追究实际使用人连带责任的权利；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第三十五条会员如发现有第三人冒用或盗用该会员账户及密码，或其他任何未经合法授权的情形，应立即以有效方式通知平台，要求平台暂停相关服务，否则由此产生的一切责任由会员本人承担。同时，会员理解平台对会员的请求采取行动需要合理期限，在此之前，平台对第三人使用该服务所导致的损失不承担任何责任。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第三十六条平台有权基于单方独立判断，在其认为可能发生危害交易安全等情形时，不经通知而先行暂停、中断或终止向会员提供本协议项下的全部或部分会员服务（包括收费服务），移除或删除注册资料，扣押不当获利，且无需对会员或任何第三方承担任何责任。前述情形包括："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)平台认为会员提供的资料不具有真实性、有效性或完整性，包括盗用他人证件信息注册、认证信息不匹配等；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)平台发现异常交易或有疑义或有违法之虞时；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)平台认为会员账户涉嫌洗钱、套现、传销、被冒用或其他平台认为有风险之情形；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)平台发现会员使用非法或不正当的技术手段进行危害交易安全或影响公平交易的行为，包括篡改交易数据、窃取客户信息、窃取交易数据、通过平台攻击其他已注册账户等；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (五)平台认为会员已经违反本协议中规定的各类规则及精神；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (六)会员账户已连续一年内未登录或实际使用且账户中数字资产为零；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (七)会员违反本协议的其他情形。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (八)平台基于交易安全等原因，根据其单独判断需先行暂停、中断或终止向会员提供本协议项下的全部或部分会员服务（包括收费服务），并将注册资料移除或删除的其他情形。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第三十七条会员决定不再使用会员账户时，应首先清偿所有应付款项（包括服务费、管理费等），再将会员账户中的可用数字资产（如有）在可提取范围全部提取，并向平台申请冻结该会员账户，经平台审核同意后可正式注销会员账户。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第三十八条会员同意，如其会员账户未完成身份认证且已经连续一年未登陆，平台无需进行事先通知即有权终止提供会员账户服务，并可能立即暂停、关闭或删除会员账户及该会员账户中所有相关资料及档案。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第三十九条会员同意，会员账户的暂停、中断或终止不代表会员责任的终止，会员仍应对使用平台服务期间的行为承担可能的违约或损害赔偿责任，同时平台仍可保有会员的相关信息。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第四十条会员在交易平台上的任何行为扰乱或将扰乱交易平台正常交易秩序的，平台基于维护法币交易平台交易秩序及交易安全的需要，有权采取关闭相关交易订单、限制账户使用等措施以维护法币交易秩序。"),
                vue.createElementVNode("br")
              ]),
              vue.createElementVNode("view", { class: "sub-title" }, "第六章 会员的保证及承诺"),
              vue.createElementVNode("view", { class: "sub-content" }, [
                vue.createTextVNode(" 第四十一条会员承诺绝不为任何非法目的或以任何非法方式使用平台服务，并承诺遵守其所在国的相关法律、法规及一切使用互联网之国际惯例，遵守所有与平台服务有关的网络协议、规则和程序。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第四十二条会员同意并保证不得利用平台服务从事侵害他人权益或违法之行为，若有违反者应负所有法律责任。 上述行为包括："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)冒用他人名义使用平台服务；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)从事任何不法交易行为，如贩卖枪支、毒品、禁药、盗版软件或其他违禁物；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)提供赌博资讯或以任何方式引诱他人参与赌博；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)涉嫌洗钱、套现或进行传销活动的；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (五)从事任何可能含有电脑病毒或是可能侵害平台服务系統、资料等行为；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (六)利用平台服务系统进行可能对互联网或移动网正常运转造成不利影响之行为；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (七)恶意干扰数字资产交易正常进行，破坏数字资产交易秩序；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (八)利用任何技术手段或其他方式干扰平台正常运行或干扰其他用户对平台服务的使用；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (九)以虚构、夸大事实等方式恶意诋毁平台商誉；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (十)其他平台有正当理由认为不适当之行为。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第四十三条平台保有依其单独判断删除平台内各类不符合法律政策或不真实或不适当的信息内容而无须通知会员的权利，并无需承担任何责任。若会员未遵守以上规定的，平台有权做出独立判断并采取暂停或关闭会员账户等措施，而无需承担任何责任。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第四十四条会员同意，由于会员违反本协议，或违反通过援引并入本协议并成为本协议一部分的文件，或由于会员使用平台服务违反了任何法律或第三方的权利而造成任何第三方进行或发起的任何补偿申请或要求（包括律师费用），会员会对平台及其关联方、合作伙伴、董事以及雇员给予全额补偿并使之不受损害。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第四十五条会员承诺，其通过平台上传或发布的信息均真实有效，其向平台提交的任何资料均真实、有效、完整、详细、准确。如因违背上述承诺，造成平台或平台其他使用方损失的，会员将承担相应责任。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第四十六条会员理解并同意，平台向符合条件的会员提供服务。平台对在平台上进行的数字资产投资或交易行为不承担任何责任，平台无法也没有义务保证会员投资成功，会员因投资或交易数字资产原因导致的损失由会员自行承担，平台不承担责任。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第四十七条会员同意对其平台注册账号下发生的所有活动（包括信息披露、发布信息、点击同意各类协议、上传提交各类文件、点击同意续签各类协议或点击同意数字货币交易等）承担责任，且如在上述活动进程中，若会员未遵从本协议条款或平台公布的交易规则中的操作指示的，平台不承担任何责任。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第四十八条会员同意，平台有权在提供平台服务过程中以各种方式投放各种商业性广告或其他任何类型的商业信息（包括在平台的任何页面上投放广告），并且，会员同意接受平台通过电子邮件或其他方式向会员发送商业促销或其他相关商业信息。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第四十九条会员同意，若会员因数字资产交易与项目方或其他第三方产生纠纷的，不得通过司法或行政以外的途径要求平台提供相关资料。"),
                vue.createElementVNode("br")
              ]),
              vue.createElementVNode("view", { class: "sub-title" }, "第七章 服务中断或故障"),
              vue.createElementVNode("view", { class: "sub-content" }, [
                vue.createTextVNode(" 第五十条会员同意，基于互联网的特殊性，平台不担保服务不会中断，也不担保服务的及时性和/或安全性。系统因相关状况无法正常运作，使会员无法使用任何平台服务或使用任何平台服务时受到任何影响时，平台对会员或第三方不负任何责任，前述状况包括："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)平台系统停机维护期间。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)电信设备出现故障不能进行数据传输的。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)由于黑客攻击、网络供应商技术调整或故障、网站升级的问题等原因而造成的平台服务中断或延迟。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成平台系统障碍不能执行业务的。"),
                vue.createElementVNode("br")
              ]),
              vue.createElementVNode("view", { class: "sub-title" }, "第八章 责任范围及限制"),
              vue.createElementVNode("view", { class: "sub-content" }, [
                vue.createTextVNode(" 第五十一条平台未对任何平台服务提供任何形式的保证，包括以下事项："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)平台服务将符合会员的需求。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)平台服务将不受干扰、及时提供或免于出错。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)会员经由平台服务购买或取得之任何产品、服务、资讯或其他资料将符合会员的期望。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)平台包含的全部信息、程序、文本、数据等完全安全，不受任何病毒、木马等恶意程序的干扰和破坏。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (五)所有的交易结果计算都经过平台核实，相应的计算方法都会在平台上进行公示，但是平台不能保证其计算没有误差或不受干扰。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第五十二条会员知悉并同意，在任何情形下，平台不会就下列任一事项承担责任："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)用户的收入损失；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)用户的交易利润或合同损失；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)服务中断、中止或终止而引起的损失；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)预期可节省交易成本的损失；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (五)信息传递问题而造成的损失；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (六)措施投资或交易机会的损失；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (七)商誉或声誉的损失；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (八)数据的遗失或损坏而造成的损失；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (九)购买替代产品或服务的开销；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (十)任何由于侵权（包括故意和过失）、违约、或其他任何原因导致的间接的、特殊的或附带性的损失，不论此种损失是否为平台所能合理预见，亦不论平台是否事先被告知存在此种损失的可能性。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第五十三条会员了解并同意，发生以下任一情形时，平台有权拒绝赔偿会员的全部或部分损失："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)平台有合理的理由认为会员在平台的行为系涉嫌违法或不道德行为。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)会员误以为系平台原因造成损失的情形；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)任何非因平台原因引起的其他损失。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(' 第五十四条平台服务的合作单位所提供的服务品质及内容由该合作单位自行负责。平台的内容可能涉及由第三方所有、控制或者运营的其他网站（以下简称"第三方网站"）。平台不能保证也没有义务保证第三方网站上任何信息的真实性和有效性。会员确认按照第三方网站的服务协议使用第三方网站，而不是按照本协议。第三方网站不是平台推荐或者介绍的，第三方网站的内容、产品、广告和其他任何信息均由会员自行判断并承担风险，而与平台无关。会员经由平台服务的使用下载或取得任何资料，应由会员自行考量且自负风险，因资料的下载而导致的任何损坏由会员自行承担。'),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第五十五条会员自平台及平台工作人员或经由平台服务取得的建议或资讯，无论其为书面或口头，均不构成平台对平台服务的任何保证。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第五十六条平台不保证为向会员提供便利而设置的外部链接的准确性、有效性、安全性和完整性，同时，对于该等外部链接指向的不由平台实际控制的任何网页上的内容，平台不承担任何责任。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第五十七条在法律允许的情况下，平台对于与本协议有关或由本协议引起的，或者，由于使用平台、或由于其所包含的或以其他方式通过平台提供给会员的全部信息、内容、材料、产品（包括软件）和服务、或购买和使用产品引起的任何间接的、惩罚性的、特殊的、派生的损失（包括业务损失、收益损失、利润损失、使用数据或其他经济利益的损失），不论是如何产生的，也不论是由对本协议的违约（包括违反保证）还是由侵权造成的，均不负有任何责任，即使其事先已被告知此等损失的可能性。另外即使本协议规定的排他性救济没有达到其基本目的，也应排除平台对上述损失的责任。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第五十八条除本协议另有规定外，在任何情况下，平台对本协议所承担的违约赔偿责任总额不超过向会员收取的当笔数字资产交易平台服务费用总额。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第五十九条除本协议另有规定外，在任何情况下，因会员违反本协议或其所在国法律法规而导致平台遭受损失的，会员应当赔偿平台所遭受的一切直接和/或间接的损失（包括诉讼费用等）。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第六十条平台和会员均承认普通法对违约或可能违约情况的救济措施可能不足以弥补守约方遭受的全部或部分损失，故双方同意，协议一方有权在协议另一方违约或可能违约情况下寻求禁令救济以及普通法或衡平法允许的其他所有的补救措施。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(' 第六十一条平台在本协议中做出的保证和承诺是平台就其依据本协议提供服务的唯一保证和陈述（以下简称"协议保证"），取代任何其他途径和方式产生的保证和承诺（以下简称"非协议保证"），无论非协议保证是以书面或口头，明示或暗示的形式做出。所有协议保证仅仅由平台做出，对平台自身具有约束力，其效力不能约束任何第三方。'),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第六十二条会员知悉并同意，平台并不放弃本协议中未提及的，在法律适用的最大范围内平台所享有的限制、免除或抵销平台损害赔偿责任的任何权利。"),
                vue.createElementVNode("br")
              ]),
              vue.createElementVNode("view", { class: "sub-title" }, "第九章 风险提示"),
              vue.createElementVNode("view", { class: "sub-content" }, [
                vue.createTextVNode(" 第六十三条会员了解并认可，任何通过平台进行的交易并不能避免以下风险的产生，平台不能也没有义务为如下风险负责："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)宏观经济风险：因宏观经济形势变化，可能引起价格等方面的异常波动，会员有可能遭受损失；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)政策风险：有关法律、法规及相关政策、规则发生变化，可能引起价格等方面异常波动，会员有可能遭受损失；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)违约风险：因项目方无力或无意愿进行或者继续进行项目开发，而导致的会员有可能遭受损失；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)收益风险：数字资产本身不由任何金融机构或平台发行，数字资产市场是全新的、未经确认的，且可能不会带来实际收益增长的市场；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (五)操盘风险：数字资产主要由投机者大量使用，零售和商业市场使用相对较少，数字资产交易存在极高风险，其全天不间断交易，没有涨跌限制，价格容易受庄家、全球政府政策的影响而大幅波动；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (六)不可抗力因素导致的风险；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (七)会员过错：因会员的过错导致的任何损失，包括：决策失误、操作不当、遗忘或泄露密码、密码被他人破解、会员使用的计算机系统被第三方侵入、会员委托第三人代理交易时第三人恶意或不当操作而造成的损失。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第六十四条数字资产交易风险较高，并不适合普通人士投资。会员知悉并了解此投资有可能导致部分损失或全部损失，所以会员应当以能承受的损失程度来决定其投资或交易的数量。除了本协议第六十三条提示的风险外，还会有未能预测的风险存在。会员应慎重评估自己的财政状况，及各项风险，而做出任何数字资产投资或交易的决定。会员应当承担由该决定产生的全部损失，平台对会员的投资或交易决定不承担任何责任。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第六十五条鉴于数字资产投资或交易所衍生的风险，若用户对该种投资或交易由任何疑问，应当在交易或投资前事先寻求专业顾问的协助。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第六十六条平台不对任何会员及/或任何交易提供任何担保或条件，无论是明示、默示或法定的。平台不能也不试图对会员或项目方发布的信息进行控制，对该等信息，平台不承担任何形式的证明、鉴定服务。平台不能完全保证平台内容的真实性、充分性、可靠性、准确性、完整性和有效性，并且无需承担任何由此引起的法律责任。会员应依赖于会员的独立判断进行交易，会员应对其做出的判断承担全部责任。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第六十七条平台对于会员使用平台服务不做任何明示或暗示的保证，包括但不限于平台提供服务的适用性、没有错误或疏漏、持续性、准确性、可靠性、适用于某一特定用途。同时，平台也不对平台提供的服务所涉及的技术及信息的有效性、准确性、正确性、可靠性、质量、稳定、完整和及时性做出任何承诺和保证。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第六十八条是否登陆或使用平台提供的服务是会员个人的决定且自行承担风险及可能产生的损失。平台对于数字资产的市场、价值及价格等不做任何明示或暗示的保证，会员知悉并了解数字资产市场的不稳定性，数字资产的价格和价值随时会大幅波动或崩盘，交易数字资产是会员个人的自由选择及决定，且自行承担风险及可能产生的损失。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第六十九条以上并不能揭示会员通过平台进行交易的全部风险及市场的全部情形。会员在做出交易决策前，应全面了解相关数字资产，根据自身的交易目标、风险承受能力和资产状况等谨慎决策，并自行承担全部风险。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第七十条在任何情况下，对于会员使用平台服务过程中涉及由第三方提供相关服务的责任由该第三方承担，平台不承担该等责任。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第七十一条因会员自身的原因导致的任何损失或责任，由会员自行负责，平台不承担责任。平台不承担责任的情形包括："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)会员未按照本协议或平台不时公布的任何规则进行操作导致的任何损失或责任；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)因会员向平台发送的指令信息不明确、或存在歧义、不完整等导致的任何损失或责任；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)会员账户内数字资产余额不足导致的任何损失或责任；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)其他因会员原因导致的任何损失或责任。"),
                vue.createElementVNode("br")
              ]),
              vue.createElementVNode("view", { class: "sub-title" }, "第十章 服务费用及其他费用"),
              vue.createElementVNode("view", { class: "sub-content" }, [
                vue.createTextVNode(" 第七十二条当会员使用平台服务时，平台向会员收取相关平台服务费用。各项平台服务费用详见会员使用平台服务时，平台上所列之收费说明及收费标准。平台保留单方面制定及调整平台服务费用收费标准的权利。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第七十三条会员在使用平台服务过程中可能需要向第三方支付一定的第三方服务费用，具体收费标准详见第三方网站相关页面，或平台的提示及收费标准。会员同意将根据上述收费标准自行或委托平台或平台指定的第三方代为向第三方支付该等服务费。"),
                vue.createElementVNode("br")
              ]),
              vue.createElementVNode("view", { class: "sub-title" }, "第十一章 协议之终止"),
              vue.createElementVNode("view", { class: "sub-content" }, [
                vue.createTextVNode(" 第七十四条会员有权在任何时候依据本协议条款之规定向平台申请注销平台账号，依据本协议第三十七条注销账号的，自平台批准用户注销账号之日起协议终止。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第七十五条依据本协议第三十六条、三十八条注销账号的，自平台注销用户账号之日起协议终止。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第七十六条会员死亡或被宣告死亡的，其在本协议项下的各项权利义务由其继承人承担。若会员丧失全部或部分民事权利能力或民事行为能力，平台或其授权的主体有权根据有效法律文书（包括生效的法院判决等）或其法定监护人的指示处置与会员账户相关的款项。若继承人或法定监护人决定继续履行本协议的，则本协议依然有效；反之，则继承人或法定监护人需要依据本协议第三十七条向平台申请注销账号，自平台批准用户注销账号之日起协议终止。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第七十七条平台有权依据本协议约定终止平台全部服务，本协议于平台全部服务终止之日终止，清退流程根据平台公告的具体规定进行操作。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第七十八条本协议终止后，会员无权要求平台继续向其提供任何服务或履行任何其他义务，包括但不限于要求平台为会员保留或向会员披露其原本网站账号中的任何信息， 向会员或第三方转发任何其未曾阅读或发送过的信息等。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第七十九条本协议的终止不影响守约方向违约方主张其他协议终止前违约方之违约责任，也不影响本协议规定之后合同义务之履行。"),
                vue.createElementVNode("br")
              ]),
              vue.createElementVNode("view", { class: "sub-title" }, "第十二章 个人信息之保护和授权条款"),
              vue.createElementVNode("view", { class: "sub-content" }, [
                vue.createTextVNode(" 第八十条本协议第十二章中之个人信息应当包括以下信息："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)在用户注册平台账号或者使用账户时，用户根据本平台要求提供的个人注册信息，包括但不限于电话号码、邮箱信息、身份证件信息；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)在用户使用平台时，或访问平台时，平台自动接收并记录的用户浏览器上的服务器数值，包括但不限于IP地址等数据及用户要求取用的网页记录；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)平台收集到的用户在平台进行交易的有关数据，包括但不限于交易记录；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)平台通过合法途径取得的其他用户个人信息。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第八十一条不需要用户额外的同意，用户在平台注册成功即视为用户同意平台收集并使用或披露其个人信息，且用户了解并同意，基于为用户度身订造平台服务、解决争议并有助确保在平台进行安全交易的考量，平台可以将收集的用户个人信息用作下列用途包括："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)向用户提供平台服务；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)基于主权国家或地区相关主管部门的要求向相关部门进行报告；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)在用户使用平台服务时，平台将用户的信息用于身份验证、客户服务、安全防范、诈骗监测、市场推广、存档和备份用途，或与第三方合作推广网站等合法用途，确保平台向用户提供的产品和服务的安全性；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)帮助平台设计新产品及服务，改善平台现有服务目的而进行的信息收集和整理；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (五)为了使用户了解平台服务的具体情况，用户同意平台向其发送营销活动通知、商业性电子信息以及提供与用户相关的广告以替代普遍投放的广告；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (六)平台为完成合并、分立、收购或资产转让而将用户的信息转移或披露给任何非关联的第三方；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (七)软件认证或管理软件升级；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (八)邀请用户参与有关平台服务的调查；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (九)用于和政府机关、公共事务机构、协会等合作的数据分析；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (十)用于解决争议或对纠纷进行调停；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (十一)用作其他一切合法目的以及经用户授权的其他用途。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第八十二条平台按照用户在平台上的行为自动追踪关于用户的某些资料。在不透露用户的隐私资料的前提下，平台有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(' 第八十三条用户同意，平台可在平台的某些网页上使用诸如"Cookies"的资料收集装置。'),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第八十四条平台根据相关法律法规以保护用户的资料。用户因履行本协议提供给平台的信息，平台不会恶意出售或免费共享给任何第三方，以下情况除外："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)提供独立服务且仅要求服务相关的必要信息的供应商；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)具有合法调阅信息权限并从合法渠道调阅信息的政府部门或其他机构；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)平台的关联公司；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)经平台使用方或平台使用方授权代表同意的第三方。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第八十五条用户授权平台，除法律另有规定之外，将用户提供给平台的信息、享受平台服务产生的信息（包括本协议签署之前提供和产生的信息）以及平台根据本条约定查询、收集的信息，用于平台及其因服务必要委托的合作伙伴为用户提供服务、推荐产品、开展市场调查与信息数据分析。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第八十六条授权平台，除法律另有规定之外，基于为用户提供更优质服务和产品的目的，向平台因服务必要开展合作的伙伴提供、查询、收集用户的信息。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第八十七条为确保用户信息的安全，平台及其合作伙伴对上述信息负有保密义务，并采取各种措施保证信息安全。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第八十八条本协议第十二章项下之条款自本协议签署时生效，具有独立法律效力，不受合同成立与否及效力状态变化的影响。"),
                vue.createElementVNode("br")
              ]),
              vue.createElementVNode("view", { class: "sub-title" }, "第十三章 知识产权的保护"),
              vue.createElementVNode("view", { class: "sub-content" }, [
                vue.createTextVNode(" 第八十九条平台上所有内容，包括著作、图片、档案、资讯、资料、平台架构、平台画面的安排、平台设计，文字和图表，软件编译，相关源代码和软件等均由平台或其他权利人依法拥有其知识产权，包括商标权、专利权、著作权、商业秘密等。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第九十条非经平台或其他权利人书面同意，任何人不得擅自使用、修改、复制、公开传播、改变、散布、发行或公开发表平台程序或内容。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第九十一条用户未经平台的明确书面同意不许下载（除了页面缓存）或修改平台或其任何部分。用户不得对平台或其内容进行转售或商业利用；不得收集和利用产品目录、说明和价格；不得对平台或其内容进行任何衍生利用；不得为其他商业利益而下载或拷贝账户信息或使用任何数据采集、Robots或类似的数据收集和摘录工具。未经平台的书面许可，严禁对平台的内容进行系统获取以直接或间接创建或编辑文集、汇编、数据库或人名地址录（无论是否通过Robots、Spiders、自动仪器或手工操作）。另外，严禁为任何未经本使用条件明确允许的目的而使用平台上的内容和材料。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(' 第九十二条未经平台明确书面同意，不得以任何商业目的对平台网站或其任何部分进行复制、复印、仿造、出售、转售、访问、或以其他方式加以利用。未经平台明确书面同意，用户不得用任何技巧把平台或其关联公司的商标、标识或其他专有信息（包括图像、文字、网页设计或形式）据为己有。未经平台明确书面同意，用户不得以Meta Tags或任何其他"隐藏文本"方式使用平台或其关联公司的名字和商标。任何未经授权的使用都会终止平台所授予的允许或许可。'),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第九十三条用户登陆平台或使用平台提供的任何服务均不视为平台向用户转让任何知识产权。尊重知识产权是用户应尽的义务，如有违反，用户应对平台承担损害赔偿等法律责任。"),
                vue.createElementVNode("br")
              ]),
              vue.createElementVNode("view", { class: "sub-title" }, "第十四章 一般条款"),
              vue.createElementVNode("view", { class: "sub-content" }, [
                vue.createTextVNode(" 第九十四条本协议是由用户与平台共同签订的，适用于用户在平台的全部活动。本协议内容包括协议正文条款及已经发布的或将来可能发布的各类规则，所有条款和规则为协议不可分割的一部分，与本协议具有同等法律效力。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第九十五条如本协议中的任何条款被任何有管辖权的机构认定为不可执行的，无效的或非法的，并不影响本协议的其余条款的效力。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第九十六条本协议中约定的权利及义务同样约束通过转让从该权利义务中获取到利益的各方的受让人，继承人，遗嘱执行人和管理员。会员不得在我们不同意的前提下将本协议项下的权利或义务转让给任何第三方，但平台可随时将我们在本协议中的权利和义务转让给任何第三方，并于转让之日提前三十（30）天给与用户通知。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第九十七条如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，则应认为该条款可与本协议相分割，并可被尽可能接近各方意图的、能够保留本协议要求的经济目的的、有效的新条款所取代，而且，在此情况下，本协议的其他条款仍然完全有效并具有约束力。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第九十八条除非本协议中的其他条款另有约定，本协议中的任何规定均不应当被认为创造了、暗示了或以其他方式将平台视为会员的代理人、受托人或其他代表人。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第九十九条本协议任何一方未能就单一事件行使与本协议有关的权利或寻求救济，并不影响该缔约方随后就该单一事件或者在其他事件后行使该权利或者寻求救济。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第百条对违约行为的豁免，或本协议任一条款的放弃，仅在守约方或非寻求放弃方书面签字同意豁免后方能生效。任何该协议项下的违约豁免，不能认定或解释为守约方对其后再次违约或其他违约行为的豁免；未行使任何权利或救济不得以任何方式被解释为对该等权利或救济的放弃。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第百一条本协议依据维尔京群岛法律订立，其成立、解释、内容及执行均适用维尔京群岛相关法律规定；任何因本协议引起或与本协议相关的索赔或诉讼，都应当由维尔京群岛的法律进行解释和执行。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第百二条除非本协议项下其他规则另有约定，双方同意，由开曼仲裁中心对任何由本协议引起或与本协议相关的索赔或诉讼进行仲裁。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第百三条本协议自用户获得本网站账号时生效，对协议双方具有约束力。"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" 第百四条本协议的最终解释权归平台所有。 ")
              ])
            ]),
            vue.createElementVNode("view", { class: "popup-btns" }, [
              vue.createVNode(_component_u_button, {
                type: "primary",
                onClick: _cache[2] || (_cache[2] = ($event) => $data.popup1Visible = false),
                shape: "circle",
                style: { "width": "100%", "margin-top": "32rpx" }
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("关闭")
                ]),
                _: 1
                /* STABLE */
              })
            ])
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"]),
      vue.createVNode(_component_u_popup, {
        modelValue: $data.popup2Visible,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.popup2Visible = $event),
        mode: "center",
        "border-radius": "16",
        "mask-close-able": true
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("scroll-view", {
            "scroll-y": "",
            class: "pop-box"
          }, [
            vue.createElementVNode("view", { class: "title" }, "《MinerGlory隐私条款》"),
            vue.createElementVNode("view", { class: "content" }, [
              vue.createElementVNode("view", { class: "sub-title" }, "第一条 制定的目的和依据"),
              vue.createElementVNode("view", { class: "sub-content" }, " 为了向用户更好的提供该服务，平台需要在您登陆平台、进行平台注册和/或使用平台服务时采集您的信息，MinerGlory为预防对采集信息的滥用，根据《MinerGlory用户服务协议》等公司规定，制定本规则，就如何使用和保护采集信息进行明确规定。 "),
              vue.createElementVNode("view", { class: "sub-title" }, "第二条 称谓表述"),
              vue.createElementVNode("view", { class: "sub-content" }, ' 为了本协议表述之方便，本平台在本协议中合称使用"我们"或其他第一人称称呼；访问平台的自然人或其它主体均称为"您"或其他第二人称；我们和您在本协议中合称为"双方"，我们或您称为"一方"。 '),
              vue.createElementVNode("view", { class: "sub-title" }, "第三条 定义和解释"),
              vue.createElementVNode("view", { class: "sub-content" }, [
                vue.createTextVNode(" 在本协议中，除非本协议项下条款另有约定，以下词汇或者表述应当具有下述意义:"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)个人信息：指电子或者其它方式记录的能够单独或者与其它信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息，包括但不限于个人敏感信息；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)个人敏感信息：包括但不限于身份证件号码、用于识别身份的其它证件号码、个人生物识别信息、银行账号、财产信息、行踪轨迹、交易信息等；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)个人信息删除：指在实现日常业务功能所涉及的系统中去除个人信息的行为，使其保持不被检索、访问的状态。 ")
              ]),
              vue.createElementVNode("view", { class: "sub-title" }, "第四条 适用范围"),
              vue.createElementVNode("view", { class: "sub-content" }, ' 本协议适用于在MinerGlory及其APP（以下简称"平台"）交易的所有用户。用户应当遵循其所在国家或地区个人信息和数据保护方面的法律规定，在用户所在地区法律规定的范围内，执行本协议至规定。 '),
              vue.createElementVNode("view", { class: "sub-title" }, "第五条 法条援引"),
              vue.createElementVNode("view", { class: "sub-content" }, " 在本协议中引用的任何法典或者成文法令或者行政规章应当引用其最新的修订版本，无论该修订是在本协议签订之前或者之后做出。 "),
              vue.createElementVNode("view", { class: "sub-title" }, "第六条 条款标题"),
              vue.createElementVNode("view", { class: "sub-content" }, " 本协议中任何条款之标题的应用是出于简便的考量，而不应当用于解释协议条款之用途。引用任何陈述，条款，附件，表格是指本协议项下之陈述，条款，附件，表格。 "),
              vue.createElementVNode("view", { class: "sub-title" }, "第七条 包括一词指使用"),
              vue.createElementVNode("view", { class: "sub-content" }, ' 本协议项下，除非协议中另有要求，在任何情形下使用"包括"一词，应当具有"包括但不限于"之意义。 '),
              vue.createElementVNode("view", { class: "sub-title" }, "第八条 用户之同意和授权"),
              vue.createElementVNode("view", { class: "sub-content" }, [
                vue.createTextVNode(" 用户了解，一旦登陆平台，无论用户是否在平台上完成注册，该登陆用户即向我们表明其接受、同意、承诺和确认："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)该用户在自愿情形下，同意向我们披露个人信息；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)该用户会遵守本协议的全部条款和限制；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)该用户同意并授权平台在该用户登陆平台、进行平台注册和/或使用平台服务时收集用户的个人信息；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)该用户同意本协议之所有条款，且同意接受日后平台对隐私政策的任何修改；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (五)用户同意我们的分公司、附属公司、雇员就用户可能会感兴趣的产品和服务与用户联络( 除非用户已经表示不想收到该等讯息 )。"),
                vue.createElementVNode("br")
              ]),
              vue.createElementVNode("view", { class: "sub-title" }, "第九条 收集的信息"),
              vue.createElementVNode("view", { class: "sub-content" }, " 用户同意平台使用cookies来追踪用户使用平台时的每一个动作，并收集和记录用户留下的所有信息，其中包括但不限于用户的IP地址，地理位置及其他资料。 "),
              vue.createElementVNode("view", { class: "sub-title" }, "第十条 信息之提供"),
              vue.createElementVNode("view", { class: "sub-content" }, [
                vue.createTextVNode(" 若用户自愿使用平台提供之服务，用户需要依据《MinerGlory用户服务协议》第三章之要求，和《反洗钱和反恐怖融资指引》相应条款之要求，填写和/或提供以下两类信息："),
                vue.createElementVNode("br"),
                vue.createTextVNode(' (一)身份信息：该类信息可以帮助平台验证用户是否有资格注册为平台会员，包括但不限于用户的姓名或名称、居住地址、邮寄地址、用户所属国家或政府签发的具有证明该用户身份信息的不同种类的证书以及涉及到的证书号码，及所有其它可帮助平台验证用户身份的信息（以下合称为"身份信息"）；'),
                vue.createElementVNode("br"),
                vue.createTextVNode(' (二)服务信息：该类信息帮助平台与用户联系并顺利为您提供服务，包括但不限于您的电话号码、传真号码、有效的电子邮件地址、邮寄地址以及您的借记卡信息和/或其它帐户信息（以下合 称为"服务信息"）。 ')
              ]),
              vue.createElementVNode("view", { class: "sub-title" }, "第十一条 收集信息方式之改变"),
              vue.createElementVNode("view", { class: "sub-content" }, " 第十一条在用户使用本网站或其提供的服务时，平台为了改进平台的使用功能，提升用户对使用平台服务及其安全性的体验，或根据法院或可适用法律法规或有管辖权的其它政府机构的命令，通过平台公示的专属于平台的邮箱或其它我们认为合规的方式收集更多的必要的个人信息。 "),
              vue.createElementVNode("view", { class: "sub-title" }, "第十二条 第三方网站"),
              vue.createElementVNode("view", { class: "sub-content" }, " 如果用户访问了在本网站上的第三方网站或合作的第三方的任何链接，该用户同意并遵守该第三方网单独和独立的隐私政策。用户了解，平台对第三方网站或合作方的内容及活动不承担任何责任 "),
              vue.createElementVNode("view", { class: "sub-title" }, "第十三条 Cookie的安装"),
              vue.createElementVNode("view", { class: "sub-content" }, " 当用户访问平台时, 平台通过cookies使用Google Stats去记录平台的业绩以及核对在线广告的效果。Cookie是发送到用户的浏览器上并在用户的电脑硬盘驱动器上存储的小量数据。只有当用户使用其电脑进入平台时，Cookie才能够被发送到用户的电脑硬盘上。 "),
              vue.createElementVNode("view", { class: "sub-title" }, "第十四条 Cookie的作用"),
              vue.createElementVNode("view", { class: "sub-content" }, " Cookies常用于记录访问者浏览平台上的各个项目时的习惯以及偏好。Cookies所搜集的资料是不记名的集体统计数据，不包含有个人资料。Cookies不能用于取得您的硬盘上的数据、您的电邮地址、及您的私人数据，其可使平台或服务商系统识别到您的浏览器并捕捉和记忆信息。 "),
              vue.createElementVNode("view", { class: "sub-title" }, "第十五条 禁止Cookie之使用"),
              vue.createElementVNode("view", { class: "sub-content" }, " 大多数浏览器都预设为可以接受Cookies，用户可以选择将其浏览器设定为不接受Cookies，或一旦Cookies被安装就立即通知用户的模式。用户应当了解，若用户进行禁止Cookies的相关设定， 用户或许不能启动或使用平台的某些功能。 "),
              vue.createElementVNode("view", { class: "sub-title" }, "第十六条 信息使用用途"),
              vue.createElementVNode("view", { class: "sub-content" }, [
                vue.createTextVNode(" 平台为了以下目的或以下列方式使用平台收集的信息："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)通过平台向用户提供平台各项服务；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)当用户使用平台时，平台能够辨别及确认用户的身份；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)为了改善和提高平台服务质量（具体而言，根据平台收到的用户信息及反馈，帮助平台改善服务，进而平台可以更有效地对您的服务请求和支持需求做出回应）；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)统计平台使用量的数据和政府机关、事业单位等合作的数据分析；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (五)个性化用户体验（具体而言，用户的信息将帮助平台更好地为您的个性化需求作出回应）；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (六)交易处理（具体而言，个人信息，除了为完成用户所要求的交易之目的，未经您的同意不会以任何理由被出售、交换、转移，或提供给任何第三方公司）；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (七)定期发送电子邮件（具体而言，用户提供的电子邮件地址，将用于接收平台的新闻，更新，相关产品或服务的信息，和向用户发送公告和更新有关用户的订单）；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (八)满足MinerGlory用户服务协议规定的其它目的，和为了满足该等目的的所有合法途径。"),
                vue.createElementVNode("br")
              ]),
              vue.createElementVNode("view", { class: "sub-title" }, "第十七条 向第三方披露信息"),
              vue.createElementVNode("view", { class: "sub-content" }, " 平台不会向其他方出售、交易或以其它方式转让个人信息或允许其他方从我方平台收集、使用信息，但不包括以下其他方和以下信息：平台的关联方、帮助平台经营平台网站、开展业务、或者向用户提供服务的受信任的第三方，只要这些相关方同意将这些信息保密；平台向上述相关方披露信息时，平台所披露的信息应当是适当的，是遵守法律、法规、规章制度的或来自于法院或他主管当局的命令、执行平台策略，正常运行平台所需要，关联方提供服务所需或保护平台或他人的权利、财产或安全的，且上述披露不会被相关方用于营销，广告或非约定之用途。 "),
              vue.createElementVNode("view", { class: "sub-title" }, "第十八条 个人资料的保护"),
              vue.createElementVNode("view", { class: "sub-content" }, [
                vue.createTextVNode(" 第十八条平台实施妥善的实物、电子、管理及技术方面的措施来保护和保障用户个人资料的安全。平台尽力确保通过平台所收集的任何个人信息皆免于任何与我们无关的第三方的滋扰。平台采取的安全措施包括但不限于："),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (一)实物措施：存有用户个人信息的记录会被存放在有锁的地方；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (二)电子措施：存有用户个人信息的电脑数据会被存放在受严格登入限制的电脑系统和存储媒体上；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (三)管理措施：只有经平台授权的职员才能接触到您的个人信息, 这些职员需要遵守平台个人信息保密的内部守则；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(" (四)技术措施：可能采用如Secure Socket Layer Encryption这种加密技术来输送用户的个人信息；"),
                vue.createElementVNode("br"),
                vue.createTextVNode(' (五)其它措施：平台网络服务器受到"防火墙"的保护。 ')
              ]),
              vue.createElementVNode("view", { class: "sub-title" }, "第十九条 漏洞之通报"),
              vue.createElementVNode("view", { class: "sub-content" }, " 若用户知悉平台上有任何安全方面的漏洞，请立即通过服务邮箱联系平台， 使平台可以尽快采取妥适的行动进行弥补和更正。 "),
              vue.createElementVNode("view", { class: "sub-title" }, "第二十条 免责条款"),
              vue.createElementVNode("view", { class: "sub-content" }, " 尽管实施了本协议所述之技术和保安的措施，平台无法保证资料在互联网上的输送绝对安全，因此平台对用户提供给平台个人信息的安全不提供任何保证，且平台对任何因未经授权而接触用户个人信息所发生的事件一槪不承担任何赔偿责任。 "),
              vue.createElementVNode("view", { class: "sub-title" }, "第二十一条 本协议之修订"),
              vue.createElementVNode("view", { class: "sub-content" }, " 第二十一条平台保留随时修改本协议的权利。平台通过更新和发布新版本的生效日期通告用户平台对隐私政策进行了修改，并突出修订处。用户了解，有时平台会发布通知告诉用户本协议已修订，但这不是平台的义务。用户应当定期查看本协议并关注其修订情况，如果用户不同意修订的内容，用户应当停止立即访问平台。当本协议的更新版本发布，用户持续访问平台的行为即显示和表明用户同意本协议更新的内容，并同意遵守本协议更新后的版本。 "),
              vue.createElementVNode("view", { class: "sub-title" }, "第二十二条 与我们的沟通"),
              vue.createElementVNode("view", { class: "sub-content" }, " 如果用户有任何要求和意见，用户可以通过电子邮件support@minerglory.com，这是属于平台与用户沟通的唯一有效和官方电子邮件。平台对用户未使用有效的联系方式的联系后，平台没有义务进行回应也不承担责任。 "),
              vue.createElementVNode("view", { class: "sub-title" }, "第二十三条 公告的发布"),
              vue.createElementVNode("view", { class: "sub-content" }, " 平台只通过平台上的有效的联系方式发布公告和信息或在平台张贴公告，平台对由于用户信任了未通过以上方式获得的信息而产生的任何损失不承担责任。 ")
            ]),
            vue.createElementVNode("view", { class: "popup-btns" }, [
              vue.createVNode(_component_u_button, {
                type: "primary",
                onClick: _cache[4] || (_cache[4] = ($event) => $data.popup2Visible = false),
                shape: "circle",
                style: { "width": "100%", "margin-top": "32rpx" }
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("关闭")
                ]),
                _: 1
                /* STABLE */
              })
            ])
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"])
    ]);
  }
  const treaty = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-1cc6679a"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/components/doc/treaty.vue"]]);
  const _sfc_main$c = {
    components: { treaty },
    data() {
      return {
        form: {
          mobile: "",
          password: "",
          identity: ""
        },
        currentLoginType: "pwd",
        codeSending: false,
        codeSecond: 60,
        codeTimer: null,
        showGoogleModal: false,
        googleCode: "",
        userChromeStatus: 0,
        googleAuth: false,
        googleId: ""
      };
    },
    computed: {
      loginBtnDisabled() {
        if (this.currentLoginType === "pwd") {
          return !/^1[3456789]\d{9}$/.test(this.form.mobile) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.mobile) || !this.form.password;
        } else {
          return !/^1[3456789]\d{9}$/.test(this.form.mobile) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.mobile) || !this.form.identity;
        }
      }
    },
    onShow() {
      this.loadData();
    },
    methods: {
      goRegister() {
        uni.navigateTo({ url: "/pages/user/register" });
      },
      sendCode() {
        if (this.codeSending)
          return;
        this.$u.toast("验证码已发送");
        this.codeSending = true;
        this.codeSecond = 60;
        this.codeTimer = setInterval(() => {
          this.codeSecond--;
          if (this.codeSecond <= 0) {
            clearInterval(this.codeTimer);
            this.codeSending = false;
          }
        }, 1e3);
      },
      onBtnClick() {
        if (this.userChromeStatus == 0) {
          this.login();
        } else if (this.userChromeStatus == 1) {
          this.showGoogleModal = true;
        }
      },
      onGoogleConfirm() {
        if (!this.googleCode) {
          this.$u.toast("请输入谷歌验证码");
          return;
        }
        uni.request({
          url: "/api/blade-demo/usersafe/googleLogin",
          method: "GET",
          data: {
            id: this.googleId,
            code: this.googleCode
          },
          success: (res) => {
            if (res.data.code == 200) {
              this.login();
            } else {
              this.$u.toast("请检查谷歌二次验证码是否正确");
            }
          }
        });
      },
      login() {
        let params = {};
        let url2 = "";
        if (this.currentLoginType === "pwd") {
          params = {
            tenantId: "924188",
            username: this.form.mobile,
            password: md5(this.form.password)
          };
          url2 = "/api/blade-auth/oauth/token";
        } else {
          params = {
            tenantId: "924188",
            username: this.form.mobile,
            captcha: this.form.identity
          };
          url2 = "/api/blade-auth/oauth/telphone/token";
        }
        request({
          url: url2,
          method: "POST",
          params
        }).then((res) => {
          if (res.data.access_token) {
            setLocalStorage("token", res.data.token_type + " " + res.data.access_token);
            setLocalStorage("userId", res.data.user_id);
            this.$u.toast("登录成功");
            setTimeout(() => {
              uni.switchTab({ url: "/pages/home-page/home-page" });
            }, 500);
          } else {
            this.$u.toast("登录失败，请检查您的账号密码是否正确");
          }
        });
      },
      loadData() {
        const userId = getLocalStorage("userId");
        if (!userId)
          return;
        request({
          url: "/api/blade-demo/usersafe/detail",
          method: "GET",
          data: {
            userId
          },
          success: (res) => {
            this.googleId = res.data.data.id;
            this.userChromeStatus = res.data.data.userChromeStatus;
          }
        });
      }
    },
    onUnload() {
      if (this.codeTimer)
        clearInterval(this.codeTimer);
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_0$4);
    const _component_u_form_item = resolveEasycom(vue.resolveDynamicComponent("u-form-item"), __easycom_1$2);
    const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_2);
    const _component_u_form = resolveEasycom(vue.resolveDynamicComponent("u-form"), __easycom_4$1);
    const _component_treaty = vue.resolveComponent("treaty");
    const _component_u_modal = resolveEasycom(vue.resolveDynamicComponent("u-modal"), __easycom_3$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "page-container" }, [
      vue.createElementVNode("view", { class: "login-section" }, [
        vue.createElementVNode("view", { class: "top-tips" }, [
          vue.createElementVNode("view", { class: "title-tips-line-1" }, "登录"),
          vue.createElementVNode("view", { class: "title-tips-line-2" }, "Please enter your username and password")
        ]),
        vue.createVNode(_component_u_form, {
          model: $data.form,
          ref: "loginForm",
          "label-position": "top"
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_u_form_item, {
              label: "账号",
              prop: "mobile"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_u_input, {
                  modelValue: $data.form.mobile,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.form.mobile = $event),
                  placeholder: "请输入用户名/手机号/邮箱",
                  clearable: ""
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            }),
            $data.currentLoginType === "pwd" ? (vue.openBlock(), vue.createBlock(_component_u_form_item, {
              key: 0,
              label: "密码",
              prop: "password"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_u_input, {
                  modelValue: $data.form.password,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.form.password = $event),
                  placeholder: "请输入密码",
                  type: "password",
                  clearable: ""
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            })) : vue.createCommentVNode("v-if", true),
            $data.currentLoginType === "identity" ? (vue.openBlock(), vue.createBlock(_component_u_form_item, {
              key: 1,
              label: "验证码",
              prop: "identity"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_u_input, {
                  modelValue: $data.form.identity,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.form.identity = $event),
                  placeholder: "请输入验证码",
                  clearable: ""
                }, null, 8, ["modelValue"]),
                vue.createVNode(_component_u_button, {
                  type: "primary",
                  size: "mini",
                  onClick: $options.sendCode,
                  disabled: !$data.form.mobile || $data.codeSending,
                  style: { "margin-left": "16rpx" }
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(
                      vue.toDisplayString($data.codeSending ? $data.codeSecond + "s" : "获取验证码"),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["onClick", "disabled"])
              ]),
              _: 1
              /* STABLE */
            })) : vue.createCommentVNode("v-if", true)
          ]),
          _: 1
          /* STABLE */
        }, 8, ["model"]),
        vue.createElementVNode("view", { class: "login-btn" }, [
          vue.createVNode(_component_u_button, {
            type: "primary",
            disabled: $options.loginBtnDisabled,
            onClick: $options.onBtnClick,
            shape: "circle",
            style: { "width": "100%", "margin-top": "32rpx" }
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("立即登录")
            ]),
            _: 1
            /* STABLE */
          }, 8, ["disabled", "onClick"]),
          vue.createElementVNode("view", { style: { "margin-top": "32rpx" } }, [
            vue.createTextVNode(" 还没有账号？ "),
            vue.createElementVNode("text", {
              class: "register-link",
              onClick: _cache[3] || (_cache[3] = (...args) => $options.goRegister && $options.goRegister(...args))
            }, "立即注册")
          ])
        ]),
        vue.createCommentVNode(` <view class="login-type-switch">
        <text v-if="currentLoginType === 'pwd'" @click="currentLoginType = 'identity'">手机验证码登录</text>
        <text v-else @click="currentLoginType = 'pwd'">密码登录</text>
      </view> `)
      ]),
      vue.createVNode(_component_treaty, { class: "u-m-t-20" }),
      vue.createVNode(_component_u_modal, {
        modelValue: $data.showGoogleModal,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.showGoogleModal = $event),
        title: "请输入谷歌二次验证码",
        showCancelButton: "",
        onConfirm: $options.onGoogleConfirm
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_u_input, {
            modelValue: $data.googleCode,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.googleCode = $event),
            placeholder: "请输入谷歌验证码"
          }, null, 8, ["modelValue"])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue", "onConfirm"])
    ]);
  }
  const PagesUserLogin = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-6163e5ce"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/pages/user/login.vue"]]);
  const _sfc_main$b = {
    name: "u-verification-code",
    emits: ["start", "end", "change"],
    props: {
      // 倒计时总秒数
      seconds: {
        type: [String, Number],
        default: 60
      },
      // 尚未开始时提示
      startText: {
        type: String,
        default: "获取验证码"
      },
      // 正在倒计时中的提示
      changeText: {
        type: String,
        default: "X秒重新获取"
      },
      // 倒计时结束时的提示
      endText: {
        type: String,
        default: "重新获取"
      },
      // 是否在H5刷新或各端返回再进入时继续倒计时
      keepRunning: {
        type: Boolean,
        default: false
      },
      // 为了区分多个页面，或者一个页面多个倒计时组件本地存储的继续倒计时变了
      uniqueKey: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        secNum: this.seconds,
        timer: null,
        canGetCode: true
        // 是否可以执行验证码操作
      };
    },
    mounted() {
      this.checkKeepRunning();
    },
    watch: {
      seconds: {
        immediate: true,
        handler(n) {
          this.secNum = n;
        }
      }
    },
    methods: {
      checkKeepRunning() {
        let lastTimestamp = Number(uni.getStorageSync(this.uniqueKey + "_$uCountDownTimestamp"));
        if (!lastTimestamp)
          return this.changeEvent(this.startText);
        let nowTimestamp = Math.floor(+/* @__PURE__ */ new Date() / 1e3);
        if (this.keepRunning && lastTimestamp && lastTimestamp > nowTimestamp) {
          this.secNum = lastTimestamp - nowTimestamp;
          uni.removeStorageSync(this.uniqueKey + "_$uCountDownTimestamp");
          this.start();
        } else {
          this.changeEvent(this.startText);
        }
      },
      // 开始倒计时
      start() {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
        this.$emit("start");
        this.canGetCode = false;
        this.changeEvent(this.changeText.replace(/x|X/, this.secNum));
        this.setTimeToStorage();
        this.timer = setInterval(() => {
          if (--this.secNum) {
            this.changeEvent(this.changeText.replace(/x|X/, this.secNum));
          } else {
            clearInterval(this.timer);
            this.timer = null;
            this.changeEvent(this.endText);
            this.secNum = this.seconds;
            this.$emit("end");
            this.canGetCode = true;
          }
        }, 1e3);
      },
      // 重置，可以让用户再次获取验证码
      reset() {
        this.canGetCode = true;
        clearInterval(this.timer);
        this.secNum = this.seconds;
        this.changeEvent(this.endText);
      },
      changeEvent(text) {
        this.$emit("change", text);
      },
      // 保存时间戳，为了防止倒计时尚未结束，H5刷新或者各端的右上角返回上一页再进来
      setTimeToStorage() {
        if (!this.keepRunning || !this.timer)
          return;
        if (this.secNum > 0 && this.secNum <= this.seconds) {
          let nowTimestamp = Math.floor(+/* @__PURE__ */ new Date() / 1e3);
          uni.setStorage({
            key: this.uniqueKey + "_$uCountDownTimestamp",
            data: nowTimestamp + Number(this.secNum)
          });
        }
      }
    },
    // 组件销毁的时候，清除定时器，否则定时器会继续存在，系统不会自动清除
    beforeUnmount() {
      this.setTimeToStorage();
      clearTimeout(this.timer);
      this.timer = null;
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-code-wrap" }, [
      vue.createCommentVNode(" 此组件功能由js完成，无需写html逻辑 ")
    ]);
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-e434de51"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-verification-code/u-verification-code.vue"]]);
  const _sfc_main$a = {
    components: { treaty },
    data() {
      return {
        emailReg: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        form: {
          email: "",
          code: "",
          password: "",
          password2: ""
        },
        codeSecond: 60,
        codeTimer: null,
        tips: ""
      };
    },
    computed: {
      loginBtnDisabled() {
        return !this.emailReg.test(this.form.email) || !this.form.code || !this.form.password || !this.form.password2 || this.form.password !== this.form.password2;
      }
    },
    methods: {
      goLogin() {
        uni.navigateTo({ url: "/pages/user/login" });
      },
      /**
       * 发送验证码
       */
      onSendCode() {
        uni.showLoading({
          title: "正在获取验证码"
        });
        request({
          method: "get",
          url: "/api/blade-user/sendEmailCode",
          data: {
            emailaddress: this.form.email
          }
        }).then((res) => {
          uni.hideLoading();
          if (res.data.code == 200) {
            this.$u.toast("验证码已发送");
            this.$refs.uCode.start();
          }
          if (res.data.code == 400) {
            this.$u.toast(res.data.msg);
          }
        });
      },
      codeChange(text) {
        this.tips = text;
      },
      sendCode() {
        if (!this.emailReg.test(this.form.email)) {
          this.$u.toast("请输入正确的邮箱");
          return;
        }
        if (this.$refs.uCode.canGetCode) {
          this.onSendCode();
        }
      },
      register() {
        request({
          method: "POST",
          url: "/api/blade-user/regist",
          data: {
            $tenantId: "",
            $userType: "前台用户",
            deptId: "1364412325448151042",
            deptName: "",
            postId: "1364412325536231426",
            roleId: "1364424903813525505",
            roleName: "",
            tenantId: "924188",
            tenantName: "",
            userType: 2,
            userTypeName: "",
            account: this.form.email,
            name: this.form.email,
            password: md5(this.form.password),
            password2: md5(this.form.password2),
            realName: this.form.email,
            statusName: "",
            phone: "",
            email: this.form.email,
            captcha: this.form.code
          }
        }).then((res) => {
          if (res.data && res.data.code == 200) {
            this.$u.toast("注册成功");
            setTimeout(() => {
              uni.navigateTo({ url: "/pages/user/login" });
            }, 500);
          } else {
            this.$u.toast(res.data && res.data.msg ? res.data.msg : "注册失败");
          }
        }).catch((error) => {
          this.$u.toast(error.msg || "注册失败");
        });
      }
    },
    onUnload() {
      if (this.codeTimer)
        clearInterval(this.codeTimer);
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_0$4);
    const _component_u_form_item = resolveEasycom(vue.resolveDynamicComponent("u-form-item"), __easycom_1$2);
    const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_2);
    const _component_u_verification_code = resolveEasycom(vue.resolveDynamicComponent("u-verification-code"), __easycom_3);
    const _component_u_form = resolveEasycom(vue.resolveDynamicComponent("u-form"), __easycom_4$1);
    const _component_treaty = vue.resolveComponent("treaty");
    return vue.openBlock(), vue.createElementBlock("view", { class: "page-container" }, [
      vue.createElementVNode("view", { class: "login-section" }, [
        vue.createElementVNode("view", { class: "top-tips" }, [
          vue.createElementVNode("view", { class: "title-tips-line-1" }, "注册"),
          vue.createElementVNode("view", { class: "title-tips-line-2" }, "Fill in the information to register an account")
        ]),
        vue.createVNode(_component_u_form, {
          model: $data.form,
          ref: "registerForm",
          "label-position": "top"
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_u_form_item, {
              label: "注册邮箱",
              prop: "email"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_u_input, {
                  modelValue: $data.form.email,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.form.email = $event),
                  placeholder: "请输入邮箱",
                  clearable: ""
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createCommentVNode(' <view class="login-drag-box">\n          <drag ref="drag" :email="form.email" @send="send"></drag>\n        </view> '),
            vue.createVNode(_component_u_form_item, {
              label: "验证码",
              prop: "code"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_u_input, {
                  modelValue: $data.form.code,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.form.code = $event),
                  placeholder: "请输入邮箱验证码",
                  clearable: ""
                }, null, 8, ["modelValue"]),
                vue.createVNode(_component_u_button, {
                  size: "mini",
                  onClick: $options.sendCode,
                  disabled: !$data.form.email,
                  style: { "margin-left": "16rpx" }
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(
                      vue.toDisplayString($data.tips || "获取验证码"),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["onClick", "disabled"]),
                vue.createVNode(_component_u_verification_code, {
                  ref: "uCode",
                  onChange: $options.codeChange
                }, null, 8, ["onChange"])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_u_form_item, {
              label: "登录密码",
              prop: "password"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_u_input, {
                  modelValue: $data.form.password,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.form.password = $event),
                  placeholder: "请设置登录密码",
                  type: "password",
                  clearable: ""
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_u_form_item, {
              label: "确认登录密码",
              prop: "password2"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_u_input, {
                  modelValue: $data.form.password2,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.form.password2 = $event),
                  placeholder: "请确认登录密码",
                  type: "password",
                  clearable: ""
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        }, 8, ["model"]),
        vue.createElementVNode("view", { class: "login-btn" }, [
          vue.createVNode(_component_u_button, {
            type: "primary",
            disabled: $options.loginBtnDisabled,
            onClick: $options.register,
            shape: "circle",
            style: { "width": "100%", "margin-top": "32rpx" }
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("注册")
            ]),
            _: 1
            /* STABLE */
          }, 8, ["disabled", "onClick"]),
          vue.createElementVNode("view", { style: { "margin-top": "32rpx" } }, [
            vue.createTextVNode(" 已有账号？ "),
            vue.createElementVNode("text", {
              class: "register-link",
              onClick: _cache[4] || (_cache[4] = (...args) => $options.goLogin && $options.goLogin(...args))
            }, "去登录")
          ])
        ])
      ]),
      vue.createVNode(_component_treaty, { class: "u-m-t-20" })
    ]);
  }
  const PagesUserRegister = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-fd534bf9"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/pages/user/register.vue"]]);
  const _sfc_main$9 = {
    data() {
      return {
        mySummary: {},
        userChromeStatus: "",
        showLogout: false
      };
    },
    computed: {
      avatarUrl() {
        return this.mySummary.avatar || "/static/image/my/man.svg";
      }
    },
    onShow() {
      this.loadMySummary();
      this.loadData();
    },
    methods: {
      goTo(url2) {
        uni.navigateTo({ url: url2 });
      },
      loadMySummary() {
        request({
          method: "GET",
          url: "/api/blade-user/info",
          data: {
            id: getLocalStorage("userId")
          }
        }).then((res) => {
          this.mySummary = res.data.data;
        });
      },
      loadData() {
        request({
          method: "GET",
          url: "/api/blade-demo/usersafe/detail",
          data: {
            userId: getLocalStorage("userId")
          }
        }).then((res) => {
          this.userChromeStatus = res.data.data.userChromeStatus;
        });
      },
      exit() {
        request({
          method: "GET",
          url: "/api/blade-auth/oauth/logout"
        }).then(() => {
          deleteLocalStorage("token");
          deleteLocalStorage("userId");
          this.$u.toast("已退出登录");
          setTimeout(() => {
            uni.reLaunch({ url: "/pages/user/login" });
          }, 500);
        });
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_avatar = resolveEasycom(vue.resolveDynamicComponent("u-avatar"), __easycom_0$5);
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$7);
    const _component_u_cell_item = resolveEasycom(vue.resolveDynamicComponent("u-cell-item"), __easycom_2$1);
    const _component_u_cell_group = resolveEasycom(vue.resolveDynamicComponent("u-cell-group"), __easycom_3$2);
    const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_2);
    const _component_u_modal = resolveEasycom(vue.resolveDynamicComponent("u-modal"), __easycom_3$1);
    return $data.mySummary ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "page-container"
    }, [
      vue.createElementVNode("view", { class: "info" }, [
        vue.createElementVNode("view", { class: "l-s" }, [
          vue.createVNode(_component_u_avatar, {
            src: $options.avatarUrl,
            size: "large"
          }, null, 8, ["src"]),
          vue.createElementVNode("view", { class: "text" }, [
            vue.createCommentVNode(" 昵称 "),
            vue.createElementVNode(
              "view",
              { class: "line-1" },
              vue.toDisplayString($data.mySummary.name),
              1
              /* TEXT */
            ),
            vue.createCommentVNode(" 手机号 "),
            vue.createElementVNode(
              "view",
              { class: "line-2" },
              vue.toDisplayString($data.mySummary.phone),
              1
              /* TEXT */
            )
          ])
        ]),
        vue.createElementVNode("view", { class: "r-s" }, [
          vue.createVNode(_component_u_icon, {
            name: "setting",
            size: "36",
            onClick: _cache[0] || (_cache[0] = ($event) => $options.goTo("/pages/my/mySettingNickname"))
          })
        ])
      ]),
      vue.createVNode(_component_u_cell_group, {
        border: false,
        class: "card-view"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_u_cell_item, {
            title: "登录帐号",
            isLink: "",
            onClick: _cache[1] || (_cache[1] = ($event) => $options.goTo("/pages/my/mySettingName"))
          }),
          vue.createVNode(_component_u_cell_item, {
            title: "绑定邮箱",
            isLink: "",
            onClick: _cache[2] || (_cache[2] = ($event) => $options.goTo("/pages/my/mySettingEmail"))
          }),
          vue.createVNode(_component_u_cell_item, {
            "border-bottom": false,
            title: "修改密码",
            isLink: "",
            onClick: _cache[3] || (_cache[3] = ($event) => $options.goTo("/pages/my/mySettingResetPwd"))
          })
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createElementVNode("view", { class: "exit-btn-wrap" }, [
        vue.createVNode(_component_u_button, {
          class: "exit-btn",
          type: "error",
          shape: "circle",
          onClick: _cache[4] || (_cache[4] = ($event) => $data.showLogout = true)
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode("退出登录")
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      vue.createVNode(_component_u_modal, {
        modelValue: $data.showLogout,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.showLogout = $event),
        title: "提示",
        content: "确认退出?",
        onConfirm: $options.exit,
        showCancelButton: ""
      }, null, 8, ["modelValue", "onConfirm"])
    ])) : vue.createCommentVNode("v-if", true);
  }
  const PagesMyUserSettingUserSetting = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-11d792d4"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/pages/my/user-setting/user-setting.vue"]]);
  const _sfc_main$8 = {
    name: "u-numberbox",
    emits: ["update:modelValue", "input", "change", "blur", "plus", "minus"],
    props: {
      // 预显示的数字
      value: {
        type: Number,
        default: 1
      },
      modelValue: {
        type: Number,
        default: 1
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: "#F2F3F5"
      },
      // 最小值
      min: {
        type: Number,
        default: 0
      },
      // 最大值
      max: {
        type: Number,
        default: 99999
      },
      // 步进值，每次加或减的值
      step: {
        type: Number,
        default: 1
      },
      // 步进值，首次增加或最后减的值
      stepFirst: {
        type: Number,
        default: 0
      },
      // 是否只能输入 step 的倍数
      stepStrictly: {
        type: Boolean,
        default: false
      },
      // 是否禁用加减操作
      disabled: {
        type: Boolean,
        default: false
      },
      // input的字体大小，单位rpx
      size: {
        type: [Number, String],
        default: 26
      },
      // 加减图标的颜色
      color: {
        type: String,
        default: "#323233"
      },
      // input宽度，单位rpx
      inputWidth: {
        type: [Number, String],
        default: 80
      },
      // input高度，单位rpx
      inputHeight: {
        type: [Number, String],
        default: 50
      },
      // index索引，用于列表中使用，让用户知道是哪个numberbox发生了变化，一般使用for循环出来的index值即可
      index: {
        type: [Number, String],
        default: ""
      },
      // 是否禁用输入框，与disabled作用于输入框时，为OR的关系，即想要禁用输入框，又可以加减的话
      // 设置disabled为false，disabledInput为true即可
      disabledInput: {
        type: Boolean,
        default: false
      },
      // 输入框于键盘之间的距离
      cursorSpacing: {
        type: [Number, String],
        default: 100
      },
      // 是否开启长按连续递增或递减
      longPress: {
        type: Boolean,
        default: true
      },
      // 开启长按触发后，每触发一次需要多久
      pressTime: {
        type: [Number, String],
        default: 250
      },
      // 是否只能输入大于或等于0的整数(正整数)
      positiveInteger: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      valueCom(v1, v2) {
        if (!this.changeFromInner) {
          this.inputVal = v1;
          this.$nextTick(function() {
            this.changeFromInner = false;
          });
        }
      },
      inputVal(v1, v2) {
        if (v1 == "")
          return;
        let value = 0;
        let tmp = this.isNumber(v1);
        if (tmp && v1 >= this.min && v1 <= this.max)
          value = v1;
        else
          value = v2;
        if (this.positiveInteger) {
          if (v1 < 0 || String(v1).indexOf(".") !== -1) {
            value = v2;
            this.$nextTick(() => {
              this.inputVal = v2;
            });
          }
        }
        this.handleChange(value, "change");
      },
      min(v1) {
        if (v1 !== void 0 && v1 != "" && this.valueCom < v1) {
          this.$emit("input", v1);
        }
      },
      max(v1) {
        if (v1 !== void 0 && v1 != "" && this.valueCom > v1) {
          this.$emit("input", v1);
        }
      }
    },
    data() {
      return {
        inputVal: 1,
        // 输入框中的值，不能直接使用props中的value，因为应该改变props的状态
        timer: null,
        // 用作长按的定时器
        changeFromInner: false,
        // 值发生变化，是来自内部还是外部
        innerChangeTimer: null
        // 内部定时器
      };
    },
    created() {
      this.inputVal = Number(this.valueCom);
    },
    mounted() {
    },
    computed: {
      getCursorSpacing() {
        return Number(uni.upx2px(this.cursorSpacing));
      },
      valueCom() {
        return this.modelValue;
      }
    },
    methods: {
      // 点击退格键
      btnTouchStart(callback) {
        this[callback]();
        if (!this.longPress)
          return;
        clearInterval(this.timer);
        this.timer = null;
        this.timer = setInterval(() => {
          this[callback]();
        }, this.pressTime);
      },
      clearTimer() {
        this.$nextTick(() => {
          clearInterval(this.timer);
          this.timer = null;
        });
      },
      minus() {
        this.computeVal("minus");
      },
      plus() {
        this.computeVal("plus");
      },
      // 为了保证小数相加减出现精度溢出的问题
      calcPlus(num1, num2) {
        let baseNum, baseNum1, baseNum2;
        try {
          baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
          baseNum1 = 0;
        }
        try {
          baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
          baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        let precision = baseNum1 >= baseNum2 ? baseNum1 : baseNum2;
        return ((num1 * baseNum + num2 * baseNum) / baseNum).toFixed(precision);
      },
      // 为了保证小数相加减出现精度溢出的问题
      calcMinus(num1, num2) {
        let baseNum, baseNum1, baseNum2;
        try {
          baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
          baseNum1 = 0;
        }
        try {
          baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
          baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        let precision = baseNum1 >= baseNum2 ? baseNum1 : baseNum2;
        return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
      },
      computeVal(type2) {
        uni.hideKeyboard();
        if (this.disabled)
          return;
        let value = 0;
        if (type2 === "minus") {
          if (this.stepFirst > 0 && this.inputVal == this.stepFirst) {
            value = this.min;
          } else {
            value = this.calcMinus(this.inputVal, this.step);
          }
        } else if (type2 === "plus") {
          if (this.stepFirst > 0 && this.inputVal < this.stepFirst) {
            value = this.stepFirst;
          } else {
            value = this.calcPlus(this.inputVal, this.step);
          }
        }
        if (this.stepStrictly) {
          let strictly = value % this.step;
          if (strictly > 0) {
            value -= strictly;
          }
          if (this.stepFirst > 0 && value > 0 && value < this.stepFirst) {
            if (type2 === "minus") {
              value = 0;
            } else if (type2 === "plus") {
              value = this.stepFirst + (this.step - this.stepFirst % this.step);
            }
          }
        }
        if (value > this.max) {
          value = this.max;
        } else if (value < this.min) {
          value = this.min;
        }
        this.inputVal = value;
        this.handleChange(value, type2);
      },
      // 处理用户手动输入的情况
      onBlur(event) {
        let val = 0;
        let value = event.detail.value;
        if (!/(^\d+$)/.test(value) || value[0] == 0)
          val = this.min;
        val = +value;
        if (this.stepFirst > 0 && this.inputVal < this.stepFirst && this.inputVal > 0) {
          val = this.stepFirst;
        }
        if (this.stepStrictly) {
          let strictly = val % this.step;
          if (strictly > 0) {
            val -= strictly;
          }
          if (this.stepFirst > 0 && val > 0 && val < this.stepFirst) {
            val = this.stepFirst + (this.step - this.stepFirst % this.step);
          }
        }
        if (val > this.max) {
          val = this.max;
        } else if (val < this.min) {
          val = this.min;
        }
        this.$nextTick(() => {
          this.inputVal = val;
        });
        this.handleChange(val, "blur");
      },
      handleChange(value, type2) {
        if (this.disabled)
          return;
        if (this.innerChangeTimer) {
          clearTimeout(this.innerChangeTimer);
          this.innerChangeTimer = null;
        }
        this.changeFromInner = true;
        this.innerChangeTimer = setTimeout(() => {
          this.changeFromInner = false;
        }, 150);
        this.$emit("input", Number(value));
        this.$emit("update:modelValue", Number(value));
        this.$emit(type2, {
          // 转为Number类型
          value: Number(value),
          index: this.index
        });
      },
      /**
       * 验证十进制数字
       */
      isNumber(value) {
        return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-numberbox" }, [
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["u-icon-minus", { "u-icon-disabled": $props.disabled || $data.inputVal <= $props.min }]),
          onTouchstart: _cache[0] || (_cache[0] = vue.withModifiers(($event) => $options.btnTouchStart("minus"), ["prevent"])),
          onTouchend: _cache[1] || (_cache[1] = vue.withModifiers((...args) => $options.clearTimer && $options.clearTimer(...args), ["stop", "prevent"])),
          style: vue.normalizeStyle({
            background: $props.bgColor,
            height: $props.inputHeight + "rpx",
            color: $props.color,
            fontSize: $props.size + "rpx",
            minHeight: "1.4em"
          })
        },
        [
          vue.createElementVNode(
            "view",
            {
              style: vue.normalizeStyle("font-size:" + (Number($props.size) + 10) + "rpx"),
              class: "num-btn"
            },
            "－",
            4
            /* STYLE */
          )
        ],
        38
        /* CLASS, STYLE, NEED_HYDRATION */
      ),
      vue.withDirectives(vue.createElementVNode("input", {
        disabled: $props.disabledInput || $props.disabled,
        "cursor-spacing": $options.getCursorSpacing,
        class: vue.normalizeClass([{ "u-input-disabled": $props.disabled }, "u-number-input"]),
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.inputVal = $event),
        onBlur: _cache[3] || (_cache[3] = (...args) => $options.onBlur && $options.onBlur(...args)),
        type: "number",
        style: vue.normalizeStyle({
          color: $props.color,
          fontSize: $props.size + "rpx",
          background: $props.bgColor,
          height: $props.inputHeight + "rpx",
          width: $props.inputWidth + "rpx"
        })
      }, null, 46, ["disabled", "cursor-spacing"]), [
        [vue.vModelText, $data.inputVal]
      ]),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["u-icon-plus", { "u-icon-disabled": $props.disabled || $data.inputVal >= $props.max }]),
          onTouchstart: _cache[4] || (_cache[4] = vue.withModifiers(($event) => $options.btnTouchStart("plus"), ["prevent"])),
          onTouchend: _cache[5] || (_cache[5] = vue.withModifiers((...args) => $options.clearTimer && $options.clearTimer(...args), ["stop", "prevent"])),
          style: vue.normalizeStyle({
            background: $props.bgColor,
            height: $props.inputHeight + "rpx",
            color: $props.color,
            fontSize: $props.size + "rpx",
            minHeight: "1.4em"
          })
        },
        [
          vue.createElementVNode(
            "view",
            {
              style: vue.normalizeStyle("font-size:" + (Number($props.size) + 10) + "rpx"),
              class: "num-btn"
            },
            "＋",
            4
            /* STYLE */
          )
        ],
        38
        /* CLASS, STYLE, NEED_HYDRATION */
      )
    ]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-2bb8fbb0"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-number-box/u-number-box.vue"]]);
  const _sfc_main$7 = {
    name: "u-checkbox",
    emits: ["update:modelValue", "input", "change"],
    props: {
      // 是否为选中状态
      value: {
        type: Boolean,
        default: false
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      // checkbox的名称
      name: {
        type: [String, Number],
        default: ""
      },
      // 形状，square为方形，circle为圆型
      shape: {
        type: String,
        default: ""
      },
      // 是否禁用
      disabled: {
        type: [String, Boolean],
        default: ""
      },
      // 是否禁止点击提示语选中复选框
      labelDisabled: {
        type: [String, Boolean],
        default: ""
      },
      // 选中状态下的颜色，如设置此值，将会覆盖checkboxGroup的activeColor值
      activeColor: {
        type: String,
        default: ""
      },
      // 图标的大小，单位rpx
      iconSize: {
        type: [String, Number],
        default: ""
      },
      // label的字体大小，rpx单位
      labelSize: {
        type: [String, Number],
        default: ""
      },
      // 组件的整体大小
      size: {
        type: [String, Number],
        default: ""
      },
      // 设置不确定状态，仅负责样式控制
      indeterminate: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        parentDisabled: false,
        newParams: {},
        parent: null
      };
    },
    created() {
      this.parent = this.$u.$parent.call(this, "u-checkbox-group");
      this.parent && this.parent.children.push(this);
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      // 是否禁用，如果父组件u-checkbox-group禁用的话，将会忽略子组件的配置
      isDisabled() {
        return this.disabled !== "" ? this.disabled : this.parent ? this.parent.disabled : false;
      },
      // 是否禁用label点击
      isLabelDisabled() {
        return this.labelDisabled !== "" ? this.labelDisabled : this.parent ? this.parent.labelDisabled : false;
      },
      // 组件尺寸，对应size的值，默认值为34rpx
      checkboxSize() {
        return this.size ? this.size : this.parent ? this.parent.size : 34;
      },
      // 组件的勾选图标的尺寸，默认20
      checkboxIconSize() {
        return this.iconSize ? this.iconSize : this.parent ? this.parent.iconSize : 20;
      },
      // 组件选中激活时的颜色
      elActiveColor() {
        return this.activeColor ? this.activeColor : this.parent ? this.parent.activeColor : "primary";
      },
      // 组件的形状
      elShape() {
        return this.shape ? this.shape : this.parent ? this.parent.shape : "square";
      },
      iconStyle() {
        let style = {};
        if (this.elActiveColor && this.valueCom && !this.isDisabled) {
          style.borderColor = this.elActiveColor;
          style.backgroundColor = this.elActiveColor;
        }
        style.width = this.$u.addUnit(this.checkboxSize);
        style.height = this.$u.addUnit(this.checkboxSize);
        return style;
      },
      // checkbox内部的勾选图标，如果选中状态，为白色，否则为透明色即可
      iconColor() {
        if (this.indeterminate)
          return "#ffffff";
        return this.valueCom ? "#ffffff" : "transparent";
      },
      iconClass() {
        let classes = [];
        classes.push("u-checkbox__icon-wrap--" + this.elShape);
        if (this.valueCom == true)
          classes.push("u-checkbox__icon-wrap--checked");
        if (this.isDisabled)
          classes.push("u-checkbox__icon-wrap--disabled");
        if (this.valueCom && this.isDisabled)
          classes.push("u-checkbox__icon-wrap--disabled--checked");
        if (this.indeterminate === true)
          classes.push("u-checkbox__icon-wrap--indeterminate");
        return classes.join(" ");
      },
      checkboxStyle() {
        let style = {};
        if (this.parent && this.parent.width) {
          style.width = this.parent.width;
          style.flex = `0 0 ${this.parent.width}`;
        }
        if (this.parent && this.parent.wrap) {
          style.width = "100%";
          style.flex = "0 0 100%";
        }
        return style;
      }
    },
    mounted() {
      this._emitEvent();
    },
    watch: {
      valueCom: {
        handler: function(newVal, oldVal) {
          this._emitEvent();
        }
      }
    },
    methods: {
      _emitEvent() {
        let value = this.valueCom;
        let obj = {
          value,
          name: this.name
        };
        if (this.parent && this.parent.emitEvent)
          this.parent.emitEvent(obj);
      },
      onClickLabel() {
        if (!this.isLabelDisabled && !this.isDisabled) {
          this.setValue();
        }
      },
      toggle() {
        if (!this.isDisabled) {
          this.setValue();
        }
      },
      emitEvent() {
        let obj = {
          value: !this.valueCom,
          name: this.name
        };
        this.$emit("change", obj);
        if (this.parent && this.parent.emitEvent)
          this.parent.emitEvent(obj);
      },
      // 设置input的值，这里通过input事件，设置通过v-model绑定的组件的值
      setValue() {
        let value = this.valueCom;
        let checkedNum = 0;
        if (this.parent && this.parent.children) {
          this.parent.children.map((val) => {
            if (val.value)
              checkedNum++;
          });
        }
        if (value == true) {
          this.emitEvent();
          this.$emit("input", !value);
          this.$emit("update:modelValue", !value);
        } else {
          if (this.parent && checkedNum >= this.parent.max) {
            return this.$u.toast(`最多可选${this.parent.max}项`);
          }
          this.emitEvent();
          this.$emit("input", !value);
          this.$emit("update:modelValue", !value);
        }
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-checkbox",
        style: vue.normalizeStyle([$options.checkboxStyle])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["u-checkbox__icon-wrap", [$options.iconClass]]),
            onClick: _cache[0] || (_cache[0] = (...args) => $options.toggle && $options.toggle(...args)),
            style: vue.normalizeStyle([$options.iconStyle])
          },
          [
            $props.indeterminate ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
              key: 0,
              class: "u-checkbox__icon-wrap__icon",
              name: "minus",
              size: $options.checkboxIconSize,
              color: $options.iconColor
            }, null, 8, ["size", "color"])) : (vue.openBlock(), vue.createBlock(_component_u_icon, {
              key: 1,
              class: "u-checkbox__icon-wrap__icon",
              name: "checkbox-mark",
              size: $options.checkboxIconSize,
              color: $options.iconColor
            }, null, 8, ["size", "color"]))
          ],
          6
          /* CLASS, STYLE */
        ),
        vue.createElementVNode(
          "view",
          {
            class: "u-checkbox__label",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.onClickLabel && $options.onClickLabel(...args)),
            style: vue.normalizeStyle({
              fontSize: _ctx.$u.addUnit($props.labelSize)
            })
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ],
          4
          /* STYLE */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-cafae08d"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-checkbox/u-checkbox.vue"]]);
  const _sfc_main$6 = {
    name: "u-toast",
    props: {
      // z-index值
      zIndex: {
        type: [Number, String],
        default: ""
      }
    },
    data() {
      return {
        isShow: false,
        timer: null,
        // 定时器
        config: {
          params: {},
          // URL跳转的参数，对象
          title: "",
          // 显示文本
          type: "",
          // 主题类型，primary，success，error，warning，black
          duration: 2e3,
          // 显示的时间，毫秒
          isTab: false,
          // 是否跳转tab页面
          url: "",
          // toast消失后是否跳转页面，有则跳转，优先级高于back参数
          icon: true,
          // 显示的图标
          position: "center",
          // toast出现的位置
          callback: null,
          // 执行完后的回调函数
          back: false
          // 结束toast是否自动返回上一页
        },
        tmpConfig: {}
        // 将用户配置和内置配置合并后的临时配置变量
      };
    },
    computed: {
      iconName() {
        if (["error", "warning", "success", "info"].indexOf(this.tmpConfig.type) >= 0 && this.tmpConfig.icon) {
          let icon = this.$u.type2icon(this.tmpConfig.type);
          return icon;
        }
      },
      uZIndex() {
        return this.isShow ? this.zIndex ? this.zIndex : this.$u.zIndex.toast : "999999";
      }
    },
    methods: {
      // 显示toast组件，由父组件通过this.$refs.xxx.show(options)形式调用
      show(options) {
        this.tmpConfig = this.$u.deepMerge(this.config, options);
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        this.isShow = true;
        this.timer = setTimeout(() => {
          this.isShow = false;
          clearTimeout(this.timer);
          this.timer = null;
          typeof this.tmpConfig.callback === "function" && this.tmpConfig.callback();
          this.timeEnd();
        }, this.tmpConfig.duration);
      },
      // 隐藏toast组件，由父组件通过this.$refs.xxx.hide()形式调用
      hide() {
        this.isShow = false;
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
      },
      // 倒计时结束之后，进行的一些操作
      timeEnd() {
        if (this.tmpConfig.url) {
          if (this.tmpConfig.url[0] != "/")
            this.tmpConfig.url = "/" + this.tmpConfig.url;
          if (Object.keys(this.tmpConfig.params).length) {
            let query = "";
            if (/.*\/.*\?.*=.*/.test(this.tmpConfig.url)) {
              query = this.$u.queryParams(this.tmpConfig.params, false);
              this.tmpConfig.url = this.tmpConfig.url + "&" + query;
            } else {
              query = this.$u.queryParams(this.tmpConfig.params);
              this.tmpConfig.url += query;
            }
          }
          if (this.tmpConfig.isTab) {
            uni.switchTab({
              url: this.tmpConfig.url
            });
          } else {
            uni.navigateTo({
              url: this.tmpConfig.url
            });
          }
        } else if (this.tmpConfig.back) {
          this.$u.route({
            type: "back"
          });
        }
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-toast", [$data.isShow ? "u-show" : "", "u-type-" + $data.tmpConfig.type, "u-position-" + $data.tmpConfig.position]]),
        style: vue.normalizeStyle({
          zIndex: $options.uZIndex
        })
      },
      [
        vue.createElementVNode("view", { class: "u-icon-wrap" }, [
          $data.tmpConfig.icon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
            key: 0,
            class: "u-icon",
            name: $options.iconName,
            size: 30,
            color: $data.tmpConfig.type
          }, null, 8, ["name", "color"])) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode(
          "text",
          { class: "u-text" },
          vue.toDisplayString($data.tmpConfig.title),
          1
          /* TEXT */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-dcb3ce67"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-toast/u-toast.vue"]]);
  const _sfc_main$5 = {
    data() {
      return {
        popupVisible: false
      };
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_2);
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "treaty-container" }, [
      vue.createElementVNode("view", { class: "treaty-tips" }, [
        vue.createTextVNode(" 我接受 "),
        vue.createElementVNode("text", {
          class: "link",
          onClick: _cache[0] || (_cache[0] = ($event) => $data.popupVisible = true)
        }, "《MinerGlory矿机代购及托管服务协议》")
      ]),
      vue.createVNode(_component_u_popup, {
        modelValue: $data.popupVisible,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.popupVisible = $event),
        mode: "center",
        "border-radius": "16",
        "mask-close-able": true
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("scroll-view", {
            "scroll-y": "",
            class: "pop-box"
          }, [
            vue.createElementVNode("view", { class: "title" }, "《矿机代购及托管服务协议》"),
            vue.createElementVNode("view", { class: "content" }, " 甲乙双方本着平等自愿原则，就矿机代购及托管服务达成一致意见，协议如下。 "),
            vue.createElementVNode("view", { class: "content" }, " 1、甲方委托乙方代购比特币运算服务器（下称矿机），关于本批次矿机的采购型号、数量、单价和金额等详情，参见附件。 "),
            vue.createElementVNode("view", { class: "content" }, " 2、甲方同意乙方将矿机安装在乙方指定的云服务机房，并委托乙方提供云计算技术服务和矿机运行托管服务。托管服务开始日期由安装生产日期由矿机发货情况决定。 "),
            vue.createElementVNode("view", { class: "content" }, " 3、乙方应提供专业技术及管理人员、电力设施配套、宽带网络配套、安全监控、服务器等服务，保证矿机的稳定运行。 "),
            vue.createElementVNode("view", { class: "content" }, " 4、甲方拥有矿机的所有权，享有矿机产出收益，并同意通过产出比特币支付乙方托管服务费，托管服务费根据甲方托管矿机的台数越多享有一定的折扣，具体参见附件。托管服务期间，甲方矿机所消耗电费由甲方承担。 "),
            vue.createElementVNode("view", { class: "content" }, [
              vue.createTextVNode(" 5、矿机产出比特币将每周结算一次，乙方将甲方矿机的净产出比特币支付到甲方指定的比特币地址。甲方亦可选择乙方将比特币卖出换成人民币支付给甲方。 "),
              vue.createElementVNode("view", null, " 甲方净收益（比特币）：矿机产出比特币 – 托管服务费 "),
              vue.createElementVNode("view", null, " 如甲方选择电费从比特币扣除的再减去相应的电费。 ")
            ]),
            vue.createElementVNode("view", { class: "content" }, " 6、甲方在矿机连续30天产出不足以支付电费，或电费占产出比例较高且有更合适的新矿机时，有权结束托管，并发起清算，清算方式由双方协商解决。 "),
            vue.createElementVNode("view", { class: "content" }, " 7、在托管期间，甲方可退出托管，3年内退出托管甲方收取矿机市场价值以及产币价值之和相比初期投入溢价的20%作为手续费（如无溢价不收取费用）。3年后转让不收取手续费，手续费以比特币支付。甲乙双方协商一致退出除外。 "),
            vue.createElementVNode("view", { class: "content" }, " 8、在乙方矿机投入回本前，托管服务费按照实际产币量5%收取，乙方回本后按照除去电费后净利润的20%收取。 "),
            vue.createElementVNode("view", { class: "content" }, [
              vue.createTextVNode(" 9、甲方知晓比特币矿机及比特币行业的以下风险，并自愿承担可能导致的损失： "),
              vue.createElementVNode("view", null, " a)比特币行业存在监管风险，比特币价格可能发生暴涨暴跌。 "),
              vue.createElementVNode("view", null, " b)比特币全网算力可能发生大幅增长，使得矿机产出大幅下降。 "),
              vue.createElementVNode("view", null, " c)矿机有运行损坏、意外事故损坏、运输途中损坏丢失的风险。 "),
              vue.createElementVNode("view", null, " d)矿场可能存在停电、断网等意外事故，导致矿机停机的风险。 "),
              vue.createTextVNode(" 乙方应积极采取措施减少损失，并向甲方提交风险或意外的详细情况和相关凭证依据，尽快恢复矿机的正常运行。 ")
            ]),
            vue.createElementVNode("view", { class: "content" }, " 10、争议解决：执行本协议发生争执时，由当事人协商解决；协商不成，双方同意向乙方所在地人民法院提起诉讼。 "),
            vue.createElementVNode("view", { class: "content" }, " 11、不可抗力：任何一方遇有不可抗力而全部或部分不能履行本合同或迟延履行本合同，应自不可抗力事件发生之日起三日内，将事件情况以书面形式通知另一方，并于事件发生之日起二十日内，向另一方提交导致其全部或部分不能履行或迟延履行的证明。 "),
            vue.createElementVNode("view", { class: "content" }, " 12、本协议附件是协议的一部分，双方协商后可再约定补充协议。电子邮件、微信聊天记录确认均可作为本协议补充内容。 "),
            vue.createElementVNode("view", { class: "content" }, " 13、本协议一式贰份，双方各执壹份。本协议扫描、影印或电子版均具有同等法律效力。 "),
            vue.createElementVNode("view", { class: "popup-btns" }, [
              vue.createVNode(_component_u_button, {
                type: "primary",
                onClick: _cache[1] || (_cache[1] = ($event) => $data.popupVisible = false),
                shape: "circle",
                style: { "width": "100%", "margin-top": "32rpx" }
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("关闭")
                ]),
                _: 1
                /* STABLE */
              })
            ])
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"])
    ]);
  }
  const MachineAg = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-492a992f"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/components/doc/machine-ag.vue"]]);
  const _sfc_main$4 = {
    components: {
      MachineAg
    },
    data() {
      return {
        treatyAgree: false,
        product: {},
        orderMachineNumber: 1,
        showConfirm: false
      };
    },
    computed: {
      totalPrices() {
        if (this.product && this.orderMachineNumber) {
          return (this.product.productSellPrice * this.orderMachineNumber).toFixed(2);
        }
        return 0;
      }
    },
    onLoad(options) {
      this.productId = options.id;
      this.productCop = options.productCop;
      this.loadProduct();
    },
    methods: {
      loadProduct() {
        uni.showLoading();
        request({
          method: "GET",
          url: "/api/blade-demo/product/detail",
          data: {
            id: this.productId
          }
        }).then((res) => {
          this.product = res.data.data;
          uni.hideLoading();
        });
      },
      confirm() {
        if (!this.orderMachineNumber) {
          this.$refs.uToast.show({ message: "请输入购买份数", type: "warning" });
          return;
        }
        if (!this.treatyAgree) {
          this.$refs.uToast.show({ message: "请同意协议", type: "warning" });
          return;
        }
        uni.showLoading({ title: "下单中" });
        request({
          method: "POST",
          url: "/api/blade-demo/details/saveByUser",
          data: {
            orderMachineNumber: this.orderMachineNumber,
            orderMonthElectricity: this.product.monthElectricity,
            orderPrice: this.product.productSellPrice,
            payMoney: this.product.productSellPrice * this.orderMachineNumber,
            productName: this.product.productName,
            productBatchId: this.product.productBatchId,
            orderHashrate: this.product.productHashrate * this.orderMachineNumber,
            userId: getLocalStorage("userId"),
            productCop: this.product.productCop,
            productElectricityPrice: this.product.productElectricityPrice,
            electricalLoss: this.product.electricalLoss,
            productModel: this.product.productModel,
            productId: this.product.id
          }
        }).then((res) => {
          this.$u.toast.close();
          if (res.data && res.data.code == 200) {
            this.$refs.uToast.show({ message: "已下单", type: "success" });
            setTimeout(() => {
              uni.navigateTo({ url: `/pages/order/machine-detail?orderId=${res.data.data.orderId}&productBatchId=${res.data.data.productBatchId}` });
            }, 800);
          } else if (res.data && res.data.code == 400) {
            this.$refs.uToast.show({ message: "请检查您是否有未付款的订单 如果已付款请您等待后台审核", type: "warning" });
          } else if (res.data && res.data.code == 4e3) {
            this.$refs.uToast.show({ message: res.data.msg, type: "warning" });
          } else {
            this.$refs.uToast.show({ message: "下单失败", type: "error" });
          }
        }).catch(() => {
          this.$u.toast.close();
          this.$refs.uToast.show({ message: "下单失败", type: "error" });
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_number_box = resolveEasycom(vue.resolveDynamicComponent("u-number-box"), __easycom_0$1);
    const _component_machine_ag = vue.resolveComponent("machine-ag");
    const _component_u_checkbox = resolveEasycom(vue.resolveDynamicComponent("u-checkbox"), __easycom_1);
    const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_2);
    const _component_u_modal = resolveEasycom(vue.resolveDynamicComponent("u-modal"), __easycom_3$1);
    const _component_u_toast = resolveEasycom(vue.resolveDynamicComponent("u-toast"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "page-container" }, [
      $data.product ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "detail"
      }, [
        vue.createElementVNode("view", { class: "title" }, [
          vue.createElementVNode("view", { class: "title-bar" }),
          vue.createTextVNode(
            " " + vue.toDisplayString($data.product.productName),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "info" }, [
          vue.createElementVNode("text", null, "额定算力"),
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($data.product.productHashrate) + vue.toDisplayString($data.product.productHashrateUnit),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "info" }, [
          vue.createElementVNode("text", null, "发货日期"),
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($data.product.productWaybillDatetime),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "info" }, [
          vue.createElementVNode("text", null, "能耗比"),
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($data.product.productCop) + vue.toDisplayString($data.product.productCopUnit),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "line" }),
        vue.createElementVNode("view", { class: "info" }, [
          vue.createElementVNode("text", null, "付款方式"),
          vue.createElementVNode("text", null, "线下转账")
        ]),
        vue.createElementVNode("view", { class: "input u-text-right" }, [
          vue.createVNode(_component_u_number_box, {
            modelValue: $data.orderMachineNumber,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.orderMachineNumber = $event),
            min: 1,
            max: $data.product.productRepertory || 999,
            integer: ""
          }, null, 8, ["modelValue", "max"])
        ]),
        vue.createElementVNode("view", { class: "total" }, [
          vue.createElementVNode("view", { class: "key" }, "金额合计"),
          vue.createElementVNode(
            "view",
            { class: "value" },
            "¥" + vue.toDisplayString($options.totalPrices),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "treaty" }, [
          vue.createCommentVNode(` <view class="btn" @click="treatyAgree = !treatyAgree" :class="{ 'active-btn': treatyAgree }"></view> `),
          vue.createVNode(_component_u_checkbox, {
            modelValue: $data.treatyAgree,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.treatyAgree = $event)
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_machine_ag)
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"])
        ]),
        vue.createElementVNode("view", { class: "confirm-btn" }, [
          vue.createVNode(_component_u_button, {
            type: "primary",
            disabled: !$data.treatyAgree,
            onClick: _cache[2] || (_cache[2] = ($event) => $data.showConfirm = true)
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("确认")
            ]),
            _: 1
            /* STABLE */
          }, 8, ["disabled"])
        ]),
        vue.createVNode(_component_u_modal, {
          modelValue: $data.showConfirm,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.showConfirm = $event),
          title: "下单确认",
          content: "确认下单吗？",
          onConfirm: $options.confirm,
          showCancelButton: ""
        }, null, 8, ["modelValue", "onConfirm"]),
        vue.createVNode(
          _component_u_toast,
          { ref: "uToast" },
          null,
          512
          /* NEED_PATCH */
        )
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesMallMachineDetailMachineDetail = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-a105337f"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/pages/mall/machine-detail/machine-detail.vue"]]);
  const _sfc_main$3 = {
    name: "u-divider",
    props: {
      // 单一边divider横线的宽度(数值)，单位rpx。或者百分比
      halfWidth: {
        type: [Number, String],
        default: 150
      },
      // divider横线的颜色，如设置，
      borderColor: {
        type: String,
        default: "#dcdfe6"
      },
      // 主题色，可以是primary|info|success|warning|error之一值
      type: {
        type: String,
        default: "primary"
      },
      // 文字颜色
      color: {
        type: String,
        default: "#909399"
      },
      // 文字大小，单位rpx
      fontSize: {
        type: [Number, String],
        default: 26
      },
      // 整个divider的背景颜色
      bgColor: {
        type: String,
        default: "#ffffff"
      },
      // 整个divider的高度单位rpx
      height: {
        type: [Number, String],
        default: "auto"
      },
      // 上边距
      marginTop: {
        type: [String, Number],
        default: 0
      },
      // 下边距
      marginBottom: {
        type: [String, Number],
        default: 0
      },
      // 下内边距（如果本组件下面没有其他元素了，则用marginBottom会无效，需要用paddingBottom）
      paddingBottom: {
        type: [String, Number],
        default: 0
      },
      // 是否使用slot传入内容，如果不用slot传入内容，先的中间就不会有空隙
      useSlot: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      lineStyle() {
        let style = {};
        if (String(this.halfWidth).indexOf("%") != -1)
          style.width = this.halfWidth;
        else
          style.width = this.halfWidth + "rpx";
        if (this.borderColor)
          style.borderColor = this.borderColor;
        return style;
      }
    },
    methods: {
      click() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-divider",
        style: vue.normalizeStyle({
          height: $props.height == "auto" ? "auto" : $props.height + "rpx",
          backgroundColor: $props.bgColor,
          marginBottom: $props.marginBottom + "rpx",
          marginTop: $props.marginTop + "rpx",
          paddingBottom: $props.paddingBottom + "rpx"
        }),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.click && $options.click(...args))
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["u-divider-line", [$props.type ? "u-divider-line--bordercolor--" + $props.type : ""]]),
            style: vue.normalizeStyle([$options.lineStyle])
          },
          null,
          6
          /* CLASS, STYLE */
        ),
        $props.useSlot ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: "u-divider-text",
            style: vue.normalizeStyle({
              color: $props.color,
              fontSize: $props.fontSize + "rpx"
            })
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ],
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["u-divider-line", [$props.type ? "u-divider-line--bordercolor--" + $props.type : ""]]),
            style: vue.normalizeStyle([$options.lineStyle])
          },
          null,
          6
          /* CLASS, STYLE */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-3203ecfe"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/uni_modules/vk-uview-ui/components/u-divider/u-divider.vue"]]);
  const _sfc_main$2 = {
    name: "about",
    data() {
      return {};
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_divider = resolveEasycom(vue.resolveDynamicComponent("u-divider"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "page-container" }, [
      vue.createElementVNode("view", { class: "page-box" }, [
        vue.createElementVNode("view", { class: "content" }, " MinerGlory交易平台是由Tsingchain Capital战略投资的一个专注于超算算力、超算服务器以及相应数字资产的交易平台。MinerGlory注册在维尔京群岛，为全球用户提供更加安全、便捷的区块资产兑换服务，聚合全球优质区块链资产，致力于打造世界级的算力资产交易平台。 "),
        vue.createVNode(_component_u_divider, {
          text: "联系方式",
          "half-width": 120
        }),
        vue.createElementVNode("view", { class: "contact" }, "联系我们 support@minerglory.com")
      ])
    ]);
  }
  const PagesMyAboutAbout = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-8906ce38"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/pages/my/about/about.vue"]]);
  const _sfc_main$1 = {
    name: "OrderPage",
    data() {
      return {
        tabActive: 1
      };
    },
    onLoad(options) {
    },
    onShow() {
    },
    onReady() {
    },
    onHide() {
    },
    onUnload() {
    },
    // 页面进入前拦截
    onBeforeRouteEnter(to, from, next) {
      tab = 1;
      if (from.path == "/orderPage/suanliDetail") {
        tab = 0;
      }
      next();
    },
    methods: {
      changeTabActive(index) {
        this.tabActive = index;
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_order_suanli_list = vue.resolveComponent("order-suanli-list");
    const _component_order_machine_list = vue.resolveComponent("order-machine-list");
    return vue.openBlock(), vue.createElementBlock("view", { class: "page-container" }, [
      vue.createElementVNode("view", { class: "page-box" }, [
        vue.createElementVNode("view", { class: "top-tab-2" }, [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["item item-1", { active: $data.tabActive == 0 }]),
              onClick: _cache[0] || (_cache[0] = ($event) => $options.changeTabActive(0))
            },
            null,
            2
            /* CLASS */
          ),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["item item-2", { active: $data.tabActive == 1 }]),
              onClick: _cache[1] || (_cache[1] = ($event) => $options.changeTabActive(1))
            },
            null,
            2
            /* CLASS */
          )
        ]),
        $data.tabActive == 0 ? (vue.openBlock(), vue.createBlock(_component_order_suanli_list, { key: 0 })) : vue.createCommentVNode("v-if", true),
        $data.tabActive == 1 ? (vue.openBlock(), vue.createBlock(_component_order_machine_list, { key: 1 })) : vue.createCommentVNode("v-if", true)
      ])
    ]);
  }
  const PagesMyOrderOrder = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-9e99aef2"], ["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/pages/my/order/order.vue"]]);
  __definePage("pages/home-page/home-page", PagesHomePageHomePage);
  __definePage("pages/my/my", PagesMyMy);
  __definePage("pages/mall/mall", PagesMallMall);
  __definePage("pages/user/login", PagesUserLogin);
  __definePage("pages/user/register", PagesUserRegister);
  __definePage("pages/my/user-setting/user-setting", PagesMyUserSettingUserSetting);
  __definePage("pages/mall/machine-detail/machine-detail", PagesMallMachineDetailMachineDetail);
  __definePage("pages/my/about/about", PagesMyAboutAbout);
  __definePage("pages/my/order/order", PagesMyOrderOrder);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/niuxue/cg_work/private-workspace/test-uni-app/App.vue"]]);
  const mixin = {
    data() {
      return {};
    },
    onLoad() {
      this.$u.getRect = this.$uGetRect;
    },
    methods: {
      // 查询节点信息
      // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
      // 解决办法为在组件根部再套一个没有任何作用的view元素
      $uGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = false;
        this.parent = this.$u.$parent.call(this, parentName);
        if (this.parent) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
          this.parentData.value = this.parent.modelValue;
        }
      },
      // 阻止事件冒泡
      preventEvent(e) {
        e && e.stopPropagation && e.stopPropagation();
      }
    },
    onReachBottom() {
      uni.$emit("uOnReachBottom");
    },
    beforeUnmount() {
      if (this.parent && uni.$u.test.array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index) => {
          if (child === this) {
            childrenList.splice(index, 1);
          }
        });
      }
    }
  };
  function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
  }
  function deepClone(obj) {
    if ([null, void 0, NaN, false].includes(obj))
      return obj;
    if (typeof obj !== "object" && typeof obj !== "function") {
      return obj;
    }
    var o = isArray(obj) ? [] : {};
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
      }
    }
    return o;
  }
  function deepMerge(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== "object" || typeof source !== "object")
      return false;
    for (var prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      if (prop in target) {
        if (typeof target[prop] !== "object") {
          target[prop] = source[prop];
        } else {
          if (typeof source[prop] !== "object") {
            target[prop] = source[prop];
          } else {
            if (target[prop].concat && source[prop].concat) {
              target[prop] = target[prop].concat(source[prop]);
            } else {
              target[prop] = deepMerge(target[prop], source[prop]);
            }
          }
        }
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  }
  function email(value) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
  }
  function mobile(value) {
    return /^1[23456789]\d{9}$/.test(value);
  }
  function url(value) {
    return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
  }
  function date(value) {
    if (!value)
      return false;
    if (number(value))
      value = +value;
    return !/Invalid|NaN/.test(new Date(value).toString());
  }
  function dateISO(value) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
  }
  function number(value) {
    return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
  }
  function digits(value) {
    return /^\d+$/.test(value);
  }
  function idCard(value) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value
    );
  }
  function carNo(value) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value.length === 7) {
      return creg.test(value);
    } else if (value.length === 8) {
      return xreg.test(value);
    } else {
      return false;
    }
  }
  function amount(value) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
  }
  function chinese(value) {
    let reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value);
  }
  function letter(value) {
    return /^[a-zA-Z]*$/.test(value);
  }
  function enOrNum(value) {
    let reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value);
  }
  function contains(value, param) {
    return value.indexOf(param) >= 0;
  }
  function range(value, param) {
    return value >= param[0] && value <= param[1];
  }
  function rangeLength(value, param) {
    return value.length >= param[0] && value.length <= param[1];
  }
  function landline(value) {
    let reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value);
  }
  function empty(value) {
    switch (typeof value) {
      case "undefined":
        return true;
      case "string":
        if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value)
          return true;
        break;
      case "number":
        if (0 === value || isNaN(value))
          return true;
        break;
      case "object":
        if (null === value || value.length === 0)
          return true;
        for (var i in value) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value) {
    if (typeof value == "string") {
      try {
        var obj = JSON.parse(value);
        if (typeof obj == "object" && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  function array(value) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    } else {
      return Object.prototype.toString.call(value) === "[object Array]";
    }
  }
  function object(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }
  function code(value, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value);
  }
  function func(value) {
    return typeof value === "function";
  }
  function promise(value) {
    return object(value) && func(value.then) && func(value.catch);
  }
  function image(value) {
    const newValue = value.split("?")[0];
    return new RegExp(/\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)$/).test(newValue);
  }
  function video(value) {
    const newValue = value.split("?")[0];
    return new RegExp(/\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8|3gp)$/).test(newValue);
  }
  function regExp(o) {
    return o && Object.prototype.toString.call(o) === "[object RegExp]";
  }
  function string(value) {
    return typeof value === "string";
  }
  const test = {
    email,
    mobile,
    url,
    date,
    dateISO,
    number,
    digits,
    idCard,
    carNo,
    amount,
    chinese,
    letter,
    enOrNum,
    contains,
    range,
    rangeLength,
    empty,
    isEmpty: empty,
    jsonString,
    landline,
    object,
    array,
    code,
    func,
    promise,
    video,
    image,
    regExp,
    string
  };
  class Request {
    // 设置全局默认配置
    setConfig(customConfig) {
      this.config = deepMerge(this.config, customConfig);
    }
    // 主要请求部分
    request(options = {}) {
      if (this.interceptor.request && typeof this.interceptor.request === "function") {
        let interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          return new Promise(() => {
          });
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || "";
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;
      return new Promise((resolve, reject) => {
        options.complete = (response) => {
          uni.hideLoading();
          clearTimeout(this.config.timer);
          this.config.timer = null;
          if (this.config.originalData) {
            if (this.interceptor.response && typeof this.interceptor.response === "function") {
              let resInterceptors = this.interceptor.response(response);
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                reject(response);
              }
            } else {
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (this.interceptor.response && typeof this.interceptor.response === "function") {
                let resInterceptors = this.interceptor.response(response.data);
                if (resInterceptors !== false) {
                  resolve(resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                resolve(response.data);
              }
            } else {
              reject(response);
            }
          }
        };
        options.url = test.url(options.url) ? options.url : this.config.baseUrl + (options.url.indexOf("/") == 0 ? options.url : "/" + options.url);
        if (this.config.showLoading && !this.config.timer) {
          this.config.timer = setTimeout(() => {
            uni.showLoading({
              title: this.config.loadingText,
              mask: this.config.loadingMask
            });
            this.config.timer = null;
          }, this.config.loadingTime);
        }
        uni.request(options);
      });
    }
    constructor() {
      this.config = {
        baseUrl: "",
        // 请求的根域名
        // 默认的请求头
        header: {},
        method: "POST",
        // 设置为json，返回后uni.request会对数据进行一次JSON.parse
        dataType: "json",
        // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
        responseType: "text",
        showLoading: true,
        // 是否显示请求中的loading
        loadingText: "请求中...",
        loadingTime: 800,
        // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
        timer: null,
        // 定时器
        originalData: false,
        // 是否在拦截器中返回服务端的原始数据，见文档说明
        loadingMask: true
        // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
      };
      this.interceptor = {
        // 请求前的拦截
        request: null,
        // 请求后的拦截
        response: null
      };
      this.get = (url2, data = {}, header = {}) => {
        return this.request({
          method: "GET",
          url: url2,
          header,
          data
        });
      };
      this.post = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "POST",
          header,
          data
        });
      };
      this.put = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "PUT",
          header,
          data
        });
      };
      this.delete = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "DELETE",
          header,
          data
        });
      };
    }
  }
  const http = new Request();
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    let prefix = isPrefix ? "?" : "";
    let _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (let key in data) {
      let value = data[key];
      if (["", void 0, null].indexOf(value) >= 0) {
        continue;
      }
      if (value.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i = 0; i < value.length; i++) {
              _result.push(key + "[" + i + "]=" + value[i]);
            }
            break;
          case "brackets":
            value.forEach((_value) => {
              _result.push(key + "[]=" + _value);
            });
            break;
          case "repeat":
            value.forEach((_value) => {
              _result.push(key + "=" + _value);
            });
            break;
          case "comma":
            let commaStr = "";
            value.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(key + "=" + commaStr);
            break;
          default:
            value.forEach((_value) => {
              _result.push(key + "[]=" + _value);
            });
        }
      } else {
        _result.push(key + "=" + value);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  class Router {
    constructor() {
      this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        // navigateBack页面后退时,回退的层数
        params: {},
        // 传递的参数
        animationType: "pop-in",
        // 窗口动画,只在APP有效
        animationDuration: 300,
        // 窗口动画持续时间,单位毫秒,只在APP有效
        intercept: false
        // 是否需要拦截
      };
      this.route = this.route.bind(this);
    }
    // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
    addRootPath(url2) {
      return url2[0] === "/" ? url2 : `/${url2}`;
    }
    // 整合路由参数
    mixinParam(url2, params) {
      url2 = url2 && this.addRootPath(url2);
      let query = "";
      if (/.*\/.*\?.*=.*/.test(url2)) {
        query = uni.$u.queryParams(params, false);
        return url2 += "&" + query;
      } else {
        query = uni.$u.queryParams(params);
        return url2 += query;
      }
    }
    // 对外的方法名称
    async route(options = {}, params = {}) {
      let mergeConfig = {};
      if (typeof options === "string") {
        mergeConfig.url = this.mixinParam(options, params);
        mergeConfig.type = "navigateTo";
      } else {
        mergeConfig = uni.$u.deepClone(options, this.config);
        mergeConfig.url = this.mixinParam(options.url, options.params);
      }
      if (params.intercept) {
        this.config.intercept = params.intercept;
      }
      mergeConfig.params = params;
      mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
      if (typeof uni.$u.routeIntercept === "function") {
        const isNext = await new Promise((resolve, reject) => {
          uni.$u.routeIntercept(mergeConfig, resolve);
        });
        isNext && this.openPage(mergeConfig);
      } else {
        this.openPage(mergeConfig);
      }
    }
    // 执行路由跳转
    openPage(config2) {
      const {
        url: url2,
        type: type2,
        delta,
        animationType,
        animationDuration
      } = config2;
      if (config2.type == "navigateTo" || config2.type == "to") {
        uni.navigateTo({
          url: url2,
          animationType,
          animationDuration
        });
      }
      if (config2.type == "redirectTo" || config2.type == "redirect") {
        uni.redirectTo({
          url: url2
        });
      }
      if (config2.type == "switchTab" || config2.type == "tab") {
        uni.switchTab({
          url: url2
        });
      }
      if (config2.type == "reLaunch" || config2.type == "launch") {
        uni.reLaunch({
          url: url2
        });
      }
      if (config2.type == "navigateBack" || config2.type == "back") {
        uni.navigateBack({
          delta
        });
      }
    }
  }
  const route = new Router().route;
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]")
        throw new TypeError(
          "fillString must be String"
        );
      let str = this;
      if (str.length >= maxLength)
        return String(str);
      let fillLength = maxLength - str.length, times = Math.ceil(fillLength / fillString.length);
      while (times >>= 1) {
        fillString += fillString;
        if (times === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, fmt = "yyyy-mm-dd") {
    if (!dateTime)
      dateTime = Number(/* @__PURE__ */ new Date());
    if (dateTime.toString().length == 10)
      dateTime *= 1e3;
    let date3 = new Date(dateTime);
    let ret;
    let opt = {
      "y+": date3.getFullYear().toString(),
      // 年
      "m+": (date3.getMonth() + 1).toString(),
      // 月
      "d+": date3.getDate().toString(),
      // 日
      "h+": date3.getHours().toString(),
      // 时
      "M+": date3.getMinutes().toString(),
      // 分
      "s+": date3.getSeconds().toString()
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
      }
    }
    return fmt;
  }
  function timeFrom(dateTime = null, format2 = "yyyy-mm-dd") {
    if (!dateTime)
      dateTime = Number(/* @__PURE__ */ new Date());
    if (dateTime.toString().length == 10)
      dateTime *= 1e3;
    let timestamp = +new Date(Number(dateTime));
    let timer = (Number(/* @__PURE__ */ new Date()) - timestamp) / 1e3;
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "刚刚";
        break;
      case (timer >= 300 && timer < 3600):
        tips = parseInt(timer / 60) + "分钟前";
        break;
      case (timer >= 3600 && timer < 86400):
        tips = parseInt(timer / 3600) + "小时前";
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = parseInt(timer / 86400) + "天前";
        break;
      default:
        if (format2 === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = parseInt(timer / (86400 * 30)) + "个月前";
          } else {
            tips = parseInt(timer / (86400 * 365)) + "年前";
          }
        } else {
          tips = timeFormat(timestamp, format2);
        }
    }
    return tips;
  }
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    let startRGB = hexToRgb(startColor, false);
    let startR = startRGB[0];
    let startG = startRGB[1];
    let startB = startRGB[2];
    let endRGB = hexToRgb(endColor, false);
    let endR = endRGB[0];
    let endG = endRGB[1];
    let endB = endRGB[2];
    let sR = (endR - startR) / step;
    let sG = (endG - startG) / step;
    let sB = (endB - startB) / step;
    let colorArr = [];
    for (let i = 0; i < step; i++) {
      let hex = rgbToHex("rgb(" + Math.round(sR * i + startR) + "," + Math.round(sG * i + startG) + "," + Math.round(sB * i + startB) + ")");
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      let sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      if (!str) {
        return sColorChange;
      } else {
        return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
      }
    } else if (/^(rgb|RGB)/.test(sColor)) {
      let arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    } else {
      return sColor;
    }
  }
  function rgbToHex(rgb) {
    let _this = rgb;
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      let aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = String(hex).length == 1 ? "0" + hex : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    } else if (reg.test(_this)) {
      let aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      } else if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  function colorToRgba(color2, alpha = 0.3) {
    color2 = rgbToHex(color2);
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = color2.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      var sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return "rgba(" + sColorChange.join(",") + "," + alpha + ")";
    } else {
      return sColor;
    }
  }
  const colorGradient$1 = {
    colorGradient,
    hexToRgb,
    rgbToHex,
    colorToRgba
  };
  function guid(len = 32, firstU = true, radix = null) {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    let uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return "u" + uuid.join("");
    } else {
      return uuid.join("");
    }
  }
  let color = {
    primary: "#2979ff",
    primaryDark: "#2b85e4",
    primaryDisabled: "#a0cfff",
    primaryLight: "#ecf5ff",
    bgColor: "#f3f4f6",
    info: "#909399",
    infoDark: "#82848a",
    infoDisabled: "#c8c9cc",
    infoLight: "#f4f4f5",
    warning: "#ff9900",
    warningDark: "#f29100",
    warningDisabled: "#fcbd71",
    warningLight: "#fdf6ec",
    error: "#fa3534",
    errorDark: "#dd6161",
    errorDisabled: "#fab6b6",
    errorLight: "#fef0f0",
    success: "#19be6b",
    successDark: "#18b566",
    successDisabled: "#71d5a1",
    successLight: "#dbf1e1",
    mainColor: "#303133",
    contentColor: "#606266",
    tipsColor: "#909399",
    lightColor: "#c0c4cc",
    borderColor: "#e4e7ed"
  };
  function type2icon(type2 = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type2) == -1)
      type2 = "success";
    let iconName = "";
    switch (type2) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function randomArray(array3 = []) {
    return array3.sort(() => Math.random() - 0.5);
  }
  const addUnit = function(value = "auto", unit = "rpx") {
    value = String(value);
    return test.number(value) ? `${value}${unit}` : value;
  };
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      let gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    } else {
      return 0;
    }
  }
  function trim$1(str, pos = "both") {
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    } else if (pos == "left") {
      return str.replace(/^\s*/, "");
    } else if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    } else if (pos == "all") {
      return str.replace(/\s+/g, "");
    } else {
      return str;
    }
  }
  function toast(title, duration = 1500) {
    uni.showToast({
      title,
      icon: "none",
      duration
    });
  }
  function getParent(name, keys) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        let data = {};
        if (Array.isArray(keys)) {
          keys.map((val) => {
            data[val] = parent[val] ? parent[val] : "";
          });
        } else {
          for (let i in keys) {
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return data;
      }
    }
    return {};
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function getSystemInfoSync() {
    return uni.getSystemInfoSync();
  }
  function os() {
    return getSystemInfoSync().platform;
  }
  function sys() {
    return getSystemInfoSync();
  }
  let timeout = null;
  function debounce(func2, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func2 === "function" && func2();
    } else {
      timeout = setTimeout(function() {
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  let timeoutArr = [];
  let flagArr = [];
  function throttle(fn, time = 500, isImmediate = true, timeoutName = "default") {
    if (!timeoutArr[timeoutName])
      timeoutArr[timeoutName] = null;
    if (isImmediate) {
      if (!flagArr[timeoutName]) {
        flagArr[timeoutName] = true;
        if (typeof fn === "function")
          fn();
        timeoutArr[timeoutName] = setTimeout(() => {
          flagArr[timeoutName] = false;
        }, time);
      }
    } else {
      if (!flagArr[timeoutName]) {
        flagArr[timeoutName] = true;
        timeoutArr[timeoutName] = setTimeout(() => {
          flagArr[timeoutName] = false;
          if (typeof fn === "function")
            fn();
        }, time);
      }
    }
  }
  function trim(str, pos = "both") {
    str = String(str);
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    }
    if (pos == "left") {
      return str.replace(/^\s*/, "");
    }
    if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    }
    if (pos == "all") {
      return str.replace(/\s+/g, "");
    }
    return str;
  }
  function addStyle(customStyle, target = "object") {
    if (test.empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
      return customStyle;
    }
    if (target === "object") {
      customStyle = trim(customStyle);
      const styleArray = customStyle.split(";");
      const style = {};
      for (let i = 0; i < styleArray.length; i++) {
        if (styleArray[i]) {
          const item = styleArray[i].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    for (const i in customStyle) {
      const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${customStyle[i]};`;
    }
    return trim(string2);
  }
  let version = "1.10.1";
  const config = {
    v: version,
    version,
    // 主题名称
    type: [
      "primary",
      "success",
      "info",
      "error",
      "warning"
    ]
  };
  const zIndex = {
    toast: 10090,
    noNetwork: 10080,
    // popup包含popup，actionsheet，keyboard，picker的值
    popup: 10075,
    mask: 10070,
    navbar: 980,
    topTips: 975,
    sticky: 970,
    indexListSticky: 965
  };
  function wranning(str) {
    {
      formatAppLog("warn", "at uni_modules/vk-uview-ui/index.js:26", str);
    }
  }
  const $u = {
    queryParams,
    route,
    timeFormat,
    date: timeFormat,
    // 另名date
    timeFrom,
    colorGradient: colorGradient$1.colorGradient,
    colorToRgba: colorGradient$1.colorToRgba,
    guid,
    color,
    sys,
    os,
    type2icon,
    randomArray,
    wranning,
    get: http.get,
    post: http.post,
    put: http.put,
    "delete": http.delete,
    hexToRgb: colorGradient$1.hexToRgb,
    rgbToHex: colorGradient$1.rgbToHex,
    test,
    random,
    deepClone,
    deepMerge,
    getParent,
    $parent,
    addUnit,
    trim: trim$1,
    type: ["primary", "success", "error", "warning", "info"],
    http,
    toast,
    config,
    // uView配置信息相关，比如版本号
    zIndex,
    debounce,
    throttle,
    addStyle,
    getSystemInfoSync
  };
  uni.$u = $u;
  const install = (Vue2) => {
    Vue2.mixin(mixin);
    Vue2.config.globalProperties.$u = $u;
  };
  const uView = {
    install
  };
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(uView);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
