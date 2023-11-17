const api = require("../../utils/request").Api;
Page({
  data: {
    show: false,
    follow: false,
    miniappInfo: [],
    companyInfo: []
  },
  onLoad: function (options) {
    this.getInfo()
  },
  getInfo() {
    tt.showLoading({
      title: '加载中...',
    });
    const {
      microapp: {
        appId
      }
    } = tt.getEnvInfoSync();
    api.getInfo({
      app_id: appId
    }).then(({
      data
    }) => {
      if (data.code === 0) {
        this.setData({
          miniappInfo: data?.data?.data?.result?.miniInfo || [],
          companyInfo: data?.data?.data?.result?.companyInfo || []
        })
        tt.hideLoading();
      }
    })
  },
  close() {
    this.setData({
      show: false,
    });
    setTimeout(() => {
      this.setData({
        follow: true,
      });
    }, 600);
  },
  closeFollow() {
    this.setData({
      follow: false
    })
  },
  swiperChange(e) {
    this.setData({
      current: e.detail.current
    })
  },
  button() {
    this.setData({
      show: true
    })
  },
  followAwemeUser(e) {
    tt.followAwemeUser({
      awemeId: "CJLY8888",
      success: (res) => {
        console.log("引导关注抖音号成功，已关注:", res.followed);
      },
      fail: (res) => {
        console.log("引导关注抖音号失败，错误信息:", res.errMsg);
      },
    });
  },
  sendSms(e) {
    tt.sendSms({
      phoneNumber: this.data.miniappInfo.phone,
      content: "测试",
      success: (res) => {
        console.log("success", res);
      },
      fail: (err) => {
        console.log("fail", err);
      },
    });
  },
  previewImage(e) {
    const {
      index,
      list
    } = e.currentTarget.dataset;
    let array = []
    list.forEach((e) => {
      array.push(e.url)
    })
    tt.previewImage({
      current: array[index],
      urls: array,
      success: () => {
        console.log("previewImage success");
      },
      fail: (e) => {
        console.log(e);
      }
    });
  },
})