// pages/feed/feed.js
var util = require('../../utils/util.js')
var util = require("../../utils/time-util.js");
import { formatDate, formatDateTime, formatTime } from '../../utils/dateTimeUtil'
import milkManageModel from '../../models/milkManage'
import toDoListManager from '../../models/todolist'
import recipeManager from '../../models/recipe'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todolist:null,
    selectWeek:0,
    timeBean:{},
    milkRecordList:null,
    formatstarttime:null,
    formatexpiretime:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
 
  onLoad: function () {
    this.getTodoList()
    this.onShow()
},

lastWeek:function(e){   
  var selectWeek = --this.data.selectWeek;
  var timeBean = this.data.timeBean
  timeBean = util.getWeekDayList(selectWeek)
  if (selectWeek != 0) {
    timeBean.selectDay = 0;
    timeBean.yearMonth = timeBean.weekDayList[0].ymonth;
  }

  this.setData({
    timeBean,
    selectWeek
  })
},

/**
 * 点击了下一周，选择周数字加一，然后直接调用工具类中一个方法获取到数据
 */
nextWeek:function(e){
  var selectWeek = ++this.data.selectWeek;
  var timeBean = this.data.timeBean
  timeBean = util.getWeekDayList(selectWeek)
  if (selectWeek != 0){
    timeBean.selectDay = 0;
    timeBean.yearMonth = timeBean.weekDayList[0].ymonth;
  }

  this.setData({
    timeBean,
    selectWeek
  })
},

/**
 * 选中了某一日，改变selectDay为选中日
 */ 
dayClick:function(e){
  var timeBean = this.data.timeBean
  timeBean.selectDay = e.detail;
  timeBean.yearMonth = timeBean.weekDayList[e.detail].ymonth;
  this.setData({
    timeBean,
  });
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      timeBean: util.getWeekDayList(this.data.selectWeek)
    })
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    milkManageModel.getMilkList().then(
      res=>{
        this.setData({
          milkRecordList:this.formatRecordTime(res.result.data[0].milkRecord)
        })

      },
      err=>{
        wx.showToast({
          title: '获取母乳列表失败！',
          icon:"none"
        })
      }
    )
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
    this.onShow()
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
  addmilk()
  {
    wx.navigateTo({
      url: '../record/record',
    })
  },
  formatRecordTime(milklist)
  {
    milklist.forEach(record => {
      record.begintime = formatDateTime(record.begintimeStamp),
      record.endtime = this.expireJudge(record.endtimeStamp)
    });
    return milklist
  },
  expireJudge(timeStamp)
  {
    if(timeStamp<=Date.now()){
      return '已过期'
    }else{
      if((timeStamp-Date.now())<24*3600*1000){
        return `${Math.round((timeStamp-Date.now())/3600/1000)}小时后过期`
      }else{
        return `${Math.ceil((timeStamp-Date.now())/24/3600/1000)}天后过期`
      }
    }
  },
  deletemilk(e)
  {
    const { milkId } = e.currentTarget.dataset
    wx.showModal({
      cancelColor: '#FF0000',
      content:'确定删除吗？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          milkManageModel.deleteMilkRecord(milkId).then(
            res => {
              wx.showToast({
                title: '删除成功！',
                icon: 'success',
                duration: 2000
              })
            },
            err => {
              console.log(err)
              wx.showToast({
                title: '删除失败',
                icon:'none',
                duration: 2000
              })
            }
          )
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    this.onShow()
  },
  getTodoList(){
    toDoListManager.getTodoList().then(
      res =>{
        this.setData({
          todolist:res.result.data[0].todoList
        })
        this.formattodoList(this.data.todolist)
        wx.showToast({
          title: '获取列表成功！',
          icon:'none',
          duration: 2000
        })
      },
      err =>{
          console.log(err)
          wx.showToast({
            title: '获取列表失败',
            icon:'none',
            duration: 2000
          })
      }
    )
  },
  formattodoList(todolist){
      todolist.forEach(item=>{
        recipeManager.searchRecipe(item.itemid).then(
          res =>{
              item.img = res.result.data[0].img,
              item.itemname = res.result.data[0].name
              this.setData({
                todolist:todolist
              })
          },
          err =>{
            console.log(err)
          }
        )
      })
  },
  naviTodoList(){
    wx.navigateTo({
      url: '../TODOlist/TODOlist',
    })
  },
  naviToMenu(){
    wx.reLaunch({
      url: '../index/index',
    })
  },
  naviToRecipe(){
    wx.navigateTo({
      url: '../recipe_list/index',
    })
  }
})