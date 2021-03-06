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
    width: '',
    article: {},
    accessToken: '',
    collect: '',
  },

  replyComment(event) {
    let id = event.currentTarget.dataset.id,
        user = event.currentTarget.dataset.user;
    let token = store.get('accessToken');
    let that = this;
    if (token) {
      wx.navigateTo({
        url: '/pages/comment/comment?id=' + that.data.postId + '&title=' + that.data.post.title + '&replyId=' + id + '&replyUser=' + user
      });
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      });
    }
  },

  likeReply(event) {
    let token = store.get('accessToken');
    if(!token) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    let id = event.currentTarget.dataset.id;
    let that = this;
    wx.request({
      url: 'https://cnodejs.org/api/v1/reply/' + id + '/ups',
      method: 'POST',
      data: {
        accesstoken: token
      },
      success: function(res) {
        if(res.data.success) {
          let post = that.data.post;
          post.replies.forEach(reply => {
            if(reply.id === id) {
              reply.is_uped = !reply.is_uped;
            }
          });
          that.setData({
            post
          });
        }
      },
      fail: function(res) {
        console.log(res);
      }
    })
  },

  doCollect(event) {
    let accesstoken = this.data.accessToken;
    if(!accesstoken) {
      wx.showToast({
        title: '请先登录',
        icon:'none',
        duration:2000
      });
      return;
    }
    let is_collect = this.data.post.is_collect;
    let url = is_collect ? 'https://cnodejs.org/api/v1/topic_collect/de_collect' : 'https://cnodejs.org/api/v1/topic_collect/collect';
    let action = is_collect ? '取消收藏' : '收藏';
    let topic_id = this.data.postId,
        that = this;
    wx.request({
      url,
      method: 'POST',
      data: {
        accesstoken,
        topic_id
      },
      success: function(res) {
        if(res.data.success) {
          wx.showToast({
            title: action + '成功',
            icon: 'success',
            duration: 2000
          });
          that.setData({
            post:{
              is_collect: !is_collect
            }
          });
        } else {
          wx.showToast({
            title: action + '失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function() {
        wx.showToast({
          title: action + '失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
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
          height: res.windowHeight,
          width: res.windowWidth
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
        data[key] = app.towxml.toJson(data[key], 'markdown');
      }
    }
    return data;
  },

  getPostDetail() {
    let postId = this.data.postId,
      token = this.data.accessToken,
      that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'https://cnodejs.org/api/v1/topic/' + postId,
      data: {
        mdrender: false,
        accesstoken: token
      },
      success: function(res) {
        console.log(res);

        that.setData({
          post: that.parseHtml(res.data.data),
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
    let accessToken = store.get('accessToken');
    this.getHeight();
    this.setData({
      postId: options.id,
      accessToken
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