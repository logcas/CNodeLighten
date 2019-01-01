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

  login() {
    wx.navigateTo({
      url: '/pages/login/login',
    });
  },

  getUnreadMessage(token) {
    let that = this;
    wx.request({
      url: 'https://cnodejs.org/api/v1/message/count',
      data: {
        accessToken: token
      },
      method: 'GET',
      success: function(res) {
        that.setData({
          count: res.data.data
        });
      }
    });
  },

  getUser(token) {
    let that = this;
    wx.request({
      url: 'https://cnodejs.org/api/v1/accesstoken',
      data: {
        accessToken: token
      },
      method: 'POST',
      success: function(res) {
        that.setData({
          user: res.data.data
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
    if(token) {
      if(!this.data.hasLogin) {
        this.getUser();
        this.getUnreadMessage();
        this.setData({
          hasLogin: true
        });
      }
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