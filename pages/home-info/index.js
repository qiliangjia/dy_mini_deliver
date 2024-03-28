const api = require("../../utils/request").Api;
const api_els = require("../../utils/request-els").Api;

Page({
  data: {
    current: 0,
    tab: 1,
    tabList: [{
      name: '公司简介',
      src: '/image/home-info/icon-1.png',
      path: 'company-info',
    }, {
      name: '产品介绍',
      src: '/image/home-info/icon-2.png',
      path: 'prdouct-info'
    }, {
      name: '企业风采',
      src: '/image/home-info/icon-3.png',
      path: 'company-info'
    }, {
      name: '留言反馈',
      src: '/image/home-info/icon-4.png',
      path: 'sumbit-info'
    }, {
      name: '新闻动态',
      src: '/image/home-info/icon-5.png',
      path: 'new-dynamic'
    }],
    info: {
      mobile: '',
      name: '',
      desc: ''
    },
    textArr: [],
    miniappInfo: {},
    showClue: false,
    clueComponentId: ''
  },
  onLoad: function (options) {
    this.getClueId()
    this.getContent(options)
    this.setHeaderArr()
  },
  getClueId() {
    api.getClue().then((res) => {
      if (res?.config_id) {
        this.setData({
          showClue: true,
          clueComponentId: res.config_id
        })
      }
    })
  },
  getPhoneNumber(e) {
    const {
      encryptedData,
      iv,
      errMsg,
    } = e.detail
    if (encryptedData && iv && errMsg === 'getPhoneNumber:ok') {
      sumbit()
    }else{
      console.log(e);
    }
  },
  jumptotab(e) {
    const arr = e.currentTarget.dataset
    const path = arr?.item?.path || arr.path
    if (arr?.item?.name === '企业风采') {
      tt.navigateTo({
        url: `/pages/${path}/index?miniappInfo=${encodeURIComponent(JSON.stringify(this.data.miniappInfo))}&index=3`,
      });
    } else {
      tt.navigateTo({
        url: `/pages/${path}/index?miniappInfo=${encodeURIComponent(JSON.stringify(this.data.miniappInfo))}`,
      });
    }
  },
  getContent(options) {
    tt.showLoading({
      title: '加载中...',
    });
    const {
      microapp: {
        envType
      }
    } = tt.getEnvInfoSync();
    api.getPuidContent({
      puid: options?.puid || '202331218486001869'
    }).then((res) => {
      const item = res;
      const request = JSON.parse(item?.info?.result) || {};
      const miniInfo = request?.miniInfo || {};

      const isPublished = envType === 'production';

      let miniappInfo = {
        contactName: miniInfo?.contactName || 'wwb',
        contactPosition: miniInfo?.contactPosition || '产品经理',
        introduce: isPublished ? miniInfo?.introduce : item.content,
        companyPhoto: isPublished && miniInfo?.companyPhoto?.length > 0 ? miniInfo?.companyPhoto : item.album,
        banner: isPublished && miniInfo?.banner?.length > 0 ? miniInfo?.banner : item.album,
        products: miniInfo.products || [],
        news: miniInfo.news || [],
        phone: miniInfo.phone || '',
        puid: item.info?.puid || ''
      };

      this.setData({
        miniappInfo
      });

      tt.hideToast();
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
  swiperChange(e) {
    this.setData({
      current: e.detail.current
    })
  },
  jumptoDetail(e) {
    const {
      item
    } = e.currentTarget.dataset
    tt.navigateTo({
      url: `/pages/detail/index?query=${encodeURIComponent(JSON.stringify(item))}`,
    });
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
      success(res) {},
      fail(err) {},
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
      success: () => {},
      fail: (e) => {}
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