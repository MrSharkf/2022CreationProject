// pages/goods_list/index.js

Page({
    data: {
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
      goodsList:[],
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
})
