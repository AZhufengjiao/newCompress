<template>
  <!-- 我的订单页面 -->
  <div class="homeOrders">
    <table>
      <thead>
        <tr>
          <td>VIP类型</td>
          <td>开通时间</td>
          <td>权限说明</td>
          <td>到期时间</td>
          <td>订单编号</td>
          <td>订单状态</td>
        </tr>
      </thead>
      <!-- <tbody>
        <tr>
          <td>初级会员</td>
          <td>2019-05-30</td>
          <td>每天50次下载</td>
          <td>2019-06-30</td>
          <td>45485985984986</td>
          <td>已过期</td>
        </tr>
      </tbody> -->

      <div class="notlist">
        <img src="@/assets/img/userPage/purchase-vip-info.png" alt="" />
        <p>您还没有充值明细</p>
      </div>
    </table>
  </div>
</template>

<script setup></script>

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
@import url("@/assets/css/user/homeOrders/homeOrders_media1440px.less");
@import url("@/assets/css/user/homeOrders/homeOrders_media1280px.less");
</style>
