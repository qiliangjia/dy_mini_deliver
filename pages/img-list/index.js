Page({
  data: {
    images: [],
    info: {}
  },
  onLoad: function (options) {
    this.setData({
      info: JSON.parse(decodeURIComponent(options.img)) || {}
    })
    this.setImg()
  },
  setImg() {
    const arr = this.data.info
    let images = []
    arr.list.forEach(element => {
      images.push(element.img_url)
    });
    this.setData({
      images
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