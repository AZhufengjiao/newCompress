<template>
  <div class="about">
    <!-- 支付弹出层 -->
    <payModel
      :modalFlag="modalFlag"
      @updataVisible="updataModalFlag"
    ></payModel>

    <!-- 上部分 -->
    <div class="about-top">
      <!-- 头部 -->
      <aboutNav></aboutNav>
      <!-- 标题 -->
      <div class="about-hrycut">
        <div class="container">
          <h2>HEYCUT 视频压缩</h2>
          <div>智能场景压缩 · 一步搞定所有视频需求</div>
        </div>
      </div>
      <!-- list -->
      <div class="about-compressList">
        <ul>
          <li v-on:click="handle1">
            <h1>已打包！2G 免费商用字体</h1>
            <div class="hot">HOT</div>
          </li>
          <li v-on:click="handle2"><h1>已打包！2G 免费商用字体</h1></li>
          <li v-on:click="modalShow"><h1>已打包2！2G 免费商用字体</h1></li>
          <li><h1>已打包！2G 免费商用字体</h1></li>
          <li>
            <h1>已打包！2G 免费商用字体</h1>
            <div class="hot">HOT</div>
          </li>
          <li><h1>已打包！2G 免费商用字体</h1></li>
          <li><h1>已打包！2G 免费商用字体</h1></li>
          <li><h1>已打包！2G 免费商用字体</h1></li>
        </ul>
      </div>
    </div>

    <!-- 录制屏幕 -->
    <div class="about-screen">
      <div class="home_content_box">
        <div class="home_content_left">
          <img src="" alt="" />
        </div>
        <div class="home_content_right">
          <div class="home_content_right_top">
            <h3>录制屏幕种一切活动</h3>
          </div>
          <div class="home_content_right_bottom">
            <p>
              本款免费在线录屏工具是一款页面应用，故您可以在网页中开启应用，并录制电脑屏幕中的一切活动，并到处出视频或gif格式
            </p>
          </div>
          <a-button type="primary">立即尝试</a-button>
        </div>
      </div>
    </div>

    <!-- 录制屏幕反过来 -->
    <div class="about-screen about-screen-reverse">
      <div class="home_content_box">
        <div class="home_content_right">
          <div class="home_content_right_top">
            <h3>录制屏幕种一切活动</h3>
          </div>
          <div class="home_content_right_bottom">
            <p>
              本款免费在线录屏工具是一款页面应用，故您可以在网页中开启应用，并录制电脑屏幕中的一切活动，并到处出视频或gif格式
            </p>
          </div>
          <a-button type="primary">立即尝试</a-button>
        </div>
        <div class="home_content_left">
          <img src="" alt="" />
        </div>
      </div>
    </div>

    <!-- 所有功能 -->
    <div class="about-fn">
      <h1>所有功能</h1>
      <ul>
        <li>
          <div><img src="" alt="" /></div>
          <h2>7x24小时服务</h2>
        </li>
        <li>
          <div><img src="" alt="" /></div>
          <h2>7x24小时服务</h2>
        </li>
        <li>
          <div><img src="" alt="" /></div>
          <h2>7x24小时服务</h2>
        </li>
        <li>
          <div><img src="" alt="" /></div>
          <h2>7x24小时服务</h2>
        </li>
        <li>
          <div><img src="" alt="" /></div>
          <h2>7x24小时服务</h2>
        </li>
        <li>
          <div><img src="" alt="" /></div>
          <h2>7x24小时服务</h2>
        </li>
      </ul>
    </div>

    <!-- 她们怎么说 -->
    <div class="about-comment">
      <div class="container">
        <h1>他们怎么说</h1>
        <ul>
          <li>
            <p>
              为网易在效率和沟通上，解决了很多问题。以新功能【切图压缩】为例，现在在蓝湖上，直接就能下载压缩后的切图，解决了用户一个很大的痛点。优秀的产品都是具有服务感的
            </p>
            <div class="comment-bottom">
              <div class="comment-bottom-img">
                <img src="" alt="" />
              </div>
              <div class="comment-bottom-mes">
                <h3>克拉了晚</h3>
                <span>UI设计师</span>
              </div>
            </div>
          </li>
          <li>
            <p>
              为网易在效率和沟通上，解决了很多问题。以新功能【切图压缩】为例，现在在蓝湖上，直接就能下载压缩后的切图，解决了用户一个很大的痛点。优秀的产品都是具有服务感的
            </p>
            <div class="comment-bottom">
              <div class="comment-bottom-img">
                <img src="" alt="" />
              </div>
              <div class="comment-bottom-mes">
                <h3>克拉了晚</h3>
                <span>UI设计师</span>
              </div>
            </div>
          </li>
          <li>
            <p>
              为网易在效率和沟通上，解决了很多问题。以新功能【切图压缩】为例，现在在蓝湖上，直接就能下载压缩后的切图，解决了用户一个很大的痛点。优秀的产品都是具有服务感的
            </p>
            <div class="comment-bottom">
              <div class="comment-bottom-img">
                <img src="" alt="" />
              </div>
              <div class="comment-bottom-mes">
                <h3>克拉了晚</h3>
                <span>UI设计师</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 我们的用户来自这些公司 -->
    <div class="about-software">
      <h1>我们的用户来自这些公司</h1>
      <div class="about-software-img">
        <img src="" alt="" />
      </div>
    </div>
    <footer>
      <div class="footer-container">
        <div class="footer-left">
          <!-- logo -->
          <div class="header-logo">
            <div class="header-logo-left">
              <div class="wathet"></div>
              <div class="blue"></div>
            </div>
            <div class="header-logo-right">HEYCUT</div>
          </div>
          <h2>找动图，做动图GIF</h2>
        </div>
        <div class="xian"></div>
        <div class="footer-right">
          <div class="footer-right-box">
            <ul>
              <h1>动图工具</h1>
              <li>虚拟商城</li>
              <li>充值API</li>
              <li>批充批采</li>
              <li>虚拟商城</li>
              <li>充值API</li>
              <li>批充批采</li>
            </ul>
          </div>
          <div class="footer-right-box">
            <ul>
              <h1>动图工具</h1>
              <li>虚拟商城</li>
            </ul>
          </div>
          <div class="footer-right-box">
            <ul>
              <h1>动图工具</h1>
              <li>虚拟商城</li>
              <li>充值API</li>
            </ul>
          </div>
          <div class="footer-right-box">
            <ul>
              <h1>动图工具</h1>
              <li>虚拟商城</li>
              <li>充值API</li>
              <li>批充批采</li>
              <li>虚拟商城</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import payModel from "@/components/payModal/index.vue";
import aboutNav from "@/components/aboutNav/index.vue";
components: {
  payModel, aboutNav;
}
const $router = useRouter();
// 测试路由
const handle1 = () => {
  $router.push({ path: "home", query: { id: 1 } });
};
const handle2 = () => {
  $router.push({ path: "home", query: { id: 2 } });
};

// 支付弹出框
let modalFlag = ref(false);
// 点击显示弹出框
const modalShow = () => {
  modalFlag.value = true;
};
// 点击弹出框确定按钮，隐藏弹出框
const updataModalFlag = (bol) => {
  modalFlag.value = bol;
};

onMounted(() => {
  // 获取本地存储的登录信息
  let state = localStorage.getItem("login-key");
  // 没有登录
  if (!state) {
    console.log("未登录");
  } else {
    // console.log("已登录，准备更新xxi");
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/about/aboutPage/aboutPage_1440px.scss";
</style>
