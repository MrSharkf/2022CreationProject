// pages/record/record.js
import milkManageModel from '../../models/milkManage'
import { formatDate, formatDateTime, formatTime } from '../../utils/dateTimeUtil'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:true,
    isDisabled:false,
    btnstate:"default",
    switchChecked:false,
    date:'2022-07-01',
    time1:'00:00',
    duration:7,
    durationRange:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36'],
    time2:'00:00',
    title:null,
    volume:null,
    endtime:null,
    recordData:{
      title:null,
      date:null,
      begintimeStamp:null,
      endtimeStamp:null,
      volume:null,
      registertime:null
    }
  },
  bindTimeChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time1: e.detail.value
    })
  },
  
  bindTimeChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      duration: e.detail.value
    })
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      date:formatDate(+Date.now()),
      time1:formatTime(+Date.now()),
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
    this.setData({
      recordData:{
      date:this.data.date
      }
    })
    if(this.data.recordData.date&&this.data.recordData.endtime&&this.data.recordData.begintime&&this.data.recordData.title&&this.data.recordData.volume)
    {
      this.setData({
        isDisabled:false
      })
    }
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
        title:e.detail.value
    })
  },
  setvolume(e)
  {
    this.setData({

        volume:e.detail.value

    })
  },
  recordconfirm()
  {
    
    this.setData({
      recordData:{
        begintimeStamp:Date.parse(new Date(this.data.date+' '+this.data.time1)),
        endtimeStamp:Date.parse(new Date(this.data.date+' '+this.data.time1))+(this.data.duration+1)*3600*1000,
        title:this.data.title,
        volume:this.data.volume,
        registertime:Date.now()
      },
      endtime:formatDateTime(this.data.recordData.endtimeStamp),
    })
    if(!(this.data.volume&&this.data.title))
    {
      wx.showToast({
        title: '请完善信息！',
        icon:"none"
      })
    }else{
      milkManageModel.addMilkRecord(this.data.recordData).then(
        res => {
          wx.showToast({
            title: '添加成功！',
            icon: 'success',
            duration: 2000
          })
        },
        wx.navigateBack({
          delta: 1,
       }),
        err => {
          console.log(err)
          wx.showToast({
            title: '添加失败',
            icon:'none',
            duration: 2000
          })
        }
      )
      
    }
  }
})