Page({
  data: {
    show: false,
    follow: false,
    background: ['https://static.qiliangjia.com/static/dy-mini/miniapp/header.png', 'https://static.qiliangjia.com/static/dy-mini/miniapp/header.png', 'https://static.qiliangjia.com/static/dy-mini/miniapp/header.png'],
    current: 0
  },
  onLoad: function (options) {},
  close() {
    this.setData({
      show: false,
    });
    setTimeout(() => {
      this.setData({
        follow: true,
      });
    }, 600);
  },
  closeFollow() {
    this.setData({
      follow: false
    })
  },
  swiperChange(e) {
    this.setData({
      current: e.detail.current
    })
  },
  button() {
    this.setData({
      show: true
    })
  },
  followAwemeUser(e) {
    tt.followAwemeUser({
      awemeId: "CJLY8888",
      success: (res) => {
        console.log("引导关注抖音号成功，已关注:", res.followed);
      },
      fail: (res) => {
        console.log("引导关注抖音号失败，错误信息:", res.errMsg);
      },
    });
  },
  sendSms(e) {
    tt.sendSms({
      phoneNumber: "4000008118",
      content: "测试",
      success: (res) => {
        console.log("success", res);
      },
      fail: (err) => {
        console.log("fail", err);
      },
    });
  },
  previewImage(e) {
    const {
      index,
      list
    } = e.currentTarget.dataset;
    console.log(list[index]);
    tt.previewImage({
      current: list[index],
      urls: list,
      success: () => {
        console.log("previewImage success");
      },
    });
  },
});