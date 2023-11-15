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
    follow() {
      this.triggerEvent("button");
    }
  }
})