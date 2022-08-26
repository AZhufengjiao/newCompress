<template>
  <div class="home_compressedVideo">
    <!-- 用户身份 下载弹出框  选择试试 和立即升级 -->
    <uploadModal
      :UploadModal="UploadModal"
      @updateFlag="updateStateHandle"
      @trialFlag="trialStateHandle"
    ></uploadModal>

    <!-- 支付弹出层 -->
    <payModel
      :modalFlag="modalFlag"
      @updataVisible="updataModalFlag"
    ></payModel>

    <!-- 视频下载弹出框 -->
    <download2 :downloadModal="videoXz" @updateFlag="updateFlag"></download2>
    <!-- 视频下载完成弹出框 -->
    <downloadWc
      :downloadModal="videoDownWc"
      @updateFlag="DownWcHandle"
    ></downloadWc>

    <div class="home_compressedVideo_top">
      <h2>HEYCUT 视频压缩</h2>
      <div>智能场景压缩 · 一步搞定所有视频需求</div>
    </div>

    <router-view></router-view>

    <p class="home_compressedVideo_hanzi">
      1·解决抖音上传视频被压缩、不清晰问题
    </p>

    <!-- 上传视频 -->
    <div class="home_uploadingVideo_box">
      <div class="">
        <div
          class="home_uploadingVideo"
          v-on:dragover="HandleDragover"
          v-on:drop="HandleDrag"
        >
          <div class="home_uploadingVideo_bottom">
            <div class="home_uploadingVideo_bottom_img">
              <img
                src="@/assets/img/homePage/upload_slices/upload.png"
                alt=""
              />
            </div>
            <div
              v-on:click="handleUploading"
              class="home_uploadingVideo_bottom_span"
            >
              上传视频
            </div>
            <input
              ref="upload"
              type="file"
              name="upload"
              id="upload"
              style="display: none"
              v-on:change="handleInputV"
              accept="video/*"
              :multiple="inputFlag"
            />
          </div>
          <p>直接拖拽视频 到此，或者点击上传按钮</p>
          <video
            style="display: none"
            src=""
            ref="videoDom"
            @canplaythrough="myFunction"
          ></video>
          <h1>
            最大支持400M以内视频压缩，<span @click="modalFlag = true"
              >升级会员 </span
            >享受无限大小
          </h1>
        </div>
        <div v-if="fileList.length > 0" class="home_fileCompression">
          <div class="home_fileCompression_flex">
            <div
              v-for="item in fileList"
              :key="item"
              class="home_fileCompression_box"
            >
              <UploadModule
                :item="item"
                :payload="params1"
                @getFileItemParams="FileItemParams"
              >
              </UploadModule>
            </div>
          </div>
        </div>
        <div class="btn">
          <a-button
            v-if="SonList.length > 0"
            type="primary"
            class="download"
            v-on:click="downloadHandle"
            >下载全部
          </a-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 登录弹出框 -->
  <loginModel :loginFlag="loginFlag" @cancelChild="CancelChild"></loginModel>
</template>

<script setup>
import uploadModal from "@/components/modal/uploadModal/index.vue"; // 选择支付试试弹出框
import download2 from "@/components/modal/download/download2.vue"; // 视频下载中弹出框
import downloadWc from "@/components/modal/download/downloadWc.vue"; // 视频下载完成弹出框
import payModel from "@/components/modal/payModal/index.vue"; // 用户支付弹出框
import loginModel from "@/components/modal/loginModal/index.vue"; // 登录弹出框
import UploadModule from "@/components/home/UploadModule/index.vue"; // 下载列表

import Custom from "@/components/home/Custom/index.vue"; // 自定义压缩
import defaultYS from "@/components/home/defaultYS/index.vue"; // 压缩场景
import {
  onMounted,
  onUpdated,
  onUnmounted,
  ref,
  watch,
  toRefs,
  computed,
} from "vue";
import { getCompressScenes } from "@/api/home";
import { getKillDownloadNum, getDownloadNum } from "@/api/about";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { httpcode } from "@/utils/httpCode";
import { http } from "@/utils/http";
import { saveFile } from "./download.js";
import axios from "axios";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { useRouter } from "vue-router";

components: {
  UploadModule, uploadModal, Custom, defaultYS, download2, payModel;
  downloadWc, loginModel;
}

const $router = useRouter();
const store = useStore();

const inputFlag = ref(true);

