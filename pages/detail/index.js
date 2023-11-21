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
      url: 'https://static.qiliangjia.com/static/dy-mini/meitu/images.js'
    }).then((res) => {
      try {
        this.setData({
          images: eval(res.data)
        })
      } catch (error) {
        console.log(error);
      }
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