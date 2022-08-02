const login = {
  // 使用具有命名空间的vuex模块
  namespaced: true,
  // 返回该模式下存储的应用状态
  state() {
    return {
      // 用户id
      userid: "",
    };
  },
  mutations: {
    // 设置用户id
    setParams(state, str) {
      state.userid = str;
    },
  },
  actions: {},
};

export default login;
