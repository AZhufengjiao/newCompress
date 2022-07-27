import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/Home/HomePage.vue";

const routes = [
  {
    path: "/",
    redirect: "/about",
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  // 首页是obout
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About/AboutPage.vue"),
  },
  {
    path: "/myVip",
    name: "myVip",
    component: () => import("@/views/MyVip/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
