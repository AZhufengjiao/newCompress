<template>
  <div v-if="downloadModal.flag" class="downloadWc">
    <!-- 遮罩层 -->
    <div class="zzc"></div>
    <!-- 弹出框盒子部分 -->
    <div class="download1-box">
      <!-- 退出按钮 -->
      <div class="exitBtn" @click="exitBtnHandle">x</div>

      <div class="download1-top">
        <div class="download1-img">
          <img src="" alt="" />
          <span>下载成功</span>
        </div>
        <h1>
          今日剩余下载数<span>{{
            dayNum === "无限制*" ? "无限" : dayNum - downloadModal.num
          }}</span>
          /{{ dayNum }}张
        </h1>
        <h2>不确定图片下载到哪里? <span>点击这里</span> ，查看文件储存位置</h2>
      </div>
      <div class="download1-bottom">
        <h1>升级钻石会员，可享无限次下载，<span>立即升级会员》</span></h1>
        <div class="download1-Tencent">
          <div class="qr-code">
            <vue-qr
              :logoSrc="logo"
              text="Hello world!"
              :size="300"
              :logoScale="0.2"
            ></vue-qr>
          </div>
          <div class="download1-Tencent-box">
            <h2>关注【Yo动图说】公众号</h2>
            <h3>每日分享好看GIF素材，教你PS做GIF</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref, toRefs, watch } from "vue";
import VueQr from "vue-qr/src/packages/vue-qr.vue";
import { useStore } from "vuex";
components: {
  VueQr;
}
let store = useStore();
// 二维码中图片url
let logo = require("@/assets/logo.png");
// 父子通讯
const props = defineProps({ downloadModal: Object });
const emit = defineEmits(["updateFlag"]);
let { downloadModal } = toRefs(props);
// 退出按钮
const exitBtnHandle = () => {
  emit("updateFlag", false);
};
const dayNum = ref(0);
// 用户身份
let identity = ref(store.state.user.userData.roleType);
// 用户身份变化的时候，修改身份
watch(
  () => identity.value,
  (newValue) => {
    identity.value = newValue;
  }
);

// 当弹出框显示的时候，进行操作
watch(
  () => props.downloadModal,
  (newValue) => {
    if (newValue) {
      console.log(newValue);
      console.log(store.state.user.userData.roleType);
      if (store.state.user.userData.roleType == "free") {
        dayNum.value = 1;
      } else if (store.state.user.userData.roleType == "silver") {
        dayNum.value = 3;
      } else if (store.state.user.userData.roleType == "goid") {
        dayNum.value = 10;
      } else if (store.state.user.userData.roleType == "platinum") {
        dayNum.value = 100;
      } else if (store.state.user.userData.roleType == "diamond") {
        dayNum.value = "无限制*";
      }
    }
  },
  { immediate: true }
);

// 父组件代码
// let flag = ref(false);
// const updateFlag = (res) => {
//   flag.value = res;
// };
</script>

<style lang="less" scoped>
@import url("@/assets/css/modal/download/downloadWc/downloadWc_1440px.less");
</style>
