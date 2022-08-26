// import { createRouter, createWebHashHistory } from "vue-router"; // hash
import { createRouter, createWebHistory } from "vue-router"; //history
import HomeView from "../views/Home/HomePage.vue";
import pricing from "@/views/MyVip/index.vue";

const routes = [
  // 首页是obout
  {
    path: "/",
    name: "about",
    component: () => import("@/views/About/AboutPage.vue"),
  },
  // 工具页面
  {
    path: "/home",
    name: "home",
    component: HomeView,
    children: [
      // 自定义格式
      {
        path: "/video-converter",
        name: "video-custom-converter",
        component: () => import("@/components/home/Custom/index.vue"),
        children: [
          {
            path: "/video-converter/:id",
            name: "video-custom-converter/id",
            component: () => import("@/components/home/Custom/index.vue"),
          },
        ],
      },
      // 视频格式
      {
        path: "/video-compressor",
        name: "video-converter",
        // redirect: "/video-converter",
        component: () => import("@/components/home/defaultYS/index.vue"),
        children: [
          {
            path: "/video-compressor/:id",
            name: "video-converter/id",
            component: () => import("@/components/home/defaultYS/index.vue"),
          },
        ],
      },
    ],
  },
  // vip页面
  {
    path: "/pricing",
    name: "pricing",
    component: pricing,
  },
  // user 用户信息
  {
    path: "/user",
    name: "user",
    redirect: "/user/orders",
    component: () => import("@/components/user/user.vue"),
    children: [
      // 用户订单页面
      {
        path: "/user/orders",
        name: "userOrders",
        component: () =>
          import("@/components/user/components/homeOrders/homeOrders.vue"),
      },
      // 申请发票页面
      {
        path: "/user/invoices",
        name: "userInvoices",
        component: () =>
          import("@/components/user/components/userInvoices/userInvoices.vue"),
      },
    ],
  },
];

const router = createRouter({
  // history: createWebHashHistory(), //hash
  history: createWebHistory(), // history
  routes,
});

export default router;
