const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  
  const wxContext = cloud.getWXContext()
  const {recommandation,randomid,todo} = event

if(todo=='list'){
  if(!recommandation){//random recipe
    try {
      return await db.collection('recipe_eng')
      .skip(randomid)
      .limit(10)
      .get()
    } catch (e) {
      console.log(e)
    }
  }
  return null
}
if(todo=='single'){
  try {
    const recipeData =  await db.collection('recipe_eng')
    .where({
      _id:recommandation
    })
    .get()

    return recipeData
  } catch (e) {
    console.log(e)
  }
  return null
}
}