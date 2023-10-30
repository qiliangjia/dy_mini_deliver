Page({
  data: {
    tabList: [
      {
        name: "业务",
        value: 1,
      },
      {
        name: "相册",
        value: 2,
      },
    ],
    list: [
      {
        name: "食用油仓储中转物流",
        value: "食用油仓储中转物流",
      },
      {
        name: "食用油精炼分提生产",
        value: "食用油精炼分提生产",
      },
      {
        name: "食用油分装罐装",
        value: "食用油分装罐装",
      },
      {
        name: "食用油批发零售",
        value: "食用油批发零售",
      },
    ],
    imageList: [
      "/image/1.jpg",
      "/image/2.jpg",
      "/image/3.jpg",
      "/image/4.jpg",
      "/image/5.jpg",
      "/image/6.jpg",
    ],
    tab: 1,
    show: false,
    subscribe: false,
  },
  onLoad: function (options) {
    // if (!options.index) {
    //   tt.reLaunch({
    //     url: '/pages/index/index',
    //   });
    // }
    this.getPopup(options);
  },
  close() {
    this.setData({
      show: false,
      subscribe: false,
    });
  },
  getPopup(e) {
    this.close();
    const res = e.index;
    if (res === "1") {
      this.setData({
        subscribe: true,
      });
    } else if (res === "2") {
      this.setData({
        show: true,
      });
      tt.setStorageSync("focus", true);
    }
  },
  changeTab(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      tab: index,
    });
    tt.pageScrollTo({
      duration: 1000,
      selector: index === 1 ? ".row" : ".image",
      offsetTop: -100,
      success(res) {
        console.log(`pageScrollTo调用成功`, res);
      },
      fail(err) {
        console.log(`pageScrollTo调用失败`, err);
      },
    });
  },
  makePhone() {
    tt.makePhoneCall({
      phoneNumber: "4000008118",
      success(res) {
        // 调用成功 makePhoneCall:ok
        console.log("调用成功", res.errMsg);
      },
      fail(res) {
        // 调用失败 makePhoneCall:fail
        console.log("调用失败", res.errMsg);
      },
    });
  },
  sendSms(e) {
    const { content } = e.currentTarget.dataset;
    tt.sendSms({
      phoneNumber: "4000008118",
      content,
      success: (res) => {
        console.log("success", res);
      },
      fail: (err) => {
        console.log("fail", err);
      },
    });
  },
  previewImage(e) {
    const imageList = this.data.imageList;
    const { index } = e.currentTarget.dataset;
    tt.previewImage({
      current: imageList[index],
      urls: imageList,
      success: () => {
        console.log("previewImage success");
      },
    });
  },
  junmptoMap() {
    tt.navigateTo({
      url: "/pages/map/index",
    });
  },
});
