Page({
  data: {
    isOnShow: false
  },
  onReady() {
    tt.navigateTo({
      url: '/pages/home/index',
    });
  },
  onShow() {
    if (!this.data.isOnShow) {
      this.setData({
        isOnShow: true
      })
      return
    }
    tt.navigateTo({
      url: '/pages/home/index?showFollow=true',
    });
  }
})