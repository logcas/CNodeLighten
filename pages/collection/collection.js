// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts: [],
    loginname: '',
  },

  getCollection() {
    let that = this,
      loginname = this.data.loginname;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'https://cnodejs.org/api/v1/topic_collect/' + loginname,
      success: function(res) {
        console.log(res);
        if (res.data.success) {
          wx.hideLoading();
          that.setData({
            posts: res.data.data
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '加载失败',
            icon: 'none'
          });
        }
      },
      fail: function(res) {
        console.log(res);
        wx.hideLoading();
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let loginname = options.loginname;
    if (loginname) {
      this.setData({
        loginname: loginname
      });
      this.getCollection();
    } else {
      wx.navigateBack({
        delta: -1
      });
    }
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