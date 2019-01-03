// pages/message/message.js

const store = require('../../utils/store.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: {
      hasnot_read_messages: [],
      has_read_messages: []
    },
    accessToken: '',
    markButton: {
      text: '全部已读',
      disabled: false,
      showLoading: false
    }
  },

  markAll() {
    if(!this.data.message.hasnot_read_messages.length) {
      wx.showToast({
        title: '暂无未读消息',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    let that = this;
    this.setData({
      markButton: {
        text: '正在处理',
        disabled: true,
        showLoading: true
      }
    });
    wx.request({
      url: 'https://cnodejs.org/api/v1/message/mark_all',
      method: 'POST',
      data: {
        accesstoken: that.data.accessToken
      },
      success: function(res) {
        if (res.data.success) {
          that.setData({
            message: {
              has_read_messages: [].concat(that.data.hasnot_read_messages, that.data.has_read_messages),
              hasnot_read_messages: []
            }
          });
        } else {
          wx.showToast({
            title: '标记失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '标记失败',
          icon: 'none',
          duration: 2000
        });
      },
      complete: function() {
        that.setData({
          markButton: {
            text: '全部标记',
            disabled: false,
            showLoading: false
          }
        });
      }
    })
  },

  goDetail() {

  },

  getMessage() {
    let that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'https://cnodejs.org/api/v1/messages',
      data: {
        accesstoken: that.data.accessToken,
        mdrender: false
      },
      success: function(res) {
        console.log(res);
        wx.hideLoading();
        if (res.data.success) {
          that.setData({
            message: res.data.data
          });
        } else {
          wx.showToast({
            title: '加载失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function(res) {
        console.log(res);
        wx.showToast({
          title: '加载错误',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let accessToken = store.get('accessToken');
    if (accessToken) {
      this.setData({
        accessToken: accessToken
      });
      this.getMessage();
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
    if (!this.data.accessToken) {
      wx.navigateBack({
        delta: -1
      });
    }
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