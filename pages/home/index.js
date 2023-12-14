const api = require("../../utils/request").Api;
Page({
  data: {
    images: [
      'https://static.qiliangjia.com/static/dy-mini/image/sw-3.png',
      'https://static.qiliangjia.com/static/dy-mini/image/sw-1.png',
      'https://static.qiliangjia.com/static/dy-mini/image/sw-2.png',
      'https://static.qiliangjia.com/static/dy-mini/image/sw-4.png',
      'https://static.qiliangjia.com/static/dy-mini/image/sw-5.png',
      'https://static.qiliangjia.com/static/dy-mini/image/sw-6.png'
    ],
    current: 0,
    tab: 1,
    like: {},
    tabList: [{
      name: '业务',
      value: 1
    }, {
      name: '相册',
      value: 2
    }],
    phone: ''
  },
  onLoad: function (options) {
    this.getInfo()
    this.setLink()
  },
  async getInfo() {
    tt.showLoading({
      title: '加载中...',
    });
    try {
      const {
        microapp: {
          appId
        }
      } = tt.getEnvInfoSync();
      const {
        data
      } = await api.getInfo({
        app_id: appId
      });

      if (data.code === 0 && data?.data?.result) {
        const {
          miniInfo,
          companyInfo
        } = data.data.result;
        this.setData({
          miniappInfo: miniInfo || [],
          companyInfo: companyInfo || []
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.defaultData();
      tt.hideLoading();
    }
  },
  setLink() {
    const res = tt.getStorageSync('like');
    let like = {
      check: false,
      num: Math.floor(Math.random() * (1000 - 300 + 1)) + 300
    }
    if (!res) {
      this.setData({
        like
      })
      const res = tt.setStorageSync('like', like);
    } else {
      this.setData({
        like: res
      })
    }
  },
  linkButton() {
    if (this.data.like.check) return
    const like = this.data.like
    like.check = true
    like.num = like.num + 1
    this.setData({
      like
    })
    const res = tt.setStorageSync('like', like);
  },
  defaultData() {
    const defaultMiniappInfo = {
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
    const miniappInfo = this.data.miniappInfo
    const companyInfo = this.data.companyInfo
    const updatedMiniappInfo = {
      ...miniappInfo
    };
    if (!companyInfo?.companyName) {
      this.setData({
        ['companyInfo.companyName']: '企业供应链'
      })
    }
    Object.keys(defaultMiniappInfo).forEach((field) => {
      if (miniappInfo[field] === undefined || miniappInfo[field] === null || !miniappInfo[field] || miniappInfo[field].length < 1) {
        updatedMiniappInfo[field] = defaultMiniappInfo[field];
      }
    });
    this.setData({
      miniappInfo: updatedMiniappInfo
    })
  },
  phoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  sumbit() {
    const phoneNumberPattern = /^1[3456789]\d{9}$/;
    const randomTime = Math.floor(Math.random() * (3000 - 1500 + 1)) + 1500;
    const phone = this.data.phone.trim()
    if (!phone || !phoneNumberPattern.test(phone)) {
      tt.showToast({
        title: '请输入正确的手机号',
        icon: "none"
      });
      return;
    }
    tt.showLoading({
      title: '提交中...',
    });
    setTimeout(() => {
      tt.showToast({
        title: '提交成功',
        icon: 'success'
      });
    }, randomTime);
  },
  changeTab(e) {
    const {
      index
    } = e.currentTarget.dataset
    this.setData({
      tab: index
    })
    tt.pageScrollTo({
      duration: 1000,
      selector: index === 1 ? '.business' : '.photo',
      offsetTop: -100,
      success(res) {
        console.log(`pageScrollTo调用成功`, res);
      },
      fail(err) {
        console.log(`pageScrollTo调用失败`, err);
      },
    })
  },
})