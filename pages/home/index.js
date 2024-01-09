const api = require("../../utils/request").Api;
const api_els = require("../../utils/request-els").Api;

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
    phone: '',
    textArr: [],
    miniappInfo: {}
  },
  onLoad: function (options) {
    this.getContent()
    this.setHeaderArr()
    this.setLink()
  },
  getContent() {
    tt.showLoading({
      title: '加载中...',
    });
    const {
      microapp: {
        appId,
        envType
      }
    } = tt.getEnvInfoSync();
    api_els.getContent(appId).then(({
      data
    }) => {
      if (data.code === 0) {
        const item = data.data;
        const request = item?.info?.result || {};
        const miniInfo = request?.miniInfo || {};

        const isPublished = envType === 'production';

        let miniappInfo = {
          contactName: miniInfo?.contactName || 'wwb',
          contactPosition: miniInfo?.contactPosition || '产品经理',
          introduce: isPublished ? miniInfo?.introduce : item.content,
          companyPhoto: isPublished && miniInfo?.companyPhoto?.length > 0 ? miniInfo?.companyPhoto : item.album,
          banner: isPublished && miniInfo?.banner?.length > 0 ? miniInfo?.banner : item.album,
          puid: item.info?.puid || ''
        };

        this.setData({
          miniappInfo
        });

        tt.hideToast();
      }
    })
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
    const like = this.data.like
    like.check = !like.check
    like.num = like.check ? like.num + 1 : like.num - 1
    this.setData({
      like
    })
    const res = tt.setStorageSync('like', like);
  },
  phoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  swiperChange(e) {
    this.setData({
      current: e.detail.current
    })
  },
  sumbit() {
    const phoneNumberPattern = /^1[3456789]\d{9}$/;
    const randomTime = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
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
    if (!this.data.miniappInfo.puid) {
      setTimeout(() => {
        tt.showToast({
          title: '提交成功',
          icon: 'success'
        });
      }, randomTime);
      return
    }
    api.setMobile({
      puid: this.data.miniappInfo.puid,
      project_id: 16,
      mobile: phone
    }).then(({
      data
    }) => {
      if (data.code === 0) {
        tt.showToast({
          title: '提交成功',
          icon: 'success'
        });
      } else {
        tt.showToast({
          title: data.msg,
          icon: "fail"
        });
      }
    }).catch(() => {
      tt.showToast({
        title: '提交失败',
        icon: "fail"
      });
    })
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
      offsetTop: -55,
      success(res) {
        console.log(`pageScrollTo调用成功`, res);
      },
      fail(err) {
        console.log(`pageScrollTo调用失败`, err);
      },
    })
  },
  previewImage(e) {
    const {
      index,
      list
    } = e.currentTarget.dataset;
    let array = []
    list.forEach((e) => {
      array.push(e.url || e)
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
  setHeaderArr() {
    let arr = [{
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/468.png",
        "name": "汪*"
      },
      {
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/629.png",
        "name": "常**"
      },
      {
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/292.png",
        "name": "蔡*"
      },
      {
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/177.png",
        "name": "熊**"
      },
      {
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/323.png",
        "name": "吴*"
      },
      {
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/317.png",
        "name": "胡*"
      },
      {
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/464.png",
        "name": "杨**"
      },
      {
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/14.png",
        "name": "徐**"
      },
      {
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/491.png",
        "name": "郑**"
      },
      {
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/214.png",
        "name": "毛**"
      },
      {
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/381.png",
        "name": "周*"
      },
      {
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/484.png",
        "name": "钟**"
      },
      {
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/436.png",
        "name": "程**"
      },
      {
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/558.png",
        "name": "潘**"
      },
      {
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/611.png",
        "name": "曹**"
      },
      {
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/545.png",
        "name": "吕**"
      },
      {
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/93.png",
        "name": "朱*"
      },
      {
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/245.png",
        "name": "史*"
      },
      {
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/343.png",
        "name": "于**"
      },
      {
        "avatar": "https://static.mirco.link/static/dy_shop_miniapp/comment/266.png",
        "name": "方*"
      }
    ]
    this.setData({
      textArr: arr.sort(() => Math.random() - 0.5)
    })
  },
})