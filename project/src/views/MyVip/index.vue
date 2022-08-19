<template>
  <div class="myVip">
    <!-- nav -->
    <!-- <HomeNav>
      <template v-slot:header_logo>
        <img class="header_logo" src="" alt="" />
      </template>
    </HomeNav> -->
    <aboutNav :white="white"></aboutNav>

    <div class="myVip-soogif">
      <div class="myVip-soogif-top">
        <div class="myVip-soogif-top-left">SOOGIF</div>
        <div class="myVip-soogif-top-right">钻石会员· 全站八大工具任意用</div>
      </div>
      <h1>- 找动图做动图.gif -</h1>
    </div>

    <!-- vip 会员套餐 -->
    <VipSetMeal></VipSetMeal>

    <!-- vip会员特权 -->
    <div class="myVip-tq">
      <h1>VIP会员特权</h1>
      <div class="myVip-tq-box">
        <ul>
          <li v-for="item in arr" :key="item.id">
            <div class="myVip-tq-box-b">
              <img :src="item.src" alt="" />
            </div>
            <p>实时热图更新</p>
          </li>
        </ul>
        <a-button size="large" type="primary">立即开通</a-button>
      </div>
    </div>

    <!-- 会员特权 -->
    <div ref="privilege" class="myVip-privilege">
      <!-- 权益顶部导航栏 -->
      <div v-show="quanyiFlag" class="quanyiNav">
        <div class="quanyiNav-anv">
          <div class="quanyiNav-one quanyiNav-span">会员权益</div>
          <div class="quanyiNav-list">
            <div class="quanyiNav-span">免费会员</div>
            <div class="quanyiNav-span">白银会员</div>
            <div class="quanyiNav-span">黄金会员</div>
            <div class="quanyiNav-span">白金会员</div>
            <div class="quanyiNav-span">钻石会员</div>
          </div>
        </div>
      </div>
      <h2>会员特权</h2>
      <ul>
        <li class="column">
          <div class="myVip-privilege-title">下载权益</div>
          <div class="myVip-privilege-font">免费会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">年度会员</div>
        </li>
        <li>
          <div class="myVip-privilege-title">去水印下载</div>
          <div class="myVip-privilege-font">
            <div class="myVip-privilegeconfirm"></div>
          </div>
          <div class="myVip-privilege-font"></div>
          <div class="myVip-privilege-font">
            <div class="myVip-privilegeconfirm"></div>
          </div>
          <div class="myVip-privilege-font"></div>
          <div class="myVip-privilege-font">
            <div class="myVip-privilegeconfirm"></div>
          </div>
        </li>
        <li class="column">
          <div class="myVip-privilege-title">下载权益</div>
          <div class="myVip-privilege-font">免费会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">年度会员</div>
        </li>
        <li>
          <div class="myVip-privilege-title">去水印下载</div>
          <div class="myVip-privilege-font">
            <div class="myVip-privilegeconfirm"></div>
          </div>
          <div class="myVip-privilege-font"></div>
          <div class="myVip-privilege-font">
            <div class="myVip-privilegeconfirm"></div>
          </div>
          <div class="myVip-privilege-font"></div>
          <div class="myVip-privilege-font">
            <div class="myVip-privilegeconfirm"></div>
          </div>
        </li>
        <li class="column">
          <div class="myVip-privilege-title">下载权益</div>
          <div class="myVip-privilege-font">免费会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">年度会员</div>
        </li>
        <li>
          <div class="myVip-privilege-title">去水印下载</div>
          <div class="myVip-privilege-font">
            <div class="myVip-privilegeconfirm"></div>
          </div>
          <div class="myVip-privilege-font"></div>
          <div class="myVip-privilege-font">
            <div class="myVip-privilegeconfirm"></div>
          </div>
          <div class="myVip-privilege-font"></div>
          <div class="myVip-privilege-font">
            <div class="myVip-privilegeconfirm"></div>
          </div>
        </li>
        <li class="column">
          <div class="myVip-privilege-title">下载权益</div>
          <div class="myVip-privilege-font">免费会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">年度会员</div>
        </li>
        <li>
          <div class="myVip-privilege-title">去水印下载</div>
          <div class="myVip-privilege-font">
            <div class="myVip-privilegeconfirm"></div>
          </div>
          <div class="myVip-privilege-font"></div>
          <div class="myVip-privilege-font">
            <div class="myVip-privilegeconfirm"></div>
          </div>
          <div class="myVip-privilege-font"></div>
          <div class="myVip-privilege-font">
            <div class="myVip-privilegeconfirm"></div>
          </div>
        </li>
        <li class="column">
          <div class="myVip-privilege-title">下载权益</div>
          <div class="myVip-privilege-font">免费会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">年度会员</div>
        </li>
        <li>
          <div class="myVip-privilege-title">去水印下载</div>
          <div class="myVip-privilege-font">
            <div class="myVip-privilegeconfirm"></div>
          </div>
          <div class="myVip-privilege-font"></div>
          <div class="myVip-privilege-font">
            <div class="myVip-privilegeconfirm"></div>
          </div>
          <div class="myVip-privilege-font"></div>
          <div class="myVip-privilege-font">
            <div class="myVip-privilegeconfirm"></div>
          </div>
        </li>
        <li class="column">
          <div class="myVip-privilege-title">下载权益</div>
          <div class="myVip-privilege-font">免费会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">年度会员</div>
        </li>
        <li>
          <div class="myVip-privilege-title">去水印下载</div>
          <div class="myVip-privilege-font">
            <div class="myVip-privilegeconfirm"></div>
          </div>
          <div class="myVip-privilege-font"></div>
          <div class="myVip-privilege-font">
            <div class="myVip-privilegeconfirm"></div>
          </div>
          <div class="myVip-privilege-font"></div>
          <div class="myVip-privilege-font">
            <div class="myVip-privilegeconfirm"></div>
          </div>
        </li>
        <li class="column">
          <div class="myVip-privilege-title">下载权益</div>
          <div class="myVip-privilege-font">免费会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">季度会员</div>
          <div class="myVip-privilege-font">年度会员</div>
        </li>
      </ul>
    </div>

    <!-- 年费大礼包 -->
    <div class="myVip-tq">
      <h1>年费会员大礼包</h1>
      <div class="myVip-tq-box">
        <ul>
          <li v-for="item in yearArr" :key="item.id">
            <div class="myVip-tq-box-b">
              <img :src="item.src" alt="" />
            </div>
            <p>335款可商用字体</p>
          </li>
        </ul>
        <a-button size="large" type="primary">立即开通</a-button>
      </div>
    </div>

    <!-- 提供发票 报销无忧 -->
    <div class="myVip-tq myVip-invoice">
      <h1>提供发票 报销无忧</h1>
      <div class="myVip-tq-box">
        <div class="myVip-tq-box-left">
          <img src="@/assets/img/vipPage/invoice.png" alt="" />
        </div>
        <div class="myVip-tq-box-right">
          <h1>发票类型：增值税普通发票/增值税专用发票</h1>
          <h1>开票内容：技术服务费</h1>
          <div class="myVip-tq-box-right-box">
            <div class="myVip-tq-smallB">
              <div class="myVip-tq-smallB-img"><img src="" alt="" /></div>
              <h2>支付购买</h2>
            </div>
            <div class="myVip-dashed">.....</div>
            <div class="myVip-tq-smallB">
              <div class="myVip-tq-smallB-img"><img src="" alt="" /></div>
              <h2>个人中心</h2>
            </div>
            <div class="myVip-dashed">.....</div>
            <div class="myVip-tq-smallB">
              <div class="myVip-tq-smallB-img"><img src="" alt="" /></div>
              <h2>在线发票</h2>
            </div>
          </div>
          <a-button size="large" type="primary">立即开通</a-button>
        </div>
      </div>
    </div>

    <!-- 常见问题 -->
    <div class="myVip-tq">
      <h1>常见问题</h1>
      <div class="home_footer_box">
        <div class="home_footer_smallBox">
          <h2>Q：怎么开发票?</h2>
          <p>个人头像-个人中心-在线发票，即可开具发票，发票邮费到付</p>
        </div>
        <div class="home_footer_smallBox">
          <h2>Q：怎么开发票?</h2>
          <p>个人头像-个人中心-在线发票，即可开具发票，发票邮费到付</p>
        </div>
        <div class="home_footer_smallBox">
          <h2>Q：怎么开发票?</h2>
          <p>
            支付成功后立即可以使用，您可以在个人中心查看购买记录，如果遇到异常，请及时联系客服
          </p>
        </div>
        <div class="home_footer_smallBox">
          <h2>Q：怎么开发票?</h2>
          <p>个人头像-个人中心-在线发票，即可开具发票，发票邮费到付</p>
        </div>
      </div>
    </div>

    <!-- 注释 -->
    <div class="myVip-annotation">
      <div>
        <h1>* 注释</h1>
        <br />
        <br />
        <br />

        <p>1、录屏仅限Chrome内核版本72.0(及以上)浏览器使用</p>
        <p>
          2、导出清晰度区别于常规所指视频格式分辨率，此处主要指利用不同抖动算法改善图片或视频转成GIF时产生的色带现象
        </p>
        <p>
          3、支持MP4格式(视频编码H.264)不限大小上传，Chrome浏览器支持Webm格式(视频编码VP9)不限大小上传，Safari浏
          览器支持MOV格式(视频编码
          H.265/H.264)不限大小上传，其他格式支持100M内转码上传
        </p>
        <p>4、导出尺寸无法超过原始视频尺寸</p>
        <p>5、随会员赠送的135会员仅限新用户领取，老会员仅限领取15天</p>
        <p>
          6、解析GIF（GIF编辑、缩放、裁剪）与电脑性能有关，部分过大GIF会出现浏览器无响应情况
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import HomeNav from "@/components/home/Nav/index.vue";
import VipSetMeal from "@/components/myVip/VipSetMeal/index.vue";
import aboutNav from "@/components/aboutNav/index.vue";
import { userList } from "@/api/user";
import { userLogOut } from "@/api/login";
import { onMounted, ref, watch, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
components: {
  aboutNav, VipSetMeal;
}
const store = useStore();
const $router = useRoute();
// vip会员特权数组
const arr = [
  {
    id: 1,
    src: require(`../../assets/img/vipPage/tequan/one.png`),
  },
  {
    id: 2,
    src: require(`../../assets/img/vipPage/tequan/two.png`),
  },
  {
    id: 3,
    src: require(`../../assets/img/vipPage/tequan/three.png`),
  },
  {
    id: 4,
    src: require(`../../assets/img/vipPage/tequan/four.png`),
  },
  {
    id: 5,
    src: require(`../../assets/img/vipPage/tequan/five.png`),
  },
  {
    id: 6,
    src: require(`../../assets/img/vipPage/tequan/six.png`),
  },
  {
    id: 7,
    src: require(`../../assets/img/vipPage/tequan/seven.png`),
  },
  {
    id: 8,
    src: require(`../../assets/img/vipPage/tequan/eight.png`),
  },
];
// 年费大礼包数组
const yearArr = [
  {
    id: 1,
    src: require(`../../assets/img/vipPage/dalibao/1.png`),
  },
  {
    id: 2,
    src: require(`../../assets/img/vipPage/dalibao/2.png`),
  },
  {
    id: 3,
    src: require(`../../assets/img/vipPage/dalibao/3.png`),
  },
  {
    id: 4,
    src: require(`../../assets/img/vipPage/dalibao/4.png`),
  },
  {
    id: 5,
    src: require(`../../assets/img/vipPage/dalibao/5.png`),
  },
  {
    id: 6,
    src: require(`../../assets/img/vipPage/dalibao/6.png`),
  },
  {
    id: 7,
    src: require(`../../assets/img/vipPage/dalibao/7.png`),
  },
  {
    id: 8,
    src: require(`../../assets/img/vipPage/dalibao/8.png`),
  },
  {
    id: 9,
    src: require(`../../assets/img/vipPage/dalibao/9.png`),
  },
  {
    id: 10,
    src: require(`../../assets/img/vipPage/dalibao/10.png`),
  },
  {
    id: 11,
    src: require(`../../assets/img/vipPage/dalibao/11.png`),
  },
  {
    id: 12,
    src: require(`../../assets/img/vipPage/dalibao/12.png`),
  },
  {
    id: 13,
    src: require(`../../assets/img/vipPage/dalibao/default.png`),
  },
  {
    id: 14,
    src: require(`../../assets/img/vipPage/dalibao/default.png`),
  },
  {
    id: 15,
    src: require(`../../assets/img/vipPage/dalibao/default.png`),
  },
  {
    id: 16,
    src: require(`../../assets/img/vipPage/dalibao/default.png`),
  },
];

// 通过ref绑定获取会员特权组件dom
let privilege = ref(null);
// 获取会员特权组件距离页面顶部的高度
let privilegeTop = null;
let quanyiFlag = ref(false);

// 设置nav背景颜色
const white = ref("white");

onMounted(() => {
  privilegeTop = privilege.value.offsetTop;
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
// 滚动定位
const handleScroll = () => {
  let windowTop = document.documentElement.scrollTop;
  windowTop >= privilegeTop
    ? (quanyiFlag.value = true)
    : (quanyiFlag.value = false);
};

// 1.2 调用接口，获取用户登录是否过期
const getUserInfo = (userid) => {
  return userList(userid).then((res) => {
    // 没有过期 保存用户状态信息
    if (res.data.code == 200) {
      // console.log(res.data.data);
      // 存本地
      store.commit("user/setUserData", res.data.data);
    } else {
      // 已过期 删除本地缓存
      userLogOut().then((res) => {
        if (res.data.code) {
          localStorage.removeItem("userid");
          store.commit("login/setParams", null);
          store.commit("login/setUserObj", {});
        }
      });
    }
  });
};

// 1.进入首页，判断本地缓存是否存在userid，有就是已登录
watch(
  () => store.state.login.userid,
  (newValue) => {
    // 没有登录
    if (newValue == null || newValue.length <= 0) {
      console.log("未登录");
    } else {
      // 已登录，获取用户信息
      getUserInfo(newValue);
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
@import "@/assets/css/myVip/myVipPage/myVipPage_media1440px.scss";
@import "@/assets/css/myVip/myVipPage/myVipPage_media1280px.scss";
</style>
