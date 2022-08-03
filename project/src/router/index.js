// import { createRouter, createWebHashHistory } from "vue-router"; // hash
import { createRouter, createWebHistory } from "vue-router"; //history
import HomeView from "../views/Home/HomePage.vue";

const routes = [
  // 首页是obout
  {
    path: "/",
    name: "about",
    component: () => import("@/views/About/AboutPage.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    children: [
      // 自定义格式
      {
        path: "/video-custom-converter",
        name: "video-custom-converter",
        component: () => import("@/components/home/Custom/index.vue"),
      },
      // 视频格式
      {
        path: "/video-converter",
        name: "video-converter",
        redirect: "/video-converter",
        component: () => import("@/components/home/defaultYS/index.vue"),
        children: [
          {
            path: "/video-converter",
            name: "converter",
            component: () =>
              import("@/components/home/defaultYS/component/Size/index.vue"),
            // import(
            // "@/components/home/defaultYS/component/Converter/index.vue"
            // ),
          },
          {
            path: "/video-compressor",
            name: "size",
            component: () =>
              import("@/components/home/defaultYS/component/Size/index.vue"),
          },
          {
            path: "/video-lossless-compression",
            name: "compressor",
            component: () =>
              // import("@/components/home/defaultYS/component/Wusun/index.vue"),
              import("@/components/home/defaultYS/component/Size/index.vue"),
          },
        ],
      },
    ],
  },

  {
    path: "/pricing",
    name: "pricing",
    component: () => import("@/views/MyVip/index.vue"),
  },
];

const router = createRouter({
  // history: createWebHashHistory(), //hash
  history: createWebHistory(), // history
  routes,
});

export default router;
