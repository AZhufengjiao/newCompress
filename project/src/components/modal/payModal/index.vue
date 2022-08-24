<template>
  <!-- <div v-if="ZFBQR.length > 0"> -->
  <div>
    <!-- 支付成功弹出框 -->
    <paySucceedModal
      :flag="paySuccessF"
      @updateFlag="updateFlagHandle"
    ></paySucceedModal>

    <div v-show="visible" class="modal">
      <!-- 遮罩层 -->
      <div class="masLayer"></div>
      <!-- 盒子 -->
      <div class="modal-box">
        <!-- 顶部 -->
        <div class="modal-header">
          <!-- 删除按钮 -->
          <div class="ant-modal-close-x" @click="handleOk">
            <img src="@/assets/img/modal/payModal/del/del.png" alt="" />
          </div>
          <!-- 左边 -->
          <div class="modal-header-left">
            <div class="modal-header-img">
              <img :src="store.state.login.userObj.face" alt="" />
            </div>
            <div class="modal-header-span">
              <div class="modal-header-name">
                <div>{{ store.state.login.userObj.nickname }}</div>
                <div class="modal-header-identity">{{ shenfen }}</div>
              </div>
              <span>2028.09.23到期</span>
            </div>
          </div>
          <!-- 右边 -->
          <div class="modal-header-right">SOOGIF</div>
        </div>
        <!-- 盒子 -->
        <div class="modal-contents">
          <div class="modal-content-side">
            <h1>智能抠图·权益</h1>
            <!-- // 权益 -->
            <div class="modal-equity">
              <h2>工具权益</h2>
              <ul class="equityUl">
                <li>
                  <h3>下载提升50张/天</h3>
                  <div>
                    <img
                      src="@/assets/img/modal/payModal/slices/gou.png"
                      alt=""
                    />
                  </div>
                </li>
                <li>
                  <h3>下载提升50张/天</h3>
                  <div>
                    <img
                      src="@/assets/img/modal/payModal/slices/gou.png"
                      alt=""
                    />
                  </div>
                </li>
                <li>
                  <h3>下载提升50张/天</h3>
                  <div>
                    <img
                      src="@/assets/img/modal/payModal/slices/gou.png"
                      alt=""
                    />
                  </div>
                </li>
                <li>
                  <h3>下载提升50张/天</h3>
                  <div>
                    <img
                      src="@/assets/img/modal/payModal/slices/gou.png"
                      alt=""
                    />
                  </div>
                </li>
              </ul>

              <h2 style="margin-bottom: 8px">限时好礼</h2>

              <div class="limit-roll">
                <ul>
                  <li>
                    <div><span>VIP</span></div>
                    <div>赠 135编辑器月VIP</div>
                  </li>
                  <li>
                    <div><span>VIP</span></div>
                    <div>赠 135编辑器月VIP</div>
                  </li>
                  <li>
                    <div><span>VIP</span></div>
                    <div>赠 135编辑器月VIP</div>
                  </li>
                  <li>
                    <div><span>VIP</span></div>
                    <div>赠 135编辑器月VIP</div>
                  </li>
                </ul>
              </div>
              <h4>查看钻石会员全部权益 》</h4>
            </div>

            <!-- // 会员 -->
            <!-- <div class="modal-member">
            <ul>
              <li>
                <div class="modal-member-img"><img src="" alt="" /></div>
                <p>228+高级功能</p>
              </li>
              <li>
                <div class="modal-member-img"><img src="" alt="" /></div>
                <p>228+高级功能</p>
              </li>
              <li>
                <div class="modal-member-img"><img src="" alt="" /></div>
                <p>228+高级功能</p>
              </li>
              <li>
                <div class="modal-member-img"><img src="" alt="" /></div>
                <p>228+高级功能</p>
              </li>
            </ul>
          </div> -->
          </div>
          <div class="modal-content-box">
            <!-- tab -->
            <!-- <div class="modal-content-box-top">
            <div class="modal-tc modal-tc-active">
              <h1>包月套餐</h1>
              <div class="modal-markDown">李健20%</div>
            </div>
            <div class="modal-tc">
              <h1>按次购买</h1>
            </div>
          </div> -->
            <!-- 动画 -->
            <div class="modal-mvpTC">
              <div class="modal-mvpTC-box">
                <ul
                  ref="stykleUl"
                  :class="[
                    !StyleFlag && StyleFlag != null ? 'StyleaLeft' : '',
                    StyleFlag && StyleFlag != null ? 'StyleaRight' : '',
                  ]"
                >
                  <li
                    id="li"
                    @click="clickLiHandle(item, index)"
                    v-for="(item, index) in taocanList"
                    :class="[
                      Id + '' == item.pId ? '' : 'twoLi',
                      MousemoveNum + '' == item.pId ? 'styleLi' : '',
                    ]"
                    :key="item"
                  >
                    <!-- 立减 -->
                    <div v-if="item.tag.length !== 0" class="subtract1">
                      {{ item.tag }}
                    </div>
                    <!-- 左下角-卷 -->
                    <div v-show="index === 0" class="quan">
                      <img
                        src=" https://www.soogif.com/images/vip/tool-coupon.png"
                        alt=""
                      />
                    </div>

                    <h1>{{ item.huiYuanType }}会员</h1>
                    <!-- <div class="modal-robShopping">显示抢购</div> -->
                    <div class="modal-mvpTC-price">
                      <div class="modal-price">{{ item.discountPrice }}</div>
                      <div class="modal-yuan">元</div>
                      <!-- <span v-if="index === 0">¥{{ item.pPrice }}</span> -->
                    </div>
                    <h4>{{ item.pPrice }}.00元</h4>
                    <p>
                      全站编辑器内{{
                        item.downloadTimes === "无限"
                          ? item.downloadTimes
                          : item.downloadTimes + "张/天"
                      }}下载
                    </p>
                    <!-- <h2 v-if="index === 0">只能抠图100张/月</h2> -->
                  </li>
                  <!-- <li class="twoLi">
                  <h1>终身会员</h1>
                  <div class="modal-robShopping">显示抢购</div>
                  <div class="modal-mvpTC-price">
                    <div class="modal-price">268</div>
                    <div class="modal-yuan">元</div>
                  </div>
                  <h4 v-if="index !== 0">100.00元</h4>
                  <p>全站编辑器内10张/天下载</p>
                </li> -->
                </ul>

                <div
                  class="mvpTC-left"
                  v-show="
                    (!StyleFlag || StyleFlag == null) && taocanList.length > 4
                  "
                  v-on:click="StyleFlag = true"
                ></div>
                <div
                  class="mvpTC-right"
                  v-show="StyleFlag === true"
                  v-on:click="StyleFlag = false"
                ></div>
              </div>
            </div>

            <!-- 优惠下拉框 -->
            <div class="discountCoupon" @click="myCouponFlag = !myCouponFlag">
              <!-- 左 -->
              <div class="discountCoupon-left">
                <div class="discountCoupon-left-quan">券</div>
                <span>优惠折扣:</span>
                <div class="discountCoupon-left-jian">
                  -¥{{ paymentAmount.discounts }}
                </div>
              </div>
              <!-- 右 -->
              <div class="discountCoupon-right">
                <span>已为您匹配最大金额优惠券</span>
                <div class="discountCoupon-right-box">
                  <div class="top-sj" v-show="!myCouponFlag"></div>
                  <div class="bottom-sj"></div>
                </div>
              </div>

              <!-- 下拉框 -->
              <div
                :class="{
                  xialakuang: true,
                  'xialakuangOver-Y': myCouponList.length > 5,
                }"
                v-show="myCouponFlag"
              >
                <ul>
                  <li
                    v-for="item in myCouponList"
                    :key="item.couponId"
                    @click="handleYhq(item)"
                  >
                    <div class="xialakuang-left">
                      <span>优惠券</span>
                      <div>¥: {{ item.discountPrice }}</div>
                    </div>
                    <div class="xialakuang-right">
                      仅限购买{{ item.huiyuan }}使用
                    </div>
                  </li>
                  <li>
                    <div class="xialakuang-left">
                      <span>不使用优惠券</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!-- 支付方式 -->
            <div class="modePayment">
              <!-- 支付 -->
              <div class="modal-payment">
                <!-- 微信 -->
                <a-button
                  type="primary"
                  :class="{
                    'modal-payment-wx': true,
                    'modal-payment-zf': !payToggle,
                  }"
                  @click="payToggleHandle('wx')"
                >
                  <!-- <div class="modal-payment-img">
                    <img src="" alt="" />
                  </div> -->
                  <span>微信支付</span>
                  <!-- <span>微信支付</span> -->
                </a-button>
                <!-- 支付宝 -->
                <a-button
                  type="primary"
                  :class="{
                    'modal-payment-wx': true,
                    'modal-payment-zf': payToggle,
                  }"
                  @click="payToggleHandle('zfb')"
                >
                  <!-- <div class="modal-payment-img">
                    <img src="" alt="" />
                  </div> -->
                  <span>支付宝</span>
                  <!-- <span>支付宝</span> -->
                </a-button>
              </div>
              <!-- 二维码 -->
              <div class="modal-QRCode">
                <qrcode-vue :value="ZFBQR" :size="90"></qrcode-vue>
              </div>
              <!-- 支付金额 -->
              <div class="modePayment-price">
                <h1>
                  实付 <span>{{ paymentAmount.price }}</span
                  >元

                  <h5>已优惠{{ paymentAmount.discounts }}元</h5>
                </h1>
                <h2>
                  优惠券倒计时 : &nbsp;
                  <span class="red-span">09:08:03,6</span>
                </h2>
                <h3>支付即视为同意 《SOOGIF抠图协议》</h3>
              </div>

              <!-- 动画 -->
              <!-- <div class="modePayment-dh">
                <ul ref="carouselDom" :style="{ top: -carouselNum + 'px' }">
                  <li v-for="item in carouselList" :key="item">
                    <div class="modePayment-dh-img">
                      <img src="" alt="" />
                    </div>
                    <p><span>S*****1，购买了白金会员</span></p>
                  </li>
                </ul>
              </div> -->
            </div>

            <p>支付即视为同意 《SOOGIF抠图协议》</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import paySucceedModal from "@/components/modal/paySucceedModal/index.vue";
