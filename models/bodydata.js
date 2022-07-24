export default class BodydataModel {
  static updateUserInfo(
    babyname, 
    birthdate, 
    gender, 
    height, 
    weight){
    return wx.cloud.callFunction({
      name: 'userinfoupdate',
      data: {
          babyname, 
          birthdate, 
          gender, 
          height, 
          weight,
          todo:'update'
      }
    })
  }
}