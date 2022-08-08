<template>
  <div class="paySucceedModal" v-show="modalFlag">
    <!-- 遮罩层 -->
    <div class="masLayer"></div>
    <!-- 弹出框组件 -->
    <div class="paySucceedModal-cancel">
      <!-- 左 -->
      <div class="paySucceedModal-cancel-left">
        <div class="container">
          <div class="paySucceedModal-successImg">
            <img src="" alt="" />
          </div>
          <h1>支付成功</h1>
          <p>支付金额：949,940.00</p>
          <p>支付时间：2020.20.39 23:29:13</p>
          <p>订单编号：9495909692395969</p>
          <h2>白金会员：2020.12.23到期</h2>
          <a-button type="primary">立即体验</a-button>
        </div>
      </div>
      <!-- 右 -->
      <div class="paySucceedModal-cancel-right">
        <div class="container">
          <!-- 隐藏按钮 -->
          <div class="deleteBtn" @click="delHandle">x</div>
          <h1>领取年费会员大礼包</h1>
          <ul>
            <li>
              <div class="img-box">
                <div><img src="" alt="" /></div>
              </div>
              <p>228+高级功能</p>
            </li>
            <li>
              <div class="img-box">
                <div><img src="" alt="" /></div>
              </div>
              <p>228+高级功能</p>
            </li>
            <li>
              <div class="img-box">
                <div><img src="" alt="" /></div>
              </div>
              <p>228+高级功能</p>
            </li>
            <li>
              <div class="img-box">
                <div><img src="" alt="" /></div>
              </div>
              <p>12堂动图玩法课程</p>
            </li>
            <li>
              <div class="img-box">
                <div><img src="" alt="" /></div>
              </div>
              <p>228+高级功能</p>
            </li>
            <li>
              <div class="img-box">
                <div><img src="" alt="" /></div>
              </div>
              <p>228+高级功能</p>
            </li>
            <li>
              <div class="img-box">
                <div><img src="" alt="" /></div>
              </div>
              <p>228+高级功能</p>
            </li>
            <li>
              <div class="img-box">
                <div><img src="" alt="" /></div>
              </div>
              <p>12堂动图玩法课程</p>
            </li>
          </ul>
          <div class="QRCode">
            <qrcode-vue :value="QRURL" :size="108" />
          </div>
          <p>- 扫码领取 -</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//导入组件
import QrcodeVue from "qrcode.vue";
import { ref, toRefs, watch } from "vue";
components: {
  QrcodeVue;
}
// 父子组件通讯，弹出框显示与隐藏
const props = defineProps({
  flag: Boolean,
});
const emit = defineEmits(["updateFlag"]);
// 弹出框显示与隐藏
const { flag } = toRefs(props);
let modalFlag = ref(flag.value);
watch(
  () => flag.value,
  (newValue) => {
    modalFlag.value = newValue;
  },
  {
    immediate: true,
  }
);

// 点击按钮，弹出框隐藏
const delHandle = () => {
  modalFlag.value = false;
  emit("updateFlag", false);
};

// 二维码 url
const QRURL = ref("https://www.baidu.com/");
</script>

<style lang="less" scoped>
@import "@/assets/css/modal/paySucceedModal/paySucceedModal_1440px.less";
</style>
