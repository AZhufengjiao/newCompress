<template>
  <div class="myVip-setMealbox">
    <!-- 支付弹出层 -->
    <payModel
      :modalFlag="modalFlag"
      @updataVisible="updataModalFlag"
      :currentId="currentId"
    ></payModel>

    <div class="myVip-setMeal">
      <div
        :class="[
          'myVip-setMeal-layout',
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
            'myVip-setMeal-box ': item,
            'myVip-setMealboxOne ': index === 0,
            'myVip-setMealboxTwo': index === 1,
            'myVip-setMealboxSan': index === 2,
            'myVip-setMealboxSi': index === 3,
            'myVip-setMealboxWu': index === 4,
          }"
          :id="index !== 0 ? 'myVip-setMeal-pattern' : ''"
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
            <p>钻石会员·终身</p>
            <div class="myVip-setMeal-box-plan-price-box">
              <div v-if="index !== 0" class="myVip-setMeal-box-plan-quan">
                券后
              </div>
              <div class="myVip-setMeal-box-plan-price">199</div>
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
              v-on:click="modalShow(item)"
              >立即抢购</a-button
            >

            <div class="myVip-setMeal-box-plan-xz">
              全站编辑器内<span>无限</span>下载
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

        <!-- 左右两边的点击按钮 -->
        <div
          v-show="btnToggle || btnToggle == null"
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
        <!-- <div class="myVip-setMeal-clickBtn"></div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import payModel from "@/components/payModal/index.vue";
import { getSetMeal } from "@/api/about";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
components: {
  payModel;
}
const $router = useRouter();
const store = useStore();
// 选择套餐id
let currentId = ref("");
// 支付弹出框
let modalFlag = ref(false);
// 点击显示弹出框
const modalShow = (item) => {
  modalFlag.value = true;
};
// 点击弹出框确定按钮，隐藏弹出框
const updataModalFlag = (bol) => {
  modalFlag.value = bol;
};

const btnToggle = ref(null);

// 套餐数据
let setMealList = ref([]);

// 1.从本地拿套餐数据
onMounted(() => {
  // 1.1赋值
  setMealList.value = store.state.home.setMealInfo;
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/animation/myVip/VipSetMeal/index.scss";
@import "@/assets/css/myVip/VipSetMeal/VipSetMeal_media1440px.scss";
@import "@/assets/css/myVip/VipSetMeal/VipSetMeal_media1280px.scss";
</style>
