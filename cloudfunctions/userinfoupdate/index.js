const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openId = wxContext.OPENID
  const { babyname, birthdate, gender, height, weight ,todo} = event


  const user = await db.collection('users')
  .where({
    _openid: openId
  })
  .get()



  const idData = user.data[0]
  if(todo=='update'){
  try {
    await db.collection('users')
    .where({
      _id: idData._id
    })
    .update({
      data: {
        bodydata:null,
        bodydata:_.set({
          babyname, 
          birthdate, 
          gender, 
          height, 
          weight
        })
      }
    })
  } catch (e) {
    console.log(e)
    return 'err'
  }
  }
  if(todo=='get'){
    try {
      return await db.collection('users')
      .where({
        _id: idData._id
      })
      .get()
    } catch (e) {
      console.log(e)
      return 'err'
    }
  }
}
