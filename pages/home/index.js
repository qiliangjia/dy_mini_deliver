Page({
  data: {},
  onLoad: function (options) {
    this.setAd()
  },
  setAd() {
    this.ad = tt.createRewardedVideoAd({
      adUnitId: "pkw4aybkp24yifsfra",
    });
    this.ad.onClose((data) => {
      console.log(data);
      tt.hideLoading();
      if (data.isEnded) {
        tt.showToast({
          title: '解锁成功！',
          icon: 'success'
        });
        setTimeout(() => {
          tt.navigateTo({
            url: '/pages/detail/index',
          });
        }, 800);
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
  onShow() {

  },

});