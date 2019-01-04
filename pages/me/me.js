// pages/me/me.js

const app = getApp();
const store = require('../../utils/store.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasLogin: false,
    count:0,
    user:{
      loginname:'lucas',
      avatar_url:''
    }
  },

  goMessage() {
    wx.navigateTo({
      url: '/pages/message/message',
    });
  },

  goCollection() {
    let loginname = this.data.user.loginname;
    wx.navigateTo({
      url: '/pages/collection/collection?loginname=' + loginname,
    });
  },

  goAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    });
  },

  login() {
    wx.navigateTo({
      url: '/pages/login/login',
    });
  },

  logout() {
    let that = this;
    wx.showLoading({
      title: '正在注销',
    });
    store.clear({
      success: function() {
        wx.hideLoading();
        wx.showToast({
          title: '注销成功',
          duration: 2000
        });
      },
      fail: function() {
        wx.hideLoading();
        wx.showToast({
          title: '注销失败',
          duration: 2000
        });
      },
      complete: function() {
        that.setData({
          hasLogin: false,
          user:{}
        });
      }
    })
  },

  goPerson() {
    let that = this;
    wx.navigateTo({
      url: '/pages/person/person?id=' + that.data.user.loginname,
    });
  },

  getUnreadMessage(token) {
    let that = this;
    wx.request({
      url: 'https://cnodejs.org/api/v1/message/count',
      data: {
        accesstoken: token
      },
      method: 'GET',
      success: function(res) {
        that.setData({
          count: res.data.data
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hasLogin: false
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let token = store.get('accessToken');
    console.log(token);
    if(token) {
        let loginname = store.get('loginname'),
            avatar_url = store.get('avatar_url'),
            id = store.get('id');
        this.getUnreadMessage(token);
        this.setData({
          hasLogin: true,
          user: {
            loginname,
            avatar_url,
            id
          }
        });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})