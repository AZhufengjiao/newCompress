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
          <div class="header-login" v-on:click="loginFlag = true">登录</div>

          <div class="header-xian"></div>
          <div class="header-login">注册</div>
        </div>
      </div>
    </div>
  </div>

  <!-- 登录弹出框 -->
  <loginModel :loginFlag="loginFlag" @cancelChild="CancelChild"></loginModel>
</template>

<script setup>
import loginModel from "@/components/loginModal/index.vue";

import { onUpdated, ref, watch } from "vue";
components: {
  loginModel;
}
// 登录弹出框
const loginFlag = ref(false);
// 获取子组件传值复制
const CancelChild = (val) => {
  loginFlag.value = val;
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/about/aboutNav/aboutNav_1440px.scss";
</style>
