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
      // 当天剩余次数
      dayloadNumber: null,
      // 可用会员数据
      myCoupon: [],
      // 转化之后的数组
      conversionList: [],
      // homeYsAction 1.压缩样式类名
      YsSctiveKey: "format",
      // 试试权限
      trial: false,
      // 转化需要的参数
      params1: {},
      // 工具页面选择的数据
      gongjuList: [],
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
    // 修改可用会员数据
    setMyCoupon(state, array) {
      state.myCoupon = array;
    },
    // 修改转化之后的数组
    setConversionList(state, array) {
      state.conversionList = array;
    },
    // 修改压缩样式类名
    setYsSctiveKey(state, string) {
      state.YsSctiveKey = string;
    }, // 修改我要试试状态
    setTrial(state, boolean) {
      state.trial = boolean;
    },
    setParams1(state, obj) {
      state.params1 = obj;
    },
    // 当天剩余次数
    setDayloadNumber(state, boolean) {
      state.dayloadNumber = boolean;
    },
    // 扣除当天剩余次数
    jianDayloadNumber(state, number) {
      state.dayloadNumber -= number;
    },
    // 修改工具页选择的数据
    setGongjuList(state, arr) {
      console.log(arr);
      // state.gongjuList.push(arr);
      state.gongjuList = arr["0"];
    },
  },
};

export default home;
// store.commit("home/setGongjuList",SonList.value);
