// pages/login/login.js

const store = require('../../utils/store.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  validateToken(e) {
    let token = e.detail.value.accessToken;
    if(!token.trim()) return;
    wx.showLoading({
      title: '正在验证',
    });
    wx.request({
      url: 'https://cnodejs.org/api/v1/accesstoken',
      method: 'POST',
      data: {
        accesstoken: token
      },
      success: function(res) {
        console.log(res);
        wx.hideLoading();
        if(res.data.success) {
          store.set('accessToken', token);
          store.set('loginname',res.data.loginname);
          store.set('avatar_url',res.data.avatar_url);
          store.set('id',res.data.id);
          wx.navigateBack({
            delta:-1
          });
        } else {
          wx.showToast({
            title: '验证失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function(res) {
        wx.hideLoading();
        wx.showToast({
          title: '验证失败',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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