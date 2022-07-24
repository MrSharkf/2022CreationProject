// pages/profile/profile.js


import BodydataModel from '../../models/bodydata'
import HomeModel from '../../models/home'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:true,
    btnstate:"default",
    switchChecked:false,
    userInfo: null,
    babyname:null, 
    birthdate:'2020-01-01', 
    gender:'null', 
    height:null, 
    weight:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
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
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onAuthorize(e) {
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo
      })
    }
  },
  genderChange(e){
    this.setData({
      gender: e.detail.value
    })
  },
  babyNameSet(e){
    this.setData({
      babyname: e.detail.value
    })
  },
  birthdatechange(e){
    this.setData({
      birthdate: e.detail.value
    })
  },
  heightSet(e){
    this.setData({
      height: e.detail.value
    })
  },
  weightSet(e){
    this.setData({
      weight: e.detail.value
    })
  },

  register(){
   if(this.data.babyname&&this.data.birthdate&&this.data.gender&&this.data.height&&this.data.weight){
      HomeModel.addUserId().then(
        res=>{
          BodydataModel.updateUserInfo(this.data.babyname, 
            this.data.birthdate, 
            this.data.gender, 
            this.data.height, 
            this.data.weight).then(
              res => {
                wx.navigateBack({
                  delta: 1,
                }).then(
                  res=>{
                    wx.showToast({
                      title: '修改成功！',
                      icon: 'success',
                      duration: 2000
                    })
                  }
                )
              },
              err => {
                console.log(err)
                wx.showToast({
                  title: '修改失败',
                  icon:'none',
                  duration: 2000
                })
              }
            )
        }
      )
     
   }else{
      wx.showToast({
        title:'请完善宝宝信息！',
        icon:'none',
        duration: 2000
      })
    }
    
  }
})