const GET = "GET";
const POST = "POST";
const REQUEST_ENV = 'prod'
const baseUrl = `https://fhl-business-${REQUEST_ENV}.qiliangjia.com`;

function request(method, url, data = {}, isBase = false) {
  return new Promise((resolve, reject) => {
    let header = {
      "Content-Type": "application/json",
    };
    const {
      microapp: {
        appId
      }
    } = tt.getEnvInfoSync();
    if (!data.appid) {
      data.appid = appId
    }
    tt.request({
      url: isBase ? url : baseUrl + url,
      method: method,
      header: header,
      data: method === POST ? JSON.stringify(data) : data,
      success: (res) => {
        const data = res.data
        if (res.statusCode === 200 && data.code === 0) {
          resolve(data.data)
        } else {
          tt.showToast({
            title: '网络连接失败，请稍后重试',
            icon: 'fail'
          });
          reject(data)
        }
      },
      fail: (err) => {
        tt.showToast({
          title: '网络连接失败，请稍后重试',
          icon: 'fail'
        });
        reject(err);
      },
    });
  });
}
const Api = {
  getInfo: (data) => request(GET, `/project16/company/info`, data),
  setMobile: (data) => request(GET, `/user/company/mobile/add`, data),
};
module.exports = {
  Api,
};