const activeKeySon = ref(1);
// 定义选择的压缩类型数组
let fileList = ref([]);
// 转化好的视频数组
let SonList = ref([]);
// 转码要的参数
let params1 = computed(() => store.state.home.params1);
// 获取用户id
let userid = computed(() => store.state.login.userid);
// 获取该用户下载次数
let downloadNumber = ref(0);
// 用户每天下载次数
let dayloadNumber = ref(0);
watch(
  () => store.state.home.downloadNumber,
  (newValue) => {
    downloadNumber.value = newValue;
  },
  { immediate: true }
);
watch(
  () => store.state.home.dayloadNumber,
  (newValue) => {
    dayloadNumber.value = newValue;
  },
  { immediate: true }
);

// watch(
//   () => store.state.home.params1,
//   (value) => {
//     params1.value = value;
//   },
//   {
//     immediate: true,
//   }
// );

// 动画状态
let flag = ref(false);
let state = ref("sc");
let time = ref(null);
let succeedtime = ref(null);
let succeed = ref(false);

// 创建一个可以下载的url数组
let fileUrlList = computed(() => store.state.home.conversionList);

// // 监听用户id
watch(
  () => store.state.login.userid,
  (newValue) => {
    // 获取剩余次数;
    getFrequency(store.state.login.userid);
  }
);

// 弹出框
// 1.视频下载弹出框弹出框
let videoXz = ref({
  flag: false,
  num: 0,
});
// 隐藏下载弹窗
const updateFlag = (res) => {
  videoXz.value.flag = res;
};

// 2. 下载完成弹出框 downloadWc
let videoDownWc = ref({
  flag: false,
  num: 0,
});
// 隐藏下载完成
const DownWcHandle = (res) => {
  videoDownWc.value.flag = res;
};

// 3.登录弹出框
const loginFlag = ref(false);
// 获取子组件传值复制
const CancelChild = (val) => {
  loginFlag.value = val;
};

// 4. 支付弹出框
// 支付弹出框
let modalFlag = ref(false);
// 点击弹出框确定按钮，隐藏弹出框
const updataModalFlag = (bol) => {
  modalFlag.value = bol;
};
// // 支付成功，关闭自己
// const closeHandle = (state) => {
//   modalShow.value = state;
// };

// 5.点击试试弹出框
let UploadModal = ref({
  flag: false,
  state: "",
});
// 试试功能
const filtsShi = ref([]);
let shishiFlag = ref(false);
watch(
  () => store.state.home.trial,
  (newValue) => {
    shishiFlag.value = newValue;
    fileList.value = filtsShi.value;
  },
  { immediate: true }
);
// 子组件像父组件传递参数，修改UploadModal的状态
const updateStateHandle = (state) => {
  UploadModal.value.flag = state;
  upload.value.value = null;
};
// 我要试试关闭弹窗
const trialStateHandle = (state) => {
  UploadModal.value.flag = state;
};

let upload = ref(null);

// // 3.获取工具剩余次数
const getFrequency = (userid) => {
  return getDownloadNum(userid).then((res) => {
    // console.log(res.data);
    if (res.data.code == 200) {
      console.log(res.data);
      downloadNumber.value = res.data.data.downloadNumber;
      // 保存次数至本地
      store.commit("home/setDownloadNumber", res.data.data.downloadNumber);
    }
  });
};

//  功能1.添加按钮，触发input，让文件夹弹出  3.
const handleUploading = (e) => {
  // 点击弹出框先判断用户有没有登录
  if (userid.value !== null) {
    // 让文件夹打开
    upload.value.click();
  } else {
    // 未登录先登录，弹出登录弹出框
    loginFlag.value = true;
  }
};

onUnmounted(() => {
  store.commit("home/setConversionList", []);
});
onMounted(() => {
  store.commit("home/setConversionList", []);
});

/* 文件夹弹出 选择图片上传 */
let file = ref(null);
let videoDom = ref(null);
// 获取置视频的时长
let videoTime = ref(null);

