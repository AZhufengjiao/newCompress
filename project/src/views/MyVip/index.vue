<template>
  <div class="myVip">
    <!-- nav -->
    <HomeNav>
      <template v-slot:header_logo>
        <img class="header_logo" src="" alt="" />
      </template>
    </HomeNav>

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
          <li v-for="item in arr" :key="item">
            <div class="myVip-tq-box-b">
              <img src="" alt="" />
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
          <li v-for="item in yearArr" :key="item">
            <div class="myVip-tq-box-b">
              <img src="" alt="" />
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
          <img src="" alt="" />
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
</template>

<script setup>
import HomeNav from "@/components/home/Nav/index.vue";
import VipSetMeal from "@/components/myVip/VipSetMeal/index.vue";
import { getSetMeal } from "@/api/vip";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
components: {
  HomeNav, VipSetMeal;
}
const store = useStore();
// vip会员特权数组
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
// 年费大礼包数组
const yearArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

// 通过ref绑定获取会员特权组件dom
let privilege = ref(null);
// 获取会员特权组件距离页面顶部的高度
let privilegeTop = null;
let quanyiFlag = ref(false);

// 获取用户id
const userid = ref(store.state.login.userid);
onMounted(() => {
  privilegeTop = privilege.value.offsetTop;
  window.addEventListener("scroll", handleScroll);
  // 获取套餐信息
  setMealInfo(userid.value);
});
// 滚动定位
const handleScroll = () => {
  let windowTop = document.documentElement.scrollTop;
  windowTop >= privilegeTop
    ? (quanyiFlag.value = true)
    : (quanyiFlag.value = false);
};

// 获取套餐信息列表
const setMealInfo = (id) => {
  return getSetMeal(id).then((res) => {
    if (res.data.code == 200) {
      console.log(res.data);
    }
  });
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/myVip/myVipPage/myVipPage_media1440px.scss";
@import "@/assets/css/myVip/myVipPage/myVipPage_media1280px.scss";
</style>
