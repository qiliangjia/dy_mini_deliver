Page({
  data: {
    array: []
  },
  onLoad: function (options) {
    this.setData({
      array: JSON.parse(decodeURIComponent(options.query)) || []
    })
  }
})