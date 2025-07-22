// 账单支付状态
export const billPayStatusMap = {
  1: {
    label: "待确认",
    color: "#FFB800",
  },
  2: {
    label: "待支付",
    color: "#FF3750",
  },
  3: {
    label: "已支付",
    color: "#16CB7E",
  },
};

// 回本
export const recoveryMap = {
  1: {
    label: "回本",
    color: "#FFB800",
  },
  0: {
    label: "未回本",
    color: "rgb(86, 128, 250)",
  },
};

// 挖矿模式
export const miningModeMap = {
  1: {
    label: "普通挖矿",
  },
  2: {
    label: "联合挖矿",
  },
};

// 电费缴纳方式
export const electricPayTypeMap = {
  1: {
    label: "独立缴纳",
  },
  2: {
    label: "扣币缴纳",
  },
};
