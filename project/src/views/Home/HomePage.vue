<template>
  <div class="home">
    <div class="header">
      <!-- <HomeNav>
        <template v-slot:header_logo>
          <img class="header_logo" src="" alt="" />
        </template>
      </HomeNav> -->
      <aboutNav></aboutNav>

      <CompressedVideo></CompressedVideo>
    </div>
    <a-layout>
      <a-layout-content>
        <div class="home_content_box">
          <div class="home_content_left">
            <img src="" alt="" />
          </div>
          <div class="home_content_right">
            <div class="home_content_right_top">
              <h1>如何使用</h1>
              <h3>录制屏幕种一切活动</h3>
            </div>
            <div class="home_content_right_bottom">
              <p>
                本款免费在线录屏工具是一款页面应用，故您可以在网页中开启应用，并录制电脑屏幕中的一切活动，并到处出视频或gif格式
              </p>
            </div>
          </div>
        </div>
      </a-layout-content>
      <a-layout-footer>
        <h1>常见问题</h1>
        <div class="home_footer_box">
          <div class="home_footer_smallBox">
            <h2>Q：怎么开发票?</h2>
            <p>个人头像-个人中心-在线发票，即可开具发票，发票邮费到付</p>
          </div>
          <div class="home_footer_smallBox">
            <h2>Q：怎么开发票?</h2>
            <p>个人头像-个人中心-在线发票，即可开具发票，发票邮费到付</p>
          </div>
          <div class="home_footer_smallBox">
            <h2>Q：怎么开发票?</h2>
            <p>个人头像-个人中心-在线发票，即可开具发票，发票邮费到付</p>
          </div>
          <div class="home_footer_smallBox">
            <h2>Q：怎么开发票?</h2>
            <p>个人头像-个人中心-在线发票，即可开具发票，发票邮费到付</p>
          </div>
        </div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup>
import HomeNav from "@/components/home/Nav/index.vue";
import CompressedVideo from "@/components/home/CompressedVideo/index.vue";

import { getDownloadNum } from "@/api/about";
import aboutNav from "@/components/about/aboutNav/index.vue";
import { userList } from "@/api/user";
import { userLogOut } from "@/api/login";
import { useStore } from "vuex";
import { computed, onMounted, onUpdated, ref, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
const store = useStore();
const $router = useRoute();
components: {
  aboutNav, CompressedVideo;
}
// 路由传参
let touterParams = ref({});

// 2 是自定义压缩视频
let routerNum = ref(1);

onMounted(() => {
  store.commit("home/setTrial", false);
  getFrequency();
});
onUpdated(() => {});

// 1.2 调用接口，获取用户登录是否过期
const getUserInfo = async (userid) => {
  return await userList(userid).then((res) => {
    // 没有过期 保存用户状态信息
    if (res.data.code == 200) {
      // console.log(res.data.data.roleType);
      // 存本地
      store.commit("user/setUserData", res.data.data);
    } else {
      // 已过期 删除本地缓存
      userLogOut().then((res) => {
        if (res.data.code) {
          localStorage.removeItem("userid");
          store.commit("login/setParams", null);
          store.commit("login/setUserObj", {});
        }
      });
    }
  });
};

// 更新下载次数
// 3.获取工具剩余次数
const getFrequency = async (userid) => {
  return await getDownloadNum(userid).then((res) => {
    // console.log(res.data);
    if (res.data.code == 200) {
      // 保存次数至本地
      store.commit("home/setDownloadNumber", res.data.data.downloadNumber);
    }
  });
};

// 1.进入首页，判断本地缓存是否存在userid，有就是已登录
watch(
  () => store.state.login.userid,
  (newValue) => {
    // 没有登录
    if (newValue == null || newValue.length <= 0) {
      console.log("未登录");
    } else {
      // 已登录，获取用户信息
      getUserInfo(newValue);
      getFrequency(newValue);
    }
  },
  {
    deep: true,
    immediate: true,
  }
);

// 监听身份
let roleType = computed(() => {
  return store.state.user.userData.roleType;
});

// 监听用户身份，存储用户每天次数
watch(
  () => roleType.value,
  (newValue) => {
    if (
      store.state.home.dayloadNumber === null ||
      store.state.home.dayloadNumber <= 0
    ) {
      if (newValue == "free") {
        store.commit("home/setDayloadNumber", 1);
      } else if (newValue == "silver") {
        store.commit("home/setDayloadNumber", 3);
      } else if (newValue == "gold") {
        store.commit("home/setDayloadNumber", 10);
      } else if (newValue == "platinum") {
        store.commit("home/setDayloadNumber", 1);
      } else if (newValue == "diamond") {
        store.commit("home/setDayloadNumber", "无限制");
      }
    }
  },
  { immediate: true }
);

// 监听每天次数,如果小于0，就等于0，并且不可以下载了
watch(
  () => store.state.home.dayloadNumber,
  (newValue) => {
    if (newValue <= 0) {
      store.commit("home/setDayloadNumber", 0);
    }
  },
  {
    immediate: true,
  }
);

// onMounted(() => {
//   axios({
//     methods: "get",
//     baseurl: "http://demo.heycut.com",
//     url: "/api/transcoder/getTemplateList",
//     params: {
//       scene: "compress",
//       pageNum: 1,
//       pageSize: 10,
//     },
//   }).then((res) => {
//     console.log(res);
//   });
// });
</script>

<style lang="scss" scoped>
@import "@/assets/css/home/homePage/homePage_media1280px.scss";
@import "@/assets/css/home/homePage/homePage_media1440px.scss";
@import "@/assets/css/home/homePage/homePage_media1920px.scss";
// 适配1920px
@media screen and (min-width: 1680px) {
  .home_footer_smallBox {
    width: 610px !important;
  }
}
</style>
