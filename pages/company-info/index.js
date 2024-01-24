Page({
  data: {
    miniappInfo: {},
    tabList: [{
      name: '公司简介',
      value: 1
    }, {
      name: '联系我',
      value: 2
    }, {
      name: '企业风采',
      value: 3
    }],
    tab: 1,
    like: {},
  },
  onLoad: function (options) {
    this.setData({
      miniappInfo: JSON.parse(decodeURIComponent(options.miniappInfo)) || {},
      tab: Number(options?.index) || 1
    })
    this.setLink()
  },
  changeTab(e) {
    const {
      index
    } = e.currentTarget.dataset
    this.setData({
      tab: index
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
})