// 查看用户的身份
let roleType = computed(() => store.state.user.userData.roleType);
// watch(
//   () => store.state.user.userData.roleType,
//   (newValue) => {
//     roleType.value = newValue;
//   },
//   { immediate: true }
// );
//  功能2.input获取上传视频，身份判断
let handleInputV = (e) => {
  console.log(store.state.user.userData.roleType);
  console.log(roleType.value);
  // 为我要试试功能存储
  filtsShi.value = e.target.files;
  // 获取选中的视频
  const uploadFiles = e.target.files;
  // 获取视频大小
  // console.log(uploadFiles[0].size / 1024 / 1024);
  let videoSize = parseInt(uploadFiles[0].size / 1024 / 1024);
  // 查看用户的身份
  // let roleType = store.state.user.userData.roleType;
  if (uploadFiles.length > 0) {
    // 选中添加进fileList数组
    function fn() {
      // 遍历选中的文件
      for (let i = 0; i < uploadFiles.length; i++) {
        // 判断该文件是否添加
        // console.log(111111, fileList.value);
        let flag = fileList.value.some(
          (item) => item.lastModified === uploadFiles[i].lastModified
        );
        // 没有添加就添加
        if (!flag) {
          fileList.value.push(uploadFiles[i]);
        }
      }
    }

    // 判断身份，及视频大小
    /**
     *
     * @param {string} state 身份状态
     * @param {number} num  视频大小
     */
    function estimateFn(state, num) {
      // 判断次数如果小于用户选择的数量就弹出弹出框
      if (
        fileList.value.length + e.target.files.length >
          store.state.home.downloadNumber ||
        store.state.home.downloadNumber < e.target.files.length
      ) {
        // 复制参数，修改弹出框信息
        UploadModal.value = {
          flag: true,
          state: state,
        };
      }
      // 视频大小，不超过身份限制，下载视频
      else if ((videoSize <= num || num === null) && downloadNumber.value > 0) {
        // console.log("我的身份是" + state);
        // 复制参数，修改弹出框信息
        UploadModal.value = {
          flag: false,
          state: state,
        };

        fn();
      }
      // 视频大小， 超出身份限制
      else {
        // 复制参数，修改弹出框信息
        UploadModal.value = {
          flag: true,
          state: state,
        };
      }
      // 表示身份是白金或者钻石，弹出框不显示
      if (num === null) {
        UploadModal.value = {
          flag: false,
          state: state,
        };
      }

      // 表示身份是免费，视频不能多选
      if (state === "free") {
        // 让input不能多选
        inputFlag.value = false;
      } else {
        inputFlag.value = true;
      }
    }

    // 免费
    if (roleType.value === "free") {
      estimateFn(roleType.value, 10);
    }
    // 银
    else if (roleType.value === "silver") {
      estimateFn(roleType.value, 50);
    }
    // 黄金
    else if (roleType.value === "gold") {
      console.log(11);
      estimateFn(roleType.value, 100);
    }
    // 白金或者钻石
    else if (roleType.value === "platinum" || roleType.value === "diamond") {
      console.log(111);
      estimateFn(roleType.value, null);
    }
  } else {
    console.log("没选");
  }
  // upload.value = null;
};

//  获取videotime
const myFunction = (e) => {
  videoTime.value = e.target.duration;
};

const HandleDragover = (e) => {
  e.preventDefault();
};
// 功能3.拖拽file
const HandleDrag = (e) => {
  e.preventDefault();
  let FileArr = e.dataTransfer.files;
  for (let i = 0; i < FileArr.length; i++) {
    fileList.value.push(FileArr[i]);
  }
};

// 获取子组件转化好的视频
const FileItemParams = (item) => {
  SonList.value = item;
  // fileUrlList.value = item; // computed只读
  store.commit("home/setConversionList", item);
};

