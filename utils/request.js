const GET = "GET";
const POST = "POST";
const REQUEST_ENV = 'prod'
const baseUrl = `https://fhl-business-${REQUEST_ENV}.qiliangjia.com`;

function request(method, url, data = {}, isBase = false) {
  return new Promise((resolve, reject) => {
    let header = {
      "Content-Type": "application/json",
    };
    tt.request({
      url: isBase ? url : baseUrl + url,
      method: method,
      header: header,
      data: method === POST ? JSON.stringify(data) : data,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
const Api = {
  getInfo: (data) => request(GET, `/project16/company/info`, data),
  getImages: (data) => request(GET, data.url, data, true)
};
module.exports = {
  Api,
};