import {
  ref,
  defineProps,
  watch,
  defineEmits,
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeUnmount,
  toRefs,
  computed,
} from "vue";
import { useStore } from "vuex";
import QrcodeVue from "qrcode.vue";
import { getAlipayQR, getWxQR, getPayState } from "@/api/payQR";
import { getDownloadNum, getSetMeal, getMyCoupon } from "@/api/about";
import taoCanFn from "@/assets/js/taoCanFn.js"; //封装套餐数据
import { userList } from "@/api/user";
import { useRouter } from "vue-router";
components: {
  QrcodeVue, paySucceedModal;
}
const store = useStore();
// 跳转router
const router = useRouter();
/**
 * modalFlag 弹出框显示与隐藏
 * currentId 套餐id
 */
const props = defineProps({
  modalFlag: Boolean,
  currentId: Number,
});
let { currentId } = toRefs(props);

const emit = defineEmits(["updataVisible", "close"]);
// 控制弹出框显示与隐藏
const visible = ref(props.modalFlag);
// 套餐选择的身份
let roleType = computed(() => {
  return store.state.user.userData.roleType;
});

// 点击切换动画
const StyleFlag = ref(null);
let payToggle = ref(false);

// 套餐数据
let taocanList = ref([]);
// 获取支付金额
let paymentAmount = ref({
  price: null,
  discounts: null,
});
// 用户id
let userid = computed(() => store.state.login.userid);
// 用户身份
let shenfen = ref("");
// 获取支付宝二维码需要的参数
let ticketType = ref(null);
// 支付宝二维码字符串
let ZFBQR = ref("");

