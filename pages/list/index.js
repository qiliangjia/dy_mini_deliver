const api = require("../../utils/request").Api;
const {
  obj2Param
} = require("../../utils/index")
Page({
  data: {
    page: 1,
    limit: 20,
    dy_no: '',
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
      dy_no: e.detail.value
    })
  },
  onSearch() {
    this.setData({
      finished: false,
      list: [],
      page: 1
    })
    this.getList()
  },
  getList() {
    if (this.data.finished) return
    tt.showLoading({
      title: '加载中...',
    });
    const {
      query,
    } = tt.getStorageSync('pageInfo');
    const {
      microapp: {
        appId
      }
    } = tt.getEnvInfoSync();
    api.getUserList({
      appid: query?.appid || appId,
      project_id: query?.project_id || '23',
      page: this.data.page,
      limit: this.data.limit,
      dy_no: this.data.dy_no
    }).then(({
      data
    }) => {
      if (data.code === 0) {
        const item = data.data.list
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
          tt.hideToast();
        }
      } else {
        this.setData({
          finished: true
        })
        tt.showToast({
          title: '暂无数据',
          icon: 'fail'
        });
      }
    })
  },
  jumpto(e) {
    const {
      puid,
      ad_placement_id
    } = e.currentTarget.dataset.item
    try {
      tt.navigateTo({
        url: `/pages/detail/index?puid=${puid}&ad_placement_id=${ad_placement_id}`,
      });
    } catch (error) {
      console.log(error);
    }
  }
})