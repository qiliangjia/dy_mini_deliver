const api = require("../../utils/request").Api;

Page({
  data: {
    puid: '',
    list: [],
    check: false,
    mount_id: 0
  },
  onLoad: function (options) {
    const {
      query
    } = tt.getStorageSync('pageInfo');
    this.setData({
      puid: options?.puid || query.puid || '',
      mount_id: Number(options?.mount_id) || Number(query?.mount_id)
    })
    this.getInfo()
    this.setAd()
    this.changeStatus(1)
  },
  getInfo() {
    const {
      query
    } = tt.getStorageSync('pageInfo');
    api.getDetail({
      puid: this.data.puid,
      project_id: query?.project_id || ''
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
      tt.hideLoading();
      if (data.isEnded) {
        this.setData({
          check: true
        })
        this.saveImageToPhotosAlbum()
      } else {
        tt.showToast({
          title: '解锁失败！',
          icon: 'fail'
        });
      }
    });
    this.ad.load();
  },
  saveImageToPhotosAlbum() {
    const item = this.data.list.find(item => item.mount_id === this.data.mount_id);
    tt.downloadFile({
      url: item.img_url,
      header: {
        "content-type": "application/json",
      },
      success: (res) => {
        let filePath = res.tempFilePath;
        tt.saveImageToPhotosAlbum({
          filePath,
          success: (res) => {
            this.changeStatus(2)
            tt.showToast({
              title: "成功保存到本地相册"
            });
          },
          fail: (err) => {
            let errType = err.errMsg.includes(
                "saveImageToPhotosAlbum:fail cancel"
              ) ?
              "取消保存" :
              "保存失败";
            tt.showToast({
              title: errType,
              icon: 'fail'
            });
          },
        });
      },
      fail: (err) => {
        tt.showToast({
          title: '下载出错',
          icon: 'fail'
        });
      },
    });
  },
  jumptoButton() {
    if (this.data.check) {
      this.saveImageToPhotosAlbum()
      return
    }
    tt.showLoading({
      title: '视频加载中',
    });
    this.ad.show();
  },
  chiosImg(e) {
    const {
      mount_id
    } = e.currentTarget.dataset.item
    tt.reLaunch({
      url: `/pages/detail/index?puid=${this.data.puid}&mount_id=${mount_id}`,
    });
  },
  changeStatus(type) {
    const {
      query
    } = tt.getStorageSync('pageInfo');
    api.userStatus({
      project_id: query?.project_id,
      puid: query?.puid,
      mount_id: this.data.mount_id,
      type
    })
  }
})