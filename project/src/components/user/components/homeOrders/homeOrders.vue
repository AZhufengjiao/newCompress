<template>
  <!-- 我的订单页面    :total="OrderFormList.length"  -->
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
      <tbody v-if="OrderFormList.length > 0">
        <tr v-for="item in OrderFormList" :key="item.paidMoney">
          <td>{{ item.status }}会员</td>
          <td>{{ item.createtime }}</td>
          <td>{{ item.permission }}</td>
          <td>{{ item.endtime }}</td>
          <td>{{ item.wxOrderedId }}</td>
          <td>已过期</td>
        </tr>
      </tbody>

      <div class="notlist" v-if="OrderFormList.length <= 0">
        <img src="@/assets/img/userPage/purchase-vip-info.png" alt="" />
        <p>您还没有充值明细</p>
      </div>
    </table>
    <a-pagination
      v-show="OrderFormList.length > 0"
      v-model:current="pageNum"
      v-model:pageSize="pageSize"
      :total="totalNum"
      @change="onShowSizeChange"
    >
      <template #itemRender="{ type, originalElement }">
        <a v-if="type === 'prev'">上一页</a>
        <a v-else-if="type === 'next'">下一页</a>
        <component :is="originalElement" v-else></component>
      </template>
    </a-pagination>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { userOrders } from "@/api/user.js";
import { useStore } from "vuex";
const store = useStore();
// 获取数据要的参数
let userId = computed(() => store.state.login.userid);
let pageNum = ref(1); //当前第几页
let pageSize = ref(7); // 每页多少条数据
let totalNum = ref(0); // 总页数
let sign = computed(() => store.state.login.userObj.sign); // 用于安全验证

// 数据列表
let OrderFormList = ref([]);

onMounted(() => {
  // OrderFormList.value.map((item) => {
  //   if (item.roleType === "free") {
  //     item.status = "免费";
  //   } else if (item.roleType === "silver") {
  //     item.status = "白银";
  //   } else if (item.roleType === "gold") {
  //     item.status = "黄金";
  //   } else if (item.roleType === "platinum") {
  //     item.status = "白金";
  //   } else if (item.roleType === "diamond") {
  //     item.status = "钻石";
  //   }
  //   item.createtime = item.createtime.split(" ")[0];
  //   item.endtime = item.endtime.split(" ")[0];
  // });

  // 获取列表数据
  getOrderForm();
});

// 发起请求，获取订单数据
const getOrderForm = async () => {
  return await userOrders(
    userId.value,
    pageNum.value,
    pageSize.value,
    sign.value
  ).then((res) => {
    if (res.data.code == 200) {
      // 判断是否有数据
      if (res.data.data.totalList.length !== 0) {
        // 赋值中页数
        totalNum.value = res.data.data.totalNum;

        // 处理数据列表
        res.data.data.totalList.map((item) => {
          if (item.roleType === "free") {
            item.status = "免费";
          } else if (item.roleType === "silver") {
            item.status = "白银";
          } else if (item.roleType === "gold") {
            item.status = "黄金";
          } else if (item.roleType === "platinum") {
            item.status = "白金";
          } else if (item.roleType === "diamond") {
            item.status = "钻石";
          }

          item.createtime = item.createtime.split(" ")[0];
          item.endtime = item.endtime.split(" ")[0];
        });
      }
    }
  });
};

// 页码或者pageSize改变的回调，参数是改变后的页码及每页条数
const onShowSizeChange = (current, pagesize) => {
  pageNum.value = current;
  pageSize.value = pagesize;
  getOrderForm();
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
@import url("@/assets/css/user/homeOrders/homeOrders_media1440px.less");
@import url("@/assets/css/user/homeOrders/homeOrders_media1280px.less");
</style>
