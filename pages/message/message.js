// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:'',
    showVideo:false,
    sourceOfVideo:'https://cdm-oss.oss-cn-zhangjiakou.aliyuncs.com/motionBankForOldPeople/%E8%80%81%E5%B9%B4%E4%BA%BA%E7%83%AD%E8%BA%AB%E8%BF%90%E5%8A%A8/MOTION_WARMUP_1.m4v'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      message: options.message,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    this.videoContext = wx.createVideoContext('myVideo')

  },

  showVideo:function(){

    this.setData({
      showVideo:true
    })


  },

  // button 播放
  btnVideoPlay: function () {

    this.videoContext.play()

  },  

  btnVideoPause: function () {

    this.videoContext.pause()

  }, 

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})