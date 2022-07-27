<template>
  <div v-show="flag" class="loginModal">
    <!-- 遮罩层 -->
    <div class="masLayer" @touchmove.prevent></div>
    <!-- 登录弹出组件 -->
    <div class="loginModal-box">
      <!-- 取消按钮 -->
      <div class="loginModal-cancel" v-on:click="cancelHandle">
        <div>x</div>
      </div>

      <!-- 左盒子 -->
      <div class="loginModal-left">
        <h1>SOOGIF</h1>
        <h2>【找动图、做动图】</h2>

        <ul>
          <li>
            <div>
              <img src="" alt="" />
            </div>
            一步极速注册
          </li>
          <li>
            <div>
              <img src="" alt="" />
            </div>
            一站式GIF制作工具
          </li>
          <li>
            <div>
              <img src="" alt="" />
            </div>
            10s上手制作高级动图
          </li>
          <li>
            <div>
              <img src="" alt="" />
            </div>
            新用户限时领取工具会员
          </li>
        </ul>

        <!-- 样式 -->
        <!-- 圆 -->
        <div class="loginModal-circle"></div>
        <!-- 背景图片 -->
        <div class="loginModal-bgI"></div>
      </div>
      <!-- 右盒子 -->
      <div class="loginModal-right">
        <div class="loginModal-right-title">
          <div class="loginModal-right-img"><img src="" alt="" /></div>
          <span>微信扫码立即登陆</span>
        </div>
        <!-- 二维码 -->
        <div class="QRCode-wx">
          <!-- <div class="QRCode-wx-img"></div> -->
          <vue-qr
            class="img"
            :text="qrCodePictureUrl"
            :size="156"
            :logoSrc="logo"
            :logoScale="0.2"
          >
          </vue-qr>
          <p>扫一扫关注公众号后登陆</p>
        </div>

        <!-- 复选框 -->
        <a-checkbox v-model:checked="checked"
          >勾选代表你同意《<router-link to="">会员协议声明</router-link
          >》</a-checkbox
        >
        <!-- 登录按钮 -->
        <a-button type="primary">
          <div class="primary-img"><img src="" alt="" /></div>
          手机登录
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  defineProps,
  watch,
  defineEmits,
  onUpdated,
  onUnmounted,
} from "vue";
// 二维码插件
import VueQr from "vue-qr/src/packages/vue-qr.vue";
// 调用接口
import { getScanQRcodes, userLogin } from "@/api/login";
// 二维码中图片url
let logo = require("@/assets/logo.png");
components: {
  VueQr;
}

// 父传子
const props = defineProps({
  loginFlag: Boolean,
});
const emit = defineEmits(["cancelChild"]);

// 登录弹出框组件显示与隐藏
const flag = ref(false);
// 勾选复选框
const checked = ref(false);
onUpdated(() => {
  if (flag.value) {
    loginHandle();
  }
});
// 监听父组件传递的参数
watch(
  () => props.loginFlag,
  (newValue) => {
    // 父组件传递的值如果是true，就赋值，让弹出框显示
    flag.value = newValue;
  },
  { deep: true }
);

// 登录二维码
// 获取轮训要用的参数
let ticket = ref("");
// 获取二维码要用的url
let qrCodePictureUrl = ref("");
// 设置定时器
let time = ref(null);
// 获取登录二维码
const loginHandle = () => {
  return userLogin().then((res) => {
    if (res.data.code == 200) {
      ticket.value = res.data.data.ticket;
      qrCodePictureUrl.value = res.data.data.qrCodePictureUrl;
      // 处理轮训
      time.value = setInterval(() => {
        console.log(11);
        scanQRcodes(ticket.value);
      }, 5000);
    }
  });
};

// 点击取消按钮，隐藏组件，传递参数状态给父组件
const cancelHandle = () => {
  // 隐藏
  flag.value = false;
  // 传递参数状态给父组件
  emit("cancelChild", false);
};

// 轮训调用来确定扫码是否成功
const scanQRcodes = (ticket) => {
  return getScanQRcodes(ticket).then((res) => {
    console.log(res.data);
    // console.log(res.data.data.entity.id);
    if (res.data.code === 200) {
      // 清除定时器
      clearInterval(time.value);
      let id = res.data.data.entity.id;
      localStorage.setItem("login-key", id);
    }
  });
};

// 卸载组件清除定时器
onUnmounted(() => {
  clearInterval(time.value);
});
</script>

<style lang="less" scoped>
@import "@/assets/css/loginModal/loginModal_1440px.less";
</style>
