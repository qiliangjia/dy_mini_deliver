App({
  onLaunch(e) {
    this.setPageInfo(e)
  },
  onShow(e) {
    this.setPageInfo(e)
  },
  setPageInfo(e) {
    if (Object.keys(e?.query).length !== 0 && e?.query?.puid) {
      tt.setStorageSync("pageInfo", e);
    }
  }
})