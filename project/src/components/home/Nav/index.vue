<template>
  <div class="header_box">
    <!-- <div> -->
    <div class="header_logo">
      <slot name="header_logo"></slot>
    </div>
    <div class="nav">
      <router-link to="/about"><span>首页</span></router-link>
      <router-link to="/"><span>分类</span></router-link>
      <router-link to="/"><span>趣图</span></router-link>
      <router-link to="/"><span>接口</span></router-link>
      <router-link to="/"><span>联系我们</span></router-link>
    </div>
    <div class="fenjxian"></div>
    <div class="eye_logo">
      <img src="" alt="" />
    </div>
    <div class="tool">在线GIT工具</div>
    <div class="home_vip" v-on:click="$router.push('/myVip')">会员vip</div>
    <div class="login_box">
      <span class="home_login_box_span">登录</span>
      <span class="home_divider"></span>
      <span class="home_login_box_span">注册</span>
    </div>
    <!-- </div> -->
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style lang="scss" scoped>
.header_box {
  //
  display: flex;
  width: 100%;
  position: fixed;
  top: 0;
  height: 110px;
  justify-content: center;
  background: #f6f7f9;
  z-index: 9;
  // min-width: 1920px;
}
.header_logo {
  width: 207px;
  height: 69px;
  margin-top: 19px;
}
.nav {
  width: 568px;
  display: flex;
  justify-content: space-between;
  margin-left: 74px;
  margin-top: 37px;
}
.nav span {
  letter-spacing: 11px;
  color: #252525;
  font-size: 22px;
  line-height: 33px;
}
.nav a {
  height: 33px;
}
.fenjxian {
  width: 3px;
  height: 19px;
  background: #c7c7c7;
  opacity: 0.51;
  margin-top: 19px;
  margin: 45px 66px 0 66px;
}
/*  眼睛logo */
.eye_logo {
  width: 37px;
  height: 37px;
  margin-top: 36px;
  margin-right: 5px;
  img {
    width: 100%;
    height: 100%;
  }
}
.tool {
  width: 141px;
  height: 33px;
  font-size: 24px;
  font-family: PingFangSC-Light, PingFang SC;
  font-weight: 300;
  color: #252525;
  line-height: 33px;
  letter-spacing: 1px;
  margin-top: 37px;
  margin-right: 40px;
}
.home_vip {
  width: 153px;
  height: 44px;
  background: #0544ff;
  border-radius: 133px;
  margin-top: 37px;
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  line-height: 44px;
  text-align: center;
  margin-right: 63px;
}
.login_box {
  width: 164px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.home_divider {
  display: inline-block;
  width: 3px;
  height: 19px;
  background: #c7c7c7;
  opacity: 0.51;
  margin: 0 29px;
}
.home_login_box_span {
  font-size: 21px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #252525;
  line-height: 29px;
  letter-spacing: 4px;
}

@import "@/assets/css/home/homeNav/Nav/index_media1440px.scss";
@import "@/assets/css/home/homeNav/Nav/index_media1280px.scss";
</style>
