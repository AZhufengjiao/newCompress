const home = {
  // 使用具有命名空间的vuex模块
  namespaced: true,
  // 返回该模式下存储的应用状态
  state() {
    return {
      // 套餐信息
      setMealInfo: [],
      // 工具剩余次数
      downloadNumber: Number,
    };
  },
  mutations: {
    // 修改套餐数据
    setSetMealInfo(state, array) {
      state.setMealInfo = array;
    },
    // 修改工具剩余次数
    setDownloadNumber(state, number) {
      state.downloadNumber = number;
    },
  },
  Atomics: {},
};

export default home;
