const api = require("../../utils/request").Api;
Page({
  data: {
    show: false,
    follow: false,
    images: ['/image/bt-banner1.png', '/image/bt-banner.png'],
    current: 0,
    isOnShow: false,
    clueComponentId: '3dcb7ec3061ded60b87ead4da7b31028', // 这里填写创建的线索组件id
    conversionTarget: 1,
    send_mobile: ""
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
  formSubmit(e) {
    console.log('formSubmit: ', e.detail);
  },
  formReset() {
    console.log('formReset');
  },
  getphonenumber(e) {
    tt.showLoading({
      title: '获取中...',
    });
    const {
      encryptedData,
      iv,
      errMsg,
    } = e.detail
    if (encryptedData && iv && errMsg === 'getPhoneNumber:ok') {
      tt.login({
        success: ({
          code
        }) => {
          api.getPhone({
            encrypted_data: encryptedData,
            iv,
            code,
            project_id: '10'
          }).then(({
            data
          }) => {
            console.log(data);
            if (data.code === 0) {
              this.setData({
                send_mobile: data?.data?.send_mobile,
                show: true
              })
              tt.hideToast();
            } else {
              tt.showToast({
                title: '获取手机号失败',
                icon: 'fail'
              });
            }
          })
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
      tt.showToast({
        title: '请耐心等待',
        icon: 'success'
      });
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
      awemeId: "288115324",
      success: (res) => {
        console.log("引导关注抖音号成功，已关注:", res.followed);
      },
      fail: (res) => {
        console.log("引导关注抖音号失败，错误信息:", res.errMsg);
      },
    });
  },
  sendSms() {
    if (!this.data.send_mobile) return
    tt.sendSms({
      phoneNumber: String(this.data.send_mobile),
      content: "T",
      success: (res) => {
        console.log("success", res);
      },
      fail: (err) => {
        console.log("fail", err);
      },
    });
  },
});