const api = require("../../utils/request").Api;

Page({
  data: {
    images: []
  },
  onLoad: function (options) {
    this.getImagesList()
  },
  getImagesList() {
    api.getImages({
      url: 'https://static.qiliangjia.com/static/dy-mini/meitu/images.json'
    }).then((res) => {
      this.setData({
        images: res.data.images
      })
    })
  },
  previewImage(e) {
    const imageList = this.data.images
    const {
      index
    } = e.currentTarget.dataset
    tt.previewImage({
      current: imageList[index],
      urls: imageList,
      success: () => {
        console.log("previewImage success");
      },
    })
  },
})