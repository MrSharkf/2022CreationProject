export default class milkManageModel {
  static addMilkRecord(recordData)
  {
    return wx.cloud.callFunction({
      name: 'milkStorage',
      data: {
        recordData,
        todo:'add'
      }
    })
  }
  static deleteMilkRecord(recordId)
  {
    return wx.cloud.callFunction({
      name: 'milkStorage',
      data: {
        recordData:recordId,
        todo:'delete'
      }
    })
  }
  static getMilkList()
  {
    return wx.cloud.callFunction({
      name: 'milkStorage',
      data: {
        recordData:null,
        todo:'getlist'
      }
    })
  }
}