const defaultTime = {
  defaultWorkTime: 25,
  defaultRestTime: 25,
};
App({
  onLaunch: function () {
    let workTime = wx.getStorageSync("workTime");
    let restTime = wx.getStorageSync("restTime");
    if (!workTime) {
      tt.setStorage({
        key: "workTime",
        data: defaultTime.defaultWorkTime,
      });
    }
    if (!restTime) {
      tt.setStorage({
        key: "restTime",
        data: defaultTime.defaultRestTime,
      });
    }
  }
})