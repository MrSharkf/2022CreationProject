import * as echarts from '../../ec-canvas/echarts';
import recipeManager from '../../models/recipe'

const app = getApp();

Page({
  onShareAppMessage: function (res) {
    return {
      title: '可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    goodsList:null,
    formatList:null,
    ecBar: {
      onInit: function (canvas, width, height, dpr) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barChart);
        barChart.setOption(getBarOption());

        return barChart;
      }
    },

    ecPie: {
      onInit: function (canvas, width, height, dpr) {
        const pieChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(pieChart);
        pieChart.setOption(getPieOption()); 
        return pieChart;
      }
    },
    ecPie2: {
      onInit: function (canvas, width, height, dpr) {
        const pieChart2 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(pieChart2);
        pieChart2.setOption(getPieOption2()); 
        return pieChart2;
      }
    }
  },

  onReady() {
  },
  onLoad(option){
    recipeManager.downloadRecipeList().then(
      res =>{
        this.setData({
          goodsList:res.result.data
        })
        this.setData({
          formatList:this.formatRecipeList(this.data.goodsList)
        })
        this.onShow()
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
  naviToRecipe(){
    wx.redirectTo({
      url: '../recipe_list/index',
    })
  }
});


function getBarOption() {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    title:{
      text:'每日分量',
      left:10,
      show:'true',
      top:'10rpx'
    },
    grid: {
      left:10,
      right: 15,
      bottom: 15,
      top: 60,
      containLabel: true
    },
    color:"#FDC306",
    xAxis: {
            type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7']
    },
    yAxis: 
      {
        type: 'value'
      },
    series:  [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  };
}

function getPieOption() {
  return {
    title: {
      text: '每日营养',
      left: 'left',
      top:'10rpx'
    },

    tooltip: {
      trigger: 'item',
      position:'right'
    },
    legend: {
      orient: 'vertical',
      right: '2rpx',
      top:'5rpx',
      itemGap: 3,
      textStyle:{
        fontSize:11,
        fontWeight:600
      },
    },
    series:  [
      { width:'125rpx',
        bottom:'-90rpx',
        left:'30rpx',
        name: 'Access From',
        type: 'pie',
        radius: '100%',
        data: [
          { value: 1000, name: '碳水化合物' },
          { value: 735, name: '蛋白质' },
          { value: 580, name: '脂肪' },
          { value: 484, name: '维生素' },
          { value: 300, name: '铁锌钾' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          show: false,
          position: 'center'
        },
      }
    ]
  };
}

function getPieOption2(){
  return{
    title:{
      text:'微量营养素',
      top:'10rpx',
      left:10
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 35,
      right:'right',
      itemGap: 3,
      textStyle:{
        fontWeight:600
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['50%', '100%'],
        avoidLabelOverlap: false,
        top:'100rpx',
        width:'125rpx',
        left:'30rpx',
        label: {
          show: false,
          position: 'center'
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '纤维素' },
          { value: 735, name: 'Omega 3' },
          { value: 580, name: '维生素C、D' }
        ]
      }
    ]
  };
}
