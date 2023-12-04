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
    const companyInfo = {
      companyName: '企业供应链',
    }
    const miniappInfo = {
      contactName: '王伟斌',
      contactPosition: '经理',
      introduce: '在竞争激烈的商业环境中，拥有一套多功能的企业服务方案对于提高效率和降低成本至关重要。我们的公用万能企业服务致力于为各种规模和行业的企业提供全面的解决方案。无论您是初创企业、 中型企业还是大型企业， 我们的服务都旨在满足您的需求。',
      companyPhoto: [{
        url: 'https://static.qiliangjia.com/static/dy-mini/miniapp/1.jpg'
      }, {
        url: 'https://static.qiliangjia.com/static/dy-mini/miniapp/2.jpg'
      }, {
        url: 'https://static.qiliangjia.com/static/dy-mini/miniapp/3.jpg'
      }, {
        url: 'https://static.qiliangjia.com/static/dy-mini/miniapp/4.jpg'
      }, {
        url: 'https://static.qiliangjia.com/static/dy-mini/miniapp/6.jpg'
      }]
    }
    this.setData({
      miniappInfo,
      companyInfo
    })
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
      if (data.code === 0 && data?.data?.result) {
        this.setData({
          miniappInfo: data?.data?.result?.miniInfo || [],
          companyInfo: data?.data?.result?.companyInfo || []
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
    if (!this.data.miniappInfo?.phone) {
      tt.showToast({
        title: '请完善信息',
      });
      return
    }
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