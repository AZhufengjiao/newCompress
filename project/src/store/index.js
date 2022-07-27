import { createStore } from "vuex";
import home from "@/store/home";
// 持久化数据 vuex-persistedstate 插件
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  plugins: [
    createPersistedState({
      // 数据存储在 localStorage 时的 key
      key: "lanhu",
      // 指定将哪些模块中的数据同步到本地
      paths: ["home"],
    }),
  ],
  modules: {
    home,
  },
});

export default store;
