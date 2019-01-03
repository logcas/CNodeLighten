// pages/person/person.js

const { formatTime } = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: ''
  },

  getPerson() {
    let that = this;
    wx.showLoading({
      title: '正在加载',
    });
    wx.request({
      url: 'https://cnodejs.org/api/v1/user/' + that.data.id,
      success: function(res) {
        console.log(res);
        wx.hideLoading();
        if (res.data.success) {
          res.data.data['create_at'] = formatTime(new Date(res.data.data['create_at']));
          that.setData({
            data: res.data.data
          });
        } else {
          wx.showToast({
            title: '加载失败',
            icon: 'none',
            duration: 1000
          });
        }
      },
      fail: function(res) {
        console.log(res);
        wx.hideLoading();
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 1000
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    /*
    用大佬的ID来测试
    this.setData({
      id: 'alsotang'
    });
    */
    this.setData({
      id: options.id
    });
    this.getPerson();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})