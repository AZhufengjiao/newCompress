<template>
  <div v-show="flag" class="loginModal">
    <!-- 遮罩层 -->
    <div class="masLayer" @touchmove.prevent></div>
    <!-- 登录弹出组件 -->
    <div class="loginModal-box">
      <!-- 取消按钮 -->
      <div class="loginModal-cancel" v-on:click="cancelHandle">
        <!-- <div>x</div> -->
        <img
          src="@/assets/img/modal/loginModal/close_slices/close.png"
          alt=""
        />
      </div>

      <!-- 左盒子 -->
      <div class="loginModal-left">
        <h1>SOOGIF</h1>
        <h2>【找动图、做动图】</h2>

        <ul>
          <li>
            <div>
              <img
                src="@/assets/img/modal/loginModal/slices/shape.png"
                alt=""
              />
            </div>
            一步极速注册
          </li>
          <li>
            <div>
              <img
                src="@/assets/img/modal/loginModal/slices/shape.png"
                alt=""
              />
            </div>
            一站式GIF制作工具
          </li>
          <li>
            <div>
              <img
                src="@/assets/img/modal/loginModal/slices/shape.png"
                alt=""
              />
            </div>
            10s上手制作高级动图
          </li>
          <li>
            <div>
              <img
                src="@/assets/img/modal/loginModal/slices/shape.png"
                alt=""
              />
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
          <div class="loginModal-right-img">
            <img
              src="@/assets/img/modal/loginModal/wechat-small_slices/wechat-small.png"
              alt=""
            />
          </div>
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
        <a-checkbox :checked="true"
          >勾选代表你同意《<router-link to="">会员协议声明</router-link
          >》</a-checkbox
        >
        <!-- 登录按钮 -->
        <!-- <a-button type="primary">
          <div class="primary-img">
            <img
              src="@/assets/img/modal/loginModal/phone_slices/phone.png"
              alt=""
            />
          </div>
          手机登录
        </a-button> -->
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
// 二维码中图片url
let logo = require("@/assets/img/modal/loginModal/wechat-small_slices/wechat-small@2x.png");
components: {
  VueQr;
}
// 跳转
const router = useRouter();

// 父传子
const props = defineProps({
  loginFlag: Boolean,
});
const emit = defineEmits(["cancelChild"]);

// 登录弹出框组件显示与隐藏
const flag = ref(false);
// 勾选复选框
const checked = ref(true);
watch(
  () => flag.value,
  (newValue) => {
    if (newValue) {
      loginHandle();
    }
  }
);
// 设置定时器
let time = ref(null);
// 监听父组件传递的参数
watch(
  () => props.loginFlag,
  (newValue) => {
    // 说明登录弹出框显示了，那就开始开启定时器判断是否登录
    if (newValue) {
      // 父组件传递的值如果是true，就赋值，让弹出框显示
      flag.value = newValue;
      // 处理轮训
      time.value = window.setInterval(() => {
        scanQRcodes(ticket.value);
      }, 1000);
    }
  },
  { deep: true }
);

// 登录二维码
// 获取轮训要用的参数
let ticket = ref("");
// 获取二维码要用的url
let qrCodePictureUrl = ref("");

// 获取登录二维码
const loginHandle = () => {
  return userLogin().then((res) => {
    if (res.data.code == 200) {
      ticket.value = res.data.data.ticket;
      qrCodePictureUrl.value = res.data.data.qrCodePictureUrl;
    }
  });
};

// 点击取消按钮，隐藏组件，传递参数状态给父组件
const cancelHandle = () => {
  // 隐藏
  flag.value = false;
  // 传递参数状态给父组件
  emit("cancelChild", false);
  // 清除定时器
  clearInterval(time.value);
  time.value = null;
};

// 轮训调用来确定扫码是否成功
const scanQRcodes = (ticket) => {
  return getScanQRcodes(ticket).then((res) => {
    if (res.data.code === 200) {
      // 存储用户id到本地
      let id = res.data.data.entity.id;
      // 存储用户姓名和头像
      let obj = {
        face: res.data.data.entity.face,
        nickname: res.data.data.entity.nickname,
        sign: res.data.data.entity.sign,
      };
      console.log(res.data.data.entity);
      store.commit("login/setParams", id);
      store.commit("login/setUserObj", obj);
      store.commit("login/setEntity", res.data.data.entity);
      // 清除定时器
      clearInterval(time.value);
      time.value = null;

      // 登录成功，关闭弹窗
      cancelHandle();
    }
  });
};

// 卸载组件清除定时器
onUnmounted(() => {
  clearInterval(time.value);
  time.value = null;
});
</script>

<style lang="less" scoped>
@import "@/assets/css/modal/loginModal/loginModal_1440px.less";
</style>
