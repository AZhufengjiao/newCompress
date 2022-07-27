<template>
  <div class="header">
    <div class="container">
      <div class="header-box">
        <!-- 左 -->
        <div class="header-logo">
          <div class="header-logo-left">
            <div class="wathet"></div>
            <div class="blue"></div>
          </div>
          <div class="header-logo-right">HEYCUT</div>
        </div>
        <!-- 右 -->
        <div class="header-login-box">
          <!--  未登录显示 -->
          <div v-if="userid == null || userid.length <= 0" class="notLogin">
            <div class="header-login" v-on:click="loginFlag = true">登录</div>
            <div class="header-xian"></div>
            <div class="header-login">注册</div>
          </div>
          <!--  已登录显示 -->
          <div v-else class="haveLogged">
            <img
              src="https://www.soogif.com/images/website/photo/photo6.gif"
              alt=""
            />

            <div class="haveLoggedHover">
              <h1>SOOGIF ID: {{ userid }}</h1>
              <h2 v-on:click="logoutHandle">退出账号</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 登录弹出框 -->
  <loginModel :loginFlag="loginFlag" @cancelChild="CancelChild"></loginModel>
</template>

<script setup>
import loginModel from "@/components/loginModal/index.vue";
import { userLogOut } from "@/api/login";
import { ref, watch } from "vue";
import { useStore } from "vuex";
components: {
  loginModel;
}
const store = useStore();
let visible = ref(true);

// 获取本地用户id，查看是否登录
let userid = ref("");
userid.value = store.state.login.userid;

watch(
  () => store.state.login.userid,
  (newValue) => {
    userid.value = newValue;
  },
  { immediate: true }
);

// 登录弹出框
const loginFlag = ref(false);
// 获取子组件传值复制
const CancelChild = (val) => {
  loginFlag.value = val;
};

// 退出登录
const logoutHandle = () => {
  return userLogOut().then((res) => {
    if (res.data.code) {
      localStorage.removeItem("userid");
      store.commit("login/setParams", null);
    }
  });
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/about/aboutNav/aboutNav_1440px.scss";
</style>
