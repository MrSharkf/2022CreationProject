// pages/goods_list/index.js
import recipeManager from '../../models/recipe'
import { formatDate, formatDateTime, formatTime } from '../../utils/dateTimeUtil'
import milkManageModel from '../../models/milkManage'
Page({
    data: {
      milkRecordList:null,
      formatstarttime:null,
      formatexpiretime:null,
      enchangetap:0,
      tabs: [
        {
          id: 0,
          value: "推荐",
          isActive: true
        },
        {
          id: 1,
          value: "收藏",
          isActive: false
        },
        {
          id: 2,
          value: "筛选",
          isActive: false
        },
        {
          id: 3,
          value: "母乳",
          isActive: false
        }
      ],
      goodsList:null,
      formatList:null
    },
    onChangeTap: function(e) {
      // console.log(e.currentTarget.dataset.index)
      console.log(e.currentTarget.id);
    this.setData({
      enchangetap: e.currentTarget.id
    })
      },
      // 标题点击事件 从子组件传递过来
  handleTabsItemChange(e){
    // 1 获取被点击的标题索引
    const {index}=e.detail;
    // 2 修改源数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },
  onLoad(option){
    recipeManager.downloadRecipeList().then(
      res =>{
        wx.showToast({
          title: '获取食谱列表成功',
          icon:'none',
          duration: 2000
        })
        this.setData({
          goodsList:res.result.data
        })
        this.setData({
          formatList:this.formatRecipeList(this.data.goodsList)
        })
      },
      err => {
        console.log(err)
        wx.showToast({
          title: '获取食谱列表失败',
          icon:'none',
          duration: 2000
        })
      }
    )
  },
  onShow(){
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
 getRecipeList(){
  
 },
  formatRecipeList(goodslist){

    var List =new Array()
    goodslist.forEach(recipe =>{
      recipe.nutrition=this.nutritionShow(recipe)
      })
    for(var i=0;i<goodslist.length;i+=2)
    {
      List[i/2]= {
        L:goodslist[i],
        R:goodslist[i+1]
      }
    }
    return List
  },
  nutritionShow(recipe){
    const select= 1
    switch(select){
      case 1:return `卡路里：${recipe.nutrition.calories}`;
      case 2:return `碳水化合物：${recipe.营养成分.碳水化合物}`;
      case 3:return `脂肪：${recipe.营养成分.脂肪}`;
      case 4:return `蛋白质：${recipe.营养成分.蛋白质}`;
      case 5:return `钙：${recipe.营养成分.钙}`;
      case 6:return `铁：${recipe.营养成分.铁}`;
    }
  },
  onRecipeClick(e) {
    const  recipeData  = e.currentTarget.dataset.recipeData
    wx.navigateTo({
      url: `/pages/recipe_detail/index?id=${recipeData}`
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
})
