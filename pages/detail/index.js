// /Users/macbook/mac/dy_miniapp/dy_mini_deliver/pages/detail/index.js
Page({
  data: {
    images: [
      'https://static.qiliangjia.com/static/dy-mini/meitu/1.jpeg',
      'https://static.qiliangjia.com/static/dy-mini/meitu/2.jpeg',
      'https://static.qiliangjia.com/static/dy-mini/meitu/3.jpeg',
      'https://static.qiliangjia.com/static/dy-mini/meitu/4.jpeg',
      'https://static.qiliangjia.com/static/dy-mini/meitu/5.jpeg',
      'https://static.qiliangjia.com/static/dy-mini/meitu/6.jpeg',
      'https://static.qiliangjia.com/static/dy-mini/meitu/7.jpeg',
      'https://static.qiliangjia.com/static/dy-mini/meitu/8.jpeg',
      'https://static.qiliangjia.com/static/dy-mini/meitu/9.jpeg',
      'https://static.qiliangjia.com/static/dy-mini/meitu/10.jpeg'
    ]
  },
  onLoad: function (options) {

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