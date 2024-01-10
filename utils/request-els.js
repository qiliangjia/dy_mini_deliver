const GET = "GET";
const POST = "POST";
const REQUEST_ENV = 'prod'
const baseUrl = `https://erlangshen-${REQUEST_ENV}.qiliangjia.com`;

function request(method, url, data = {}, isBase = false) {
  return new Promise((resolve, reject) => {
    let header = {
      "Content-Type": "application/json",
    };
    const {
      microapp: {
        appId,
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
  getContent: (appid) => request(GET, `/api/h5/${appid}/getContent`),
};
module.exports = {
  Api,
};