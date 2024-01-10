const api = require("../../utils/request").Api;
const {
  obj2Param
} = require("../../utils/index")
Page({
  data: {
    page: 1,
    limit: 20,
    rd_str: '',
    list: [],
    finished: false
  },
  onLoad(options) {
    this.jumptoDetail(options)
    this.getList()
  },
  jumptoDetail(options) {
    if (options?.puid && options?.mount_id) {
      tt.navigateTo({
        url: `/pages/detail/index?${obj2Param(options)}`,
      });
    }
  },
  onReachBottom() {
    this.setData({
      page: this.data.page + 1
    })
    this.getList()
  },
  searchInput(e) {
    this.setData({
      rd_str: e.detail.value
    })
  },
  onSearch() {
    if (!this.data.rd_str.trim()) {
      tt.showToast({
        title: '密钥不能为空',
        icon: 'fail'
      });
      return
    }
    tt.showLoading({
      title: '加载中...',
    });
    api.getUserList({
      page: this.data.page,
      limit: this.data.limit,
      rd_str: this.data.rd_str
    }).then((res) => {
      const item = res.data
      delete item.img_url;
      tt.navigateTo({
        url: `/pages/detail/index?${obj2Param(item)}`,
      });
    }).catch(() => {
      tt.showToast({
        title: '密钥无效',
        icon: 'fail'
      });
    }).finally(() => {
      tt.hideLoading();
    })
  },
  getList() {
    if (this.data.finished) return
    tt.showLoading({
      title: '加载中...',
    });
    api.getUserList({
      page: this.data.page,
      limit: this.data.limit,
    }).then((res) => {
      const item = res.data.list
      if (item.length === 0) {
        this.setData({
          finished: true
        })
        tt.showToast({
          title: '没有更多了',
        });
      } else {
        this.setData({
          list: this.data.list.concat(item)
        })
        tt.hideLoading();
      }
    }).catch(() => {
      this.setData({
        finished: true
      })
      tt.showToast({
        title: '暂无数据',
        icon: 'fail'
      });
    })
  },
  jumpto(e) {
    const item = e.currentTarget.dataset.item;
    tt.navigateTo({
      url: `/pages/home/index?array=${encodeURIComponent(JSON.stringify(item))}`,
    });
  }
})