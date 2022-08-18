<template>
  <div class="about">
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
          <li
            v-on:click="handleSkip(item)"
            v-for="item in TemplateList"
            :key="item"
          >
            <h1>{{ item.title }}</h1>
            <div class="hot">HOT</div>
          </li>
          <!-- <li v-on:click="handle2"><h1>已打包！2G 免费商用字体</h1></li> -->
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

import aboutNav from "@/components/aboutNav/index.vue";
import { userList } from "@/api/user";
import { userLogOut } from "@/api/login";
import { getSetMeal, getDownloadNum, getMyCoupon } from "@/api/about";
import { homeTemplateList } from "@/api/home";
import { useStore } from "vuex";
components: {
  aboutNav;
}
const $router = useRouter();
const store = useStore();

// 获取本地用户id，查看是否登录
let state = ref(store.state.login.userid);
// 获取工具跳转列表
let TemplateList = ref([]);
onMounted(() => {
  // 获取跳转列表
  getTemplateList();
});

// 获取数据列表
const getTemplateList = () => {
  return homeTemplateList(null, 1, 10).then((res) => {
    if (res.data.code == 200) {
      TemplateList.value = res.data.data.list;
    }
  });
};
// 测试路由
const handleSkip = (res) => {
  TemplateList.value.map((item) => {
    if (res.tmpId === item.tmpId) {
      if (item.sceneType === "format") {
        $router.push({
          path: "/video-converter/" + item.tmpId,
        });
      } else {
        $router.push({
          path: "/video-compressor/" + item.tmpId,
        });
      }
    }
  });
};
const handle2 = () => {
  $router.push({ path: "/video-custom-converter" });
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
      //   // 已登录，获取用户信息
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
@import "@/assets/css/about/aboutPage/aboutPage_1440px.scss";
</style>
