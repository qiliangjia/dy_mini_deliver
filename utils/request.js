
const GET = "GET";
const POST = "POST";
const baseUrl = "https://nezha-bus-stg.qiliangjia.com";

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
  getPhone: (data) => request(GET, `/get/phone/dy_applet_bt`, data),
};
module.exports = {
  Api,
};