// 支付时间
let payNum = ref(0);
// 支付定时器
let payTimer = ref(null);
// Pid
let Id = ref(null);

// 优惠券列表
const myCouponList = ref([]);
// 优惠框开关
const myCouponFlag = ref(false);

// 支付成功弹出框
const paySuccessF = ref(false);
// 子组件传值，修改父组件
const updateFlagHandle = (res) => {
  paySuccessF.value = res;
};

// 1. 获取套餐信息列表存储本地
const setMealInfo = async (id) => {
  return await getSetMeal(id).then((res) => {
    if (res.data.code == 200) {
      // 1.1赋值
      // taocanList.value = res.data.data;
      taocanList.value = taoCanFn(res.data.data, store.state.home.myCoupon);
      taocanList.value.map((item) => {
        myCouponList.value.filter((j) => {
          if (item.roleType === j.roleType) {
            item.yhq.push(j);
          }
        });

        // 查看没有优惠券的套餐
        let flag = myCouponList.value.some((s) => item.roleType === s.roleType);
        if (!flag) {
          item.yhq.push({ discountPrice: 0 });
        }
      });
    }
  });
};

// 用户是否已支付
const getPayStatus = async (userId) => {
  let formData = new FormData();
  formData.append("userId", userId);
  return await getPayState(formData).then((res) => {
    // 支付成功
    if (res.data.code == 200) {
      // 支付成功，刷新页面
      router.go(0);
      // 支付成功，弹出支付成功弹出框
      paySuccessF.value = true;

      // 清除定时器
      clearInterval(payTimer.value);
      payTimer.value = null;
      payNum.value = 0;

      // 更新信息
      getUserInfo(userId);
      // 工具剩余次数
      getFrequency(userId);

      // 关闭弹窗
      visible.value = false;
      emit("close", false);
    } else {
      // console.log("未支付");
    }
  });
};

