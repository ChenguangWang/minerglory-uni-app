import { getLocalStorage } from './cache';

let baseURLMap = {
  // 开发
  develop: 'http://www.minerglory.com',
  // 体验版
  trial: 'http://www.minerglory.com',
  // 正式版
  release: 'http://www.minerglory.com',
};

let baseURL = baseURLMap['develop'];

// #ifdef MP-WEIXIN
const { miniProgram } = uni.getAccountInfoSync();
baseURL = baseURLMap[miniProgram.envVersion];
// #endif

// #ifdef APP-PLUS
baseURL = baseURLMap['release']; // App 使用正式环境
// #endif

// #ifdef H5
baseURL = '';
// #endif

function dataToQueryParam(data) {
  if (!data || typeof data !== 'object') return '';
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

export function request(config) {
  config.header = {
    'Tenant-Id': '924188',
    Authorization: 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
    ...(config.header || {})
  };
  const token = getLocalStorage('token');
  if (token) {
    config.header['Blade-Auth'] = token;
  }

  // 文件上传逻辑
  if (config.filePath) {
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url: baseURL + config.url,
        filePath: config.filePath,
        name: config.name || 'file',
        formData: config.formData || {},
        header: config.header,
        timeout: config.timeout || 120000,
        success: (res) => {
          let data = res.data;
          try {
            data = JSON.parse(res.data);
          } catch (e) {}
          if ([200, 201, 204].includes(res.statusCode)) {
            resolve({ ...res, data });
          } else {
            uni.showToast({
              title: (data && data.error && data.error.message) || '上传失败!',
              icon: 'none',
              duration: 2000,
            });
            reject(data);
          }
        },
        fail: (error) => {
          uni.showToast({
            title: '网络异常，请稍后重试',
            icon: 'none',
            duration: 2000,
          });
          reject(error);
        }
      });
    });
  }

  // 普通请求逻辑
  let method = !config.method ? 'GET' : config.method.toLocaleUpperCase();
  if (method === 'POST' && config.params && typeof config.params === 'object') {
    const params = dataToQueryParam(config.params);
    if (params) {
      config.url += (config.url.indexOf('?') === -1 ? '?' : '&') + params;
    }
    config.data = undefined; // 清空data，避免重复
  }

  return new Promise((resolve, reject) => {
    uni.request(
      Object.assign(config, {
        url: baseURL + config.url,
        method,
        timeout: 120000, // 超时2分钟
        withCredentials: true, //跨域请求时是否携带凭证（cookies）
        success: async (res) => {
          let statusCode = res.statusCode;
          if (statusCode !== 200 && statusCode !== 204) {
            uni.showToast({
              title: res.data.error ? res.data.error.message : '网络错误!',
              icon: 'none',
              duration: 2000,
            });
            reject(res.data || res.data.error.message);
          } else {
            const { code, msg } = res.data;
            if (!code || code == 200) {
              resolve(res);
            } else if (code == 401) {
              uni.showToast({
                title: '登录已过期，请重新登录',
                icon: 'none',
                duration: 2000,
              });
              uni.navigateTo({
                url: '/pages/user/login',
              });
              reject();
            } else {
              uni.showToast({
                title: msg,
                icon: 'none',
                duration: 2000,
              });
              reject(res.data);
            }
          }
        },
        fail: (error) => {
          uni.showToast({
            title: '网络异常，请稍后重试',
            icon: 'none',
            duration: 2000,
          });
          reject(error);
        },
      })
    );
  });
}
