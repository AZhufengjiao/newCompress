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
          'myVip-setMeal-layout',
          setMealList.length > 4 ? '' : 'myVip-setMeal-layout2',
          !btnToggle && btnToggle != null ? 'cliStyle' : '',
          btnToggle && btnToggle != null ? 'clitogglestyle' : '',
          MealUlWidth == 0 ? 'UpdateStyle' : '',
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
          :id="
            item.scene.indexOf('/activity/') == -1
              ? 'myVip-setMeal-pattern'
              : ''
          "
          v-on:click="currentId = item.pId"
        >
          <!--    class="myVip-setMeal-box myVip-setMealboxOne"   -->
          <!-- 盒子上部分 -->
          <div class="myVip-setMeal-box-plan">
            <!-- 右上角定位 -->
            <div
              v-if="item.tag.length !== 0"
              class="myVip-setMeal-box-plan-preference"
            >
              {{ item.tag }}
            </div>
            <p>{{ item.huiYuanType }}会员·{{ item.newTimeLimit }}</p>
            <div class="myVip-setMeal-box-plan-price-box">
              <div
                v-if="index !== 0 && item.flag !== false"
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
      v-if="setMealList.length != 0 && MealUlWidth !== 0 && btnToggle == false"
      v-on:click="btnToggle = true"
      class="myVip-setMeal-clickBtn myVip-setMeal-clickBtn-left"
    >
      <span class="sj"></span>
    </div>
    <div
      v-show="
        setMealList.length > 4 &&
        (btnToggle === true || btnToggle == null) &&
        MealUlWidth !== 0
      "
      v-on:click="btnToggle = false"
      class="myVip-setMeal-clickBtn myVip-setMeal-clickBtn-right"
    >
      <span class="sj"></span>
    </div>
  </div>
</template>

<script setup>
import elementResizeDetectorMaker from "element-resize-detector";
import { useRouter } from "vue-router";
import payModel from "@/components/modal/payModal/index.vue"; // 支付弹出框
import loginModel from "@/components/modal/loginModal/index.vue"; // 支付弹出框
import { getSetMeal, getMyCoupon } from "@/api/about";
import { onMounted, onUpdated, ref, watch, onUnmounted, computed } from "vue";
import taoCanFn from "@/assets/js/taoCanFn.js"; // 封装套餐数据
import { useStore } from "vuex";
components: {
  payModel, loginModel;
}
var erd = elementResizeDetectorMaker(); //创建实例
const $router = useRouter();
const store = useStore();
// 用户id
let userid = computed(() => store.state.login.userid);
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
// left移动的宽度
const MealUlWidth = ref(118);

// 组件卸载
onUnmounted(() => {
  // 离开页面删除检测器和所有侦听器
  erd.uninstall(MealBox.value); //这里用ref是因为vue离开页面后获取不到dom
});
onUpdated(() => {
  // 监听dom
  erd.listenTo(MealBox.value, (ele) => {
    // 获取需要的宽度
    MealUlWidth.value =
      ele.offsetWidth > setMealUl.value.offsetWidth
        ? 0
        : setMealUl.value.offsetWidth - ele.offsetWidth;
    // 判断窗口大小是否大于ul大小，大的话赋值需要移动的宽度，不大就不需要移动
    if (MealUlWidth.value !== 0) {
      setMealUl.value.style.setProperty(
        "--view-left",
        -MealUlWidth.value + "px"
      );
      console.log(123);
    } else {
      setMealUl.value.style.setProperty("--view-left", 0 + "px");
    }
  });
});

watch(
  () => store.state.login.userid,
  (newValue) => {
    // userid.value = newValue;
    // 获取优惠券
    getCoupon(userid.value);
    // 获取套餐数据
    setMealInfo(newValue);
  }
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
  if (userid.value !== null && userid.value.length !== 0) {
    modalFlag.value = true;
  } // 未登录显示登录弹窗
  else {
    loginFlag.value = true;
  }
};

const btnToggle = ref(null);

// 套餐数据
let setMealList = ref([]);
// 优惠券数据
const myCouponList = ref([]);

// 1.从本地拿套餐数据
onMounted(() => {
  // 获取优惠券
  getCoupon(userid.value);
  // 获取套餐数据
  setMealInfo(userid.value);
});

// 3.获取可用优惠券
const getCoupon = (userid) => {
  return getMyCoupon(userid).then((res) => {
    if (res.data.code == 200) {
      myCouponList.value = res.data.data;

      store.commit("home/setMyCoupon", res.data.data);
    }
  });
};

// 2. 获取套餐信息列表存储本地
const setMealInfo = (id) => {
  id = id === null || id.length == 0 ? -1 : id;
  return getSetMeal(id).then((res) => {
    if (res.data.code == 200) {
      // 1.1赋值
      setMealList.value = taoCanFn(res.data.data, store.state.home.myCoupon);
      setMealList.value.map((item) => {
        let arr = [];
        myCouponList.value.filter((j) => {
          if (j.roleType === item.roleType) {
            arr.push(j);
          } else {
            arr.push({ discountPrice: 0 });
          }
        });

        // 查看哪个套餐没有优惠券
        let flag = myCouponList.value.some((s) => item.roleType === s.roleType);
        // 没有就标记一下
        if (!flag) {
          item.flag = false;
          arr.push({ discountPrice: 0 });
        }
        if (myCouponList.value.length !== 0) {
          item.discountPrice = item.discountPrice - arr[0].discountPrice;
          item.discountPrice <= 0
            ? (item.discountPrice = 0.01)
            : item.discountPrice;
        } else {
          item.discountPrice = item.discountPrice;
          item.discountPrice <= 0
            ? (item.discountPrice = 0.01)
            : item.discountPrice;
        }
      });
    }
  });
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/animation/myVip/VipSetMeal/index.scss";
@import "@/assets/css/myVip/VipSetMeal/VipSetMeal_media1280px.scss";
@import "@/assets/css/myVip/VipSetMeal/VipSetMeal_media1440px.scss";
</style>