// 1.2 调用接口，获取用户信息
const getUserInfo = async (userid) => {
  return await userList(userid).then((res) => {
    // 没有过期 保存用户状态信息
    if (res.data.code == 200) {
      // 存本地
      store.commit("user/setUserData", res.data.data);
    }
  });
};

// 3.获取工具剩余次数
const getFrequency = async (userid) => {
  return await getDownloadNum(userid).then((res) => {
    if (res.data.code == 200) {
      // 保存次数至本地
      store.commit("home/setDownloadNumber", res.data.data.downloadNumber);
    }
  });
};

// 查看用户是否支付
const payTimerHandle = () => {
  // 获取支付宝二维码开启定时器，判断用户是否支付
  payTimer.value = window.setInterval(() => {
    // 监听支付时间
    payNum.value += 1000;
    // post请求

    // 发起请求，查看用户是否支付
    getPayStatus(userid.value);

    // 判断付款轮询时间有没有超过五分钟
    if (payNum.value >= 300000) {
      // 清除定时器
      clearInterval(payTimer.value);
      payTimer.value = null;
      payNum.value = 0;
      // 关闭弹出框
      visible.value = false;
      emit("close", false);
    }
  }, 1000);
};

// 获取支付宝支付二维码
const getZfbQR = async (productId, userId, ticketType) => {
  return await getAlipayQR(productId, userId, ticketType).then((res) => {
    if (res.data.code == 200) {
      // 获取支付宝二维码赋值
      ZFBQR.value = res.data.data.code_url;
    }
  });
};

// 获取微信支付二维码
const getWxQRHandle = async (productId, userId, ticketType) => {
  return await getWxQR(productId, userId, ticketType).then((res) => {
    if (res.data.code == 200) {
      // 获取微信二维码赋值
      ZFBQR.value = res.data.data.code_url;
    }
  });
};
// 1.监听父组件传递的套餐id currentId
watch(
  () => currentId.value,
  (newValue) => {
    Id.value = newValue;
  },
  { deep: true, immediate: true }
);

// 监听父组件传递的状态 modalFlag
watch(
  () => props.modalFlag,
  (newValue) => {
    if (newValue === false) {
      Id.value = null;
    }
    // 参数是true，就赋值显示弹出框
    if (newValue == true) {
      // 获取可用优惠券信息
      getCoupon(userid.value);
      // 1.1赋值
      setMealInfo(userid.value);

      // 赋值
      visible.value = newValue;
    }
  },
  {
    deep: true,
    // immediate: true,
  }
);

