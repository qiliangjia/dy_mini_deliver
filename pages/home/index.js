// /Users/macbook/mac/dy_miniapp/dy_mini_deliver/pages/home/index.js
Page({
  data: {
    tabList: [{
      name: '业务',
      value: 1
    }, {
      name: '相册',
      value: 2
    }],
    list: [{
      name: '法兰',
      value: '法兰'
    }, {
      name: '弯头',
      value: '弯头'
    }, {
      name: '无缝钢管',
      value: '无缝钢管'
    }, {
      name: '三通',
      value: '三通'
    }, {
      name: '四通',
      value: '四通'
    }, {
      name: '保温钢管',
      value: '保温钢管'
    }],
    imageList: [
      'https://static.qiliangjia.com/static/dy-mini/miniapp/1.jpg',
      'https://static.qiliangjia.com/static/dy-mini/miniapp/2.jpg',
      'https://static.qiliangjia.com/static/dy-mini/miniapp/3.jpg',
      'https://static.qiliangjia.com/static/dy-mini/miniapp/4.jpg',
      'https://static.qiliangjia.com/static/dy-mini/miniapp/5.jpg',
      'https://static.qiliangjia.com/static/dy-mini/miniapp/6.jpg'
    ],
    tab: 1,
    show: false,
    subscribe: false
  },
  onLoad: function (options) {
    if (!options.index) {
      tt.reLaunch({
        url: '/pages/index/index',
      });
    }
    this.getPopup(options)
  },
  close() {
    this.setData({
      show: false,
      subscribe: false
    })
  },
  getPopup(e) {
    this.close()
    const res = e.index;
    if (res === '1') {
      this.setData({
        subscribe: true
      })
    } else if (res === '2') {
      this.setData({
        show: true
      })
      tt.setStorageSync('focus', true);
    }
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
      selector: index === 1 ? '.row' : '.image',
      offsetTop: -100,
      success(res) {
        console.log(`pageScrollTo调用成功`, res);
      },
      fail(err) {
        console.log(`pageScrollTo调用失败`, err);
      },
    })
  },
  makePhone() {
    tt.makePhoneCall({
      phoneNumber: "17601066860",
      success(res) {
        // 调用成功 makePhoneCall:ok
        console.log("调用成功", res.errMsg);
      },
      fail(res) {
        // 调用失败 makePhoneCall:fail
        console.log("调用失败", res.errMsg);
      },
    });
  },
  sendSms(e) {
    const {
      content
    } = e.currentTarget.dataset
    tt.sendSms({
      phoneNumber: "17601066860",
      content,
      success: (res) => {
        console.log("success", res);
      },
      fail: (err) => {
        console.log("fail", err);
      },
    });
  },
  previewImage(e) {
    const imageList = this.data.imageList
    const {
      index
    } = e.currentTarget.dataset
    tt.previewImage({
      current: imageList[index],
      urls: imageList,
      success: () => {
        console.log("previewImage success");
      },
    })
  },
  junmptoMap() {
    tt.navigateTo({
      url: '/pages/map/index',
    });
  }
})