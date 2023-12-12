const api = require("../../utils/request").Api;

Page({
  data: {
    page: 1,
    limit: 20,
    dy_no: '',
    list: []
  },
  onLoad: function (options) {
    this.getList()
  },
  searchInput(e) {
    this.setData({
      dy_no: e.detail.value
    })
  },
  getList() {
    tt.showLoading({
      title: '加载中...',
    });
    const {
      query
    } = tt.getStorageSync('pageInfo');
    api.getUserList({
      appid: query?.appid,
      project_id: query?.project_id,
      page: this.data.page,
      limit: this.data.limit,
      dy_no: this.data.dy_no
    }).then(({
      data
    }) => {
      if (data.code === 0) {
        console.log(data.data.list[0].list);
        this.setData({
          list: data.data.list
        })
      }
    }).finally(() => {
      tt.hideToast();
    })
  },
  jumpto(e) {
    const {
      puid
    } = e.currentTarget.dataset.item
    tt.navigateTo({
      url: `/pages/detail/index?puid=${puid}`,
    });
  }
})