// 监听数据数组获取到没，获取到了判断如果没有Id的话进这个逻辑
watch(
  () => taocanList.value,
  (newValue) => {
    if (newValue.length != 0) {
      // 判断id是否为空
      if (Id.value == null || Id.value === 0) {
        // 修改支付金额
        taocanList.value.map((item, index) => {
          //  修改最开始的pid
          if (roleType.value == "free") {
            Id.value = taocanList.value.filter(
              (item) => item.roleType === "silver"
            )[0].pId;
            // 动画
            if (item.roleType === "silver") {
              donghuaFlag(index);
            }
          }
          if (roleType.value == "silver") {
            Id.value = taocanList.value.filter(
              (item) => item.roleType === "gold"
            )[0].pId;
            // 动画
            if (item.roleType === "gold") {
              donghuaFlag(index);
            }
          }
          if (roleType.value == "gold") {
            Id.value = taocanList.value.filter(
              (item) => item.roleType === "platinum"
            )[0].pId; // 动画
            if (item.roleType === "platinum") {
              donghuaFlag(index);
            }
          }
          if (roleType.value == "platinum") {
            Id.value = taocanList.value.filter(
              (item) => item.roleType === "diamond"
            )[1].pId;
            // 动画
            if (item.roleType === "diamond") {
              donghuaFlag(index);
            }
          }
          if (roleType.value == "diamond") {
            // 赋值id为第二个
            Id.value = taocanList.value.filter(
              (item) => item.roleType === "diamond"
            )[1].pId;
            // 动画
            if (item.roleType === "diamond") {
              donghuaFlag(index);
            }
          }
          // 动画
          function donghuaFlag(index) {
            // 判断数组是否大于4，并且ID是都是最后一个，如果是最后，那么就要滚动支付弹出框
            if (taocanList.value.length > 4) {
              if (index === 3 || index === 4) {
                StyleFlag.value = false;
              }
            }
          }

          if (item.pId == Id.value) {
            ticketType.value = item.timeLimit;
            // 套餐id改变时，修改支付金额
            paymentAmount.value.price = item.discountPrice;
            paymentAmount.value.discounts = item.pPrice - item.discountPrice;
            // 赋值
            // 获取支付宝支付二维码
            getZfbQR(Id.value, userid.value, ticketType.value);
          }
        });

        // 弹出框显示，展示支付二维码，查看用户是否支付
        payTimerHandle();

        // // 获取支付宝二维码参数的函数
        // taocanList.value.map((item) => {
        //   if (item.pId == props.currentId) {
        //     ticketType.value = item.timeLimit;
        //   }
        // });
      } else if (currentId.value !== null) {
        // 修改支付金额
        taocanList.value.map((item, index) => {
          if (item.pId === currentId.value) {
            Id.value = item.pId;
            ticketType.value = item.timeLimit;
            // 套餐id改变时，修改支付金额
            paymentAmount.value.price =
              item.discountPrice - item.yhq[0].discountPrice;
            paymentAmount.value.price <= 0
              ? (paymentAmount.value.price = 0.01)
              : paymentAmount.value.price;
            paymentAmount.value.discounts = item.yhq[0].discountPrice;

            // 判断数组是否大于4，并且ID是都是最后一个，如果是最后，那么就要滚动支付弹出框
            if (taocanList.value.length > 4) {
              if (index === 3 || index === 4) {
                StyleFlag.value = false;
              }
            }

            // 赋值
            // 获取支付宝支付二维码
            getZfbQR(Id.value, userid.value, ticketType.value);
          }
        });

        // 弹出框显示，展示支付二维码，查看用户是否支付
        payTimerHandle();
      }
    }
  },
  {
    immediate: true,
  }
);

