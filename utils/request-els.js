const GET = "GET";
const POST = "POST";
const REQUEST_ENV = 'prod'
const baseUrl = `https://erlangshen-${REQUEST_ENV}.qiliangjia.com`;

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
  getContent: (appid) => request(GET, `/api/h5/${appid}/getContent`),
};
module.exports = {
  Api,
};