const api = require("../../utils/request").Api;
Page({
  data: {
    show: false,
    follow: false,
    images: ['/image/bt-banner1.png', '/image/bt-banner.png'],
    current: 0,
    isOnShow: false
  },
  onLoad: function (options) {

  },
  onShow() {
    if (this.data.isOnShow) {
      this.close()
    } else {
      this.setData({
        isOnShow: true
      })
    }
  },
  getphonenumber(e) {
    tt.showLoading({
      title: '获取中...',
    });
    const {
      encryptedData,
      iv,
      errMsg,
      value
    } = e.detail
    console.log(e);
    if (encryptedData && iv && errMsg === 'getPhoneNumber:ok') {
      tt.login({
        success: ({
          code
        }) => {
          console.log(code);
          // api.getPhone({
          //   encrypted_data: encryptedData,
          //   iv,
          //   code
          // }).then(({
          //   data
          // }) => {
          //   if (data.code === 0) {
          //     this.setData({
          //       ['formData.phone']: data.data.phoneNumber,
          //     })
          //     this.setUserForm()
          //     tt.setStorageSync('formData', this.data.formData);
          //     tt.hideToast();
          //     if (source === 2) {
          //       this.submit()
          //     }
          //   } else {
          //     tt.showToast({
          //       title: '获取手机号失败',
          //       icon: 'fail'
          //     });
          //   }
          // })
        },
        fail: (res) => {
          tt.showToast({
            title: '获取手机号失败',
            icon: 'fail'
          });
          console.log(`login 调用失败`);
        },
      });
    } else {
      tt.hideToast();
    }
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
});