// 监听用户身份
watch(
  () => store.state.user.userData.roleType,
  (newValue) => {
    if (newValue === "free") {
      shenfen.value = "免费";
    } else if (newValue == "silver") {
      shenfen.value = "白银";
    } else if (newValue == "gold") {
      shenfen.value = "黄金";
    } else if (newValue == "platinum") {
      shenfen.value = "白金";
    } else if (newValue == "diamond") {
      shenfen.value = "钻石";
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {});

// 点击确定弹出框隐藏
const handleOk = (e) => {
  StyleFlag.value = null;
  visible.value = false;

  // 弹窗关闭清除定时器
  clearInterval(payTimer.value);
  payTimer.value = null;
  payNum.value = 0;

  // 传递参数给父组件
  emit("updataVisible", false);
};

// 存储鼠标经过的id
let MousemoveNum = ref(Number);
// // 鼠标经过li的时候
// const handleMousemove = (id, index) => {
//   index !== 0 ? (MousemoveNum.value = id) : "";
// };
// 动画ul的DOM
let stykleUl = ref("");
// 鼠标点击li的时候
const clickLiHandle = (item, index) => {
  if (taocanList.value.length > 4) {
    if (index === 3 || index === 4) {
      StyleFlag.value = false;
    } else {
      StyleFlag.value = true;
    }
  }
  if (index === 0) {
    return;
  }
  // 切换li
  Id.value = item.pId;

  // 重新赋值发起请求
  ticketType.value = item.timeLimit;

  // 获取支付宝支付二维码
  getZfbQR(Id.value, userid.value, ticketType.value);

  // 获取优惠券
  // let yhq = [];
  // myCouponList.value.map((res) => {
  //   if (res.roleType === item.roleType) {
  //     yhq.push(res);
  //   } else {
  //     yhq.push({ discountPrice: 0 });
  //   }
  // });
  // 更新支付金额
  paymentAmount.value.price = item.discountPrice - item.yhq[0].discountPrice;

  // 已优惠
  paymentAmount.value.discounts = item.yhq[0].discountPrice;
  if (paymentAmount.value.price <= 0) {
    paymentAmount.value.price = 0.01;
  }
};

// 点击按钮，切换支付宝微信二维码
let payToggleHandle = (state) => {
  // 支付宝按钮
  if (state === "zfb") {
    payToggle.value = false;
    // 获取支付宝支付二维码
    getZfbQR(Id.value, userid.value, ticketType.value);
  } // 微信按钮
  else if (state === "wx") {
    payToggle.value = true;
    getWxQRHandle(Id.value, userid.value, ticketType.value);
  }
};

// 轮播图定时器
let carouselTimer = ref(null);
// 轮播ulDom
let carouselDom = ref(null);
let carouselNum = ref(0);
//轮播数据
let carouselList = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]);
// 支付信息轮播 获取ulDom
watch(
  () => carouselDom.value,
  (newValue) => {
    if (newValue != null) {
      // console.log(carouselList.value.length * 42);
      carouselDom.value = newValue;
      // 轮播自转
      carouselRotation();
    }
  }
);
// 轮播图自转
const carouselRotation = () => {
  // 滚动限制
  let num = carouselList.value.length * 42 - 10 - 116; // ul的高减去一个外边距减去一个ul可见的高就是能滚送的数字
  // 轮播定位高度
  carouselTimer.value = setInterval(() => {
    carouselNum.value += 1;
    if (carouselNum.value >= num) {
      carouselNum.value = 0;
    }
  }, 250);
};

// 4.获取可用优惠券
const getCoupon = async (userid) => {
  return await getMyCoupon(userid).then((res) => {
    if (res.data.code == 200) {
      res.data.data.map((item) => {
        if (item.roleType === "diamond") {
          item.huiyuan = "钻石终身卡";
        } else if (item.roleType === "platinum") {
          item.huiyuan = "白金年卡";
        } else if (item.roleType === "gold") {
          item.huiyuan = "黄金月卡";
        } else if (item.roleType === "free") {
          item.huiyuan = "免费会员";
        } else if (item.roleType === "silver") {
          item.huiyuan = "白银周卡";
        }
      });
      myCouponList.value = res.data.data;
      store.commit("home/setMyCoupon", res.data.data);
    }
  });
};

// 点击优惠券
const handleYhq = (item) => {
  taocanList.value.map((res) => {
    if (res.roleType === item.roleType) {
      Id.value = res.pId;
      if (res.roleType === "diamond") {
        Id.value = 81;
      }
      // 套餐id改变时，修改支付金额s

      paymentAmount.value.price = res.discountPrice - item.discountPrice;
      paymentAmount.value.discounts = item.discountPrice;
    }
  });
};

// 卸载组件清除定时器
onUnmounted(() => {
  // 二维码支付
  clearInterval(payTimer.value);
  payTimer.value = null;
  payNum.value = 0;
  // 轮播图 去除定时器
  clearInterval(carouselTimer.value);
  carouselTimer.value = null;
  Id.value = null;
});
</script>

<style lang="less" scoped>
// @import "ant-design-vue/dist/antd.less";
@import "@/assets/styles/animation/payModel/index.scss";
@import "@/assets/css/modal/payModal/payModal_1440px.less";
</style>
