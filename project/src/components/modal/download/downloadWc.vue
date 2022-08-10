<template>
  <div v-if="downloadModal" class="downloadWc">
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
          今日剩余下载数<span>{{ downloadModal.num }}</span> /3张
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
import { onUpdated, ref, toRefs, watch } from "vue";
import VueQr from "vue-qr/src/packages/vue-qr.vue";
components: {
  VueQr;
}
// 二维码中图片url
let logo = require("@/assets/logo.png");
// 父子通讯
const props = defineProps({ downloadModal: Boolean });
const emit = defineEmits(["updateFlag"]);
let { downloadModal } = toRefs(props);
// 退出按钮
const exitBtnHandle = () => {
  emit("updateFlag", false);
};

// 父组件代码
// let flag = ref(false);
// const updateFlag = (res) => {
//   flag.value = res;
// };
</script>

<style lang="less" scoped>
@import url("@/assets/css/modal/download/downloadWc/downloadWc_1440px.less");
</style>
