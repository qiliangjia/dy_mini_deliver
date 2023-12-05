Page({
  data: {
    isOnShow: false
  },
  onLoad() {
    console.log('onLoad');
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
    const res = tt.getStorageSync('is_follow');
    if (res) {
      tt.exitMiniProgram();
      return
    }
    tt.navigateTo({
      url: '/pages/home/index?showFollow=true&isPull=true',
    });
  },
  //视频挂载和分享
  onShareAppMessage: function (shareOption) {
    return {
      title: "清北家校｜点击免费领提分秘籍",
    }
  },
})