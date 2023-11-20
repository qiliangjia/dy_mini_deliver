// /Users/macbook/mac/dy_miniapp/dy_mini_deliver/pages/detail/index.js
Page({
  data: {
    images: [
      '/image/1.jpeg',
      '/image/2.jpeg',
      '/image/3.jpeg',
      '/image/4.jpeg',
      '/image/5.jpeg',
      '/image/6.jpeg',
      '/image/7.jpeg',
      '/image/8.jpeg',
      '/image/9.jpeg',
      '/image/10.jpeg'
    ]
  },
  onLoad: function (options) {

  },
  previewImage(e) {
    const imageList = this.data.images
    const {
      index
    } = e.currentTarget.dataset
    console.log(index);
    tt.previewImage({
      current: imageList[index],
      urls: imageList,
      success: () => {
        console.log("previewImage success");
      },
    })
  },
})