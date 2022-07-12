// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:true,
    isDisabled:true,
    btnstate:"default",
    switchChecked:false,
    date:'2022-07-01',
    time1:'00:00',
    time2:'00:00',
    recordData:{
      title:null,
      date:null,
      begintime:null,
      endtime:null,
      volume:null
    }
  },
  bindTimeChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time1: e.detail.value
    })
    this.setData({
      recordData:{
        begintime:this.data.time1
      }
    })
  },
  
  bindTimeChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time2: e.detail.value
    })
    this.setData({
      recordData:{
        endtime:this.data.time2
      }
    })
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    this.setData({
      recordData:{
        date:this.data.date
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
  navigateback()
  {
    wx.navigateBack({
      delta: 1,
    })
  },
  setTitle(e)
  {
    this.setData({
      recordData:{
        title:e.detail.value
      }
    })
  },
  setvolume(e)
  {
    this.setData({
      recordData:{
        volume:e.detail.value
      }
    })
  },
  recordconfirm(e)
  {
    if(this.data.isDisabled)
    {
      wx.showToast({
        title: '请完善信息！',
        icon:"none"
      })
    }else{
      
    }
  }
})