let downloadTimer = ref(null);
// 功能4.点击下载全部
const downloadHandle = () => {
  if (store.state.home.trial === true) {
    return (modalFlag.value = true); // 支付弹出框
  }
  SonList.value.map((item) => {
    if (item.zh !== true) {
      // 如果是普通用户的话弹出支付
      if (
        roleType.value == "free" &&
        (filtsShi.value[0].size / 1024 / 1024 >= 10 || downloadNumber.value < 1)
      ) {
        return (modalFlag.value = true); // 支付弹出框
      }

      // 判断下载次数是否小于用户准备下载视频的个数
      if (downloadNumber.value < fileUrlList.value.length) {
        // 判断身份是否有次数限制
        if (roleType.value !== "platinum" || roleType.value !== "diamond") {
          // 复制参数，修改弹出框信息
          return (UploadModal.value = {
            flag: true,
            state: roleType.value,
          });
        }
      }
      // 判断每天下载次数是否小于等于0
      if (store.state.home.dayloadNumber <= 0) {
        // 判断身份是否有次数限制
        if (roleType.value !== "diamond") {
          // 复制参数，修改弹出框信息
          return (UploadModal.value = {
            flag: true,
            state: roleType.value,
          });
        }
      }
    }
  });

  // 让下载中弹窗显示
  videoXz.value.flag = true;
  videoXz.value.num = SonList.value.length;
  videoDownWc.value.num = SonList.value.length;
  // 查看用户的身份
  // let roleType = store.state.user.userData.roleType;
  // 设置一个记录下载为false的变量
  let FalseNum = 0;
  let blogTitle = "下载文件的名字";
  let zip = new JSZip();
  let promiseArr = [];
  let cache = {};
  // 要下载图片的url
  let arrImg = [];
  // for (let i = 0; i < fileUrlList.value.length; i++) {
  //   if (fileUrlList.value[i].xz === false) {
  //     fileUrlList.value[i].xz = true;
  //     store.commit("home/setConversionList", fileUrlList.value);

  //     // 下载
  //     arrImg.push({
  //       path: fileUrlList.value[i].videoUrl,
  //       name: fileUrlList.value[i].file.name,
  //     });
  //   }
  // }
  for (let i = 0; i < SonList.value.length; i++) {
    if (SonList.value[i].xz === false) {
      FalseNum++;
      SonList.value[i].xz = true;
      console.log(SonList.value);
      store.commit("home/setConversionList", SonList.value);
    }
  }
  // 每次下载所有xz为true得
  store.state.home.conversionList.map((item) => {
    arrImg.push({
      path: item.videoUrl,
      name: item.file.name,
    });
  });
  // 扣除本地下载次数
  killDownLoadNumber(FalseNum, userid.value);
  // 扣除每天次数
  store.commit("home/jianDayloadNumber", FalseNum);
  for (let item of arrImg) {
    const promise = getImgArrayBuffer(item.path).then((data) => {
      // 下载文件，并存成ArrayBuffer对象（blob）
      zip.file(item.name, data, { binary: true }); // 逐个添加文件
      cache[item.name] = data;
    });
    promiseArr.push(promise);
  }
  Promise.all(promiseArr).then(() => {
    // 下载默认时间
    let delayTime = 1800;
    // 下载起始时间
    let currentTime = new Date().getTime();
    zip
      .generateAsync({ type: "blob" })
      .then((content) => {
        // 下载后时间
        let tempTime = new Date().getTime();
        // 下载时间
        delayTime =
          tempTime - currentTime < 1800 ? 1800 : tempTime - currentTime;
        // 开启定时器
        downloadTimer.value = window.setInterval(() => {
          // 下载中弹出框隐藏
          videoXz.value.flag = false;
          // 下载完成弹出框显示
          videoDownWc.value.flag = true;
          // 去除定时器
          clearInterval(downloadTimer.value);
          // 让定时器为空
          downloadTimer.value = true;
        }, delayTime);
        // 生成二进制
        FileSaver.saveAs(content, blogTitle); // 利用file-saver保存文件 自定义文件名
        this.btnLoading = false;
      })
      .catch((res) => {
        // message.warning("文件压缩失败");
      });
  });
};

/**
 * 功能5.多文件打包下载功能
 * @param {string} url 文件地址
 */
const getImgArrayBuffer = (url) => {
  return new Promise((resolve, reject) => {
    // 通过请求获取文件blob格式
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true);
    xmlHttp.responseType = "blob";
    xmlHttp.onload = function () {
      if (this.status == 200) {
        resolve(this.response);

        // window.URL.createObjectURL();
      } else {
        reject(this.status);
      }
    };
    xmlHttp.send();
  });
};

