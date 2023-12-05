App({
  onLaunch: function () {
    tt.login({
      success: (res) => {

      },
      fail: (res) => {

      },
    });
  },
  onHide(){
    // tt.removeStorageSync('is_follow');
  }
})