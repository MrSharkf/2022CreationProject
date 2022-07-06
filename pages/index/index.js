import HomeModel from '../../models/home'
import { showToast } from '../../utils/UIUtil'


const globalEnv = getApp()
Page({
  data: {
    pieOpt: {},
    userInfo: null,
    goalList: null,
    wholeTime: '',
    isDataLoaded: false,
    isPieInited: false,
    isCreating: false,
    isUploading: false,
  },

  onLoad() {
    this.initUserInfo()
  },

  onShow() {
    // 若初始化id失败则在catch中初始化userId，否则直接获取列表
    this.initOpenIdAndUserId()
      .then()
      .catch(err => {
        if (err === 0) {
          return this.initUserId()
        }
      })
      .then(() => {
        
      })

  },

  /**
   * 点击授权按钮获取信息
   */
  onAuthorize(e) {
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo
      })
    }
  },

  onReady() {
  
  },

  onShareAppMessage() {
    return {
      title: '我在用 Chronus 来记录目标进度'
    }
  },



  initUserInfo() {
    HomeModel.getUserInfo().then(
      res => {
        this.setData({
          userInfo: res.userInfo
        })
      },
      err => {
        showToast('请先授权登录')
        console.log(err)
      }
    )
  },

  initOpenIdAndUserId() {
    return new Promise((resolve, reject) => {
      HomeModel.getOpenIdAndUserId().then(
        res => {
          const idData = res.result
          globalEnv.data.openid = idData.openId
          if (idData.userId) {
            globalEnv.data.userId = idData.userId
            resolve()
          } else {
            reject(0)
          }
        },
        err => {
          if (err.errCode === -1) {
            showToast('网络不佳，登录失败')
          } else {
            showToast(`登录失败，错误码：${err.errCode}`)
          }
          reject(-1)
        }
      )
    })
  },

  initUserId() {
    return new Promise((resolve, reject) => {
      HomeModel.addUserId().then(
        res => {
          globalEnv.data.userId = res._id
          resolve()
        },
        err => {
          showToast(`添加用户id失败，错误码：${err.errCode}`)
          reject()
        }
      )
    })
  }
})