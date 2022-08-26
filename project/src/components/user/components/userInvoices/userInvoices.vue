<template>
  <!-- 申请发票页面 -->
  <div class="userInvoices">
    <a-button
      size="large"
      type="primary"
      @click="See('https://wj.qq.com/s2/3872933/3530/')"
      >在线发票立即申请</a-button
    >
    <div class="userInvoices-info">
      <div class="userInvoices-left">
        <h2>Q：关于运费?</h2>
        <p>您好，运费是收件到付运费， 江浙沪为6元快递费，其他地区为10快递费</p>
      </div>
      <div class="userInvoices-right">
        <h2>Q：提交申请后多久可以邮寄?</h2>
        <p>您好，提交资料后，相关人员核实后 在10个工作日内开具发票并邮出</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter;

// 跳转新的链接
const See = (e) => {
  // window.location.href = e;

  // location.href = e
  // window.open(e, "_self");  //原窗口跳转
  window.open(e, "_blank"); // 新窗口跳转
};
</script>

<style lang="less" scoped>
h1,
h2,
h3,
h4,
h5,
h5,
p,
ul,
li {
  margin: 0;
}
@import url("@/assets/css/user/userInvoices/userInvoices_media1440px.less");
@import url("@/assets/css/user/userInvoices/userInvoices_media1280px.less");
</style>
