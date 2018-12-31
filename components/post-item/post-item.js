// components/post-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    post:{
      type:Object,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getTabName(tab){
      var tabName = '';
      switch(tab) {
        case 'share': tabName = '分享';break;
        case 'job': tabName = '招聘';break;
        case 'ask': tabName = '问答';break;
        case 'good': tabName = '精华';break;
      }
      return tabName;
    }
  },
})
