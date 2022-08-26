<template>
  <!--  user -->
  <div class="user">
    <aboutNav :white="white"></aboutNav>

    <div class="user-box">
      <!-- 左 -->
      <div class="user-left">
        <div class="user-top">
          <div><img :src="store.state.login.userObj.face" alt="" /></div>
          <h1>微信账号：{{ store.state.login.userObj.nickname }}</h1>
          <p>
            SOOGIF会员：<span>{{ identityInfo }}</span>
          </p>
        </div>
        <div class="user-bottom">
          <ul>
            <li
              :class="{ liBgc: active == item.id }"
              @click="handleToggle(item)"
              v-for="item in list"
              :key="item.id"
            >
              {{ item.title }}
            </li>
            <!-- <li :class="{ liBgc: active == 2 }" @click="handleToggle(2)">
              在线发票
            </li> -->
          </ul>
        </div>
      </div>
      <!-- 右 -->
      <div class="user-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import aboutNav from "@/components/about/aboutNav/index.vue";
import { conditionalExpression } from "@babel/types";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
components: {
  aboutNav;
}
// 设置nav背景颜色
const white = ref("#f6f7f9");
let active = ref(1);
// 查看
const router = useRoute();
// 跳转
const $router = useRouter();
const store = useStore();
let list = [
  {
    id: 1,
    router: "/user/orders",
    title: "vip记录",
  },
  {
    id: 2,
    router: "/user/invoices",
    title: "在线发票",
  },
];
// 身份
const identityInfo = ref("免费会员");
// 监听用户身份
watch(
  () => store.state.user.userData.roleType,
  (newValue) => {
    // 判断用户身份是否为空
    if (newValue !== null || newValue.length !== 0) {
      if (newValue === "free") {
        identityInfo.value = "免费会员";
      } else if (newValue === "silver") {
        identityInfo.value = "白银会员";
      } else if (newValue === "gold") {
        identityInfo.value = "黄金会员";
      } else if (newValue === "platinum") {
        identityInfo.value = "白金会员";
      } else if (newValue === "diamond") {
        identityInfo.value = "钻石会员";
      }
    }
  },
  {
    immediate: true,
  }
);

// 监听路由的变化
watch(
  () => router.fullPath,
  (newValue) => {
    if (newValue === "/user/orders") {
      active.value = 1;
    } else if (newValue === "/user/invoices") {
      active.value = 2;
    }
  },
  {
    immediate: true,
  }
);

// 添加LI跳转页面
const handleToggle = (item) => {
  if (item.id !== active.value) {
    $router.push(item.router);
  }
  active.value = item.id;
};
</script>

<style lang="less" scoped>
h1,
h2,
h3,
h4,
h5,
h5,
p,
ul,
li {
  margin: 0;
}
@import url("@/assets/css/user/userPage/userPage_media1440px.less");
@import url("@/assets/css/user/userPage/userPage_media1280px.less");
</style>
