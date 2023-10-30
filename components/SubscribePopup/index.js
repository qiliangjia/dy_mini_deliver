
Component({
  data: {

  },
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: function (newVal) {
        if (newVal === true) {
          // useReport(ReportList.POPUP_SHOW)
        }
      },
    },
  },
  methods: {
    onClose() {
      this.triggerEvent("close");
    },
    subscribe(e) {
      const that = this
      tt.requestSubscribeMessage({
        tmplIds: ['MSG1660355160457290852290226014519'],
        success(res) {
          tt.showToast({
            title: "订阅成功",
            icon: "success",
          });
          that.triggerEvent("close");
          //订阅成功
          console.log("订阅成功", res);
        },
        fail(error) {
          //订阅失败
          console.log("订阅失败, 错误详情: ", error);
          tt.showToast({
            title: "订阅失败",
            icon: "fail",
          });
        },
        complete(res) {
          //订阅完成
          console.log("tt.requestSubscribeMessage API调用完成: ", res);
        },
      });
    }
  }
})