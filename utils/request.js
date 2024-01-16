const GET = "GET";
const POST = "POST";
const REQUEST_ENV = 'prod'
const baseUrl = `https://fhl-business-${REQUEST_ENV}.qiliangjia.com`;

function request(method, url, data = {}) {
  return new Promise((resolve, reject) => {
    let header = {
      "Content-Type": "application/json",
    };
    const {
      microapp: {
        appId
      }
    } = tt.getEnvInfoSync();
    if (!data.channel) {
      data.channel = 2
    }
    if (!data.project_id) {
      data.project_id = 21
    }
    if (!data.appid) {
      data.appid = appId
    }
    tt.request({
      url: baseUrl + url,
      method: method,
      header: header,
      data: method === POST ? JSON.stringify(data) : data,
      success: (res) => {
        if (res.statusCode == 200) {
          // 业务逻辑
          if (res.data.code === 0) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        } else {
          reject(res.data)
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
const Api = {
  getUserList: (data) => request(GET, `/mount/puid`, data),
  getDetail: (data) => request(GET, `/mount/user/puid`, data),
  userStatus: (data) => request(GET, `/mount/state`, data),
};
module.exports = {
  Api,
};