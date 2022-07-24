export default class recipeManager {
  static downloadRecipeList(){
    var randomid = Math.floor(Math.random()*100)
    return wx.cloud.callFunction({
      name: 'getrecipe',
      data: {
        recommendation:null,//this.recommendation()
        randomid:randomid,
        todo:'list'
      }
    })
  }
  static nutritionAnalyze(){
    const nutrition ={
      卡路里:'optimal',//insuffcient,optimal,excessive
      碳水化合物:'optimal',
      脂肪:'optimal',
      蛋白质:'optimal',
      钙:'optimal',
      铁:'optimal',
      维生素:'optimal'
    }
  }
  static recommendation(){
    return null
    const data={
      bodydata:null,
      age:null
    }
    this.getBodyData().then(
      res=>{
        data.bodydata=res.result.data[0].bodydata
        data.age=(Date.now()-Date.parse(new Date(data.bodydata.birthdate)))/1000/3600/24/365
        
      },
      err=>{
        console.log(err)
      }
    )
   
  }
  static getBodyData(){
    return wx.cloud.callFunction({
      name: 'userinfoupdate',
      data: {
          todo:'get'
      }
    })
  }
  static searchRecipe(recipeId){
    return wx.cloud.callFunction({
      name: 'getrecipe',
      data: {
        recommandation:recipeId,
        randomid:null,
        todo:'single'
      }
    })
  }
}