const util = require("../../utils/index.js");
const defaultLogName = {
  work: "工作",
  rest: "休息",
};
const actionName = {
  stop: "停止",
  start: "开始",
};

const initDeg = {
  left: 45,
  right: -45,
};
Page({
  data: {
    tab: 1,
    tousu: "",
    remainTimeText: "",
    timerType: "work",
    log: {},
    completed: false,
    isRuning: false,
    leftDeg: initDeg.left,
    rightDeg: initDeg.right,
  },
  onLoad(options) {
  },
  editTab(e) {
    this.setData({
      tab: e.target.dataset.tab,
    });
  },
  tousuInput(e) {
    this.setData({
      tousu: e.detail.value,
    });
  },
  jumptoUser() {
    tt.navigateTo({
      url: "/pages/qrCode1/index",
    });
  },
  submit() {
    tt.showToast({
      title: "提交成功！",
      icon: "success",
    });
    setTimeout(() => {
      this.setData({
        tousu: "",
      });
    }, 1500);
  },
  onReady() { },
  onShow() {
    if (this.data.isRuning) return;
    let workTime = util.formatTime(tt.getStorageSync("workTime"), "HH");
    let restTime = util.formatTime(tt.getStorageSync("restTime"), "HH");
    this.setData({
      workTime: workTime,
      restTime: restTime,
      remainTimeText: workTime + ":00",
    });
  },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() { },
  onReachBottom() { },
  onShareAppMessage() { },
  startTimer: function (e) {
    let startTime = Date.now();
    let isRuning = this.data.isRuning;
    let timerType = e.target.dataset.type;
    let showTime = this.data[timerType + "Time"];
    let keepTime = showTime * 60 * 1000;
    let logName = this.logName || defaultLogName[timerType];

    if (!isRuning) {
      this.timer = setInterval(
        function () {
          this.updateTimer();
          this.startNameAnimation();
        }.bind(this),
        1000
      );
    } else {
      this.stopTimer();
    }

    this.setData({
      isRuning: !isRuning,
      completed: false,
      timerType: timerType,
      remainTimeText: showTime + ":00",
      taskName: logName,
    });

    this.data.log = {
      name: logName,
      startTime: Date.now(),
      keepTime: keepTime,
      endTime: keepTime + startTime,
      action: actionName[isRuning ? "stop" : "start"],
      type: timerType,
    };

    this.saveLog(this.data.log);
  },

  startNameAnimation: function () {
    let animation = tt.createAnimation({
      duration: 450,
    });
    animation.opacity(0.2).step();
    animation.opacity(1).step();
    this.setData({
      nameAnimation: animation.export(),
    });
  },

  stopTimer: function () {
    // reset circle progress
    this.setData({
      leftDeg: initDeg.left,
      rightDeg: initDeg.right,
    });

    // clear timer
    this.timer && clearInterval(this.timer);
  },

  updateTimer: function () {
    let log = this.data.log;
    let now = Date.now();
    let remainingTime = Math.round((log.endTime - now) / 1000);
    let H = util.formatTime(Math.floor(remainingTime / (60 * 60)) % 24, "HH");
    let M = util.formatTime(Math.floor(remainingTime / 60) % 60, "MM");
    let S = util.formatTime(Math.floor(remainingTime) % 60, "SS");
    let halfTime;

    // update text
    if (remainingTime > 0) {
      let remainTimeText = (H === "00" ? "" : H + ":") + M + ":" + S;
      this.setData({
        remainTimeText: remainTimeText,
      });
    } else if (remainingTime == 0) {
      this.setData({
        completed: true,
      });
      this.stopTimer();
      return;
    }

    // update circle progress
    halfTime = log.keepTime / 2;
    if (remainingTime * 1000 > halfTime) {
      this.setData({
        leftDeg: initDeg.left - (180 * (now - log.startTime)) / halfTime,
      });
    } else {
      this.setData({
        leftDeg: -135,
      });
      this.setData({
        rightDeg:
          initDeg.right - (180 * (now - (log.startTime + halfTime))) / halfTime,
      });
    }
  },

  changeLogName: function (e) {
    this.logName = e.detail.value;
  },

  saveLog: function (log) {
    var logs = tt.getStorageSync("logs") || [];
    logs.unshift(log);
    tt.setStorageSync("logs", logs);
  },
  jumpto() {
    tt.navigateTo({
      url: "/pages/logs/logs",
    });
  },
});
