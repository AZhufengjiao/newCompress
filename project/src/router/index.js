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
  {
    path: "/home",
    name: "home",
    component: HomeView,
    children: [
      // 自定义格式
      {
        path: "/video-converter/:id",
        name: "video-custom-converter",
        component: () => import("@/components/home/Custom/index.vue"),
      },
      // 视频格式
      {
        path: "/video-compressor/:id",
        name: "video-converter",
        // redirect: "/video-converter",
        component: () => import("@/components/home/defaultYS/index.vue"),
      },
    ],
    // children: [
    //   // 自定义格式
    //   {
    //     path: "/video-custom-converter",
    //     name: "video-custom-converter",
    //     component: () => import("@/components/home/Custom/index.vue"),
    //   },
    //   // 视频格式
    //   {
    //     path: "/video-converter",
    //     name: "video-converter1",
    //     // redirect: "/video-converter",
    //     component: () => import("@/components/home/defaultYS/index.vue"),
    //     children: [
    //       {
    //         path: "/video-converter/:id",
    //         name: "video-converter",
    //         component: () =>
    //           import("@/components/home/defaultYS/component/Size/index.vue"),
    //         // import(
    //         // "@/components/home/defaultYS/component/Converter/index.vue"
    //         // ),
    //       },
    //       {
    //         path: "/video-compressor/:id",
    //         name: "video-compressor",
    //         component: () =>
    //           import("@/components/home/defaultYS/component/Size/index.vue"),
    //       },
    //       {
    //         path: "/video-lossless-compression/:id",
    //         name: "video-lossless-compression",
    //         component: () =>
    //           // import("@/components/home/defaultYS/component/Wusun/index.vue"),
    //           import("@/components/home/defaultYS/component/Size/index.vue"),
    //       },
    //     ],
    //   },
    // ],
  },

  {
    path: "/pricing",
    name: "pricing",
    // component: () => import("@/views/MyVip/index.vue"),
    component: pricing,
  },
];

const router = createRouter({
  // history: createWebHashHistory(), //hash
  history: createWebHistory(), // history
  routes,
});

export default router;
