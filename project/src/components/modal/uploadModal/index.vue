<template>
  <div v-show="modalShow" class="uploadModal">
    <!-- 遮罩层 -->
    <div class="zzc"></div>
    <!-- 弹出框盒子部分 -->
    <div class="uploadModal-box">
      <!-- 右上角删除键 -->
      <div class="cancel" v-on:click="cancelHandle">x</div>
      <!-- 图片 -->
      <div class="img">
        <img src="" alt="" />
      </div>
      <!-- 免费会员  -->
      <div v-if="UploadModal.state === 'free'">
        <p>免费会员支持大小不超过10M视频上传</p>
        <h1>成为白银会员立享<span>50</span>M内视频上传</h1>
      </div>
      <!-- 白银会员  -->
      <div v-else-if="UploadModal.state === 'silver'">
        <p>白银会员支持大小不超过50M视频上传</p>
        <h1>成为黄金会员立享<span>100</span>M内视频上传</h1>
      </div>
      <!-- 黄金会员 -->
      <div v-else-if="UploadModal.state === 'goid'">
        <p>黄金会员支持大小不超过100M视频上传</p>
        <h1>成为白金会员立享<span>无限制</span>视频上传</h1>
      </div>
      <div class="button">
        <a-button @click="payModalShow">我先试试</a-button>
        <a-button class="nth-last" type="primary" @click="payModalShow"
          >立即升级
        </a-button>
      </div>
    </div>
  </div>
  <!-- 支付弹出层 -->
  <payModel
    :modalFlag="modalFlag"
    @updataVisible="updataModalFlag"
    @close="closeHandle"
  ></payModel>
</template>

<script setup>
import payModel from "@/components/modal/payModal/index.vue";
import { onUpdated, ref, toRefs, watch } from "vue";
components: {
  payModel;
}
const props = defineProps({ UploadModal: Object });
const emit = defineEmits(["updateFlag"]);
let { UploadModal } = toRefs(props);

// 弹出框显示与隐藏的状态
let modalShow = ref(UploadModal.value.flag);

watch(
  () => UploadModal.value.flag,
  (newValue) => {
    modalShow.value = newValue;
  },
  {
    immediate: true,
  }
);

// 点击我先试试
const handleTry = () => {
  emit("");
};

// 支付成功，关闭自己
const closeHandle = (state) => {
  modalShow.value = state;
};

// 点击删除键，关闭弹出框
const cancelHandle = () => {
  modalShow.value = false;
  emit("updateFlag", false);
};

let currentId = ref(83);

// 支付弹出框
let modalFlag = ref(false);
// 点击显示弹出框
const payModalShow = () => {
  emit("updateFlag", false);
  modalFlag.value = true;
};
// 点击弹出框确定按钮，隐藏弹出框
const updataModalFlag = (bol) => {
  modalFlag.value = bol;
};
</script>

<style lang="less" scoped>
@import "@/assets/css/modal/uploadModal/uploadModal_1440px.less";
</style>
