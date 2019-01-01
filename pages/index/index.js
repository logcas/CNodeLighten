//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    nav: [{
        name: '全部',
        tab: ''
      },
      {
        name: '问答',
        tab: 'ask'
      },
      {
        name: '精华',
        tab: 'good'
      },
      {
        name: '分享',
        tab: 'share'
      },
      {
        name: '招聘',
        tab: 'job'
      }
    ],
    currentNav: '',
    posts:[],
    height:'',
    isLoadingPosts:false,
    currentPage:0,
    currentTab:'',
  },
  getPosts(page,limit) {
    page = page || 0;
    limit = limit || 20;
    let tab = this.data.currentTab;
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    wx.request({
      url: 'https://cnodejs.org/api/v1/topics',
      data: {
        page,
        limit,
        tab
      },
      success(res) {
        that.setData({
          posts: [].concat(that.data.posts,res.data.data),
          currentPage: that.data.currentPage + 1
        });
        console.log(that.data.posts);
      },
      complete() {
        wx.hideLoading();
      }
    });
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
  goDetail(event) {
    app.postId = event.currentTarget.dataset.id;
    app.postTitle = event.currentTarget.dataset.title;
  },
  showByTab(event) {
    this.setData({
      currentTab: event.currentTarget.dataset.tab,
      posts:[],
      currentPage:0
    });
    this.getPosts();
  },
  lower(e) {
    let nextPage = this.data.currentPage + 1;
    this.getPosts(nextPage,20);
  },
  onLoad() {
    //this.getPosts();
    this.getHeight();
  }
})