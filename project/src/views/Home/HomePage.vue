<template>
  <div class="home">
    <div class="header">
      <!-- <HomeNav>
        <template v-slot:header_logo>
          <img class="header_logo" src="" alt="" />
        </template>
      </HomeNav> -->
      <aboutNav></aboutNav>

      <CompressedVideo></CompressedVideo>
    </div>
    <a-layout>
      <a-layout-content>
        <div class="home_content_box">
          <div class="home_content_left">
            <img src="" alt="" />
          </div>
          <div class="home_content_right">
            <div class="home_content_right_top">
              <h1>如何使用</h1>
              <h3>录制屏幕种一切活动</h3>
            </div>
            <div class="home_content_right_bottom">
              <p>
                本款免费在线录屏工具是一款页面应用，故您可以在网页中开启应用，并录制电脑屏幕中的一切活动，并到处出视频或gif格式
              </p>
            </div>
          </div>
        </div>
      </a-layout-content>
      <a-layout-footer>
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
            <p>个人头像-个人中心-在线发票，即可开具发票，发票邮费到付</p>
          </div>
          <div class="home_footer_smallBox">
            <h2>Q：怎么开发票?</h2>
            <p>个人头像-个人中心-在线发票，即可开具发票，发票邮费到付</p>
          </div>
        </div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup>
import HomeNav from "@/components/home/Nav/index.vue";
import CompressedVideo from "@/components/home/CompressedVideo/index.vue";
import aboutNav from "@/components/aboutNav/index.vue";
import { useStore } from "vuex";
import { onMounted, onUpdated, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
const store = useStore();
const $router = useRoute();
components: {
  aboutNav, CompressedVideo;
}
// 2 是自定义压缩视频
let routerNum = ref(1);

onMounted(() => {
  // routerNum.value = parseInt($router.params.id);
  // console.log(store.state.home.name);
  // console.log(store.state.home.params1);
  // console.log(store.state.home.tokenData);
});
onUpdated(() => {});

// onMounted(() => {
//   axios({
//     methods: "get",
//     baseurl: "http://demo.heycut.com",
//     url: "/api/transcoder/getTemplateList",
//     params: {
//       scene: "compress",
//       pageNum: 1,
//       pageSize: 10,
//     },
//   }).then((res) => {
//     console.log(res);
//   });
// });
</script>

<style lang="scss" scoped>
.header {
  background: #f6f7f9;
}

.header_logo {
  width: 100%;
  height: 100%;
}

.home_compressedVideo {
  text-align: center;
  padding-bottom: 109px;
}

/* a-layout */
.home .ant-layout-content {
  width: 100%;
  display: flex;
  justify-content: center;
  background: #ffffff;
  .home_content_box {
    width: 1490px;
    height: 772px;
    display: flex;
    padding-top: 152px;
    box-sizing: border-box;
  }
  .home_content_left {
    width: 821px;
    height: 468px;
    background: #005dfe;
    border-radius: 11px;
    padding: 25px 21px 0;
    box-sizing: border-box;
    img {
      cursor: pointer;
      width: 100%;
      height: 100%;
    }
  }
  .home_content_right {
    margin-left: 89px;
    .home_content_right_top {
      h1 {
        font-size: 59px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #33383d;
        line-height: 83px;
        margin-bottom: 16px;
      }
      h3 {
        font-size: 40px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #33383d;
        line-height: 40px;
      }
    }
    .home_content_right_bottom {
      margin-top: 85px;
      width: 576px;
      height: 120px;
      p {
        font-size: 27px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #33383d;
        line-height: 40px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
  }
}
.home .ant-layout-footer {
  padding: 0;
  h1 {
    text-align: center;
    font-size: 59px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #33383d;
    line-height: 83px;
    margin-top: 80px;
    margin-bottom: 20px;
  }
  .home_footer_box {
    display: flex;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 195px;
    .home_footer_smallBox {
      cursor: pointer;
      width: 683px;
      height: 196px;
      background: #e1e9ff;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      backdrop-filter: blur(7.321131447587355px);
      margin: 53px 31.5px 0;
      padding-left: 32px;
      box-sizing: border-box;
      h2 {
        margin-top: 43px;
        font-size: 27px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #33383d;
        line-height: 35px;
      }
      p {
        margin-top: 33px;
        font-size: 21px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #33383d;
        line-height: 35px;
      }
    }
  }
}

@import "@/assets/css/home/homePage/homePage_media1440px.scss";
@import "@/assets/css/home/homePage/homePage_media1280px.scss";
</style>
