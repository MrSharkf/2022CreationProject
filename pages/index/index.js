Page({
  data:{
    userInfo:null,
  },
  onLoad(options){
    wx.getUserInfo({
      success: res=>{
        this.setData({
          userInfo:res.userInfo
        })
        this.onShow()
      },
      fail: err => {
        wx.showToast({
          title: err,
          duration:2000
        })
      }
    })
    wx.cloud.callFunction({
      name: 'login',
    }).then(
      res=>{
        this.setData({
          userInfo:res.result.userId
        })
        if(!this.data.userInfo){
              wx.navigateTo({
                url: '../profile/profile',
              }).then(
                res=>{
                  wx.showToast({
                    title: '初次使用，请完善宝宝信息！',
                    icon:'none',
                    duration: 2000
                  })
                }
              )
        }
      },
      err=>{

      }
    )
  },
  naviToProfile(){
    wx.navigateTo({
      url: '../profile/profile',
    })
  },
  naviToCustom(){
    wx.navigateTo({
      url: '../ingredients/ingredients',
    })
  }
})