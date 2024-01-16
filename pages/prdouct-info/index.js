Page({
  data: {
    miniappInfo: {},
  },
  onLoad: function (options) {
    this.setData({
      miniappInfo: JSON.parse(decodeURIComponent(options.miniappInfo)) || {}
    })
    console.log(this.data.miniappInfo);
  },
  jumptoDetail(e) {
    const {
      item
    } = e.currentTarget.dataset
    tt.navigateTo({
      url: `/pages/detail/index?query=${encodeURIComponent(JSON.stringify(item))}`,
    });
  },
})