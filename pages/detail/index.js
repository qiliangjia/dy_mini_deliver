const api = require("../../utils/request").Api;
const {
  obj2Param
} = require("../../utils/index")
Page({
  data: {
    puid: '',
    list: [],
    ad_placement_id: '',
    check: false,
    mount_id: 0
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
    const {
      query
    } = tt.getStorageSync('pageInfo');
    api.getDetail({
      puid: this.data.puid,
      project_id: query?.project_id || '23'
    }).then(({
      data
    }) => {
      if (data.code === 0) {
        this.setData({
          list: data.data.list
        })
        if (this.data.mount_id < 1) {
          this.setData({
            mount_id: data.data.list[0].mount_id
          })
        }
      }
    }).finally(() => {
      this.setAd()
      this.changeStatus(1)
      tt.hideToast();
    })
  },
  setAd() {
    this.ad = tt.createRewardedVideoAd({
      // adUnitId: this.data.ad_placement_id,
      adUnitId: 'qz802ehmhdbhci2tbi',
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
    if (mount_id === this.data.mount_id) return
    this.setData({
      mount_id,
      check: false
    })
  },
  changeStatus(type) {
    const {
      query
    } = tt.getStorageSync('pageInfo');
    const {
      microapp: {
        appId
      }
    } = tt.getEnvInfoSync();
    api.userStatus({
      project_id: query?.project_id || '23',
      appid: query?.appid || appId,
      puid: this.data.puid,
      mount_id: this.data.mount_id,
      type
    })
  }
})