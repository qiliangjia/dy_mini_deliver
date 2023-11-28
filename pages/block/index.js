Page({
  data: {
    isOnShow: false
  },
  onReady() {
    tt.navigateTo({
      url: '/pages/home/index?isPull=true',
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
      url: '/pages/home/index?showFollow=true&isPull=true',
    });
  },
  //视频挂载和分享
  onShareAppMessage: function (shareOption) {
    return {
      title: "查看我公司名片",
    }
  },
})