// pages/post/post.js

const utils = require('../../utils/util.js');
const store = require('../../utils/store.js');

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId: '',
    post: {},
    height: '',
    article: {}
  },

  goComment() {
    let that = this;
    let token = store.get('accessToken');
    if (token) {
      wx.navigateTo({
        url: '/pages/comment/comment?id=' + that.data.postId + '&title=' + that.data.post.title
      });
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      });
    }
  },

  getHeight() {
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height: res.windowHeight
        });
      },
    })
  },

  // 解析HTML
  parseHtml(data) {
    let that = this;
    for (let key in data) {
      if (Object.prototype.toString.call(data[key]) === '[object Array]') {
        data[key] = data[key].map((reply) => {
          return that.parseHtml(reply);
        });
      } else if (key === 'create_at' || key === 'last_reply_at') {
        data[key] = utils.formatTime(new Date(data[key]));
      } else if (key === 'content') {
        data[key] = app.towxml.toJson(data[key], 'html');
      }
    }
    return data;
  },

  getPostDetail() {
    let postId = this.data.postId,
      that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'https://cnodejs.org/api/v1/topic/' + postId,
      success: function(res) {
        console.log(res);

        that.setData({
          post: that.parseHtml(res.data.data)
        });
      },
      complete: function() {
        wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHeight();
    this.setData({
      postId: app.postId
    });
    this.getPostDetail();
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