<template>
  <div class="header" id="header" :class="white === 'white' ? 'white' : ''">
    <div class="container">
      <div class="header-box">
        <!-- 左 -->
        <div class="header-logo">
          <div class="header-logo-left">
            <div class="wathet"></div>
            <div class="blue"></div>
          </div>
          <div class="header-logo-right" v-on:click="$router.push('/')">
            HEYCUT
          </div>
        </div>
        <!-- 右 -->
        <div class="header-login-box">
          <div class="home_vip" v-on:click="$router.push('/pricing')">
            会员vip
          </div>
          <!--  未登录显示 -->
          <div v-if="userid == null || userid.length <= 0" class="notLogin">
            <div class="header-login" v-on:click="loginFlag = true">登录</div>
            <div class="header-xian"></div>
            <div class="header-login" v-on:click="loginFlag = true">注册</div>
          </div>
          <!--  已登录显示 -->
          <div v-else class="haveLogged">
            <img :src="store.state.login.userObj.face" alt="" />
            <!-- 经过显示 -->
            <div class="haveLoggedHover">
              <!-- 定位背景 -->
              <div class="positionImg"></div>

              <!-- 用户信息 -->
              <div class="haveLoggedHover-user">
                <div class="user-img">
                  <img :src="store.state.login.userObj.face" alt="" />
                </div>
                <div class="haveLoggedHover-info">
                  <h1>{{ store.state.login.userObj.nickname }}</h1>
                  <h2>
                    ID: {{ store.state.login.userid }} &nbsp;
                    <span @click="copyHandle">复制</span>
                  </h2>
                </div>
              </div>
              <!-- 开通会员 -->
              <div class="haveLoggedHover-vip">
                <!-- 球 -->
                <div class="ball"></div>
                <div>
                  <h1>{{ identityInfo }}</h1>
                  <h2>享全站工具288+功能</h2>
                </div>
                <a-button type="primary" @click="$router.push('/pricing')"
                  >立即开通</a-button
                >
              </div>
              <!-- 列表 -->
              <div class="haveLoggedHover-list">
                <ul>
                  <li @click="$router.push('/user/orders')">
                    <img
                      src="@/assets/img/aboutPage/nav/dist/juxing.png"
                      alt=""
                    />
                    <span>我的订单</span>
                  </li>
                  <li @click="$router.push('/user/invoices')">
                    <img
                      src="@/assets/img/aboutPage/nav/dist/shenqing.png"
                      alt=""
                    />
                    <span>申请发票</span>
                  </li>
                </ul>
                <!-- <ul>
                  <li>
                    <img src="@/assets/img/aboutPage/nav/dist/my.png" alt="" />
                    <span>我的GIF库</span>
                  </li>
                  <li>
                    <img
                      src="@/assets/img/aboutPage/nav/dist/setting.png"
                      alt=""
                    />
                    <span>账号设置</span>
                  </li>
                </ul> -->
                <ul>
                  <li v-on:click="logoutHandle">
                    <img
                      src="@/assets/img/aboutPage/nav/dist/quit.png"
                      alt=""
                    />
                    <span>退出登陆</span>
                  </li>
                </ul>
              </div>
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
import loginModel from "@/components/modal/loginModal/index.vue";
import { userLogOut } from "@/api/login";
import { computed, onMounted, ref, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { imgList } from "./index.js";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
components: {
  loginModel;
}
const props = defineProps({
  white: String,
});
const { white } = toRefs(props);
const store = useStore();
// 跳转
const router = useRouter();
let visible = ref(true);

// 获取本地用户id，查看是否登录
let userid = computed(() => store.state.login.userid);
//  获取用户身份
const identity = ref("");
const identityInfo = ref("免费会员：终身");

// // 监听用户id
// watch(
//   () => store.state.login.userid,
//   (newValue) => {
//     userid.value = newValue;
//   },
//   { immediate: true }
// );

// 监听用户身份
watch(
  () => store.state.user.userData.roleType,
  (newValue) => {
    // 判断用户身份是否为空
    if (newValue !== null || newValue.length !== 0) {
      // 赋值用户身份
      identity.value = newValue;
      if (newValue === "free") {
        identityInfo.value = "免费会员：终身";
      } else if (newValue === "silver") {
        identityInfo.value = "白银会员：周卡";
      } else if (newValue === "gold") {
        identityInfo.value = "黄金会员：月卡";
      } else if (newValue === "platinum") {
        identityInfo.value = "白金会员：年卡";
      } else if (newValue === "diamond") {
        identityInfo.value = "钻石会员：终身";
      }
    }
  },
  {
    immediate: true,
  }
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
      localStorage.removeItem("lanhu");
      // 刷新页面
      router.go(0);
    }
  });
};

// 复制文字
const copyHandle = () => {
  navigator.clipboard.writeText(store.state.login.userid).then(() => {
    message.success("复制成功");
  });
};
</script>

<style lang="scss" scoped>
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
li {
  margin: 0;
  padding: 0;
}
@import "@/assets/css/about/aboutNav/aboutNav_1280px.scss";
@import "@/assets/css/about/aboutNav/aboutNav_1440px.scss";
</style>
