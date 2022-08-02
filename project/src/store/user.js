const user = {
  // 使用具有命名空间的vuex模块
  namespaced: true,
  // 返回该模式下存储的应用状态
  state() {
    return {
      // 用户信息
      userData: "",
    };
  },
  mutations: {
    // 修改用户信息
    setUserData(state, obj) {
      state.userData = obj;
    },
  },
  actions: {},
};

export default user;
