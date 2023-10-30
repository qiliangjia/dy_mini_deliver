const app = getApp()

Page({
  data: {
    isOnShow: false,
    indexPopup: 1
  },
  onLoad: function () {
    console.log('Welcome to Mini Code')
  },
  onReady() {
    tt.navigateTo({
      url: '/pages/home/index?index=3',
    });
  },
  onShow() {
    if (!this.data.isOnShow) {
      this.setData({
        isOnShow: true
      })
      return
    }
    this.getPopup()
  },
  getPopup() {
    const res = tt.getStorageSync('focus');
    if (res) {
      tt.exitMiniProgram()
      tt.removeStorageSync('focus');
      return
    }
    let index = this.data.indexPopup
    this.setData({
      indexPopup: index === 1 ? 2 : 1
    })
    setTimeout(() => {
      tt.navigateTo({
        url: `/pages/home/index?index=${index}`,
      });
    }, 300);
  }
})