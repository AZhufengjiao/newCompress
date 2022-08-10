<template>
  <div class="myVip-setMealbox">
    <!-- 支付弹出层 -->
    <payModel
      :modalFlag="modalFlag"
      @updataVisible="updataModalFlag"
      :currentId="currentId"
    ></payModel>

    <!-- 登录弹出框 -->
    <loginModel :loginFlag="loginFlag" @cancelChild="CancelChild"></loginModel>

    <div class="myVip-setMeal" ref="MealBox">
      <div
        ref="setMealUl"
        :class="[
          setMealList.length > 4
            ? 'myVip-setMeal-layout'
            : 'myVip-setMeal-layout2',
          !btnToggle && btnToggle != null ? 'cliStyle' : '',
          btnToggle && btnToggle != null ? 'clitogglestyle' : '',
        ]"
      >
        <!-- <div class="myVip-setMeal-layout"> -->
        <!-- 1 -->
        <div
          v-for="(item, index) in setMealList"
          :key="item"
          :class="{
            'myVip-setMeal-box': item,
            'myVip-setMealboxOne ': index === 0,
            'myVip-setMealboxTwo': index === 1,
            'myVip-setMealboxSan': index === 2,
            'myVip-setMealboxSi': index === 3,
            'myVip-setMealboxWu': index === 4,
          }"
          :id="index !== 0 && item.scene === '' ? 'myVip-setMeal-pattern' : ''"
          v-on:click="currentId = item.pId"
        >
          <!--    class="myVip-setMeal-box myVip-setMealboxOne"   -->
          <!-- 盒子上部分 -->
          <div class="myVip-setMeal-box-plan">
            <!-- 右上角定位 -->
            <div
              v-if="item.tag.length !== ''"
              class="myVip-setMeal-box-plan-preference"
            >
              {{ item.tag }}
            </div>
            <p>{{ item.huiYuanType }}会员·{{ item.newTimeLimit }}</p>
            <div class="myVip-setMeal-box-plan-price-box">
              <div
                v-if="index !== 0 && item.yhq[0]"
                class="myVip-setMeal-box-plan-quan"
              >
                券后
              </div>
              <div class="myVip-setMeal-box-plan-price">
                {{ item.discountPrice }}
              </div>
              <div class="myVip-setMeal-box-plan-yuan">元</div>
            </div>

            <div v-if="index !== 0" class="myVip-setMeal-box-plan-yj">
              原价:{{ item.pPrice }}.00
            </div>
            <!-- 仅剩时间 -->
            <div v-if="index === 0" class="myVip-setMeal-box-plan-time">
              <div class="setMeal-box-time-js">仅剩</div>
              <div class="setMeal-box-time-box">09</div>
              <span> ：</span>
              <div class="setMeal-box-time-box">08</div>
              <span> ：</span>
              <div class="setMeal-box-time-box">23</div>
            </div>
            <!-- <div>立即抢购</div> -->
            <a-button
              class="myVip-setMeal-box-plan-PanicBuying"
              id="PanicBuying"
              v-on:click="modalShow(item)"
              >立即抢购</a-button
            >

            <div class="myVip-setMeal-box-plan-xz">
              全站编辑器内<span>{{
                item.downloadTimes === "无限"
                  ? item.downloadTimes
                  : item.downloadTimes + "张/天"
              }}</span
              >下载
            </div>
            <div class="myVip-setMeal-box-col"></div>
          </div>
          <!-- 盒子权益部分 -->
          <div class="myVip-setMeal-box-qy">
            <!-- 下载权益 -->
            <div class="myVip-setMeal-box-qy-box">
              <div class="myVip-setMeal-box-qy-box-top">
                <h1>下载权益</h1>
                <div>----------------</div>
              </div>
              <div class="myVip-setMeal-box-qy-box-bottom">
                <div class="myVip-setMeal-box-qy-btmBox">
                  <h2>去水印下载</h2>
                  <span></span>
                </div>
                <div class="myVip-setMeal-box-qy-btmBox">
                  <h2>提升速度200%</h2>
                  <span></span>
                </div>
                <div class="myVip-setMeal-box-qy-btmBox">
                  <h2>下载增至50张/天</h2>
                  <span></span>
                </div>
              </div>
            </div>
            <!-- 工作权益 -->
            <div class="myVip-setMeal-box-qy-box">
              <div class="myVip-setMeal-box-qy-box-top">
                <h1>工具权益</h1>
                <div>----------------</div>
              </div>
              <div class="myVip-setMeal-box-qy-box-bottom">
                <div class="myVip-setMeal-box-qy-btmBox">
                  <h2>去水印下载</h2>
                  <span></span>
                </div>
                <div class="myVip-setMeal-box-qy-btmBox">
                  <h2>提升速度200%</h2>
                  <span></span>
                </div>
                <div class="myVip-setMeal-box-qy-btmBox">
                  <h2>下载增至50张/天</h2>
                  <span></span>
                </div>
                <div class="myVip-setMeal-box-qy-btmBox">
                  <h2>去水印下载</h2>
                  <span></span>
                </div>
                <div class="myVip-setMeal-box-qy-btmBox">
                  <h2>提升速度200%</h2>
                  <span></span>
                </div>
                <div class="myVip-setMeal-box-qy-btmBox">
                  <h2>下载增至50张/天</h2>
                  <span></span>
                </div>
                <div class="myVip-setMeal-box-qy-btmBox">
                  <h2>去水印下载</h2>
                  <span></span>
                </div>
                <div class="myVip-setMeal-box-qy-btmBox">
                  <h2>提升速度200%</h2>
                  <span></span>
                </div>
              </div>
            </div>
            <!-- 查看权益详细说明 -->
            <div class="myVip-setMeal-box-explain">
              <span>查看权益详细说明</span>
            </div>
            <!-- 最后一个 -->
            <div class="myVip-setMeal-box-finally">
              <h2>工具权益</h2>
              <div class="myVip-setMeal-box-finally-box">
                <h1>买一送十</h1>
                <span>查看</span>
              </div>
              <div v-if="index === 0" class="myVip-setMeal-box-finally-box">
                <h1>抽奖赢好礼</h1>
                <span>100%中奖</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 2 -->

        <!-- <div class="myVip-setMeal-clickBtn"></div> -->
      </div>
    </div>

    <!-- 左右两边的点击按钮 -->
    <div
      v-show="setMealList.length > 4 && (btnToggle || btnToggle == null)"
      v-on:click="btnToggle = false"
      class="myVip-setMeal-clickBtn myVip-setMeal-clickBtn-left"
    >
      <span class="sj"></span>
    </div>
    <div
      v-show="btnToggle === false"
      v-on:click="btnToggle = true"
      class="myVip-setMeal-clickBtn myVip-setMeal-clickBtn-right"
    >
      <span class="sj"></span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import payModel from "@/components/modal/payModal/index.vue"; // 支付弹出框
