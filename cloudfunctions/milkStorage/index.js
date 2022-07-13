const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  
  const wxContext = cloud.getWXContext()
  const openId = wxContext.OPENID
  const {recordData, todo} =event

  const user = await db.collection('users')
  .where({
    _openid: openId
  })
  .get()

  const idData = user.data[0]
  if(todo=='add'){
    try {
      return await db.collection('users')
      .where({
        _id: idData._id
      })
      .update({
        data:{
          milkRecord:_.push([
            recordData
          ])
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
  if(todo=='getlist'){
    try {
      return await db.collection('users')
      .where({
        _id: idData._id
      })
      .get()
    } catch (e) {
      console.log(e)
    }
  }
  if(todo=='delete'){
    try {
      return await db.collection('users')
      .where({
        _id: idData._id
      })
      .update({
        data:{
          milkRecord:_.pull({
            registertime:_.eq(recordData)
          })
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
  return 0
}