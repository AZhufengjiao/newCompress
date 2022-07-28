<template>
  <div class="paymodal">
    <a-modal
      v-model:visible="visible"
      title="Basic Modal"
      :get-container="false"
      :afterClose="handleOk"
      class="aaamodal"
    >
      <template #header>
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
          >Submit
        </a-button>
      </template>
      <!-- 顶部 -->
      <div class="modal-header">
        <!-- 左边 -->
        <div class="modal-header-left">
          <div class="modal-header-img">
            <img src="" alt="" />
          </div>
          <div class="modal-header-span">SOOGIF</div>
        </div>
        <!-- 右边 -->
        <div class="modal-header-right">SOOGIF</div>
      </div>
      <div class="modal-contents">
        <div class="modal-content-side">
          <h1>智能抠图·权益</h1>
          <!-- // 权益 -->
          <div class="modal-equity">
            <h2>工具权益</h2>
            <ul>
              <li>
                <h3>下载提升50张/天</h3>
                <div><img src="" alt="" /></div>
              </li>
              <li>
                <h3>下载提升50张/天</h3>
                <div><img src="" alt="" /></div>
              </li>
              <li>
                <h3>下载提升50张/天</h3>
                <div><img src="" alt="" /></div>
              </li>
              <li>
                <h3>下载提升50张/天</h3>
                <div><img src="" alt="" /></div>
              </li>
            </ul>
          </div>
          <h1>SOOGIF·钻石会员</h1>
          <!-- // 会员 -->
          <div class="modal-member">
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
          </div>
          <h4>查看钻石会员全部权益 》</h4>
        </div>
        <div class="modal-content-box">
          <!-- tab -->
          <div class="modal-content-box-top">
            <div class="modal-tc modal-tc-active">
              <h1>包月套餐</h1>
              <div class="modal-markDown">李健20%</div>
            </div>
            <div class="modal-tc">
              <h1>按次购买</h1>
            </div>
          </div>
          <!-- 动画 -->
          <div class="modal-mvpTC">
            <div class="modal-mvpTC-box">
              <ul
                :class="[
                  !StyleFlag && StyleFlag != null ? 'StyleaLeft' : '',
                  StyleFlag && StyleFlag != null ? 'StyleaRight' : '',
                ]"
              >
                <li
                  @click="index != 0 ? (Id = item.pId) : null"
                  v-for="(item, index) in taocanList"
                  :class="[
                    index !== 0 ? 'twoLi' : '',
                    Id + '' == item.pId && index != 0 ? 'styleLi' : '',
                    MousemoveNum + '' == item.pId && index != 0
                      ? 'styleLi'
                      : '',
                  ]"
                  :key="item"
                  @mousemove="handleMousemove(item.pId)"
                >
                  <h1>钻石会员·终身 + 智能抠图100次</h1>
                  <div class="modal-robShopping">{{ item.pId }}显示抢购</div>
                  <div class="modal-mvpTC-price">
                    <div class="modal-price">{{ item.discountPrice }}</div>
                    <div class="modal-yuan">元</div>
                    <span v-if="index === 0">¥1437</span>
                  </div>
                  <h4 v-if="index !== 0">100.00元</h4>
                  <p>钻石会员¥1268 + 智能抠图¥169 = ¥1437</p>
                  <h2 v-if="index === 0">只能抠图100张/月</h2>
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
                v-show="StyleFlag || StyleFlag == null"
                v-on:click="StyleFlag = false"
              ></div>
              <div
                class="mvpTC-right"
                v-show="StyleFlag === false"
                v-on:click="StyleFlag = true"
              ></div>
            </div>
          </div>

          <!-- 支付方式 -->
          <div class="modePayment">
            <!-- 支付 -->
            <div class="modal-payment">
              <!-- 微信 -->
              <a-button type="primary" class="modal-payment-wx">
                <div class="modal-payment-img">
                  <img src="" alt="" />
                </div>
                <span>微信支付</span>
              </a-button>
              <!-- 支付宝 -->
              <a-button
                type="primary"
                class="modal-payment-wx modal-payment-zf"
              >
                <div class="modal-payment-img">
                  <img src="" alt="" />
                </div>
                <span>支付宝</span>
              </a-button>
            </div>
            <!-- 二维码 -->
            <div class="modal-QRCode">
              <img src="" alt="" />
            </div>
            <!-- 支付金额 -->
            <div class="modePayment-price">
              <h1>支付金额 <span>99</span> 元</h1>
              <h2>已优惠 <span>1164</span> 元</h2>
              <h3>支付即视为同意 《SOOGIF抠图协议》</h3>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
     
  </div>

  <!-- <div  v-show="visible" class="modal">
    <div class="maskLayer"></div>
    <div class="modal-content"></div>
  </div> -->
</template>

<script setup>
import { ref, defineProps, watch, defineEmits, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps({
  modalFlag: Boolean,
  currentId: String,
});
const emit = defineEmits(["updataVisible"]);
// 点击切换动画
const StyleFlag = ref(null);

// 套餐数据
let taocanList = ref([]);
// 1.从本地拿套餐数据
onMounted(() => {
  // 1.1赋值
  taocanList.value = store.state.home.setMealInfo;
});

let Id = ref(Number);
// 监听父组件传递的套餐id currentId
watch(
  () => props.currentId,
  (newValue) => {
    Id.value = newValue;
  }
);

// 监听父组件传递的状态 modalFlag
watch(
  () => props.modalFlag,
  (newValue) => {
    // 参数是true，就赋值显示弹出框
    if (newValue == true) {
      // 赋值
      visible.value = newValue;
    }
  },
  { deep: true }
);

// 控制显示与隐藏
const visible = ref(props.modalFlag);
// 点击确定弹出框隐藏
const handleOk = (e) => {
  StyleFlag.value = null;
  visible.value = false;
  // 传递参数给父组件
  emit("updataVisible", false);
};

let MousemoveNum = ref(Number);
const handleMousemove = (id) => {
  MousemoveNum.value = id;
};
</script>

<style lang="less" scoped>
@import "@/assets/styles/animation/payModel/index.scss";
@import "ant-design-vue/dist/antd.less";

.paymodal {
  position: absolute;
  top: 0;
  left: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
</style>
