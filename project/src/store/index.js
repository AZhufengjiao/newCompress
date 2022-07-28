import { createStore } from "vuex";
import home from "@/store/home";
import login from "@/store/login";
import user from "@/store/user";
// 持久化数据 vuex-persistedstate 插件
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  plugins: [
    createPersistedState({
      // 数据存储在 localStorage 时的 key
      key: "lanhu",
      // 指定将哪些模块中的数据同步到本地
      paths: ["home", "login", "user"],
    }),
  ],
  modules: {
    home,
    login,
    user,
  },
});

export default store;
