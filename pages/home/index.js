Page({
  data: {
    tabList: [{
        name: '首页',
        icon: 'https://static.qiliangjia.com/static/dy-mini/miniapp/wx/home-no.png',
        chios_icon: 'https://static.qiliangjia.com/static/dy-mini/miniapp/wx/home-good.png',
      },
      {
        name: '服务介绍',
        icon: 'https://static.qiliangjia.com/static/dy-mini/miniapp/wx/js.png',
        chios_icon: 'https://static.qiliangjia.com/static/dy-mini/miniapp/wx/js-good.png',
      },
      {
        name: '产品示例',
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
  },
  onLoad(options) {},

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
  handleProductItemClick(e) {
    const {
      name
    } = e.currentTarget.dataset
    if (name === '官网小程序(参考图)') {
      wx.navigateTo({
        url: '/pages/miniapp/index',
      })
    }
    if (name === '计时器功能(参考图)') {
      wx.navigateTo({
        url: '/pages/timer/index',
      })
    }
    if (name === '电商(参考图)') {
      wx.navigateTo({
        url: '/pages/ec/index',
      })
    }
    if (name === '茶铺商城(参考图)') {
      wx.navigateTo({
        url: '/pages/tea/index',
      })
    }
  },
});