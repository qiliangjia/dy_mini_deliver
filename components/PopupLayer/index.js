// /Users/macbook/mac/dy_miniapp/nezha_dy_miniapp/nezha_dy_miniapp/components/CouponLayer/index/index.js

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
    followAwemeUser(e) {
      tt.followAwemeUser({
        awemeId: "61377796419",
        success: (res) => {
          this.triggerEvent("close");
          console.log("引导关注抖音号成功，已关注:", res.followed);
        },
        fail: (res) => {
          console.log("引导关注抖音号失败，错误信息:", res.errMsg);
        },
      });
      // tt.setStorageSync('submitButton', 2);
      // this.triggerEvent('getPhone', e.detail)
      // useReport(ReportList.POPUP_SUBMIT_BUTTON)
    }
  }
})