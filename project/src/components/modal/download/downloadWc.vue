<template>
  <div v-if="downloadModal.flag" class="downloadWc">
    <!-- 支付弹出层 -->
    <payModel
      :modalFlag="modalFlag"
      @updataVisible="updataModalFlag"
      @close="closeHandle"
    ></payModel>

    <!-- 遮罩层 -->
    <div class="zzc"></div>
    <!-- 弹出框盒子部分 -->
    <div class="download1-box">
      <!-- 退出按钮 -->
      <div class="exitBtn" @click="exitBtnHandle">x</div>

      <div class="download1-top">
        <div class="download1-img">
          <img
            src="@/assets/img/modal/xiazaizhongModal/xiazaiwanc.png"
            alt=""
          />
          <span>下载成功</span>
        </div>
        <h1>
          今日剩余下载数<span>{{
            dayNum === "无限制" ? "无限" : store.state.home.dayloadNumber
          }}</span>
          /{{ dayNum }}张
        </h1>
        <h2>
          {{ dayNum }}不确定图片下载到哪里?
          <span>点击这里</span> ，查看文件储存位置
        </h2>
      </div>
      <div class="download1-bottom">
        <h1>
          升级钻石会员，可享无限次下载，<span @click="modalFlag = true"
            >立即升级会员》</span
          >
        </h1>
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
import { onMounted, onUpdated, ref, toRefs, watch, computed } from "vue";
import payModel from "@/components/modal/payModal/index.vue"; // 用户支付弹出框
import VueQr from "vue-qr/src/packages/vue-qr.vue";
import { useStore } from "vuex";
components: {
  VueQr, payModel;
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
const dayNum = ref(null);
// 监听身份
let identity = computed(() => {
  return store.state.user.userData.roleType;
});

// 4. 支付弹出框
// 支付弹出框
let modalFlag = ref(false);
// 点击弹出框确定按钮，隐藏弹出框
const updataModalFlag = (bol) => {
  modalFlag.value = bol;
};
// 支付成功，关闭自己
const closeHandle = (state) => {
  modalShow.value = state;
};

// 用户身份变化的时候，修改身份
watch(
  () => identity.value,
  (newValue) => {
    if (newValue == "free") {
      dayNum.value = 1;
    } else if (newValue == "silver") {
      dayNum.value = 3;
    } else if (newValue == "gold") {
      dayNum.value = 10;
    } else if (newValue == "platinum") {
      dayNum.value = 100;
    } else if (newValue == "diamond") {
      dayNum.value = "无限制";
    }
  },
  {
    immediate: true,
  }
);

onMounted(() => {});
// watch(
//   () => store.state.home.dayloadNumber,
//   (newValue) => {
//     console.log(newValue);
//   }
// );

onMounted(() => {
  // 开启定时器
  fn();
});

//执行每天24:00 刷新
const fn = () => {
  var nowTemp = new Date().getTime(); //获取当前时间戳

  var tomorrowTemp =
    new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000;

  var residueTemp = tomorrowTemp - nowTemp; //距离当天24：00的时间戳

  //执行定时任务
  setTimeout(() => {
    // store.commit("home/setDayloadNumber", null);
    setInterval(() => {
      store.commit("home/setDayloadNumber", null);
    }, 1000 * 60 * 60 * 24);
  }, 1000);
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
