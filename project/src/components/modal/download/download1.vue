<template>
  <div v-if="downloadModal.exit" class="download1">
    <!-- 父组件复制代码  确定生成下载弹出框 -->
    <!-- <download1
      :downloadModal="download1Flag"
      @updateFlag="updateFlag"
      @updateconfirm="updateconfirm"
    ></download1> -->

    <!-- 遮罩层 -->
    <div class="zzc"></div>
    <!-- 弹出框盒子部分 -->
    <div class="download1-box">
      <!-- 退出按钮 -->
      <div class="exitBtn" @click="exitBtnHandle">x</div>

      <div class="download1-top">
        <div class="download1-img">
          <img src="" alt="" />
          <span>生成GIF或视频</span>
        </div>
        <h1>
          本次生成下载数 <span>{{ downloadModal.num }}</span> 张
        </h1>
        <h2>今日剩余下载张数 3/3</h2>
      </div>
      <div class="download1-bottom">
        <a-button @click="exitBtnHandle">再考虑</a-button>
        <a-button type="primary" @click="confirmHandle">确定生成</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from "vue";
components: {
}
// 父子通讯
const props = defineProps({ downloadModal: Object });
const emit = defineEmits(["updateFlag", "updateconfirm"]);
let { downloadModal } = toRefs(props);
console.log(downloadModal.value);

// 退出按钮
const exitBtnHandle = () => {
  emit("updateFlag", false);
};
// 点击确定按钮
const confirmHandle = () => {
  emit("updateconfirm", true);
  // emit("updateFlag", false);
};

// 父组件代码复制代码
//  确定生成弹出框
// let download1Flag = ref({
//   exit: false,
//   confirm: false,
//   num: 0,
// });
// // 确定生成弹出框点击’取消‘按钮
// const updateFlag = (res) => {
//   download1Flag.value.exit = res;
//   download1Flag.value.confirm = res;
// };
// // 确定生成弹出框点击’确定‘按钮
// const updateconfirm = (res) => {
//   download1Flag.value.confirm = res;
// };
// let downloadTimer = ref(null);
// // 视频大小，不超过身份限制，下载视频
// download1Flag.value.exit = true;
// download1Flag.value.num = uploadFiles.length;
// // 身份验证成功，判断用户是否点击确认按钮
// downloadTimer.value = window.setInterval(() => {
//   // 用户点击确认按钮，开始下载
//   if (download1Flag.value.confirm) {
//     // 关闭弹出框
//     download1Flag.value.exit = false;
//     download1Flag.value.confirm = false;
//     // 开始下载

//     // 清除定时器
//     clearInterval(downloadTimer.value);
//     downloadTimer.value = null;
//   }
// }, 500);
</script>

<style lang="less" scoped>
@import url("@/assets/css/modal/download/download1/download1_1440px.less");
</style>
