const login = {
  // 使用具有命名空间的vuex模块
  namespaced: true,
  // 返回该模式下存储的应用状态
  state() {
    return {
      // 用户id
      userid: null,
      // 用户数据
      userObj: {},
      // 获取所有数据
      entity: {},
    };
  },
  mutations: {
    // 设置用户id
    setParams(state, str) {
      state.userid = str;
    },
    // 修改用户信息
    setUserObj(state, obj) {
      state.userObj = obj;
    },
    // 存储所有数据
    setEntity(state, obj) {
      state.entity = obj;
    },
  },
  actions: {},
};

export default login;