// 功能6.点击下载扣除次数
const killDownLoadNumber = async (picNumber, userId) => {
  return await getKillDownloadNum(picNumber, userId).then((res) => {
    if (res.data.code == 200) {
      // 修改本地下载次数
      store.commit("home/setDownloadNumber", res.data.data.newDownloadNumber);
    }
  });
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/animation/home/CompressedVideo/index.scss";

// @import "assets/styles/test.scss"; // 自定义别名路径：详见vue.config.js
// @import "../../assets/styles/test.scss"; 相对路径
/*文件上传css*/

// 新添加的下载按钮
.home .home_uploadingVideo_box .download {
  margin-top: 53px;
  width: 331px;
  height: 46px;
  background: #0544ff;
  border-radius: 6px;
}

//
.home_fileCompression_box_center_box {
  .ant-progress-text {
    display: none !important;
  }
}

.btn {
  display: flex;
  justify-content: center;
  margin-bottom: 111px;
}

.home_fileCompression {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 33px;

  .home_fileCompression_flex {
    width: 1268px;
    .home_fileCompression_box {
      width: 100%;
      display: flex;
      // justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;

      .home_fileCompression_box_box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 27px;
      }
      .home_fileCompression_box_zh {
        width: 93px;
        height: 29px;
        font-size: 21px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 29px;
        letter-spacing: 1px;
      }
      .home_fileCompression_box_xz {
        width: 93px;
        height: 29px;
        font-size: 21px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 29px;
        letter-spacing: 1px;
      }
      .home_fileCompression_box_name {
        display: inline-block;
        width: 128px;
        height: 29px;
        font-size: 21px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 29px;
        letter-spacing: 1px;
        overflow: hidden;
      }
      .home_fileCompression_box_center {
        display: flex;
        align-items: center;
        .home_fileCompression_box_memory {
          width: 65px;
          height: 29px;
          font-size: 21px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 29px;
          letter-spacing: 1px;
        }
        .home_fileCompression_box_center_box {
          flex: 1;
          margin: 0 27px;
          width: 496px;
          height: 40px;
          background: #d6dff6;
          border-radius: 25px;
          .home_fileCompression_box_center_box_style {
            width: 0%;
            height: 100%;
            border-radius: 25px;
            background: linear-gradient(to right, #1bc2ed, #2d19ce);
            font-size: 19px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 40px;
            letter-spacing: 1px;
            text-align: center;
            overflow: hidden;
          }
          .scStyle {
            background: linear-gradient(to right, #1bc2ed, #2d19ce);
          }
          .zhtyle {
            background: linear-gradient(90deg, #04c4f5 0%, #51ff82 100%);
          }
        }
      }
    }
  }
}
.home_compressedVideo {
  width: 100%;
  padding-top: 156px;
  .home_compressedVideo_hanzi {
    width: 1333px;
    text-align: left;
    margin: 17px auto 21px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #0544ff;
    line-height: 16px;
  }
  .home_uploadingVideo_box {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .home_uploadingVideo {
    margin-bottom: 111px;
    width: 1333px;
    height: 335px;
    border-radius: 19px;
    opacity: 0.6;
    border: 4px dashed #0544ff;
    // margin-left: 292px;
    text-align: center;
    .home_uploadingVideo_bottom {
      cursor: pointer;
      width: 252px;
      height: 80px;
      background: #0544ff;
      box-shadow: inset 0px 5px 29px 0px rgba(255, 255, 255, 0.5);
      border-radius: 9px;
      margin: auto;
      margin-top: 84px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      .home_uploadingVideo_bottom_span {
        font-size: 32px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
      }
      .home_uploadingVideo_bottom_img {
        width: 32px;
        height: 32px;
        margin-right: 9px;
        img {
          width: 100%;
          height: 100%;
          /* vertical-align: baseline; */
        }
      }
    }
    p {
      font-size: 21px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #0544ff;
      line-height: 29px;
      letter-spacing: 1px;
      margin-bottom: 55px;
    }
    h1 {
      font-size: 21px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 29px;
      letter-spacing: 1px;
    }
    span {
      cursor: pointer;
      font-size: 21px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #0544ff;
      line-height: 29px;
      letter-spacing: 1px;
      text-decoration: underline;
    }
  }
}
.home_compressedVideo_top {
  text-align: center;
  padding-bottom: 60px;
  h2 {
    font-size: 53px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 53px;
    letter-spacing: 1px;
  }
  div {
    font-size: 32px;
    font-family: PingFangSC-Thin, PingFang SC;
    font-weight: 100;
    color: #000000;
    line-height: 53px;
  }
}

.home_compressedVideo_bottom {
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;

  .home_compressedVideo_bottom_box {
    width: 1333px !important;
    height: 165px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(7.321131447587355px);
    .home_compressedVideo_bottom_top {
      display: flex;
      width: 719px;
      height: 77px;

      border-radius: 11px 11px 0px 0px;
      div {
        cursor: pointer;
        background: #ffffff;
        width: 33.33%;
        font-size: 24px;
        height: 77px;
        line-height: 77px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #0544ff;
        letter-spacing: 1px;
        line-height: 77px;
        border-radius: 0 11px 0 0;
      }
    }
    .home_compressedVideo_bottom_bottom {
      padding: 0 0 0 89px;
      height: 88px;
      background: #e1e9ff;
      .home_compressedVideo_bottom_bottom_one {
        display: flex;
        div {
          cursor: pointer;
          background: #e1e9ff;
          margin-right: 108px;
          height: 88px;
          line-height: 88px;
          backdrop-filter: blur(7.321131447587355px);
          letter-spacing: 1px;
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #0544ff;
        }
      }
    }
  }
}

.fenjxian {
  width: 1px;
  height: 23px;
  border: 1px solid #e1e9ff;
  margin-top: 32px;
  margin-left: -2px;
}
.border_cor {
  border-bottom: 4px #0544ff solid !important ;
  border-radius: 4px;
}
.border_col {
  background: #e1e9ff !important;
}
@import "@/assets/css/home/homeNav/CompressedVideo/CompressedVideo_media1440px.scss";
@import "@/assets/css/home/homeNav/CompressedVideo/CompressedVideo_media1280px.scss";
// @import "@/assrts/styles/animation/home/CompressedVideo/index.scss";
</style>
