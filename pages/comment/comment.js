// pages/comment/comment.js

const app = getApp();
const store = require('../../utils/store.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId:'',
    postTitle:'',
    comment:'',
    height:'',
    focus:true,
  },

  sendComment(e) {
    let that = this;
    let comment = `${e.detail.value.comment}\n来自[CNode Lighten](https://github.com/logcas/CNodeLighten)`;
    if(this.data.replyUser) {
      comment = `@${this.data.replyUser} ` + comment;
    }
    let token = store.get('accessToken');
    let success = false;
    // send
    wx.showLoading({
      title: '正在发送，请稍后',
    });
    wx.request({
      url: 'https://cnodejs.org/api/v1//topic/' + this.data.postId +'/replies',
      data: {
        accesstoken: token,
        content: comment,
        reply_id: this.data.replyId
      },
      method: 'POST',
      success: function(res) {
        if(res.data.success) {
          success = true;
        } 
      },
      complete: function() {
        wx.hideLoading();
        if (success) {
          wx.showModal({
            title: '提示',
            content: '评论发表成功',
            showCancel: false,
            confirmText: '返回',
            complete: function () {
              wx.redirectTo({
                url: '../../pages/post/post?id=' + that.data.postId + '&title=' + that.data.postTitle
              });
            }
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '评论发表失败',
            showCancel: false,
          });
        }
      }
    })
  },

  getHeight() {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        });
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.getHeight();
    this.setData({
      postId: options.id,
      postTitle: options.title,
      replyId: options.replyId || '',
      replyUser: options.replyUser || ''
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