import loginModel from "@/components/modal/loginModal/index.vue"; // 支付弹出框
import { getSetMeal } from "@/api/about";
import { onMounted, onUpdated, ref, watch } from "vue";
import taoCanFn from "@/assets/js/taoCanFn.js"; // 封装套餐数据
import { useStore } from "vuex";
components: {
  payModel, loginModel;
}
const $router = useRouter();
const store = useStore();
// 用户id
let userid = ref(null);
// 选择套餐id
let currentId = ref(null);
// 支付弹出框 -----------------支付弹出框
let modalFlag = ref(false);
// 点击弹出框确定按钮，隐藏弹出框
const updataModalFlag = (bol) => {
  modalFlag.value = bol;
};

// 获取套餐固定盒子的DOM
const MealBox = ref(null);
// 获取套餐盒子滚动的盒子的DOM
const setMealUl = ref("");
const MealUlWidth = ref(null);
onMounted(() => {});
onUpdated(() => {
  // console.log(MealBox.value.scrollWidth);
  // console.log(setMealUl.value);
  // console.log(MealBox.value);
  // console.log(setMealUl.value.scrollWidth, MealBox.value.scrollWidth);
  // MealUlWidth.value =
  //   setMealUl.value.clientWidth > MealBox.value.clientWidth
  //     ? setMealUl.value.clientWidth - MealBox.value.clientWidth
  //     : 0;
  // console.log(MealUlWidth.value);
});

window.onresize = async () => {
  watch(
    () => MealBox.value.scrollWidth,
    (vewValue) => {
      console.log(vewValue);
      ss;
    }
  );

  console.log(MealBox.value);
  console.log(MealBox.value.scrollWidth);
};

watch(
  () => setMealUl.value.scrollWidth,
  (vewValue) => {
    console.log(111);
    console.log(vewValue);

    // console.log(vewValue.value.clientWidth);
  },
  {
    immediate: true,
  }
);

watch(
  () => store.state.login.userid,
  (newValue) => {
    userid.value = newValue;
  },
  { immediate: true }
);

// 登录弹出框  -----------------录弹出框
const loginFlag = ref(false);
// 获取子组件传值复制
const CancelChild = (val) => {
  loginFlag.value = val;
};

// 点击立即弹出框，判断有无登录，支付弹出框
const modalShow = (item) => {
  // 登录显示支付弹窗
  if (userid.value !== null) {
    modalFlag.value = true;
  } // 未登录显示登录弹窗
  else {
    loginFlag.value = true;
  }
};

const btnToggle = ref(null);

// 套餐数据
let setMealList = ref([]);

// 1.从本地拿套餐数据
onMounted(() => {
  // 获取套餐数据
  setMealInfo(userid.value);
});

// 检测用户是否重新登录
watch(
  () => userid.value,
  (newValue) => {
    // 获取套餐数据
    setMealInfo(userid.value);
  }
);

// 2. 获取套餐信息列表存储本地
const setMealInfo = (id) => {
  id = id === null ? -1 : id;
  return getSetMeal(id).then((res) => {
    if (res.data.code == 200) {
      console.log(res.data.data);
      // 1.1赋值
      setMealList.value = taoCanFn(res.data.data, store.state.home.myCoupon);

      console.log(setMealList.value);
      // 存本地
      // store.commit("home/setSetMealInfo", res.data.data);
    }
  });
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/animation/myVip/VipSetMeal/index.scss";
@import "@/assets/css/myVip/VipSetMeal/VipSetMeal_media1280px.scss";
@import "@/assets/css/myVip/VipSetMeal/VipSetMeal_media1440px.scss";
</style>
