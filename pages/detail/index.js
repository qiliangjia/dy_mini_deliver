const api = require("../../utils/request").Api;

Page({
  data: {
    puid: '',
    list: [],
    check: false,
    mount_id: 0
  },
  onLoad: function (options) {
    this.setData({
      puid: options?.puid || '',
      mount_id: options?.mount_id || 3
    })
    this.getInfo()
    this.setAd()
  },
  getInfo() {
    const {
      query
    } = tt.getStorageSync('pageInfo');
    api.getDetail({
      puid: this.data.puid || query?.puid || '',
      project_id: query?.project_id || '23'
    }).then(({
      data
    }) => {
      if (data.code === 0) {
        this.setData({
          list: data.data.list
        })
      }
    })
  },
  setAd() {
    const {
      query
    } = tt.getStorageSync('pageInfo');
    this.ad = tt.createRewardedVideoAd({
      adUnitId: query.ad_placement_id,
    });
    this.ad.onClose((data) => {
      console.log(data);
      tt.hideLoading();
      if (data.isEnded) {
        tt.showToast({
          title: '解锁成功！',
          icon: 'success'
        });
        this.setData({
          check: true
        })
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
})