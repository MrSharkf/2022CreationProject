// pages/TODOlist/TODOlist.js
import toDoListManager from '../../models/todolist'
import recipeManager from '../../models/recipe'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todolist:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getTodoList()
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
  addNewTodo(){
    wx.navigateTo({
      url: '../newtodo/index',
    })
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
  deleteitem(e)
  {
    const { itemId } = e.currentTarget.dataset
    wx.showModal({
      cancelColor: '#FF0000',
      content:'确定删除吗？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          toDoListManager.deleteTodoItem(itemId).then(
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
  updateTodoItem(e){
    toDoListManager
  }
})