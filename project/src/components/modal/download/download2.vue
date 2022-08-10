<template>
  <div v-if="downloadModal.flag" class="download2">
    <!-- 遮罩层 -->
    <div class="zzc"></div>
    <!-- 弹出框盒子部分 -->
    <div class="download1-box">
      <!-- 退出按钮 -->
      <div class="exitBtn" @click="exitBtnHandle">x</div>

      <div class="download1-top">
        <div class="download1-img">
          <img src="" alt="" />
          <span>GIF图片下载中</span>
        </div>
        <h1>
          <span>{{ downloadModal.num }}</span> 张GIF图片正在下载中...
        </h1>
        <h2>请耐心等待</h2>
      </div>
      <div class="download1-bottom">
        <img class="cliStyle" src="" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onUpdated, ref, toRefs, watch } from "vue";
components: {
}
// 父子通讯
const props = defineProps({ downloadModal: Object });
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
@import url("@/assets/styles/animation/download/wc.less");
@import url("@/assets/css/modal/download/download2/download2_1440px.less");
// h1,
// h2,
// h3,
// h4,
// h5,
// h6,
// p,
// ul {
//   margin: 0;
// }

// .download1 {
//   z-index: 99;
//   position: fixed;
//   top: 0;
//   left: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 100%;

//   // 遮罩层
//   .zzc {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: #000000;
//     opacity: 0.49;
//   }

//   // 弹出框盒子部分
//   .download1-box {
//     position: relative;
//     z-index: 10;
//     width: 433px;
//     height: 245px;
//     background: #ffffff;
//     box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.2);
//     border-radius: 4px;
//     // 退出按钮
//     .exitBtn {
//       position: absolute;
//       top: 0;
//       right: 0;
//       font-size: 14px;
//     }
//   }
// }
</style>
