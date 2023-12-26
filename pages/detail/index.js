const api = require("../../utils/request").Api;
const {
  obj2Param
} = require("../../utils/index")
Page({
  data: {
    puid: '',
    list: [],
    ad_placement_id: '',
    show: false,
    check: false,
    mount_id: 0,
    ad_status: true,
  },
  onLoad: function (options) {
    this.setData({
      puid: options?.puid || '',
      mount_id: Number(options?.mount_id) || 0,
      ad_placement_id: options?.ad_placement_id || ''
    })
    this.changePage(options)
    this.getInfo()
  },
  onUnload() {
    this.ad.destroy()
  },
  changePage(options) {
    const route = getCurrentPages()
    if (route.length < 2 || route[route.length - 2].route !== 'pages/list/index') {
      tt.reLaunch({
        url: `/pages/list/index?${obj2Param(options)}`,
      });
    }
  },
  getInfo() {
    tt.showLoading({
      title: '加载中...',
    });
    api.getDetail({
        puid: this.data.puid,
      }).then((res) => {
        this.setData({
          list: res.data.list
        })
        if (this.data.mount_id < 1) {
          this.setData({
            mount_id: res.data.list[0].mount_id
          })
        }
      })
      .finally(() => {
        this.setAd()
        this.changeStatus(1)
        tt.hideLoading();
      })
  },
  setAd() {
    this.ad = tt.createRewardedVideoAd({
      adUnitId: this.data.ad_placement_id,
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
    this.ad.onLoad((e) => {
      this.setData({
        ad_status: true
      })
      console.log('广告加载成功', e);
    })
    this.ad.onError((e) => {
      this.setData({
        ad_status: false
      })
      console.log('广告加载失败', e);
    })
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
            this.close()
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
  downloadButton() {
    if (this.data.check) {
      this.saveImageToPhotosAlbum()
      return
    }
    tt.showLoading({
      title: '视频加载中',
    });
    this.ad.show().catch((e) => {
      this.ad.load().then(() => {
        this.ad.show();
      });
    })
  },
  close() {
    this.setData({
      show: false
    })
  },
  openPopup() {
    if (this.data.check) {
      this.saveImageToPhotosAlbum()
      return
    }
    if (!this.data.ad_status) {
      this.setData({
        check: true
      })
      return
    }
    this.setData({
      show: true
    })
  },
  chiosImg(e) {
    const {
      mount_id
    } = e.currentTarget.dataset.item
    if (mount_id === this.data.mount_id) return
    this.setData({
      mount_id,
      check: false
    })
    this.changeStatus(1)
  },
  changeStatus(type) {
    api.userStatus({
      puid: this.data.puid,
      mount_id: this.data.mount_id,
      type
    })
  }
})