var calc = require("../../utils/calc")

Page({
  data: {
    tabList: [{
        name: '首页',
        icon: 'https://static.qiliangjia.com/static/dy-mini/miniapp/wx/home-no.png',
        chios_icon: 'https://static.qiliangjia.com/static/dy-mini/miniapp/wx/home-good.png',
      },
      {
        name: '实用工具',
        icon: 'https://static.qiliangjia.com/static/dy-mini/miniapp/wx/js.png',
        chios_icon: 'https://static.qiliangjia.com/static/dy-mini/miniapp/wx/js-good.png',
      },
      {
        name: '提交资料',
        icon: 'https://static.qiliangjia.com/static/dy-mini/miniapp/wx/xl.png',
        chios_icon: 'https://static.qiliangjia.com/static/dy-mini/miniapp/wx/xl-good.png',
      }
    ],
    tab: 0,
    list: [
      '小程序代开发及运营服务',
      '短视频账号运营服务',
      '表单获客系统',
      '智能营销系统',
      '短视频内容创作数据服务',
    ],
    productList: ["官网小程序(参考图)", "电商(参考图)", "茶铺商城(参考图)", "计时器功能(参考图)"],
    name: '',
    phone: '',
    company: '',
    calc: {},
    tapped: {}
  },
  onLoad(options) {
    calc.reset()
  },
  showAbout: function (e) {
    wx.showModal({
      title: '关于',
      content: '一个简单的计算器 @V1.0',
      showCancel: false
    })
  },
  btnClicked: function (e) {
    var code = e.target.dataset.op
    calc.addOp(code)
    console.log(calc.getVars())
    this.setData({
      calc: calc.getVars()
    })
  },
  btnTouchStart: function (e) {
    var code = e.target.dataset.op
    var tapped = {
      [code]: 'active'
    }
    this.setData({
      tapped: tapped
    })
  },
  btnTouchEnd: function (e) {
    var code = e.target.dataset.op
    var tapped = {}
    this.setData({
      tapped: tapped
    })
  },
  nameInput(e) {
    this.setData({
      name: e.detail.value.trim()
    })
  },
  phoneInput(e) {
    this.setData({
      phone: e.detail.value.trim()
    })
  },
  companyInput(e) {
    this.setData({
      company: e.detail.value.trim()
    })
  },
  sumbit() {
    const name = this.data.name
    const phone = this.data.phone
    const company = this.data.company
    const phoneRegex = /^1\d{10}$/;
    if (!name) {
      tt.showToast({
        title: '姓名不能为空',
        icon: 'fail'
      });
    } else if (!phone) {
      tt.showToast({
        title: '手机号不能为空',
        icon: 'fail'
      });
    } else if (!phoneRegex.test(phone)) {
      tt.showToast({
        title: '请输入正确的手机号',
        icon: 'fail'
      });
    } else if (!company) {
      tt.showToast({
        title: '公司不能为空',
        icon: 'fail'
      });
    } else {
      tt.showLoading({
        title: '提交中...',
      });
      setTimeout(() => {
        tt.navigateTo({
          url: '/pages/success/index',
        });
      }, 1500);
    }
  },
  jumptoPay() {
    tt.navigateTo({
      url: '/pages/home1/index',
    });
  },
  changeTab(e) {
    const {
      tab,
      name
    } = e.currentTarget.dataset
    this.setData({
      tab
    })
    wx.setNavigationBarTitle({
      title: name
    });
  },
});