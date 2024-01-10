Page({
  data: {
    info: {},
  },
  onLoad: function (options) {
    this.setData({
      info: JSON.parse(decodeURIComponent(options.array)) || {}
    })
    this.setAd()
  },
  onUnload() {
    this.ad.destroy()
  },
  setAd() {
    this.ad = tt.createRewardedVideoAd({
      adUnitId: "joxrb9opywkb7jj8w0",
    });
    this.ad.onClose((data) => {
      tt.hideLoading();
      if (data.isEnded) {
        tt.showToast({
          title: '解锁成功！',
          icon: 'success'
        });
        setTimeout(() => {
          tt.redirectTo({
            url: '/pages/img-list/index?img=' + encodeURIComponent(JSON.stringify(this.data.info)),
          });
        }, 1000);
      } else {
        tt.showToast({
          title: '解锁失败！',
          icon: 'fail'
        });
      }
    });
    this.ad.load();
  },
  jumptoButton() {
    tt.showLoading({
      title: '视频加载中',
    });
    this.ad.show();
  },
});