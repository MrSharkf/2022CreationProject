// pages/record/record.js
import { formatDate, formatDateTime, formatTime } from '../../utils/dateTimeUtil'
import toDoListManager from '../../models/todolist'
import recipeManager from '../../models/recipe'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:true,
    btnstate:"default",
    switchChecked:false,
    recipeData:null,
    date:'2022-07-01',
    time1:'00:00',
    title:null,
    itemid:null,
    volume:null,
    remarks:null,
    itemname:null,
    newTodoData:{
      itemid:null,
      date:null,
      time:null,
      volume:null,
      remarks:null
    }
  },
  bindTimeChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time1: e.detail.value
    })
  },
  

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
   /**
   * 输入框实时回调
   * @param {*} options 
   */
  inputTitleAction: function (options) {
    wx.redirectTo({
      url: '../recipe_list/index',
    })
  },
  inputquantityAction: function (options) {
    //获取输入框输入的内容
    let value = options.detail.value;
    this.setData({
      volume: value
    })
    console.log("备注输入的内容是 " + value)
  },
  inputCapacityAction: function (options) {
    //获取输入框输入的内容
    let value = options.detail.value;
    this.setData({
      remarks: value
    })
    console.log("食量输入的内容是 " + value)
  },
  buttonListener:function(){
    var that = this
    wx.navigateTo({
      url: '/pages/todo/todo?newTask=' + that.data.title + '&time=' + that.data.time1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    this.setData({
      date:formatDate(+Date.now()),
      time1:formatTime(+Date.now()),
    })
    if(!options.id){
    }else{
    this.setData({
      recipeData:options.id
    })
    recipeManager.searchRecipe(this.data.recipeData).then(
      res =>{
        this.setData({
          recipeData:this.formatRecipeShow(res.result.data[0])
        })
        if(!this.data.recipeData){
        }else{
        this.setData({
          itemid:this.data.recipeData._id,
          itemname:this.data.recipeData.name
        })
        }
        this.onShow()
      },
      err =>{
        console.log(err)
      }
    )
  }
  },
  formatRecipeShow(recipe){
    var formatRecipe = recipe
   
    return formatRecipe
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
  addtodoitem(){
    this.setData({
      newTodoData:{
        itemid:this.data.itemid,
        date:this.data.date,
        time:this.data.time1,
        volume:this.data.volume,
        remarks:this.data.remarks,
        registertime:Date.now(),
        complete:false
      }
    })
    if(this.data.newTodoData.itemid&&this.data.newTodoData.date&&this.data.newTodoData.time&&this.data.newTodoData.volume&&this.data.newTodoData.remarks){
      toDoListManager.addTodoItem(this.data.newTodoData)
      .then(
        res => {
          wx.navigateTo({
            url: '../TODOlist/TODOlist',
          }).then(
            res=>{
              wx.showToast({
                title: '添加成功！',
                icon: 'success',
                duration: 2000
              })
            }
          )
        },
        err => {
          console.log(err)
          wx.showToast({
            title: '添加失败',
            icon:'none',
            duration: 2000
          })
        }
      )
    }else{
      wx.showToast({
        title: '请完善信息！',
        icon:"none"
      })
    }
  },

})