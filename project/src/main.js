import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
// import axios from "axios";
// import "ant-design-vue/dist/antd.css";
// import "../src/assets/styles/common.scss";
import "@/assets/styles/reset.less";

createApp(App).use(store).use(Antd).use(router).mount("#app");
