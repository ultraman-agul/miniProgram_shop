// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
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
    handleItemTap(e) {
      // 获取点击的tab索引
      const {index} = e.currentTarget.dataset
      // 传递给父组件的自定义函数中
      this.triggerEvent("tabItemChange", {index})
    }
  }
})
