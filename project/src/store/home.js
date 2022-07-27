const home = {
  // 使用具有命名空间的vuex模块
  namespaced: true,
  // 返回该模式下存储的应用状态
  state() {
    return {
      name: "张三",
      params1: null,
      tokenData: null,
    };
  },
  mutations: {
    setParams1(state, obj) {
      state.params1 = obj;
    },
    setTokenData(state, obj) {
      state.tokenData = obj;
    },
  },
  Atomics: {},
};

export default home;
