export default class toDoListManager {
  static getTodoList(){
    return wx.cloud.callFunction({
      name: 'todoList',
      data: {
        data:null,
        todo:'get'
      }
    })
  }
  static addTodoItem(todoItem){
    return wx.cloud.callFunction({
      name: 'todoList',
      data: {
        data: todoItem,
        todo:'add'
      }
    })
  }
  static deleteTodoItem(itemId){
    return wx.cloud.callFunction({
      name: 'todoList',
      data: {
        data: itemId,
        todo:'delete'
      }
    })
  }
  static updateTodoItem(itemId){
    return wx.cloud.callFunction({
      name: 'todoList',
      data: {
        data: itemId,
        todo:'update'
      }
    })
  }
}