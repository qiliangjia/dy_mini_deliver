const api = require("../../utils/request").Api;

Page({
  data: {
    miniappInfo: {},
    info: {
      mobile: '',
      name: '',
      desc: ''
    },
  },
  onLoad: function (options) {
    this.setData({
      miniappInfo: JSON.parse(decodeURIComponent(options.miniappInfo)) || {}
    })
  },
  phoneInput(e) {
    this.setData({
      ['info.mobile']: e.detail.value
    })
  },
  nameInput(e) {
    this.setData({
      ['info.name']: e.detail.value
    })
  },
  descInput(e) {
    this.setData({
      ['info.desc']: e.detail.value
    })
  },
  sumbit() {
    const phoneNumberPattern = /^1[3456789]\d{9}$/;
    const randomTime = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
    const mobile = this.data.info.mobile.trim()
    const name = this.data.info.name.trim()
    const desc = this.data.info.desc.trim()
    if (!name || !mobile || !desc) {
      tt.showToast({
        title: '提交信息不能为空',
        icon: "fail"
      });
      return
    }
    if (!mobile || !phoneNumberPattern.test(mobile)) {
      tt.showToast({
        title: '请输入正确的手机号',
        icon: "fail"
      });
      return;
    }
    tt.showLoading({
      title: '提交中...',
    });
    if (!this.data.miniappInfo.puid) {
      setTimeout(() => {
        tt.showToast({
          title: '提交成功',
          icon: 'success'
        });
        setTimeout(() => {
          this.setData({
            info: {
              mobile: '',
              name: '',
              desc: ''
            }
          })
        }, 1000);
      }, randomTime);
      return
    }
    api.setMobile({
      puid: this.data.miniappInfo.puid,
      project_id: 16,
      mobile,
      name,
      desc
    }).then(() => {
      tt.showToast({
        title: '提交成功',
        icon: 'success'
      });
      setTimeout(() => {
        this.setData({
          info: {
            mobile: '',
            name: '',
            desc: ''
          }
        })
      }, 1000);
    }).catch(() => {
      tt.showToast({
        title: '提交失败',
        icon: "fail"
      });
    })
  },
})